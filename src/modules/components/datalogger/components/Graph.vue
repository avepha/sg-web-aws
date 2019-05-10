<template>
  <section>
    <div id="graphdiv" style="width:100%; height:300px;"></div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import moment from 'moment';
  export default {
    props: ['data', 'sensor'],
    data() {
      return {
        strData: '',
        date: '',
        sensorFullName: {
          soil: 'Soil Moisture (%)',
          temperature: 'Temperature (C)',
          water: 'Water (C)',
          ec: 'Conducitivy (mc/ms)',
          ph: 'Acidity',
          vpd: 'Vapor Pressure (Pa)',
          par: 'PAR (Watt/sqm)',
          humidity: 'Humidity (%)',
          paracc: 'PAR Accumulation (J/sqm)',
          co2: 'Carbon dioxide (ppm)',
          light: 'LED (Lux)'
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
              title: "Daily " + this.sensorFullName[this.sensor] + " : in " + this.date,
              ylabel: this.sensorFullName[this.sensor],
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
