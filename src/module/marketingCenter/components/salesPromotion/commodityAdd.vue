<template>
  <div class="main commodityAdd">
    <div class="crumbs">
      促销管理
    </div>
    <div class="subject">
      <div class="filter_query mat20">

        <div class="form">
          <el-form ref="ruleForm" :model="form" :rules="rules2" label-width="100px">
            <el-form-item label="活动类型：">
              {{active}}
            </el-form-item>
            <el-form-item prop="name" label="活动名称：" required>
              <el-input v-model="form.name" :maxlength="30"  placeholder="30个字符以内" :disabled="isOnlyView"></el-input>
            </el-form-item>
            <el-form-item v-if="couponName!=='XSZK'" label="优惠方式：" size="medium" required prop='promoMethod'>
              <el-select v-model="form.promoMethod" placeholder="全部" :disabled="isnotNew" style="width:250px;">
                <el-option label="减现金" value="JXJ"></el-option>
                <el-option label="打折扣" value="DZK"></el-option>
               <!--  <el-option label="包邮" value="BY"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间：" required>
              <!--:error="errorMag"-->
              <el-form-item prop="effectiveFrom" style="float: left;">
                <el-date-picker :picker-options="pickerBeginDateAfter" :disabled="isnotNew" class="mgr10" v-model="form.effectiveFrom" type="datetime" placeholder="开始日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item style="float: left; margin-right:15px;">至</el-form-item>
              <el-form-item prop="effectiveTo" style="float: left;">
                <el-date-picker :picker-options="pickerBeginDateAfter" :disabled="isnotNew" class="mgr10" v-model="form.effectiveTo" type="datetime" placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="活动说明：" >
              <el-input type="textarea" v-model="form.content" :disabled="isOnlyView"></el-input>
            </el-form-item>
            <el-form-item>
              <div v-show="couponName!=='XSZK'">
                <table class="table-strip-ls">
                  <tbody>
                    <tr v-for="(item,index) in form.ruleItem ">
                      <!-- <td>
                        <el-checkbox class="sp_left " v-model="item.checked" :disabled="isOnlyView||canNotEditFee">包邮</el-checkbox>
                        <span class="sp_left p_mat10" v-show="item.checked">
                          <el-button type="text" class="btn-handle" @click="editArea(index,item)"> 选择不包邮地区</el-button>
                        </span>
                        <span class="sp_left p_margin10" v-show="item.showName">{{'('+item.showName+')'}}</span>
                      </td> -->
                      <td width="300">单笔订单满
                        <el-input size="mini" class="input_mini" :disabled="isOnlyView||canNotEditFee" v-model="item.conditions" placeholder=""></el-input>
                        <i>{{($route.query.type=='3'||$route.query.type=='5')?'件':'元'}}</i> , </td>
                      <td width="300" v-show="form.promoMethod!=='BY'">
                        {{form.promoMethod=='DZK'?'打':'减'}}
                        <el-input size="mini" class="input_mini" v-model="item.discount" placeholder="" :disabled="isOnlyView||canNotEditFee"></el-input>{{form.promoMethod=='DZK'?'折':'元'}}</td>
                      
                      <td width="90" v-show="(form.ruleItem.length!==1)&&!isOnlyView&&!canNotEditFee" >
                        <el-button type="text" class="btn-handle" @click="deleteRuleItem(index)"> 删除</el-button>
                      </td>

                    </tr>
                  </tbody>
                </table>
                <div v-show="errorFee" class="el-form-item__error">
                  {{errorFee}}
                </div>

                <div class="add-area" style="padding-left:20px;" v-show="!isOnlyView&&!canNotEditFee">
                  <i class="el-icon-plus"></i>
                  <el-button type="text" class="btn-handle p_marl10" @click="addItem"> 添加更多优惠层级</el-button>[注：“优惠条件”必须逐级递增]
                </div>
              </div>
            </el-form-item>
            <el-form-item label="优惠商品：" v-show="isAllJoin==='PRODUCT'">
              <el-button type="text" @click="selectProduct">已选择商品({{form.promoProductList.length}})</el-button>
              <el-table v-show="couponName==='XSZK'" ref="multipleTable" :data="this.form.promoProductList" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column width="55">
                </el-table-column>
                <el-table-column label="商品名称" width="120">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column  label="码上花价" width="120">
                   <template slot-scope="scope">{{ scope.row.minPrice==scope.row.maxPrice?scope.row.maxPrice:(scope.row.minPrice+'~'+scope.row.maxPrice) }}</template>
                </el-table-column>
                <el-table-column label="折扣" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.discount" :disabled="isOnlyView"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="折扣价" show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{getdiscountVal(scope.row.minPrice,scope.row.maxPrice,scope.row.discount,scope.row.discount)}}
                  </template>
                </el-table-column>
                <el-table-column label="每人限购" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.quantityLimit" :disabled="isOnlyView"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作	" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteItem(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
 <div v-show="errorProduct" class="el-form-item__error">
                  {{errorProduct}}
                </div>
            </el-form-item>

            <el-form-item style="padding-bottom:20px;">
              <el-button v-show="!isOnlyView" type="primary" @click="save">保存</el-button>
              <el-button @click="$router.go(-1)">{{isOnlyView?'返回':'取消'}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </div>
    <area-select/>
    <product-select/>
  </div>
</template>
<script>
  import * as Service from '@/common/service/marketingCenter/index.js'

  export default {
    data() {
      return {
        isnotNew: true,//true为带id 其它为新建活动
        isOnlyView: true,//仅为查看 
        canNotEditFee: false,//不能修改包邮满件满额等相关内容   
        multipleSelection: [],
        active: '',
        isAllJoin: '',
        couponName: '',
        data: [],
        form: {
          name: '',
          promoProductList: [],
          promoMethod: '',
          effectiveFrom: '',
          effectiveTo: '',
          ruleItem: [{
            'id': '',
            'checked': false,
            'conditions': '',
            'discount': '',
            'showName': '',
            'provinceList': []
          }],
        },
        editStatus: false,
        errorFee: '',
        errorProduct:'',
        rules2: {
          name: [ 
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          promoMethod: [{
            required: true,
            message: '请选择优惠方式',
            trigger: 'blur,change'
          }],
          effectiveFrom: [{
            required: true,
            message: '请选择开始时间',
            trigger: 'blur,change'
          }],
          effectiveTo: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'blur,change'
          }]
        },
        //判断在这之前的时间不能选
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = new Date().getTime() - 24 * 3600 * 1000;
            return time.getTime() < beginDateVal;
          }
        },
      }
    },
    methods: {
      //处理折扣后的数据显示
      getdiscountVal(min, max, discount) {
        if (min === max) {
          return discount ? (parseFloat(max) * parseFloat(discount)) / 10 : max;
        } else {
          return discount ? (parseFloat(min) * parseFloat(discount)) / 10 + '~' + (parseFloat(max) * parseFloat(
            discount)) / 10 : (min + '~' + max);
        }
      },
      //删除商品条目
      deleteItem(index) {
        this.form.promoProductList.splice(index, 1);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //重新选择商品 弹窗确认按钮后的操作
      confirmProductCallback(ids, checkedList) {
        console.log('confirm ', ids, checkedList);
        if(this.isOnlyView){
          return;
        }
        let compareCheckedList = checkedList.map(x => {
          let findVal = this.form.promoProductList.find(z => z.productId === x.id);
          x.productId = x.id;
          x.id = '';
          return findVal ? findVal : x;
        })
        this.$set(this.form, 'promoProductList', compareCheckedList)
      },
      //点击选择商品时的操作
      selectProduct() {
        this.$productSelection.show(this.confirmProductCallback, this.form.promoProductList.map(z => {
          let obj = {
            id: z.productId,
            name: z.name
          }
          return obj;
        }))
      },
      //添加优惠条目
      addItem() {
        this.form.ruleItem.push({
          'id': '',
          'checked': false,
          'conditions': '',
          'discount': '',
          'provinceList': [],
          'showName': ''
        }, )
      },
      //选择不包邮地区的回调函数
      confirmCallback(index) {
          if(this.isOnlyView||this.canNotEditFee){
          return;
        }
        let fn = (checkedList, showName) => {
          console.log('callback ', checkedList, showName);
          this.form.ruleItem[index].provinceList = checkedList;
          this.form.ruleItem[index].showName = checkedList.map(x => x.name).join(',');
          console.log('callback result ', this.form);

        }
        return fn;
      },
      //点击选择不包邮地区时的操作
      editArea(index, item) {
        console.log(index, item);
        //点击包邮时执行
        let provinceList = item.provinceList ? item.provinceList.map(x => x.id) : [];
        this.$selection.show(this.confirmCallback(index), provinceList);
      },
      //删除优惠条目时的操作
      deleteRuleItem(index) {
        this.form.ruleItem.splice(index, 1);
      },
      //点击保存活动
      save() {
        console.log('save: --- \n');
        console.log(this.form);
        console.log('\nparmas: --- \n');
        if (!this.checkForm()) {
          return;
        }
        let params = {
          promoType: this.couponName, //活动类型(促销类型， ALL、XSZK、MEYH、MJYH)
          isAllJoin: this.isAllJoin, //是否全场活动（全店商品参加活动，PRODUCT（部分商品）、SHOP（全店商品））
          name: this.form.name, //活动名称
          promoMethod: this.form.promoMethod || 'DZK', //方式：JXJ-减现金、DZK-打折扣、BY-包邮
          effectiveFrom: this.form.effectiveFrom.getTime(), //开始时间，毫秒数
          effectiveTo: this.form.effectiveTo.getTime(), //结束时间，毫秒数
          content: this.form.content, //活动说明
          promoProductList: [],
          promoRuleList: []


        }


        if (this.isAllJoin === 'PRODUCT') {
          params.promoProductList = this.form.promoProductList.map(z => {
            return {
              productId: z.productId,
              discount: z.discount,
              quantityLimit: z.quantityLimit
            };
          });
        } 
        console.log('shop ', this.isAllJoin,this.couponName);
        if(this.isAllJoin==='SHOP'||this.couponName!=='XSZK') {
          params.promoRuleList = this.form.ruleItem.map(x => {
            let obj = {
              conditions: x.conditions,
              discount: x.discount,
              isDeliverFree: x.checked ? 1 : 0,
              notfreeDistrict: '',
            }
            if (x.provinceList && (x.provinceList.length > 0)) {
              obj.notfreeDistrict = x.provinceList.map(x => x.id).join(',') + '|(' + x.provinceList.map(x => x.name)
                .join(
                  ',') + ')';
            }
            return obj;
          })
        }
        console.log('params:', params);

        // return;

        if (!this.$route.query.id) {
          Service.promoteAdd(params).then(res => {
            // alert('保存成功');
            // 
            this.$router.push('/salesPromotion/');
             this.$message({
                type: 'success',
                message: '新增成功'    /*提示新增成功*/
              });  
          }).catch(res => {
            this.$message.error(res.message);
          })
        } else {
          params.id = this.$route.query.id;
          Service.promoteUpdate(params).then(res => {
            this.$router.push('/salesPromotion/');
            this.$message({
                type: 'success',
                message: '修改成功'    /*提示新增成功*/
              });  
          }).catch(res => {
            this.$message.error(res.message);
          })
        }
      },

      // 初始化页面数据
      init() {
        if (!this.$route.query.id) {
          let type = this.$route.query.type;
          if (type == 1) {
            this.active = '满额优惠 (全店)'
          } else if (type == 2) {
            this.active = '满额优惠 (商品)'
          } else if (type == 3) {
            this.active = '满件优惠 (商品)'
          } else if (type == 4) {
            this.active = '限时折扣'
          } else if (type == 5) {
            this.active = '满件优惠 (全店)'
          }
          this.isAllJoin = this.$route.query.isAllJoin;
          this.couponName = this.$route.query.couponName;
          this.isnotNew = false;
this.isOnlyView = false;
          return; // 新增不用处理
        }
        let params = {
          id: this.$route.query.id
        };
        //传了1表示编辑 传了2表示查看
        this.isnotNew = true;//无论编辑还是查看，都无法修改优惠方式和活动时间
          this.isOnlyView = this.$route.query.edit!=1;//如果是查看,则其它所有的都不可编辑，隐藏保存按钮 只有返回按钮
        // this.onlyView = this.$route.query.edit

        Service.promoteInfo(params).then(res => {
          // this.form = res;
          let start, end;
          this.couponName = res.promoType;
          this.isAllJoin = res.isAllJoin;
          end = res.isAllJoin === 'SHOP' ? ' (全店)' : ' (商品)';
          if (res.promoType === 'XSZK') {
            start = '限时折扣';
            end = '';
          } else if (res.promoType === 'MEYH') {
            start = '满额优惠'
          } else {
            start = '满件优惠'
          }
          this.active = start + end;
          this.form.name = res.name;
          this.form.effectiveFrom = new Date(res.effectiveFrom);
          this.form.effectiveTo = new Date(res.effectiveTo);
          this.form.promoMethod = res.promoMethod;
          this.form.content = res.content;
          console.log(this.form.effectiveFrom.getTime()<(new Date().getTime()));
          if(this.form.effectiveFrom.getTime()<(new Date().getTime())){
            this.canNotEditFee = true;
          }
          this.form.promoProductList = res.promoProductList.map(pitem => {
            pitem.name = pitem.goodsName;
            return pitem;
          });
          this.form.ruleItem = res.promoRuleList.map(x => {
            x.checked = x.isDeliverFree == 1;
            let info = x.notfreeDistrict&&x.notfreeDistrict.split('|')
            if (info && (info.length > 1)) {
              let nameList = info[1].slice(1, -1).split(',');
              x.showName = info[1].slice(1, -1);
              x.provinceList = info[0].split(',').map((z, zindex) => {
                return {
                  id: z,
                  name: nameList[zindex]
                }
              })
            }
            return x;
          })
          console.log('form ', this.form);
        })
      },
      //检查必填项 TODO
      checkForm() {
        let result = false;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            result = true;
          } else {
            // console.log('error submit!!');
            result = false;
          }
        });
        console.log(this.form);
        //检查满XX 
        let checkInt = /^[0-9]{1,9}$/;
        let checkFloat = /^\d{1,7}(\.\d{1,2})?$/;
        //如果是打折扣
        let notPass = false;
        let productnotPass = false;
        if (this.couponName !== 'XSZK') {
          if (this.form.promoMethod === 'DZK') {
            notPass = this.form.ruleItem.some(x => {
              return (!checkFloat.test(x.conditions)) || (!checkFloat.test(x.discount));
            });
          } else if (this.form.promoMethod === 'BY') {
            notPass = this.form.ruleItem.some(x => {
              return (!checkFloat.test(x.conditions));
            });
          } else {
            notPass = this.form.ruleItem.some(x => {
              return (!checkFloat.test(x.conditions)) || (!checkFloat.test(x.discount));
            });
          }
        } else {
          //检查商品的折扣和限购数有没有填
          productnotPass = this.form.promoProductList.some(x=>{
            return (!checkFloat.test(x.discount));
          })
        }
        this.errorFee = notPass ? '请填写正确填写' : '';
        this.errorProduct=productnotPass?'请选择商品并填写折扣':'';
        // return false;
        return result && (!notPass)&& (!productnotPass);
      },


    },
    mounted() {
      this.init();

    }
  }

</script>
<style lang="scss" scoped>
  .freightRules {
    background: #FFF5F3;
    padding: 14px 15px;
    line-height: 24px;
    margin-bottom: 15px;
    p {
      font-weight: 600;
    }
  }

  .input_default {
    width: 85px;
  }

  .input_mini {
    width: 85px;
    margin: 0 10px;

  }

  .table-strip-ls tbody .btn-handle {
    color: #F26749;
  }

  .setUp {
    font-size: 14px;
    padding-bottom: 15px;
  }

  .table-strip-ls {
    margin-bottom: 15px;
    font-size: 14px;
    border-top: 1px solid #ddd;
  }

  .add-area {
    margin-bottom: 15px;
  }

  .el-tree {
    .is-focusable {
      color: red !important;
    }
  }

  .checkList {
    margin-bottom: 20px;
    height: 30px;
    width: 100%; // width: 500px;
    li {
      height: 30px;
      line-height: 30px;
      float: left;
      width: 120px;
      position: relative;
      .el-checkbox+.el-checkbox {
        margin-left: 0;
      }
      .checkBoxItem {
        width: 100%;
        height: 30px;
        position: absolute;
        top: 0;
        left: 0;
        background: white;
        overflow: hidden;
        box-sizing: border-box;
        padding: 5px;
        &.active {
          width: 520px;

          z-index: 10000;
          border: 1px solid gainsboro;
          box-shadow: 0 1px 8px -2px #999999;
          height: auto;
        }
      }

      .optBtn {
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
        &.active {
          transform: rotateZ(180deg);
        }

      }

      .el-checkbox-group {
        overflow: hidden;
      }
      .el-checkbox {
        margin-right: 5px; // width: 100%;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .form {
    padding-top: 20px;
    padding-left: 20px;
    width: 1000px;
  }

  .sp_left {
    display: inline-block;
  }

  .p_margin10 {
    margin-left: 70px;
  }

  .p_mat10 {
    margin-top: 10px;
  }

  .table-strip-ls .el-form-item__content {
    line-height: normal;
  }

  .p_marl10 {
    margin-right: 10px;
    ;
  }

</style>
