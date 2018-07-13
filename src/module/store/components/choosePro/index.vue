
<template>
	<section>
            <div class="content" >
			     <div class="breadcrumb">
			      <el-breadcrumb separator="/">
			        <el-breadcrumb-item :to="{ path: '/' }">店铺管理</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/store/storeTemplate' }">店铺装修</el-breadcrumb-item>
			        <el-breadcrumb-item>选品</el-breadcrumb-item>
			      </el-breadcrumb>
			    </div> 
			  <div style="width: 100%;padding-left:66px">
              <more-choice style="margin: auto;" :maxlength="300" :choices.sync="multiproductChoices" :search="multisearchProduct" :choiced.sync="productChoiced"
                :ids.sync="ids"></more-choice>			  	
			  </div>  
				<el-button type="primary" style="width: 100px;text-align: center;" @click="saveChiose"  round>保存</el-button>
            </div>
  </section>
</template>
<script>
import moreChoice from './moreChoice.vue';
import * as Code from '@/common/js/code.js';
import {queryGoodsList} from '@/common/service/goods/index.js';
import {getStoreCanChiose,getStoreChiosedPro,chioseProUpdate} from '../../service.js';

  export default {
    data() {
      return {
        proOpt: {
          productName: '',
          pageNo: 1,
          pageSize: 20,
        },  
        
        multiproOpt: {
          productName: '',
          pageNo: 1,
          pageSize: 20,
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
      }
    },
    components: {
      moreChoice
    },    
    methods: {
 		//保存
 	saveChiose(){
	
	let opt = {
		productArray:[],
	};
	
		this.productChoiced.forEach((item)=>{
			opt.productArray.push({
				productId:item.id,
				sort:item.sort
			})
	
		})
  		chioseProUpdate(opt).then((res) => {

					this.$message({
						type: 'success',
						message: '保存成功！'
					});	
			this.$router.push({path:'/store/storeTemplate'})
						}).catch((res) => {
							console.log('error ', res);
							this.$message({
								type: 'error',
								message: res.message
							});	 
				}) 

 		
 	},
      multisearchProduct(wd, page) {
        this.multiproOpt.productName = wd;
        if (page === 1) {
          this.multiproOpt.pageNo = 1;
          this.multiproductChoicesEnd = false;
          return this.getProductData(this.multiproOpt, 'multi');
        }
        if (!this.multiproductChoicesEnd) {
          this.multiproOpt.pageNo = this.multiproOpt.pageNo + 1;
          return this.getProductData(this.multiproOpt, 'multi');
        } else {
          return Promise.reject(Code.END_INFO_CODE);
        }
      },
  	_getStoreChiosedPro(){
  		getStoreChiosedPro().then((res) => {
			let _this = this;
			if(res){	
				_this.productChoiced = res;
				res.forEach((item) => {
				_this.ids.push(String(item.id));				
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
      getProductData(opt, add) {
        let vm = this;
        add = add ? add : '';
        let promise = new Promise((resolve, reject) => {
          getStoreCanChiose(opt).then(res => {
            vm[add + 'productChoices'].list = res.currentPage == 1 ? res.data : (vm[add + 'productChoices'].list).concat(res.data);
            vm[add + 'productChoicesEnd'] = res.currentPage >= res.totalPage ? true : false;
            vm[add + 'proOpt'].pageNo = res.currentPage;
            resolve();
          }).catch(res => {
            vm.$message.error(res.message);
            reject();
          });
        });
        return promise;
      },      


    },mounted(){
     this._getStoreChiosedPro();	
    }
  }
</script>
<style lang="scss" scoped>
	.BreadCrumbs{
		height: 30px;
		line-height: 30px;
		padding-left: 30px;
	}
	.content{
		width: 100%;
		border: 1px solid gainsboro;
		text-align: center;
		box-sizing: border-box;
		padding: 30px;
		background: white;
		padding-bottom: 20px;
	}	
</style>