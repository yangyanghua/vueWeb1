<template>

  <div class="el-transfer">
    <div class="el-transfer-panel">
      <div class="el-transfer-panel__body" :id="wrapperId">
        <el-input class="el-transfer-panel__filter" placeholder="输入关键字" prefix-icon="el-icon-search" v-model="searchWord">
        </el-input>
        <div class="radio-group js-choiceList">
          <label v-for="choice in showChoices" :key="choice.id" @click="setChoice(choice)" :title="choice.name">
            <input type="radio" v-model="choices.selected" :value="choice.id">
            <span class="radio-icon"></span>
            {{choice.name}}
          </label>
        </div>
        <p class="tipInfo">{{tipInfo}}</p>
        <p class="tipInfo" v-show="!tipInfo&&choices.list.length===0">暂无数据</p>
      </div>
    </div>
    <div class="el-transfer-panel mgl30">
      <div class="el-transfer-panel__body">
        <p class="selectedName" :title="choices.selectedName">{{choices.selectedName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchWord: '',
        isLoading: false,
        tipInfo: '',
        // showChoices: []
      }
    },
    props: {
      choices: {
        required: true,
        type: Object
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
        default: 'choiceWrapper'
      }
    },
    methods: {
      setChoice(choice) {
        this.choices.selectedName = choice.name;
      },
      scrollEvent() {
        let vm = this;
        let wrapper = document.querySelector('#' + vm.wrapperId);
        let container = document.querySelector('#' + vm.wrapperId + ' .js-choiceList');
        let scrollTop = wrapper.scrollTop;
        let needLoading = scrollTop + wrapper.clientHeight >= container.clientHeight;
        console.log(scrollTop, wrapper.clientHeight, container.clientHeight, needLoading);
        if (!vm.isLoading && needLoading) {
          // 触发加载数据        
          vm.isLoading = true;
          vm.tipInfo = '加载中...';
          console.log('loading more');
          vm.search(vm.searchWord).catch((res) => {
            vm.tipInfo = res.message;
          }).finally(() => {
            vm.isLoading = false;
          });
        }

      }
    },
    watch: {
      searchWord: function (val) {
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
      showChoices: function () {
        return this.choices.list;
      }

    },
    mounted() {
      let vm = this;
      vm.search('', 1);
      let wrapper = document.querySelector('#' + vm.wrapperId);
      wrapper.addEventListener('scroll', this.scrollEvent);
    },
  }

</script>

<style lang="scss" scoped>
  .el-transfer-panel__body {
    overflow-y: scroll;
  }

  .mgl30 {
    margin-left: 30px;
  }

  .el-transfer {
    width: 700px;
  }

  .selectedName {
    margin-top: 15px;
    margin-left: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tipInfo {
    text-align: center;
    color: #999;
  }

</style>
