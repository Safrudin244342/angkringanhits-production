<template>
  <div id="app">
    <AppHeader />
    <main>
      <AppNav />
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
          <div class="noOrder" id="noOrder">
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
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from './components/Header'
import AppNav from './components/Nav'
import ProductItem from './components/ProductItem'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav,
    ProductItem
  },
  data (){
    return {
      items: null,
      host: 'http://localhost/'
    }
  },
  mounted () {
    axios.get('http://localhost:3000/product')
      .then(res => {
        const list = res.data.values
        this.items = list
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
  main{
    display: flex;
  }

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
</style>
