<template>
  <div class='detailFood'>
    <div class="noDetail" id="noDetail" v-if="Object.keys(detail).length === 0">
      <div class="icon">
        <img src="@/assets/icon/food-and-restaurant.png">
      </div>
            
      <div class="title">
        No Detail
      </div>
            
      <div class="command">
        Please add some items
      </div>
    </div>

    <div class='detail' v-if="Object.keys(detail).length > 0">
      <div class='header'>
        <img :src="image || detail.image" class='headerImg'>
      </div>

      <div class='main'>
        <div class="item">  
          <div class="title">Name</div>
          <div class="action">
            <input type="text" v-model="detail.name">
          </div>
        </div>

        <div class="item">
          <div class="title">Image</div>
          <div class="action">
            <input type="file" ref='file' @change="changeImageFile()">
          </div>
        </div>

        <div class="item">
          <div class="title">Price</div>
          <div class="action">
            <input type="text" style="width: 80%;" v-model="detail.price">
          </div>
        </div>

        <div class="item">
          <div class="title">Stock</div>
          <div class="action">
            <input type="text" style="width: 60%;" v-model="detail.stock">
          </div>
        </div>

        <div class="item">
          <div class="title">Category</div>
          <div class="action">
            <div class="dropdown" style="width: 60%;">
              <div class="header">
                <div class="value">{{ detail.category }}</div>
                <div class="icon"><img src="@/assets/icon/Polygon.png"></div>
              </div>
              <div class="list">
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <button style="background-color: #F24F8A;" @click="deleteProduct()">Delete</button>
        <button style="background-color: #57CAD5;" @click="updateProduct()">Update</button>
      </div>

    </div>
  </div> 
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'

export default {
  name: 'SettingDetail',
  computed: {
    detail() {
      return this.$store.getters.getSettingDetail
    }
  },
  data () {
    return {
      name: '',
      image: null,
      price: '',
      stock: '',
      category: ''
    }
  },
  update() {
    this.name = (this.detail.name || '')
    this.image = (this.detail.image || '')
    this.price = (this.detail.price || 0)
    this.stock = (this.detail.stock || 0)
    this.category = (this.detail.category || 'Category')
  },
  beforeMount() {
    this.name = (this.detail.name || '')
    this.image = null
    this.price = (this.detail.price || 0)
    this.stock = (this.detail.stock || 0)
    this.category = (this.detail.category || 'Category')
  },
  methods: {
    changeImageFile() {
      this.detail.image = this.$refs.file.files[0]
      this.image = URL.createObjectURL(this.detail.image)
    },
    deleteProduct() {
      this.$store.getters.getProgressBar.start()
      axios.delete(process.env.VUE_APP_API + `/product/${this.detail.id}`, { headers: { token: this.$store.getters.getToken } })
        .then(res => {
          this.$store.getters.getProgressBar.done()
          if (res.data.token) this.$store.dispatch('changeToken', res.data.token)
          const success = res.data.success

          if (success) {

            this.$store.dispatch('removeItemSetting', this.detail.id)
            const newSelect = {}
            this.$store.dispatch('changeSettingDetail', newSelect)

            const newNotif = {
              message: 'Success',
              status: 'success',
              show: true
            }
            this.$store.dispatch('showNotif', newNotif)
          } else {
            const newNotif = {
              message: res.data.errMsg,
              status: 'error',
              show: true
            }

            this.$store.dispatch('showNotif', newNotif)
          }

        })
        .catch(err => {
          console.log(err)
          this.$store.getters.getProgressBar.done()
        })
    },
    updateProduct() {
      this.$store.getters.getProgressBar.start()
      const productData = new FormData()
      productData.append('name', this.detail.name)
      productData.append('price', this.detail.price)
      productData.append('stock', this.detail.stock)
      productData.append('category', this.detail.category)
      productData.append('image', this.detail.image)
        
      const axiosConfig = {
        method: 'put',
        url: process.env.VUE_APP_API + `/product/${this.detail.id}`,
        headers: {
          token: this.$store.getters.getToken,
          'Content-Type': 'multipart/form-data'
        },
        data: productData
      }

      axios(axiosConfig)
        .then(res => {
          this.$store.getters.getProgressBar.done()
          if (res.data.token) this.$store.dispatch('changeToken', res.data.token)
          const success = res.data.success

          if (success) {
            const itemUpdate = {
              id: this.detail.id,
              name: res.data.values[0].name,
              price: parseInt(res.data.values[0].price),
              stock: parseInt(res.data.values[0].stock),
              category: res.data.values[0].category,
              imgLocation: res.data.values[0].image
            }

            this.$store.dispatch('updateItemSetting', itemUpdate)

            const newNotif = {
              message: 'Success',
              status: 'success',
              show: true
            }
            this.$store.dispatch('showNotif', newNotif)
            this.image = null
            const newSelect = {}
            this.$store.dispatch('changeSettingDetail', newSelect)
          } else {
            const newNotif = {
              message: res.data.errMsg,
              status: 'error',
              show: true
            }

            this.$store.dispatch('showNotif', newNotif)
          }
        })
        .catch(err => {
          console.log(err)
          this.$store.getters.getProgressBar.done()
        })
    }
  }
}
</script>

<style scoped>
  .detailFood {
    background-color: white;
    position: fixed;
    display: flex;
    margin-left: 70%;
    width: 30%;
    height: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }

  .noDetail{
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .noDetail .title{
    font-weight: bold;
    font-size: 15pt;
  }

  .noDetail .command{
    color: #CECECE;
  }

  .detail {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
  }

  .detail .header {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  .detail .header .headerImg {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }

  .detail .main .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .detail .main .item .title{
    width: 40%;
    font-size: 15pt;
  }

  .detail .main .item .action{
    flex: 1;
  }

  .detail .main .item .action .dropdown, .detail .main .item .action input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-weight: bold;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
    border: 0px;
    border-radius: 10px;
    height: 40px;
    cursor: pointer;
  }

  .detail .main .item .action .dropdown:hover .list{
    display: block;
  }

  .detail .main .item .action .dropdown .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detail .main .item .action .dropdown .header img{
    width: 20px;
  }

  .detail .main .item .action .dropdown .list{
    background-color: white;
    display: none;
    position: relative;
    width: 100%;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
  }

  .detail .main .item .action .dropdown .list .item{
    padding: 10px;
    margin-top: 0px;
  }

  .detail .main .item .action .dropdown .list .item:hover{
    background-color: rgba(190, 195, 202, 1);
  }

  .detail .footer{
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .detail .footer button{
    margin: 5px;
    border: none;
    color: white;
    font-weight: bold;
    padding: 10px;
    width: 50%;
    border-radius: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    .detailFood{
        display: flex;
        z-index: 1;
        width: 40%;
        margin-left: 60%;
    }
  }
</style>
