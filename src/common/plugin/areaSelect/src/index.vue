<template>
  <el-dialog class="file-dialog" title="不免邮地区" :close-on-click-modal="false" :visible="dialogFormVisible" width="800px" @close="closeDialog">
    <div v-for="(item,index) in dataList" :key="item.id">
      <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange(index)">{{item.name}}</el-checkbox>
      <el-checkbox-group v-model="item.checkedItems" @change="handleCheckedProvinceChange(index)" class="check-group">
        <el-checkbox v-for="province in item.provinces" :label="province.provinceid" :key="province.provinceid">{{province.provincename}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>

    </div>
  </el-dialog>
</template>
<script>
  const inBrowser = typeof window !== 'undefined'
  import {
    mapActions
  } from 'vuex';
  export default {
    name: 'AreaSelect',
    data() {
      return {
        dataList: [],
        canMounted: false,
      };
    },
    computed: {
      dialogFormVisible: function () {
        if (inBrowser) {
          return window.VueAreaSelectEventBus.FILE_DIALOG.showDialog
        } else {
          return false
        }
      },
      initVal() {
        return window.VueAreaSelectEventBus.FILE_DIALOG.initVal.map(x=>parseInt(x));

      }
    },
    watch: {
      'dialogFormVisible': function (val) {
        this.canMounted = val;
        if(val){
           this.init();
        }
      },
    },
    methods: {
      //获取地区数据
      ...mapActions(['getAreaSelectionInfo']),
      //全选时的操作
      handleCheckAllChange(index) {
        let val = this.dataList[index].checkAll;
        console.log('handleCheckAllChange: ', index, val);
        this.dataList[index].checkedItems = val ? this.dataList[index].options : [];
        this.dataList[index].isIndeterminate = false;
      },
      //选择某个地区时的操作
      handleCheckedProvinceChange(index) {
        let value = this.dataList[index].checkedItems;
        console.log('handleCheckedProvinceChange: ', index, value);
        let checkedCount = value.length;
        this.dataList[index].checkAll = checkedCount === this.dataList[index].provinces.length;
        this.dataList[index].isIndeterminate = checkedCount > 0 && checkedCount < this.dataList[index].provinces.length;
      },
      closeDialog() {
        window.VueAreaSelectEventBus.FILE_DIALOG.showDialog = false;
        console.log('close ');
      },
      confirmDialog() {
        let checkedList = [];
        let selectedList = this.dataList.forEach(item => {
          item.checkedItems.forEach(x => {
            let findVal = item.provinces.find(z => x === z.provinceid);
            if (findVal) {
              checkedList.push({
                id: findVal.provinceid,
                name: findVal.provincename
              })
            }
          })
        });
        let result = '';
        if (checkedList.length > 0) {
          result = checkedList.map(x => x.id).join(',') + '|(' + checkedList.map(x => x.name).join(',') + ')';
        }
        console.log('confirmDialog ', this.dataList, '\n', checkedList, result);
        window.VueAreaSelectEventBus.FILE_DIALOG.confirmCallback(checkedList, result);
        window.VueAreaSelectEventBus.FILE_DIALOG.showDialog = false;

      },
      init() {
        console.log('initVal  ', this.initVal);
        this.getAreaSelectionInfo().then(res => {
          this.dataList = JSON.parse(JSON.stringify(res)).map(x => {
            let obj = {
              checkAll: false,
              isIndeterminate: false,
              checkedItems: [],
              options: x.provinces.map(z => z.provinceid)
            }
            if(this.initVal&&(this.initVal.length>0)){
              x.provinces.forEach(province=>{
              let findVal =this.initVal.indexOf(province.provinceid);
                if(findVal>-1){
              obj.checkedItems.push(province.provinceid)
            }
            });
            let checkedCount = obj.checkedItems.length;
             obj.isIndeterminate = checkedCount > 0 && checkedCount < obj.options.length;
             obj.checkAll = checkedCount === obj.options.length
            }
          
            return Object.assign(x, obj);
          });
          console.log('init  ', this.dataList)
        });
        this.canMounted = true;
      },
    },
    mounted() {
      this.init();
    }
  }

</script>
<style lang="scss" scoped>
  .btn-group {
    margin-bottom: 10px;
  }

  .check-group {
    display: inline-block;
    margin-left: 30px;
    margin-bottom: 15px;
  }

</style>
