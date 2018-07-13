<template>
  <div class="classification">
    <template>

      类目搜索：
      <el-select size="mini" class="input-long" v-model="searchKeyword" :no-data-text="searchCategoryParams.noDataText" :no-match-text="searchCategoryParams.noMatchText"
        :loading-text="searchCategoryParams.loadingText" :clearable="searchCategoryParams.clearable" :multiple="searchCategoryParams.multiple"
        :filterable="searchCategoryParams.filterable" :remote="searchCategoryParams.remote" :reserve-keyword="searchCategoryParams.reserveKeyword"
        :remote-method="searchCategoryMethod" :loading="searchCategoryParams.loading" placeholder="请输入需发布商品的类目名称/模糊关键词" @change="clickSearchCategory">
        <el-option v-for="item in searchCategoryList" :key="item.valId" :label="item.value" :value="item.valId">
        </el-option>
      </el-select>
    </template>

    <div class="u-recentwrapper">
      <p>最近使用的类目:</p>
      <ul class="selection">
        <li v-for="recent in recentList" :key="recent.valId" class="selection-item" @click="clickRecetCategory(recent);">
          {{recent.extAtt}}
        </li>
      </ul>
    </div>
    <div>
      <ul class="block">
        <li v-for="item in firstCategory" :title="item.name" :key="item.id" class="block-item" :class="{'active': (ids[0]==item.id)}"
          @click="clickCategory(item,0);">
          {{item.name}}
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
      <ul class="block">
        <li v-for="item in secondCategory" :title="item.name" :key="item.id" class="block-item" :class="{'active': (ids[1]==item.id)}"
          @click="clickCategory(item,1);">
          {{item.name}}
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
      <ul class="block">
        <li v-for="item in thirdCategory" :title="item.name" :key="item.id" class="block-item" :class="{'active': (ids[2]==item.id)}"
          @click="clickCategory(item,2);">
          {{item.name}}
        </li>
      </ul>
    </div>
          <p class="u-selected com-fsmd">
      当前选择分类：
      <span class="is-important">{{selectCategory}}</span>
    </p>
    <div class="com-btngroup">
      <el-button type="primary" @click="gotoProduct">下一步，填写商品信息</el-button>

    </div>
  </div>
</template>
<script>
  import * as Service from '@/common/service/goods/goods.js';
  const initCategory = () => {
    return {
      id: '',
      name: ''
    };
  }
  export default {
    data() {
      return {
        searchKeyword: '',
        searchCategoryParams: {
          loadingText: '输入关键字检索',
          noMatchText: '无匹配数据',
          multiple: false,
          clearable: true,
          noDataText: '检索不到数据',
          filterable: true,
          remote: true,
          reserveKeyword: true,
          loading: true
        },
        searchCategoryList: [],
        recentList: [],
        firstCategory: [],
        secondCategory: [],
        thirdCategory: [],
        // 记录已选分类信息
        categoryList: [{
            id: '',
            name: ''
          },
          {
            id: '',
            name: ''
          },
          {
            id: '',
            name: ''
          },
        ]
      }
    },
    props: {
      next: {
        type: Function,
        required: true,
      },
      setCategoryId: {
        type: Function,
        required: true
      }
    },
    computed: {
      ids: function () {
        return this.categoryList.map(x => x.id);
      },
      selectCategory: function () {
        return this.categoryList.map((x, index) => {
          if (index !== 2 && x.name) {
            return x.name + '>';
          }
          return x.name;
        }).join('');
      }
    },
    watch: {
      'categoryList': {
        handler: function (newVal, oldVal) {
          console.log('categoryList changed ', newVal, oldVal);
          if (!newVal) {
            return;
          }
          let firstId = newVal[0].id;
          let secondId = newVal[1].id;
          // debugger;
          if ((firstId !== (oldVal[0].id)) && firstId) {
            this.getCategory(firstId).then(res => {
              this.secondCategory = res;
            }).catch(res => {
              this.secondCategory = [];
              this.thirdCategory = [];
            });
          } else if (firstId === '') {
            this.secondCategory = [];
            this.thirdCategory = [];
          }
          if ((secondId !== (oldVal[1].id)) && secondId) {
            this.getCategory(secondId).then(res => {
              this.thirdCategory = res;
            }).catch(res => {
              this.thirdCategory = [];
            });
          } else if (secondId === '') {
            this.thirdCategory = [];
          }
          console.log('ids ', this.id1, this.id2, this.id3);
        },
        deep: true
      }
    },
    methods: {
      gotoProduct() {
        if (this.ids.every(id => id !== '')) {
          let ids = this.ids.join(',');
          this.setCategoryId(ids, this.selectCategory);
          this.next(1);
        } else if (this.$route.query.id) {
          this.next(1);
        } else {
          this.$message.error('请先选择分类');
        }

      },
      getRecentList() {
        let params = {
          //token: '123',
          //platform: 'sg'
        };
        Service.goodsRecentCategory(params).then(res => {
          console.log(res);
          this.recentList = res.recentCats;
        });
      },
      //点击下拉框分类
      clickCategory(item, index) {
        this.categoryList = this.categoryList.map((x, i) => {
          if (i === index) {
            return Object.assign({}, item);
          }
          if (i > index) {
            return initCategory();
          }
          return x;
        })
        console.log(this.categoryList);
      },
      //点击最近分类
      clickRecetCategory(_categoryIdStr) {
        this.setCategoryId(_categoryIdStr.valId, _categoryIdStr.extAtt);
        this.next(1);

      },
      // 设置分类，传入 id1,id2,id3   name1>name2>name3格式
      setCategoryList(ids = ',,', names = '>>') {
        let vm = this;
        let selectCategoryId = ids.split(',');
        if (selectCategoryId.length !== 3) {
          vm.categoryList = [].fill(initCategory());
          console.log('setCategoryList>>>', vm.categoryList);

          return;
        }
        let selectCategoryName = names.split('>');
        vm.categoryList = selectCategoryId.map((x, i) => {
          let obj = Object.assign({}, (vm.categoryList)[i], {
            id: x,
            name: selectCategoryName[i]
          });
          return obj;
        });
        console.log('setCategoryList>>>', vm.categoryList);
      },
      //点击搜索结果分类下拉框选项
      clickSearchCategory(_categoryIdStr) {

        let selectCategoryName = (this.searchCategoryList.find(item => item.valId === this.searchKeyword)).value;
        let selectCategoryId = _categoryIdStr;
        this.setCategoryList(selectCategoryId, selectCategoryName);

      },
      //搜索分类
      searchCategoryMethod(_keyword) {
        //console.info("searchCategoryMethod:"+_keyword);
        this.searchCategoryParams.loading = true;
        if (_keyword === null || _keyword === "") {
          this.searchCategoryList = [];
        } else {
          let params = {
            key: _keyword
          };
          this.searchCategoryParams.loading = false;
          Service.goodsKeyCategory(params).then(res => {
            //console.log(res);
            setTimeout(() => {
              this.searchCategoryList = res;
            }, 20);
          }).catch(res => {
            this.searchCategoryList = [];
            //his.$message.error("查询结果:"+res.message);
          })
        }
      },
      // 根据pid查询下级分类信息方法
      getCategory(pid) {
        let promise = new Promise((resolve, reject) => {
          let params = {
            pid
          };
          Service.goodsCategoryList(params).then(res => {
            if (pid === 0) {
              this.firstCategory = res;
            }
            resolve(res);
          }).catch(res => {
            this.$message.error(res.message);
            reject(res);
          })
        });
        return promise;
      }
    },

    mounted() {
      this.getRecentList();
      this.getCategory(0); //父分类，首级
    }
  }

</script>
<style lang="scss" scoped>
  .wd-middle {
    width: 300px;
    margin: 0 auto;
    margin-right: 10px;
  }

  .classification {
    // text-align: center;
    padding-left: 20px;
    margin-top: 20px;
  }

  .u-recentwrapper {
    // padding: 20px 70px;
    padding: 20px 0;
    text-align: left;

  }

  .block {
    width: 280px;
    height: 365px;
    margin-right: 10px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: inline-block;
    overflow: auto;
    border: 1px solid $color-primary;
    &-item {
      display: inline-block;
      // width: 260px;
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
      overflow-x: hidden;
      height: 35px;
      line-height: 35px;
      text-align: left;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $color-heavy;
      position: relative;
      font-size: 13px;
      i {
        position: absolute;
        right: 8px;
        top: 12px;
        display: none;
      }
      &:hover {
        background-color: $color-bg-dialog;
      }
      &.active {
        color: $color-primary;
        background-color: $color-bg-dialog;
        i {
          display: inline-block;
        }
      }
    }
  }

  .is-round {
    .el-input-group--append .el-input__inner {
      border-radius: 20px;
    }
  }

  .selection {
    // background-color: #FFF5F3;
    &-item {
      display: inline-block;
      color: $color-primary;
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .input-long {
    width: 400px;
  }

  .u-selected {
    margin-top: 15px;
  text-align: center;
    // margin-bottom: 20px;
  }

</style>
