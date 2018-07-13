<template>
  <div class="basic sub-block">

    <el-form ref="ruleForm" label-width="120px" class="demo-ruleForm">
     <el-form-item label="商品分组" prop="type" v-show="false" >
        <!-- <p class="com-tip">
          为了让用户更好的在店铺内检索商品及做新品推广建议设置并选择商品分组 -->
    <!--<div class="firstCategory">
              <el-button type="text" @click="handleNewFirst" v-show="!isNewFirst">新建分组</el-button>
           <div class="firstCategoryInput" v-show="isNewFirst">
          <el-input class="input-short" size="mini" v-model="newFirst"></el-input>
        <el-button type="primary" @click="saveNewFirst" size="mini">保存</el-button>  
        <el-button size="mini" @click="isNewFirst=false;">取消</el-button> 
        </div> 
           </div>-->
        <!-- </p> -->
          
        <el-tree :data="data" node-key="id" :default-expanded-keys="expandedKeys" 
        :expand-on-click-node="false" 
        :props="defaultProps" show-checkbox ref="tree" @check-change="handleCheckChange" 
        :render-content="renderContent" ></el-tree>
      
      </el-form-item>
      <el-form-item label="商品关键词">
        <el-input placeholder="请填写商品关键词（以半角逗号隔开），以便用户更好地搜索到该商品" v-model="basicInfo.productKeywords"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//   import * as Service from '@/common/service/goods/goods.js';

 import {
    getStoreCategory
  } from '@/module/store/service.js';
  import {storeAddCategory} from '@/module/store/service.js';
  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        newFirst: '',
        isNewFirst: false,
        expandedKeys: []
      }
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
         initCategory: {
        type: Array,
        default:()=>{
          return []
        }
      },
    },
    methods: {
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate, ' getCheckedKeys ', this.getCheckedKeys());
      },
      setCheckedKeys(val) {
        this.$refs.tree.setCheckedKeys(val);
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
        return this.$refs.tree.getCheckedKeys();
      },
        renderContent(h, { node, data, store }) {
          console.log('render , ', h, node, data, store);
          if(node.level===2){
            return (
                <span class="treeUpdate">
            <span>
              <span>{node.label}</span>
            </span> </span>);
            
          }
        return (
          <span class="treeUpdate">
            <span>
              <span>{node.label}</span>
            </span>
            <span class="handle">
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.addSub(node, data, store) }>添加子分组</el-button>
            </span>
          </span>);
      },
      handleNewFirst(){
        this.isNewFirst = true;
      },
      addSub(node, data, store){
        let vm = this;
        console.log('edit ', node, data, store);
        // return;
          this.$prompt('请输入添加到【'+data.label+'】的子分组名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {         
         const storeKeys = vm.getCheckedKeys();
          vm.addStoreCategory(data.id,value).then(res=>{
          console.log('saveNewSecond success ', res);
          vm.data.find(x=>x.id===data.id).children.unshift({
              label: res.name,
              id: res.id,
              children: []}
         );
         vm.$nextTick(()=>{
           vm.expandedKeys = [data.id];
           vm.setCheckedKeys(storeKeys);
         });
         console.log('vm data ', data);
        });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
        
      },
      saveNewFirst(){
        let vm = this;
         const storeKeys = vm.getCheckedKeys();
        let categoryName = vm.newFirst;
        vm.addStoreCategory('',categoryName).then(res=>{
          console.log('saveNewFirst success ', res);
          vm.data.unshift({
              label: res.name,
              id: res.id,
              children: []}
         );
         vm.$nextTick(()=>{
           vm.setCheckedKeys(storeKeys);
         });
          vm.isNewFirst = false;
        });
      },
      addStoreCategory(pid,categoryName){
        let params = {
          pid,
          categoryName
        };
        let promise = new Promise((resolve,reject)=>{
          storeAddCategory(params).then(res=>{
          console.log(res);
          resolve(res);
        }).catch(res=>{
          this.$message.error(res.message);
        });
        });
        return promise;

      }
    },

    mounted(){
      let vm = this;
      getStoreCategory().then(res => {
        console.log('get store getStoreCategory ', res);
        res.forEach((x, index) => {
          let one = {
            label: x.name,
            id: x.id,
            children: x.childList.map(y => {
              return {
                label: y.name,
                id: y.id
              }
            })
          }
          vm.data.push(one);

        });
        vm.$nextTick(() => {
          vm.setCheckedKeys(vm.initCategory.map(x => x.categoryId));
        })
      })
    }}

</script>
<style lang="scss">
.handle{
  display: none;
}
.treeUpdate{
  flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;
&:hover{
  .handle{
  display: inline;
}
}
}
.com-tip{
  position: relative;
}
.firstCategory{
//   display: inline-block;
// position: absolute;
// right: 0;
text-align: right;
}
.input-short{
  width: 120px;
  margin-right: 10px;
}
</style> 
