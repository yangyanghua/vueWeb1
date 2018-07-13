<template>
  <div class="el-transfer">
  	  <div class="sea_c">
        <div class="s_input s_left">
         <el-input placeholder="请输入内容" v-model="searchWord">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> 
        </div>
 		<div class="s_input s_right">
         <el-input placeholder="请输入内容" v-model="inputValue">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>			
 		</div>	
     </div> 
    <div class="choi c_left" :id="wrapperId">
      <ul class="choiLsit js-choiceList">
        <li v-for="choice in showChoices" @click="addpro(choice)" :class="{'active':ids.indexOf(String(choice.id))!=-1}"
          :key="choice.id"  >
          	<div class="goodsImg" v-bind:style="{backgroundImage: 'url(' + choice.imagePath||choice.images + ')'}" ></div>
			<div class="txtInfo">
				<p><a style="color: #4169E1;">{{choice.name}}</a></p>
				<p>价格：{{choice.price}}<span style="padding-left: 20px;">数量：{{choice.stock}}</span></p>
				<p>{{choice.company}}</p>
			</div>    	
          <span class="icon el-icon-circle-plus"></span>
        </li>
      </ul>
      <p class="tipInfo">{{tipInfo}}</p>
      <p class="tipInfo" v-show="!tipInfo&&(choices.list.length===choiced.length)">暂无数据</p>
    </div>
    <div class="choi c_right">
      <ul class="choiLsit">
        <li v-for="item in showChoiced"  >
			<div class="goodsImg" v-bind:style="{backgroundImage: 'url(' + item.imagePath||item.images + ')'}" ></div>	
			<div class="txtInfo">
				<p><a style="color: #4169E1;">{{item.name}}</a></p>
				<p>价格：{{item.price}}</p>
				<p style="width: 55%;">{{item.company}}</p>
			</div>           
          <span  style="top: 23%;" @click="subpro(item.id)" class="icon el-icon-remove"></span>
            <div class="sortInput">
            <span style="float: left;margin-top: 3px;">排序</span>
            <el-input
            	style="width: 60px;"
			    size="mini"
			    v-model="item.sort">
			 </el-input>            	
            </div>          
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
      addpro(item) {
        if (this.ids.length == this.maxlength) {
          this.$message.error('最多只能关联' + this.maxlength + '个商品');
          return false;
        } else {
          //item.sort_value=0;
          let obj = item;
          obj.sort = 0;
          
          this.choiced.push(obj);
          this.ids.push(String(item.id));
          console.log(this.ids);
          this.scrollEvent();		
        }


      },
      subpro(id) {
        var _this = this;
        let idIndex = '';
        idIndex = _this.ids.indexOf(String(id));
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
        let needLoading = (scrollTop + wrapper.clientHeight) > container.clientHeight-10;
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
    height: 500px;
    width: 700px;
  }

  .choi {
    position: relative;
    margin-right: 30px;
    width: 300px;
    height: 410px;
    overflow-y: auto;
    border: 1px solid gainsboro;
    float: left;
    border-radius: 8px;
    border-top:none;
    border-top-left-radius:0 ;
    border-top-right-radius:0 ;
    }
    .sea_c {
      width: 100%;
      height: 80px;
     
      .s_input{
      	float: left;
      	padding: 20px;
      	display: inline-block;
      	width: 300px;
      	background: #DCDFE6;
	    border-top-left-radius:8px;
	    border-top-right-radius:8px;      	
      }
      .s_right{
	    margin-left: 30px;
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
      height: 70px;
      padding: 5px;
      box-sizing: border-box;
      border-bottom: 1px solid gainsboro;
       .goodsImg{
	       	display: inline-block;
	       	border: 1px solid gainsboro;
	       	height: 60px;
	       	float: left;
	       	width: 60px;
	       	background-size: cover;
       }
       .txtInfo{
       	height: 60px;
       	float: left;
       	width: 200px;
       	display: inline-block;
       	margin-left: 5px;
       	p{
       		width: 100%;
       		text-align: left;
       		font-size: 12px;
       		color: #999999;
	        white-space: nowrap;
	        text-overflow: ellipsis;
	        overflow: hidden;       		
       	}
       }
      span.icon {
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
.sortInput{
	position: absolute;
	width: 100px;
	bottom: 5px;
	right: 10px;
	height: 29px;
	line-height: 29px;
}
  .choiLsit li.active {
    display: none;
  }

  .choiLsit li.active:hover span {
    display: none;
  }

  .choiLsit li:hover {
    background:#FBFBFB;
  }

  .choiLsit li:hover span.icon {
    display: block;
  }

  .tipInfo {
    text-align: center;
    color: #999;
  }

</style>
