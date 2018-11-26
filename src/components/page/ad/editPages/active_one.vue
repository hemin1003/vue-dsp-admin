<template>
	<div class="unit_one">
		<div class="unit_one_top">
			<div class="unit_o_left_btn" @click="goBack"><i class="el-icon-arrow-left"></i>{{msg}}</div>
			<div class="unit_o_right">
				<div class="enter_btn" v-if="!btn_turn">
					<el-button type="primary" @click="EditFn" plain><i class="el-icon-edit"></i><span>编辑</span></el-button>
				</div>
				<div class="out_btn" v-if="btn_turn">
					<el-button type="primary" @click="saveFn('ruleForm')"><span>保存</span></el-button>
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
			<el-collapse v-model="activeNames" @change="handleChange" style="width: 70%;margin-left: 15%;">
				<el-collapse-item title="基本信息" name="1">
					<!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"> -->
						<el-form-item label="名称" prop="base_name">
							<el-input v-model="ruleForm.base_name" :disabled="Disabled"></el-input>
							<span class="unit_infro">为您的广告活动取一个唯一的名称，格式如下：广告主名称_产品名称，10个字以内</span>
						</el-form-item>
						
						<el-form-item label="出价类型" prop="base_bidType">
						    <el-radio-group v-model="ruleForm.base_bidType" :disabled="Disabled">
						    	<el-radio label=1>实时出价</el-radio>
						    	<!-- <el-radio label=2>固定出价</el-radio> -->
						    </el-radio-group>
						    <div class="unit_infro">目前只支持竞价类型喔</div>
						</el-form-item>

						<el-form-item label="渠道" prop="base_channel">
							<el-select v-model="ruleForm.base_channel" style="width: 100%;" :disabled="Disabled">
						    	<el-option v-for="(items,index) in channel" :label="items.keyStr" :value="items.valueStr" :key="index"></el-option>
						    	<!-- <el-option label="cpl" value="cpl"></el-option>
						    	<el-option label="cpa" value="cpa"></el-option> -->
						    </el-select>
						</el-form-item>

						<!-- <el-form-item label="广告位" prop="prop_adsense">
							<el-select @change="adPositionFn" v-model="ruleForm.base_showAdsId" style="width: 100%;" :disabled="Disabled">
						    	<el-option v-for="(items,index) in adsense" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
						    </el-select>
						    <span class="unit_infro">为您的活动选择一个想要投放的广告位</span>
						</el-form-item>

						<el-form-item label="广告位示例">
							<div><img :src="exampleImg" width="30%" alt="example"></div>
							<span class="unit_infro">您的广告会显示在图示红框位置</span>
						</el-form-item> -->
					<!-- </el-form> -->

				</el-collapse-item>
				<el-collapse-item title="时间控制" name="2">
			    	<!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"> -->

						<!-- <el-form-item label="速度控制" prop="name">
							<el-select v-model="ruleForm.time_speed" style="width: 100%;" :disabled="Disabled">
						    	<el-option label="加速" value="2"></el-option>
						    	<el-option label="匀速" value="1"></el-option>
						    </el-select>
						    <span class="unit_infro">为您的活动选择一个想要投放的广告位</span>
						</el-form-item> -->
						<el-form-item label="开始日期">
						    <el-date-picker
							  :disabled="Disabled"
						      v-model="ruleForm.time_startDate"
						      type="date"
						      placeholder="请选择日期"
						      @change="startDate">
						    </el-date-picker>
						</el-form-item>

						<el-form-item label="开始时间">
						    <el-time-picker
							  :disabled="Disabled"
						      v-model="StartTime"
						      placeholder="请选择时间"
						      >
						    </el-time-picker>
							<div class="unit_infro">*注意开始时间和开始日期两者必须填一项</div>
						</el-form-item>

						<el-form-item label="结束日期">
						    <el-date-picker
							  :disabled="Disabled"
						      v-model="ruleForm.time_endDate"
						      type="date"
						      placeholder="请选择日期"
							  @change="endDateFn">
						    </el-date-picker>
						</el-form-item>

						<el-form-item label="结束时间">
						    <el-time-picker
							  :disabled="Disabled"
						      v-model="EndTime"
						      placeholder="请选择时间"
						      >
						    </el-time-picker>
							<div class="unit_infro">结束时间不填写表示不限制结束时间</div>
						</el-form-item>
						
						<!-- <el-form-item label="控制类型" prop="name">
							<el-select v-model="ruleForm.time_controlType" style="width: 100%;" :disabled="Disabled">
						    	<el-option label="按IMEI识别用户" value="1"></el-option>
						    	<el-option label="按IP识别用户" value="2"></el-option>
						    </el-select>
						</el-form-item> -->

						<el-form-item label="曝光频次" prop="time_impressionLimit">
							<el-input v-model="ruleForm.time_impressionLimit" type="number" :disabled="Disabled"></el-input>
							<span class="unit_infro">每日单个用户最多能看到这个广告的次数</span>
						</el-form-item>

						<el-form-item label="点击频次" prop="time_clickLimit">
							<el-input v-model="ruleForm.time_clickLimit" :disabled="Disabled"></el-input>
							<span class="unit_infro">每日单个用户最多能点击这个广告的次数</span>
						</el-form-item>

						<!-- <el-form-item label="排期">
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
						</el-form-item> -->
					<!-- </el-form> -->
				</el-collapse-item>
				
				

				<!-- <el-form-item label="网络">
						    <el-radio-group v-model="ruleForm.target_network" :disabled="Disabled">
						    	<el-radio label="now">不限</el-radio>
						    	<el-radio label="static">自定义</el-radio>
						    </el-radio-group>
						</el-form-item> -->

						<!-- <el-form-item label="新老用户">
						    <el-radio-group v-model="ruleForm.priceType" :disabled="Disabled">
						    	<el-radio label="now">不限</el-radio>
						    	<el-radio label="new">新用户</el-radio>
								<el-radio label="old">老用户</el-radio>
						    </el-radio-group>
						</el-form-item> -->

				<el-collapse-item title="定向控制" name="3">
						<!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"> -->
							<el-form-item label="投放区域">
								<!-- ($event,'checkBoxTurn2','checkBoxTurn2_obj') -->
								<el-checkbox-group @change="throwFn" v-model="throwReport">
									<el-checkbox  :disabled="Disabled" label="1">全部</el-checkbox>
									<el-checkbox  :disabled="Disabled" label="2">站内</el-checkbox>
									<el-checkbox  :disabled="Disabled" label="3">站外</el-checkbox>
								</el-checkbox-group>
								<!-- <el-radio-group @change="throwFn" v-model="keywordVal" :disabled="Disabled">
									<el-radio label="1">全部</el-radio>
									<el-radio label="2">站内</el-radio>
									<el-radio label="3">站外</el-radio>
								</el-radio-group> -->
								<div class="checkBoxes" v-if="Inside">
									<el-checkbox-group @change="InsideFn" v-model="InsideVal">
										<el-checkbox v-for="(items,index) in InsideList" :disabled="Disabled" :key="index" :label="items.valueStr">{{items.keyStr}}</el-checkbox>
									</el-checkbox-group>
								</div>

								<el-radio-group v-if="openType" v-model="ruleForm.base_openScreenType" :disabled="Disabled">
									<el-radio label=1>图片</el-radio>
									<el-radio label=2>视频</el-radio>
								</el-radio-group>

								<div class="checkBoxes" v-if="Outside">
										<el-checkbox-group v-model="OutsideVal">
										<el-checkbox v-for="(items,index) in OutsideList" :disabled="Disabled" :key="index" :label="items.valueStr">{{items.keyStr}}</el-checkbox>
									</el-checkbox-group>
								</div>
							</el-form-item>
							<el-form-item label="投放地区">
								<el-select v-model="areaArray" style="width: 100%;" multiple filterable allow-create default-first-option :disabled="Disabled"></el-select>
								<span class="unit_infro">填写：市</span>
							</el-form-item>
							<el-form-item label="排除地区">
								<el-select v-model="DelAreaArray" style="width: 100%;" placeholder="请选择" multiple filterable allow-create default-first-option :disabled="Disabled"></el-select>
								<span class="unit_infro">填写：市</span>
							</el-form-item>
						<!-- <el-form-item label="主题渠道">
						    <el-radio-group @change="RadioFn($event,'checkBoxTurn','checkBoxTurn_obj')" v-model="themeVal" :disabled="Disabled">
						    	<el-radio label="1">不限</el-radio>
						    	<el-radio label="2">自定义</el-radio>
						    </el-radio-group>
							<div class="checkBoxes" v-if="checkBoxTurn">
								 <el-checkbox-group v-model="checkBoxTurn_checkList">
									<el-checkbox v-for="(items,index) in ThemeChannel" :disabled="Disabled" :key="index" :label="items.keyStr"></el-checkbox>
								</el-checkbox-group>
							</div>
						</el-form-item>

						<el-form-item label="关键字">
						    <el-radio-group @change="RadioFn($event,'checkBoxTurn2','checkBoxTurn2_obj')" v-model="keywordVal" :disabled="Disabled">
						    	<el-radio label="1">不限</el-radio>
						    	<el-radio label="2">自定义</el-radio>
						    </el-radio-group>
							<div class="checkBoxes" v-if="checkBoxTurn2">
								 <el-checkbox-group v-model="checkBoxTurn2_checkList">
									<el-checkbox v-for="(items,index) in keyWord" :disabled="Disabled" :key="index" :label="items.keyStr"></el-checkbox>
								</el-checkbox-group>
							</div>
						</el-form-item>
						<el-form-item label="年龄">
						    <el-radio-group @change="RadioFn($event,'checkBoxTurn3','checkBoxTurn3_obj')" v-model="ageVal" :disabled="Disabled">
						    	<el-radio label="1">不限</el-radio>
						    	<el-radio label="2">自定义</el-radio>
						    </el-radio-group>
						    <div class="checkBoxes" v-if="checkBoxTurn3">
								 <el-checkbox-group v-model="checkBoxTurn3_checkList">
									<el-checkbox v-for="(items,index) in ageArray" :disabled="Disabled" :key="index" :label="items.keyStr"></el-checkbox>
								</el-checkbox-group>
							</div>
						</el-form-item>

						<el-form-item label="性别">
						    <el-radio-group v-model="ruleForm.target_gender" :disabled="Disabled">
						    	<el-radio label="0">不限</el-radio>
						    	<el-radio label="1">男</el-radio>
								<el-radio label="2">女</el-radio>
						    </el-radio-group>
						</el-form-item>

						<el-form-item label="操作系统">
							<el-select v-model="ruleForm.target_os" style="width: 100%;" placeholder="不限" :disabled="Disabled">
						    	<el-option label="安卓" value="1"></el-option>
						    	<el-option label="苹果" value="2"></el-option>
						    	<el-option label="未知" value="0"></el-option>
						    </el-select>
						</el-form-item>
						
						<el-form-item label="设备号">
							<el-input v-model="ruleForm.target_imei" :disabled="Disabled"></el-input>
						</el-form-item>
	
						<el-form-item label="排除设备号">
							<el-input v-model="ruleForm.target_excludeImei" :disabled="Disabled"></el-input>
						</el-form-item>

						<el-form-item label="手机品牌">
							<el-select v-model="phoneArray" style="width: 100%;" placeholder="不限" multiple filterable allow-create default-first-option :disabled="Disabled">
						    	<el-option v-for="(items,index) in phoneBrand" :key="index" :label="items.keyStr" :value="items.keyStr"></el-option>
						    </el-select>
						</el-form-item>

						<el-form-item label="排除手机品牌">
							<el-select v-model="delPhoneArray" style="width: 100%;" placeholder="" multiple filterable allow-create default-first-option :disabled="Disabled">
								<el-option v-for="(items,index) in phoneBrand" :key="index" :label="items.keyStr" :value="items.keyStr"></el-option>
						    </el-select>
						</el-form-item>

						<el-form-item label="IP">
							<el-select v-model="ipArr" style="width: 100%;" placeholder="不限" multiple filterable remote reserve-keyword :remote-method="remoteMethod" :disabled="Disabled">
						    	<el-option v-for="(items,index) in ipItems" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
						    </el-select>
						</el-form-item> -->
				
					<!-- </el-form> -->

				</el-collapse-item>


				<el-collapse-item title="预算控制" name="4">
			    	<!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"> -->

						<el-form-item label="交易类型" prop="budget_type">
							<el-select v-model="ruleForm.budget_type" style="width: 100%;" :disabled="Disabled">
						    	<el-option v-for="(items,index) in TransactionTypes" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
						    </el-select>
						    <span class="unit_infro">选一个计费方式，我们将按这个来进行计算消耗</span>
						</el-form-item>

						<el-form-item label="单日预算" prop="budget_dayLimit">
							<el-input v-model="ruleForm.budget_dayLimit" type="number" :disabled="Disabled"></el-input>
						</el-form-item>

						<el-form-item label="出价" prop="budget_bidPrice">
							<el-input v-model="ruleForm.budget_bidPrice" type="number" :disabled="Disabled"></el-input>
							<span class="unit_infro">选择一个出价价格，不能低于目前底价哦 最低出价: 0.4, 建议出价: 0.57~0.95</span>
						</el-form-item>
					<!-- </el-form> -->
				</el-collapse-item>
			</el-collapse>
			</el-form>
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
				times1: '',
				ageVal: '',
				keywordVal: '',
				themeVal: '',
				endTimes: '',
				ipArr: [],
				phoneArray: [],
				delPhoneArray: [],
				DelAreaArray: [],
				areaArray: [],
				checkBoxTurn3: false,
				checkBoxTurn2: false,
				checkBoxTurn: false,
				checkBoxTurn_checkList: [],
				checkBoxTurn2_checkList: [],
				checkBoxTurn3_checkList: [],
				msg: "返回列表",
				turn: false,
				btn_turn: false,
				activeNames: ['1','2','3','4'],
				Disabled: "",
				ruleForm: {
		        },
		        rules: {
				  base_name: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          base_bidType: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
				  ],
				  base_channel: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
				  ],
				  prop_adsense: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				  time_clickLimit: [
		            { type:"number",required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          time_impressionLimit: [
		            { type:"number",required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				   throwReport: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
		          ],
		          budget_type: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
		          ],
		          budget_bidPrice: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          budget_dayLimit: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ]
				},
				exampleImg: require('./images/example.png'),
				Inside: false,
				Outside: false,
				openType: false,
				throwReport: ["1"],
				InsideVal: [],
				OutsideVal: [],
				StartTime: '',
				EndTime: '',
				TransactionTypes: []
		      }
			},
		mounted() {
			var that = this;
			// setTimeout(function() {
				that.Init();
			// },20);
			
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
		    startDate(val) {
		    	this.startDates = val;
			},
			endDateFn(val) {
				this.endDates = val;
			},
			// checkboxFn(obj,list) {
			// 	this[obj] = this[list];
			// 	// this.checkBoxTurn_obj = this.checkBoxTurn_checkList;
			// },
			// 根据长度来判断是否进行处理
			LengthFn(dom1,dom2,values) {
				console.log(values);
				if(dom1.length > 1) {
					values = "2";
					dom2 = dom1.split(',');
				}else {
					values = "1";
				}
			},
			// 初始渲染数据fn
			Init() {
				var that = this;
				this.ListFn("b006","channel"); //渠道
				this.ListFn("b007","adsense"); //广告位
				this.ListFn("b008","ThemeChannel"); //主题渠道
				this.ListFn("b009","keyWord"); //关键字
				this.ListFn("b010", "ageArray"); //年龄
				this.ListFn("b014", "phoneBrand"); //手机品牌
				this.ListFn("b015", "TransactionTypes"); //交易类型
				this.ListFn("b020","throwList"); // 投放站内外区域
				this.ListFn("b021","InsideList"); // 站内广告位置
				this.ListFn("b022","OutsideList"); // 站内/外网页中广告投放位置
				//10.24 新增type字段判断
				if(that.$route.query.type == "add") {
					that.Disabled = null;
					that.btn_turn = true;
				}else {
					var datas = {
						id: that.$route.query.id
					}
					that.$axios.get(this.hostname+'/manage/dsp/activity/admin/toEdit',{params: datas}).then(function(res){
						// 响应成功回调
						console.log(res.data);
						that.ruleForm = res.data;
						// 处理时间
						if(that.ruleForm.time_startTime != "undefined") {
							let dataArray = that.ruleForm.time_startTime.split(":");
							that.StartTime =  new Date(1995,11,9,dataArray[0],dataArray[1],dataArray[2]);
						}

						if(that.ruleForm.time_endTime != "undefined") {
							let dataArray2 = that.ruleForm.time_endTime.split(":");
							that.EndTime = new Date(1995,11,9,dataArray2[0],dataArray2[1],dataArray2[2]);
						}

						// 处理日期
						if(that.ruleForm.time_startDate == "undefined") {
							that.ruleForm.time_startDate = '';
						}
						if(that.ruleForm.time_endDate == "undefined") {
							that.ruleForm.time_endDate = '';
						}

						that.Pids = that.ruleForm.pId;
						that.Ppids = that.ruleForm.ppId;

						that.throwReport = that.ruleForm.base_positionType.split(",");
						that.InsideVal = that.ruleForm.base_insidePosition.split(",");
						that.OutsideVal = that.ruleForm.base_outsidePosition.split(",");

						if(that.ruleForm.target_area != "") {
							that.areaArray = that.ruleForm.target_area.split(",");
						}
						if(that.ruleForm.target_excludeArea != "") {
							that.DelAreaArray = that.ruleForm.target_excludeArea.split(",");
						}
						
						
						console.log(that.ruleForm.base_openScreenType)
						// that.$options.methods.LengthFn(that.ruleForm.target_theme,that.checkBoxTurn_checkList,that.themeVal);
						// console.log(that.themeVal)
						// that.$options.methods.LengthFn(that.ruleForm.target_keyword,that.checkBoxTurn2_checkList,that.keywordVal);
						// if(that.ruleForm.target_theme.length > 1) {
						// 	that.themeVal = "2";
						// 	that.checkBoxTurn_checkList = that.ruleForm.target_theme.split(',');
						// }else {
						// 	that.themeVal = "1";
						// }
						// console.log(that.checkBoxTurn_checkList);
						// if(that.ruleForm.target_keyword.length > 1) {
						// 	that.keywordVal = "2";
						// 	that.checkBoxTurn2_checkList = that.ruleForm.target_keyword.split(',');
						// }else {
						// 	that.keywordVal = "1";
						// }
						// console.log(that.checkBoxTurn2_checkList);
						// if(that.ruleForm.target_age.length > 1) {
						// 	that.ageVal = "2";
						// 	that.checkBoxTurn3_checkList = that.ruleForm.target_age.split(',');
						// }else {
						// 	that.ageVal = "1";
						// }

						// if(that.ruleForm.target_brand.length > 1) {
						// 	that.phoneArray = that.ruleForm.target_brand.split(',');
						// 	console.log(that.phoneArray);
						// }

						// if(that.ruleForm.target_excludeBrand.length > 1) {
						// 	that.delPhoneArray = that.ruleForm.target_excludeBrand.split(',');
						// }

						// 将number => string
						that.ruleForm.base_bidType = that.ruleForm.base_bidType.toString();
						that.ruleForm.base_openScreenType = that.ruleForm.base_openScreenType.toString();
						// that.ruleForm.time_speed = that.ruleForm.time_speed.toString();
						// that.ruleForm.time_controlType = that.ruleForm.time_controlType.toString();
						// that.ruleForm.target_gender = that.ruleForm.target_gender.toString();
						console.log(that.ruleForm.base_bidType)
						// if(that.ruleForm.base_bidType == )
						// if(that.ruleForm.onlineStatus == 0) {
						// 	that.ruleForm.turn = false;
						// }else {
						// 	that.ruleForm.turn = true;
						// }
					}, function(err){
						console.log(err);
					})
				}
				
			},
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
			RadioFn(val,turn,checked) {
				var that = this;
				console.log(val);
				if(val == 2) {
					that[turn] = true;
					// that[turn+"_obj"] = that[turn+"_checkList"];
				}else {
					that[turn] = false;
					that[checked] = 1;
				}
			},
			// 投放fn
			throwFn(val) {
				console.log(val);
				if(val.length == 1) {
					if(val[0] == 1) {
						this.Inside = false;
						this.Outside = false;
					}else if(val[0] == 2) {
						this.Inside = true;
						this.Outside = false;
					}else {
						this.Inside = false;
						this.Outside = true;

						this.openType = false;
					}
				}else if(val.length == 0){
					this.Inside = false;
					this.Outside = false;

					this.openType = false;
				}else {
					this.Inside = true;
					this.Outside = true;
				}
			},
			// 站内选择
			InsideFn(val) {
				for(var i = 0; i < val.length; i++) {
					if(val[i] == 2) {
						this.openType = true;
					}else {
						this.openType = false;
					}
				}
				if(val.length == 0) {
					this.openType = false;
				}
			},
			// 广告位fn
			adPositionFn(val) {
				var adIndex;
				for(var i = 0; i < this.adsense.length; i++) {
					if(val == this.adsense[i].valueStr) {
						adIndex = i;
					}
				}
				this.exampleImg = this.adsense[adIndex].urlStr;
			},
			// 上下线
			changeFn(val) {
				var Values;
				if(val) {
					Values = 1
				}else {
					Values = 0
				}
				this.publicFn.statusInitFn(this,this.ruleForm.id,Values,'/manage/dsp/activity/admin/changeStatus');
			},
			// 保存操作
			saveFn(ruleForm) {
				var that = this;
				that.$refs.ruleForm.validate((valid) => {
				console.log(that.StartTime);
				console.log(that.ruleForm.time_startDate);
				if ((valid) && ((that.StartTime !="") || (that.ruleForm.time_startDate != undefined)))  {
					let username = localStorage.getItem('ms_username');
					var links;
					var params = new URLSearchParams();
					console.log(that.EndTime);
					if(that.EndTime != "") {
						let date = new Date(that.EndTime);
						var endTimeStr = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
					}
					if(that.StartTime != "") {
						let date2 = new Date(that.StartTime);
						var startTimeStr = date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();
					}
					
					params.append('id', that.$route.query.id);
					
					params.append('base_name', that.ruleForm.base_name);
					params.append('base_bidType', that.ruleForm.base_bidType);   //出价类型
					params.append('base_channel', that.ruleForm.base_channel);
					// params.append('base_showAdsId', that.ruleForm.base_showAdsId);  //要投放的广告位
					// params.append('time_speed', that.ruleForm.time_speed);  //速度控制
					params.append('time_startDate', that.startDates); //开始日期
					params.append('time_startTime',startTimeStr) //开始时间
					params.append('time_endTime', endTimeStr); // 结束时间
					params.append('time_endDate', that.endDates); //结束日期
					// params.append('time_controlType', that.ruleForm.time_controlType);  //频次控制类型
					params.append('time_impressionLimit', that.ruleForm.time_impressionLimit);  //单个用户曝光频次
					params.append('time_clickLimit', that.ruleForm.time_clickLimit);  //单个用户点击频次

					params.append('base_positionType',that.throwReport); // 投放站内外区域
					params.append('base_insidePosition',that.InsideVal); // 站内广告位置
					params.append('base_outsidePosition',that.OutsideVal); // 站内/外网页中广告投放位置
					params.append('base_openScreenType',that.ruleForm.base_openScreenType); //开屏投放
					params.append('target_area',that.areaArray); //投放区域 市
					params.append('target_excludeArea',that.DelAreaArray); //投放区域 市

					// params.append('target_theme', that.checkBoxTurn_checkList);  //主题渠道
					// params.append('target_keyword', that.checkBoxTurn2_checkList);  //关键字
					// params.append('target_age', that.checkBoxTurn3_checkList);  //年龄
					// params.append('target_gender', that.ruleForm.target_gender);  //性别
					// params.append('target_os', that.ruleForm.target_os);  //操作系统
					// params.append('target_imei', that.ruleForm.target_imei);  //设备号
					// params.append('target_excludeImei', that.ruleForm.target_excludeImei);  //排除设备号
					// params.append('target_brand', that.phoneArray);  //手机品牌
					// params.append('target_excludeBrand', that.delPhoneArray);  //排除手机品牌
					params.append('budget_type', that.ruleForm.budget_type);  //交易类型
					params.append('budget_dayLimit', that.ruleForm.budget_dayLimit);
					params.append('budget_bidPrice', that.ruleForm.budget_bidPrice);  //出价

					if(that.$route.query.type == "add") {
						params.append('pId', that.$route.query.id);
						params.append('ppId', that.$route.query.pPid);
						params.append('loginUserName', username);
						links = "add";
					}else {
						params.append('pId',that.Pids);
						params.append('ppId',that.Ppids);
						links = "update";
					}
					that.$axios.post(that.hostname+'/manage/dsp/activity/admin/'+links,params).then(function(res){
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
				} else {
					that.$message.error('请检查带*输入框否填写数据(包含开始时间和开始日期)');
				}
				});
			},
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
			padding: 3vw 0 3vw 0;
			background: #FAFAFA;
		}
			.unit_o_content form {
				margin-top: 2vw;
				width: 100%;
				/* margin-left: 15%; */
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

		.checkBoxes {
			text-align: left;
		}
		.el-checkbox {
			margin-right: 15px;
		}
		.el-checkbox+.el-checkbox {
			margin-right: 15px;
			margin-left: 0px;
		}


			.el-collapse-item__content {
				margin: 2vw 0;
			}
</style>