<template>
	<div class="main">
		<div class="breadcrumb">
	      <el-breadcrumb separator="/">
	        <el-breadcrumb-item :to="{ path: '/address' }">自提地址管理</el-breadcrumb-item>
        	<el-breadcrumb-item>{{ editStatus?'编辑':'新增' }}自提地址</el-breadcrumb-item>
	      </el-breadcrumb>
	    </div>	
	    <div class="form">
	    	<el-form ref="form" :model="form" label-width="100px">
          		<el-form-item label="所在区域">
					<el-select class="input_180" size="medium" v-model="form.provinceName" placeholder="选择省份">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select class="input_180" size="medium" v-model="form.cityName" placeholder="选择地级市">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select class="input_180" size="medium" v-model="form.countyName" placeholder="选择区、县级市">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<div class="el-form-item__error">
				        {{error1}}
				     </div>
				</el-form-item>
				<el-form-item label="街道地址" required>
	            	 <el-input v-model="form.detailAddr" placeholder="" type="textarea"></el-input>
	                 <div class="el-form-item__error">
				        {{error2}}
				     </div>
          		</el-form-item>	
		     
				<el-form-item label="联系人姓名" required>
	            	 <el-input v-model="form.name" placeholder="30个字符以内"></el-input>
	                 <div class="el-form-item__error">
				        {{error3}}
				     </div>
          		</el-form-item>
          		<el-form-item label="联系人电话" required>
	            	 <el-input v-model="form.telephone" placeholder="30个字符以内"></el-input>
	                 <div class="el-form-item__error">
				        {{error4}}
				     </div>
          		</el-form-item>
				
				<el-form-item>
		            <el-button type="primary" @click="onSubmit">保存</el-button>
		            <el-button @click="$router.go(-1)">取消</el-button>
		        </el-form-item>	
	    	</el-form>
	    </div>
	</div>

</template>
<script>
	import * as Service from '@/common/service/logistics/index.js';
	export default {
		data () {
			return{
				form:{
					suitName:'',
					detailAddr:'',
					name:'',
					telephone:''
				},
				editStatus: false,
				error1: '',
				error2: '',
				error3: '',
				error4: ''
			}
		},
		methods: {
			/*添加点保存的方法*/
	        addItem(params) {
	          let vm = this;
	          console.log("params ", params);
	          entry.entry_add(params).then(res => {
	            console.log(res);
	            this.$router.push('/');
	          }).catch(res => {
	            vm.$message.error(res.message);
	          });
	        },
	        
        /*验证事件方法*/
	      checkSubmitInfo(){
	      	let error1Check = this.form.suitName==='';
	        //let error2Check = this.form.suitName===''||this.form.suitName.length>30;
	        let error2Check = this.storeChoices.selected === '' || this.storeChoices.selected === 0;
	        
	        
	        this.error1 = error1Check?'请输入名称':'';
	        this.error2 = error2Check?'请输入30个字符以内名称':'';

	        let checkError = error1Check||error2Check||error3Check||error4Check;
	        return checkError;
	      },
	      onSubmit() {      	
	        let checkError = this.checkSubmitInfo();
	        if(checkError){
	          return false;
	        }
	        let params = {
	          name: this.form.suitName,
	          imgUrl: this.imageUrl,
	          sourceIds:this.ids.join(',')  //数组转成字符串
	        };
	          
	        if (this.dateType === '1') {
	          params.startTime = this.form.unlimitStartTime.getTime();
	          params.endTime = this.form.unlimitStartTime.getTime()+100*366*24*3600*1000;
	        } else {
	          params.startTime = this.startTime2.getTime();
	          params.endTime = this.endTime2.getTime();
	        }
	        console.log(params, this.form);
	        console.log('submit ');
	        // return;
	        if (this.editStatus) {
	          params.id = this.editId;
	        } 
	          this.editItem(params);
	      }

		},
		mounted () {
	      let vm = this;
	      /*回显*/
	      if (this.$route.query.id) {
	        this.editStatus = true;
	        this.editId = this.$route.query.id;
	        Service.addressSave({
	            id: this.editId
	          })
	          .then(res => {
	            this.form = Object.assign({}, this.form, res);
	            
	          });
	      }
	     }
	}
</script>
<style lang="scss" scoped>
	.input_180{
		width:197px;
	}
	
</style>
