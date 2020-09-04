<template>
  <div class='modal'>
    <div class="checkout" id="checkout">
                
      <div class="header">
        <div class="navigation">
          <button @click="closeModal()">
            x
          </button>
        </div>

        <div class="type">
          <div class="title">
            Checkout
          </div>
          <div class="number">
            Receipt no: #010410919
          </div>
        </div>

        <div class="info">
          Cashier: Nadia
        </div>
      </div>

      <!--Body Modal-->
      <div class="body">
        <div class="listItem" id="checkoutList" :style="[carts.length > 3 ? {'overflow':'scroll'}:{'overflow':'hidden'}]">

          <div class='item' v-for="cart in carts" :key="cart.id">
            <div class="name">
                {{ cart.name }} {{ cart.estimasi }}x
            </div>
            <div class="price">
                Rp. {{ Rupiah(cart.pay) }}
            </div>
          </div>

          <div class='item'>
            <div class="name">
              Ppn 10%
            </div>
            <div class="price">
              Rp. {{ Rupiah(tax) }}
            </div>
          </div>

        </div>

        <div class="price" id="checkoutPrice">
          Total: Rp. {{ Rupiah(payAll) }}
        </div>
      </div>

      <!--Footer modal-->
      <div class="footer">
        Payment: Cash
        <div class="navigation">
          <button class="yes" @click="saveCheckout()">Print</button>
            Or
          <button class="no">Send Email</button>
        </div>
      </div>
    </div>
  </div>  
</template>


<script>
import axios from 'axios'

export default {
  name: 'modalCheckout',
  props: {
    closeModal: {
      type: Function,
      required: true
    }
  },
  computed: {
    carts() {
      return this.$store.getters.getCart
    },
    payAll() {
      return this.$store.getters.getCart.reduce((a, b) => a + (b['pay'] || 0), 0) + this.tax
    },
    tax() {
      return (this.$store.getters.getCart.reduce((a, b) => a + (b['pay'] || 0), 0) / 100) * 10
    }
  },
  methods: {
    saveCheckout() {
      let listOrder = this.carts.reduce((a, b) => a + ',' + (b['name'] || ''), '')
      listOrder = listOrder.substr(listOrder.indexOf(",") + 1)
      const cashier = 'safrudin'
      const amount = this.payAll
      
      axios.post(process.env.VUE_APP_API + '/history', {
        cashier,
        amount,
        orders: listOrder
      })
        .then(res => {
          const success = res.data.success

          if (success){
            const newNotif = {
              message: 'Success',
              status: 'success',
              show: true
            }
            this.$store.dispatch('showNotif', newNotif)
            this.$store.dispatch('cleanOrder')
            this.closeModal()
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
    z-index: 2;
  }

  .modal .checkout{
    justify-self: center;
    width: 50%;
    height: 85%;
    background-color: white;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    font-weight: bold;
    box-sizing: border-box;
  }

  .checkout .header .navigation{
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
  }

  .checkout .header .navigation button{
    border: none;
    font-size: 20pt;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
  }

  .checkout .header .type{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 17pt;
  }

  .checkout .header .info{
    padding: 10px;
  }

  .checkout .body{
    padding: 10px;
  }

  .checkout .body .listItem{
    height: 130px;
  }

  .checkout .body .listItem .item{
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
  }

  .checkout .body .listItem .item .name{
    width: 200px;
    height: 20px;
  }

  .checkout .body .price{
    text-align: right;
  }

  .checkout .footer .navigation{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .checkout .footer .navigation button{
    border: none;
    padding: 10px;
    width: 100%;
    border-radius: 10px;
    color: white;
    font-size: 20pt;
    cursor: pointer;
  }

  .checkout .footer .navigation button.yes{
    background-color: #F24F8A;
  }

  .checkout .footer .navigation button.no{
    background-color: #57CAD5;
  }
</style>
