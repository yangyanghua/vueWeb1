<template>
  <el-form :inline="true">
    <el-form-item :label="name">
      <el-button-group>
        <el-button size="mini" plain v-for="item in dateType" :key="item.name" :type="item.type===searchType?'primary':''" @click="setSearch(item.type)">{{item.name}}</el-button>
      </el-button-group>
    </el-form-item>
    <el-form-item label="" class="dateBox">
      <el-date-picker size="mini" :clearable="isClearable" v-model="timeRange" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>
<script>
  const getDateType = () => {
    return [{
        name: '昨日',
        type: 1,
      },
      {
        name: '近7日',
        type: 7,
      },
      {
        name: '近30天',
        type: 30,
      },
    ];
  };
  const getYesterdayTime = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let date = dateObj.getDate();
    let yesterdayObj = new Date(year, month, date - 1);
    let timeObj = {
      year,
      month,
      date,
      yesterdayObj,
      yesterdayStamp: yesterdayObj.getTime()
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
        yesterdayTime: getYesterdayTime().yesterdayStamp
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
      }
    },
    watch: {
      timeRange(val) {
        console.log(val, val[0].getTime(), this.yesterdayTime);
        let dateTypeSelected = '';
        if (val[1].getTime() === this.yesterdayTime) {
          let dateInfo = getYesterdayTime();
          this.dateType.forEach(x => {
            if (!dateTypeSelected) {
              if (val[0].getTime() === new Date(dateInfo.year, dateInfo.month, dateInfo.date - x.type).getTime()) {
                this.searchType = x.type;
                dateTypeSelected = x.name;
              }
            }
          });
          console.log('dateTypeSelected', dateTypeSelected);
        }
        if (!dateTypeSelected) {
          this.searchType = '';
        }
        this.queryMethod.then(() => {
          console.log('getqueryResult');
        });
      }
    },
    methods: {
      setSearch(type) {
        this.searchType = type;
        let range = [];
        let dateInfo = getYesterdayTime();
        let dateTobeSet, dateTobeSetStart;
        dateTobeSet = dateInfo.yesterdayObj;
        dateTobeSetStart = new Date(dateInfo.year, dateInfo.month, dateInfo.date - type);
        range[1] = dateTobeSet;
        range[0] = dateTobeSetStart;
        this.timeRange = [].concat(range);
        console.log('用户所选时间为： ', range);


      },
    },
    mounted() {
      this.setSearch(1);
    }

  }

</script>
