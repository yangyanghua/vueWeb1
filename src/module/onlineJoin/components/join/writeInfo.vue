<template>
	<section class="join_content">
		<join-header name="商家入驻"></join-header>
		<div class="apply_form">
		<join-process :active="2"></join-process>
		<div class="form_content">

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
		<h2 class="item_title">企业类型选择</h2> 
		 <el-form-item label="企业类型" prop="type">
		    <el-radio-group v-model="ruleForm.type">
		      <el-radio label="SYNTHESIS">综合集约商</el-radio>
		      <el-radio label="CATEGORY">品类集约商</el-radio>
		      <el-radio label="MULTI_BRAND">多品牌企业</el-radio>
		      <el-radio label="BRAND">单品牌企业</el-radio>      
		    </el-radio-group>		 	
	<!--		  <p style="font-size: 12px;color: #999999;">此处文本为不同企业类型的解释此处文本为不同企业类型的解释此处</p>-->
		 </el-form-item>
		<h2 class="item_title">营业执照信息</h2> 
		 <el-form-item label="营业执照电子版" prop="license">
				<p style="font-size: 14px;color: #333333;line-height: 22px;padding-top: 7px;">请上传清晰营业执照图片，营业执照复印件需加盖公司红章扫描上传，若营业执照上未体现注册资本、
					经营范围，请在<br/>营业执照后另行上传<a href="http://www.gsxt.gov.cn/index.html" target="_blank">企业信息公示网</a>上的截图。</p>
			<div style="margin-top: 15px;">
					<el-upload
					  action=""
					  list-type="picture-card"
					  :file-list="licenses"
					  :limit="2"
					  :before-upload = "beforeUpload"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus" v-if="licenses.length < 2"  style="padding-top: 30px;"><span style="display: block;font-size: 14px;margin-top: 10px;">上传图片</span></i>
					</el-upload>				
			</div>
				<p style="font-size: 12px;color: #999999;">图片尺寸请确保800px*800px以上，文件大小5MB以内，支持JPG、PNG格式，最多可上传2张</p>
		 </el-form-item>
		 <el-form-item label="公司名称" prop="company">
		 	<el-input v-model="ruleForm.company" :maxlength="128" placeholder="请按照营业执照商登记的完整名称填写" style="width: 500px;" ></el-input>
		 </el-form-item>
		 <el-form-item label="营业执照注册号" prop="registrationNumber">
		 	<el-input v-model="ruleForm.registrationNumber" :maxlength="32" placeholder="请按照营业执照商的注册号进行填写" style="width: 500px;" ></el-input>
		 </el-form-item>		 
		 <h2 class="item_title">联系方式</h2>
		 <el-form-item label="授权联系人姓名" prop="contactMan">
		 	<el-input v-model="ruleForm.contactMan" :maxlength="32" style="width: 500px;" ></el-input>
		 </el-form-item>			 
		 <el-form-item label="联系人手机" prop="tel">
		 	<el-input v-model="ruleForm.tel"  :maxlength="11" style="width: 500px;" ></el-input>
		 </el-form-item>		 
		 <!--<el-form-item label="联系人传真" prop="fax">
		 	<el-input v-model="ruleForm.fax" :maxlength="32"  style="width: 500px;" ></el-input>
		 </el-form-item>			 -->
		 <el-form-item label="联系人电子邮箱" prop="email">
		 	<el-input v-model="ruleForm.email"  :maxlength="32" style="width: 500px;" ></el-input>
		 </el-form-item>		 
        <el-form-item label="公司详细地址" prop="province" style="width: 301px;display: inline-block;">
            <el-select v-model="ruleForm.province" style="width: 150px;" placeholder="省" @change="provinceModelChange">
              <el-option v-for="item in province"
                :key="item.provinceid"
                :value="item.provinceid"
                :label="item.provincename"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="5px" :error="cityError" prop="city" style="width: 155px;display: inline-block;margin-left: 10px;">
          <el-select v-model="ruleForm.city" placeholder="市" style="width: 150px;" @change="cityModelChange">
            <el-option v-for="item in citys"
            :key="item.cityid"
            :value="item.cityid"
            :label="item.cityname"
          ></el-option>
        </el-select>
      </el-form-item>  
      <el-form-item label-width="5px" :error="districtError" prop="district" style="width: 155px;display: inline-block;">
        <el-select v-model="ruleForm.district" placeholder="区" style="width: 150px;">
          <el-option  v-for="item in districts"
                   :key="item.countyId"
                   :label="item.countyName"
                   :value="item.countyId">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label-width="5px" :error="addressError" prop="address" style="display: inline-block;">
          <el-input v-model="ruleForm.address" :maxlength="100" style="width:420px;" ></el-input>
    </el-form-item>
		<h2 class="item_title">开户银行信息</h2>	 
		 <el-form-item label="开户银行名称" prop="bank">
		 	<el-input v-model="ruleForm.bank" :maxlength="200"  style="width: 500px;" ></el-input>
		 </el-form-item>		
		 <el-form-item label="企业银行账号" prop="bankAct">
		 	<el-input v-model="ruleForm.bankAct" :maxlength="200"  style="width: 500px;" ></el-input>
		 </el-form-item>
		 <el-form-item label="银行开户名" >
		 	<p>{{ruleForm.company}}</p>
		 </el-form-item>
		</el-form>
		</div>		
		<div class="btnBox">
			<button class="prevBtn" @click="prev">上一步</button>
			<el-button class="submitBtn" :loading="submitLoadgin" @click="submitForm('ruleForm')">{{btnTxt}}</el-button>
		</div>
		</div>
		<footer-box></footer-box>
	</section>
	
	
</template>

<script>
import footerBox from '@/components/footer/index.vue';
import joinHeader from '@/components/joinHeader/index.vue';
import joinProcess from '@/components/joinProcess/index.vue';
import {getProvinceCity,getCityDistrict,join,getEntInfo,updateEntInfo} from '../../service.js';

import {getUploadImgSrc,UploadImgurl} from '@/common/js/service.js';
var userInfo = JSON.parse(localStorage.getItem('user'))||{};
  export default {
    data() {
      return {
      	submitLoadgin:false,
      	entStatus:'',
      	btnTxt:'下一步，提交资料',
      	user:userInfo,
    		province:[],
    		city:{},
    		citys:[],
    		district:{},
    		districts:[],
    		cityError:'',
    		districtError:'',
    		addressError:'',
			provinceName:'',
			cityName:'',
			districtName:'',
      	dialogImageUrl:'',
      	licenses: [],
      	ruleForm:{
      		code:'',
      		type:'',
      		company:'',
      		license:'',
      		registrationNumber:'',
      		contactMan:'',
      		tel:'',
      		fax:'',
      		email:'',
	        province: '',
	        city: '',
	        district:'',
	        address:'',
      		bank:'',
      		bankAct:'',
 //     		accountName:'',
      	},
        rules: {
          type: [
            { required: true, message: '请选择企业类型', trigger: 'change' },
          ],
          license:[
          	{ required: true, message: '请上传营业执照', trigger: 'change' },
          ],
          company:[
          	{ required: true, message: '请输入企业名称', trigger: 'blur' },
          ],          
          registrationNumber:[
          	{ required: true, message: '请输入营业执照注册号', trigger: 'blur' },
          ],  
          contactMan:[
          	{ required: true, message: '请输入授权联系人姓名', trigger: 'blur' },
          ],            
          tel:[
          	{ required: true,  message: '请输入联系人手机', trigger: 'blur' },
          	{ min: 11,  message: '请输入正确联系人手机', trigger: 'blur' }
          ],  
          province:[
          	{ required: true, message: '请选择省', trigger: 'blur' },
          ],            
          bank:[
          	{ required: true, message: '请输入开户银行名称', trigger: 'blur' },
          ],            
          bankAct:[
          	{ required: true, message: '请输入银行账号', trigger: 'blur' },
          ],           
//        accountName:[
//        	{ required: true, message: '请输入银行开户姓名', trigger: 'blur' },
//        ],             
          
         }
			
      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader
    },       
    methods: {
    	cityModelChange(val){
    		var dis = this.district[val];
    		if(dis==undefined){
    			getCityDistrict({cityid:val}).then((res)=>{
        				this.district[val]=res;
        				this.districts= res;
    			}).catch(_=>{
    				this.$message({
        					type:'error',
        					message:'加载省市信息出错,请联系管理员'
    				})
    			})
    		}else{
    			this.districts=dis;
    		}
//  		this.ruleForm.district = this.districts[0];
    		
    	},
    	prev(){
		        this.$confirm('此操作将会返回上一步，未保存的信息将会丢失, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					this.$router.push('/join');
		        }).catch(() => {
        
		        });    		
    	},
    	provinceModelChange(val){
    		this.citys = this.city[val];
    		this.ruleForm.city = this.citys[0].cityid;
            this.cityModelChange(this.ruleForm.city);
    	},
      _getEntInfo(){
		getEntInfo().then((res) => {
		 	let imgs = res.imageUrl.split(',');
				imgs.forEach((item) => {
					this.licenses.push({
						name:'',
						url:item
					})
				})	
			this.ruleForm = {
							        code:res.code,
						      		type:res.type,
						      		company:res.name,
						      		license:res.imageUrl,
						      		registrationNumber:res.regNumber,
						      		contactMan:res.legalPerson,
						      		tel:res.contactTel,
						      		fax:res.contactFax,
						      		email:res.contactEmail,
							        province:res.province,
							        city: res.city,
							        district:res.county,
							        address:'',
						      		bank:res.depositBank,
						      		bankAct:res.bankAccount,
						      		accountName:res.accountName,
									} ;		 				
					  this.provinceModelChange(res.province);					  
					  this.cityModelChange(res.city)
					  let countyName = '';
					  let _this = this;
						//详细地址回显
		    			getCityDistrict({cityid:res.city}).then((res1)=>{
						  res1.forEach((item) => {
						  	if(item.countyId==res.county){
						  		 this.ruleForm.address =  res.address.split(item.countyName)[1];				  		
						  	}  	
						  })							
		    			}).catch(_=>{
		    				this.$message({
		        					type:'error',
		        					message:'加载省市信息出错,请联系管理员'
		    				})
		    			})
					
					this.entStatus = res.status;
					
		}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
					});	      	
    	}, 
      handleRemove(file, fileList) {
      	
      	this.licenses = fileList;
        console.log(file, fileList);
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG&&!isPNG) {
          this.$message.error('上传图片只能是 JPG、PNG 格式!');
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return false;
        }
		 getUploadImgSrc(file).then((res) => {
						this.licenses.push({naem:'',url:res});
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
					});	
      },
      //提交资料
      submitForm(formName) {
      	 
      	let urlArr =[];
      	 
      	this.licenses.forEach((item) => { 		
      		urlArr.push(item.url)    		
      	} )
      	this.ruleForm.license = urlArr.join(',');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(!this.ruleForm.city){
                this.cityError = '请选择市';
                return false;
            }else{
            	this.cityError = '';
            }
            if(!this.ruleForm.district){
            	this.districtError = '请选择区';
            	return false;
            }else{
            	this.districtError = '';
            }
            if(!this.ruleForm.address){
            	this.addressError = '请输入详细地址';
            	return false;
            }else{
            	this.addressError = '';
            }
              let _this = this;
          
             this.province.forEach((item) => {
              	if(_this.ruleForm.province == item.provinceid){
              		_this.provinceName = item.provincename;
              	}
              });
              this.citys.forEach((item) => {
               	if(_this.ruleForm.city == item.cityid){
              		_this.cityName = item.cityname;
              	}             	
              });
              this.districts.forEach((item) => {
               	if(_this.ruleForm.district == item.countyId){
              		_this.districtName = item.countyName;
              	}             	
              });  
              
              // this.ruleForm.address = _this.provinceName + _this.cityName + _this.districtName + _this.ruleForm.address; 
           	  this.submitLoadgin = true;
           	  this.btnTxt = '资料提交中...'
		if(this.ruleForm.code){
					 updateEntInfo({...this.ruleForm, address: _this.provinceName + _this.cityName + _this.districtName + _this.ruleForm.address}).then((res) => {
					 	 let userInfos = JSON.parse(localStorage.getItem('user'))||{}; 
									this.$message({
										type: 'success',
										message: '提交成功！'
									});	
								userInfos.userEnter = res.enterInfo;
								userInfos.userEnter.serviceCharge = res.serviceCharge;
								userInfos.userEnter.serviceChargeCode = res.serviceChargeCode;
								userInfos.userEnter.cashDeposit = res.cashDeposit;
								userInfos.userEnter.cashDepositCode = res.cashDepositCode;
								userInfos.userEnter.commission = res.commission;
								userInfos.userEnter.totalMoney = res.totalMoney;
						localStorage.setItem('user', JSON.stringify(userInfos));	
						let _this = this;
						setTimeout(function(){
							_this.$router.push('/join/confirm');	
						},2000)
						}).catch((res) => {
							this.submitLoadgin = false;
							this.btnTxt = '下一步，提交资料'
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});	 
						});	             		
           }else{		
 			 	join({...this.ruleForm, address: _this.provinceName + _this.cityName + _this.districtName + _this.ruleForm.address}).then((res) => {
			 	      
			 	      let userInfos = JSON.parse(localStorage.getItem('user'))||{}; 
							this.$message({
								type: 'success',
								message: '提交成功！'
							});
								userInfos.userEnter = res.enterInfo;
								userInfos.userEnter.serviceCharge = res.serviceCharge;
								userInfos.userEnter.serviceChargeCode = res.serviceChargeCode;
								userInfos.userEnter.cashDeposit = res.cashDeposit;
								userInfos.userEnter.cashDepositCode = res.cashDepositCode;
								userInfos.userEnter.commission = res.commission;
								userInfos.userEnter.totalMoney = res.totalMoney;
						localStorage.setItem('user', JSON.stringify(userInfos));							
						let _this = this;
						setTimeout(function(){
							_this.$router.push('/join/confirm');	
						},2000)
	
						}).catch((res) => {
							this.btnTxt = '下一步，提交资料'
							this.submitLoadgin = false;
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});	 
						});	            		
           	}
           	
                        
          } else {
          	  
            console.log('error submit!!');
            return false;
          }
        });
      },
      init(initFlag){

            var pro = getProvinceCity().then((res)=>{
                var _province = this.province;
                var _city = this.city;
                res.forEach(function(item,index){
                      for(var i=0;i<item.provinces.length;i++){
                        _province.push(item.provinces[i]);
                        var provinceId = item.provinces[i].provinceid;
                        _city[provinceId]=item.provinces[i].cities;
                      }
                });
            let userInfos = JSON.parse(localStorage.getItem('user'))||{};  
            if(userInfos.userEnter){
            	this._getEntInfo(); 
            } 
           }).catch(_=>{
                        this.$message({
                        type:'error',
                        message:'加载省市信息出错'
                      });
                    })
           }

      
    },
 	mounted() {
		this.init();
		
	 },	   
    
  }

</script>

<style lang="scss" scoped>

@import url("./elStyle.css");

html,body{
  width:100%;
  height:100%;
}
.join_content{
	background: #FFFFFF;
}

.apply_form{
	width: 1200px;
	box-sizing: border-box;
	margin: auto;
	border: 1px solid gainsboro;
	margin-top: 30px;

}
.form_content{
	width: 100%;
	padding: 40px 70px 70px 70px;
	border-bottom: 1px solid gainsboro;
}
.item_title{
	font-size: 18px;
	color: #333333;	
	font-weight: bold;
	margin-bottom: 10px;
}

.btnBox{
		width: 100%;
		height: 100px;
		line-height: 100px;
		text-align: right;
		.prevBtn{
			width: 150px;
			height: 40px;
			line-height: 35px;
			margin-right: 35px;			
			border: none;
			background: none;
			color: #4DA9E4;
			font-size: 14px;
			border-radius: 2px;	
			border: 1px solid #4DA9E4;		
		}
		.prevBtn:hover{
			opacity: 0.8;
		}
		.submitBtn{
			border: none;
			background: none;
			padding:0 15px;
			width: 260px;
			height: 40px;
			line-height: 35px;
			background: #4DA9E4;
			border-radius: 2px;
			border: 1px solid #4DA9E4;
			color: #FFFFFF;
			font-size: 14px;
			margin-right: 30px;			
		}
		.submitBtn:hover{
			opacity: 0.8;
		}
	}	


</style>