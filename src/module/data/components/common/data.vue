<template>
  <div>

    <table class="table-strip-ls u-table">
      <thead>
        <tr>
          <td>{{firstColumn.name}}</td>
          <td v-for="item in dataList" :key="item.name" v-show="checkList.includes(item.name)">
            {{item.name}}  <div class="sortGroup"><i class="el-icon-sort-up"></i>
            <i class="el-icon-sort-down"></i></div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brandRecommend in dataList" :key="brandRecommend.id">
          <td>{{firstColumn.value}}</td>
          <td v-for="item in dataList" v-if="checkList.includes(item.name)" :key="item.name">123</td>
        </tr>
        <tr v-if="dataList.length===0">
          <td colspan="6" class="com-nodata">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <el-checkbox-group v-model="checkList" class="itemList">
      <el-checkbox class="checkbox" v-for="item in dataList" :label="item.name" :key="item.name">{{item.name}}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        checkList: ['浏览量', '访客数', '收藏数', '访客数', '转化率', '加入购物车次数', '订单数', '订单金额', '支付数'],
      }
    },
    props: {
      dataList: {
        type: Array,
        default: []
      },
      firstColumn: {
        type: Object,
        default: {}
      }
      //   checkedColumn: {
      //     type: Array,
      //     default: []
      //   }
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
      &:last-child{
        margin-right: 0;
      }
    }

  }

    .el-checkbox:last-child{
        margin-right: 0;
      }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }

</style>
