<template>
	<section class="login_content">
    <div class="logoConter">
        <div class="mail">
          <div class="loginForm">
            <span class="title">登录</span>
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px">
                     <el-form-item >
                        <input type="hidden" v-model="ruleForm2.uuid" />
                    </el-form-item>

                    <el-form-item prop="loginName"  >
                      <label class="inlable">
                        <input type="text"  v-model="ruleForm2.loginName" class="input_260" placeholder="请输入用户名称"/>
                        <p><img src="/static/images/logo-2.png" alt=""></p>
                      </label> 
                      
                    </el-form-item>
                    <el-form-item prop="password">    
                      <label class="inlable passw">
                        <input type="password"  v-model="ruleForm2.password" class="input_260" placeholder="请输入登录密码"/>
                        <p><img src="/static/images/logo-3.png" alt=""></p>
                      </label>
                    </el-form-item>
                   <div class="checkCode" >
                      <label class="inlable">
                        <input type="tetx"  v-model="ruleForm2.validateCode" class="input_150" placeholder="请输入验证码" @keyup.enter="enterKeyLogin1"/>
                        <p class="p1"><img src="/static/images/logo-4.png" alt=""></p>
                      </label>
                      <div class="checkCodeImg" @click="getCheckcode" id="v_container">
                        <img :src="ruleForm2.src" style="height: 100%;" />
                      </div>
                    </div>   
                   <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
                    <el-form-item style="width:100%;margin-top: 20px;">
                      <!-- :loading 属性显示加载等待 ，true表示正在加载-->   <el-button type="primary" class="btn" @click.native.prevent="handleSubmit2('ruleForm2')" :loading="logining">登录</el-button>   
                      <!--<el-button type="text" @click="forgetPassword=true" >忘记密码</el-button>-->
                    </el-form-item>
                  </el-form>  
              </div> 
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="登录" name="signIn">
                  <div class="loginForm">
                    <el-form :model="ruleForm2"   :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px">
                     <el-form-item >
                        <input type="hidden"  v-model="ruleForm2.uuid" />
                    </el-form-item>

                    <el-form-item prop="loginName"  >
                      <label class="inlable">
                        <input type="text"  v-model="ruleForm2.loginName" class="input_260" placeholder="账号"/>
                        <p><img src="/static/images/logo-2.png" alt=""></p>
                      </label> 
                      
                    </el-form-item>
                    <el-form-item prop="password">    
                      <label class="inlable passw">
                        <input type="password"  v-model="ruleForm2.password" class="input_260" placeholder="密码"/>
                        <p><img src="/static/images/logo-3.png" alt=""></p>
                      </label>
                    </el-form-item>
                   <div class="checkCode" >
                      <label class="inlable">
                        <input type="tetx"  v-model="ruleForm2.validateCode" class="input_150" placeholder="验证码" @keyup.enter="enterKeyLogin1"/>
                        <p class="p1"><img src="/static/images/logo-4.png" alt=""></p>
                      </label>
                      <div class="checkCodeImg" @click="getCheckcode" id="v_container">
                        <img :src="ruleForm2.src" style="height: 100%;" />
                      </div>
                    </div>   
                    <el-form-item style="width:100%;margin-top: 40px;">
                     <el-button type="primary" class="btn" @click.native.prevent="handleSubmit2('ruleForm2')" :loading="logining">登录</el-button>   
                    </el-form-item>
                  </el-form>  
              </div> 
              </el-tab-pane>
              <el-tab-pane label="注册" name="register">
              
			  <div class="registeredForm loginForm">
					<el-form :model="regForm" :rules="regRules" ref="regForm" label-width="0" >
					  <el-form-item  prop="phone">
					    <el-input v-model="regForm.phone" :maxlength="11" placeholder="手机号码" ></el-input>
					  </el-form-item>
					  <el-form-item  prop="vCode">
					    <el-input style="width: 160px;" v-model="regForm.vCode" placeholder="手机验证码" ></el-input>
					  	<el-button style="width: 164px;"  type="primary" @click="_getVcode" :disabled="!isCanSendCode" >{{getcodeTxt}}</el-button>
					  </el-form-item>
					  <el-form-item  prop="password">
					    <el-input type="password" v-model="regForm.password" placeholder="密码" @keyup.enter.native="enterKeyLogin2"></el-input>
					  </el-form-item>  
					</el-form>
					<el-button type="primary" :loading="regloading"  @click.native.prevent="_register" class="btn">注册</el-button>
			  </div>
              </el-tab-pane>
            </el-tabs> -->
        </div>
         <div class="IE9jr" v-if="isIe9">
            <p> 检测到您浏览器版本过低，无法正常登录</p>
            <p>请升级到<i>最新IE版本</i>或者用<i>google浏览器</i>访问</p>
         </div>
    </div>  
 <div v-if="regSuccess"  class="regSuccess">
 	
 	  <div class="regSuccess_2">
      <h2><i>账号注册成功！</i><br >系统将在<a>{{countdown}}s</a>内跳转至店铺入驻页面</h2>
    </div>

 </div>
</section>
</template>

<script>
import {login,getCheckcode,getVcode,register,IMcheckIsRegister} from '../../service.js';
import * as Service from '@/common/service/account/index.js';
import {currentHost,api,httpService} from '@/common/http/http.js';
import {ccbGet} from '@/common/service/account/index.js';
  export default {
    data() {
      return {
      	isIe9:false,
      	regloading:false,
      	countdown:3,
      	regSuccess:false,
      	checkCodeImg:'',
        logining: false,
        forgetPassword:false,
        errorQty:0,
        isCanSendCode:true,
        verifyCode:'',
        getcodeTxt:'获取手机验证码',
        regForm:{
        	phone:'',
        	vCode:'',
        	password:'',
        }, 
         regRules: {
          phone: [
            { required: true,  message: '请输入手机号码', trigger: 'blur' },
          ],
          validateCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]          
        },         
        ruleForm2: {
          loginName: '',
          password: '',
          validateCode:'',
           //base64验证码
          src:'',
          //标识符
          uuid:'',
          
        },
        activeName: 'signIn',
        rules2: {
          loginName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          validateCode:[
          	{ required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
    	//获取手机验证码
	_getVcode(){
		if(this.regForm.phone.length == 11){
		 		getVcode({phone:this.regForm.phone}).then((res) => {
						this.$message({
							type: 'success',
							message: '验证码发送成功，请注意查收。'
						});
					this.isCanSendCode = false;	
					let i = 60;
					let _this = this;
					let tiemer = setInterval(function(){
						if(i > 0){
						i--;
						 _this.getcodeTxt = '重新获取验证码（'+i +'）';								
						}else{
						    clearInterval(tiemer);
						   _this.isCanSendCode = true;
						   _this.getcodeTxt = '重新获取验证码';
						   
						}
					},1000)
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
							type: 'error',
							message: res.message
						});	 
			}) 			
		}else{
						this.$message({
							type: 'error',
							message: '请输入正确手机号码'
						});				
		}

	},    	
    	//注册
	_register(){
		this.regloading = true;
		let _this = this;
		 _this.$refs.regForm.validate((valid) => {
		          if (valid) {
						let regParams = this.regForm;
				 		register(regParams).then((res) => {
						localStorage.setItem('user', JSON.stringify(res));
						//设置登录超时时间，12个小时后超时
						localStorage.setItem('timeOut', new Date().getTime()+12*60*60*1000);
					 this.regSuccess = true;						
					let i = 3;
					let _this = this;
					let tiemer = setInterval(function(){
						if(i > 0){
						i--;
						 _this.countdown = i ;								
						}else{
						    clearInterval(tiemer);
				       	   _this.$router.push({
				         		 path:'/join',
				        		})							    
						   _this.regSuccess = false;
				       	   _this.$router.push({
				         		 path:'/join',
				        		})	
						}
					},1000)						
						
							}).catch((res) => {
								this.regloading = false;
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
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      getCheckcode(){
  		   Service.getCheckcode().then((res) => {
	          	this.ruleForm2.src = res.src;
	          	this.ruleForm2.uuid = res.uuid;  	
			 })
			   /*向后端请求数据 （失败）*/	
			   .catch((res) => {
					this.$message({
						type: 'error',
						message: res.message
					});
				})
      },
      handleSubmit2() {

       		var _this = this;
            
            if(!_this.ruleForm2.loginName){
 						this.$message({
							type: 'error',
							message: '请输入账号'
						}); 
				return false;		
            }else if(!_this.ruleForm2.password){
 						this.$message({
							type: 'error',
							message: '请输入密码'
						}); 
				return false;	            	
            }else if(!_this.ruleForm2.validateCode){
  						this.$message({
							type: 'error',
							message: '请输入验证码'
						}); 
				return false;	           	
            }
            _this.logining = true;
            var loginParams =  _this.ruleForm2;  
            	//src赋值null
            	this.ruleForm2.src = null;
		 		login(loginParams).then((res) => {
          // 添加判断是否注册环信账号
          IMcheckIsRegister({chatAccounts: res.chatAccount}).then((res)=>{
            // console.log('环信注册返回值-----',res);
          })

				// console.log('res-----------123',res);

				localStorage.setItem('user', JSON.stringify(res));
				//设置登录超时时间，12个小时后超时
				localStorage.setItem('timeOut', new Date().getTime()+12*60*60*1000);
					_this.logining = false;	
          if (!res.store) {  // 未创建店铺
            _this.$router.push('/store/info/edit');
          } else {
            _this.$router.push('/index');
          }
 					
//			    if(res.isJoin){//已经入驻过的账号跳转到首页
//          		if(res.store){//有店铺的
//          			if(res.store.status=="WAIT_AUDIT" || res.store.status=="AUDIT_FALL"){//在审核或审核失败           				
//				       			 this.$router.push({
//				         		 path:'/join/stroeaudit',
//				          		 query:{ status:res.store.status,id:res.store.id}
//				        		})	
//          			}else{
//          				_this.$router.push('/index');
//          			}	
//          		}else{//没店铺的
//          			_this.$router.push('/join/joinSuccess');
//          		}
//
//			    }else{//没有入驻的账号，开始入驻
//			    	if(res.userEnter){
//				    	if(res.userEnter.status == 'WAIT_AUDIT' || res.userEnter.status == 'AUDIT_FALL'){//待审核
//				    		this.$router.push('/join/audit');
//				    	}else if(res.userEnter.status == 'AUDIT_SUCCESS'){
//				    		this.$router.push('/join/pay');
//				    	}else if(res.userEnter.status =='NEW'){
//				    		this.$router.push('/join/writeInfo');
//				    	}else{
//				    		this.$router.push('/join');
//				    	}
//			    	}else{
//			    		this.$router.push('/join');
//			    	}
//			    	
//			    } 			   			   
					}).catch((res) => {
						console.log('error ', res);
						//如果出现异常，重新请求接口获取验证码
						this.getCheckcode();
//						if(res.code == 400) {
//								
//						}
						this.$message({
							type: 'error',
							message: res.message
						});
					 _this.logining = false;		 
			})    	 			 				    

      },
      enterKeyLogin(_event){
      	//alert(_event.code+"|"+_event.keyCode);
      	this.handleSubmit2();
      },
      //按enter键触发该方法
       enterKeyLogin1(_event){
      	//alert(_event.code+"|"+_event.keyCode);
      	this.handleSubmit2();
      },
       //注册按enter键触发该方法
       enterKeyLogin2(_event){

        //alert(_event.code+"|"+_event.keyCode);
        this._register();
      },
      //切换的方法
       handleClick(tab, event) {
        console.log(tab, event);
      },
       CheckInternetExplorer() {  
            var browser = navigator.appName;  
            var b_version = navigator.appVersion;  
            var version = b_version.split(";");  
        if (version.length > 1) {  
                var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));  
                if (trim_Version < 10) {  
                    alert("检测到您浏览器版本过低，部分功能可能无法正常使用，请先升级您的浏览器。");  
                    return false;  
                }  
           }  
            return true;  
        }        
      
      

    },
 	mounted() {
 		this.isIe9 = !this.CheckInternetExplorer();
		//获取验证码
		this.getCheckcode();
	 },	   
    
  }

</script>

<style lang="scss" scoped>
.IE9jr{
  width:360px;
  height:420px;
  margin: 12px auto;
  position:  absolute;
  top:0;
  left:10px;
  background:#fff;
  z-index:999;
  padding-top:160px;
  p{
    line-height:40px;
    text-align: center;
    font-size:16px;
    i{
      color:$color-primary;
    }
  }
}
html,body{
  width:100%;
  height:100%;
}

  .header{
  height: 120px;
  padding:20px 0 0 120px; 
  }
  .banner{
    height: 600px;
    // background: url(/static/images/banner.jpg) center center;
    background-size:cover;
    position: relative;
  }
  .login_content{
  	position: fixed;
  	top: 0;
  	left:0;
    width: 100vw;
    height: 100vh;
    background: #0b46c1;
    background: url(/static/images/login_bg.png) center center no-repeat;
    // background-repeat-y: no-repeat;
    background-size: cover;
  }
  .logoConter{
    width: 330px;
    height: 444px;
    position: absolute;
    top: 50%;
    right: 15%;
    margin-top: -222px;
    .title{
      display: inline-block;
      width: 100%;
      text-align: center;
      color: #00499d;
      font-size: 18px;
      line-height: 2.6;
      border-bottom: 1px solid #eee;
    }
    .mail{
      width: 330px;
      height: 420px;
      background: #fff;
      margin: 12px auto;
      position: relative;
      padding: 30px 15px;
      border-radius: 5px;
    }
  }


	.loginForm{
     width:300px;
     height:412px;
     padding: 0 20px;
     .logo{
      text-align: center;
      padding-bottom:14px;
     }
     input::-webkit-input-placeholder{
      color:#c2c2c2;
     }
     input::-moz-input-placeholder{
      color:#c2c2c2;
     }
     input::-ms-input-placeholder{
      color:#c2c2c2;
     }

     .input_260,.input_150{
      height:54px;
      border-radius:5px;
      border:1px solid #c2c2c2;
      color:#666;
      padding-left:50px;
     }
     .input_260:hover,.input_150:hover{
      border:1px solid #6fb9e9;
     }
    
    .input_260:focus,.input_150:focus{
      border:1px solid #6fb9e9;
     }
     
      .input_260{
        width:260px;
      }
      .input_150{
        width:150px;
      }
     .inlable{
       position: relative;
     }
     p{
      position: absolute;
      top:-12px;
      left:15px;
      opacity: .5;
      &:hover{
        opacity: 1;
      }
     }
     .p1{
        top:-8px;
      }
      .btn{
        height:54px;
        border-radius:5px;
        background: #00499d;
        color:#fff;
        text-align: center;
        width:260px;
        border:none;
        font-size:18px;
      }
      .btn:hover{
        background:rgba(77,169,228,.8);
      }
      .checkCodeImg{
        padding:10px;
        background:rgb(255,255,255);
        width:99px;
        height: 54px;
        border-radius:5px;
        position: absolute;
        cursor:pointer;
        right:0;
        top:0;
        border:1px solid #ddd;
      }

  }
.checkCode{
  clear:both;
  position: relative;
}
.regSuccess{
	position: fixed;
	height: 100%;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	background: rgba(0,0,0,.8);
	
  .regSuccess_2{
    width: 320px;
    height: 100px;
    background: #FFFFFF;
    top: 50%;
    left: 50%;
    z-index: 101;
    margin-left: -160px;
    margin-top: -50px;
    position: absolute;
    h2{
      width: 100%;
      text-align: center;
      font-size: 14px;
      margin-top: 25px;
      i{
        color: #4da9e4;
        font-weight: 700;
      }
      a{
        color: #4da9e4;
        font-weight: 700;
      }
    }

  }
	
}

  
</style>