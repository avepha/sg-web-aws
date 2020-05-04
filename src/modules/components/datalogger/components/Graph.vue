<template>
  <section>
    <div id="graphdiv" style="width:100%; height:300px;"></div>
  </section>
</template>

<script>
  import moment from 'moment';
  export default {
    props: ['data', 'sensor'],
    data() {
      return {
        strData: '',
        date: '',
        sensorUnit: {
          temperature: '(C)',
          humidity: '(%)',
          vpd: 'Vapor (Pa)',
          soil_temperature: '(C)',
          soil: '(%)',
          soil_potential: '(P)',
          par: '(Watt/sqm)',
          paracc: '(J/sqm)',
          co2: '(ppm)',
          light: '(Lux)'
        }
      }
    },
    methods: {
      createGraph: function () {
        setTimeout(() => {
          new Dygraph(
            document.getElementById("graphdiv"),
            this.strData, {
              customBars: true,
              title: `${this.translate('logger-daily')} ${this.translate(this.sensor)} : in ${this.date}`,
              ylabel: `${this.translate(this.sensor)} ${this.sensorUnit[this.sensor]}`,
              legend: "always",
              labelsDivStyles: {
                textAlign: "right"
              },
              showRangeSelector: true
            }
          );
          // console.log("[Info] Show Dygraphs");
        }, 500);
      },
      craftStringData: function () {
        this.strData = "Date," + this.sensor.toUpperCase() + "\n";
        this.date = moment(this.data[0].created_time).format('MMM Do YYYY');
        this.data.forEach(log => {
          let datetime = moment(log.created_time).format('YYYY-MM-DD HH:mm:ss')
          let sensorData = (log['sensors'][this.sensor] - 5) + ";" + (log['sensors'][this.sensor]) + ";" + (log['sensors'][this.sensor] + 5);
          let str = datetime + "," + sensorData + "\n";
          this.strData += str;
        });
      }
    },
    mounted() {
      this.craftStringData();
      this.createGraph();
    }
  }
</script>
