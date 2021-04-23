<template>
  <div class="map">
      <VueDragResize :isActive="true" :w="1000" :h="666.5
      " :parentScaleX="0.5" :parentScaleY="0.5" :aspectRatio ="true"  :sticks="['tl','bl','tr','br']" :x="600" :y="100" :z="999" v-on:resizing="resize" v-on:dragging="resize">
          <img :src="require('../../public/images/result'+ city +'.png')" width="100%" height="100%" />

        <!--  <label v-for="o in 3" :key="o" class="animate__animated animate__bounce">
             <img :src="require('../../public/images/result'+o+'.png')" width="100%" height="100%" />
          </label> -->
      </VueDragResize>
  </div>
</template>
<script>
//拖拽，放大缩小
import VueDragResize from 'vue-drag-resize';
export default {
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  },
  components: {
      VueDragResize
  },
  computed:{
    city:function(){
      return this.$store.getters.count;
    }
  },
  mounted() {
  },
  methods: {
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
