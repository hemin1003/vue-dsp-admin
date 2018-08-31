<template>
	<div class="unit_one">
		<div class="unit_one_top">
			<div class="unit_o_left_btn" @click="goBack"><i class="el-icon-arrow-left"></i>{{msg}}</div>
			<div class="unit_o_right">
				<div class="enter_btn" v-if="!btn_turn">
					<el-button type="primary" @click="EditFn" plain><i class="el-icon-edit"></i><span>编辑</span></el-button>
					<el-button type="danger" plain><i class="el-icon-delete"></i><span>删除</span></el-button>
					<el-button type="primary" plain><i class="el-icon-document"></i><span>复制</span></el-button>
				</div>
				<div class="out_btn" v-if="btn_turn">
					<el-button type="primary"><span>保存</span></el-button>
					<el-button type="danger" @click="cancelFn" plain><span>取消</span></el-button>
				</div>
				<el-switch 
			        on-text ="上线"
                    off-text = "暂停"
                    on-color="#00D1B2"
                    off-color="#dadde5" 
                    v-model="turn"
                    >
				</el-switch>
			</div>
		</div>
		<div class="unit_o_content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="ruleForm.name" :disabled="Disabled"></el-input>
					<span class="unit_infro">为您的广告主取一个唯一的名字，建议客户名称与营业执照一致</span>
				</el-form-item>
				
				<el-form-item label="邮箱" prop="url">
					<el-input v-model="ruleForm.email" :disabled="Disabled"></el-input>
					<span class="unit_infro">填一个广告主的邮箱账号，可以为广告主申请用这个邮箱来登录查看信息</span>
				</el-form-item>

				<el-form-item label="类型" prop="url">
					<el-select v-model="ruleForm.action" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="理财" value="action"></el-option>
				    	<el-option label="哦哦哦" value="download"></el-option>
				    </el-select>
					<span class="unit_infro">为广告主选择一个正确的类型，可以更好的获取到精准用户</span>
				</el-form-item>

				<el-form-item label="级别">
					<el-radio-group v-model="ruleForm.level">
					    <el-radio label="A">A</el-radio>
					    <el-radio label="B">B</el-radio>
					    <el-radio label="C">C</el-radio>
					 </el-radio-group>
				</el-form-item>

				<el-form-item label="联系人名称">
					<el-input v-model="ruleForm.contactName" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item label="联系人电话">
					<el-input v-model="ruleForm.contactTel" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item label="联系人地址">
					<el-input v-model="ruleForm.contactAddress" :disabled="Disabled"></el-input>
				</el-form-item>
				
				<!--  prop="title" -->
				<el-form-item label="营业执照">
					<el-upload
					  :disabled="Disabled"
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="ruleForm.businessLicenseUrl" :src="ruleForm.businessLicenseUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="ICP证书">
					<el-upload
					  :disabled="Disabled"
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="ruleForm.icpUrl" :src="ruleForm.icpUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				
				<el-form-item label="其他资质">
					<el-upload
					  :disabled="Disabled"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="ruleForm.othersUrl" alt="">
					</el-dialog>
				</el-form-item>

				<el-form-item label="邮箱通知">
					<el-switch
					  on-text ="启用"
                      off-text = "禁用"
					  :disabled="Disabled"
					  v-model="ruleForm.isNotifyByEmail"
					  active-color="#13ce66"
					  inactive-color="#ff4949">
					</el-switch>
				</el-form-item>

				<el-form-item label="备注" prop="url">
					<el-input
					  :disabled="Disabled"
					  type="textarea"
					  :rows="4"
					  placeholder="请输入内容"
					  v-model="ruleForm.descInfo">
					</el-input>
					<span class="unit_infro">备注信息可以填写一些您所需要的其他信息</span>
				</el-form-item>
  <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				mailVal: true,
				msg: "返回列表",
				turn: false,
				btn_turn: false,
				imageUrl: "",
				Disabled: "",
				uploaderData: ["图片一","图片二","图片三"],
				ruleForm: {
		          name: '',
		          url: '',
		          desc: '',
		          action: 'action',
		          types: 'no',
		          exposure: '',
		          Clicktypes: 'no',
		          Click: '',
		          message_ad: 'kinds',
		          M_type: 'edu',
		          title: ''
		        },
		        rules: {
		          name: [
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
		        }
		      }
			},
		mounted() {
			console.log(this.hostname);
			this.Init();
		},
		methods: {
			Init() {
				var that = this;
				console.log(this.$route.query.id);
				var datas = {
					id: this.$route.query.id
				}
				this.$axios.get(this.hostname+'/manage/dsp/userInfo/admin/toEdit',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data);
                    that.ruleForm = res.data;

                    // 邮箱是否通知
                    if(that.ruleForm.isNotifyByEmail == 0) {

                    }
                }, function(err){
                    console.log(err);
                })
			},
			goBack() {
				this.$router.go(-1);
			},
			EditFn() {
				this.Disabled = null;
				this.btn_turn = true;
			},
			cancelFn() {
				this.Disabled = "";
				this.btn_turn = false;
			},
			getAds() {
				let name = this.ruleForm.message_ad;
				if(name == "kinds") {
					this.uploaderData = ["图片一","图片二","图片三"];
				}else if(name == "direction") {
					this.uploaderData = ["图片"];
				}else if(name == "big") {
					this.uploaderData = ["大图"];
				}
			},
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
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
		  .avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		  }
		  .avatar {
		    width: 178px;
		    height: 178px;
		    display: block;
		  }
</style>