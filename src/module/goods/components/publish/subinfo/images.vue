<template>
  <div class="sub-block">
    <el-form ref="ruleForm" :model="imgInfo" label-width="120px" :rules="rules" class="demo-ruleForm">
      <el-form-item label="商品图片" prop="mainPic">
        <p class="com-tip">
         建议商品图片上传3张以上，最多可以上传5张图片；上传图片尺寸建议750px*750px，按1:1比例最大不能超过500K，支持jpg/gif/png/bmp图片格式。
        </p>
        <div class="imgBlock" v-for="(image,index) in imageList" :key="image.id">
          <p class="imgName">{{image.name}} <el-button type="text" v-show="image.url" @click="deleteItem(index)"><i class="el-icon-delete icon"></i></el-button>
</p>
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload(index)">
            <img v-if="image.url" :src="image.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div> 
      </el-form-item>
      <el-form-item label="主图视频">
 <div class="imgBlock">
          <p class="imgName">主图视频<el-button type="text" v-show="video" @click="deleteVideo"><i class="el-icon-delete icon"></i></el-button></p>
          <el-upload class="avatar-uploader" action="" :disabled="video?true:false" :show-file-list="false"  :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUploadVideo">
            <!-- <img v-if="videoUrl" :src="videoUrl" class="avatar">
             -->
             <video v-if="video" :src="video" class="avatar" controls="controls">您的浏览器不支持 video 标签。
                                </video>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
            <ul class="video-tip">
            <li>1、原PC主图视频发布，可同时在手机端主图视频展现，无需分开发布。</li>
            <li>2、时长：≤60秒，建议9-30秒可优先在猜你喜欢、有好货等推荐频道展现。</li>
            <li>3、尺寸：建议1:1，利于买家在主图位置的视频观看体验。</li>
            <li>4、内容：突出商品1-2个核心卖点，不建议电子相册式的图片翻页视频</li>
          </ul>
        </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import {
    getUploadImgSrc
  } from '@/common/js/service.js';
  import Vue from 'vue';
  export default {
    data() {
      return {
        // videoUrl: '',
        imageList: [{
          id: 1,
          name: '商品主图',
          url: ''
        }, {
          id: 2,
          name: '商品侧面图',
          url: ''
        }, {
          id: 3,
          name: '商品副图',
          url: ''
        }, {
          id: 4,
          name: '商品副图',
          url: ''
        }, {
          id: 5,
          name: '商品副图',
          url: ''
        }, ],
        video: '',
        rules: {
          mainPic: [{
                        required: true,
                        trigger: 'change,blur',
                        message: '请上传商品主图'
                    }]
        }
      }
    },
    props: {
      imagesUrl: {
        type: String,
      },
      videoUrl: {
        type: String,
        default: ''
      }
    },
    computed:{
      imgInfo: function(){
        let info = {
                    mainPic: this.imageList[0].url?this.imageList[0].url:''
                }
                return info;
      }
    },
    methods: {
          checkForm() {
                let result = false;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        result = true;
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }

                });
                return result;
            },
      deleteItem(index){
        this.$set(this.imageList,index,Object.assign({},this.imageList[index],{
          id: index+1,
          url: ''
        }));
      },
      deleteVideo(){
        this.video='';
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUploadVideo(file) {
        getUploadImgSrc(file).then(res => {
          console.log('upload file ', res);
          // this.$emit("update:videoUrl", res);
          this.video = res;
        });
        return false;
      },
      getBackInfo(){
        let videoId='1';
        if(this.video){
          videoId = this.video.split('|').length===2?this.video.split('|'):'1';
        }
 
        let obj = {
          images: this.imageList.filter(x=>x.url).map(x=>x.id+'|'+x.url).join(','),
          video: this.video?videoId+'|'+this.video:''
        }
        return obj;
      },
      beforeAvatarUpload(index) {
        let vm = this;
        let fn = (file) => {
          
            const isJPG = file.type === 'image/jpeg';
            const isLt3M = file.size / 1024 / 1024 < 3;
            /*2018.7.5更新代码*/
             if (!isLt3M) {
              this.$message.error('上传图片不可大于3M，请重新选择上传!');
              return false
            }
            getUploadImgSrc(file).then(res => {
              vm.imageList[index].url = res;
            // Vue.set(vm.imagesUrl,index, res);

              console.log('upload file111111 ', res, index,vm.imageList);
            
          }).catch(err=>{  /*2018.7.5更新代码*/
            // alert(1111)
            this.$message.error(err.message);
          });
          return false;
        }
        return fn;
      }
    },
    mounted() {
      let vm = this;
      if(!vm.imagesUrl){
        return;
      }
      let images = vm.imagesUrl.split(',');
      if(images.length>0){
        let hasOldData = images.some(x=>{
          return parseInt(x.split('|')[0])>5
        });
        if(hasOldData){
          images.forEach((image,i)=>{
            let newVal = Object.assign({},vm.imageList[i],{
              id:image.split('|')[0],
              url: image.split('|')[1]
            });
            vm.$set(vm.imageList,i,newVal);
          });
        } else {
            images.forEach((image,i)=>{
              if(image.split('|').length!==2){
                return;
              }
              vm.imageList=vm.imageList.map((i)=>{
                if(i.id==image.split('|')[0]){
                  i.url = image.split('|')[1];
                }
                return i;
              });
              // let sameValIndex = vm.imageList.indexOf(x=>x.id==image.split('|')[0]);
              // if(sameValIndex>-1){
              //   vm.imageList[sameValIndex].url = image.split('|')[1];
              // }
            // vm.imageList[i]=Object.assign({},vm.imageList[i],{
            //   id:image.split('|')[0],
            //   url: image.split('|')[1]
            // });
          });
        }
      }
      this.video= (this.videoUrl&&this.videoUrl!=='null')?this.videoUrl.split('|')[1]:'';
      console.log('init-------------->', this.imageList);
      console.log('init-------------->', this.video);

      //  this.imagesUrl = goodsInfo.goods.images.split(',').map(img => {
      //       if (img.split('|').length === 1) {
      //         return img;
      //       } else {
      //         return img.split('|')[1]
      //       }
      //     });
    }
  }

</script>
<style lang="scss" scoped>
  .imgBlock {
    display: inline-block;
    width: 120px;
    text-align: center;
    margin-right: 20px;
  }

  .imgName {
    height: 32px;
    line-height: 32px;
    background-color: $color-bg-dialog;
    position: relative;
    .icon{
      position: absolute;
      right: 2px;
      top: 6px;
    }
  }

  .sub-block {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .video-tip{
    width: 600px;
    display: inline-block;
    line-height: 1.5;
    vertical-align: top;
    color: $color-light;
    font-size: 12px;
  }
    .avatar-uploader-icon {
    font-size: 28px;
        width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

</style>
