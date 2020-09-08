<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        chartData: {
          labels: this.nowId,
          datasets: [
            {
              label: `This ${this.state}`,
              data: this.nowData,
              fill: false,
              borderColor: '#FBB2B4',
              backgroundColor: '#2554FF',
              borderWidth: 5
            },
            {
              label: `Last ${this.state}`,
              data: this.lastData,
              fill: false,
              borderColor: '#29DFFF',
              backgroundColor: '#2554FF',
              borderWidth: 5
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
    watch: {
      data: function() {
        this._chart.destroy();
        this.renderLineChart();
      }
    },
    props: {
      nowId: {
        type: Array,
        required: true
      },
      nowData: {
        type: Array,
        required: true
      },
      lastData: {
        type: Array,
        required: true
      },
      state: {
        type: String,
        required: true
      }
    }
  }
</script>