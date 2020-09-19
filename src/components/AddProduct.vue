<template>
  <div class="modal" v-if="model">
    <div class="addItem" id="addItem">
      <!--Modal Header-->
      <div class="header">
        <div class="title">
          Add Item
        </div>

        <div class="navigation">
          <button @click="closeModel()">
            x
          </button>
        </div>
      </div>

      <!--Modal Body-->
      <div class="body">

        <div class="item">  
          <div class="title">Name</div>
          <div class="action">
            <input type="text" v-model="name">
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
            <input type="text" style="width: 80%;" v-model="price">
          </div>
        </div>

        <div class="item">
          <div class="title">Stock</div>
          <div class="action">
            <input type="text" style="width: 60%;" v-model="stock">
          </div>
        </div>

        <div class="item">
          <div class="title">Category</div>
          <div class="action">
            <div class="dropdown" style="width: 60%;">
              <div class="header">
                <div class="value">{{ category }}</div>
                <div class="icon"><img src="@/assets/icon/Polygon.png"></div>
              </div>
              <div class="list">
                <div class="item" v-for="cat in categorys" :key="cat.id" @click="selectCat(cat.category)">{{ cat.category }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="footer">
        <button style="background-color: #F24F8A;" @click="closeModel()">Cancel</button>
        <button style="background-color: #57CAD5;" @click="addProduct()">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FormData from 'form-data'

export default {
  name: 'AddProduct',
  props: {
    closeModel: {
      type: Function
    },
    model: {
      type: Boolean
    }
  },
  data () {
    return {
      categorys: [],
      category: 'Category',
      name: '',
      image: '',
      price: '',
      stock: '',
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API + '/category')
      .then(res => {
        const list = res.data.values
        this.categorys = list
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    selectCat(selectCat){
      this.category = selectCat
    },
    addProduct(){
      if (!(this.category === 'Category')) {
        const productData = new FormData()
        productData.append('name', this.name)
        productData.append('price', this.price)
        productData.append('stock', this.stock)
        productData.append('category', this.category)
        productData.append('image', this.image)
        
        const axiosConfig = {
          method: 'POST',
          url: process.env.VUE_APP_API + '/product',
          headers: {
            token: this.$store.getters.getToken,
            'Content-Type': 'multipart/form-data'
          },
          data: productData
        }

        axios(axiosConfig)
        .then(res => {
          console.log(res)
          const success = res.data.success

          if (success) {
            if (res.data.token) this.$store.dispatch('changeToken', res.data.token)

            const newProduct = {
              id: (parseInt(this.$store.getters.getProducts[0].id) + 1).toString(),
              name: res.data.values[0].name,
              price: parseInt(res.data.values[0].price),
              stock: parseInt(res.data.values[0].stock),
              category: res.data.values[0].category,
              image: res.data.values[0].image
            }

            this.$store.dispatch('addProduct', newProduct)

            const newNotif = {
              message: 'Success',
              status: 'success',
              show: true
            }
            this.$store.dispatch('showNotif', newNotif)

            this.closeModel()
            this.name = ''
            this.price = ''
            this.image = ''
            this.stock = ''
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
        })
      } else {
        const newNotif = {
          message: 'Category belum dipilih',
          status: 'error',
          show: true
        }

        this.$store.dispatch('showNotif', newNotif)
      }
    },
    changeImageFile() {
      this.image = this.$refs.file.files[0]
    }
  }
}
</script>

<style scoped>
  .modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 20px;
    z-index: 1;
  }

  .modal .addItem{
    justify-self: center;
    width: 35%;
    height: auto;
    background-color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    font-weight: bold;
    box-sizing: border-box;
  }

  .addItem .header{
    display: flex;
    justify-content: space-between;
  }

  .addItem .header .title{
    font-size: 20pt;
  }

  .addItem .header .navigation{
    display: flex;
    justify-content: flex-end;
  }

  .addItem .header .navigation button{
    border: none;
    font-size: 20pt;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
  }

  .addItem .body{
    height: 70%;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .addItem .body .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .addItem .body .item .title{
    width: 40%;
    font-size: 15pt;
  }

  .addItem .body .item .action{
    flex: 1;
  }

  .addItem .body .item .action .dropdown, .addItem .body .item .action input{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-weight: bold;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
    border: 0px;
    border-radius: 10px;
    height: 40px;
  }

  .addItem .body .item .action .dropdown:hover .list{
    display: block;
  }

  .addItem .body .item .action .dropdown .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .addItem .body .item .action .dropdown .header img{
    width: 20px;
  }

  .addItem .body .item .action .dropdown .list{
    background-color: white;
    display: none;
    position: relative;
    width: 100%;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
  }

  .addItem .body .item .action .dropdown .list .item{
    padding: 10px;
    margin-top: 0px;
  }

  .addItem .body .item .action .dropdown .list .item:hover{
    background-color: rgba(190, 195, 202, 1);
  }

  .addItem .footer{
    display: flex;
    justify-content: flex-end;
  }

  .addItem .footer button{
    margin: 5px;
    border: none;
    color: white;
    font-weight: bold;
    padding: 10px;
    width: 100px;
    border-radius: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    .modal .addItem{
        width: 60%;
        height: 65%;
    }

    .addItem .header .title{
        font-size: 20pt;
    }

    .addItem .body .item .title{
        width: 30%;
        font-size: 15pt;
    }

    .addItem .body .item .action .dropdown .header .value{
        font-size: 15px;
    }

    .addItem .body .item .action .dropdown .header img{
        width: 10px;
    }

    .addItem .body .item .action .dropdown .list .item{
        font-size: 15px;
    }
  }
</style>