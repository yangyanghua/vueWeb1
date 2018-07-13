<template>
  <div class="sub-block">
    <el-form label-width="120px" ref="ruleForm"  class="demo-ruleForm">
      <el-form-item label="商品规格" v-if="specification.attributeBaseVOs.length>0">
        <div class="sizeBlock" v-for="(item,itemIndex) in specification.attributeBaseVOs" :key="item.id">
          <p class="specName">{{item.name}}</p>
          <span v-for="(size,sizeIndex) in item.attributeValues" :key="size.id">
            <el-checkbox class="checkbox" v-model="size.isSelected">
              <span v-if="!size.isSelected">{{size.name}}</span>
              <el-input v-if="size.isSelected" @blur="checkName(size.name,itemIndex,sizeIndex)" v-model="size.name"></el-input>
            </el-checkbox>
            <el-upload v-if="(item.id==30001)&&size.isSelected&&(!size.src)&&false" class="upload-small" action="" :before-upload="beforeAvatarUpload(itemIndex,sizeIndex)">
              <el-button class="uploadImgButton" plain size="mini" type="primary">上传图片</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <div class="upload-small" v-if="(item.id==30001)&&size.isSelected&&(size.src)">
              <img class="uploadImg" :src="size.src" alt="">
              <el-card class="uploadCardLarge">
                <img class="uploadImgLarge" :src="size.src" alt="">
              </el-card>
              <i class="el-icon-circle-close uploadImgDel" v-if="size.src" @click="handleRemove(itemIndex,sizeIndex)"></i>
            </div>

          </span>
        </div>

      </el-form-item>
      <el-form-item label="销售价格" >
        <p class="com-tip">
          价格填写范围0.01~9999999.99元
        </p>
        <el-form>
          <el-form-item label="划线价" required label-width="80px">
            <el-input type="number" min="1" max="9999999.99"  size="mini" placeholder="价格" v-model="marketprice" class="multiInput"></el-input>
          </el-form-item>
          <el-form-item label="批量填充" label-width="80px">
            <el-input type="number" min="1" max="9999999.99" size="mini" placeholder="价格" v-model="multiData.price" class="multiInput"></el-input>
            <el-input type="number" size="mini" min="0" placeholder="库存" v-model="multiData.inventory" class="multiInput"></el-input>
            <el-input type="text" size="mini" placeholder="商品编码" v-model="multiData.skuCode" class="multiInput"></el-input>
            <el-input type="text" size="mini" placeholder="条形码" v-model="multiData.barCode" class="multiInput"></el-input>
            <el-button type="primary" size="mini" @click.prevent="setMultiVal">确定</el-button>
          </el-form-item>
        </el-form>
        <table class="table-strip-ls u-table">
          <thead style="border-top:1px solid #e9e9e9;">
            <tr v-if="specification.productSku.length>0&&specification.selectedList.length>0">
              <th v-for="(item) in titleList" :key="item[0].id">
                {{item[0].pname}}
              </th>
              <th><span class="starIcon">*</span>平台价（元）</th>
              <th><span class="starIcon">*</span>库存（件）</th>
              <th><span class="starIcon">*</span>商家编码</th>
              <th>条形码</th>
            </tr>
            <tr v-if="specification.productSku.length==0">
              <th><span class="starIcon">*</span>平台价（元）</th>
              <th><span class="starIcon">*</span>库存（件）</th>
              <th><span class="starIcon">*</span>商家编码</th>
              <th>条形码</th>
            </tr>
          </thead>
          <tbody v-if="specification.productSku.length>0">
            <tr v-for="item in specification.productSku" :key="item.id">
              <td v-for="(sku) in item.skuSpecification" :key="sku.id">
                {{sku.name}}</td>
              <!-- <td>{{item.skuSpecification[0].name}}</td> -->
              <td>
                <el-input type="number" min="1" max="9999999.99" size="mini" v-model="item.price"></el-input>
              </td>
              <td>
                <el-input type="number" min="0"  size="mini" v-model="item.inventory"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.skuCode"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.barCode"></el-input>
              </td>              
            </tr>

          </tbody>
          <tbody v-if="specification.productSku.length===0">
            <tr>
              <td>
                <el-input type="number" min="1" max="9999999.99" size="mini" v-model="oneSpecification.price"></el-input>
              </td>
              <td>
                <el-input type="number" min="0" size="mini" v-model="oneSpecification.inventory"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="oneSpecification.skuCode"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="oneSpecification.barCode"></el-input>
              </td>                
            </tr>
          </tbody>
        </table>
      <div v-show="error1" class="el-form-item__error">{{error1}}</div>
        
      </el-form-item>
    </el-form>
    <!-- <div class="com-btngroup">
      <el-button type="primary" @click="gotoProduct(1)">上一步，选择商品分类</el-button>
      <el-button type="primary" @click="gotoProduct(3)">下一步，填写其它关联信息</el-button>

    </div> -->
  </div>
</template>
<script>
  import {
    getUploadImgSrc
  } from '@/common/js/service.js';
  export default {
    data() {
      return {
        // selectedList: [],
        dataList: [],
        skuInfo: {},
        multiData: {
          price: '',
          skuCode: '',
          inventory: '',
          barCode:'',
        },
        marketprice: '',
        error1: ''
        // // specification.productSku: [],
        // result: '',
        // results: '',
        // rules: {
        //   skus: [{
        //     // validator: validateSku,
        //     min: 1,
        //     required: true,
        //     trigger: 'change',
        //     message: '请填写完整'
        //   }]
        // }
      }
    },
    computed: {
      titleList: function () {
        return this.specification.selectedList ? this.specification.selectedList.filter(x => x.length !== 0) : [];
      },
      // skuInfo: function(){

      //   return obj;
      // }
    },
    props: {
      next: {
        type: Function,
        required: true,
      },
      specification: {
        type: Object,
        default: () => {
          return {
            attributeBaseVOs: [],
            productSku: [],
            selectedList: [],
          }
        }
      },
      oneSpecification: {
        type: Object,
        default: () => {
          return {
            price: '',
            inventory: '',
            skuCode: '',
            barCode:'',
          }
        }
      }
    },

    methods: {
    	checkName(name,index1,index2){

					let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
					    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					if(regEn.test(name) || regCn.test(name)) {
					   this.$message.error('规格名称不能包含特殊字符！');
					   this.specification.attributeBaseVOs[index1].attributeValues[index2].name = this.stripscript(name);
					   return false;
					}    		
    	},

			 stripscript(s) { 
			    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
			    var rs = ""; 
			    for (var i = 0; i < s.length; i++) { 
			        rs = rs+s.substr(i, 1).replace(pattern, ''); 
			    } 
			    return rs; 
			},

      getSkuInfo() {
        let val = 0;
        let checkKeys= ['price', 'skuCode', 'inventory'];
        if (this.marketprice === ''||(!/^\d{1,7}(\.\d{1,2})?$/.test(this.marketprice))) {
          return 0;
        }
        if (this.specification.productSku.length == 0) {
          val = checkKeys.every((key => this.oneSpecification[key] !== '')) ? 1 : 0;
        } else {
          console.log(this.specification.productSku);
          let completeArray = this.specification.productSku.map(sku => {
            let isCompelete = checkKeys.every((key => sku[key] !== ''))?
            1 : 0;
            return isCompelete;
          });
          val = completeArray.every(com => com===1)?1: 0;
        }
        return val;

      },
      checkForm() {
        this.skuInfo =  this.getSkuInfo();
        console.log('sku info ', this.skuInfo);
        if(this.skuInfo===0){
          this.error1 = '请正确填写完整';
          return false;
        } else{
           this.error1 = '';
           let result = true;
          let reg = /^\d+$/;

          
           if (this.specification.productSku.length == 0) {
              if(this.oneSpecification['price']<=0){
		            this.error1 = '价格必须大于0';
		             result = false;
          			}else{
			              if(!reg.test(this.oneSpecification['inventory'])){
					            this.error1 = '库存必须为整数';
					             result = false;
					          	}          				
          			}
           } else {
	         			
				          result = this.specification.productSku.every(x=>{
				               return x.price > 0;
				            });
					          if(!result){
					          	this.error1 = '价格必须大于0';
					          }else{
					             result = this.specification.productSku.every(x=>{
					               return reg.test(x.inventory);
					             });
					            if(!result) {
					              this.error1 = '库存必须为整数';
					            }						          	
					          }

           }
          return result;
        }
      },
      handleRemove(itemIndex, sizeIndex) {
        //  this.specification.attributeBaseVOs[itemIndex].attributeValues[sizeIndex].src = '';
        this.specification.attributeBaseVOs = this.specification.attributeBaseVOs.map((x, xindex) => {
          if (xindex === itemIndex) {
            x.attributeValues[sizeIndex].src = '';
          }
          return x;
        })
      },
      beforeAvatarUpload(itemIndex, sizeIndex) {
        let vm = this;
        let fn = function (file) {
          getUploadImgSrc(file).then(res => {
            console.log('upload file ', res);
            vm.specification.attributeBaseVOs = vm.specification.attributeBaseVOs.map((x, xindex) => {
              if (xindex === itemIndex) {
                x.attributeValues[sizeIndex].src = res;
              }
              return x;
            })
            //  vm.specification.attributeBaseVOs[itemIndex].attributeValues[sizeIndex].src = res;
            console.log('vovovo', vm.specification.attributeBaseVOs);

          }).catch(res => {
            this.$message.error(res.data);

          });
          return false;
        };
        return fn;
      },
      gotoProduct(step) {
        this.next(step);
      },
      getMarketprice() {
        return this.marketprice;
      },
      setMarketprice(val) {
        this.marketprice = val;
      },
      changeSelected(size) {
        console.log('size ', size, this.specification.attributeBaseVOs);
      },
      setMultiVal() {
        // console.log(this.specification.productSku, (this.specification.productSku).map(x=>{
        //     x = Object.assign({},x,this.multiData);
        //     return x;
        //   }))
        

        
        if (this.specification.productSku.length === 0) {
          // this.oneSpecification = Object.assign({}, this.multiData);
          this.$emit('update:oneSpecification', Object.assign({}, this.multiData))
        }
        this.specification.productSku = this.specification.productSku.map(x => {
          x = Object.assign({}, x, this.multiData);
          return x;
        });
        
        
        
      }
    },
    mounted() {
      this.marketprice = this.specification.marketprice;
      // if(!this.specification.attributeBaseVOs){
      //   return;
      // }

    }
  }

</script>
<style lang="scss" scoped>
  .checkbox {
    margin-left: 0;
    margin-right: 30px;
    margin-bottom: 5px;
    .el-checkbox+.el-checkbox {
      margin-left: 0;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .u-table {
    margin-top: 20px;
    width: 720px;
  }

  .multiInput {
    width: 100px;
    margin-right: 10px;
  }

  .input-short {
    width: 100px;
  }

  .uploadImgButton {}

  .uploadImg {
    display: inline-block;
    width: 40px;
    height: 40px;
  }

  .uploadImgLarge {
    display: inline-block; // width: 400px;
    // height: 400px;
  }

  .uploadImgDel {
    display: none;
  }

  .upload-small {
    .uploadCardLarge {
      display: none;
      position: absolute;
      right: 0;
      top: 40px;
      background-color: #fff;
      width: 400px; // height: 400px;
      text-align: center;
      z-index: 10;
    }
    display: inline-block;
    position: relative;
    margin-left: -20px;
    margin-right: 30px;
    &:hover {
      .uploadImgDel {
        font: 24px;
        color: $color-primary;
        cursor: pointer;
        display: inline-block;
      }
      .uploadCardLarge {
        display: inline-block;

      }
    }
  }

  .table-strip-ls {
    padding: 5px;
    thead th {
      height: 40px;
    }
  }

  .table-strip-ls tbody td,
  .table-strip-ls thead th {
    line-height: 1.5;
  }

  .specName {
    color: $color-primary10; // font-weight: bold;
  }

  .sizeBlock {
    margin-bottom: 20px;
    padding-left: 24px;

  }
  .starIcon{
    font-size: 12px;
    color: #f56c6c;
    margin-right: 4px;
    font-weight: normal;
  }

</style>
