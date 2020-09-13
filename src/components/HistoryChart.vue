<template>
  <div class='chart'>
    <div class="header">
        <div class="name">
          Revenue
        </div>
        <div class="action">
          <div class='dropdown'>
            <div class='header'>
              {{ chartBy }}
              <img src="@/assets/icon/arrow-down-sign-to-navigate 1.png">
            </div>
            <div class='list'>
              <div class='item' v-for="(by, id) in listChartBy" :key="id" @click="changeChartBy(by)">{{ by }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class='main'>
        <LineChart 
          v-if="this.chartLast.length > 0"
          :nowId="this.chartID"
          :nowData="this.chartNow"
          :lastData="this.chartLast"
          :state="this.chartBy">
        </LineChart>
      </div>
  </div>  
</template>

<script>
import LineChart from '@/components/LineChart'
import axios from 'axios'

export default {
  name: 'HistoryChart',
  data() {
    return {
      chartBy: 'week',
      listChartBy: ['week', 'month'],
      chartID: [],
      chartNow: [],
      chartLast: []
    }
  },
  computed: {
    token() {
      return this.$store.getters.getToken
    }
  },
  components: {
    LineChart
  },
  mounted() {
    axios.get(process.env.VUE_APP_API + `/history/report/${this.chartBy}`, {
      headers: {
        token: this.token
      }
    })
      .then(res => {
        if (res.data.token) this.$store.dispatch('changeToken', res.data.token)

        this.chartID = res.data.values.now.id
        this.chartNow = res.data.values.now.amount
        this.chartLast = res.data.values.last.amount
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    changeChartBy(by) {
      this.chartBy = by
    }
  }
}
</script>

<style scoped>
  .chart .header{
    display: flex;
    justify-content: space-between;
  }

  .chart .header .name{
    font-weight: bold;
    font-size: 15pt;
  }

  .chart .header .action{
    background-color: #CECECE;
    padding: 5px;
    font-weight: bold;
    border-radius: 10px;
    font-size: 10pt;
    cursor: pointer;
  }

  .chart .header .action .dropdown:hover .list{
    display: block;
  }

  .chart .header .action .dropdown .list {
    position: absolute;
    display: none;
    background-color: #CECECE;
    border-radius: 10px;
  }

  .chart .header .action .dropdown .list .item {
    padding: 10px;
  }

  .chart .header .action .dropdown .list .item:hover {
    background-color: white;
    border-radius: 10px;
  }
</style>
