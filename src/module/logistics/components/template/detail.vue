<template>
	<div class="main logistics">
		 <!--面包屑-->
      <div class="crumbs">
        <p>{{ editStatus?'编辑':'新增' }}运费模板</p>
      </div>
      <!-- / 面包屑-->
      <div class="subject">
      	<div class="filter_query mat20">
      		<div class="freightRules">
			<p>运费规则说明：</p>
			除制定区域外，其他地区采用默认运费。
		</div>
	    <div class="form" >
	    	<el-form ref="form" :model="form" :rules="rules2" label-width="100px">
	    		<el-form-item prop="ruleName" label="模板名称" required>
	            	 <el-input v-model="form.ruleName" placeholder="30个字符以内"></el-input>
          		</el-form-item>
          		<el-form-item prop="type" label="计费方式" required>
		            <el-radio-group v-model="form.type">
		              <div class="timelimit">
		                <el-radio label="P" class="mgr10">
		                  按件数
		                </el-radio>
		                
		                <el-radio label="W" class="mgr10">
		                  按重量
		                </el-radio>
		                
		              </div>
		            </el-radio-group>
		        </el-form-item>
		        <el-form-item label="默认运费" required>
		           <div>
		           	 <el-input class="input_default" type="number" v-model="form.ruleItem[0].baseunit" placeholder=""></el-input>
		           	 {{form.type==='P'?'件':'kg'}}
		             内，
		             <el-input class="input_default" type="number" v-model="form.ruleItem[0].baseprice" placeholder=""></el-input>
		        	    元， 每增加
		            <span>{{form.ruleItem[0].increaseunit}}</span> 
		           <!--
                   	作者：1063676593@qq.com
                   	时间：2018-05-11
                   	描述：后台说运费计算有问题，先限死1个
                   --> 
		            <!-- <el-input class="input_default" type="number" v-model="form.ruleItem[0].increaseunit" placeholder=""></el-input>-->
		             {{form.type==='P'?'件':'kg'}}
		             ， 增加运费
		             <el-input class="input_default" type="number" v-model="form.ruleItem[0].increaseprice" placeholder=""></el-input>
		             元
		           </div>

		            <div v-show="errorDefaultFee" class="el-form-item__error">
		                  {{errorDefaultFee}}
		            </div>
		        </el-form-item>
		        <el-form-item  label="" label-width="0" required style="padding-left:20px;">
			        <div class="setUp" >
			        	设置指定地区运费：
			        </div>
					<table class="table-strip-ls" >
						 <thead>
				            <tr>
				              <td>运送到</td>
				              <td class="w106">{{form.type==='P'?'首件（个）':'首重（kg）'}}</td>
				              <td class="w106">运费（元）</td>
				              <td class="w106">{{form.type==='P'?'续件（个）':'续重（kg）'}}</td>
				              <td class="w106">运费（元）</td>
				              <td class="w106">操作</td>
				            </tr>
				          </thead>
				          <tbody>
				      
				          <tr v-for="(item,index) in form.ruleItem " v-if="index>0" >
				          		<td>
				          			{{item.showName}}
				          			<el-button type="text" class="btn-handle" @click="editArea(index,item.id)"> 编辑</el-button>
				          		</td>
				          		<td><el-input size="mini" type="number" class="input_mini" v-model="item.baseunit" placeholder=""></el-input></td>
				          		<td><el-input size="mini" type="number" class="input_mini" v-model="item.baseprice" placeholder=""></el-input></td>
				          		<td>
				          			<p>{{item.increaseunit}}</p>
				          			<!--<el-input size="mini" type="number" class="input_mini" v-model="item.increaseunit" placeholder=""></el-input>-->
				          		</td>
				          		<td><el-input size="mini" type="number" class="input_mini" v-model="item.increaseprice" placeholder=""></el-input></td>
				          		<td>
				          			<el-button type="text" class="btn-handle" @click="deleteArea(index)"> 删除</el-button>
	            				</td>
	            				
				          	</tr>
				          </tbody>
					</table>
					<div v-show="errorFee" class="el-form-item__error">
	                  {{errorFee}}
	            	</div>
		        </el-form-item>
				<div class="add-area" style="padding-left:20px;">
					<i class="el-icon-plus"></i>
					<el-button type="text" class="btn-handle" @click="addArea"> 添加地区</el-button>
				</div>
				<el-form-item style="padding-bottom:20px;">
		            <el-button type="primary" @click="save" >保存</el-button>
		            <el-button @click="$router.go(-1)">取消</el-button>
		        </el-form-item>	
	    	</el-form>
	    </div>
      	</div>
      	
      </div>
		
	<el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
		<div class="checkBox">
			<ul class="checkList" v-for="(vitem,areaIndex) in data">
				<li style="padding: 4px;width: 148px;"><el-checkbox :indeterminate="vitem.isIndeterminate" @change="onAreaChange(areaIndex,vitem.checkAll)" v-model="vitem.checkAll">{{vitem.name}}</el-checkbox></li>
				<li v-for="(pritem,index) in vitem.provinces">
				<div class="checkBoxItem" :class="{'active':pritem.active}" >
				  <el-checkbox :indeterminate="pritem.isIndeterminate" :title="pritem.provincename"  v-model="pritem.checkAll" @change="handleCheckAllChange(areaIndex,index,pritem.checkAll,false)">{{pritem.provincename}}</el-checkbox>
				  <div style="margin: 5px 0;"></div>
				  <span class="optBtn" :class="{'active':pritem.active}" @click="clickoptBtn(areaIndex,index)">▼</span>
				  <el-checkbox-group v-model="pritem.checkedCities"  @change="handleCheckedCitiesChange(areaIndex,index)">
				    <el-checkbox v-for="city in pritem.cities" :title="city.cityname" :label="city.cityid" :key="city.cityid">{{city.cityname}}</el-checkbox>
				  </el-checkbox-group>			
				</div>
				</li>
			</ul>
		</div>		
  		<span slot="footer" class="dialog-footer">
    		<el-button @click="dialogVisible = false">取 消</el-button>
   	 		<el-button type="primary" @click="comfirmCities">确 定</el-button>
  		</span>
	</el-dialog>
	
	</div>
</template>
<script>
import {getTocity} from '../../service.js';
import * as Service from '@/common/service/logistics/index.js';	

	
	export default {
		data () {
			return{
				dialogVisible:false,
				areaEditingItemIndex:0,		// 记录是哪个item(下标)在编辑区域
		        checkAll: false,
		        isIndeterminate:false,
		        data:[],
				form:{
					ruleName:'',
					type:'',
					ruleItem:[{
		                "baseunit":"1.00",
		                "baseprice":"10.00",
		                "increaseunit":"1.00",
		                "increaseprice":"6.00",
		                "isDefault":"Y",
		                "showName":"默认模板",
		                "cityIds":""
					}],
					
				},
				editStatus: false,
				dateType:'P',
				errorDefaultFee:'',
				errorFee:'',
				rules2: {
		          	ruleName: [
			            { required: true, message: '请输入模板名称', trigger: 'blur,change' }
			          ],
			        type: [
			            { required: true, message: '请选择计费方式', trigger: 'blur,change' }
			          ]
		        }
			}
		},
	    methods: {
	    	checkFee() {
	    		let item = this.form.ruleItem[0];
	    		if(item.baseunit === ''
	    		|| item.baseprice === ''
	    		|| item.increaseunit === ''
	    		|| item.increaseprice === ''){
	    			this.errorDefaultFee = '请填写完整默认运费';
	    			return false;
	    		}else if(Number(item.baseunit) < 0
			    		|| Number(item.baseprice) < 0
			    		|| Number(item.increaseunit) < 0
			    		|| Number(item.increaseprice) < 0){
			    			this.errorDefaultFee = '请填写正确的数字';
			    			return false;
			    }else{
	    			this.errorDefaultFee = '';
	    		}
	    		
	    		for(var i=0; i<this.form.ruleItem.length; i++){
	    			if(i>0){ // 从第二次开始
	    				let item = this.form.ruleItem[i];
	    				if(item.baseunit === ''
			    		|| item.baseprice === ''
			    		|| item.increaseunit === ''
			    		|| item.increaseprice === ''){
			    			this.errorFee = '请填写完整运费项';
			    			return false;
			    		}else if(item.cityIds === ''){
			    			this.errorFee = '请编辑【运送到】的区域';
			    			return false;
			    		}else if(Number(item.baseunit) < 0
			    		|| Number(item.baseprice) < 0
			    		|| Number(item.increaseunit) < 0
			    		|| Number(item.increaseprice) < 0){
			    			this.errorFee = '请填写正确的数字';
			    			return false;
			    		}else{
			    			this.errorFee = '';
			    		}
	    			}
	    		}
	    		
				return true;
			},
	    	addArea(){
	    		this.form.ruleItem.push({
                "id":'',
                "ruleId":'',
                "baseunit":"",
                "baseprice":"",
                "increaseunit":"1.00",
                "increaseprice":"",
                "isDefault":"N",
                "showName":"新建的模板",
                "cityIds":""
            	},)	
	    	},
	    	
	    	editArea(index,id){
	    		this.dialogVisible=true;
	    		this.areaEditingItemIndex = index;
	    		if(!id){	// id 为空是新建，不用 load 数据
	    			return;
	    		}
	    		let params = {
		              id:id
		          };
		      	Service.templateItemById(params).then(res=>{
		      		let areaIndex = 0;
					this.data.forEach((item)=>{
						item.provinces.forEach(function(item2){
							res.provinces.forEach(function(item3){
								if(item2.provinceid==item3.provinceid){
									item2.checkAll = item3.cityTotal==item3.cities.length;
									item2.isIndeterminate=!item2.checkAll;
									item3.cities.forEach(function(city){
										item2.checkedCities.push(city.cityid);	
									})
								}
							})
						})
						this.updateAreaCheckState(areaIndex++);
		      		})
		      	})
	    	},
	    	deleteArea(index){
	    		this.form.ruleItem.splice(index,1)
	    	},
	    	clickoptBtn(areaIndex,index){
	    		this.data[areaIndex].provinces[index].active=!this.data[areaIndex].provinces[index].active;
	    	},
	    	onAreaChange(areaIndex,areaCheckAll){
	    		let provinceIndex = 0;
	    		console.time('计时器1');
	    		this.data[areaIndex].provinces.forEach((item)=>{
		    		this.handleCheckAllChange(areaIndex,provinceIndex++,areaCheckAll,true);
	    		})
	    		
	    		// 异步线程钩选市复选框
	    		if(areaCheckAll){
	    			setTimeout(()=>{ // 异步调用减少耗时
	    				this.checkAllAreaCities(areaIndex);
	    			},1)
	    		}
	    		
	    		// 修改大区选中状态
				this.updateAreaCheckState(areaIndex);
				console.timeEnd('计时器1');
	    	},
	    	// 钩选某大区下的所有市复选框
	    	// areaIndex：大区下标
	    	checkAllAreaCities(areaIndex){
	    		let index = 0;
	    		this.data[areaIndex].provinces.forEach((item)=>{
		        	this.data[areaIndex].provinces[index].cities.forEach((item)=>{
		        		this.data[areaIndex].provinces[index].checkedCities.push(item.cityid);
		        	})
		        	index++;
	    		})
	    	},
	    	// 返回大区下所有省的选中状态: 0全选中 1全不选中 -1部分选中
	    	// areaIndex: 大区下标
	    	provinceCheckState(areaIndex){
	    		let isPart = false;
	    		let checkNum = 0;
	    		this.data[areaIndex].provinces.forEach((item)=>{
		    		if(item.checkAll){
		    			checkNum++;
		    		}else{
		    			if(item.isIndeterminate){ // 肯定是部分了
//		    				console.log(areaIndex+' part');
//		    				return -1; // 这个居然跳不出去
							isPart = true;
		    			}else{
		    				
		    			}
		    		}
	    		})
	    		
	    		if(isPart){
	    			return -1;
	    		}
	    		
	    		if(0==checkNum){
//	    			console.log(areaIndex+' none');
	    			return 0;
	    		}
	    		else if(checkNum==this.data[areaIndex].provinces.length){
//	    			console.log(areaIndex+' all');
	    			return 1;
	    		}
	    		// else (checkNum>0)
//  			console.log(areaIndex+' part');
    			return -1;
	    	},
	    	// areaIndex：大区选中的下标
	    	// index：选中省的下标
	    	// isInForEach：是否是在 for 循环中被调用
	    	// checkAll：当前状态是否被选中
	      handleCheckAllChange(areaIndex,index,checkAll,isInForEach) {
			this.data[areaIndex].provinces[index].checkAll = checkAll;	
	        if(checkAll){
	        	if(!isInForEach){	// for 循环中在外面改，里面不改，增加运行效率
	        	    setTimeout(()=>{ // 异步调用减少耗时
			        	this.data[areaIndex].provinces[index].cities.forEach((item)=>{
			        		this.data[areaIndex].provinces[index].checkedCities.push(item.cityid);
			        	})
		        	},1);
	        	}
	        }else{
	        	this.data[areaIndex].provinces[index].checkedCities=[];
	        	if(!isInForEach){
	        		this.data[areaIndex].provinces[index].isIndeterminate = false;
	        	}
	        }
	        if(!isInForEach){ // 在循环中时肯定在外面判断了，里面就不用判断
	        	this.updateAreaCheckState(areaIndex);	
	        }
	      },
	      // 根据当前省的选中状态修改大区的选中状态
	      // checkAll：当前按钮是选中还是不选中
	      updateAreaCheckState(areaIndex){
	      		let result = this.provinceCheckState(areaIndex); 
	      		if(-1==result){
		    		this.data[areaIndex].isIndeterminate = true;
		    		this.data[areaIndex].checkAll = false;
	    		}else{
	    			this.data[areaIndex].isIndeterminate = false;
	    			if(1==result){
	    				this.data[areaIndex].checkAll = true;
	    			}else{
	    				this.data[areaIndex].checkAll = false;
	    			}
	    		}
	      },
      handleCheckedCitiesChange(areaIndex,index) {
        this.data[areaIndex].provinces[index].checkAll =  this.data[areaIndex].provinces[index].checkedCities.length === this.data[areaIndex].provinces[index].cities.length;
        if(this.data[areaIndex].provinces[index].checkAll){
        	this.data[areaIndex].provinces[index].isIndeterminate = false;
        }else{
        	this.data[areaIndex].provinces[index].isIndeterminate = this.data[areaIndex].provinces[index].checkedCities.length > 0 &&  this.data[areaIndex].provinces[index].checkedCities.length < this.data[areaIndex].provinces[index].cities.length;	
        }
        
        // 改大区选中状态
		this.updateAreaCheckState(areaIndex);
      },
      save(){
      	if(!this.checkForm()){
      		return;
      	}
      	if(!this.checkFee()){
      		return;
      	}
		let params = this.form;
		if( !this.$route.query.id ){
      		Service.templateAdd(params).then(res=>{
	        	// alert('保存成功');
	        	this.$router.push('/logistics/');
        	})
      	}else{
      		Service.templateUpdate(params).then(res=>{
	        	// alert('修改成功');
	        	this.$router.push('/logistics/');
        	})
      	}
      },
      
      // 确定选择区域
      comfirmCities(){
      	let arrCity = [];
      	let arrName = '';
      	this.data.forEach((item)=>{
      		item.provinces.forEach((item1)=>{
      			arrCity=arrCity.concat(item1.checkedCities);
      			if(item1.checkedCities.length > 0){
      				arrName = arrName+item1.provincename+' ';	
      			}
      		})
      	})
		this.form.ruleItem[this.areaEditingItemIndex].cityIds = arrCity.join(',');
		this.form.ruleItem[this.areaEditingItemIndex].showName = arrName;
		this.dialogVisible=false;
      },
      
      
      // 编辑时导入旧模板数据
      loadEditData(){
      	if( !this.$route.query.id ){
      		return; // 新增不用处理
      	}
      	let params = {
              id:this.$route.query.id
          };
      	Service.templategetById(params).then(res=>{
      		this.form = res;
      	})
      },
      checkForm() {
            let result = false;
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    result = true;
                } else {
                    // console.log('error submit!!');
                    return false;
                }

            });
            return result;
        },
      _getTocity(){
         getTocity().then(res => {
			res.forEach(function(item,i){
				item.isIndeterminate = false;
				item.checkAll = false;
				item.provinces.forEach(function(item1){
					item1.active=false;
					item1.checkAll=false;
					item1.isIndeterminate=false;
					item1.checkedCities=[];
				})
				
			})
			this.data = res;
          }).catch(res => {
            this.$message.error(res.message);
          })      		
      },      
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }      
			 	
			 }	,
    mounted(){
		this._getTocity();
		this.loadEditData();
    }			 
		
		
	}
</script>
<style lang="scss" scoped>
// @import url("./el-tree.scss");

		

	.freightRules{
		background:#FFF5F3;
		padding:14px 15px;
		line-height:24px;
		margin-bottom:15px;
		p{
			font-weight:600;
		}
	}
	.input_default{
		width:85px;
	}
	.input_mini{
		width:85px;
		
	}
	.table-strip-ls tbody .btn-handle{
		color:#F26749;
	}
	.setUp{
		font-size:14px;
		padding-bottom:15px;
	}
	.table-strip-ls{
		margin-bottom:15px;
		font-size:14px;
		border-top:1px solid #ddd;
	}
	.add-area{
		margin-bottom:15px;
	}
	
	.el-tree{
		.is-focusable{
			color: red !important;
		}
	}
	
	.checkList{
		margin-bottom: 20px;
		height: 30px;
		width: 100%;
		// width: 500px;
		li{
			height: 30px;
			line-height: 30px;
			float: left;
			width: 120px;			
			position: relative;
			.el-checkbox + .el-checkbox{
				margin-left: 0;
			}
			.checkBoxItem{
				width: 100%;
				height: 30px;
				position: absolute;
				top: 0;
				left: 0;
				background: white;
				overflow: hidden;
				box-sizing: border-box;
				padding: 5px;
				&.active{
					width: 520px;
					
				z-index: 10000;	
				border: 1px solid gainsboro;
				box-shadow:0 1px 8px -2px #999999;
				height: auto;						
				}				
			}
			
			.optBtn{
				display: inline-block;
				position: absolute;
				width: 30px;
				height: 30px;
				top: 2px;
				right: 14px;
				transition: all 0.3s;
				text-align: center;
				line-height: 33px;
				cursor: pointer;
				background: #FBFBFB;
				z-index: 50;
				&.active{
					transform: rotateZ(180deg);
				}
				
			}

			.el-checkbox-group{
				overflow: hidden;
			}
			.el-checkbox{
				margin-right: 5px;
				// width: 100%;
				width: 120px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;				
			}
		}
	}
	
	
	
	
	
</style>
