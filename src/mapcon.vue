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
                      <span class="tool-icon" v-for="(todo, index) in todos" @click="isClass(index)" :class="{ 'anlysis-btn':index==current}" :title="todo.title" ><i :class="todo.icon"></i></span>
                   </div>
                 </el-card>
                 <!-- 我的数据 -->
                 <el-card class="layer-switch-content anlysis-layer-color">
                   <div slot="header" class="clearfix">
                     <span><i class="el-icon-coin"></i> 我的数据 </span>
                   </div>
                   <div class="layer-content">
                       <label v-for="(o, index) in exploreData" :key="o" @click="isClassList(index)" :class="{ 'label-border animate__animated animate__pulse':index==currentList}">
                          <img :src="api.urlApiName + o" />
                       </label>
                   </div>
                 </el-card>
            </el-col>
         </el-row>
      </el-main>
      <el-footer>
        <form action="http://10.1.15.29:8556/uploadImg" enctype="multipart/form-data" method="get">
            <input type="file" name="image_name">
            <input type="submit">
        </form>
        <el-upload
          class="upload-map"
          action="http://10.1.15.29:8556/uploadImg"
          multiple
          name="image_name"
          accept=".jpg, .png, .gif, .bmp, .JPG, .PNG, .GIF, .BMP, .tif"
          :before-upload="beforeUploadForm"
          :http-request="imageChange"
          :show-file-list="false"
          :limit="3">
          <el-button size="small" type="primary">上传影像 <i class="el-icon-circle-plus"></i></el-button>
        </el-upload>
      </el-footer>
   </el-container>
</template>
<script>
import api from './api/api.js';

export default {
  data() {
    return {
      current:0,
      currentList:0,
      exploreData:'',
      todos: [
          { title: '变化检测', icon:'el-icon-document-copy' },
          { title: '建筑', icon:'el-icon-office-building' },
          { title: '舰船', icon:'el-icon-ship' }
      ]
    }
  },
  beforeCreate:function(){

  },
  created:function(){

  },
  beforeMount:function(){

  },
  mounted:function(){
    this.query();
  },
  watch:{ //异步监听

  },
  computed:{
    myCount(){
      return this.$store.state.count;
    }
  },
  methods: {
    query(){
      var that = this;
      this.$axios({
          method:'get',
          url:'http://10.1.15.29:8556/explore'
      }).then((response) =>{          //这里使用了ES6的语法
          let count = response.data.count;
          if(count != 0){
            let data = (response.data.data).replace(/\[|]| |"/g,'').split(','); //转换接口返回数据，去除[、]、"、空格等，根据，分割数据
            that.exploreData = data;
          }else{
            this.$message({
                message: '数据为空，暂无列表数据!',
                duration: 1000,
                showClose: true,
                type: 'warning'
            })
          }
      }).catch((error) => {
          console.log(error)       //请求失败返回的数据
      })
    },
      isClass:function(index){
          this.current=index;
      },
      isClassList:function(index){
          this.currentList=index;

          this.$axios({
              method:'get',
              url:'http://10.1.15.29:8556/imagePage'
          }).then((response) =>{          //这里使用了ES6的语法
              console.log(response)       //请求成功返回的数据
          }).catch((error) => {
              console.log(error)       //请求失败返回的数据
          })
      },
      // 开始上传前验证
      beforeUploadForm (file) {
          // 验证文件类型
          var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
          const extension = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'gif' || testmsg === 'bmp' || testmsg === 'tif'
          if (!extension) {
              this.$message({
                  message: '上传文件只能是jpg/png/gif/bmp/tif格式!',
                  duration: 1000,
                  showClose: true,
                  type: 'warning'
              })
          }
          return extension
      },

      // 提交图片
      imageChange(param,type){
          console.log(param);
          let formData = new FormData()
          formData.append('files', param.file)
          debugger
          // console.log(this.imgList);
      },
      show:function(num){
         if(num!=''){this.a+=num}
         else{this.a++}
      }
  }
}
</script>
<style lang="scss" scoped>
  @import './public/styles/mapcon.scss'; //导入侧边栏局部样式
</style>
