<template>
	<section>
		<div class="head">
			<div class="headcontent">
			<p style="float: left;">
				<img src="../../assets/images/join/logo.png"/><i>|</i><span>{{name}}</span>
			</p>
			<p style="float: right;width: 500px;text-align: right;"><span style="display: inline-block;">{{user.loginName}}</span><i>|</i><el-button type="text" style="margin-top: -3px;" @click="_logout" >退出</el-button></p>
			</div>
			
		</div>		
	</section>
</template>

<script>
import * as Service from '@/module/login/service.js';	
var userInfo = JSON.parse(localStorage.getItem('user'))||{};	
  export default {
    data() {
      return {
      	user:userInfo,
      }
    },
    props: {
      name:{
        required: false,
        type: String     	
      }
      
    },
     methods: {
     	_logout(){
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
     	}
     },
 	mounted() {	
 		this.user = JSON.parse(localStorage.getItem('user'))||{};
	 },	     
     
     
     
    
  }

</script>

<style lang="scss" scoped>
	.head{
		height: 50px;
		line-height: 50px;
	    background: #F5F5F5;
	    .headcontent{
	    	width: 1200px;
	    	margin: auto;
	    	height: 50px;	    	
	    }
	    p{
	    	width: 40%;
	    	height: 50px;
	    	i{
	    		margin:0 10px;
	    		margin-top: -2px;
	    	}
	    	span{
				font-size: 14px;
				color: #333333;	    		
	    	}
	    }
	}	
</style>