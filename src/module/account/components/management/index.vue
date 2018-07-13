<template> 
  <div class="main">
      <!--面包屑-->
      <div class="crumbs">
        用户管理
      </div>
     <!-- / 面包屑--> 

		<!--model用来存放变量 -->
    <div class="subject">
      <div class="filter_query mat20 ">
        <h2 class="s_h2"><i></i>筛选查询</h2>
        <el-form :inline="true" :model="preSearchForm" class="demo-form-inline">   
          <el-form-item label="">
            <el-input size="medium" class="input_150" v-model="preSearchForm.loginName" placeholder="账号名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input size="medium" class="input_150" v-model="preSearchForm.realName" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input size="medium" class="input_150" v-model="preSearchForm.telephone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium"  icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button size="medium"  icon="el-icon-refresh" @click="onReset">重置</el-button>
          </el-form-item>
          <!-- <el-form-item style="float: right;">
            <el-button type="primary" size="medium" @click="addNewEntry()">创建账号</el-button>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    
    <!-- <el-switch v-model="testisLocked" active-value='0' inactive-value='1' @change="test(testisLocked)"></el-switch> -->
    <div class="subject">
        <div class="filter_query mat20">
        <h2 class="s_h2"><i></i>数据列表
        <p class="btn_qj"><el-button type="primary" size="medium" @click="addNewEntry()">创建账号</el-button></p>
        </h2>
          <table class="table-strip-ls">
        <thead>
          <tr>
            <td class="w100">
              账号名称
            </td>
            <td class="w100">真实姓名</td>
            <td class="w100">手机</td>
            <td >创建时间</td>
            <td >创建人</td>
            <td >上次登录时间</td>
            <td >商家客服</td>
            <td class="w120">状态</td>
            <td class="w130">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(management,index) in dataList" :key="management.id">
            <td>
              {{management.loginName}}
            </td>
            <td>
              {{management.realName}}
            </td>
            <td>
              {{management.telephone}}
            </td>
            
            <td>{{management.createTime}}</td>
            <td>{{management.createBy}}</td>
            
            <td>{{management.lastModifiedTime}}</td>
            <td>
              <p>{{management.serviceNickName}}</p>
              <p style="display:none">{{management.userId}}</p>
              <el-switch v-model="management.isService" active-value='1'  inactive-value='0'  @change="serviceNick(management,index)"></el-switch>
            </td>
            <td>
              <!-- 开关的域变化事件 -->
             <el-switch v-model="management.isLocked" active-value='0'  inactive-value='1'  @change="switch_1(management,index)"></el-switch>
            </td>
            <td class="">
              <el-button type="text" class="btn-handle" @click="editDetail(management.id)"> 编辑
              </el-button>
              <i class="btnsplit"></i>
              <el-button type="text" class="btn-handle" @click="deleteEntry(management.id)"> 删除
              </el-button>
            </td>
          </tr>
          <tr v-if="dataList.length===0">
            <td colspan="9" class="com-nodata">暂无数据</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination" v-if="dataList.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
        </el-pagination>
      </div>
        </div>

    </div>
    
  </div>
</template>
<script>
import * as Service from '@/common/service/account/index.js';
  export default{
    data() {
      return{
        //testisLocked: '1',
        //定义一个容器存放变量集，其变量的值随着表单变化
        searchForm:{
          loginName:'',
          realName:'',
          telephone:''
        },
        preSearchForm:{
          loginName:'',
          realName:'',
          telephone:''
        },
        dataList:[],
        currentPage:1,
        pageSize:10,
        totalRecord:0
         
        
      }
    },
    methods:{
      /*编辑*/
      editDetail(bannerId){
        this.$router.push({
          path:'/account/managementDetail',
          query:{
            id:bannerId
          }
        })
      },
      /*删除*/
      deleteEntry(_id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id : _id
          };
          Service.managementDelete(params).then(res => {
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(res => {
            this.$message.error(res.message);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
       /*商家客服开关 */
      serviceNick(management,index){
      	if(management.isService == 1) {
      		//提示确认禁用
      		this.$confirm('确认启用该账户商家客服?', '提示', {
          	confirmButtonText: '确定',
          	cancelButtonText: '取消',
          	type: 'warning'
        	}).then(() => {
        		let params = {
              isService : management.isService, 
              userId : management.id
            }
        		//调用后台接口，禁用用户
        		Service.isCheckService(params).then(res =>{
        			
        		}).catch(res => {
        			this.dataList[index].isService = management.isService==1?'0':'1';
        			this.$message({type: 'error',message: res.message});
        			
        		})
	        }).catch(() => {
	         		this.dataList[index].isService = management.isService==1?'0':'1'; //返回之前的状态
          });
      	} else {
      		this.$confirm('确认禁用该账户商家客服?', '提示', {
          	confirmButtonText: '确定',
          	cancelButtonText: '取消',
          	type: 'warning'
        	}).then(() => {
        		let params = {
              isService : management.isService,
              userId : management.id
            }
        		//调用后台接口，恢复用户
        		Service.isCheckService(params).then(res =>{
        			
        		}).catch(res => {
        			this.dataList[index].isService = management.isService==1?'0':'1';
        			this.$message.error(res,message);
        			
        		})
	        }).catch(() => {
	         		this.dataList[index].isService= management.isService==1?'0':'1'; //返回之前的状态
          });
      	}
        /*判断是开还是关的接口*/
        // let requestService = management.isLocked==1?'managementDisable':'managementIsable'; /*接口、managementDisable、managementIsable*/
      //   let params = {
      //     isService:management.isService
      //   }
      //   Service[requestService](params).then(res=>{
        
      // }).catch(res=>{
      //   this.$message.error(res,message);
      //   this.dataList[index]= management.isLocked==1?'0':'1';
      // })
    
       },
      
        /*开关 */
      switch_1(management,index){
        if(management.isLocked == 1) {
          //提示确认禁用
          this.$confirm('确认禁用用户吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {id : management.id}
            //调用后台接口，禁用用户
            Service.managementDisable(params).then(res =>{
              
            }).catch(res => {
              this.dataList[index].isLocked = management.isLocked==1?'0':'1';
              this.$message({type: 'error',message: res.message});
              
            })
          }).catch(() => {
              this.dataList[index].isLocked = management.isLocked==1?'0':'1'; //返回之前的状态
          });
        } else {
          this.$confirm('确认恢复用户吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {id : management.id}
            //调用后台接口，恢复用户
            Service.managementIsable(params).then(res =>{
              
            }).catch(res => {
              this.dataList[index].isLocked = management.isLocked==1?'0':'1';
              this.$message.error(res,message);
              
            })
          }).catch(() => {
              this.dataList[index].isLocked= management.isLocked==1?'0':'1'; //返回之前的状态
          });
        }
        /*判断是开还是关的接口*/
        let requestService = management.isLocked==1?'managementDisable':'managementIsable'; /*接口、managementDisable、managementIsable*/
        let params = {
          id:management.id
        }
        Service[requestService](params).then(res=>{
        
      }).catch(res=>{
        this.$message.error(res,message);
        this.dataList[index]= management.isLocked==1?'0':'1';
      })
    
      },
       /*搜索 */
      onSubmit(){
        this.currentPage =1;
        this.searchForm = Object.assign({},this.preSearchForm);  
        this.getList();
      },
       /*重置*/
      onReset(){
        this.currentPage =1;
        this.searchForm = {
            loginName:'',
            realName:'',
            telephone:''
        },
        this.preSearchForm = {
            loginName:'',
            realName:'',
            telephone:''
        },
        this.getList()
      },
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getList();

      },
      /*创建帐号*/
      addNewEntry(){
      	//通过路由跳转到创建用户页面
        this.$router.push('/account/managementDetail');
      },
      getList(){
      	//定义临时参数
        let params = {
          pageSize:this.pageSize,
          page:this.currentPage,
          loginName: this.searchForm.loginName,
          realName: this.searchForm.realName,
          telephone: this.searchForm.telephone
        }
        Service.managementList(params).then(res=>{
          this.dataList = res.content.map(x=>{
            x.isLocked = x.isLocked + '';
            x.isService = x.isService + '';
            return x;
          });
          console.log('this.dataList ', this.dataList);
          this.pageSize = res.size;
          this.totalRecord = res.totalElements;
        }).catch(res=>{
        	//出现异常
          this.$message.error(res,message);
        })
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>
<style lang="scss" scoped>
  .form {
    width: 680px;
    margin-top: 40px;
  }
  .input_150{
    width:150px;
  }

</style>


