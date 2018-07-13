<template>
	<section class="join_content">
		<join-header name="创建店铺"></join-header>
		<div class="info_content">
			<stroe-process :active="2"></stroe-process>

			<div class="form_content">

				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
					<h2 class="item_title">店铺信息</h2>
					<el-form-item label="店铺名称" prop="name">
						<el-input v-model="ruleForm.name" :maxlength="10" style="width: 500px;"></el-input>
						<p class="tip" v-if="ruleForm.storeType=='0'" style="margin-top: 3px;">命名规范：企业名称+旗舰店</p>
						<p class="tip" v-if="ruleForm.storeType=='1'" style="margin-top: 3px;">命名规范：企业字号+品牌+专营店</p>
					</el-form-item>
					<el-form-item label="主营类目" prop="storeManageCategories">
						<el-tag v-for="tag in chenckedleves" :key="tag.id" @close="handleClose(tag)" closable>
							{{tag.name}}
						</el-tag>
						<el-button size="small" style="width: 100px;" @click="addCategoryDialog=true" type="primary">添加</el-button>
					</el-form-item>
					<h2 class="item_title">品牌资质</h2>
					<el-form-item label="品牌资质认证" prop="storeBrands">
						<el-button size="small" :disabled="ruleForm.storeType=='1'&&tableData.length>=1" style="width: 100px;" @click="addBrand" type="primary">添加</el-button>
						<p class="tip" v-if="ruleForm.storeType=='0'" style="margin-top: 3px;">请至少添加一个品牌的资质以供认证</p>
						<p class="tip" v-if="ruleForm.storeType=='1'" style="margin-top: 3px;">请添加一个品牌的资质以供认证</p>
						<div class="tableContent" v-if="tableData.length!= 0">
							<el-table :data="tableData" border style="width: 100%">
								<el-table-column prop="brandName" label="品牌名" width="180">
								</el-table-column>
								<el-table-column width="200" label="商标注册/商标注册通知书">
									<template slot-scope="scope">
										<img style="height: 70px;" :src="scope.row.isShowTradeMarkLicense" />
									</template>
								</el-table-column>
								<el-table-column prop="address" label="独占授权书">
									<template slot-scope="scope">
										<img style="height: 70px;" :src="scope.row.isShowBrandLicensing" />
									</template>
								</el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<p>
											<el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row,scope.$index)" size="mini">编辑</el-button>
										</p>
										<p style="margin-top: 5px;">
											<el-button type="danger" @click="handleRemove(scope.$index)" icon="el-icon-delete" size="mini">删除</el-button>
										</p>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-form-item>
					<h2 class="item_title" v-if="needQualificationsids.length > 0">行业资质</h2>
					<div class="hyzz">
						<el-form-item v-for="(item,index) in storeBrandsQuali" :key="index" v-if="item.needQualifications==1" :label="item.qualificationsName" required>
							<ul>
								<li class="uploadimgs" v-for="(img,index1) in item.imgurls">
									<img :src="img.url" />
									<span class="delete el-icon-delete" @click="brandsQualiRemove(index,index1)"></span>
								</li>
								<li class="uploadimgs" style="top: 0;overflow: hidden;">
									<el-upload action="" :limit="5" :before-upload="beforeUpload" :on-remove="brandsQualiRemove">
										<i class="el-icon-plus" @click="setCurrentUpload(index)" style="padding-top: 30px; height: 110px;width:80px;text-align: center;"><span style="display: block;font-size: 14px;margin-top: 10px;">上传图片</span></i>
									</el-upload>
								</li>
							</ul>
							<p style="margin-top: 20px;" class="tip">{{item.reminderWord}}</p>
						</el-form-item>
					</div>
					<p v-if="ziError" style="font-size: 12px;color: red;padding-left: 100px;">行业资质图片不能为空</p>
				</el-form>
			</div>
			<!--
	作者：1063676593@qq.com
	时间：2018-03-06
	描述：选择类目
-->

			<el-dialog title="选择经营类目" :visible.sync="addCategoryDialog" width="40%">
				<p style="font-size: 14px;color: #999999;">经营大类（可多选）：</p>
				<div class="checkContent">
					<el-checkbox-group v-model="checkList1">
						<el-checkbox v-for="(item,index) in oneleves" :key="index" @change="checkoneleves(item.id,index)" :label="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<span slot="footer" class="dialog-footer">
    <el-button size="small" style="width: 100px;"  type="primary" @click="addCategoryDialog = false">确 定</el-button>
  </span>
			</el-dialog>
			<!--
	作者：1063676593@qq.com
	时间：2018-03-06
	描述：填写品牌资质
-->

			<el-dialog title="填写资质" :visible.sync="editBrandQuaDialog" width="60%">
				<el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="180px" class="demo-ruleForm">
					<el-form-item label="品牌名称：" prop="brandName">

						<el-input v-model="ruleForm1.brandName" :maxlength="64" style="width: 500px;"></el-input>

					</el-form-item>
					<el-form-item label="商标资质类型：" prop="tradeLicenseType">
						<el-radio-group v-model="ruleForm1.tradeLicenseType">
							<el-radio label="0">商标注册通知书</el-radio>
							<el-radio label="1">商标注册证</el-radio>
						</el-radio-group>
						<p class="tip">请提交国家商标总局颁发的商标注册证或商标注册申请受理通知书扫描件</p>
					</el-form-item>

					<el-form-item label="商标注册证/通知书：" prop="tradeMarkLicense">
						<div style="margin-top: 15px;">
							<el-upload action="" list-type="picture-card" :file-list="tradeMarkLicenseImgs" :limit="1" :before-upload="BrandBeforeUpload" :on-remove="traHandleRemove">
								<i class="el-icon-plus" v-if="tradeMarkLicenseImgs.length < 1" @click="setBrandCurrentUpload('tradeMarkLicense')" style="padding-top: 30px;"><span style="display: block;font-size: 14px;margin-top: 10px;">上传图片</span></i>
							</el-upload>
							<p class="tip">非原件照片需要加盖公司红色公章</p>
						</div>

					</el-form-item>

					<el-form-item label="上传补充资料：" prop="name">

						<div style="margin-top: 15px;">
							<el-upload action="" list-type="picture-card" :file-list="supplementMaterialImgs" :limit="5" :before-upload="BrandBeforeUpload" :on-remove="supHandleRemove">
								<i class="el-icon-plus" v-if="supplementMaterialImgs.length < 5" @click="setBrandCurrentUpload('supplementMaterial')" style="padding-top: 30px;"><span style="display: block;font-size: 14px;margin-top: 10px;">上传图片</span></i>
							</el-upload>
							<p class="tip">
								最多上传5项<br /> 1.商标注册人与营业执照公司名或法人不一致，但商标已转让，需要上传“商标转让证明”。
								<br /> 2.商标注册人与营业执照公司名或法人不一致，但公司已更名需要上传“公司更名证明”。
								<br /> 3.如果出现以上2种情况，需要上传“商标转让证明”和“公司更名证明”。
							</p>
						</div>
					</el-form-item>

					<el-form-item label="商标使用许可合同：" prop="brandLicensing">
						<div style="margin-top: 15px;">
							<el-upload action="" list-type="picture-card" :file-list="brandLicensingImgs" :limit="1" :before-upload="BrandBeforeUpload" :on-remove="branHandleRemove">
								<i class="el-icon-plus" v-if="brandLicensingImgs.length < 1" @click="setBrandCurrentUpload('brandLicensing')" style="padding-top: 30px;"><span style="display: block;font-size: 14px;margin-top: 10px;">上传图片</span></i>
							</el-upload>
							<p class="tip">
								非原件照片需加盖公司红色公章并且需要注明商标许可性质为独占性许可
							</p>
						</div>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
	    <el-button size="small" style="width: 100px;"  type="primary" @click="saveForm('ruleForm1')">确 定</el-button>
	  </span>
			</el-dialog>

			<div class="btnBox">
				<el-button class="submitBtn" :loading="submitloading" @click="submitForm('ruleForm')">{{btnTxt}}</el-button>
			</div>
		</div>
		<footer-box></footer-box>
	</section>
</template>
<script>
	import footerBox from '@/components/footer/index.vue';
	import joinHeader from '@/components/joinHeader/index.vue';
	import stroeProcess from '@/components/stroeProcess/index.vue';
	import { getUploadImgSrc, UploadImgurl } from '@/common/js/service.js';
	import { oneleve, sbrandList, storeAdd, storeDetail, updatestoreInfo } from '../../service.js';

	export default {
		data() {
			return {
				submitloading: false,
				btnTxt: '下一步',
				storeStatus: '',
				ziError: false,
				isEditOradd: '',
				editBrandIndex: '',
				loadBrandloading: false,
				brandList: [],
				addCategoryDialog: false,
				editBrandQuaDialog: false,
				currentUpload: '',
				brandCurrentUpload: '',
				checkList1: [],
				checkList: [],
				chenckedleves: [],
				oneleves: [],
				needQualificationsids: [],
				storeBrandsQuali: [],
				tradeMarkLicenseImgs: [],
				supplementMaterialImgs: [],
				brandLicensingImgs: [],
				ruleForm: {
					id: '',
					name: '',
					storeType: '',
					storeBrands: [],
					storeManageCategories: [],
				},
				ruleForm1: {
					brandName: '',
					tradeLicenseType: '0',
					isShowTradeMarkLicense: '',
					tradeMarkLicense: '',
					brandLicensing: '',
					isShowBrandLicensing: '',
					supplementMaterial: '',
				},

				rules1: {
					brandName: [{
						required: true,
						message: '请输入品牌名称',
						trigger: 'change'
					}, ],
					tradeLicenseType: [{
						required: true,
						message: '请选择商标资质类型',
						trigger: 'change'
					}, ],
					tradeMarkLicense: [{
						required: true,
						message: '请输入店铺名称',
						trigger: 'change'
					}, ],
					brandLicensing: [{
						required: true,
						message: '上传品牌授权书',
						trigger: 'change'
					}, ],

				},
				rules: {
					name: [{
						required: true,
						message: '请输入店铺名称',
						trigger: 'change'
					}, ],
					storeManageCategories: [{
						required: true,
						type: 'array',
						message: '请选择主营类目',
						trigger: 'change'
					}, ],
					storeBrands: [{
						required: true,
						type: 'array',
						message: '请添加品牌资质认证',
						trigger: 'change'
					}, ],
				},
				tableData: []
			};
		},
		components: {
			footerBox,
			stroeProcess,
			joinHeader
		},
		methods: {
			handleRemove(index) {
				this.tableData.splice(index, 1);
			},
			addBrand() {
				this.tradeMarkLicenseImgs = [];
				this.supplementMaterialImgs = []
				this.brandLicensingImgs = [];
				this.ruleForm1 = {
					brandName: '',
					tradeLicenseType: '0',
					isShowTradeMarkLicense: '',
					tradeMarkLicense: '',
					brandLicensing: '',
					isShowBrandLicensing: '',
					supplementMaterial: '',
				};
				this.isEditOradd = 'add';
				this.editBrandQuaDialog = true;

			},
			setCurrentUpload(index) {
				this.currentUpload = index;
			},
			setBrandCurrentUpload(name) {
				this.brandCurrentUpload = name;
			},
			checkoneleves(id, index) {
				if(this.checkList.indexOf(id) == -1) {
					this.checkList.push(id);
					this.chenckedleves.push(this.oneleves[index]);
					if(this.oneleves[index].needQualifications == 1) {
						this.needQualificationsids.push(id);
					};

					this.storeBrandsQuali.push({
						qualificationsName: this.oneleves[index].qualificationsName,
						reminderWord: this.oneleves[index].reminderWord,
						imgurls: [],
						needQualifications: this.oneleves[index].needQualifications,
						id: id,
					})
				} else {
					let _this = this;
					this.needQualificationsids.splice(this.needQualificationsids.indexOf(id), 1);
					this.checkList.splice(this.checkList.indexOf(id), 1);
					this.chenckedleves.splice(this.checkList.indexOf(id), 1);
					this.storeBrandsQuali.forEach((item, index) => {
						if(item.id == id) {
							_this.storeBrandsQuali.splice(index, 1);
						}
					})

				}
			},
			handleClose(tag) {
				let _this = this;
				this.chenckedleves.splice(this.chenckedleves.indexOf(tag), 1);
				this.checkList.splice(this.chenckedleves.indexOf(tag), 1);
				this.checkList1 = [...this.checkList];
				this.needQualificationsids.splice(this.needQualificationsids.indexOf(tag.id), 1);
				this.storeBrandsQuali.forEach((item, index) => {
					if(item.id == tag.id) {
						_this.storeBrandsQuali.splice(index, 1);
					}
				})
			},

			remoteMethod(query) {
				if(query !== '') {
					this.loadBrandloading = true;
					sbrandList({
						pageNo: '',
						pageSize: '100',
						name: query
					}).then((res) => {
						this.brandList = res.content;
						this.loadBrandloading = false;
					}).catch((res) => {
						this.$message({
							type: 'error',
							message: res.message
						});
					})
				} else {
					this.brandList = [];
				}
			},
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt5M = file.size / 1024 / 1024 < 5;
				if(!isJPG && !isPNG) {
					this.$message.error('上传图片只能是 JPG 、PNG格式!');
					return false
				}
				if(!isLt5M) {
					this.$message.error('上传图片大小不能超过 5MB!');
					return false;
				}
				getUploadImgSrc(file).then((res) => {
					this.storeBrandsQuali[this.currentUpload].imgurls.push({
						naem: '',
						url: res,
						index: this.currentUpload
					});
				}).catch((res) => {
					console.log('error ', res);
					this.$message({
						type: 'error',
						message: res.message
					});
				});
			},
			BrandBeforeUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt5M = file.size / 1024 / 1024 < 5;
				if(!isJPG && !isPNG) {
					this.$message.error('上传图片只能是 JPG、PNG 格式!');
					return false
				}
				if(!isLt5M) {
					this.$message.error('上传图片大小不能超过 5MB!');
					return false;
				}
				getUploadImgSrc(file).then((res) => {
					if(this.brandCurrentUpload == 'tradeMarkLicense') {
						this.tradeMarkLicenseImgs.push({
							name: '',
							url: res
						})
					} else if(this.brandCurrentUpload == 'supplementMaterial') {
						this.supplementMaterialImgs.push({
							name: '',
							url: res
						})
					} else if(this.brandCurrentUpload == 'brandLicensing') {
						this.brandLicensingImgs.push({
							name: '',
							url: res
						})
					}

				}).catch((res) => {
					console.log('error ', res);
					this.$message({
						type: 'error',
						message: res.message
					});
				});
			},
			brandsQualiRemove(index, index1) {
				this.storeBrandsQuali[index].imgurls.splice(index1, 1);
			},
			traHandleRemove(file, fileList) {
				this.tradeMarkLicenseImgs = fileList;
			},
			supHandleRemove(file, fileList) {
				this.supplementMaterialImgs = fileList;
			},
			branHandleRemove(file, fileList) {
				this.brandLicensingImgs = fileList;
			},
			//获取主营类目
			_oneleve() {
				let promise = new Promise((resolve, reject) => {
					oneleve().then((res) => {
						this.oneleves = res;
						resolve(res);
					}).catch((res) => {
						this.$message({
							type: 'error',
							message: res.message
						});
						reject(res);
					})
				});
				return promise;
			},
			//提交资料
			submitForm(formName) {
				let _this = this;
				console.log('storeBrandsQuali ---- ', this.storeBrandsQuali);
				_this.ruleForm.storeManageCategories = [];
				this.storeBrandsQuali.forEach((item) => {
					let imgUrls = [];
					item.imgurls.forEach((item1) => {
						imgUrls.push(item1.url);
					})
					_this.ruleForm.storeManageCategories.push({
						categoryId: item.id,
						aptitudeImg: imgUrls.join(','),
					});
				})

				//校验行业业资质是否上传
				let va = true;
				first: //需要将循环命名  
					for(var i = 0; i < this.storeBrandsQuali.length; i++) {
						if(this.storeBrandsQuali[i].needQualifications == 1 && this.storeBrandsQuali[i].imgurls.length == 0) {
							va = false;
							break first; //跳出循环first  
						}
					}
				if(!va) {
					this.ziError = true;
					return false;
				}
				this.ruleForm.storeBrands = [...this.tableData];

				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.submitloading = true;
						this.btnTxt = '提交中...';
						this.ziError = false;
						if(this.ruleForm.id) {
							//不是审核失败的店铺无法再次提交审核
							if(this.storeStatus != 'AUDIT_FALL') {
								this.$message({
									type: 'error',
									message: '该状态下的店铺无法再次提交审核，详情请联系管理员'
								})
								return false;
							}
							console.log('ruel form ', this.ruleForm);
							// return;
							updatestoreInfo(this.ruleForm).then((res) => {
								this.$message({
									type: 'success',
									message: '提交成功！'
								})
								let storeInfo = res;
								sessionStorage.setItem('store', JSON.stringify(storeInfo));
								let user = JSON.parse(localStorage.getItem('user')) || {};
								user.store && (user.store.status = "WAIT_AUDIT");
								localStorage.setItem('user', JSON.stringify(user));
								setTimeout(function() {
									_this.$router.push({
										path: '/join/stroeaudit',
										query: {
											id: _this.ruleForm.id
										}
									})
								}, 2000);
							}).catch((res) => {
								this.submitloading = false;
								this.btnTxt = '下一步';
								this.$message({
									type: 'error',
									message: res.message
								})
							})
						} else {
							storeAdd(this.ruleForm).then((res) => {
								let storeInfo = res;
								sessionStorage.setItem('store', JSON.stringify(storeInfo));								
								
								this.$message({
									type: 'success',
									message: '提交成功！'
								})
								setTimeout(function() {
									_this.$router.push({
										path: '/join/stroeaudit',
										query: {
											id: res.id
										}
									})
								}, 2000)
							}).catch((res) => {
								this.submitloading = false;
								this.btnTxt = '下一步';
								this.$message({
									type: 'error',
									message: res.message
								})
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			saveForm(formName) {
				let _this = this;
				let tradeMarkLicenses = [],
					supplementMaterials = [],
					brandLicensings = [];
				_this.tradeMarkLicenseImgs.forEach((item) => {
					tradeMarkLicenses.push(item.url);
				})
				_this.supplementMaterialImgs.forEach((item) => {
					supplementMaterials.push(item.url);
				})
				_this.brandLicensingImgs.forEach((item) => {
					brandLicensings.push(item.url);
				})
				_this.ruleForm1.isShowTradeMarkLicense = tradeMarkLicenses[0];
				_this.ruleForm1.isShowBrandLicensing = brandLicensings[0];
				_this.ruleForm1.tradeMarkLicense = tradeMarkLicenses.join(',');
				_this.ruleForm1.supplementMaterial = supplementMaterials.join(',');
				_this.ruleForm1.brandLicensing = brandLicensings.join(',');
				console.log('_this.ruleform1 ', _this.ruleForm1, _this.tableData)
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						if(_this.isEditOradd == 'add') {

							_this.tableData.push(Object.assign({}, _this.ruleForm1));

						} else if(_this.isEditOradd == 'edit') {

							_this.tableData.splice(_this.editBrandIndex, 1, Object.assign({}, _this.ruleForm1));

						}

						_this.editBrandQuaDialog = false;

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleEdit(row, index) {

				this.editBrandIndex = index;
				this.isEditOradd = 'edit';
				this.tradeMarkLicenseImgs = [];
				this.supplementMaterialImgs = [];
				this.brandLicensingImgs = [];
				this.ruleForm1.brandName = row.brandName;
				this.ruleForm1.tradeLicenseType = String(row.tradeLicenseType);
				let tradeMarkLicenses = row.tradeMarkLicense.split(','),
					supplementMaterials = row.supplementMaterial.split(','),
					brandLicensings = row.brandLicensing.split(',');
				tradeMarkLicenses.forEach((item) => {
					this.tradeMarkLicenseImgs.push({
						name: '',
						url: item
					});
				});
				supplementMaterials.forEach((item) => {
					if(item) {
						this.supplementMaterialImgs.push({
							name: '',
							url: item
						});
					}
				});
				brandLicensings.forEach((item) => {
					this.brandLicensingImgs.push({
						name: '',
						url: item
					});
				});

				this.editBrandQuaDialog = true;
			},
			_storeDetail(id) {
				storeDetail({
					id: id
				}).then((res) => {
					//资料回显
					if(res.status=='WAIT_AUDIT'){
		       			 this.$router.push({
			         		 path:'/join/stroeaudit',
			         		 query:{id:res.id}
		        		 })	
					}else{			
					let _this = this;
					this.storeStatus = res.status;
					this.ruleForm.id = res.id;
					this.ruleForm.name = res.name;
					this.ruleForm.storeType = res.type;
					this.tableData = res.storeBrandVOS;
					console.log('table data ', this.tableData);
					this._oneleve().then(levesRes => {
						res.storeManageCategoryVOS.forEach((item) => {
							_this.checkList1.push(item.categoryId);

							_this.checkList.push(item.categoryId);

							_this.oneleves.forEach((item1) => {
								if(item.categoryId == item1.id) {
									_this.chenckedleves.push(item1);
									_this.storeBrandsQuali.push({
										qualificationsName: item1.qualificationsName,
										reminderWord: item1.reminderWord,
										imgurls: item.aptitudeImg,
										needQualifications: item1.needQualifications,
										id: item.categoryId,
									})
								}
							})
						})
						_this.storeBrandsQuali.forEach((item) => {
							if(item.needQualifications == 1) {
								_this.needQualificationsids.push(item.id);
							}
						})
						_this.tableData = _this.tableData.map(x => {
							x.isShowTradeMarkLicense = x.tradeMarkLicense && x.tradeMarkLicense.split(',')[0];
							x.isShowBrandLicensing = x.brandLicensing.split(',')[0];
							return x;
						});
						console.log('table data ', _this.tableData);

					});
				}	
				}).catch((res) => {
					console.log(res.message);
//					this.$message({
//						type: 'error',
//						message: res.message
//					})
				})

			}
		},
		mounted() {
			let storeInfo = JSON.parse(sessionStorage.getItem('store')) || '';
			this.ruleForm.storeType = this.$route.query.type || '';
			let id = this.$route.query.id;
			if(id) {
				this._storeDetail(id);
			} else if(storeInfo){
				this._storeDetail(storeInfo.id);
			}
			this._oneleve();
		},

	}
</script>

<style lang="scss" scoped>
	@import url("../join/elStyle.css");
	.join_content {
		width: 100%;
		background: #FFFFFF;
	}
	
	.info_content {
		width: 1200px;
		margin: auto;
		margin-top: 30px;
		border: 1px solid #E6E6E6;
	}
	
	.form_content {
		width: 100%;
		padding: 40px 70px 70px 70px;
	}
	
	.item_title {
		font-size: 18px;
		color: #333333;
		font-weight: bold;
		margin-bottom: 10px;
	}
	
	.tip {
		line-height: 18px;
		font-size: 12px;
		color: #999999;
	}
	
	.checkContent {
		text-align: left;
		padding-top: 20px;
	}
	
	.dialog-footer {
		display: inline-block;
		height: 50px;
		line-height: 50px;
		width: 100%;
		text-align: center;
	}
	
	.tableContent {
		margin-top: 20px;
		width: 80%;
	}
	
	.btnBox {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-align: center;
		border-top: 1px solid gainsboro;
		.submitBtn {
			border: none;
			background: none;
			padding: 0 15px;
			width: 150px;
			height: 40px;
			line-height: 35px;
			background: #4DA9E4;
			border-radius: 2px;
			border: 1px solid #4DA9E4;
			color: #FFFFFF;
			font-size: 14px;
			margin-right: 30px;
		}
		.submitBtn:hover {
			opacity: 0.8;
		}
	}
	
	.hyzz ul {
		width: 100%;
		margin-top: 14px;
		.uploadimgs {
			overflow: hidden;
			position: relative;
			width: 90px;
			height: 120px;
			padding: 5px;
			display: inline-block;
			margin-right: 10px;
			border: 1px solid gainsboro;
			img {
				width: 80px;
				height: 110px;
			}
			.delete {
				position: absolute;
				width: 100%;
				height: 120px;
				line-height: 120px;
				text-align: center;
				color: #FFFFFF;
				display: block;
				z-index: 100;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, .7);
				cursor: pointer;
				display: none;
			}
		}
		.uploadimgs:hover .delete {
			display: block;
		}
	}
</style>