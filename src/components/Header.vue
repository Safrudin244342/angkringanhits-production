<template>
  <div class='header'>
    <div class="mainHeader">
      <div class="menu" style="cursor: pointer;" onclick="showMenu()" id="btnMenu">
        <svg viewBox="0 0 24 24" width='30' height='30'>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
      </div>
  
      <div class="title">
        Food Items
      </div>
                
      <div class="navigation">
        <div class="search">
          <img src='@/assets/icon/magnifying-glass.png' width='24' height=24>
        </div>

        <div class="cart" id="btnOrder" onclick="showListOrder()">
          <img src='@/assets/icon/cart.png' width='24' height=24>
          <div id="countOrder" style="position: absolute; top: 50%; right: 20px; padding: 2px; background-color: #57CAD5; border-radius: 10px;">
            0
          </div>
        </div>
      </div>
    </div>
    <div class="cartHeader">
      Cart
      <div class="order" id="countOrder">
        {{ cart.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header', 
  computed: {
    cart() {
      return this.$store.state.cart
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
  }

  @media screen and (max-width: 400px){
    .header .mainHeader .title{
      font-size: 20px;
    }

    .header .cartHeader{
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
</style>