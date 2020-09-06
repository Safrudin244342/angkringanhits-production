<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        chartData: {
          labels: ["Babol",	"Cabanatuan",	"Daegu",	"Jerusalem",	"Fairfield",	"New York",	"Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
          datasets: [
            {
              label: 'Line Chart',
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#FBB2B4',
              backgroundColor: '#2554FF',
              borderWidth: 5
            },
            {
              label: 'Line Chart',
              data: [700,	1250,	542,	6550,	1522,	2241,	2259,	257,	1245, 9341],
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
    }
  }
</script>