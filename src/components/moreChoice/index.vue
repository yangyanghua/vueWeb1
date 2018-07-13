<template>
  <div class="el-transfer">
    <div class="choi c_left" :id="wrapperId">
      <div class="sea_c">
        <el-input placeholder="请输入内容" v-model="searchWord">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <ul class="choiLsit js-choiceList">
        <li v-for="choice in showChoices" @click="addpro(choice.goodsId,choice.goodsName,choice.minPrice,choice.maxPrice)" :class="{'active':ids.indexOf(choice.goodsId)!=-1}"
          :key="choice.id">
          <p :title="choice.name">
            <i v-if="ids.indexOf(choice.goodsId)!=-1">已添加</i>{{choice.goodsName}}</p>
          <span class="el-icon-circle-plus"></span>
        </li>
      </ul>
      <p class="tipInfo">{{tipInfo}}</p>
      <p class="tipInfo" v-show="!tipInfo&&(choices.list.length===choiced.length)">暂无数据</p>
    </div>
    <div class="choi c_right">
      <div class="sea_c">
        <el-input placeholder="请输入内容" v-model="inputValue">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <ul class="choiLsit">
        <li v-for="(item) in showChoiced" @click="subpro(item.id)" :key="item.id">
          <p :title="item.name">{{item.name}}</p>
          <span class="el-icon-remove"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchWord: '',
        inputValue: '',
        isLoading: false,
        tipInfo: '',
      }
    },
    props: {
      choices: {
        required: true,
        type: Object
      },
      choiced: {
        required: true,
        type: Array
      },
      ids: {
        required: true,
        type: Array
      },
      maxlength: {
        required: false,
        type: Number
      },
      search: {
        required: false,
        type: Function,
        default: () => {
          console.log('back');
        }
      },
      wrapperId: {
        required: false,
        default: 'multichoiceWrapper'
      }
    },
    methods: {
      addpro(id, name,minPrice,maxPrice) {
        if (this.ids.length == this.maxlength) {
          this.$message.error('最多只能关联' + this.maxlength + '个商品');
          return false;
        } else {
          this.choiced.push({
            name: name,
            id: id,
            maxPrice: maxPrice,
            minPrice: minPrice
          });
          this.ids.push(id);
          this.scrollEvent();
          // if(this.ids.indexOf(String(id))==-1){
          // 	this.choiced.push({name:name,id:id});
          // 	this.ids.push(String(id));
          // }else{
          //   return false;
          // }			
        }


      },
      subpro(id) {
        var _this = this;
        let idIndex = '';
        idIndex = _this.ids.indexOf(id);
        _this.ids.splice(idIndex, 1);
        _this.choiced.forEach(function (item, index) {
          if (item.id == id) {
            _this.choiced.splice(index, 1);
          }
        })
      },
      getNeedLoading() {
        let vm = this;
        let wrapper = document.querySelector('#' + vm.wrapperId);
        let container = document.querySelector('#' + vm.wrapperId + ' .js-choiceList');
        let scrollTop = wrapper.scrollTop;
        let needLoading = (scrollTop + wrapper.clientHeight) > container.clientHeight;
        console.log(scrollTop, wrapper.clientHeight, container.clientHeight, needLoading);
        return needLoading;
      },
      scrollEvent(needLoad) {
        let vm = this;
        let loadingResult = vm.getNeedLoading();
        let needLoading = (needLoad===true) ? needLoad : loadingResult;
        // debugger;
        if ((!vm.isLoading) && needLoading) {
          // 触发加载数据        
          vm.isLoading = true;
          vm.tipInfo = '加载中...';
          console.log('loading more');
          vm.search(vm.searchWord).then((res) => {
            	vm.isLoading = false;
						let needLoadingAgain = vm.getNeedLoading();
            if (needLoadingAgain) {
							console.log('i need loading again');
              vm.scrollEvent(true);
            } 
          }).catch((res) => {
						vm.tipInfo = res.message;
						vm.isLoading = false;
          });
        }

      }
    },
    watch: {
      searchWord: function (val) {
        // this.search(val);
        let vm = this;
        vm.tipInfo = '加载中...';
        vm.search(vm.searchWord, 1).then(() => {
          vm.tipInfo = '';
        }).catch((res) => {
          vm.tipInfo = res.message;
        });
      }
    },
    computed: {
      showChoices() {
        return this.choices.list;
        // if(!this.choices.list){
        //   return [];
        // }
        // if(!this.searchWord) {
        //   return this.choices.list.concat([]);
        // } else {
        //   return  this.search(this.searchWord);  
        // }
      },
      showChoiced() {
        let vm = this;
        if (!vm.choiced) {
          return [];
        }
        if (!vm.inputValue) {
          return vm.choiced.concat([]);
        } else {
          return vm.choiced.filter((item, index) => {
            return item.name.indexOf(vm.inputValue) > -1;
          });

        }
      },
    },
    mounted() {
      let vm = this;
      vm.search('', 1).then(() => {
        this.scrollEvent();
      });
      let wrapper = document.querySelector('#' + vm.wrapperId);
      wrapper.addEventListener('scroll', this.scrollEvent);
    },
    destroyed() {
      // let wrapper = document.querySelector('#' + this.wrapperId);
      // wrapper.removeEventListener('scroll', this.scrollEvent);
    }
  }

</script>

<style lang="scss" scoped>
  .el-transfer-panel__body {
    overflow-y: scroll;
  }

  .el-transfer {
    height: 420px;
    width: 700px;
  }

  .choi {
    position: relative;
    margin-right: 30px;
    width: 300px;
    height: 410px;
    overflow-y: auto;
    border: 1px solid #999999;
    float: left;
    padding-top: 45px;
    border-radius: 8px;
    .sea_c {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .choiLsit {
    width: 100%; // height: 350px;
    // overflow-y: auto;
    li {
      width: 100%;
      position: relative;
      background: #FFFFFF;
      font-size: 14px;
      color: #666666;
      height: auto;
      box-sizing: border-box;
      p {
        font-size: 12px;
        padding: 10px;
        box-sizing: border-box;
        padding-right: 20px;
        line-height: 20px;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        i {
          display: inline-block;
          color: #F04134;
          width: 40px;
          margin-right: 5px;
          text-align: center;
          border: 1px solid #F04134;
        }
      }
      span {
        position: absolute;
        height: 28px;
        width: 28px;
        z-index: 10;
        color: #F04134;
        font-size: 28px;
        border-radius: 50%;
        text-align: center;
        top: 50%;
        margin-top: -14px;
        right: 5px;
        cursor: pointer;
        display: none;
      }
    }
  }

  .choiLsit li.active {
    display: none;
  }

  .choiLsit li.active:hover span {
    display: none;
  }

  .choiLsit li:hover p {
    background: gainsboro;
  }

  .choiLsit li:hover span {
    display: block;
  }

  .tipInfo {
    text-align: center;
    color: #999;
  }

</style>
