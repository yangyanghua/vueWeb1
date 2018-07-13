<template>
  <div class="main">
    <!--面包屑-->  
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{this.goodsId?'编辑':'发布'}}商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--面包屑-->
    <div class="subject">
      <div class="filter_query mat20">
        <div class="steps" style="margin-top:0; padding-top:20px;">
          <el-steps :active="step" align-center finish-status="success">
            <el-step title="选择分类" description=""></el-step>
            <el-step title="编辑基本信息" description=""></el-step>
            <el-step title="编辑商品详情" description=""></el-step>
          </el-steps>
        </div>
        <div class="detailInfo" v-show="step===0">
          <!-- <div class="com-title">
            <i class="tag"></i>
            商品分类
          </div> -->
          <classfication v-if="canMountCategory" ref="classfication" :next="goToNext" :setCategoryId="setCategoryId"></classfication>
        </div>
        <div v-if="canMounted">
          <div class="detailInfo" v-show="step===1">
            <!-- 
            <p class="com-fsmd addmg">
              类目：
              <span class="is-important">{{selectedCategoryName}}</span>
              <el-button type="text" @click="goToNext(0)">更改</el-button>
            </p> -->
            <div class="com-title">
              <i class="tag"></i>
              基本信息
            </div>
            <basic-info ref="basic" :basicInfo="basicInfo" :selectedCategoryName="selectedCategoryName"
              :goToStep="goToNext">
            </basic-info>
            <images-info ref="image" :imagesUrl="imagesUrl" :videoUrl="videoUrl">
            </images-info>
            <keys-info ref="keysInfo" :basicInfo="basicInfo" :initCategory="initCategory"></keys-info>
            <div class="com-title">
              <i class="tag"></i>
              价格库存
            </div>
            <specification-info ref="specification" :next="goToNext" :specification="specification" :oneSpecification.sync="oneSpecification">
            </specification-info>
            <div class="com-title">
              <i class="tag"></i>
              商品参数、服务支持
            </div>
            <other-info :goodsPropertyParams="goodsPropertyParams"  :next="goToNext" :freightInfo="freightInfo" ref='other' :saveGoods="saveGoods" :freightTemplateRules="freightTemplateRules">
            </other-info>
            <div class="com-btngroup">
              <el-button type="primary" @click="goToNext(0)">上一步，选择商品分类</el-button>
              <el-button type="primary" @click="goToNext(2)">下一步，编辑商品详情</el-button>
            </div>
          </div>
          <div class="detailInfo" v-show="step===2">
            <div class="com-title">
              <i class="tag"></i>
              商品描述
            </div>
            <detail-info :next="goToNext" :detailInfo="detailContent" ref="detail">
            </detail-info>
            <div class="com-btngroup">
              <p class="upWhenSave">
                <el-checkbox v-model="upWhenSave" >是否保存后直接上架</el-checkbox>
              </p>
              <el-button type="primary" @click="goToNext(1)">上一步，编辑商品信息</el-button>
              <el-button v-if="canEdit" type="primary" @click.prevent="saveGoods" :loading="isSavingGoods">保存商品</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as Service from '@/common/service/goods/goods.js';
  import classfication from './subinfo/classification.vue';
  import basicInfo from './subinfo/basic.vue';
  import keysInfo from './subinfo/keys.vue';
  import imagesInfo from './subinfo/images.vue';
  import detailInfo from './subinfo/detail.vue';
  import specificationInfo from './subinfo/specification.vue';
  import otherInfo from './subinfo/other.vue';
  const initVal = () => {
    return;
  }
  export default {
    data() {
      return {
      	oldSkuList:[],
      	goodsPriceList:[],
      	canEdit:true,
        canUpWhenSave:false,//是否可上架
        selectedCategoryId: ',,',
        selectedCategoryName: '>>',
        canMountCategory: false,
        goodsId: '',
        step: 0,
        result: '',
        results: '',
        categoryId: '',
        
        // 规格相关参数
        initProductSku: [], //初始化时使用的productsku
        productAttributes: [],
        initProductAttributes: [],
        goodsPropertyParams: [],
        specification: {
          selectedList: [],
          attributeBaseVOs: [],
          productSku: [],
          marketprice: ''
        },
        oneSpecification: {
          price: '',
          inventory: '',
          skuCode: '',
        },
        // 用于对比用户原选择数据
        compareSku: [],
        // 基础信息相关
        basicInfo: {
          name: '',
          brandId: '',
          originPlace: '',
          shopCategoryId: '',
          productKeywords: '',
          productDetails: '',
        },
        basicOther: {
          storeCategoryProducts: []
        },
        initCategory: [],
        // 图片和视频
        imagesUrl: '',
        videoUrl: '',
        // 商品详情
        detailContent: '',
        canMounted: false,
        // 运费相关参数
        freightTemplateRules: [], //运费模板
        freightInfo: {
          freightRuleId: '',
          paymentMethod: '1', //支持的支付方式： 在线支付1 货到付款2 
          deliveryMethod: '2', //"支持的发货方式           
          freightAffordBy: '2', //"运费由谁承担： 1 消费者, 2 平台承担"
          support7daysExchange: '1', //是否支持7天退换货
          grossWeight: '0',
        },
        // 是否保存后直接上架，默认不选中
        upWhenSave: false,
        // 是否正在保存商品，表示加载中
        isSavingGoods: false
      }
    },
    components: {
      classfication,
      basicInfo,
      keysInfo,
      imagesInfo,
      specificationInfo,
      detailInfo,
      otherInfo,
    },
    watch: {
      "specification.attributeBaseVOs": {
        handler(val, oldVal) {
          //console.log('attributeBaseVOs ', val, 'compareSku', this.compareSku);
          this.specification.selectedList = val.map(x => {
            let arr = [];
            arr = (x.attributeValues).filter(item => {
              return item.isSelected === true;
            }).map(z => {
              z.pid = x.id;
              z.pname = x.name;
              return z;
            });
            return arr;
          });
          //console.log('after selected list ', this.specification.selectedList);

          this.setExchange();
        },
        deep: true
      },
      $route: function (newVal, oldVal) {
        //console.log('$route change ', newVal, oldVal);
        // 当路由变化时操作，如果id变了重新获取内容，如果id为空，则重置所有相关数据。
        this.goodsId = newVal.query.id;
        if (newVal.query.id && (newVal.query.id !== oldVal.query.id)) {
          this.initProductSku = [];
          this.compareSku = [];
          this.result = '';
          this.results = '';
          this.getGoodsInfo(this.goodsId);
        }
        if (!newVal.query.id) {
          // this.$data=Object.assign({},this.$data,initVal());
         // console.log(this.$data);
           
          this.selectedCategoryId = ',,';
          this.selectedCategoryName = '>>';
          this.goToNext(0);
          this.goodsId = '';
          this.result = '';
          this.results = '';
          this.initProductSku = [];
          this.productAttributes = [];
          this.initProductAttributes = [];
          this.goodsPropertyParams = [];
          this.compareSku = [];
         
          this.getInitInfo();
          this.specification = {
            selectedList: [],
            attributeBaseVOs: [],
            productSku: [],
            marketprice: ''
          };
          this.oneSpecification = {
            price: '',
            inventory: '',
            skuCode: '',
          };
          this.basicInfo = {
            name: '',
            brandId: '',
            originPlace: '',
            shopCategoryId: '',
            productKeywords: '',
            productDetails: ''
          }
          this.basicOther = {
            storeCategoryProducts: []
          };
          this.initCategory = [];
          // 图片和视频
          this.imagesUrl = '';
          this.videoUrl = '';
          // 商品详情
          this.detailContent = '';
          this.canMounted = false;
          // 运费相关参数
          this.freightTemplateRules = []; //运费模板
          this.freightInfo = {
          freightRuleId: '',
          paymentMethod: '1', //支持的支付方式： 在线支付1 货到付款2 
          deliveryMethod: '2', //"支持的发货方式           
          freightAffordBy: '2', //"运费由谁承担： 1 消费者, 2 平台承担"
          support7daysExchange: '1', //是否支持7天退换货
          grossWeight: '0',
        };
          // 是否保存后直接上架，默认不选中
          this.upWhenSave = false;

        }
      }
    },
    methods: {
      // 设置分类Id,如果id与当前已先分类相同，则不处理；否则重载商品属性及规格
      setCategoryId(id, name) {
       // console.log('setCategoryId -------', id, name);
        if (id === this.selectedCategoryId) {
          return;
        }
        this.selectedCategoryId = id;
        this.selectedCategoryName = name;
        this.getInitInfo();
      },
      // 获取商品分组信息
      getCheckedKeys() {
        return this.$refs.keysInfo.getCheckedKeys();
      },
      // 获取编辑器内容
      getUMContent() {
        let content = this.$refs.detail.getUMContent(); // 调用子组件方法
        //console.log(content);
        return content;
      },
      // 检查编辑器内是否有内容
      hasContents() {
        return this.$refs.detail.hasContents();
      },
      // 步骤跳转
      goToNext(step) {
      	
        if (step === 0) {
          this.canMountCategory = true;
          this.$nextTick(() => {
            this.$refs.classfication.setCategoryList(this.selectedCategoryId, this.selectedCategoryName);

          });
        };
        if(step===2){
          const refs = ['basic', 'image','specification', 'other'];
          let checkResults= refs.map((x)=>{
            //console.log('results ', x, this.$refs[x].checkForm(), this.$refs[x].checkForm()===true)
            return this.$refs[x].checkForm()===true;
          });
          // let basicCheck = this.$refs.basic.checkForm();
        //console.log('check ', checkResults,checkResults.every(x=>x===true));
        
        if(checkResults.some(x=>x===false)){
          return;
        } 
      
        
        }
        this.step = step;
      },
      // 选不同规格时排列组合
      doExchange(arr, depth) {
        for (var i = 0; i < arr[depth].length; i++) {
          this.result[depth] = arr[depth][i]
          if (depth != arr.length - 1) {
            this.doExchange(arr, depth + 1)
          } else {
            this.results.push(this.result.join('|'));
          }
        }
      },
      // 选不同规格时排列组合结果
      getExchangeResult(arr) {
       // console.log('deal arr ', arr);
        if (arr.length === 0 || arr.every(x => x.length == 0)) {
          this.results = [];
          return;
        }
        this.results = [];
        this.result = [];
        this.doExchange(arr, 0);
       // console.log('get results ', this.results)
      },
      // 获取初始化产品相关属性规格等信息
      getInitInfo() {
        if( this.selectedCategoryId===',,'){
          return;
        }
        let params = {
          categoryIds: this.selectedCategoryId,
          categoryNames: this.selectedCategoryName,
        };
        Service.goodsToCreate(params).then(res => {
          // console.log(res);
          this.freightTemplateRules = res.goodsAllVO.freightTemplateRules;
          this.goodsPropertyParams = res.goodsAllVO.goodsPropertyParams;
          this.specification.attributeBaseVOs = res.goodsAllVO.attributeBaseVOs;
          this.canMounted = true;
        }).catch(res => {
          this.$message(res.message);
        });
      },
      // 获取商品信息
      getGoodsInfo(id) {
      	this.$loading();
        Service.goodsDetail({
          goodsId: id
        }).then(res => {
          // console.log('get detail info ', res);
          let goodsInfo = res.goodsAllVO;
          this.goodsId = goodsInfo.goods.id;
          this.canEdit = goodsInfo.goods.status != 1;
          if(!this.canEdit){
		        this.$notify({
		          title: '提示',
		          message: '已上架商品不能修改商品信息',
		          type: 'warning',
		        });          	
          }
          this.goodsPropertyParams = goodsInfo.goodsPropertyParams.filter(x=>{
            return !(x.proBase.name===''&&x.proValue.name==='');
          });
          this.specification.attributeBaseVOs = goodsInfo.attributeBaseVOs.map(x => {
            x.attributeValues = x.attributeValues.map(y => {
              return { ...y,
                isSelected: false,
                src: ''
              }
            });
            return x;
          });
          this.productAttributes = goodsInfo.productAttributes || [];
          this.initProductAttributes = goodsInfo.productAttributes || [];
          this.initProductSku = goodsInfo.productSku;
          this.selectedCategoryId = goodsInfo.categorys.valId;
          this.selectedCategoryName = goodsInfo.categorys.value;
          this.basicInfo = {
            name: goodsInfo.goods.name,
            brandId: goodsInfo.goods.brandId,
            originPlace: goodsInfo.goods.originPlace,
            productDetails: goodsInfo.goods.productDetails,
            productKeywords: goodsInfo.goods.productKeywords,
            shopCategoryId: goodsInfo.goods.shopCategoryId,
          };
           this.imagesUrl = goodsInfo.goods.images;
         
          this.videoUrl = goodsInfo.goods.video;
          this.detailContent = goodsInfo.goods.details;
          this.categoryId = goodsInfo.goods.categoryId;
          this.initCategory = goodsInfo.storeCategoryProducts;
          this.freightTemplateRules = goodsInfo.freightTemplateRules;
          this.freightInfo = {
            freightRuleId: goodsInfo.goods.freightRuleId,
            paymentMethod: goodsInfo.goods.paymentMethod + '',
            deliveryMethod: goodsInfo.goods.deliveryMethod + '',
            freightAffordBy: goodsInfo.goods.freightAffordBy + '',
            support7daysExchange: goodsInfo.goods.support7daysExchange + '',
            grossWeight: goodsInfo.goods.grossWeight + '',
          };
          this.initAttribute();
          this.canMounted = true;
          this.$loading().close();
          
        }).catch((res)=>{
        	this.$loading().close();
        });
      },

      // 保存商品
      saveGoods() {
        // if (!this.hasContents()) {
        //   this.$message.error('请填写详情');
        //   return;
        // }

          //      console.log('check detail', this.$refs['detail'].checkForm(), this.$refs['detail'].hasContents(),this.$refs['detail'].getUMContent());
          if(!this.$refs['detail'].checkForm()){

        return;
        }
        let store = (this.getCheckedKeys()).map(x => {
          let init = this.initCategory.find(y => y.categoryId == x);
          let obj = {
            categoryId: x,
          }
          if (init) {
            obj = Object.assign({}, obj, init);
          }
          return obj;
        });
        // if (store.length === 0) {
        //   this.$message.error('请选择店铺分类');
        //   return;
        // }
        let goodsPrice = '';
        
        
        
        let params = {
          isUp: this.upWhenSave ? 1 : 2,
          operateType: this.goodsId ? 2 : 1,
          ...(this.getBackData()),
          goodsPropertyParams: this.goodsPropertyParams,
          storeCategoryProducts: store,
          goods: {
            ...this.freightInfo,
            ...this.basicInfo,
            details: this.getUMContent(),
            // images: this.imagesUrl.map(img => ('1|' + img)).join(','),
            // video: this.videoUrl,
            ...this.$refs.image.getBackInfo(),
            categoryId: this.selectedCategoryId.split(',').pop(),
            id: this.goodsId,
          }
        };
        
        
        //获取最小价格
        params.goods.price = Math.min.apply(Math, this.goodsPriceList);

        this.isSavingGoods = true;
        // 调试使用
       // console.log('save----------------params:\n', params);
        // return;
        
        Service.goodsSave(params).then(res => {
         // console.log(res);
          if(this.goodsId){
             this.$router.push('/goods/list');
          } else {
            this.$router.push({
            path: '/goods/publish/publicSuccess',
            query: {id: res.goodsId}
          });
          }
         
         
        }).catch(res => {
          this.$message.error(res.message);
        }).finally(()=>{
          this.isSavingGoods = false;
        });
       // console.log('save goods:\n', params);
        return false;
      },
      // 初始时根据attributeBaseVOs显示可操作规格项，根据specification.selectedList判断为已选规格及相关信息
      initAttribute() {
        let vm = this;
        this.setSelectedList();
        this.setAttributeValues();
        this.setInitSkuInfo();
      },
      // 设置初始的sku
      setInitSkuInfo() {
        if (this.initProductSku.length === 0) {
          return;
        }
        this.specification.marketprice = this.initProductSku[0].marketprice;
        if (this.initProductSku.length === 1 && this.initProductSku[0].skuSpecification === "|") {
          this.oneSpecification = Object.assign({}, this.initProductSku[0]);
          return;
        }
        let vm = this;
        this.initProductSku.forEach((x) => {
          let obj = {};
          obj.price = x.price;
          obj.inventory = x.inventory;
          obj.id = x.id;
          obj.barCode = x.barCode;
          obj.skuCode = x.skuCode;
          let spec = x.skuSpecification.split(',');
          let spec1 = x.skuSpecification1.split(',');
          obj.skuSpecification = spec.map((y,index) => {
            let id = y.split('|')[1];
            let pid = y.split('|')[0];
            let nameInfo = spec1[index].split('|');
            let name = nameInfo[3];
            let pname = nameInfo[1];
            return {
              id,
              name,
              pname,
              pid
            }
          });
          vm.specification.productSku.push(obj);
        });
        //console.log('after init sku ====== ', this.specification)
      },
      // 计算已选规格内选项
      setSelectedList() {
        //console.log('productAttributes ', this.productAttributes, this.specification.attributeBaseVOs);
        this.specification.selectedList = this.specification.attributeBaseVOs.map((x, index) => {
          //  this.selectedList = [];
          let items = this.productAttributes.find(y => {
            return y.attributeId === x.id;
          });
          //console.log('items ', items)
          if (!items) {
            return [];
          }
          let selectedAtt = [];
          items.attributeValue.split(',').forEach(item => {
            let arr = String(item).split('|');
            let selected = [];
            selectedAtt.push({
              id: arr[0],
              name: arr[1],
              src: arr[3],
              srcId: arr[2]?arr[2]:1,
              pid: x.id,
              pname: x.name
            });
          });
          return selectedAtt;
        });
        //console.log('setSelectedList ', this.specification.selectedList);
      },
      // 添加各规格isSelected src信息
      setAttributeValues() {
        let list = this.specification.selectedList;
        this.specification.attributeBaseVOs = this.specification.attributeBaseVOs.map((x, attrindex) => {
          x.attributeValues = x.attributeValues.map((attribute) => {
            let selectedAttribute = list[attrindex].find(temp => temp.id == attribute.id);
            if (selectedAttribute) {
              attribute.name = selectedAttribute.name;
              attribute.isSelected = true;
              attribute.src = selectedAttribute.src;
            }
            return attribute;
          });
          return x;
        });
        //console.log('setAttributeValues  ', this.specification.attributeBaseVOs);
      },
      // 通过specification.selectedList设置sku的值
      setExchange() {
        let toBeExchange = this.specification.selectedList && this.specification.selectedList.map(x => {
          x = x.map(y => JSON.stringify(y));
          return x;
        });
   
        //console.log('tobex ', toBeExchange);
        this.getExchangeResult(toBeExchange.filter(x => x.length !== 0));
        this.compareSku = (this.specification.productSku).concat();
        //console.log('this.compareSku)', this.compareSku, this.results);
        this.specification.productSku = this.results.map((x, index) => {
            x = x.split('|').map(y => JSON.parse(y));
           // console.log(x);
            let sku = {
              // pid: x[0].pid,
              // pname: x[0].pname,
              price: '',
              skuCode: '',
              inventory: '',
              barCode:'',
              skuSpecification: [...x]
            };
            return sku;
          });
         // console.log('after>>> setchange setExchange )', this.specification);
        if (this.specification.productSku.length === 0 || this.compareSku.length === 0) {
          return;
        }
        this.setCompareVal();
      },
      // 返回比较后的值,需要保留原来用户所填库存价格信息等
      setCompareVal() {
        let sku = this.specification.productSku;
        this.specification.productSku = sku.map((x, index) => {
          let spec = x.skuSpecification.map(x1 => x1.id).join(',');
          let sameVal = this.compareSku.find(y => (y.skuSpecification).map(y1 => y1.id).join(',') === spec);
          if (sameVal) {
            x.price = sameVal.price,
            x.skuCode = sameVal.skuCode,
            x.barCode  = sameVal.barCode,
            x.id = sameVal.id,
              x.inventory = sameVal.inventory;
             // console.log('same value is : ', x, sameVal);
          }

          return x;
        });
      },
      // 获取商品所选规格内值
      getproductAttributes() {
        // 获取productAttributes的值
        let arr = [];
        arr = this.specification.selectedList.filter(item => item.length !== 0).map(x => {
          let obj = {attributeType:'1'};
          obj.attributeId = x[0].pid;
          let initObj = this.initProductAttributes.find(init => init.attributeId === obj.attributeId);
          if(initObj){
            obj.id = initObj.id;
            obj.attributeType = initObj.attributeType?initObj.attributeType:'1';
          }
          obj.attributeName = x[0].pname;
          obj.attributeValue = x.map((y) => {
            let i = y.src ? ('|'+y.srcId+'|' + y.src) : '';
            return y.id + '|' + y.name + i;
          }).join(',');
          return obj;
        });
        return arr;
      },
      // 获取productSku 获取productAttributes的值
      getBackData() {
      	let vm = this;
        this.specification.marketprice = this.$refs.specification.getMarketprice();
     //   console.log('------------marketprice', this.specification.marketprice,this.specification.productSku);
        let productSku = [];
        let oriproductSku = this.specification.productSku;
        if (!oriproductSku || oriproductSku.length === 0) {
        	vm.goodsPriceList.push(this.oneSpecification.price);
          return {
            productSku: [{
              ...this.oneSpecification,
              marketprice: this.specification.marketprice,
              skuSpecification: "|",
              skuSpecification1: "|||",
            }],
            productAttributes: []
          };
        }
        oriproductSku.forEach((x, index) => {
        	vm.goodsPriceList.push(x.price);
          let obj = {};
          obj.marketprice = this.specification.marketprice;
          obj.price = x.price,
          obj.skuCode = x.skuCode,
          obj.inventory = x.inventory,
          obj.barCode = x.barCode,
          obj.id = x.id||'';
           // console.log('ori ', x);
          let skuSpec = x.skuSpecification.map(skuitem => (skuitem.pid+'|'+skuitem.id)).join(",");
          // let initVal = this.initProductSku.find(initSku => initSku.skuSpecification === skuSpec);
          // if (initVal) {
          //   obj.id = initVal.id;
          // }
          let skuSpec1 = x.skuSpecification.map(skuitem => (skuitem.pid + '|' + skuitem.pname+'|'+skuitem.id+'|'+skuitem.name)).join(",");
          obj.skuSpecification = skuSpec
          obj.skuSpecification1 = skuSpec1;
          productSku.push(obj);
          
        });   
        return {
          productSku,
          productAttributes: this.getproductAttributes()
        };
      },
    },

    mounted() {
      // 如果存在id,执行初始内容,否则初始化分类组件
      if (this.$route.query.id) {
        this.goodsId = this.$route.query.id;
      }
      if (this.goodsId) {
        this.goToNext(1);
        this.getGoodsInfo(this.goodsId);
      } else {
        this.canMountCategory = true;
        if (this.selectedCategoryId&&this.selectedCategoryId!==',,') {
          this.getInitInfo();
        }

      }
    }
  }

</script>
<style lang="scss" scoped>
  .steps {
    margin-top: 40px;
    margin-bottom: 40px; // border: 1px solid $color-bg-dialog-heavy;
    // background-color: $color-bg-dialog;
  }

  .detailInfo {
    padding-left: 50px;
    padding-right: 50px;
  } // 925px;
  .table-product {
    width: 1020px;
    .t0 {
      width: 40px;

      .el-checkbox__label {
        font-size: 12px;
        color: $color-heavy;
        font-weight: bold;
      }
    }
    .t1 {
      text-align: left;
      width: 240px;
    }
    .t2 {
      width: 100px;
    }
    .t3 {
      width: 90px;
      text-align: right;
    }
    .t4 {
      text-align: right;
      width: 70px;
    }
    .t5 {
      text-align: right;
      width: 70px;
    }
    .t6 {
      width: 130px;
    }
    .t7 {
      width: 130px;
    }
    .t8 {
      width: 100px;
    }
  }


  .tag {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/static/images/tag1.png') 100% 100% no-repeat;
    background-size: contain;
    vertical-align: middle;
    transform:rotate(270deg);
    position: relative;
    top: -2px;
  }

  .addmg {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .is-important {
    // color: $color-heavy;
    color: $color-normal; //   color: $color-primary-selected;
    font-weight: bold;
  }

  .upWhenSave {
    margin-bottom: 12px;
  }

</style>
