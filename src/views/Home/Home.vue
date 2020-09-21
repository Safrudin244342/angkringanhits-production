<template>
  <section class='main' :style="[modalCheckoutState ? { 'z-index':'2' }:{ 'z-index':'0' }]">
    <article class='listFood'>
      <div class='header'>

        <div class='navShow' @click="showAllFoods()">
          Show All Foods
        </div>

        <div class='navSort'>
          Sort By 
          <div class='dropdown'>
            <div class='header'>
              {{ sort }}
              <img src="@/assets/icon/arrow-down-sign-to-navigate 1.png" width='10px' height="10px">
            </div>
            <div class='list'>
              <div class='item' v-for="(by, id) in listSort" :key="id" @click="changeSort(by)">{{ by }}</div>
            </div>
          </div>
        </div>

        <div class='dropdown'>
          <div class='header'>
            {{ sortAction }}
            <img src="@/assets/icon/arrow-down-sign-to-navigate 1.png" width='10px' height="10px">
          </div>
          <div class='list'>
            <div class='item' v-for="(action, id) in listSortAction" :key="id" @click="changeSortAction(action)">{{ action }}</div>
          </div>
        </div>

      </div>
      <div class='main'>
        <ProductItem 
          v-for='item in items' :key='item.id'
          :id="item.id"
          :name="item.name"
          :price="item.price"
          :stock="item.stock"
          :image="item.imgLocation"
        />
      </div>
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
                Rp. {{ Rupiah(pay) }}
              </div>
            </div>
            *Belum termasuk ppn
          </div>

          <div class="action">
            <button class="yes" @click="showCheckout()">Checkout</button>
            <button class="no" @click="cleanOrder()">Cancel</button>
          </div>
        </div>

      </div>
      <Checkout 
        v-if="modalCheckoutState"
        :closeModal="showCheckout"
      />
    </section>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem'
import OrderItem from '@/components/OrderItem'
import Checkout from '@/components/Checkout'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    ProductItem,
    OrderItem,
    Checkout
  },
  data (){
    return {
      host: 'http://localhost/',
      pay: 0,
      modalCheckoutState: false,
      listSort: ['name', 'price', 'date'],
      sort: 'name',
      listSortAction: ['Z-A'],
      sortAction: 'A-Z',
      idAction: 1
    }
  },
  computed: {
    cart() {
      return this.$store.getters.getCart
    },
    items() {
      return this.$store.getters.getProducts
    }
  },
  mounted () {
    axios.get(process.env.VUE_APP_API + `/product?time=timestamp=${new Date().getTime()}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
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
  },
  methods: {
    showCheckout() {
      this.modalCheckoutState = !this.modalCheckoutState
    },
    cleanOrder(){
      this.$store.dispatch('cleanOrder')
    },
    changeSort(sort) {
      this.sort = sort
      this.listSortAction = sort === 'name' ? ['Z - A']:sort === 'price' ? ['Termahal - Termurah']:['Baru - Lama']
      this.sortAction = sort === 'name' ? 'A - Z':sort === 'price' ? 'Termurah - Termahal':'Lama - Baru'
      this.idAction = 1

      const action = this.idAction === 1 ? 'down':'up'

      axios.get(process.env.VUE_APP_API + `/product/by/${sort}/${action}?time=timestamp=${new Date().getTime()}`)
        .then(res => {
          this.$store.dispatch('changeProducts', res.data.values)
          console.log(res.data)
          console.log(`/product/by/${sort}/${action}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeSortAction(sortAction) {
      this.sortAction = [sortAction, this.listSortAction[0] = this.sortAction][0]
      this.idAction = this.idAction === 1 ? 2:1

      const action = this.idAction === 1 ? 'down':'up'

      axios.get(process.env.VUE_APP_API + `/product/by/${this.sort}/${action}?time=timestamp=${new Date().getTime()}`)
        .then(res => {
          this.$store.dispatch('changeProducts', res.data.values)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showAllFoods() {
      axios.get(process.env.VUE_APP_API + `/product?time=timestamp=${new Date().getTime()}`)
        .then(res => {
          const list = res.data.values
          this.$store.dispatch('changeProducts', list)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  main section.main{
    margin-top: 80px;
    display: flex;
    margin-left: auto;
    flex: 1;
    z-index: 0;
    justify-content: center;
  }

  main section .listFood{
    margin-left: 70px;
    margin-right: 30%;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: rgba(190, 195, 202, 0.3);
    width: 300px;
    min-height: 500px;
  }

  main section .listFood .header {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    flex: 1;
    max-height: 30px;
  }

  main section .listFood .header .navShow {
    background-color: #CECECE;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 10px;
  }

  main section .listFood .header .navSort {
    display: flex;
    align-items: center;
  }

  main section .listFood .header .dropdown {
    margin-left: 10px;
    cursor: pointer;
  }

  main section .listFood .header .dropdown .header {
    background-color: #CECECE;
    padding: 5px;
    border-radius: 10px;
    align-items: center;
  }

  main section .listFood .header .dropdown:hover .list {
    display: block;
  }

  main section .listFood .header .dropdown .list {
    display: none;
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    z-index: 1;
    border-radius: 10px;
  }

  main section .listFood .header .dropdown .list .item {
    padding: 5px;
  }

  main section .listFood .header .dropdown .list .item:hover {
    background-color: #CECECE;
  }

  main section .listFood .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
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

  .confirm button{
    cursor: pointer;
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

  @media screen and (max-width: 400px){

    main section .listFood .header {
      font-size: 10pt;
    }

    main section .listFood{
        margin-left: 0px;
        margin-right: 0px;
        width: 100%;
    }

    main section .listOrder{
        display: none;
        z-index: 1;
        top: 0;
        width: 100%;
        margin-left: 0px;
    }

    .listFood .item{
        max-width: 270px;
        max-height: 272px;
    }

    .listFood .item .img img{
        width: 250px;
        height: 200px;
    }

    .order .list{
        color: black;
        height: 60%;
    }
    
    .order .list .item{
        display: flex;
        padding-top: 5px;
        font-weight: bold;
    }
    
    .order .list .item img{
        width: 70px;
        height: 70px;
        border-radius: 10px;
    }

    .order .list .detail .title{
        font-size: 10pt;
    }

    .order .list .detail .navigation{
        width: 200px;
    }

    .order .list .detail .navigation .action{
        margin-top: 5px;
    }

    .order .list .detail .navigation .price{
        margin-top: 10px;
        font-size: 12pt;
    }

    .listOrder .confirm {
      width: 365px;
    }
  }

  @media screen and (max-width: 800px) and (min-width: 620px){
    main section .listFood{
        margin-left: 0px;
        margin-right: 40%;
    }

    main section .listOrder{
        display: flex;
        z-index: 1;
        width: 40%;
        margin-left: 60%;
    }

    .order .list{
        color: black;
        height: 60%;
    }
    
    .order .list .item{
        display: flex;
        padding-top: 5px;
        font-weight: bold;
    }
    
    .order .list .item img{
        width: 70px;
        height: 70px;
        border-radius: 10px;
    }

    .order .list .detail .title{
        font-size: 10pt;
    }

    .order .list .detail .navigation{
        width: 220px;
    }

    .order .list .detail .navigation .action{
        margin-top: 0px;
    }

    .order .list .detail .navigation .price{
        margin-top: 5px;
        font-size: 10pt;
    }
  }
</style>