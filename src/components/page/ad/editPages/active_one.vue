<template>
	<div class="unit_one">
		<div class="unit_one_top">
			<div class="unit_o_left_btn" @click="goBack"><i class="el-icon-arrow-left"></i>{{msg}}</div>
			<div class="unit_o_right">
				<div class="enter_btn" v-if="!btn_turn">
					<el-button type="primary" @click="EditFn" plain><i class="el-icon-edit"></i><span>编辑</span></el-button>
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
			<el-collapse v-model="activeNames" @change="handleChange" style="width: 70%;margin-left: 15%;">
				<el-collapse-item title="基本信息" name="1">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
						<el-form-item label="名称" prop="name">
							<el-input v-model="ruleForm.name" :disabled="Disabled"></el-input>
							<span class="unit_infro">为您的广告项目取一个唯一的名称，格式如下：广告主名称_产品名称，10个字以内</span>
						</el-form-item>
						
						<el-form-item label="出价类型" prop="name">
						    <el-radio-group v-model="ruleForm.priceType" :disabled="Disabled">
						    	<el-radio label="now">实时出价</el-radio>
						    	<el-radio label="static">固定出价</el-radio>
						    </el-radio-group>
						    <div class="unit_infro">目前只支持竞价类型喔</div>
						</el-form-item>

						<el-form-item label="渠道" prop="name">
							<el-select v-model="ruleForm.ads" style="width: 100%;" :disabled="Disabled">
						    	<el-option label="悦头条" value="yyt"></el-option>
						    	<el-option label="cpl" value="cpl"></el-option>
						    	<el-option label="cpa" value="cpa"></el-option>
						    </el-select>
						</el-form-item>

						<el-form-item label="广告位" prop="name">
							<el-select v-model="ruleForm.direction" style="width: 100%;" :disabled="Disabled">
						    	<el-option label="信息流前两位随机" value="random"></el-option>
						    	<el-option label="信息流前末尾" value="bottom"></el-option>
						    	<el-option label="信息流前置顶" value="top"></el-option>
						    </el-select>
						    <span class="unit_infro">为您的活动选择一个想要投放的广告位</span>
						</el-form-item>

						<el-form-item label="广告位示例">
							<div><img src="./images/example.png" width="30%" alt="example"></div>
							<span class="unit_infro">您的广告会显示在图示红框位置</span>
						</el-form-item>
					</el-form>

				</el-collapse-item>
				<el-collapse-item title="时间控制" name="2">
			    	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

						<el-form-item label="速度控制" prop="name">
							<el-select v-model="ruleForm.speed" style="width: 100%;" :disabled="Disabled">
						    	<el-option label="加速" value="up"></el-option>
						    	<el-option label="匀速" value="uniform "></el-option>
						    </el-select>
						    <span class="unit_infro">为您的活动选择一个想要投放的广告位</span>
						</el-form-item>

						<el-form-item label="开始时间" prop="time">
						    <el-date-picker
						      v-model="Start_time"
						      type="date"
						      placeholder="请选择日期"
						      @change="startTime">
						    </el-date-picker>
						</el-form-item>

						<el-form-item label="结束时间">
						    <el-date-picker
						      v-model="End_time"
						      type="date"
						      placeholder="请选择日期">
						    </el-date-picker>
						    <div class="unit_infro">结束时间不填写表示不限制结束时间</div>
						</el-form-item>
						
						<el-form-item label="控制类型" prop="name">
							<el-select v-model="ruleForm.userType" style="width: 100%;" :disabled="Disabled">
						    	<el-option label="按IMEI识别用户" value="imei"></el-option>
						    	<el-option label="按IP识别用户" value="ip"></el-option>
						    </el-select>
						</el-form-item>

						<el-form-item label="曝光频次" prop="frequency">
							<el-input v-model="ruleForm.frequency" :disabled="Disabled"></el-input>
							<span class="unit_infro">每日单个用户最多能看到这个广告的次数</span>
						</el-form-item>

						<el-form-item label="点击频次" prop="Click_times">
							<el-input v-model="ruleForm.Click_times" :disabled="Disabled"></el-input>
							<span class="unit_infro">每日单个用户最多能点击这个广告的次数</span>
						</el-form-item>

						<el-form-item label="排期">
							<el-table
							    :data="tableData3"
							    height="250"
							    border
							    style="width: 100%">
							    <el-table-column
							      prop="date"
							      label="日期"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="name"
							      label="姓名"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="address"
							      label="地址">
							    </el-table-column>
							  </el-table>
							  
							<span class="unit_infro">选择一个具体的时间定向，只有在选中的时间内才会进行投放</span>
						</el-form-item>
					</el-form>
				</el-collapse-item>
				<el-collapse-item title="定向控制" name="3">
			    	<div>简化流程：设计简洁直观的操作流程；</div>
			    	<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
			    	<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
				</el-collapse-item>
				<el-collapse-item title="预算控制" name="4">
			    	<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
			    	<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
				</el-collapse-item>
			</el-collapse>
			<!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="ruleForm.name" :disabled="Disabled"></el-input>
					<span class="unit_infro">为您的广告项目取一个唯一的名称，格式如下：广告主名称_产品名称，10个字以内</span>
				</el-form-item>
				
				<el-form-item label="合同编号" prop="num">
					<el-input v-model="ruleForm.num" :disabled="Disabled"></el-input>
					<span class="unit_infro">写一个唯一的合同编号信息，若没有签订合同，请根据需求填写下项目编号信息：投放日期_广告主名称缩写_该广告主投放的项目编号</span>
				</el-form-item>

				<el-form-item label="商务邮箱">
					<div>niubi@dsdsdsds.com</div>
					<span class="unit_infro">您的专属客服代表</span>
				</el-form-item>
			</el-form> -->
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
				activeNames: ['1','2','3','4'],
				Disabled: "",
				Start_time: "",
				End_time: "",
				ruleForm: {
		          name: '',
		          num: '',
		          action: 'action',
		          priceType: 'now',
		          ads: 'yyt',
		          direction: 'random',
		          speed: 'up',
		          userType: 'imei',
		          frequency: '',
		          Click_times: ''
		          // time: ''
		        },
		        rules: {
		          name: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          num: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          time: [
		            { required: true, message: '这一项是必填的', trigger: 'focus' }
		          ],
		          frequency: [
		            { required: true, message: '这一项是必填的', trigger: 'focus' }
		          ],
		          Click_times: [
		            { required: true, message: '这一项是必填的', trigger: 'focus' }
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
			handleChange(val) {
		        console.log(val);
		    },
		    startTime(val) {
		    	console.log(val);
		    	// if(val == undefined ) {
		    	// 	console.log(this.rules.time[0].trigger);
		    	// 	this.rules.time[0].trigger = 'blur';
		    	// }else {
		    	// 	this.rules.time[0].trigger = 'blur';
		    	// }

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
			padding: 3vw 0 3vw 0;
			background: #FAFAFA;
		}
			.unit_o_content form {
				margin-top: 2vw;
				width: 70%;
				margin-left: 15%;
			}

		.unit_infro {
			color: gray;
		}

		/*折叠内容*/
		.el-collapse-item__wrap {
			background: none;
		}
		.el-collapse-item__header {
			font-weight: bold;
		}
</style>