<template>
  <el-form :inline="true">
    <el-form-item :label="name">
      <el-button-group>
        <el-button size="mini" v-for="item in dateType" :key="item.name" :type="item.type===searchType?'primary':''" @click="setSearch(item.type)">{{item.name}}</el-button>
      </el-button-group>
    </el-form-item>
    <el-form-item label="" class="dateBox">
      <el-date-picker size="mini" :clearable="isClearable" v-model="timeRange" type="daterange" range-separator="~" start-placeholder="开始日期"
        end-placeholder="结束日期" :picker-options="pickerOptions1">
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>
<script>
  const getDateType = () => {
    return [{
        name: '今日',
        type: 1,
      },
      {
        name: '本周',
        type: 2,
      },
      {
        name: '本月',
        type: 3,
      },
    ];
  };
  const getTodayTime = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let date = dateObj.getDate();
    let todayObj = new Date(year, month, date);
    let timeObj = {
      year,
      month,
      date,
      todayObj,
      todayStamp: todayObj.getTime()
    }
    return timeObj;
  };
  export default {
    data() {
      return {
        isClearable: false,
        searchType: 1,
        timeRange: '',
        dateType: getDateType(),
        todayTime: getTodayTime(),
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        currentWeekStartTime: '',
        currentMonthStartTime: ''
      }
    },
    props: {
      name: {
        default: ''
      },
      queryMethod: {
        default: () => {
          return Promise.resolve('success');
        }
      }
    },
    computed: {
      startTime() {
        return timeRange[0].getTime();
      },
    },
    watch: {
      //监听用户所选时间变化，联动选择今日、本周、本月
      timeRange(val) {
        console.log(val, val[0].getTime(), this.todayTime.todayStamp);
        let dateTypeSelected = '';
         let typeIndex = '';
        if (val[1].getTime() === this.todayTime.todayStamp) {
          let dateInfo = getTodayTime();
         
          if (val[0].getTime() === val[1].getTime()) {
            typeIndex = 0;
          } else if (val[0].getTime() === this.currentWeekStartTime) {
            typeIndex = 1;
          } else if (val[0].getTime() === this.currentMonthStartTime) {
            typeIndex = 2;
          }
          if (typeIndex !== '') {
            this.searchType = getDateType()[typeIndex].type;
            dateTypeSelected = getDateType()[typeIndex].name;
          }
          console.log('dateTypeSelected', dateTypeSelected);
        }
        if (!dateTypeSelected) {
          this.searchType = '';
        }
        this.queryMethod(val,typeIndex===''?4:this.searchType);
      }
    },
    methods: {
      //用户点击今日 本周 本月时操作
      setSearch(type) {
        this.searchType = type;
        let range = [];
        let dateTobeSet, dateTobeSetStart;
        dateTobeSet = this.todayTime.todayObj;
        if (this.searchType === 1) {
          dateTobeSetStart = dateTobeSetStart = new Date(this.todayTime.year, this.todayTime.month, this.todayTime.date);
        } else if (this.searchType === 2) {
          dateTobeSetStart = new Date(this.currentWeekStartTime);
        } else if (this.searchType === 3) {
          dateTobeSetStart = new Date(this.currentMonthStartTime);
        }
        range[1] = dateTobeSet;
        range[0] = dateTobeSetStart;
        this.timeRange = [].concat(range);
        console.log('用户所选时间为： ', range);
      },
    },
    mounted() {
      console.log('today time ', this.todayTime);
      //获取本周第一天的时间
      this.currentWeekStartTime = this.todayTime.todayStamp - (this.todayTime.todayObj.getDay() - 1) * 24 * 3600 * 1000;
      //获取本月第一天的时间
      this.currentMonthStartTime = this.todayTime.todayStamp - (this.todayTime.todayObj.getDate() - 1) * 24 * 3600 *
        1000;
      //默认选择今日
      this.setSearch(1);
    }

  }

</script>
<style lang="scss" scoped>
  .el-button--primary.is-plain:hover,
  .el-button--primary.is-plain:focus {
    background: #4DA9E4;
    border: 1px solid #4DA9E4;
    color: #fff;
  }

</style>
