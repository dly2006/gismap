<template>
  <div id="app">
    <gishtml msg="map bg"/>
    <mapcon msg="map con"/>
  </div>
</template>

<script>
import gishtml from './components/gishtml.vue';
import mapcon from './mapcon.vue';
export default {
  name: 'app',
  components: {
    gishtml,
    mapcon
  }
}
</script>

<style>
body{
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
