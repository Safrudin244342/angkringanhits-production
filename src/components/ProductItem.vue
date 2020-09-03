<template>
  <div class='item' @click="addCart(id, name, price, stock, image)">
    <div class="img">
      <img :src=image>
      <div class="select" v-if="select">
        <img src="@/assets/icon/tick (1).png">
      </div>
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div class="price">
      Rp. {{ price }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
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
    }
  },
  data () {
    return {
      select: false
    }
  },
  methods: {
    addCart(id, name, price, stock, image){
      if (this.$store.getters.getCart.filter(value => value.id == id).length == 0) {
        const estimasi = 1
        const newOrder = {
          id,
          name,
          price,
          stock,
          image,
          estimasi,
          pay: price * estimasi
        }
      
        this.$store.dispatch('addOrder', newOrder)
        this.select = !this.select
      } else {
        this.$store.dispatch('removeOrder', id)

        this.select = !this.select
      }
    }
  }
}
</script>

<style scoped>
  .item{
    max-width: 270px;
    max-height: 270px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .item:hover{
    background-color: #BBBBBB;
  }

  .item .img{
    position: relative;
  }

  .item .img img{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 250px;
    height: 200px;
  }

  .item .img .select{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 67%;
    background-color: black;
    opacity: 0.5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    padding-top: 25%;
  }

  .item .img .select img{
    width: 50px;
    height: 50px;
    opacity: 1;
  }

  .item .price{
    font-weight: bold;
  }

  .item .name{
    font-size: 15pt;
  }
</style>