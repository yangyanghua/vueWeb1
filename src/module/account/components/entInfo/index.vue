<template>
  <div class="main">
  <!--面包屑-->
    <div class="crumbs">
      企业信息
    </div>
     <!-- / 面包屑--> 
    <div class="subject">
      <div class="filter_query mat20">
          <el-form ref="form"  label-width="170px" style="padding:20px;">
          <el-form-item label="公司名称：">
            <p>{{data.name}}</p>
          </el-form-item>
          <el-form-item label="服务电话：">
            <p>{{data.servicePhone}}</p>
          </el-form-item> 
           <el-form-item label="短息提醒接收号码：">
            <p>{{data.acceptPhone}}</p>
          </el-form-item> 
          <el-form-item label="统一社会信用代码：">
           <p>{{data.regNumber}}</p>
          </el-form-item>
          <el-form-item label="建行对公账号：">
           <p>{{data.publicAccount}}</p>
          </el-form-item>
          <el-form-item label="建行开户行：">
           <p>{{data.openBank}}</p>
          </el-form-item>
          <el-form-item label="法定代表人姓名：">
            <p >{{data.legalPerson}}</p>
          </el-form-item>   
          <el-form-item label="住所/经营场所：">
            <p >{{data.permises}}</p>
          </el-form-item>     
          <el-form-item label="详细地址：">
            <p >{{data.address}}</p>
          </el-form-item>
          <el-form-item label="注册资本金：">
            <p >{{data.regCapital+'(万元)'}}</p>
          </el-form-item>
          <el-form-item label="营业执照有效期：">
            <p >{{data.expireDate}}</p>
          </el-form-item>
          <el-form-item label="营业执照经营范围：">
            <p >{{data.businessScope}}</p>
          </el-form-item>
          <el-form-item label="营业执照图片：">
            <p style="height: 80px;">
              <img style="height: 100%;" :src="data.imageUrl"/>
            </p>
          </el-form-item>
          <el-form-item label="品牌授权书/商标注册证：">
            <p style="height: 80px;margin-bottom: 10px;" v-for="item in certImgs">
              <img style="height: 100%;" :src="item.url"/>
            </p>
          </el-form-item>
          <el-form-item label="企业荣誉：">
            <p v-html="data.honor"></p>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" icon="el-icon-edit-outline" class="editAccountBtn" @click="$router.push({path:'/account/entInfo/entUpdate'})">编辑</el-button>
      </div>      
    </div>

  </div>
</template>

<script>
import * as Service from '@/common/service/account/index.js';
const ENDTIME = '2118-01-01 00:00:00';
  export default {
    data() {
      return {
        certImgs:[],
        data:{
          name:'',
          servicePhone:'',
          servicePhone:'',
          regNumber:'',
          legalPerson:'',
          premises:'',  
          address:'',
          regCapital:'',
          expireDate:'',
          businessScope:'',
          imageUrl:'',
          certImg:'',
          hono:''
        },
      }
    },
    methods: {
      entinfo(){
        Service.entInfo().then((res) => {
             /*多张图片回显*/
             let vm  = this;
             let imgs = [];
             if(res.certImg){
             	imgs = res.certImg.split(',');
             }
              console.log('chenjie',imgs);
                imgs.forEach((item) => {
                  vm.certImgs.push({
                    name:'',
                    url:item
                  })
                }) 
           console.log('chenjie2',vm.certImgs)   
           // this.data.certImg = imgs;     
            this.data = res;
        		
        		if(res.expireDate){
	              if(res.expireDate===ENDTIME){
	                this.data.expireDate='长期';
	             } else {
	                this.data.expireDate = res.expireDate&&res.expireDate.split(' ')[0]; /*分割*/
	              }       			
        		}

          }).catch((res) => {
            console.log('error ', res);
            this.$message({
              type: 'error',
              message: res.message
            });  
      })      
  }

    },mounted(){
    this.entinfo()

    }
  }
</script>

<style lang="scss" scoped>
// @import url("./commonstyle.css");
  .BreadCrumbs{
    height: 30px;
    line-height: 30px;
  }
  .infoContent{
    width: 100%;
    box-sizing: border-box;
    padding: 30px 50px;
    position: relative;
    border: 1px solid gainsboro;
    background: white;
  }
  .editAccountBtn{
    position: absolute;
    right: 5%;
    top: 3%;
    // border: none;
    // background: none;
    // height: 35px;
    // line-height: 35px;
    // text-align: center;
    // border-radius:100px;
    // border: 1px solid gainsboro;
    // width: 120px;
  }

</style>