<template>
  <div class='item' @click="select">
    <div class="img">
      <img :src="image">
      <div class="select" v-if="selectState">
        <img src="@/assets/icon/tick (1).png">
      </div>
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div class="price">
      Rp. {{ Rupiah(price) }}
    </div>
  </div>  
</template>

<script>
export default {
  name: 'settingItem',
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
      type: String
    },
    category: {
      type: String,
      required: true
    }
  },
  methods: {
    select() {
      if (this.selectState) {
        const newSelect = {}
        this.$store.dispatch('changeSettingDetail', newSelect)
      } else {
        const newSelect = {
          id: this.id,
          name: this.name,
          price: this.price,
          stock: this.stock,
          image: this.image,
          category: this.category
        }
        this.$store.dispatch('changeSettingDetail', newSelect)
      }
    }
  },
  computed: {
    selectState() {
      return (this.$store.getters.getSettingDetail.id || 0) === this.id ? true:false
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

  @media screen and (max-width: 800px) {
    .item{
        width: 180px;
        height: 200px;
    }

    .item .img img{
        width: 180px;
        height: 150px;
    }
  }
</style>
