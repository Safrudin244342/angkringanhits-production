<template>
  <div>
    <aside id="menu">
      <div class="buttonFood">
        <a href="./">
          <img src="@/assets/icon/fork.png">
        </a>
      </div>
      <div class="buttonHistory">
        <a href="./history.html">
          <img src="@/assets/icon/clipboard.png">
        </a>
      </div>
      <div class="buttonAdd" @click="addProduct()">
        <img src="@/assets/icon/add.png">
      </div>
    </aside>

    <AddProduct :closeModel='this.closeModel' :model='model'/>
  </div>
</template>

<script>
import AddProduct from './AddProduct'

export default {
  name: 'header',
  data (){
    return {
      model: false
    }
  },
  methods: {
    addProduct(){
      this.model = true
    },
    
    closeModel(){
      this.model = false
    }
  },
  components: {
    AddProduct
  }
}
</script>

<style>
  aside{
    z-index: 1;
    margin-top: 80px;
    padding: 8.8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    background-color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    box-sizing: border-box;
  }

  aside img{
    margin-top: 20px;
    width: 30px;
    height: 30px;
    padding: 10px;
    cursor: pointer;
  }

  aside img:hover{
    background-color: rgba(190, 195, 202, 0.3);
    border-radius: 10px;
  }
</style>