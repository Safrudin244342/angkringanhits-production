<template>
  <section class='main'>
    <div class='header' v-if="Object.keys(income).length > 0">
      <div class="card pink">
        <div class="name">
          Today's Income
        </div>
        <div class="price">
          Rp. {{ Rupiah(income.today.amount) }}
        </div>
        <div class="info">
          <font 
            :class="[income.today.enhancement > 0 ? {'plus':true}:{'minus':true}]"
            :style="[income.today.enhancement > 0 ? {'color':'green'}:{'color':'red'}]">
              {{ income.today.enhancement }}% Yesterday
          </font>
        </div>
      </div>
      <div class="card blue">
        <div class="name">
          Orders
        </div>
        <div class="price">
          {{ Rupiah(income.order.amount) }}
        </div>
        <div class="info">
          <font 
            :class="[income.order.enhancement > 0 ? {'plus':true}:{'minus':true}]" 
            :style="[income.order.enhancement > 0 ? {'color':'green'}:{'color':'red'}]">
              {{ income.order.enhancement }}% Last Week
          </font>
        </div>
      </div>
      <div class="card purple">
        <div class="name">
          This Year's Income
        </div>
        <div class="price">
          Rp. {{ Rupiah(income.year.amount) }}
        </div>
        <div class="info">
          <font 
            :style="[income.year.enhancement > 0 ? {'color':'green'}:{'color':'red'}]"
            :class="[income.year.enhancement > 0 ? {'plus':true}:{'minus':true}]">
              {{ income.year.enhancement }}% Last Year
          </font>
        </div>
      </div>
    </div>

    <div id="chart">
      <HistoryChart />
    </div>

    <div class='table'>
      <div class="header">
        <div class="name">
          Recent Order
        </div>
        <div class="action">
          <div class='dropdown'>
            <div class='header'>
              {{ tableBy }}
              <img src="@/assets/icon/arrow-down-sign-to-navigate 1.png">
            </div>
            <div class='list'>
              <div class='item' v-for="(by, id) in listTableBy" :key="id" @click="changeTableBy(by)">{{ by }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class='main'>
        <table class="styled-table">
          <thead>
            <tr>
              <th style='width: 10%;'>INVOICES</th>
              <th style='width: 15%;'>CASHIER</th>
              <th style='width: 20%;'>DATE</th>
              <th style='width: 45%;'>ORDERS</th>
              <th style='width: 10%;'>AMOUNT</th>
            </tr>
          </thead>
          <tbody v-if="historys.length > 0">
            <tr v-for="history in showHistory" :key="history.id">
              <td>{{ history.id }}</td>
              <td>{{ history.cashier }}</td>
              <td>{{ history.date }}</td>
              <td>{{ history.orders }}</td>
              <td>Rp. {{ Rupiah(history.amount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class='footer' v-if="historys.length > 0">
        <div class='nav'>
          <button @click="prevTablePage()">-</button>
          <div class='page'>
            {{ tablePage }}
          </div>
          <button @click="nextTablePage()">+</button>
        </div>
        from {{ allPage }} page
      </div>
    </div>
  </section> 
</template>

<script>
import axios from 'axios'
import HistoryChart from '@/components/HistoryChart'

export default {
  name: 'history',
  data() {
    return {
      income: {},
      tableBy: 'today',
      listTableBy: ['today', 'week', 'mount'],
      historys: [],
      showHistory: [],
      tablePage: 1,
      allPage: 1,
      pageAmount: 5
    }
  },
  computed: {
    token() {
      return this.$store.getters.getToken
    }
  },
  components: {
    HistoryChart
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      if (vm.$store.getters.getRule !== 'admin') {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      }
      
      next()
    })
  },
  mounted() {
    axios.get(process.env.VUE_APP_API + '/history/report', { 
        headers: { 
          token: this.token,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        } 
      })
      .then(res => {
        if (res.data.token) this.$store.dispatch('changeToken', res.data.token)
        if (res.data.error) return console.log(res.data.errMsg)

        this.income = res.data.values
      })
      .catch(err => {
        console.log(err)
      })
    
    axios.get(process.env.VUE_APP_API + '/history/for/' + this.tableBy,{ 
        headers: { 
          token: this.token,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        } 
      })
      .then(res => {
        if (res.data.token) this.$store.dispatch('changeToken', res.data.token)
        if (res.data.error) return console.log(res.data.errMsg)

        this.historys = res.data.values
        const start = 0
        const end = this.pageAmount 
        this.showHistory = this.historys.slice(start, end)
        this.allPage = Math.round(this.historys.length / this.pageAmount)
        this.tablePage = 1
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    changeTableBy(by) {
      this.tableBy = by
      axios.get(process.env.VUE_APP_API + '/history/for/' + this.tableBy, { 
          headers: { 
            token: this.token,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          } 
        })
        .then(res => {
          if (res.data.token) this.$store.dispatch('changeToken', res.data.token)
          if (res.data.error) return console.log(res.data.errMsg)

          this.historys = res.data.values
          const start = 0
          const end = this.pageAmount 
          this.showHistory = this.historys.slice(start, end)
          this.allPage = Math.round(this.historys.length / this.pageAmount)
          this.tablePage = 1
        })
        .catch(err => {
          console.log(err)
        })
    },
    nextTablePage() {
      if (this.tablePage < this.allPage){
        this.tablePage++
        const start = this.pageAmount * (this.tablePage - 1)
        const end = this.pageAmount * (this.tablePage)
        this.showHistory = this.historys.slice(start, end)
      }
    },
    prevTablePage() {
      if (this.tablePage > 1){
        this.tablePage--
        const start = this.pageAmount * (this.tablePage - 1)
        const end = this.pageAmount * (this.tablePage)
        this.showHistory = this.historys.slice(start, end)
      }
    }
  }
}
</script>

<style scoped>
  section.main{
    padding: 10px;
    margin-top: 100px;
    display: flex;
    margin-left: 62px;
    flex: 1;
    justify-content: center;
    flex-direction: column;
  }

  section.main .header{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
  }

  section.main .header .card{
    padding: 30px;
    width: 320px;
    margin: 10px;
    border-radius: 10px;
    font-weight: bold;
  }

  .card .name, .card .info{
    font-size: 10pt;
  }

  .card .price{
    font-size: 20px;
  }

  .card.pink{
    background: linear-gradient(278.29deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%); 
    filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25)); 
    box-shadow: 5px 8px 4px 0px #ffc8ca;
  }

  .card.blue{
    background: linear-gradient(278.29deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%);
    filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
    box-shadow: 5px 8px 4px 0px #9de9f7;
  }

  .card.purple{
    background: linear-gradient(278.29deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%);
    filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
    box-shadow: 5px 8px 4px 0px #dfb6ff;
  }

  .plus::before {
    content: '+';
    color: green;
  }

  .minus::before {
    color: red;
  }

  section.main .chart{
    box-shadow: 0px 4px 8px 0px rgb(189, 189, 189);
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    margin-top: 20px;
  }

  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    width: 100%;
  }

  .styled-table thead tr {
    background-color: white;
    color: black;
    text-align: left;
    border-bottom: 2px solid #dddddd;
  }

  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #c1c2c2;
  }

  .styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  .styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  section.main .table{
    box-shadow: 0px 4px 8px 0px rgb(189, 189, 189);
    border-radius: 10px;
    padding: 10px;
    margin: 20px;
    margin-top: 20px;
  }

  section.main .table .header{
    display: flex;
    justify-content: space-between;
  }

  section.main .table .header .name{
    font-weight: bold;
    font-size: 15pt;
  }

  section.main .table .header .action{
    background-color: #CECECE;
    padding: 5px;
    font-weight: bold;
    border-radius: 10px;
    font-size: 10pt;
    cursor: pointer;
  }

  .table .header .action .dropdown:hover .list{
    display: block;
  }

  .table .header .action .dropdown .list {
    position: absolute;
    display: none;
    background-color: #CECECE;
    border-radius: 10px;
  }

  .table .header .action .dropdown .list .item {
    padding: 10px;
  }

  .table .header .action .dropdown .list .item:hover {
    background-color: white;
    border-radius: 10px;
  }

  .table .footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }

  .table .footer .nav {
    display: flex;
    flex-direction: row;
    border: 1px solid #CECECE;
    margin: 5px;
  }

  .table .footer .nav button {
    border: none;
    background-color: #CECECE;
    cursor: pointer;
  }

  .table .footer .nav .page {
    margin: 5px;
  }

  @media screen and (max-width: 800px){
    main section.main{
        margin-left: 0px;
    }
  }
</style>