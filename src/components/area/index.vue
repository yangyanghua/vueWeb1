<template>
    <div class="areafree">
        <el-dialog title="选择区域" :visible.sync="areaVisition" size="large" width="950px" :close-on-click-modal="false">
             <template v-for="(area) in areaOptions"> 
                <onearea :key="area.name" :cities="Object.keys(area.include)"  
                :district="area.include" :areas="area.name">
                </onearea>
            </template>
            <div slot="footer" class="areabtnGroup">
                <el-button class="largeBtn mgr20" type="primary" @click="confirmArea">提交</el-button>
                
                <el-button class="largeBtn" @click="areaVisition = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import onearea from './onearea';
    import {
    mapActions
  } from 'vuex';
     import {
    SET_AREA_SELECTCITY,
    SET_AREA_CHANGEFLAG
  } from '@/store/mutation-types';
    export default {
        data() {
            return {
                areaVisition: false,
                // areaOptions: []
            }
        },
        props: {
            areaOptions: {
                required: true,
                type: Array
            }
        },
        components: {
            onearea
        },
        methods: {
             ...mapActions(['getAllAreaInfo']),
            confirmArea() {
                this.areaVisition = false
                 this.$emit('selectArea', this.areaOptions);
            },
            show() {
                this.$store.commit(SET_AREA_SELECTCITY, '');
                this.$store.commit(SET_AREA_CHANGEFLAG);
                this.areaVisition = true;
            }
        }

    }
</script>
<style lang="scss" scoped>
//   @import '../../../styles/vars.scss';

.areafree{
    .el-dialog__body {
        padding-top: 20px;
        padding-bottom: 20px;
    }
}
.areabtnGroup{
    text-align: center;
}
.areabtnGroup .largeBtn{
    width: 150px;
    height: 40px;
    // font-size: $fontsize-elg;
    font-size: 18px;
}
.mgr20{
    margin-right: 20px;
}
</style>