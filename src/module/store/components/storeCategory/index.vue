<template>
	<div class="main">
		<!--面包屑-->
	    <div class="crumbs">
	      店铺资料
	    </div>
	    <!-- / 面包屑-->

	<div class="subject">
	<div class="tableList mat20">
		<div class="t_head">
		<ul>
			<li>分类</li>
			<li>排序</li>
			<li>选品</li>
			<li>操作</li>
		</ul>
		</div>
	    <el-table
	      :data="tableData"
	      style="width: 100%">
	      <el-table-column
	      	label="">
	       <template slot-scope="scope">
				<div class="treeContent">
					<el-tree :data="scope.row.data" node-key="id"
						@node-collapse="collapse" @node-expand="nodeExpand"  :default-expanded-keys="scope.row.expandAll" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
					<div class="sorting">
						<ul class="sortingList">
							<li><a v-if="scope.row.index!=0" @click="parentSort(scope.row.data[0].id,'up')" class="f_up"></a><a v-if="scope.row.index!=tableData.length-1" @click="parentSort(scope.row.data[0].id,'down')" class="f_down" ></a></li>
							<li  v-for="(item1,index) in scope.row.data[0].childList" v-if="index!=scope.row.data[0].childList.length-1"><a v-if="index!=0" @click="childSort(item1.id,'up')" class="s_up"></a><a v-if="index!=scope.row.data[0].childList.length-2" @click="childSort(item1.id,'down')" class="s_down"></a></li>					
						</ul>
					</div>
					<div class="choosePro">
						<ul class="chooseProList">
							<li><a v-if="scope.row.data[0].childList.length<=1"  style="cursor: pointer;" @click="addProduct(scope.row.data[0].id)" >选品（{{scope.row.data[0].productCount}}）</a><a v-if="scope.row.data[0].childList.length>1" >——</a></li>
							<li v-for="(item2,index) in scope.row.data[0].childList" v-if="index!=scope.row.data[0].childList.length-1" ><a style="cursor: pointer;" @click="addProduct(item2.id)" >选品（{{item2.productCount}}）</a></li>					
						</ul>					
					</div>			
					<div class="operations">
						<ul class="operationList">
							<li>
								<a @click="_storeUpdateCategoryDialog(scope.row.data[0].id, scope.row.data[0].name)">修改</a>
								<a style="padding-left:10px;" @click="_storeDelCategory(scope.row.data[0].id, scope.row.data[0].childList.length)">删除</a>
							</li>
							<li v-for="(item3,index) in scope.row.data[0].childList" v-if="index!=scope.row.data[0].childList.length-1">
								<a @click="_storeUpdateCategoryDialog(item3.id, item3.name)">修改</a>
								<a style="padding-left:10px;" @click="_storeDelCategory(item3.id, 0)">删除</a>
							</li>					
						</ul>					
					</div>
				<div class="addInput" v-show="scope.row.canAdd" >
					<input type="text" v-model="scope.row.addChildName" @blur = "addChildSubmit(scope.row.data[0].id,scope.row.addChildName,scope.row.index)" />				
				</div>
				</div>
	      </template>
	      </el-table-column>
	    </el-table>	
		 <div class="addBox" v-if="isAdd">
			  <el-input size="mini" style="width: 200px;margin-right: 10px;" placeholder="请输入内容" suffix-icon="el-icon-date" v-model="addParentForm.categoryName">
			  </el-input> 
			  <el-button type="text" @click="AddParentSubmit">保存</el-button>
			  <el-button type="text" @click="colseAdd" >取消</el-button>
			  <p style="color: red;" v-if="nameIsEmpy">分类名称不能为空</p>
		</div>  
	    <el-button v-if="!isAdd" @click="openAddParent" type="text">+添加分类</el-button>
	</div>		    	
	
	</div>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
 <div style="width: 100%;text-align: center;">
 	 <more-choice  :maxlength="300" :choices.sync="multiproductChoices" :search="multisearchProduct" :choiced.sync="productChoiced"
                :ids.sync="ids"></more-choice>
 </div>
       
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addProSubmit">确 定</el-button>
  </span>
</el-dialog>



<el-dialog 
  width="30%"
  title="修改分类名称" 
  :visible.sync="updateDialogVisible">
  <el-form :model="updateNameForm">
    <el-form-item label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="updateNameForm.categoryName" auto-complete="off"></el-input>
	  <el-input v-model="updateNameForm.categoryId" v-show="false"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="_storeUpdateCategory()">确 定</el-button>
  </div>
</el-dialog>




	</div>
</template>

<script>
import {
	getStoreCategory,
	storeAddCategory,
	storeUpdateCategory,
	storeDelCategory,
	categorySort,
	getCategoryProduct,
	addUpdateProduct
} from '../../service.js';
import moreChoice from '@/components/moreChoice/index.vue';
import * as Code from '@/common/js/code.js';
import {queryGoodsList} from '@/common/service/goods/index.js';

  export default {
    data() {
      return {
      	dialogVisible:false,
		updateDialogVisible:false,
      	isAdd:false,
      	nameIsEmpy:false,
      	addIndex:1,
      	value:'',
        tableData: []  ,
        defaultProps: {
          children: 'childList',
          label: 'name'
        },
        addParentForm:{
        	categoryName:'',
        },
		updateNameForm:{
			categoryId:'',
			categoryName:'',
		},
        proOpt: {
          goodsName: '',
          currentPage: 1,
          pageSize: 20,
          goodsStatus:1,
          platform:'sg'
        },  
        
        multiproOpt: {
          goodsName: '',
          currentPage: 1,
          pageSize: 20,
          goodsStatus:1,
          platform:'sg'
        },        
        ids: [],
		productChoiced: [],
        multiproductChoices: {
          list: [],
          selected: '',
          selectedName: ''
        },
        addProCategoryId:'',
        productChoicesEnd: false,
        multiproductChoicesEnd: false, 
		formLabelWidth: '80px',
      }
    },
    components: {
      moreChoice
    },    
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});

      },
      //选品
      addProduct(id){ 
      	this.addProCategoryId = id;
      	this._getCategoryProduct(id);
		this.dialogVisible = true;
      },   
      //选品保存
      addProSubmit(){
      	
      	
		let opt = {
			categoryId:this.addProCategoryId,
			productIds:this.ids.join(',')
		}
   		addUpdateProduct(opt).then((res) => {
				this.$message({
					type: 'success',
					message: '保存成功'
				});	
				this.dialogVisible = false;
				this. _getStoreCategory(true);
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
						type: 'error',
						message: res.message
					});	 
				}) 		
      },
    	
      multisearchProduct(wd, page) {
        this.multiproOpt.goodsName = wd;
        if (page === 1) {
          this.multiproOpt.currentPage = 1;
          this.multiproductChoicesEnd = false;
          return this.getProductData(this.multiproOpt, 'multi');
        }
        if (!this.multiproductChoicesEnd) {
          this.multiproOpt.currentPage = this.multiproOpt.currentPage + 1;
          return this.getProductData(this.multiproOpt, 'multi');
        } else {
          return Promise.reject(Code.END_INFO_CODE);
        }
      },
      getProductData(opt, add) {
        let vm = this;
        add = add ? add : '';
        let promise = new Promise((resolve, reject) => {
          queryGoodsList(opt).then(res => {
            vm[add + 'productChoices'].list = res.currentPage == 1 ? res.data : (vm[add + 'productChoices'].list).concat(res.data);
            vm[add + 'productChoicesEnd'] = res.currentPage >= res.totalPage ? true : false;
            vm[add + 'proOpt'].currentPage = res.currentPage;
            resolve();
          }).catch(res => {
            vm.$message.error(res.message);
            reject();
          });
        });
        return promise;
      },      
      openAddParent(){
      	this.isAdd = true;     	
      },
      colseAdd(){
      	this.isAdd = false;
      	this.addParentForm.categoryName='';
      },
      AddParentSubmit(){
      	if(!this.addParentForm.categoryName){
      	   this.nameIsEmpy=true;
      	}else{
      	   this._storeAddCategory(this.addParentForm,true);
      	   this.isAdd = false;
      	   this.nameIsEmpy=false;
      	}
      },
      addChildSubmit(id,name,index){
      	if(!name){
      		
			this.$message({
				type: 'error',
				message: '类别名称不能为空'
			});	       		
      	}else{
      	 let form  = {
      	 	categoryName:name,
      	 	pid:id
      	 }
      	 this._storeAddCategory(form,false);  
      	}

      },
      handleNodeClick(data) {
       console.log(data)	;
       if(data.name=='+添加子类'){
       	  if(this.tableData[data.index].data[0].productCount!=0){
        this.$confirm('关联有商品的分类无法添加子类！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
		console.log(1);	        	
        }).catch(() => {
//        this.$message({
//          type: 'info',
//          message: '已取消删除'
//        });
        });        	  	

       	  }else{
       	  	 this.tableData[data.index].canAdd = true; 
       	  }
       	  
	          	
       }
      },
      _storeDelCategory(id, childCount){
		var confirmMsg = '';
		if (childCount <=1) {
			confirmMsg = '此操作将永久删除该分类, 是否继续?';
		} else {
			confirmMsg = '该分类存在子类，此操作将永久删除该分类和它的子类, 是否继续?';
		}
        this.$confirm(confirmMsg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
   		storeDelCategory(id).then((res) => {
				this.$message({
					type: 'success',
					message: '删除成功'
					});	 							
				this. _getStoreCategory(true);
					}).catch((res) => {
						console.log('error ', res);
						this.$message({
						type: 'error',
						message: res.message
					});	 
				}) 
        	
        }).catch(() => {
//        this.$message({
//          type: 'info',
//          message: '已取消删除'
//        });
        });      	
      	
      },//获取分类关联商品
      _getCategoryProduct(id){
      	this.productChoiced = []; 
      	this.ids = [];
      	let opt={
      		categoryId:id,
      		productName:'',
      		pageNo:1,
      		goodsStatus:1,
      		pageSize:1000,
      	}
  		getCategoryProduct(opt).then((res) => {
			let _this = this;
			if(res.data){	
				
				res.data.forEach((item) => {
				_this.productChoiced.push({
		            name: item.goodsName,
		            id: item.goodsId						
				})
				_this.ids.push(String(item.goodsId));
				
				})
			}		
						}).catch((res) => {
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});	 
				})       	
     },
      _categorySort(opt,childS){
 			categorySort(opt).then((res) => {
						
						if(childS){
							this. _getStoreCategory(true);
						}else{
							this. _getStoreCategory();
						}
						
						}).catch((res) => {
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});	 
				})        	
      	
     },
      
      //父级排序
      parentSort(id,type){
      	let opt = {
      		sortType:type,
      		categoryId:id
      	}
      	this._categorySort(opt);
      },
      //子集排序
      childSort(id,type){
      	let opt = {
      		sortType:type,
      		categoryId:id
      	}
      	this._categorySort(opt,true);
      },
	   _getStoreCategory(isNotFast){
			 		getStoreCategory().then((res) => {
			 		 let  t_data = this.tableData;	
			 		 this.tableData = [];
					 let _this = this;
					
						res.forEach((item,index)=>{
						 item.childList.push({
						 	name:'+添加子类',
						 	index:index,
						 })
						 var obj = {};
						 	if(!isNotFast){
							 	 obj = {
							 			canAdd:false,
							 			addChildName:'',
							 			index:index,
							 			expandAll:['41'],
							 			data:[item]
							 		}						 		
						 	}else{
							 	 obj = {
							 			canAdd:false,
							 			addChildName:'',
							 			index:index,
							 			expandAll:t_data[index].expandAll,
							 			data:[item]
							 		}						 		
						 		
						 	}	
						 		_this.tableData.push(obj);
						 })						

						console.log(_this.tableData)
					  
						}).catch((res) => {
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});
							if (res.code == -1 && res.message == '未创建店铺') {
								this.$router.push({
									path:'/store/edit'
								});
							}
				})       	
	
	      },
     	 _storeAddCategory(opt,addParent){     	 	
 			 		storeAddCategory(opt).then((res) => {
							this.$message({
								type: 'success',
								message: '添加成功'
							});
						if(addParent){
							this. _getStoreCategory();
						}else{
							this. _getStoreCategory(true);
						}
						
						
						}).catch((res) => {
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});	 
				})        	
      	
      },
      //关闭子类
      collapse(data){
      	let index =data.childList[data.childList.length-1].index;
		this.tableData[index].canAdd=false;
		this.tableData[index].expandAll=[]; 
      }, 
      //节点被展开
      nodeExpand(data){
      	let index =data.childList[data.childList.length-1].index;
		this.tableData[index].expandAll=[data.id];     	
      },
	  //弹出修改分类名称对话框
      _storeUpdateCategoryDialog(id, name){
		this.updateDialogVisible = true;  
		this.updateNameForm.categoryId = id;
		this.updateNameForm.categoryName = name;
      },
      //修改分类名称提交
	  _storeUpdateCategory(){
		storeUpdateCategory(this.updateNameForm).then((res) => {
					this.$message({
						type: 'success',
						message: '修改成功'
					});	
				this.updateDialogVisible = false;					
				this. _getStoreCategory(true);
				}).catch((res) => {
					console.log('error ', res);
					this.$message({
						type: 'error',
						message: res.message
					});	 
		})
	  }
      

    },mounted(){
    this. _getStoreCategory();
    }
  }
</script>
<style lang="scss" scoped>
.el-tree-node__children .el-tree-node:last-child{
	color: deepskyblue;
}
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
	}
	.Content{
		width: 100%;
		position: relative;
		box-sizing: border-box;
		padding: 30px 50px;
		background: white;
		overflow-x: hidden;
		border: 1px solid gainsboro;
	}
	.t_head{
		position: absolute;
		height: 30px;
		line-height: 30px;
		width: 800px;
		top: 8px;
		left: 77px;
		z-index: 50;
		background: white;
		li{
			width: 200px;
			text-align: center;
			float: left;
			height: 30px;
			line-height: 30px;
			color: #909399;
			font-weight: bold;
		}
		
		
	}
	.treeContent{
		height: auto;
		position: relative;
		overflow: hidden;
		 li{
		 	cursor: pointer;
		 }
		.addChildren{
			position: absolute;
			z-index:500;
			top:0;
			left:260px;
			.addChildrenList{
				background:none;
				li{
					background: none;
					height: 26px;
					line-height: 26px;
					text-align: center;
					width: 120px;
				}	
			}
		}
		.sorting{
			position: absolute;
			top: 0;
			left: 329px;
			z-index: 400;
			.sortingList{
				li{
					height: 26px;
					line-height: 26px;
					text-align: center;
					width: 80px;
					a{
						display: inline-block;
						width: 20px;
						margin-top: 3px;
						margin-right: 5px;
						height: 20px;
						
						&.f_up{
							background: url(../../../../assets/images/store/up1.png) no-repeat 50% 50%;
							background-size:20px 20px ;
						}
						&.f_down{
							background: url(../../../../assets/images/store/down1.png) no-repeat 50% 50%;
							background-size:20px 20px ;						
						}
						&.s_up{
							background: url(../../../../assets/images/store/up.png) no-repeat 50% 50%;
							background-size:20px 20px ;
						}
						&.s_down{
							background: url(../../../../assets/images/store/down.png) no-repeat 50% 50%;
							background-size:20px 20px ;					
						}
						
					}
					a:hover{
						background-size:18px 18px ;	
					}
				}
			}
		}
		.choosePro{
			position: absolute;
			top:0;
			left:530px;
			z-index: 400;
			.chooseProList{
				li{
					height: 26px;
					line-height: 26px;
					text-align: center;
					width: 80px;					
				}
				
			}
		}
		.operations{
			position: absolute;
			top:0;
			left: 731px;
			z-index: 400;
			.operationList{
				li{
					height: 26px;
					line-height: 26px;
					text-align: center;
					width: 80px;					
				}
				
			}			
		}
		.addInput{
			position: absolute;
			bottom: 0;
			left: 41px;
			z-index: 50;
			background: white;
			width: 150px;
			height: 25px;
			line-height: 25px;
			input{
				width: 100%;
				height: 22px;
				line-height: 22px;
				border: none;
				background: none;
				border: 1px solid gainsboro;
			}
		}
		
		
		
	}

</style>