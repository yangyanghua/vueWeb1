<template>
	<section>
	<div class="BreadCrumbs"><span>店铺管理</span><i style="padding: 0 10px;">/</i><span>店铺装修</span><i style="padding: 0 10px;">/</i><span>装修明细</span></div>
		<div class="content">
	<!--<div class="storeContent">
	    <h1 class="storeHead">店铺名字店铺名字店铺名字店铺名字店铺名字</h1>
	    <div class="storeBody"v-bind:style="{background: bgColor}">
		<div v-for="item in storeTemplate" >
		<components1 :upComponent="upComponet" v-if="item.type==1"></components1>
		<components2 v-if="item.type==2"></components2>
		<components3 v-if="item.type==3"></components3>	
		<components4 v-if="item.type==4"></components4>				
		</div>
	    </div>
	</div>-->
            <div class="view_box hidden" style="min-height:680px">
	            <div class="view_title">	         
	            	<span>店铺名字店铺名字店铺名字店铺名字店铺名字</span>
	            </div>
	            <div class="vbox">
	            	<div class="container">
 <div class="width100 l"><img id="grid_1" src="http://img01.sys.iflashbuy.com:8282/group2/M00/07/5F/wKgF-lpce26ATx1iAACMuy9_8rI253.jpg?w=370&h=265" /></div>
 </div>
	            </div>
            </div>	
	
	
	
	
	
	
	<div class="operation">
		   <div class="btn" style="margin-top: 15px;text-align: left;padding-left: 35px;">
		   <el-button type="primary" round @click="choType=1">自定义布局</el-button>
		   <el-button type="primary" round @click="choType=0">背景模板</el-button>		   	
		   </div>
		<div class="com" v-if="choType==1">
			<ul class="chooseComList">
				<li>
					<img src="../../../../assets/images/store/temlp1.png"/>
					<div class="opt">
						<p>单列橱窗</p>
						<el-button size="mini" @click="addMponets(1)" round>+添加</el-button>
					</div>
				</li>
				<li>
					<img src="../../../../assets/images/store/temlp2.png"/>
					<div class="opt">
						<p>二列橱窗</p>
						<el-button size="mini" @click="addMponets(2)" round>+添加</el-button>
					</div>					
					
				</li>
				<li>
					<img src="../../../../assets/images/store/temlp3.png"/>
					<div class="opt">
						<p>三列橱窗</p>
						<el-button size="mini" @click="addMponets(3)" round>+添加</el-button>
					</div>					
				</li>
				<li>
					<img src="../../../../assets/images/store/temlp5.png"/>
					<div class="opt">
						<p>复杂橱窗</p>
						<el-button size="mini" @click="addMponets(4)" round>+添加</el-button>
					</div>					
				</li>
			</ul>				
			
		</div>
		<div class="bgcolor"  v-if="choType==0">
			<ul class="chooseComList">
				<li>
					<img src="../../../../assets/images/store/custbg1.jpg"/>
					<div class="opt">
						<p>土豪金</p>
						<el-button size="mini" @click="setBgColor('#d0c2af')" round>设置</el-button>
					</div>
				</li>
				<li>
					<img src="../../../../assets/images/store/custbg2.jpg"/>
					<div class="opt">
						<p>活力红</p>
						<el-button size="mini" @click="setBgColor('#e86d70')" round>设置</el-button>
					</div>					
					
				</li>
				<li>
					<img src="../../../../assets/images/store/custbg3.jpg"/>
					<div class="opt">
						<p>神秘蓝</p>
						<el-button size="mini" @click="setBgColor('#81b5ed')" round>设置</el-button>
					</div>					
				</li>
				<li>
					<img src="../../../../assets/images/store/custbg4.jpg"/>
					<div class="opt">
						<p>经典银</p>
						<el-button size="mini" @click="setBgColor('#e4e4e5')" round>设置</el-button>
					</div>					
				</li>
			</ul>		
		</div>
	</div>
		</div>

	</section>
	
</template>

<script>
import components4 from './components/component4.vue';
import components3 from './components/component3.vue';
import components2 from './components/component2.vue';
import components1 from './components/component1.vue';
  export default {
    data() {
      return {
		choType:'1',
		bgColor:'#e4e4e5',
		storeTemplate:[
			{
				type:1,
				TemplateItem:[],
			},
			{
				type:2,
				TemplateItem:[],
			},
			{
				type:3,
				TemplateItem:[],
			},
			{
				type:4,
				TemplateItem:[],
			},
			
			
		]
      }
    },
    components: {
    	components4,
   		components3,
   		components2,
   		components1,
   		
    },
    methods: {
		setBgColor(color){
			this.bgColor=color;
		},
		addMponets(type){
			this.storeTemplate.push({
				type:type,
				TemplateItem:[],				
			})
		},
		
		upComponet(x){
			alert(123);
//		this.storeTemplate.splice(x - 1, 1, ...this.storeTemplate.splice(x, 1, arr[x - 1]))				
		}

    },
    mounted() {

    }
  }

</script>

<style lang="scss" scoped>
@import url("./store.css");
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
		padding-left: 30px;
	}
	.content{
		width: 98%;
		margin-left: 1%;
		border: 1px solid gainsboro;
		padding: 30px;
	}
	.storeContent{
		margin-left: 20px;
		.storeHead{
			width: 380px;
			height: 40px;
			box-sizing: border-box;
			background: url(../../../../assets/images/store/shoptitlebg.png) no-repeat 50% 50%;
			background-size:380px 40px ;
			line-height: 40px;
			padding-left: 10px;
			font-size: 16px;
			color: #F04134;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding-right: 213px;			
			
		}
	}
	.storeBody{
		background: gainsboro;
		width: 380px;
		box-sizing: border-box;
	}
	.operation{
		position: fixed;
		width: 400px;
		height: 360px;
		z-index: 50;
	    top: 197px;
	    right: 150px;
		border: 1px solid gainsboro;
		.chooseComList{
			width: 100%;
			margin-top: 20px;
			height: 300px;
			li{
				width: 45%;
				height: 120px;
				float: left;
				img{
					width: 40%;
					float: left;
				}
				.opt{
					float: left;
					padding-left: 15px;
					padding-top: 15px;
					p{
						padding-left: 6px;
					}
				}
			}
			li:nth-child(1){
				margin-left: 35px;
			}
			li:nth-child(3){
				margin-left: 35px;
			}			
			
		}
	}
	
	
	
.l{float:left;}
.r{float:left;}
.container {width:100%;overflow:hidden;margin-left:4px;}
.container div{margin-right:4px;margin-top:4px;}
.width333 {width:32.3%;}
.width333 img{width:auto;}
.width50 {width:49%;}
.width50 img{width:auto;}
.width100 {width:99%;}
.width25 {width:24%;}
.width40 {width:40%;}
.width20 {width:20%;}
.vbox img {border: none;overflow:hidden;}
.vbox img.no_border_bottom {border-bottom:0px;}
.vbox img.no_border_top {border-top:0px;}

.div_component{
	float:left;width:100%;
}
.layer_btn_div{
	display:none;float:left;position:absolute;z-index:100;
}
.layer_btn_div ul{
	margin:0px;padding:0px;float:right;
}
.layer_btn_div ul li{
	list-style-type:none;float:right;font-size:12px;color:#fff;
	line-heigth:22px;height:22px;width:30px;padding:0px;cursor:pointer;
	margin-top: 10px;
	margin-right: 3px;
}
.layer_btn_div ul li img{
	border:none;width:23px;height:23px;float:left;margin:2px 3px auto 4px;
}
.layer_btn_div ul li:nth-child(2) img{
	width: 21px;
	margin-top: 3px;
	height: 21px;
}
.view_box .view_logo{
	width:420px;
}
.view_logo img{
	width:50px;
	height:50px;
	margin-left:5px;
}
.view_logo span{
	width:360px;
	margin-left:5px;
	height:50px;
	line-height:50px;
	font-size:13px;
	color:#333;
	overflow:hidden;
}
.build_box .bbox .custbox li{
	width: 174px;
}
.tag_box{
	background: white;
}
.tag_box li{
	text-align: center;
	background: #F5F5F5;
	border-radius: 100px;
	font-size: 14px;
	color: #666666;
	width: 100px;
	height: 30px;
	line-height: 30px;
	margin-right: 10px;
	font-weight: normal;
}
.tag_box li.on{
	border: none;
	color: white;
	background: #F26749;
	border-radius: 100px;
}
.tag_box li.on:hover{
	opacity: 0.7;
}


.index-box{
	background: white;
	border-radius:5px ;
	padding-top: 20px;
	padding-bottom: 60px;
	position: relative;
	margin-top: 30px;
	overflow: visible;
}
.position{
	border: none;
	background: none;
	position: absolute;
	top: -30px;
}
.build_box .bbox{
	background: white;
	padding: 0;
	margin: 0;
	border: none;
	width: 420px;
	height: 410px;	
}
.custbox{
	width: 420px;
	height: 400px;	
}
.custboxList{
	width: 410px;
	height: 400px;
	background: white;
	padding: 30px;
	padding-right: 20px;
	border: 1px solid gainsboro;
}
.btn_publishStore{
	margin-right: 20px;
}
.btn_line1{
	padding-top: 30px;
	background: white;
	text-align: center;
}
.btn_line1 input{
	cursor: pointer;
	
}
.btn_line1 input:hover{
	opacity: 0.7;
}

.index body{
	background: white;
}

.link_type li input, 

.cust1{
	
}
.breadcrumbs{
	position: absolute;
	top: -35px;
	left: 0;
}
	
</style>