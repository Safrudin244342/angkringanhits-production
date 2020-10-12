<template>
  <div class='header'>
    <div class="mainHeader">
      <div class="menu" style="cursor: pointer;" @click="showMenu()" id="btnMenu">
        <svg viewBox="0 0 24 24" width='30' height='30'>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </div>
  
      <div class="title">
        {{ path === '/' ? 'Food Items':path === '/history' ? 'History':path === '/user' ? 'User':'Setting' }}
      </div>
                
      <div class="navigation">
        <div class="search">
          <div class='navSearch' v-if="stateSearch">
            <input type='text' v-model="search">
            <img src='@/assets/icon/magnifying-glass.png' width='24' height=24 @click="searchProduct()">
          </div>
          <img src='@/assets/icon/magnifying-glass.png' width='24' height=24 @click="showSearch()" v-if="path === '/'">
        </div>

        <div class="cart" id="btnOrder" onclick="showListOrder()">
          <img src='@/assets/icon/cart.png' width='24' height=24>
          <div id="countOrder" style="position: absolute; top: 50%; right: 20px; padding: 2px; background-color: #57CAD5; border-radius: 10px;">
            {{ cart.length }}
          </div>
        </div>
      </div>
    </div>
    <div class="cartHeader" :style="[path === '/' || path === '/setting' ? {'display':'flex'}:{'display':'none'}]">
      <div class='title'>
        {{ path === '/' ? 'Cart':'Item' }}
      </div>
      <div class="order" id="countOrder" v-if="path === '/'">
        {{ cart.length }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'header', 
  computed: {
    cart() {
      return this.$store.getters.getCart
    },
    path() {
      return this.$store.getters.getPath
    }
  },
  data () {
    return {
      stateSearch: false,
      search: ''
    }
  },
  methods: {
    showSearch() {
      this.stateSearch = !this.stateSearch
    },
    searchProduct() {
      if (this.search == '') return this.stateSearch = false
      axios.get(process.env.VUE_APP_API + '/product/search?name=' + this.search + `&time=timestamp=${new Date().getTime()}`)
        .then(res => {
          this.$store.dispatch('changeProducts', res.data.values)
          this.stateSearch = false
          this.search = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    showMenu() {
      this.$store.dispatch('showMenu')
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    font-weight: bold;
    position: fixed;
    z-index: 1;
    width: 100%;
    margin-top: 0px;
    background-color: white;
    box-sizing: border-box;
  }

  .header .mainHeader{
    flex: 1;
    align-items: center;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
  }

  .header .mainHeader .title{
    font-size: 30px;
    display: block;
  }

  .header .mainHeader .navigation .cart{
    display: none;
  }

  .header .cartHeader{
    display: flex;
    margin-left: auto;
    align-items: center;
    width: 30%;
    justify-content: center;
  }

  .header .cartHeader .order{
    background-color: #57CAD5;
    width: 20x;
    text-align: center;
    font-size: 9pt;
    color: white;
    padding: 2px;
    margin: 2px;
    border-radius: 50px;
  }

  .search {
    cursor: pointer;
    display: flex;
  }

  .header .mainHeader .navigation .navSearch {
    position: fixed;
    display: flex;
    background-color: white;
    align-items: center;
    box-shadow: 0px 4px 8px 2px rgba(190, 195, 202, 0.3);
    padding: 2px;
    border-radius: 10px;
  }

  .header .mainHeader .navigation .navSearch input {
    border: 1px;
    box-sizing: border-box;
    padding: 10px;
    font-weight: bold;
    border: 0px;
    border-radius: 10px;
    height: 40px;
  }

  @media screen and (max-width: 400px){
    .header .mainHeader .title{
      font-size: 20px;
    }

    .header .cartHeader{
      width: 0px;
    }

    .header .cartHeader .title {
      display: none;
    }

    .header .cartHeader .order {
      display: none;
    }

    .header .mainHeader .navigation{
      display: flex;
      flex-direction: row;
    }

    .header .mainHeader .navigation .cart{
      display: block;
    }

    .header .mainHeader .navigation img{
      cursor: pointer;
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 800px) and (min-width: 620px){
    .header .mainHeader .title{
        font-size: 20px;
    }

    .header .cartHeader{
        display: flex;
        width: 40%;
    }

    .header .mainHeader .navigation{
        display: flex;
        flex-direction: row;
    }

    .header .mainHeader .navigation .cart{
        display: none;
    }

    .header .mainHeader .navigation img{
        cursor: pointer;
        margin-right: 10px;
    }
  }
</style>
