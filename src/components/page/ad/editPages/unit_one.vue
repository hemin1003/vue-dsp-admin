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
					<span class="unit_infro">为您的广告单元取一个唯一的名称，10个字以内，建议带上活动_物料信息等</span>
				</el-form-item>
				
				<el-form-item label="点击链接" prop="url">
					<el-input v-model="ruleForm.url" :disabled="Disabled"></el-input>
					<span class="unit_infro">请填写您的广告的跳转地址或者落地页地址，开头格式为http://，示例：http://www.adxhi.com</span>
				</el-form-item>

				<el-form-item label="点击动作" prop="url">
					<el-select v-model="ruleForm.action" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="跳转" value="action"></el-option>
				    	<el-option label="下载" value="download"></el-option>
				    </el-select>
					<span class="unit_infro">用来表示您的跳转地址点击后是直接下载的还是进行跳转的</span>
				</el-form-item>

				<el-form-item label="曝光监控类型">
					<el-select v-model="ruleForm.types" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="秒针" value="miao"></el-option>
				    	<el-option label="AdMaster" value="ad"></el-option>
				    	<el-option label="无" value="no"></el-option>
				    </el-select>
				</el-form-item>

				<el-form-item label="曝光监控链接">
					<el-input v-model="ruleForm.exposure" :disabled="Disabled"></el-input>
					<span class="unit_infro">可以支持第三方链接上报曝光</span>
				</el-form-item>

				<el-form-item label="点击监控类型">
					<el-select v-model="ruleForm.Clicktypes" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="秒针" value="miao"></el-option>
				    	<el-option label="AdMaster" value="ad"></el-option>
				    	<el-option label="无" value="no"></el-option>
				    </el-select>
				</el-form-item>

				<el-form-item label="点击监控链接">
					<el-input v-model="ruleForm.Click" :disabled="Disabled"></el-input>
					<span class="unit_infro">可以支持第三方链接上报点击</span>
				</el-form-item>
  <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
</el-form>
		</div>

		<div class="unit_o_content2">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="样式" prop="url">
					<el-select v-model="ruleForm.message_ad" @change="getAds" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="信息流-三图" value="kinds"></el-option>
				    	<el-option label="信息流-左图右文" value="direction"></el-option>
				    	<el-option label="大图" value="big"></el-option>
				    </el-select>
				    <span class="unit_infro">选择您想要的广告展示样式</span>
				</el-form-item>

				<el-form-item label="物料类型" prop="url">
					<el-select v-model="ruleForm.M_type" style="width: 100%;" :disabled="Disabled">
				    	<el-option label="其他" value="other"></el-option>
				    	<el-option label="装修建材" value="building"></el-option>
				    	<el-option label="教育" value="edu"></el-option>
				    	<el-option label="美容整形" value="plastic"></el-option>
				    	<el-option label="家居用品" value="Housewear"></el-option>
				    	<el-option label="医疗健康" value="health"></el-option>
				    	<el-option label="游戏" value="game"></el-option>
				    	<el-option label="社交" value="Social"></el-option>
				    </el-select>
				    <span class="unit_infro">为您的物料选择正确的类型，方便您对物料库的调用</span>
				</el-form-item>

				<el-form-item label="标题" prop="title">
					<el-input v-model="ruleForm.title" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item v-for="items in uploaderData" :label="items" prop="title">
					<el-upload
					  :disabled="Disabled"
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
		methods: {
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