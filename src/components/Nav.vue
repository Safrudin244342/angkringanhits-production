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
              <input type="text" name="addProductName" id="addProductName">
            </div>
          </div>

          <div class="item">
            <div class="title">Image</div>
            <div class="action">
              <input type="text" name="addProductImage" id="addProductImage">
            </div>
          </div>

          <div class="item">
            <div class="title">Price</div>
            <div class="action">
              <input type="text" name="addProductPrice" id="addProductPrice" style="width: 80%;">
            </div>
          </div>

          <div class="item">
            <div class="title">Category</div>
            <div class="action">
              <div class="dropdown" style="width: 60%;">
                <div class="header">
                  <div class="value">Category</div>
                  <div class="icon"><img src="@/assets/icon/Polygon.png"></div>
                </div>
                <div class="list">
                  <div class="item">Food</div>
                  <div class="item">Drink</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="footer">
          <button style="background-color: #F24F8A;">Cancel</button>
          <button style="background-color: #57CAD5;">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style>
  aside{
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
    height: 60%;
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
  }
</style>