<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to='/goods/list'>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>完善溯源信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detailInfo">
      <div class="com-title">
        <i class="tag"></i>
        基本信息
      </div>
      <el-form class="source-form" ref="ruleForm" label-width="120px" :rules="rules" :model="form">
        <el-form-item label="商品类目">
          {{selectedCategoryName}}
        </el-form-item>
        <el-form-item label="商品名称">
          {{name}}
        </el-form-item>
        <el-form-item label="品牌">
          {{brand}}
        </el-form-item>
        <el-form-item label="原产地" required prop="originPlace">
          <el-input class="input-normal" v-model="form.originPlace" placeholder="请输入商品的原产地"></el-input>
        </el-form-item>
        <el-form-item label="生产企业" required prop="industry">
          <el-input class="input-normal" v-model="form.industry" placeholder="请输入商品的生产企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业地址" required prop="address">
          <el-input class="input-normal" v-model="form.address" placeholder="请输入商品的生产企业地址"></el-input>
        </el-form-item>
      </el-form>
      <div class="com-title">
        <i class="tag"></i>
        检验证书
      </div>
      <el-form class="source-form" label-width="60px" :class="{'hide-upload': fileList1.length===5}">
        <el-form-item label="">
          <p class="com-tip">
            建议检验证书图片上传3张以上，最多可以上传5张图片；上传图片尺寸建议750px*750px，按1:1比例最大不能超过500K，支持jpg/gif/png/bmp图片格式。
          </p>
          <el-upload :multiple="true" action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveFn(1)"
            :file-list="fileList1" :before-upload="beforeAvatarUpload(1)" :limit="5" :on-exceed="giveExceedTip">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div class="com-title">
        <i class="tag"></i>
        原材料信息
      </div>

      <el-form class="source-form" label-width="60px">
        <el-form-item label="">
          <p class="com-tip">
            上传图片宽度建议750px，单张图片最大不能超过1M，支持jpg/gif/png/bmp图片格式。原材料包括商品的主要成分、配料、辅助材料等相关信息。
          </p>
          <div class="editor-container" v-if="mountEditor">
            <UM :config=config :id=um1 ref="um"></UM>
            <!-- <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE> -->
          </div>
        </el-form-item>
      </el-form>

      <div class="com-title">
        <i class="tag"></i>
        工厂实拍
      </div>
      <el-form class="source-form" label-width="60px" :class="{'hide-upload': fileList2.length===5}">
        <el-form-item label="">
          <p class="com-tip">
            建议工厂实拍图片上传3张以上，最多可以上传5张图片；上传图片尺寸建议750px*750px，按1:1比例最大不能超过500K，支持jpg/gif/png/bmp图片格式。
          </p>
          <el-upload :multiple="true" action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveFn(2)"
            :file-list="fileList2" :before-upload="beforeAvatarUpload(2)" :limit="5" :on-exceed="giveExceedTip">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div class="com-title" v-if="false">
        <i class="tag"></i>
        购买链接
      </div>
      <el-form class="source-form" v-if="false" label-width="60px">
        <el-form-item label="">
          <p class="com-tip">
            编辑商品被扫码溯源后可直接访问的购买平台和购买地址入口
          </p>
          <ul>
            <li>
              <el-checkbox class="buy-name" v-model="iflashBuyUrlChecked" disabled>
                {{iflashBuyUrlName}}
              </el-checkbox>
              <span class="buy-url">{{iflashBuyUrl}}</span>
            </li>
            <li class="buy-link" v-for="(item,index) in buyLinkList">
              <el-checkbox class="buy-name" v-model="item.check">
                <el-input placeholder="请输入商城名称" v-model="item.name"></el-input>
              </el-checkbox>
              <el-input class="buy-url" placeholder="请输入相关网络地址" v-model="item.url"></el-input>
              <i class="el-icon-circle-close buy-close" @click="removeBuyLink(index)">
              </i>
            </li>
          </ul>
          <el-button type="text" @click="addBuyLink">
            添加
          </el-button>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <p>
          <el-checkbox v-model="promiseCheck">
            <span class="fwbold">商家承诺：</span> 我方郑重承诺，严格遵守真知码使用要求，并确保提供所有信息的真实性。
          </el-checkbox>
        </p>
        <el-button type="primary" @click="previewPage">
          保存并预览扫码溯源信息
        </el-button>
        <el-button type="primary" @click="onSubmit">
          保存溯源信息
        </el-button>
        <p>
          <el-checkbox v-model="downloadCheck">
            保存后下载真知码码图
          </el-checkbox>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getUploadImgSrc
  } from '@/common/js/service.js';
  import * as SourceApi from '@/common/service/goods/source.js';
  import {httpService,api} from '@/common/http/http.js';
  import UM from '@/components/umeditor/index.vue';

  export default {
    data() {
      return {
        um1: "um1", // 不同编辑器必须不同的id
        config: {
          initialFrameWidth: null,
          // initialFrameHeight: 350,
          autoHeightEnabled: false,
          toolbar: [
            'undo redo | paragraph bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
            'selectall cleardoc',
            '| justifyleft justifycenter justifyright justifyjustify |',
            'addUploadImg addUploadVideo',
            '| '
          ]
        }, //编辑器参数
        selectedCategoryName: '',
        name: '',
        brand: '',
        form: {
          id: '',
          productId: this.$route.query.id,
          originPlace: '',
          industry: '',
          address: '',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList1: [], //检验证书
        fileList2: [], //工厂实拍
        iflashBuyUrl: '',
        iflashBuyUrlChecked: true, //勾选真品链接
        iflashBuyUrlName: '',
        buyLinkList: [], //购买链接
        promiseCheck: false, //商家承诺勾选
        downloadCheck: false, //保存后下载真知码码图
        mountEditor: false,
        rules: {
          originPlace: [{
            required: true,
            trigger: 'change,blur',
            message: '请输入商品的原产地'
          }],
          industry: [{
            required: true,
            trigger: 'change,blur',
            message: '请输入商品的生产企业名称'
          }],
          address: [{
            required: true,
            trigger: 'change,blur',
            message: '请输入商品的生产企业地址'
          }]
        },
      }
    },
    components: {
      UM
    },

    methods: {
      giveExceedTip(){
        this.$message.error('最多可以上传5张图片');
      },
      handleRemoveFn(index){
        let vm = this;
        let fn = function(file, fileList) {
        console.log(file, fileList);
        vm['fileList'+index] =  vm['fileList'+index].filter(x=>x.uid!==file.uid);
        console.log('\n',vm.fileList1, vm.fileList2);
      };
      return fn;
      },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      //   console.log('\n',this.fileList1, this.fileList2);
      // },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      addBuyLink() {
        this.buyLinkList.push({
          name: '',
          url: '',
          check: true
        });
      },
      removeBuyLink(index) {
        this.buyLinkList.splice(index, 1);
      },
      previewPage() {
        this.$refs['ruleForm'].validate((valid) => {
          if (!this.promiseCheck) {
            this.$message.error('请勾选商家承诺');
            return false;
          }
          if (valid) {
            console.log('验证通过,执行提交');
            let that = this;
            let params = this.collectSourceInfo();
            this.saveSourceInfo(params, function(res){ 
              let url = res.preViewUrl; // 预览页嵌入页面的url
              that.$router.push({
                path:'/goods/publish/previewPage',
                query: {url}
              }); 
            });
          } else {
            return false;
          }

        });
        
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (!this.promiseCheck) {
            this.$message.error('请勾选商家承诺');
            return false;
          }
          if (valid) {
            console.log('验证通过,执行提交');
            let that = this;
            let params = this.collectSourceInfo();
            this.saveSourceInfo(params, function(res){ 
              if (that.downloadCheck) {
                let user = JSON.parse(localStorage.getItem("user"));
                window.location.href=httpService+api.sourceDownGoodsCode+"?accessToken="+user.accessToken+"&ids="+params.productId;
              }
              that.$router.push('/goods/list');
            });
          } else {
            return false;
          }

        });

      },
      beforeAvatarUpload(index) {
        let vm = this;
        let fn = (file) => {
            const isLt3M = file.size / 1024 / 1024 < 3;
            /*2018.7.5更新代码*/
             if (!isLt3M) {
              this.$message.error('上传图片不可大于3M，请重新选择上传!');
              return false
            }        
          getUploadImgSrc(file).then(res => {
            vm['fileList' + index].push({
              url: res
            });
            console.log('upload file ', res, index, vm['fileList' + index]);
          });
          return false;
        }
        return fn;
      },
      // 设置编辑器内容
      setContent(info) {
        console.log(info);
        this.$refs.um.setContents(false, info);
      },
      //获取编辑器内容
      getUMContent() {
        let content = this.$refs.um.getUMContent(); // 调用子组件方法
        console.log(content);
        return content;
      },
      setIflashBuyUrl(iflashBuyUrl) {
        let url = iflashBuyUrl.split('|');
        this.iflashBuyUrlName = url[0];
        this.iflashBuyUrl = url[1];
      },
      convertBuyLinkList(buyUrls) {
        let data = [];
        for (var i = 0; i < buyUrls.length; i++) {
          let tmp = buyUrls[i].split('|');
          data.push({
            name: tmp[0],
            url: tmp[1],
            check: true
          });
        }
        return data;
      },
      collectSourceInfo() {
        let params = {
          id: this.form.id,
          productId: this.form.productId,
          sourceArea: this.form.originPlace,
          productionEnterprise: this.form.industry,
          enterpriseAddress: this.form.address,
          inspectionCertificate: '',
          materialInformation: this.getUMContent(),
          factoryScene: this.fileList2.join(','),
          buyUrl: '',
        };

        // 检验证书
        let inspects = [];
        this.fileList1.forEach(function(value, index){
          inspects.push(value.url);
        });
        params.inspectionCertificate = inspects.join(',');

        // 工厂实拍
        let fs = [];
        this.fileList2.forEach(function(value, index){
          fs.push(value.url);
        });
        params.factoryScene = fs.join(',');

        // 购买链接
        let buyUrls = [];
        buyUrls.push(this.iflashBuyUrlName+'|'+this.iflashBuyUrl);
        for (var i = 0; i < this.buyLinkList.length; i++) {
          let t = this.buyLinkList[i];
          buyUrls.push(t.name + '|' + t.url);
        }
        params.buyUrl = buyUrls.join(',');

        console.log(params,this.fileList1,this.fileList2);
        // debugger;
        return params;
      },
      saveSourceInfo(params, handler) {
        if (params.id) {
          SourceApi.sourceUpdate(params).then(res => {
              handler(res);
          }).catch(res => {
              this.$message({type:'error', message:res.message});
          });
        } else {
          SourceApi.sourceAdd(params).then(res => {
            handler(res);
          }).catch(res => {
            this.$message({type:'error', message:res.message});
          });
        }
      },
    },
    mounted() {
      // 初始化页面
      let goodsId = this.$route.query.id;
      SourceApi.sourceInfo({productId: goodsId})
        .then(res => {
          console.log(res);
          this.selectedCategoryName = res.categorys.value;
          this.name = res.goods.name;
          this.brand = res.brandVo.brandName;
          this.form.id = res.id || '';
          this.form.productId = res.productId;
          this.form.originPlace = res.sourceArea || '';
          this.form.industry = res.productionEnterprise || '';
          this.form.address = res.enterpriseAddress || '';

          // 检验证书
          let inp = [];
          let inspects = res.inspectionCertificate ? res.inspectionCertificate.split(',') : [];
          inspects.forEach(function(value, index){
            inp.push({url:value});
          });
          this.fileList1 = inp;
          this.mountEditor = true;
          this.$nextTick(()=>{
            let content = res.materialInformation;
            this.setContent(content);
          });
          

          // 工厂实拍
          let fs = [];
          let fss = res.factoryScene ? res.factoryScene.split(',') : [];
          fss.forEach(function(value, index){
            fs.push({url:value});
          });
          this.fileList2 = fs;

          let buyUrls = (res.buyUrl || '').split(',');
          this.setIflashBuyUrl(buyUrls.shift());
          this.buyLinkList = this.convertBuyLinkList(buyUrls);

        }).catch(res => {
          this.$message.error(res.message);
        });

    }
  }

</script>
<style lang="scss" scoped>
  .detailInfo {
    padding-top: 30px;
    padding-left: 50px;
    padding-right: 50px;
    background: #FFF;
  }

  .tag {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/static/images/tag1.png') 100% 100% no-repeat;
    background-size: contain;
    vertical-align: middle;
    transform: rotate(270deg);
    position: relative;
    top: -2px;
  }

  .source-form {
    //  padding-left: 25px;
    .el-form-item {
      // margin-bottom: 8px;
    }
  }

  .input-normal {
    width: 600px;
  }

  .buy-link {
    margin-bottom: 12px;
  }

  .buy-name {
    width: 150px;
    margin-right: 30px;
  }

  .buy-url {
    display: inline-block;
    width: 400px;
  }

  .buy-close {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }

  .btn-group {
    margin-top: 50px;
    text-align: center;
    p {
      margin-top: 20px;
      margin-bottom: 20px;

    }
  }

  .fwbold {
    font-weight: bold;
  }
/deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label{
  color: $color-normal;
}
/deep/ .hide-upload .el-upload.el-upload--picture-card{
  display: none;
}
</style>
