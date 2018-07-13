<template>
	<div class="main">
	    <!--面包屑-->
    <div class="crumbs">
      企业信息编辑
    </div>
     <!-- / 面包屑--> 
		
    <div class="subject">
      <div class="filter_query mat20">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="171px" style="padding:20px;">
    <el-form-item label="公司名称："  prop="name">
       <el-input v-model="ruleForm.name" ></el-input>
    </el-form-item>
    
    <el-form-item label="服务电话：" prop="servicePhone" >
      <el-input v-model="ruleForm.servicePhone" ></el-input>
    </el-form-item>
    <el-form-item label="短息提醒接收号码：" prop="acceptPhone">
      <el-input v-model="ruleForm.acceptPhone" ></el-input>
    </el-form-item>    
    <el-form-item label="统一社会信用代码：" prop="regNumber">
      <el-input v-model="ruleForm.regNumber" ></el-input>
    </el-form-item> 
    <el-form-item label="建行对公账号：" prop="publicAccount" required>
      <el-input v-model="ruleForm.publicAccount" ></el-input>
    </el-form-item> 
    <el-form-item label="建行开户行：" prop="openBank">
      <el-input v-model="ruleForm.openBank" ></el-input>
    </el-form-item>         
    <el-form-item label="法定代表人姓名：" prop="legalPerson">
      <el-input v-model="ruleForm.legalPerson" ></el-input>
    </el-form-item>
    <el-form-item label="住所/经营场所：" prop="permises">
      <el-input v-model="ruleForm.permises"></el-input>
    </el-form-item>
    <el-form-item label="详细地址：" prop="address">
      <el-input v-model="ruleForm.address" ></el-input>
    </el-form-item>
    <el-form-item label="注册资本金：" prop="regCapital">
      <el-input v-model="ruleForm.regCapital" class="input_w"></el-input>(万元)
    </el-form-item>
    <el-form-item label="营业执照有效期：" >
        <el-radio-group v-model="expire">
              <div class="timelimit">
                <el-radio label="1" class="mgr10">
                  无限制
                </el-radio>
              </div>
              <div class="timelimit">
                  <el-radio label="2" class="mgr10">
                    有限制
                  </el-radio>
                  <el-date-picker :disabled="expire!='2'" class="input-normal" v-model="ruleForm.expireDate" type="date" placeholder="选择日期">
                  </el-date-picker>   
              </div>
          </el-radio-group>
        <!-- <el-date-picker class="input-normal"  v-model="ruleForm.expireDate" type="date" placeholder="选择日期" style="width:100%">
        </el-date-picker> -->
    </el-form-item>
    <el-form-item label="营业执照经营范围：" prop="businessScope">
      <el-input v-model="ruleForm.businessScope" :maxlength="5000"></el-input>
    </el-form-item>

    <el-form-item label="营业执照图片："  prop="imageUrl" class="imageUrl">
    <el-upload
      class="avatar-uploader"
      action=""
      list-type="picture-card"
      :show-file-list="false"
      :before-upload="beforeAvatarUploadLogo">
      <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      
    </el-form-item> 
    
    <el-form-item label="品牌授权书/商标注册证："  prop="certImg" class="certImg"> <!--:disabled='certImgs.length >2'-->
    <el-upload
            action=""
            list-type="picture-card"
            :file-list="certImgs"
            :limit="3"
            :before-upload = "beforeAvatarUploadMax"
            :on-remove="handleRemove">
            <i class="el-icon-plus"  style="padding-top: 30px;"><!--判断最多上传多少张，v-if="certImgs.length < 2"-->
            <span style="display: block;font-size: 14px;margin-top: 10px;">上传图片</span>
            </i>
          </el-upload>
    <!-- <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeAvatarUploadMax">
      <img v-if="ruleForm.certImg" :src="ruleForm.certImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    </el-form-item> 
  <el-form-item label="企业荣誉：">
  <!-- 富文本编辑器-->
     <div class="editor-container">
          <UM :config=config :id=um1 ref="um"></UM>
          <!-- <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE> -->
        </div>
    <!--编辑器   开始-->

  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="hanldebaek">返回</el-button>
    </el-form-item>   
  </el-form>
      </div>
    </div>
	</div>
</template>

<script>
import UM from '@/components/umeditor/index.vue'; /*编辑器组件*/
import {getUploadImgSrc} from '@/common/js/service.js'; /*上传图片组件*/

import * as Service from '@/common/service/account/index.js';
const ENDTIME = '2118-01-01 00:00:00';


  export default {
    data() {
       var number = (rule, value, callback) => {
         if(!(/^[0-9]*$/.test(value))){
            callback(new Error('请输入数字'));
         } else{
          callback();
         }
        };
        var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入建行对公账号'));
        }
        setTimeout(() => {
          if (!(/^[0-9]*$/.test(value))) {
            callback(new Error('请填写正确的建行对公帐号'));
          } else {
            if (value.length != 20) {
              callback(new Error('您的对公帐号填写有误，请核对后重新填写'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      /*验证手机号码*/
        var validatePhone = (rule, value, callback) => {
            let val = value||'';
            console.log('val-------',val,typeof(val),val.length);  
         if(!val){
            callback();
         } else{
            // if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(val))){
            // callback(new Error('请输入有效的手机号码'));
            if(!(/\d{11}/.test(val) && val.length === 11)){
            callback(new Error('请输入有效的手机号码'));
            }else{
              callback();
            }
          
         }
        };
      return {
        /*编辑器要的  开始*/
        um1: "um1", // 不同编辑器必须不同的id
        config: {   //编辑器配置
          initialFrameWidth: null,
          autoHeightEnabled: false,
          //    uploadPasteImg: true,
          // uploadPasteImgFn: (file)=>{
          //  console.log('upload img fn ', file);
          //  let needRename = true;
          //  let needCDN = true;
          //  uploadFile(file, needRename, needCDN).then(res => {
          //  console.log('file name ', res);
          //  })
          // },
          //自定义编辑器工具栏
          toolbar: [
            'undo redo | paragraph bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
            'selectall cleardoc',
            '| justifyleft justifycenter justifyright justifyjustify |',
            'addUploadImg addUploadVideo',
            '| '
          ]
        },
        certImgs:[],//上传多张图片
        expire:'1',//是否是有限
        /*编辑器要的  结束*/
        ruleForm: {
          name:'',
          servicePhone:'',
          acceptPhone:'',
          publicAccount:'',
          openBank:'',
          regNumber:'',
          legalPerson:'',
          permises:'',  
          address:'',
          regCapital:'',
          expireDate:'',
          businessScope:'',
          imageUrl:'',
          certImg:'',
          honor:'',
          id:'',
          //营业执照图片id
          imageId:'',
          //企业授权书图片id
          certImgId:''
        },

        /*验证方法*/
        rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          servicePhone: [
            { required: true, message: '请输入服务电话', trigger: 'blur' }
          ],        
          regNumber: [
            { required: true, message: '请输入营业执照注册号', trigger: 'blur' }
           
          ], 
          publicAccount: [
            { validator: checkAge, trigger: 'blur' }
           
          ],
          acceptPhone: [
            { validator: validatePhone, trigger: 'blur' }
           
          ],
          openBank: [
            { required: true, message: '请输入建行开户行', trigger: 'blur' }
           
          ],              
          legalPerson: [
            { required: true, message: '请输入法定代表人姓名', trigger: 'blur' }
          ],
          permises: [
            { required: true, message: '请输入住所/经营场所', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          regCapital: [
            { required: true, message: '请输入注册资本金', trigger: 'blur' },
            { validator: number, trigger: 'blur' }
          ],
          expireDate: [
            { required: true, message: '请输入营业执照有效期', trigger: 'blur' }
          ],
          businessScope: [
            { required: true, message: '请输入营业执照经营范围', trigger: 'blur' }
          ]
          // imageUrl: [
          //   { required: true, message: '请上传营业执照图片', trigger: 'blur' }
          // ], 
          // certImg: [
          //   { required: true, message: '请上传品牌授权书', trigger: 'blur' }
          // ],
          // honor: [
          //   { required: true, message: '请输入企业荣誉', trigger: 'blur' }
          // ]
        }
      }
    },
    /*编辑器组件*/
    components: {
      UM
    },
    methods: {
       /*返回上一步方法*/
      hanldebaek(){
        history.go(-1);
      },
      /*上传图片方法*/
      beforeAvatarUploadLogo(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isLt3M) {
          this.$message.error('上传图片不可大于3M，请重新选择上传!');
          return false;
        }
		 getUploadImgSrc(file).then((res) => {
						this.ruleForm.imageUrl = res;
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			})          
      },
      /*验证图片方法*/
      beforeAvatarUploadMax(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isLt3M) {
          this.$message.error('上传图片不可大于3M，请重新选择上传!');
          return false;
        }
		 getUploadImgSrc(file).then((res) => {
						this.certImgs.push({naem:'',url:res});
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			})   
      }, 
      //上传多张图片
      handleRemove(file, fileList) {
        
        this.certImgs = fileList;
        console.log(file, fileList);
      },
      /*保存方法*/     
       submitForm(formName) {
        console.log('1234');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$loading();
              //上传多张图片
              let urlArr =[];
              if(this.certImgs){
	              this.certImgs.forEach((item) => {
	                urlArr.push(item.url)       
	              } );               	
              }
              
              this.ruleForm.certImg = urlArr.join(',');

              /*编辑器*/
          	 this.ruleForm.honor = this.getUMContent();
             let params =Object.assign({},this.ruleForm);
             if(this.expire=='1'){
                params.expireDate = ENDTIME
             } 
             /*日期转化*/
              if(!this.ruleForm.expireDate&&this.expire==2){
        						this.$message({
        							type: 'error',
        							message: "请选择营业执照有效期"
        						});	
        			this.$loading().close();		
        			return false;			
              }
              
              if(this.expire==2){
	              if( typeof this.ruleForm.expireDate!='string'){
	                params.expireDate=this.ruleForm.expireDate.Format('yyyy-MM-dd hh:mm:ss');
	              }             	
              }

              
        		 Service.entUpdate(params).then((res) => {

                     this.$loading().close();
        						this.$message({
        							type: 'success',
        							message: '修改成功！'
        						});	
        			localStorage.setItem('ccb','false'); 		
        			this.$router.push({
        					path: '/account/entInfo'
        				})				
        					}).catch((res) => {
        					 this.$loading().close();	
        						console.log('error ', res);
        						this.$message({
        							type: 'error',
        							message: res.message
        						});	 
        			})            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /*回显数据*/
			entinfo(){
		 		Service.entInfo().then((res) => {
              /*多张图片回显*/
              
              let imgs = [];
              if(res.certImg){
              	 imgs = res.certImg.split(',');
              }
                imgs.forEach((item) => {
                  this.certImgs.push({
                    name:'',
                    url:item
                  })
                })
			        this.ruleForm = {
			          name: res.name,
                servicePhone: res.servicePhone,
			          acceptPhone: res.acceptPhone,
	                 publicAccount: res.publicAccount,
	                 openBank: res.openBank,
			          regNumber: res.regNumber,
			          legalPerson: res.legalPerson,
			          permises: res.permises,
			          address:res.address,
			          regCapital:res.regCapital,
			          expireDate:res.expireDate,

			          businessScope:res.businessScope,
			          imageUrl:res.imageUrl,
			          certImg:res.certImg,
			          honor:res.honor,
			          id:res.id,
			        }	
              if(this.ruleForm.expireDate===ENDTIME){
                this.expire='1';
                this.ruleForm.expireDate=''
              } else{
                this.expire='2';
                // this.ruleForm.expireDate=''
              }
              /*等编辑器加载完成之后在执行*/		
              this.$nextTick(()=>{
                this.setContent(res.honor);
              })
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			})  		
	  },
    
  	   //获取富文本内容
      getUMContent() {
        let content = this.$refs.um.getUMContent(); // 调用子组件方法
        console.log(content);
        return content;
      },
      //判断富文本是否有内容
      hasContents() {
        return this.$refs.um.hasContents();
      },
      //设置富文本内容更
      setContent(info) {
        console.log(info);
        this.$refs.um.setContents(false, info);
      }     
  
    },
    mounted(){
      /*初使化数据*/
   	  this.entinfo();
    }
  }
</script>

<style lang="scss" scoped>
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
	}
	.infoContent{
		width: 100%;
		box-sizing: border-box;
		padding: 30px 50px;
		position: relative;
		background: white;
		// border: 1px solid gainsboro;
	}
  
  .input_w{
    width:93%;
    margin-right: 20px;
  }
  .timelimit{
    margin-top: 12px;;
  }
</style>