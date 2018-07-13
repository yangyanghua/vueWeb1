
<template>
<div>
      <div class="com-info">
      <!--<p class="infomain">
        <a href="http://www.iflashbuy.com" target="_blank">闪购官网</a>
        <span class="com-split">|</span>
        <a href="http://www.iflashbuy.com/download" target="_blank">闪购真品下载</a>
      </p>-->
    </div>
    <div class="com-header">
      <div class="headermain">
        <a class="logolink" href="index.html">
          <i class="sg-logo"></i>
        </a>
        <div class="logotitle">
          <p>商家</p>
          <p>服务中心</p>
        </div>
        <div class="userinfo">
            <!-- 欢迎, el表示组建 -->
            <el-dropdown @command="handleCommand">
						  <span class="el-dropdown-link">
						  	<!--使用{{loginName}}进行取值，但是需要在data中定义变量 -->
						    {{loginName}}<i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown" >
						    <!--<el-dropdown-item command="revisePw">修改密码</el-dropdown-item>-->
						    <el-dropdown-item command="logout">退出</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
        </div>
      </div>
    </div>
</div>
</template>
<script>
// import {httpService,currentHost, api} from '@/common/http/http.js'
import * as Service from '@/module/login/service.js';
export default {
  data(){
    return {
    	loginName:""
      // logoutURL: httpService+ api.logout + '?service='+location.origin+location.pathname+"#/",
      // helpUrl:currentHost+'/module/help.html#/',
      // logoutURL: "http://cas.sit.iflashbuy.com/cas/logout?service="+location.origin+location.pathname+"#/"
    }
  },
  props: {
    username: {
      required: true,
      type: String
    }
  },
   methods: {
		toHelp(){
			location.href = currentHost+'/help.html#/';
    },
    handleCommand(commond){
      console.log('get commond ', commond);
        if(commond==='logout'){
        	//退出提示
        	this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        	}).then(() => {
	        	Service.logout().then(res=>{
	          	//成功，则返回登录页面
	            console.log(res);
	            localStorage.removeItem('user');
	            this.$router.push('/login');
	            
	          }).catch(res=>{
	            localStorage.removeItem('user');
	            this.$router.push('/login');
	          })
        	}).catch(() => {
        	
        	});
        
        } else {
          // 修改密码
          this.$router.push('/account/password');  //通过路由实现跳转
        }
    },
    getLoginUserName(){
  		this.loginName = JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).loginName;

    }
   	

   }, 
   // 页面加载完成触发事件
   mounted(){
      this.getLoginUserName();
    }
   
   
   
   
  
}
</script>

