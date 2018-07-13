<template>
	<section class="join_content">
		<join-header name="创建店铺"></join-header>
		<div class="info_content">
			<div class="stroeInfo">
				<div class="stroelog">
					<img src="../../../../assets/images/join/slogo .png"/>
				</div>
				<div class="stroeN">
					<h1 class="sname">{{user.userEnter.name}}{{user.realName}}</h1>
					<p class="sAcct">{{user.loginName}}</p>
				</div>
				<div class="btnBox">
					<button class="submitBtn" @click="add" v-if="stroeLists.length==0" >创建店铺</button>
				</div>
			</div>
			
			<div class="stroes">
				<p class="empTip" v-if="stroeLists.length==0">暂无店铺！</p>
				<ul class="stroeList">
					<li class="strotItem" v-for="item in stroeLists" @click="viewStroe(item.status,item.id)">
						<h2 :title="item.name">{{item.name}}</h2>
						<p style="margin-top: 15px;">认证状态：{{item.status|stroeStatus}}</p>
						<p>使用期限：{{user.userEnter.expireDate}}</p>
					</li>
				</ul>
			</div>
		</div>		
		<footer-box></footer-box>
	</section>
</template>
<script>
import footerBox from '@/components/footer/index.vue';
import joinHeader from '@/components/joinHeader/index.vue';
import joinProcess from '@/components/joinProcess/index.vue';
import {storeLists} from '../../service.js';
  export default {
    data() {
      return {
		user:{
			userEnter:{
				name:'',
				expireDate: ''
			},
		},
		stroeLists:[],
      };
    },
    components: {
      footerBox,
      joinProcess,
      joinHeader
    },  
    filters: {
    	stroeStatus: function(StatusCode){
    		let status = '';
    		switch (StatusCode){
    			case 'ONLINE':
    			    status='已上线';
    				break;
    			case 'ONLINE_VERIFY':
    			    status='已上线,待确认';
    				break;
    			case 'UNKNOWN':
    			    status='未知';
    				break;
    			case 'OFF_LINE':
    			    status='已下线';
    				break;
    			case 'WAIT_AUDIT':
    			    status='待审核';
    				break; 
    			case 'ONLINE':
    			    status='以上线';
    				break; 
    			case 'AUDIT_FALL':
    			    status='审核资料失败';
    				break;     				
    			default:
    				break;
    		}
    		return  status;
    	}
    },    
    methods: {
    	add(){
       		this.$router.push({
         		 path:'/join/stroetype',
        	})	    		
    	},
		_storeLists(){
			storeLists().then((res) => {
				this.stroeLists = res;
				this.user.userEnter.expireDate = res[0]&&res[0].expireDate;
			}).catch((res) => {
		    		this.$message({
		        		type:'error',
		        		message:res.message
		    		}) 				
			})
		},
		viewStroe(status,id){
			if(status=='WAIT_AUDIT'||status=='AUDIT_FALL'||status=='ONLINE'){
       			 this.$router.push({
         		 path:'/join/stroeaudit',
          		 query:{ status:status,id:id}
        		})				
			}else{
       			 this.$router.push({
         		 path:'/store/info',
          		 query:{id:id}
        		})					
			}
		}
    },  
    
    
    
 	mounted() {
 		this.user = JSON.parse(localStorage.getItem('user'))||{};
		this._storeLists();
	 },	   
    
  }

</script>

<style lang="scss" scoped>
.join_content{
	width: 100%;
	background: #FFFFFF;
}

	.info_content{
		width: 1200px;
		margin: auto;
		margin-top: 30px;
		border: 1px solid #E6E6E6;
	}
	
	.stroeInfo{
		height: 120px;
		width: 100%;
		background: #F5F5F5;
		border-bottom: 1px solid #E6E6E6;
		.stroelog{
			float: left;
			height: 80px;
			width: 80px;
			border-radius:50%;
			margin-top: 20px;
			margin-left: 30px;
		}
		.stroeN{
			float: left;
			height: 120px;
			width: 500px;
			margin-left: 20px;
			.sname{
				font-size: 18px;
				color: #333333;	
				margin-top: 20px;
				font-weight: bold;			
			}
			.sAcct{
				font-size: 18px;
				color: #666666;	
				margin-top: 15px;			
			}
		}
				
	}
	.stroes{
		margin-top: 20;
		width: 100%;
		padding-bottom: 30px;
	}
	.stroeList .strotItem{
		display: inline-block;
		margin-top: 30px;
		cursor: pointer;
		width: 358px;
		height: 169px;
		margin-left: 30px;
		border-top: 4px solid  #4DA9E4;
		box-shadow: 0 1px 2px 2px gainsboro;
		h2{
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			color: #333333;			
			background: #E7F1F8;
			text-align: center;
			overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
		}
		p{
			height: 45px;
			line-height: 45px;
			font-size: 14px;
			color: #333333;			
			text-align: left;
			padding-left: 20px;
		}
	}
	
.btnBox{
		width: 200px;
		float: right;
		height: 120px;
		line-height: 120px;
		text-align: right;
		.submitBtn{
			border: none;
			background: none;
			padding:0 15px;
			width: 150px;
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
		.empTip{
			width: 100%;
			height: 210px;
			line-height: 210px;
			font-size: 28px;
			color: #999999;
			text-align: center;
			
		}
</style>