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
            <input type="text" v-model="image">
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
        axios.post(process.env.VUE_APP_API + '/product', {
          name: this.name,
          price: this.price,
          stock: this.stock,
          category: this.category,
          imgLocation: this.image
        })
        .then(res => {
          const success = res.data.success

          if (success) {
            const newProduct = {
              id: (parseInt(this.$store.state.products[0].id) + 1).toString(),
              name: this.name,
              price: parseInt(this.price),
              stock: parseInt(this.stock),
              category: this.category,
              imgLocation: this.image
            }

            this.$store.dispatch('addProduct', newProduct)
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
    height: 65%;
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
    cursor: pointer;
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
</style>