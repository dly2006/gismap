<template>
  <div id="map" class="map">
      <VueDragResize :isActive="true" :w="1000" :h="666" :parentScaleX="0.5" :parentScaleY="0.5" :aspectRatio ="true" :x="380" :y="100" :z="999" v-on:resizing="resize" v-on:dragging="resize">
          <img src="../../public/images/result1.png" width="100%" height="100%" />
      </VueDragResize>
  </div>
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
//拖拽，放大缩小
import VueDragResize from 'vue-drag-resize';
export default {
  data() {
    return {
      map: null,
      //后台服务器地址
      urlRoot: "http://193.112.110.27:8080/geoserver/gee/wms?",
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  },
  components: {
      VueDragResize
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

    },
    resize(newRect) {
                    this.width = newRect.width;
                    this.height = newRect.height;
                    this.top = newRect.top;
                    this.left = newRect.left;
                }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    position: fixed;
    background-color: #0d131a;
    height: 100%;
    width: 100%;
  }
</style>
