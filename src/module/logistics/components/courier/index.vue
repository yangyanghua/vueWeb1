<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">物流管理</el-breadcrumb-item>
        <el-breadcrumb-item>快递商管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <table class="table-strip-ls">
      <thead>
        <tr>
          <td>默认物流公司</td>

          <td class="w130">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
              <ul class="title">
                <li v-for="courier in dataList">
                  {{courier.name}}
                </li>
              </ul>
          </td>
          <td>
            <el-button type="text" class="btn-handle" @click="showToggle"> 设置
            </el-button>
          </td>
        </tr>
        <tr v-show="isShow">
          <td>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="顺丰快递"></el-checkbox>
                <el-checkbox label="邮政EMS"></el-checkbox>
                <el-checkbox label="圆通快递"></el-checkbox>
                <el-checkbox label="申通快递"></el-checkbox>
                <el-checkbox label="中通快递"></el-checkbox>
                <el-checkbox label="汇通"></el-checkbox>
                <el-checkbox label="韵达"></el-checkbox>
                <el-checkbox label="海航天天"></el-checkbox>
                <el-checkbox label="宅急送"></el-checkbox>
                <el-checkbox label="优速快递"></el-checkbox>
                <el-checkbox label="德邦物流"></el-checkbox>
                <el-checkbox label="国通快递"></el-checkbox>
                <el-checkbox label="全一快递"></el-checkbox>
                <el-checkbox label="邮政小包"></el-checkbox>
                <el-checkbox label="香港邮局"></el-checkbox>
                <el-checkbox label="快捷快递"></el-checkbox>
                <el-checkbox label="国通快递"></el-checkbox>
                <el-checkbox label="丰达快递"></el-checkbox>
                <el-checkbox label="快捷快递"></el-checkbox>
                <el-checkbox label="全峰快递"></el-checkbox>
                <el-checkbox label="中铁快运"></el-checkbox>
                <el-checkbox label="中通速递"></el-checkbox>
                <el-checkbox label="百世快递"></el-checkbox>
                <el-checkbox label="安信达快递"></el-checkbox>
                <el-checkbox label="顺丰速运快递"></el-checkbox>
                <el-checkbox label="百事可乐全球快递"></el-checkbox>
                <el-checkbox label="金大物流"></el-checkbox>
                <el-checkbox label="其他"></el-checkbox>
              </el-checkbox-group>
          </td>
          <td>
            <el-button type="text" class="btn-handle" @click="editDetail(entry.id)"> 保存
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import {getBrandRecommendList,delBrandRecommend} from '../../service.js';
  export default {
     data(){
      return {
        dataList:[
          {
            name:'顺丰快递'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'邮政EMS'
          },
          {
            name:'圆通快递'
          }
        ],
        isShow: false,
        checkList: []
      }
     },
     methods:{  
        showToggle:function(){  
            this.isShow =! this.isShow  
        }  
      }    
  }

</script>
<style lang="scss" scoped>
  .title{
    clear: both;
    li{
      float: left;
      margin:5px;
      width:120px;
    }
  }
  .table-strip-ls tbody td{
    height:auto;
  }
  .table-strip-ls tbody tr:nth-child(even) td{
    background:#fff;
    text-align: left;
  }
  .table-strip-ls tbody tr:nth-child(even) td:last-child{
    text-align: center;
  }
  .table-strip-ls tbody .btn-handle{
    color:#F26749;
  }
  .courierTer{
    clear: both;
    height: auto;
  }
  .el-checkbox{
    width:120px;    
  }
  .el-checkbox:first-child{
    margin-left: 30px;;
  }
</style>
