<template>
  <div class="main">
    <!--面包屑-->  
    <div class="crumbs">
      商品列表
    </div>
    <!--面包屑-->
    <div class="subject mat20">
    <el-button-group>
      <el-button @click="setGoodStatus('')" size="small" :type="goodsStatus===''?'primary':''">全部商品（{{count.allCount}}）</el-button>
      <el-button @click="setGoodStatus('1')" size="small" :type="goodsStatus==='1'?'primary':''">已上架（{{count.upCount}}）</el-button>
      <el-button @click="setGoodStatus('0')" size="small" :type="goodsStatus==='0'?'primary':''">未上架（{{count.downCount}}）</el-button>
    </el-button-group>
    <div class="filter_query mat20">
    <h2 class="s_h2"><i></i>筛选查询</h2>
    <el-form :inline="true" :model="preSearchForm" class="search-form-inline" style="padding:20px;">
      <el-form-item label="商品名称">
        <el-input size="small" class="input-normal" v-model="preSearchForm.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <div class="fs0">
          <el-input size="small" class="input-short" v-model="preSearchForm.priceRange1"></el-input>
          <span class="link">~</span>
          <el-input size="small" class="input-short" v-model="preSearchForm.priceRange2"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="销量">
        <div class="fs0">
          <el-input size="small" class="input-short" v-model="preSearchForm.sellCountRange1"></el-input>
          <span class="link">~</span>
          <el-input size="small" class="input-short" v-model="preSearchForm.sellCountRange2"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input size="small" class="input-normal" v-model="preSearchForm.brandName"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker class="input-normal" size="small" v-model="preSearchForm.createDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-date-picker class="input-normal" size="small" v-model="preSearchForm.modifyDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="medium"  icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button size="medium"  icon="el-icon-refresh" @click="onReset">重置</el-button>
       
      </el-form-item>
       <el-button  @click="addGoods" icon="el-icon-plus" style="float: right;margin-top: 10px;" type="primary" size="medium">商品发布</el-button>
    </el-form>
    
    </div>

    
    <p class="multiOperation">
      <el-button v-show="multiOperation" v-for="item in multiSelections" v-if="!item.hide" :key="item.name" type="primary" size="mini" @click="multiDeal(item.type)">{{item.name}}</el-button>
     <!-- <el-button @click="multiOperation=!multiOperation" type="primary" :plain="multiOperation?true:false" size="mini" class="fr">{{multiOperation?'取消':''}}批量操作</el-button>-->
    <!-- <el-button @click="downloadCode" type="text">批量下载码图</el-button> -->
    </p>
    <table class="table-strip-ls table-product">
      <thead>
        <tr>
          <td v-show="true" class="t0">
            <el-checkbox :indeterminate="isIndeterminate" v-model="multiOperationAll" @change="selectAll">
              </el-checkbox>
          </td>
          <td class="t1">商品名称</td>
          <td class="t2">品牌</td>
          <td class="t3">价格(￥)</td>
          <td class="t4">库存(件)</td>
          <td class="t5">销量(件)</td>
          <td class="t6">创建时间
            <!-- 排序样式暂时不需要 -->
            <!-- <div class="sortGroup">
              <i class="el-icon-sort-up"></i>
              <i class="el-icon-sort-down"></i>
            </div> -->
          </td>
          <td class="t7">修改时间
          </td>
          <td>上/下架</td>
          <td class="t8">操作</td>
          <!-- <td v-if="hasSource" class="t9">溯源信息</td> -->
          <td v-if="hasSource" class="t10">真知码绑码管理</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in dataList" :key="item.goodsId">
          <td v-show="true">
            <el-checkbox v-model="multiGoodsStatus[index]">
            </el-checkbox>
          </td>
          <td class="bannerInfo t1">
            <div>
              <img class="product-img" :src="item.goodsImg" alt="">
              <p class="product-name" @click="gotoEditGoods(item.goodsId)">
                {{item.goodsName}}
              </p>
            </div>
          </td>
          <td class="t2">{{item.brandName}}</td>
          <td class="t3">{{item.minPrice.toFixed(2)}} ~ {{item.maxPrice.toFixed(2)}}</td>
          <td class="t4">
            <p>{{item.stock}} </p>
              <el-button type="text" size="mini" @click='showAttrDetail(item.goodsId,true)'>详情</el-button>

          </td>
          <td class="t5">{{item.sold}}
          </td>
          <td class="t6">{{item.createDate}}</td>
          <td class="t7">{{item.modifyDate}}</td>
          <td>
           <!-- <el-button type="text" class="btn-handle" @click="dealGoods(item.goodsId,index,item.goodsStatus==0?1:0)">{{item.goodsStatus==1?'下':'上'}}架:
            </el-button> -->
            <!-- {{item.goodsStatus==1?'上':'下'}}架: -->
            <el-switch v-model="item.goodsStatus"  @change="dealGoods(item.goodsId,index,item.goodsStatus)" active-value='1' inactive-value='0'>

            </el-switch>
            </td>
          <td class="clearfs t8">
            <el-button type="text" class="btn-handle is-primary" v-if="item.goodsStatus==0"   @click="gotoEditGoods(item.goodsId)">编辑商品
            </el-button>
            <br>
            <!-- <i class="btnsplit"></i> -->
            <el-button type="text" class="btn-handle is-primary"   @click="gotoEditSource(item.goodsId)">编辑溯源
            </el-button>
            <!-- <i  v-if="item.goodsStatus==0" class="btnsplit"></i> -->
 <br>
             <el-button  v-if="item.goodsStatus==0" type="text" class="btn-handle is-primary" @click="deleteItem(item.goodsId, '确定删除商品【' + item.goodsName + '】吗?')">删除
            </el-button>

            <!-- <el-dropdown size="small" placement="bottom" @command="handleCommand">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type:'edit',item: item}">编辑</el-dropdown-item>
                <el-dropdown-item v-if="item.goodsStatus===0" :command="{type:'del',item: item}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </td>
          <!-- <td v-if="hasSource" class="t9">
             <el-button type="text" class="btn-handle"   @click="gotoEditSource(item.goodsId)">编辑
            </el-button>
          </td> -->
          <td v-if="hasSource" class="t10">
              <!-- <el-button type="text" class="btn-handle" title="下载电子码码图"   @click="downloadCode(item.goodsId)">
                <i class="el-icon-download"></i>
            </el-button> -->
             <el-button type="text" class="btn-handle"  title="查看电子码码图" @click="viewCode(item.goodsId)">
                <i class="el-icon-view"></i>
            </el-button>
              <el-button type="text" class="btn-handle" title="新增真知码"  @click="editCode(item.goodsId)">
                <i class="el-icon-edit"></i>
            </el-button>
          </td>
        </tr>
        <tr v-if="dataList.length===0">
          <td colspan="12" class="com-nodata">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="dataList.length!==0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="page.totalRecord">
      </el-pagination>
    </div>

    <el-dialog width="920px" title="库存信息" :visible.sync="dialogFormVisible" @close="closeAttrDialog">
      <el-form>
      	<template v-if="showWarningAlert">
      		<el-alert title="规格ID只能输入数字" type="warning" show-icon close-text="知道了" @close="showWarningAlert = false"></el-alert>
      	</template>
        <el-form-item><span>商品编号：No{{showGoodsId}}</span>
          <el-input class="skuIdInput" placeholder="按规格ID搜索" auto-complete="off" size="samll"
          	v-model.trim="searchSkuId">
          	<el-button slot="append" icon="el-icon-search" @click="clieckSearchAttrList"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <table class="table-strip-ls table-dialog">
        <thead>
        	<tr>
            <td v-for="title in attrTitles" :key="title">{{title}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attr in attrList">
            <td v-for="(item,index) in attr" :key="item">
            	<p v-if="index==2">
            		<input type="number" style="width: 70px;text-align: center;"  name="" :id="'sku_'+attr[0]" :value="item" @blur="saveEdit(attr[0])" />
            	</p>
            	<p v-else>{{item}}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="colseEditNum">关 闭</el-button>
      </div>
    </el-dialog>
<el-dialog
  title="扫码真知码"
  :visible.sync="viewCodeDialog"
  width="400px"
>
    <img class="code-img" :src="codeSrc" alt="">
    <p class="code-num">{{codeValue}} <br>
      <el-button type="text" @click="downloadCode(currentSelectedId)">下载电子码码图</el-button>
    </p>
    <p class="code-tip">
      建议使用真知码APP或码上花APP扫码
    </p>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="viewCodeDialog = false">取 消</el-button> -->
    <el-button type="primary" @click="viewCodeDialog = false">关 闭</el-button>
  </span>
</el-dialog>
<el-dialog
  title="商品绑码详情"
  :visible.sync="editCodeDialog"
  width="560px"
>
    <ul class="code">
      <li v-for="item in codeList" :key="item.name" class="code-item">{{item.name}}
        <i class="el-icon-circle-close reduce-code" @click="removeCode(item)"></i>
      </li>
    </ul>
    <el-input v-model="toBeAddedCode" @keyup.enter.native="addCode" @blur="checkCodeVal" class="input-normal" placehoder="请输入16位真知码码值"></el-input>
    <el-button type="text" @click="addCode" >
      添加码值
      <!-- <i class="el-icon-circle-plus-outline"></i> -->
      </el-button>
    <p class="error">{{codeError}}</p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editCodeDialog = false">取 消</el-button>
    <el-button type="primary" @click="submitEditCode" :loading="isBindingCode">提 交</el-button>
  </span>
</el-dialog>
  </div>
  </div>
</template>
<script>
  import * as Service from '@/common/service/goods/index.js';
  import * as SourceApi from '@/common/service/goods/source.js';
  import {httpService,api} from '@/common/http/http.js';
  const getInitSearchForm = () => {
    return {
      goodsName: '',
      priceRange1: '',
      priceRange2: '',
      sellCountRange1: '',
      sellCountRange2: '',
      brandName: '',
      createDate: '',
      modifyDate: '',
    }
  };
  const getMultiStatus = (num, setVal = false) => {
    return new Array(num).fill(setVal);
  };
  export default {
    data() {
      return {
      currentSelectedId: '',
      	showWarningAlert:false,
        dialogFormVisible: false,
        multiOperation: true,
        multiOperationAll: false,
        isIndeterminate: false,
        attrList:[],
        attrTitles:[],
        showGoodsId:'',
        searchSkuId:'',
        hasSource: true,//是否可管理溯源信息,
        viewCodeDialog: false, // 是否显示查看码图弹窗
        codeSrc: '',
        codeValue: '',
        editCodeDialog: false, // 是否显示编辑码值弹窗,
        toBeAddedCode: '',//码值输入框
        codeError: '',//码错误输入提示
        codeList: [
        //  {name: '1234567890123451', id: 1},
          //{name: '1234567890123452', id: 2},
          //{name: '1234567890123453', id: 3},
        ],
        oriCodeList: [],
        multiSelections: [{
            name: '批量删除',
            type: 'del',
            hide:false,
          },
          {
            name: '批量上架',
            type: 'on',
            hide:false,
          },
          {
            name: '批量下架',
            type: 'down',
             hide:false,
          },
          {
            name: '批量下载码图',
            type: 'downloadCode',
            hide:false,
          },
        ],
        multiGoodsStatus: getMultiStatus(10),
        goodsStatus: '',
        searchForm: getInitSearchForm(),
        preSearchForm: getInitSearchForm(),
        dataList: [],
        page: {
          currentPage: 0,
          pageSize: 10,
          totalPage: 0,
          totalRecord: 0
        },
        count: {
          upCount: '',
          downCount: '',
          allCount: ''
        },
        //是否正在绑码
        isBindingCode: false
      }
    },
    watch: {
      multiGoodsStatus: function (val) {
        if (val.every(x => x === true)) {
          this.multiOperationAll = true;
          this.isIndeterminate = false;
        } else if (val.every(x => x === false)) {
          this.multiOperationAll = false;
          this.isIndeterminate = false;
        } else {
          this.isIndeterminate = true;
          this.multiOperationAll = false;
        }
      }
    },
    methods: {
    	colseEditNum(){
    		 this.getList();
    		this.dialogFormVisible = false;
    	},
    	saveEdit(skuId){
    		let num = document.getElementById('sku_'+skuId).value;
    		console.log(num)
    		if(num<0){
    			this.$message.error('库存不能小于0');
    			return false;
    		}
    		let opt = {
    			skuId:skuId,
    			num:num
    		}
    		this._saveInventory(opt);

    	},
      // 上下架商品
      dealGoods(ids, index, toGoodsStatus) {
        console.log('上下架商品操作 ', ids,  index, toGoodsStatus)
        // 状态为0时表示下架商品,状态为1时表示下架商品
        let requestService = toGoodsStatus == 1 ? 'setGoodsUp' : 'setGoodsDown';
        (Service[requestService])({
          ids
        }).then(res => {
          this.getCount();
          this.getList();
        }).catch(res => {
          this.$message.error(res.message);
        });
      },
      // 删除条目
      deleteItem(ids, tipInfo) {
        this.$confirm(tipInfo ? tipInfo : '确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Service.deleteGoods({
              ids
            })
            .then(res => {
              this.getCount();
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功'
              });
            }).catch(res => {
              this.$message.error(res.message);
            })
        }).catch(() => {
          this.$message('已取消删除');
        });
      },
      multiDeal(type) {
        let selectedItems = [];
        this.multiGoodsStatus.forEach((x, index) => {
          if (x) {
            selectedItems.push(this.dataList[index].goodsId);
          }
        });
        if (selectedItems.length === 0) {
          this.$message('请选择商品');
          return;
        }
        let ids = selectedItems.join(',');
        if (type === 'del') {
          this.deleteItem(ids, '确定删除所选' + selectedItems.length + '项商品吗?');
        } else if(type === 'downloadCode') {
          this.downloadCode(ids);
        } else {
          this.dealGoods(ids, null, type === 'on' ? 1 : 0);
        }

      },
      handleCommand(command) {
        if (command.type === 'del') {
          this.deleteItem(command.item.goodsId, '确定删除商品【' + command.item.goodsName + '】吗?');
        } else {
         this.gotoEditGoods(command.item.goodsId);
          console.log('copy or edit ', command.item);
        }
      },
      // 编辑商品信息
      gotoEditGoods(id){
          this.$router.push(
            {
              path:'/goods/list/edit',
              query: {id}
            }
          )
      },
      // 编辑商品溯源信息
      gotoEditSource(id){
         this.$router.push(
            {
              path:'/goods/source',
              query: {id}
            }
          )
      },
      // 下载码图
      downloadCode(ids){
        console.log('download picture');
        let user = JSON.parse(localStorage.getItem("user"));
        window.location.href=httpService+api.sourceDownGoodsCode+"?accessToken="+user.accessToken+"&ids="+ids;
        /*SourceApi.sourceDownGoodsCode({'ids':ids})
          .then(res => {
            console.log(res);
          })
          .catch(res => {
            this.$message({type:'error', message:res.message});
          });*/
      },
       // 查看码图
      viewCode(id){
        console.log('view picture');
        this.currentSelectedId=id;
        SourceApi.viewCode({'productId':id})
          .then(res => {
            this.codeSrc = res.image;
            this.codeValue = res.code;
            this.viewCodeDialog = true;
          })
          .catch(res => {
            this.$message({type:'error', message:res.message});
          });
      },
       //检查码值是否输入合法
      checkCodeVal(){
        let promise = new Promise((resolve,reject)=>{
               if(!this.toBeAddedCode){
          return;
        }
        if(!/^\d{16}$/.test(this.toBeAddedCode)){
          this.codeError = '请输入16位真知码码值';
          resolve(false);
          } else if(this.codeList.find(x=>x.name===this.toBeAddedCode)){
          this.codeError='请勿添加重复的码值';
          resolve(false);
        } else {
          SourceApi.checkCode({zcode: this.toBeAddedCode}).then(res => {
            console.log('get check result ', res);
            if(!res){
            	this.codeError='该码值已被占用';
            }
             resolve(res);
          }).catch((res)=>{
             reject(res);
          });
        }
        });
        return promise;
   
          // return true;

      },
      //添加码值
      addCode(){
        console.log('add code to list ');
        this.checkCodeVal().then(res => {
         if(!res){
          return false;
        }
        this.codeError = '';
        this.codeList.push({
          name: this.toBeAddedCode, id: ''
        });
        this.toBeAddedCode='';
        }).catch((res)=>{
          this.$message.error(res.message||'验证出错,请重试');
        });
    
      },
      // 删除码值
      removeCode({name}){
        this.codeList = this.codeList.filter(x=>x.name!==name);
      },
       // 编辑码值
      editCode(id){
        console.log('edit code');

        this.currentSelectedId=id;
         this.toBeAddedCode='';
         //获取已绑定码值信息
         this.codeList = [];
         SourceApi.viewCodeList({productId: id}).then(res=>{
           console.log('get code list ', res);
            this.codeList = res.map(x=>{
              return {name:x};
            });
             this.oriCodeList = res.map(x=>{
              return {name:x};
            });
           this.codeError = '';
           this.editCodeDialog = true;
         }).catch(res=>{
           this.$message.error(res.message);
         });
        
      },
      submitEditCode(){
        //提交编辑后的码值
        console.log('submit code ', this.codeList);
        let zcode = [...this.codeList];
        let unbind = [];
        this.oriCodeList.forEach(x => {
          let reserveCode = this.codeList.find(y => y.name === x.name);
          if(reserveCode){
           zcode = zcode.filter(z=>z.name!==x.name);
          } else {
            unbind.push(x);
          }
        });
        let params = {
            productId:this.currentSelectedId,
            zcode:zcode.map(x=>x.name).join(','),
            unBind: unbind.map(x=>x.name).join(','),
        };
        console.log('params ', params, zcode, unbind);
        if((!params.zcode)&&(!params.unBind)){
          //this.editCodeDialog = false;
           // this.$message.success('操作成功'); 
            this.$message.error('请添加码值');
            
            return;          
        }
        this.isBindingCode = true;
        Service.goodsBindCode(params).then(res=>{
                    this.$message.success('操作成功');                
                    this.editCodeDialog = false;

        }).catch(res=>{
        this.$message.error(res.message);
        }).finally(()=>{
          this.isBindingCode = false;
        });
      },
      selectAll(val) {
        console.log('全选： ', val);
        this.multiGoodsStatus = getMultiStatus(this.dataList.length, val);
      },
      // 用户点击搜索按钮
      onSubmit() {
        this.searchForm = Object.assign({}, this.preSearchForm);
        this.page.currentPage = 1;
        this.getList();
      },
      // 用户点击重置按钮
      onReset() {
        this.page.currentPage = 1;
        this.preSearchForm = getInitSearchForm();
        this.searchForm = getInitSearchForm();
        this.getList();
      },
      // 用户切换每页显示条数时执行方法
      handleSizeChange(val) {
        this.page.currentPage = 1;
        console.log(`每页 ${val} 条`);
        this.page.pageSize = val;
        // this.multiGoodsStatus = getMultiStatus(val);
        this.getList();
      },
      //用户点击页数时执行方法
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page.currentPage = val;
        this.getList();
      },
      setGoodStatus(val) {
        this.page.currentPage = 1;
        this.goodsStatus = val;
        this.getList();
      },
      // 获取商品列表内容
      getList() {
        let params = {
          // goodsName: '',
          // brandName: '',
          // createDate: '',
          // modifyDate: '',
          goodsStatus: this.goodsStatus,
          platform: 'sg',
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        };
        params = Object.assign({}, params, this.searchForm);
        params.createDate = params.createDate && (params.createDate).getTime();
        params.modifyDate = params.modifyDate && (params.modifyDate).getTime();
        console.log(params);
        Service.queryGoodsList(params).then(res => {
          console.log('get list ', res);
          this.dataList = res.data.map(x=>{
            x.goodsStatus=x.goodsStatus+'';
            return x;
          });
          console.log('dataList ',this.dataList);
          this.page.totalPage = res.totalPage;
          this.page.currentPage = res.currentPage;
          this.page.pageSize = res.pageSize;
          this.page.totalRecord = res.totalRecord;
          this.multiGoodsStatus = getMultiStatus(this.dataList.length);
        }).catch(res => {
          this.$message.error(res.message);
        })
      },
      // 获取全部、已上架、未上架商品数量,在用户执行完（批量）上下架或删除时都均执行
      getCount() {
        Service.queryGoodsCount().then((res) => {
          this.count = res;
        });
      },
      //显示规格明细弹层
      showAttrDetail(_goodsId,_showFlag){
      	//console.info(_goodsId+"showAttrDetail"+_showFlag);
      	this.dialogFormVisible = _showFlag;
      	this.showGoodsId = _goodsId;
      	this.doSearchAttrs();
      },
      //根据规格编码搜索函数
      doSearchAttrs(){
      	let params = {
          goodsId: this.showGoodsId,
          skuId:this.searchSkuId
        };
      	Service.getGoodsStockAttrs(params).then(res=>{
          //console.log(res);
          this.attrTitles = res.attrTitles;
          this.attrList = res.attrList;
        }).catch(res => {
        	this.attrList = [];
          this.$message.error(res.message);
        })
      },
      //点击搜索规格
      clieckSearchAttrList(){
				var reg = /^[0-9]*$/;
  			if (reg.test(this.searchSkuId)) {
  				this.showWarningAlert=false;
					this.doSearchAttrs();
  			}else{
//				this.$alert("规格ID只能输入数字", '提示', {
//	          confirmButtonText: '确定'
//	        });
					this.showWarningAlert=true;
  			}
      },
      //关闭弹层重置之前的商品参数
      closeAttrDialog(){
      	//console.info("closeAttrDialog");
      	this.showGoodsId = "";
      	this.searchSkuId = "";
      	this.showWarningAlert=false;
      },
      addGoods(){
      		 this.$router.push('/goods/publish');

      },
      toEditEntInfo(){
					this.$router.push({
							path:'/account/constructionBank_detail?type=N'
					});	      	
      },
      _saveInventory(opt){
      	Service.saveInventory(opt).then((res)=>{
      		this.$message({
      			type:'success',
      			message:'修改成功'
      		})  

      	}).catch((res)=>{
      		this.$message({
      			type:'error',
      			message:res.message
      		})
      	})
      }
    },
    mounted() {
      // 初始化页面
      this.getCount();
      this.getList();
    }
  }

</script>
<style lang="scss" scoped>
  //  @import '../../index.scss';
  .multiOperation {
    // text-align: right;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 28px;
  }
	.tsMessage{
		font-size: 14px;
		margin-left: 20px;
		height: 40px;
		line-height: 40px;
		text-align: center;
    background-color: #fef0f0;
    color: #f56c6c;
	}
  .fr {
    float: right;
  }

  td i {
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }
  .table-product{
    border-top:1px solid #e9e9e9;
  }
.table-product tbody td{
  &.t1{
    width: 260px;
  }
  &.t2{
    width: 60px;
  }
  &.t8{
    width: 90px;
    text-align: center;
  }
  &.t10{
    width: 80px;
    .btn-handle{

      width: 25px;
      font-size: 16px;
    }
  }
}

  .product-name {
    display: inline-block;
    word-break: break-all;
    text-align:left;
    width: 170px;
    margin-left: 5px;
    line-height: 20px;
    vertical-align: middle; // display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    &:hover {
      color: $color-primary;
      cursor: pointer;
    }
  }

  .product-img {
    display: inline-block;
    vertical-align: middle;
    width: 54px;
    height: 54px;
  }


  .el-form-item__label {
    width: 70px;
    text-align: right;
  }

  .input-normal,
  .el-date-editor.el-input.input-normal,
  .el-date-editor.input-normal.el-input__inner {
    // width: 191px;
    width: 171px;
  }

  .input-short {
    width: 70px;
  }


  .link {
    display: inline-block;
    text-align: center;
    width: 31px;
    font-size: 14px;
  }

  .search-form-inline .el-form-item {
    margin-bottom: 10px;
  }

  .search-form-inline {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .el-dropdown {
    vertical-align: middle;
    font-size: 12px;
    color: $color-heavy;
  }
.table-dialog{
  width: 880px;
}
.skuIdInput{
	width: 400px;
	/*height:15px;*/
	margin-left:20px;
}
.code-img{
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 290px;
}
.code-num{
  text-align: center;
}
.code-tip{
  margin-top: 25px;
  color: $color-light;
  text-align: center;
}
.reduce-code{
  cursor: pointer;
  margin-left: 5px;
  &:hover{
    color: $color-primary;
  }
}
.code{
  margin-bottom: 20px;
  .code-item{
    width: 220px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 12px;
    font-size: 18px;
  }
}
.error{
  margin-top: 10px;
  color: $color-error;
}
.table-strip-ls tbody .btn-handle{
  width: auto;
  padding: 8px;
  &.is-primary{
    color: $color-primary;
  }
}
</style>
