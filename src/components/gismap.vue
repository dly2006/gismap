<template>

  <div id="map" class="map"><img src="../../public/images/gismap.png" width="100%" /></div>
</template>
<script>
import "ol/ol.css";
import { Map, View } from "ol";
// 添加图层
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import TileWMS from "ol/source/TileWMS.js";
// 格式化地理坐标
import { fromLonLat } from "ol/proj.js";
export default {
  data() {
    return {
      map: null,
      //后台服务器地址
      urlRoot: "http://193.112.110.27:8080/geoserver/gee/wms?",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //  经纬度转化
      var center = fromLonLat([101.34272, 23.6042484]);
 //  加载地图
      this.map = new Map({
        target: "map", //地图容器
        layers: [
        //加载天地图天地图
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }),
          zIndex: 1
        })],
        view: new View({
          projection: "EPSG:3857",
          //初始化地图中心
          center: center,
          zoom: 2,
          // 镜头
          maxZoom: 18,
          minZoom: 13
        }),
        logo: false
      });

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
