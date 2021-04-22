<script src="../public/js/vue.js"></script>
<template>
   <el-container class="grid-content" @click="show()">
       <el-header>
       <img src="../public/images/logo.png" class="imgpic" />
       <a class="layer-drawer-close"><i class="el-icon-arrow-left"></i></a>
     </el-header>
      <el-main>
         <el-row>
            <el-col :span="24">
               <!-- 解译算法 -->
                 <el-card class="anlysis-tool anlysis-layer-color">
                   <div slot="header" class="clearfix">
                     <span><i class="el-icon-menu"></i> 解译算法 <i class="el-icon-warning"></i></span>
                     <el-button class="head-icon" type="text"><></el-button>
                   </div>
                   <div class="animate__animated animate__fadeInLeft">
                   <span class="tool-icon" title="变化检测"><i class="el-icon-document-copy"></i></span>
                   <span class="tool-icon" title="建筑"><i class="el-icon-office-building"></i></span>
                   <span class="tool-icon" title="舰船"><i class="el-icon-ship"></i></span>
                   </div>
                 </el-card>
                 <!-- 我的数据 -->
                 <el-card class="layer-switch-content anlysis-layer-color">
                   <div slot="header" class="clearfix">
                     <span><i class="el-icon-coin"></i> 我的数据 </span>
                   </div>
                   <div class="layer-content">
                       <label v-for="o in 4" :key="o" class="animate__animated animate__bounce">
                          <img :src="require('../public/images/con-'+o+'.png')" />
                       </label>
                   </div>
                 </el-card>
            </el-col>
         </el-row>
      </el-main>
      <el-footer>
        <el-upload
          class="upload-map"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :show-file-list="false"
          :limit="3">
          <el-button size="small" type="primary">上传影像 <i class="el-icon-circle-plus"></i></el-button>
        </el-upload>
      </el-footer>
   </el-container>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
     show:function(num){
       debugger
        if(num!=''){this.a+=num}
        else{this.a++}
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './public/styles/mapcon.scss'; //导入侧边栏局部样式
</style>
