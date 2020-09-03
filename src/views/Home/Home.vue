<template>
  <section class='main'>
    <article class='listFood'>
      <ProductItem 
        v-for='item in items' :key='item.id'
        :id="item.id"
        :name="item.name"
        :price="item.price"
        :stock="item.stock"
        :image="host + item.imgLocation"
      />
    </article>
        
    <section class='listOrder'>
          
      <div class="noOrder" id="noOrder" v-if="cart.length === 0">
        <div class="icon">
          <img src="@/assets/icon/food-and-restaurant.png">
        </div>
            
        <div class="title">
          Your cart is empty
        </div>
            
        <div class="command">
          Please add some items from the menu
        </div>
      </div>

      <div class="order" id="order" v-if="cart.length > 0">
        <div class="list" :style="[cart.length > 3 ? {'overflow': 'scroll'}:{'overflow': 'hidden'}]">
          <!--Show list item order-->
          <OrderItem 
            v-for='item in cart' :key='item.id'
            :id="item.id"
            :name="item.name"
            :price="item.price"
            :stock="item.stock"
            :image="item.image"
            :estimasi="item.estimasi"
            :pay="item.pay"
          />     
        </div>
            
        <!--Menu for confirm ordered-->

        <div class="confirm">
          <div class="info">
            <div class="price">
              <div class="total">
                Total:
              </div>
              <div class="count" id="pay">
                Rp. {{ pay }}
              </div>
            </div>
            *Belum termasuk ppn
          </div>

          <div class="action">
            <button class="yes" onclick="Order.checkout()">Checkout</button>
            <button class="no" onclick="Order.clear()">Cancel</button>
          </div>
        </div>

      </div>

    </section>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem'
import OrderItem from '@/components/OrderItem'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    ProductItem,
    OrderItem
  },
  data (){
    return {
      host: 'http://localhost/',
      pay: 0
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
    items() {
      return this.$store.getters.getProducts
    }
  },
  mounted () {
    axios.get(process.env.VUE_APP_API + '/product')
      .then(res => {
        const list = res.data.values
        this.$store.dispatch('changeProducts', list)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updated () {
    this.pay = this.$store.getters.getCart.reduce((a, b) => a + (b['pay'] || 0), 0)
  }
}
</script>

<style scoped>
  main section.main{
    margin-top: 80px;
    display: flex;
    margin-left: auto;
    flex: 1;
    justify-content: center;
  }

  main section .listFood{
    margin-left: 70px;
    margin-right: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    flex: 1;
    background-color: rgba(190, 195, 202, 0.3);
    width: 300px;
    min-height: 500px;
  }

  main section .listOrder{
    background-color: white;
    position: fixed;
    display: flex;
    margin-left: 70%;
    width: 30%;
    height: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }

  .listOrder .noOrder{
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .noOrder .title{
    font-weight: bold;
    font-size: 15pt;
  }

  .noOrder .command{
    color: #CECECE;
  }

  .order .list{
    color: black;
    height: 60%;
  }

  .listOrder .order{
    background-color: white;
    color: black;
    padding: 10px;
    width: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
  }

  .order .confirm{
    color: black;
  }

  .confirm .info{
    padding: 10px;
  }

  .confirm .info .price{
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }

  .confirm .action button.yes{
    font-size: 13pt;
    width: 100%;
    padding: 10px;
    color: white;
    border: none;
    margin: 3px;
    background-color: #57CAD5;
  }

  .confirm .action button.no{
    font-size: 13pt;
    width: 100%;
    padding: 10px;
    color: white;
    border: none;
    margin: 3px;
    background-color: #F24F8A;
  }
</style>