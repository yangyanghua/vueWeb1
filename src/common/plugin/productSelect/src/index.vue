<template>
  <el-dialog class="file-dialog" title="商品选择" :close-on-click-modal="false" :visible="dialogFormVisible" width="800px" @close="closeDialog">
    <more-choice style="margin: auto;" :maxlength="300" :choices.sync="multiproductChoices" :search="multisearchProduct" :choiced.sync="productChoiced"
                :ids.sync="ids"></more-choice>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmDialog">确 定</el-button>

    </div>
  </el-dialog>
</template>
<script>
 import {
    mixin
  } from '@/common/mixins/moreChoice.js';
  const inBrowser = typeof window !== 'undefined'
  export default {
    name: 'ProductSelect',
     mixins: [mixin],
    data() {
      return {
    
      };
    },
    computed: {
      dialogFormVisible: function () {
        if (inBrowser) {
          return window.VueProductSelectEventBus.FILE_DIALOG.showDialog
        } else {
          return false
        }
      },
      initVal() {
        return JSON.parse(JSON.stringify(window.VueProductSelectEventBus.FILE_DIALOG.initVal));

      }
    },
    watch: {
      'dialogFormVisible': function (val) {
        this.canMounted = val;
      },
      'initVal': function (val) {
        // console.log('initVal ', val);
        this.init();
      }
    },
    methods: {
     
      closeDialog() {
        window.VueProductSelectEventBus.FILE_DIALOG.showDialog = false;
        console.log('close ');
      },
      confirmDialog() {
        
        console.log('confirmDialog ', this.ids, '\n', this.productChoiced);
        window.VueProductSelectEventBus.FILE_DIALOG.confirmCallback(this.ids, this.productChoiced);
        window.VueProductSelectEventBus.FILE_DIALOG.showDialog = false;

      },
      init() {
        console.log('initVal  ', this.initVal);
        this.ids = this.initVal.map(x=>x.id);
        this.productChoiced = this.initVal;
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
