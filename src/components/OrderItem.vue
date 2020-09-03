<template>
  <div class='item'>
    <img :src=image>
    <div class="detail">
    
      <div class="title">
        {{ name }}
      </div>
    
      <div class="navigation">
        <div class="action">
          <button @click="downEstimasi()">-</button>
          <div id="estimasiOrder${product.id}" class="estimasi">
            {{ newEstimasi }}
          </div>
          <button @click="addEstimasi()">+</button>
        </div>
        <div class="price" id="itemOrderPrice${product.id}">
          Rp. {{ newPay }}
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    estimasi: {
      type: Number,
      required: true
    },
    pay: {
      type: Number,
      required: true
    }
  }, methods: {
    addEstimasi () {
      this.newEstimasi++
      this.newPay = this.price * this.newEstimasi
      this.$store.dispatch('upEstimasi', this.id)
    },

    downEstimasi () {
      if (this.newEstimasi > 1) {
        this.newEstimasi--
        this.newPay = this.price * this.newEstimasi
        this.$store.dispatch('downEstimasi', this.id)
      }
    }
  }, data () {
    return {
      newEstimasi: this.estimasi,
      newPay: this.pay
    }
  }
}
</script>

<style scoped>

  .item{
    display: flex;
    padding: 10px;
    font-weight: bold;
  }

  .item img{
    width: 90px;
    height: 90px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

 .item .detail{
    padding: 5px;
  }

  .item .detail .title{
    font-size: 15pt;
    padding-bottom: 5px;
    box-sizing: border-box;
  }

  .item .detail .navigation{
    width: 260px;
    box-sizing: border-box;
    padding: 10px;
    display: flex; 
    justify-content: space-between;
  }

  .item .detail .navigation .action{
    width: 85px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #82DE3A;
    color: #82DE3A;
    margin-top: 10px;
    bottom: 0px;
  }

  .item .detail .navigation .action .estimasi{
    margin: 5px;
  }

  .item .detail .navigation .action button{
    background-color: rgba(130, 222, 58, 0.2);
    border: none;
    width: 25px;
    color: #82DE3A;
    font-size: 20px;
  }

  .item .detail .navigation .price{
    margin-left: auto;
    margin-top: 15px;
    font-size: 15pt;
  }
</style>