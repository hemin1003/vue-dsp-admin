<template>
	<div class="unit_one">
		<div class="unit_one_top">
			<div class="unit_o_left_btn" @click="goBack"><i class="el-icon-arrow-left"></i>{{msg}}</div>
			<div class="unit_o_right">
				<div class="enter_btn" v-if="!btn_turn">
					<el-button type="primary" @click="EditFn" plain><i class="el-icon-edit"></i><span>编辑</span></el-button>
					<el-button type="danger" @click="DelFn" plain><i class="el-icon-delete"></i><span>删除</span></el-button>
					<!-- <el-button type="primary" plain><i class="el-icon-document"></i><span>复制</span></el-button> -->
				</div>
				<div class="out_btn" v-if="btn_turn">
					<el-button type="primary" @click="saveFn"><span>保存</span></el-button>
					<el-button type="danger" @click="cancelFn" plain><span>取消</span></el-button>
				</div>
				<el-switch 
					@change="changeFn"
					:disabled="isDisable"
			        on-text ="上线"
                    off-text = "暂停"
                    on-color="#00D1B2"
                    off-color="#dadde5" 
                    v-model="turn"
                    >
				</el-switch>
				<el-tag type="success" style="float: right; margin-right: 1vw; margin-top:5px">{{statusInfo}}</el-tag>
			</div>
		</div>
		<div class="unit_o_content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="ruleForm.base_name" :disabled="Disabled"></el-input>
					<span class="unit_infro">为您的广告单元取一个唯一的名称，10个字以内，建议带上活动_物料信息等</span>
				</el-form-item>
				
				<el-form-item label="点击动作" prop="desc">
					<el-select v-model="ruleForm.clickAction" style="width: 100%;" :disabled="Disabled">
						<el-option v-for="(items,index) in ClickTypes" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
				    </el-select>
					<span class="unit_infro">用来表示您的跳转地址点击后是直接下载的还是进行跳转的</span>
				</el-form-item>

				<el-form-item label="点击链接" prop="clickUrl">
					<el-input v-model="ruleForm.clickUrl" :disabled="Disabled"></el-input>
					<span class="unit_infro">请填写您的广告的跳转地址或者落地页地址，开头格式为http://，示例：http://www.adxhi.com</span>
				</el-form-item>

				<el-form-item label="曝光频次" prop="frequency">
					<el-input v-model="ruleForm.userExposureNumBudget" type="number" :disabled="Disabled"></el-input>
					<span class="unit_infro">每日单个用户最多能看到这个广告的次数</span>
				</el-form-item>

				<el-form-item label="点击频次" prop="Click_times">
					<el-input v-model="ruleForm.userClickNumBudget" :disabled="Disabled"></el-input>
					<span class="unit_infro">每日单个用户最多能点击这个广告的次数</span>
				</el-form-item>

				<el-form-item label="单日预算">
					<el-input v-model="ruleForm.base_dayBudget" type="number" :disabled="Disabled"></el-input>
				</el-form-item>

				<!-- <el-form-item label="曝光监控类型">
					<el-select v-model="ruleForm.impressionMonitorType" style="width: 100%;" :disabled="Disabled">
				    	<el-option v-for="(items,index) in ExposureMonitoringType" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
				    </el-select>
				</el-form-item>

				<el-form-item label="曝光监控链接">
					<el-input v-model="ruleForm.impressionMonitorUrl" :disabled="Disabled"></el-input>
					<span class="unit_infro">可以支持第三方链接上报曝光</span>
				</el-form-item>

				<el-form-item label="点击监控类型">
					<el-select v-model="ruleForm.clickMonitorType" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="秒针" value="1"></el-option>
				    	<el-option label="AdMaster" value="2"></el-option>
				    </el-select>
				</el-form-item>

				<el-form-item label="点击监控链接">
					<el-input v-model="ruleForm.clickMonitorUrl" :disabled="Disabled"></el-input>
					<span class="unit_infro">可以支持第三方链接上报点击</span>
				</el-form-item> -->
  <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
</el-form>
		</div>

		<div class="unit_o_content2">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="样式">
					<el-select v-model="ruleForm.showType" @change="getAds" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="单图" value="1"></el-option>
				    	<el-option label="三图" value="2"></el-option>
				    	<el-option label="大图" value="0"></el-option>
				    </el-select>
				    <span class="unit_infro">选择您想要的广告展示样式</span>
				</el-form-item>

				<el-form-item label="物料类型" >
					<el-select v-model="ruleForm.materialType" style="width: 100%;" :disabled="Disabled">
				    	<el-option v-for="(items,index) in MaterialType" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
				    </el-select>
				    <span class="unit_infro">为您的物料选择正确的类型，方便您对物料库的调用</span>
				</el-form-item>

				<el-form-item label="标题" prop="title">
					<el-input v-model="ruleForm.title" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item v-for="(items,index) in uploaderData" :key="index" :label="items" prop="title">
					<!-- http://sys.midongtech.com  http://182.92.82.188:8280 -->
					<el-upload
					  :disabled="Disabled"
					  class="avatar-uploader"
					  :data="uploadDatas"
					  action="http://sys.midongtech.com/manage/sys/fileHandle/upload"
					  :on-preview="handlePreview"
					  list-type="text"
					  :on-success="(value)=> handleAvatarSuccess(index, value)"
					  :before-upload="beforeAvatarUpload"
					  :on-remove="(value)=> handleRemove(index, value)"
					  >
					  <!-- <el-dialog visible.sync="dialogVisible"> -->
						<div class="coverDialog" v-if="!btn_turn">
							<div class="layer" @click="handleFileEnlarge(index)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
						</div>
					  	<img v-if="imgUrlArr[index]" :src="imgUrlArr[index]" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					  <!-- </el-dialog> -->
					  
					</el-upload>
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				uploadDatas: {
					bucket: "mddsp",
					ohtersPic: []
				},
				imgUrlArr: [],
				msg: "返回列表",
				turn: true,
				btn_turn: false,
				imageUrl: "",
				Disabled: "",
				uploaderData: ["图片一","图片二","图片三"],
				ruleForm: {},
		        rules: {
		          clickUrl: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          url: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          desc: [
		            { required: true, message: '请填写活动形式', trigger: 'blur' }
		          ],
		          title: [
		          	{ required: true, message: '这一项是必填的', trigger: 'blur' }
		          ]
				},
				isDisable: true
		      }
			},
		mounted() {
			setTimeout(this.Init.bind(this),20);
			this.ListFn("b019","ExposureMonitoringType"); //曝光监控类型
			this.ListFn("b018","MaterialType"); // 物料类型
			this.ListFn("b023","ClickTypes"); // 点击动作
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			EditFn() {
				// 10.25新增状态判断是否可编辑
				if(this.ruleForm.proveStatus == 1 || this.ruleForm.proveStatus == 2) {
					 this.$message({
						message: '当前审核状态不可编辑！',
						type: 'warning'
					});
				}else {
					this.Disabled = null;
					this.btn_turn = true;
				}
				
			},
			cancelFn() {
				this.Disabled = "";
				this.btn_turn = false;
			},
			// 获取下拉菜单fn
			ListFn(num,contain) {
				var that = this;
				console.log(contain);
				var datas = {
					busNum: num
				}
				that.$axios.get(this.hostname+'/manage/dsp/param/listDspConfigData',{params: datas}).then(function(res){
                    // 响应成功回调
					console.log(res.data);
					that[contain] = res.data;
                }, function(err){
                    console.log(err);
                })
			},
			// 初始渲染数据fn
			Init() {
				var that = this;
				if(that.$route.query.type == "add") {
					that.Disabled = null;
					that.btn_turn = true;
				}else {
					var datas = {
						id: that.$route.query.id
					}
					that.$axios.get(this.hostname+'/manage/dsp/unit/admin/toEdit',{params: datas}).then(function(res){
						// 响应成功回调
						console.log(res.data);
						// that.$options.methods.test('646646');
						that.ruleForm = res.data;
						that.imgUrlArr = that.ruleForm.imgUrl.split(',');
						
						if(res.data.onlineStatus == 1) {
							that.turn = true
						}else {
							that.turn = false
						}
						// 审核状态判断
                    	switch(res.data.proveStatus) {
	                    	case 0:
	                    		that.statusInfo = "未提交";
	                    		break;
	                    	case 1:
	                    		that.statusInfo = "审核中";
	                    		break;
	                    	case 2:
	                    		that.statusInfo = "审核成功";
	                    		that.isDisable = null
	                    		break;
	                    	case 3:
	                    		that.statusInfo = "审核失败";
	                    		break;
	                    }
					}, function(err){
						console.log(err);
					})
				}
			},
			getAds() {
				let name = this.ruleForm.showType;
				if(name == "2") {
					this.uploaderData = ["图片一","图片二","图片三"];
				}else if(name == "1") {
					this.uploaderData = ["图片"];
				}else if(name == "3") {
					this.uploaderData = ["大图"];
				}
			},
			handleAvatarSuccess(i, res, file) {
				if(res.resultCode == 200) {
					this.imgUrlArr.splice(i,1,res.data);
					this.ruleForm.imgUrl = this.imgUrlArr; 
					console.log(this.ruleForm.imgUrl);
				}
		    },
		    yyleAvatarSuccess(res) {
		    	if(res.resultCode == 200) {
					this.ruleForm.businessLicenseUrl = res.data;
				}
		    },
		    beforeAvatarUpload(file) {
				console.log('6666666');
				// this.imgUrlArr = [];
		        // const isJPG = file.type === 'image/jpeg';
		        // const isLt2M = file.size / 1024 / 1024 < 2;
		        // if (!isJPG) {
		        //   this.$message.error('上传头像图片只能是 JPG 格式!');
		        // }
		        // if (!isLt2M) {
		        //   this.$message.error('上传头像图片大小不能超过 2MB!');
		        // }
		        // return isJPG && isLt2M;
			},
			handlePreview(file) {
				console.log(file);
			},
			handleFileRemove(a) {
				console.log(a);
			},
			// 预览查看图片
			handleFileEnlarge(indexs) {
				window.open(this.imgUrlArr[indexs]);
			},
			// 删除上传图片
		    handleRemove(index,file) {
		    	console.log(file.url);
		    	for(var i = 0, L = this.imgUrlArr.length; i < L; i++) {
		    		if(file.url == this.imgUrlArr[i]) {
		    			console.log(i);
		    			this.imgUrlArr.splice(i,1);
		    		}
		    	}
		    },
			// 保存操作
			saveFn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				let links;
				var params = new URLSearchParams();
				params.append('id', that.$route.query.id);
				params.append('base_name', that.ruleForm.base_name);
				params.append('clickUrl', that.ruleForm.clickUrl);
				// params.append('base_channel', that.ruleForm.base_channel);
				params.append('clickAction', that.ruleForm.clickAction);
				// params.append('impressionMonitorUrl', that.ruleForm.impressionMonitorUrl);  //曝光监控类型
				// params.append('clickMonitorType', that.ruleForm.clickMonitorType);  //点击监控类型
				// params.append('clickMonitorUrl', that.ruleForm.clickMonitorUrl);  //点击监控链接

				params.append('userExposureNumBudget', that.ruleForm.userExposureNumBudget);  //单个用户曝光频次
				params.append('userClickNumBudget', that.ruleForm.userClickNumBudget);  //单个用户点击频次
				params.append('base_dayBudget', that.ruleForm.base_dayBudget);  //当日预算金额

				params.append('showType', that.ruleForm.showType);
				params.append('materialType', that.ruleForm.materialType);
				params.append('title', that.ruleForm.title);
				params.append('imgUrl', that.ruleForm.imgUrl);
				params.append('proveStatus', 1);
				if(that.$route.query.type == "add") {
					params.append('pId', that.$route.query.id);
					params.append('loginUserName', username);
					links = "add";
				}else {
					links = "update";
				}
				that.$axios.post(that.hostname+'/manage/dsp/unit/admin/'+links,params).then(function(res){
                    // 响应成功回调
                    console.log(res.data);
                    if(res.data.resultCode == 200) {
                    	that.Disabled = "";
						that.btn_turn = false;
                    	that.$notify({
				          title: '成功',
				          message: res.data.message,
				          type: 'success'
				        });
                    }else {
                    	that.$notify.error({
				          title: '错误',
				          message: res.data.message
				        });
                    }
                }, function(err){
                    console.log(err);
                })
			},
			// 上下线
			changeFn(val) {
				var Values;
				if(val) {
					Values = 1
				}else {
					Values = 0
				}
				this.publicFn.statusInitFn(this,this.ruleForm.id,Values,'/manage/dsp/unit/admin/changeStatus');
			},
			// 删除操作
			DelFn() {
				let that = this;
				var datas = {
					id: that.$route.query.id
				}
				that.$axios.post(this.hostname+'/manage/dsp/unit/admin/deleteById',{params: datas}).then(function(res){
                    // 响应成功回调
					console.log(res.data);
					if(res.data.resultCode == 200) {

					}else {
						that.$notify.error({
							title: '错误',
							message: "删除失败！"
						});
					}
                }, function(err){
                    console.log(err);
                })
			}
    	}
	}
</script>
<style>
	.unit_one_top {
		width: 100%;
		height: 2vw;
		line-height: 2vw;
		/*background: red;*/
	}
		.unit_o_left_btn {
			float: left;
			width: 120px;
			height: 100%;
			text-align: center;
			background: #D8D8D8;
			font-size: .9rem;
			cursor: pointer;
		}
		.coverDialog {
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			display: none;
			color: white;
		}
		.unit_o_left_btn:hover {
			font-weight: bold;
		}
			.unit_o_left_btn i {
				font-size: .8rem;
				margin-right: 5px;
			}
		.unit_o_right {
			float: right;
			width: 30%;
			height: 100%;
		}
		.unit_o_right button {
			float: right;
			margin-left: 15px;
			height: 90%;
			width: 80px;
			font-size: .9rem;
		}
		.unit_o_right label {
			float: right;
			margin-right: 15px;
			margin-top: 7px;
		}

		.unit_o_content,.unit_o_content2 {
			width: 100%;
			margin-top: 1vw;
			padding: 2vw 0 .2vw 0;
			background: #FAFAFA;
		}
			.unit_o_content form,.unit_o_content2 form {
				width: 70%;
				margin-left: 15%;
			}

		.unit_infro {
			color: gray;
		}

		/*图片上传样式*/
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		    width: 200px;
		  }
		  .avatar-uploader .el-upload:hover {
		    border-color: #409EFF;
		  }
		  .avatar-uploader .el-upload:hover .coverDialog {
			display: block;
		}
		  .avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		  }
		  .avatar {
		    width: 100%;
		    height: 178px;
		    display: block;
		  }

		  .layer {
			  float: left;
			  width: 40%;
			  font-size: 1.2vw;
			  margin-top: 40%;
			  margin-left: 15%;
		  }
		  .del {
			  float: left;
			  width: 20%;
			  font-size: 1.2vw;
			  margin-top: 40%;
		  }
</style>