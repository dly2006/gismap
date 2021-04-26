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
                          <img :src="urlApiName + o" />
                       </label>
                   </div>
                 </el-card>
            </el-col>
         </el-row>
      </el-main>
      <el-footer>
        <el-upload
          class="upload-map"
          action="http://10.1.15.29:8556/uploadImg"
          multiple
          name="img"
          accept=".jpg, .png, .gif, .bmp, .JPG, .PNG, .GIF, .BMP, .tif"
          :before-upload="beforeUploadForm"
          :on-progress = "progressForm"
          :on-success = "successForm"
          :on-error	= "errorForm"
          :show-file-list="false"
          :limit="3">
          <el-button size="small" type="primary">上传影像 <i class="el-icon-circle-plus"></i></el-button>
        </el-upload>
      </el-footer>
   </el-container>
</template>
<script>
import { Loading } from 'element-ui';
import api from './api/api'; //暴露实例，总线传值

export default {
  data() {
    return {
      current:0,
      currentList:0,
      exploreData:'',
      urlApiName : 'http://10.1.15.29:8556/',
      actionUrl:'http://10.1.15.29:8556/uploadImg',
      todos: [
          { title: '变化检测', icon:'el-icon-document-copy' },
          { title: '建筑', icon:'el-icon-office-building' },
          { title: '舰船', icon:'el-icon-ship' }
      ]
    }
  },
  props:{
  },
  beforeCreate:function(){

  },
  created:function(){

  },
  beforeMount:function(){

  },
  mounted:function(){
    this.dataList();
  },
  computed:{
  },
  methods: {
      dataList(){
        var that = this;
        this.$axios({
            method:'get',
            url:'http://10.1.15.29:8556/explore'
        }).then((response) =>{          //这里使用了ES6的语法
            let count = response.data.count;
            if(count != 0){
              let data = (response.data.data).replace(/\[|]| |"/g,'').split(','); //转换接口返回数据，去除[、]、"、空格等，根据，分割数据
              let newData = [];
              data.forEach(function(item, index) {
                var item = item.split('.');
                newData.push(item[0]);
              })
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
        const loading = this.$loading({
          lock: true,
          text: '数据识别中，加载较慢，请耐心等待10-30分钟左右。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let picSplit = this.exploreData[index].split(/[/.]/),
         picName = picSplit[2] + '.tif';
          this.currentList=index;
          this.$axios({
              method:'get',
              url:'http://10.1.15.29:8556/imagePage',
              params:{
                image_name:picName
              }
          }).then((response) =>{          //这里使用了ES6的语法
              let picName = this.urlApiName + response.data.address;
              //提交名为addmu的兄弟传值
              api.$emit("addmu",picName)
              loading.close();
              this.$message({
                  message: '识别成功!',
                  duration: 1000,
                  showClose: true,
                  type: 'success'
              })
              console.log(response)       //请求成功返回的数据
          }).catch((error) => {
              loading.close();
              this.$message({
                  message: '识别失败!',
                  duration: 1000,
                  showClose: true,
                  type: 'success'
              })
              console.log(error)       //请求失败返回的数据
          })
      },
      // 开始上传前验证
      beforeUploadForm (file) {
          // 验证文件类型
          var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
          const extension = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'gif' || testmsg === 'bmp' || testmsg === 'tif';
          const isLt2M = file.size / 1024 / 1024 < 200;
          if (!extension) {
              this.$message({
                  message: '上传文件只能是jpg/png/gif/bmp/tif格式!',
                  duration: 1000,
                  showClose: true,
                  type: 'warning'
              })
          }
          if (!isLt2M) {
            this.$message.error('上传文件大小不能超过 200MB!');
          }
          return extension && isLt2M;
      },
      //上传时加载loading
      progressForm(){
        const loading = this.$loading({
          lock: true,
          text: '图片上传中，请耐心等候',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      //上传成功关闭loading，提示上传成功
      successForm(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        loading.close();
        this.dataList(); //上传成功后，更新exploreData列表数据
        this.$message({
            message: '上传成功!',
            duration: 1000,
            showClose: true,
            type: 'success'
        })
      },
      //上传失败关闭loading，提示上传成功
      errorForm(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        loading.close();
        this.$message({
            message: '上传失败!',
            duration: 1000,
            showClose: true,
            type: 'error'
        })
      },
      //侧边栏隐藏切换，暂无添加
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
