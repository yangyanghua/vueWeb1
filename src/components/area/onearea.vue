<template>
  <div class="wrapper area">
    <el-checkbox class="checkAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{areas}}</el-checkbox>
    <div class="allCity">
      <template v-for="(city, index) in cities">
        <div class="cityCheck" :class="{'selectCheck':currentSelection===city}" :key="city">
          <el-checkbox class="check-sub" :title="getCityInfo(city)" :label="city" :key="city" @change="handleCheckedCityChange(city)"
            v-model="district[city].checkAll" :indeterminate="district[city].isIndeterminate">{{city}}
            <span v-if="district[city].listChecked.length!==0">
              ({{district[city].listChecked.length}})</span>
          </el-checkbox>
        </div>
        <div class="pop" :key="index">
          <i :class="['el-icon--right', 'arrow-down', currentSelection!==city?'el-icon-caret-bottom': 'el-icon-caret-top']" @click="showDistrict(city)"></i>
          <div class="popover" v-show="currentSelection===city">
            <el-checkbox-group class="checkGroup" v-model="district[city].listChecked" @change="handleCheckedDistrict">
              <el-checkbox v-for="pro in district[city].list" :title="pro" :label="pro" :key="pro" class="check-sub">
                {{pro}}</el-checkbox>
            </el-checkbox-group>
            <div class="closeSection">
              <span class="closeBtn" @click="closeSelection"> 
              <i class="el-icon-close closeIcon"></i>关闭 </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import onearea from './onearea';
  import {
    mapGetters,
  } from 'vuex';
  import {
    SET_AREA_SELECTCITY
  } from '@/store/mutation-types';
  export default {
    data() {
      return {
        checkAll: false,
        isIndeterminate: true,
      };
    },
    computed: {
      ...mapGetters(['currentSelection', 'areaChangeFlag']),
    },
    props: {
      cities: {
        required: true,
        type: Array
      },
      district: {
        required: true,
        type: Object
      },
      areas: {
        required: true,
        type: String
      }
    },
    watch: {
      'areaChangeFlag': function(){
        this.checkAllFn();
      }
    },
    methods: {
      getCityInfo(city) {
        if (this.district[city].listChecked.length !== 0) {
          return city + '(' + this.district[city].listChecked.length + ')';
        } else {
          return city;
        }
      },
      handleCheckAllChange(event) {
        console.log('all change ');
        this.isIndeterminate = false;
        Object.keys(this.district).forEach((item) => {
          this.district[item].checkAll = this.checkAll;
          this.district[item].listChecked = this.checkAll ? this.district[item].list : [];
          this.district[item].isIndeterminate = false;
        });
      },
      handleCheckedCityChange(city) {
        let currentCheckAll = this.district[city].checkAll;
        console.log('click city ', city, this.district[city]);
        if (this.district[city].isIndeterminate === true) {
          this.district[city].isIndeterminate = false;
          this.district[city].listChecked = this.district[city].list;
        } else {
          this.district[city].listChecked = currentCheckAll ? this.district[city].list : [];
        }
        this.checkAllFn();
      },
      checkAllFn() {
        let ischeckAll = Object.keys(this.district).every((item) => {
          return this.district[item].checkAll === true;
        });
        let ischeckSome = Object.keys(this.district).some((item) => {
          return this.district[item].listChecked.length !== this.district[item].list.length;
        }) && Object.keys(this.district).some((item) => {
          return this.district[item].listChecked.length > 0;
        });
        this.isIndeterminate = ischeckSome;
        this.checkAll = ischeckAll;
      },
      handleCheckedDistrict(value) {
        let checkedCount = value.length;
        let districtOne = this.district[this.currentSelection];
        districtOne.checkAll = checkedCount === districtOne.list.length;
        districtOne.isIndeterminate = checkedCount > 0 && checkedCount < districtOne.list.length;
        this.checkAllFn();
      },
      showDistrict(city) {
        if (this.currentSelection === city) {
          this.$store.commit(SET_AREA_SELECTCITY, '');
        } else {
          this.$store.commit(SET_AREA_SELECTCITY, city)
        }
      },
      closeSelection() {
        this.$store.commit(SET_AREA_SELECTCITY, '');
      }
    },
    mounted() {
      this.checkAllFn();
      console.log('i mounted ')
    }
  };
</script>
<style lang="scss" scoped>
  // @import '../../../styles/vars.scss';
  .wrapper {
    width: 900px;
    text-align: left;
    margin-bottom: 20px;
  }

  .checkAll {
    width: 108px;
    .el-checkbox__label,
    .el-radio__label {
      // font-size: $fontsize-lg;
      font-size: 16px;
      color: $color-normal;
    }
  }

  .checkGroup {
    display: inline-block;
    width: 184px;
  }

  .allCity {
    display: inline-block;
    width: 780px;
  }

  .area .checkAll.el-checkbox {
    vertical-align: top;
    box-sizing: border-box;
    padding-top: 9px;
  }

  .check {
    width: 60px;
  }

  .check-sub {
    .el-checkbox__label,
    .el-radio__label {
      // font-size: $fontsize-normal;
font-size: 12px;
      color: $color-normal;
    }
    .el-checkbox__label {
      width: 50px;
      display: inline-block;
      @extend .ellipsis;
    }
  }

  .pop {
    display: inline-block; // padding-left: 5px;
    padding-right: 5px;
    margin-right: 10px;
    position: relative;
  }

  .cityCheck {
    display: inline-block;
    padding-top: 9px;
    padding-left: 12px;
    padding-right: 2px;
    box-sizing: border-box;
    width: 97px;
    display: inline-block;
    @extend .ellipsis;
    vertical-align: bottom;
  }

  .selectCheck {
    // background-color: $color-popover;
    background-color: #FBF4DC;
  }

  .el-icon--right {
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 0;
    cursor: pointer;
  }

  //  .closeIcon{
  //     display: inline-block;
  //     width: 12px;
  //     height: 12px;
  //     vertical-align: middle;
  //     background: $color-primary url('/static/ic_tiecode_windows_checkgoods_close.png')  center center no-repeat;
  //   }
</style>