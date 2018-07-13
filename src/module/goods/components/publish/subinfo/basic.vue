<template>
  <div class="basic sub-block">
    <el-form :model="basicInfo" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="商品类目" required>
        <span class="is-important">{{selectedCategoryName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="text" @click="goToStep(0)">更改</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="name" required>
        <el-input placeholder="请输入商品名称" v-model="basicInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="productDetails" required>
        <p class="com-tip">
          对商品进行相关描述，建议120字以内
        </p>
        <el-input placeholder="请输入商品描述" v-model="basicInfo.productDetails"></el-input>
      </el-form-item>
      <el-form-item label="品牌关联" prop="brandId" required>
        <el-select v-model="basicInfo.brandId" placeholder="请选择">
          <el-option v-for="item in brandList" :label="item.brandName" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="原产地" >
        <el-input v-model="basicInfo.originPlace"></el-input>
      </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
  import * as Service from '@/common/service/goods/goods.js';
  export default {
    data() {
      return {
        brandList: [],
        rules: {
          name: [{
              required: true,
              trigger: 'change,blur',
              message: '请填写商品名称'
            },
            {
              min: 1,
              max: 40,
              message: '商品名称不能超过40个字符',
              trigger: 'change,blur'
            }
          ],
          brandId: [{
            required: true,
            trigger: 'change,blur',
            type: 'number',
            message: '请选择品牌'
          }],
          productDetails: [{
            required: true,
            trigger: 'change,blur',
            message: '请填写商品描述'
          }]
        }
      };
    },
    props: {
      basicInfo: {
        type: Object,
        required: true,
        default: () => {
          return {
            name: '',
            brandId: '',
            originPlace: '',
            shopCategoryId: ''
          }
        },
      },

      goToStep: {
        type: Function,
        default: () => {
          console.log('gotoStep ');
        }
      },
      selectedCategoryName: {
        type: String,
        default: ''
      }
    },
    methods: {
      checkForm() {
        let result = false;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            result = true;
          } else {
            // console.log('error submit!!');
            return false;
          }

        });
        return result;
      }
    },
    mounted() {
      let vm = this;
      Service.brandList().then(res => {
        vm.brandList = res;
        console.log(res);
      });
    }

  }

</script>
<style lang="scss" scoped>
  .basic {
    width: 720px;

  }

</style>
