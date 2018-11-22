<template>
	<div class="unit_one">
		<div class="unit_one_top">
			<div class="unit_o_left_btn" @click="goBack"><i class="el-icon-arrow-left"></i>{{msg}}</div>
			<div class="unit_o_right">
				<div class="enter_btn" v-if="!btn_turn">
					<el-button type="primary" @click="EditFn" plain><i class="el-icon-edit"></i><span>编辑</span></el-button>
				</div>
				<div class="out_btn" v-if="btn_turn">
					<el-button type="primary" @click="saveFn"><span>保存</span></el-button>
					<el-button type="danger" @click="cancelFn" plain><span>取消</span></el-button>
				</div>
				<el-switch 
					@change="changeFn"
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
					<span class="unit_infro">为您的广告项目取一个唯一的名称，格式如下：广告主名称_产品名称，10个字以内</span>
				</el-form-item>
				
				<el-form-item label="合同编号" prop="pId">
					<el-input v-model="ruleForm.contractId" :disabled="Disabled"></el-input>
					<span class="unit_infro">写一个唯一的合同编号信息，若没有签订合同，请根据需求填写下项目编号信息：投放日期_广告主名称缩写_该广告主投放的项目编号</span>
				</el-form-item>

				<el-form-item label="单日预算">
					<el-input v-model="ruleForm.base_dayBudget" type="number" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item label="商务邮箱">
					<div>{{ruleForm.businessEmail}}</div>
					<span class="unit_infro">您的专属客服代表</span>
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
				Disabled: "",
				ruleForm: {},
		        rules: {
		          name: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          pId: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ]
		        }
		      }
			},
		mounted() {
			this.Init();
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
				this.Init();
			},
			// 保存操作
			saveFn() {
				var that = this;
				var params = new URLSearchParams();
				let username = localStorage.getItem('ms_username');
				let links;
				params.append('id', that.$route.query.id);
				params.append('name', that.ruleForm.name);
				params.append('contractId', that.ruleForm.contractId);
				params.append('base_dayBudget', that.ruleForm.base_dayBudget);
				if(that.$route.query.type == "add") {
					params.append('pId', that.$route.query.id);
					params.append('loginUserName', username);
					links = "add";
				}else {
					params.append('pId', that.Pid)
					links = "update";
				}
				that.$axios.post(that.hostname+'/manage/dsp/project/admin/'+links,params).then(function(res){
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
			// 初始渲染数据fn
			Init() {
				var that = this;
				console.log(this.$route.query.type);
				if(that.$route.query.type == "add") {
					that.Disabled = null;
					that.btn_turn = true;
				}else {
					var datas = {
						id: this.$route.query.id
					}
					that.$axios.get(this.hostname+'/manage/dsp/project/admin/toEdit',{params: datas}).then(function(res){
						// 响应成功回调
						console.log(res.data);
						that.ruleForm = res.data;
						that.Pid = that.ruleForm.pId;
						if(that.ruleForm.onlineStatus == 0) {
							that.ruleForm.turn = false;
						}else {
							that.ruleForm.turn = true;
						}
					}, function(err){
						console.log(err);
					})
				}
			},
			// 上下线
			changeFn(val) {
				var Values;
				if(val) {
					Values = 1
				}else {
					Values = 0
				}
				this.publicFn.statusInitFn(this,this.ruleForm.id,Values,'/manage/dsp/project/admin/changeStatus');
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

		.unit_o_content {
			width: 100%;
			margin-top: 1vw;
			padding: 2vw 0 .2vw 0;
			background: #FAFAFA;
		}
			.unit_o_content form {
				width: 70%;
				margin-left: 15%;
			}

		.unit_infro {
			color: gray;
		}
</style>