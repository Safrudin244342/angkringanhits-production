<template>
  <div class='main'>
    <div class='listFood'>
      <SettingItem 
        v-for='item in items' :key='item.id'
        :id="item.id"
        :name="item.name"
        :price="item.price"
        :stock="item.stock"
        :image="item.imgLocation"
        :category="item.category"
      />
    </div>

    <SettingDetail />
  </div>  
</template>

<script>
import SettingItem from '@/components/SettingItem'
import SettingDetail from '@/components/SettingDetail'
import axios from 'axios'

export default {
  name: 'setting',
  components: {
    SettingItem,
    SettingDetail
  },
  mounted () {
    axios.get(process.env.VUE_APP_API + '/product')
      .then(res => {
        this.$store.dispatch('changeListItemSetting', res.data.values)
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    items() {
      return this.$store.getters.getListItemSetting
    }
  }
}
</script>

<style scoped>
  .main{
    margin-top: 80px;
    display: flex;
    margin-left: auto;
    flex: 1;
    z-index: 0;
    justify-content: center;
  }

  .main .listFood{
    margin-left: 70px;
    margin-right: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex: 1;
    background-color: rgba(190, 195, 202, 0.3);
    width: 300px;
    min-height: 500px;
  }

  @media screen and (max-width: 800px) {
    .main .listFood {
      margin-left: 0px;
      margin-right: 40%;
    }
  }
</style>