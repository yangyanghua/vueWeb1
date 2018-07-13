<template>
  <div class="sub-block">
    <el-form label-width="120px" class="demo-ruleForm">

      <el-form-item label="商品属性">
        <p class="com-tip">
          商品属性有单位的需填写属性的单位 每项属性20个字以内。
        </p>
        <el-form :inline="true">
          <el-form-item class="propertyItem" v-for="(item,index) in goodsPropertyParams" :key="index">
            <span class="attributeName" v-if="item.proBase.state=='0'" :title="item.proBase.name">{{item.proBase.name}}</span>
            <el-input class="attributeName" size="mini" v-if="item.proBase.state=='1'" v-model="item.proBase.name"></el-input>
            <el-input class="attributeValue" size="mini" v-model="item.proValue.name"></el-input>
            <el-button type="text" v-if="item.proBase.state=='1'" @click="deleteItem(index)">
              <i class="el-icon-circle-close"></i>
            </el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="text" @click="addNewAttribute">添加</el-button>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="支付方式" required>

        <el-radio v-model="freightInfo.paymentMethod" label="1">
          在线支付
        </el-radio>
      </el-form-item>
      <el-form-item label="配送方式" required>
        <el-radio v-model="freightInfo.deliveryMethod" label="2">
          快递配送
        </el-radio>
        <el-radio v-model="freightInfo.deliveryMethod" label="1">
          客户自提
        </el-radio>
        <el-radio v-model="freightInfo.deliveryMethod" label='3'>
          电子商品，无需物流
        </el-radio>
      </el-form-item>
      <el-form-item label="运费设置" required>
        <el-radio v-model="freightInfo.freightAffordBy" label="2">
          卖家承担运费
        </el-radio>
        <el-radio v-show="freightInfo.deliveryMethod!=='3'" v-model="freightInfo.freightAffordBy" label="1"> 买家承担运费</el-radio>
        <el-form :model="freightInfo" :rules="rules" ref="ruleForm" v-show="freightInfo.deliveryMethod!=='3'&& freightInfo.freightAffordBy!=='2'"
          class="extra-freight-info">
          <el-form-item class="info-item" prop="freightRuleId">
            <span class="star-icon">*</span> 运费模板
            <el-select v-model="freightInfo.freightRuleId" class="mgr10">
              <el-option v-for="item in templates" :label="item.ruleName" :key="item.id" :value="item.id"></el-option>
            </el-select>
            <el-button type="text" @click="refreshTemplate">刷新</el-button>
            <i class="btnsplit"></i>
            <el-button type="text">
              <a class="linkAddress" href="#/logistics/template_detail" target="_blank">新建</a>
            </el-button>
          </el-form-item>
          <el-form-item class="info-item" prop="grossWeight" v-show="showGrossWeight">
            <span class="star-icon">*</span> 商品重量
            <el-input class="goods-weight" v-model="freightInfo.grossWeight"></el-input> KG
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="7天退换货" required>
        <el-radio v-model="freightInfo.support7daysExchange" label="1">
          支持
        </el-radio>
        <el-radio v-model="freightInfo.support7daysExchange" label='0'> 不支持</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import * as Service from '@/common/service/logistics/index.js';

  export default {
    data() {
      var checkWeight = (rule, value, callback) => {
        console.log(rule, value);
        let reg = /^\d+(\.\d{1,2})?$/;
        if (value === '') {
          return callback(new Error('请填写商品重量'));
        } else if (!reg.test(value)) {
          callback(new Error('请输入数字，最多保留小数点后两位'));
        } else {
          callback();
        }
      };
      return {
        templates: [],
        rules: {
          grossWeight: [{
            validator: checkWeight,
            trigger: 'blur',
          }],
          freightRuleId: [{
            required: true,
            trigger: 'change, blur',
            message: '请选择运费模板'
          }]

        },
        oriGrossWeight: '0',//原始重量
        // paymentMethod: '1',
        // deliveryMethod: '1',
        // freightAffordBy: '1',
        // support7daysExchange: '1'
      }
    },
    computed: {
      showGrossWeight: function () {
        let showWeight = false;
        let vm = this;
        if (vm.freightInfo.freightAffordBy === '1') {
          let freight = vm.freightTemplateRules.find(x => x.id === vm.freightInfo.freightRuleId);
          // console.log('showGrossWeight ', freight, freight.type === 'W');
          if (freight) {
            console.log('find freight ', freight);
            if (freight.type === 'W') {
              //所选模板为按重量模板，需用户输入商品重量
              showWeight = true;
            } else {
              showWeight = false;
            }
          }
        }
        console.log('showWeight computed ', showWeight);
        return showWeight;
      }
    },
    props: {
      goodsPropertyParams: {
        required: true,
        type: Array,
        default: []
      },
      next: {
        type: Function,
        required: true,
      },
      freightTemplateRules: {
        type: Array
      },
      freightInfo: {
        type: Object,
        required: true
      },
      saveGoods: {
        type: Function
      }
    },
    mounted() {
       this.oriGrossWeight = this.freightInfo.grossWeight;      
      this.templates = this.freightTemplateRules;
    },
    watch: {
      'freightInfo.deliveryMethod': function (val) {
        if (val === '3') {
          this.freightInfo.freightAffordBy = '2';
        }
      }
    },
    methods: {
      checkForm() {
        if (this.freightInfo.freightAffordBy === '2') {
          return true;
        }
        if (this.freightInfo.freightRuleId && !this.showGrossWeight) {
          this.freightInfo.grossWeight = this.oriGrossWeight ;
          return true;
        }
        let result = false;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            result = true;
          } 
        });
        console.log('check other ', result);
        return result;
      },
      refreshTemplate() {
        let params = {
          name: '',
          pageSize: 1000,
          currentPage: 1
        };
        Service.templateList(params).then(res => {
          this.templates = res.content;
        }).catch(res => {
          this.$message.error(res.message);
        })
      },
      deleteItem(index) {
        this.goodsPropertyParams.splice(index, 1);
      },
      addNewAttribute() {
        this.goodsPropertyParams.push({
          proBase: {
            // id: '99999'+new Date().getTime()+Math.floor(Math.random*1000),
            id: '',
            name: '',
            state: 1
          },
          proValue: {
            name: ''
          }
        })
      },
    }

  }

</script>
<style lang="scss" scoped>
  .attributeName {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    vertical-align: top;
  }

  .attributeValue {
    width: 140px;
  }

  .propertyItem {
    width: 250px;
    position: relative;

    .el-icon-circle-close {
      position: absolute;
      top: 15px;
      right: -15px;
    }
  }

  .linkAddress {
    color: $color-primary;
  }

  .extra-freight-info {
    display: inline-block;
    margin-left: 30px;
    width: 400px;
    vertical-align: top;
  }

  .goods-weight {
    width: 200px;
    margin-right: 10px;
  }

  .info-item {
    margin-bottom: 18px;
  }

  .star-icon {
    color: #f56c6c;
  }

</style>
