import moreChoice from '@/components/moreChoice/index.vue';
import {
  queryGoodsList
} from '@/common/service/goods/index.js';
import * as Code from '@/common/js/code.js';
/*
html
      <more-choice style="margin: auto;" :maxlength="300" :choices.sync="multiproductChoices" :search="multisearchProduct" :choiced.sync="productChoiced"
                :ids.sync="ids"></more-choice>	
*/
export const mixin = {
  data() {
    return {
      multiproductChoices: {
        list: [],
        selected: '',
        selectedName: ''
      },
      multiproductChoicesEnd: false,
      ids: [],
      productChoiced: [],
      multiproOpt: {
        goodsName: '',
        currentPage: 1,
        pageSize: 20,
        goodsStatus:1,
        platform:'sg'
      }, 

    }
  },
  components: {
    moreChoice
  },
  methods: {
    multisearchProduct(wd, page) {
      this.multiproOpt.goodsName = wd;
      if (page === 1) {
        this.multiproOpt.currentPage = 1;
        this.multiproductChoicesEnd = false;
        return this.getProductData(this.multiproOpt, 'multi');
      }
      if (!this.multiproductChoicesEnd) {
        this.multiproOpt.currentPage = this.multiproOpt.currentPage + 1;
        return this.getProductData(this.multiproOpt, 'multi');
      } else {
        return Promise.reject(Code.END_INFO_CODE);
      }
    },
    getProductData(opt, add) {
        let vm = this;
        add = add ? add : '';
        let promise = new Promise((resolve, reject) => {
          queryGoodsList(opt).then(res => {
            // debugger;
            vm[add + 'productChoices'].list = res.currentPage == 1 ? res.content : (vm[add + 'productChoices'].list).concat(res.content);
            vm[add + 'productChoicesEnd'] = (res.currentPage >= Math.ceil(res.totalRecord/res.pageSize)) ? true : false;
            // vm[add + 'proOpt'].currentPage = res.currentPage;
            resolve();
          }).catch(res => {
            vm.$message.error(res.message);
            reject();
          });
        });
        return promise;
      }, 
  },


};
