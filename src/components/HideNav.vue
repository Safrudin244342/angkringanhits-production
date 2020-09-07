<template>
  <div>
    <aside id="menu">
      <div class="buttonFood">
        <router-link to="/">
          <img src="@/assets/icon/fork.png">
        </router-link>
      </div>
      <div class="buttonHistory">
        <router-link to='/history'>
          <img src="@/assets/icon/clipboard.png">
        </router-link>
      </div>
      <div class="buttonAdd" @click="addProduct()">
        <img src="@/assets/icon/add.png">
      </div>
      <div class="buttonSetting">
        <router-link to='/setting'>
          <img src="@/assets/icon/settings-icon.png">
        </router-link>
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

<style scoped>
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

  @media screen and (max-width: 400px){
    aside{
        margin-top: 74px;
        z-index: 1;
    }

    aside img{
        margin-top: 0px;
    }

    section{
        margin-top: 74px;
    }
  }

  @media screen and (max-width: 800px) {
    aside{
        margin-top: 74px;
        z-index: 1;
    }

    aside img{
        margin-top: 0px;
    }
  }
</style>