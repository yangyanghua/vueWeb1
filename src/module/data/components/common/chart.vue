<template>
  <div id="main" style="width: 972px;height:400px;">

  </div>
</template>
<script>
    export default{
        data(){
            return {
                
            }
        },
        props: {
            dataList: {
                type: Array,
                // default: []
            }
        },
        mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
           tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            // dataView: {show: true, readOnly: false},
            // magicType: {show: true, type: ['line', 'bar']},
            // restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        // data:this.dataList.map(x=>x.name)
        data:['浏览量','访客数','收藏数']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            min: 0,
            max: 1000000,
            interval: 200000,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '转化率',
            min: 0,
            max: 150,
            interval: 30,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name:'浏览量',
            type:'line',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'访客数',
            type:'line',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'收藏数',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
    }
</script>