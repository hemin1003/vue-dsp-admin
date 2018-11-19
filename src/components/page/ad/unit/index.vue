<template>
	<div class="ad_unit">
		<el-row :gutter="10">
			<el-form :inline="true" :model="formInline" label-width="500px">
				<el-col :span="3">
	    			<el-select clearable v-model="formInline.adProjectId" placeholder="选择广告项目">
	    				<el-option v-for="(items,index) in selectList" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
	    			</el-select>
    			</el-col>
				<el-col :span="3">
	    			<el-select clearable v-model="formInline.adActiveId" placeholder="选择广告活动">
	    				<el-option v-for="(items,index) in activtyList" :label="items.keyStr" :key="index" :value="items.valueStr"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="3">
	    			<el-select clearable v-model="formInline.adUnitId" placeholder="查询广告单元">
	    				<el-option v-for="(items,index) in unitList" :label="items.keyStr" :key="index" :value="items.valueStr"></el-option>
	    			</el-select>
    			</el-col>
				<el-col :span="3">
	    			<el-select clearable v-model="formInline.adChannel" placeholder="选择渠道">
	    				<el-option v-for="(items,index) in Channel" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="3">
	    			<el-select clearable v-model="formInline.adPosition" placeholder="广告位">
	    				<el-option v-for="(items,index) in adsense" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="3">
	    			<el-select clearable v-model="formInline.staus" placeholder="选择状态">
	    				<el-option label="上线" value="1"></el-option>
	    				<el-option label="暂停" value="0"></el-option>
	    			</el-select>
    			</el-col>

			    <el-date-picker
			      class="cols3"
			      span="3"
			      v-model="timeVal"
			      type="daterange"
				  @change="dateChange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>

    			<el-col class="cols4" :span="2">
	  				<!-- @click="onSubmit" -->
	    			<el-button @click="searchFn" type="primary">查询</el-button>
	    		</el-col>
			</el-form>
		</el-row>
		
		<div class="tabs">
			<el-radio-group v-model="radioes" @change="tabsFn">
		      <el-radio-button label="0">全部</el-radio-button>
		      <el-radio-button label="1"><span class="ant-badge-status-dot ant-badge-status-default"></span>未提交</el-radio-button>
		      <el-radio-button label="2"><span class="ant-badge-status-dot ant-badge-status-processing"></span>审核中</el-radio-button>
		      <el-radio-button label="3"><span class="ant-badge-status-dot ant-badge-status-success"></span>审核成功</el-radio-button>
		      <el-radio-button label="4"><span class="ant-badge-status-dot ant-badge-status-error"></span>审核失败</el-radio-button>
		    </el-radio-group>
		    <div class="tabs_btn">
		    	<div class="tabs_btn_left" @click="dialogFormVisible = true"><i class="el-icon-plus"></i><span>新建</span></div>
		    	<div class="tabs_btn_right"><span>下载数据</span></div>
		    </div>
		</div>

		<div class="tables">
		 <el-form>
			<el-table
				v-loading="loading"
				element-loading-text="数据加载中"
			    :data="tableData"
			    stripe
			    :cell-class-name="cell"
			    style="width: 100%"
				row-style="height:60px">
			    <el-table-column
			      prop="id"
			      label="ID"
			      >
			    </el-table-column>
			    <el-table-column
			      label="名称"
				  prop="base_name"
			    >
			      <!-- <template scope="scope_name">
			      	<router-link class="names" to="/ad_activity">{{scope_name.row.base_name}}</router-link>
			      </template> -->
			    </el-table-column>
			    <el-table-column
			      label="所属广告活动"
				  width="200"
			      >
			      <template scope="scope_ads">
			      	<router-link class="names" :to="{path: '/ad_detail',query: {id: scope_ads.row.link}}">{{scope_ads.row.pName}}</router-link>
			      </template>
			    </el-table-column>
        		<!-- <el-popover
				  placement="top-start"
				  title="标题"
				  width="200"
				  trigger="hover"
				  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
				  <el-button >hover 激活</el-button>
				</el-popover> -->
			    <el-table-column
			      header-cell-class-name="special_cell"
			      prop="reqNum"
			      label="请求量"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="impressionNum"
			      label="曝光量"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="clickNum"
			      label="点击"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="ctr"
			      label="点击率"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="ecpm"
			      label="eCPM"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="acp"
			      label="ACP"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="consumption"
			      label="消耗"
			      >
			    </el-table-column>
			    <el-table-column property="turn" label="状态" width="170">
				    <template scope="scope">
				    <!-- @change="change(scope.$index,scope.row)" v-if="scope.row.switch" -->
				      <el-switch 
				        @change="change(scope.$index,scope.row)"
						:disabled="scope.row.btn_stauts"
				        on-text ="进行"
                        off-text = "暂停"
                        on-color="#00D1B2"
                        off-color="#dadde5" 
                        v-model="scope.row.Status"
                        >
					  </el-switch>
					  <el-tag type="success">{{scope.row.proveStatusTxt}}</el-tag>
					</template>
			    </el-table-column>
				<el-table-column width="100">
					<!-- v-if="scope2.row.switch" -->
			      <template scope="scope2">
			      	<router-link :to="{path: '/ad_detail',query: {id: scope2.row.link}}"><span class="table_detail">详情</span></router-link>
			      </template>
			    </el-table-column>
		  	</el-table>
		</el-form>
		</div>
		<div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="allPage">
            </el-pagination>
        </div>

			<!-- 弹窗 -->
		<el-dialog :title="dialogTitle" style="100px" :visible.sync="dialogFormVisible">
			<el-table
				:data="activtyList"
				row-style="height:60px"
				@row-click="openDetails">
				<el-table-column
					prop="valueStr"
					label="id"
					>
				</el-table-column>
				<el-table-column
					prop="keyStr"
					label="名称">
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading: true,
				dialogTitle: '选择所属广告活动',
				dialogFormVisible: false,
				msg: "广告项目",
				radioes: "0",
				formInline: {},
		        selectMore: {
		        	
		        },
		        timeVal: '',
		        tableData: []
			}
		},
		mounted() {
			this.Init();
			this.selectFn();
			this.activtyFn();
			this.unitFn();
			this.ListFn("b007","adsense"); //广告位
			this.ListFn("b006","Channel"); //渠道
		},
		methods: {
			handleCurrentChange() {
				console.log('66');
			},
			cell({row, column, rowIndex, columnIndex}) {
				if(columnIndex === 0) {
					return "red"
				}
			},
			tabsFn(val) {
				if((val-1) < 0) {
					this.Init();
				}else {
					this.Init(val-1);
				}
				
			},
			// 数据初始化渲染
			Init(tabs) {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
					page: 1,
					rows: 10,
					proveStatus: tabs
				};
				// var hostname = "http://192.168.0.205";
				this.$axios.get(this.hostname+'/manage/dsp/unit/admin/list',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data.rows)
					that.loading = false;
					
                    that.allPage = res.data.total;
                    that.tableData = res.data.rows;
                     
					// 特殊处理
                    for(var i = 0, Len = that.tableData.length; i < Len; i++) {
						that.tableData[i].switch = true;
                    	that.tableData[i].btn_stauts = true;
                    	that.tableData[i].link = that.tableData[i].id;
	                    // 上线状态
	                    if(that.tableData[i].onlineStatus == 0) {
	                    	that.tableData[i].Status = false
	                    }else {
	                    	that.tableData[i].Status = true
						}
                    	// 审核状态判断
                    	switch(that.tableData[i].proveStatus) {
	                    	case 0:
	                    		that.tableData[i].proveStatusTxt = "未提交";
	                    		break;
	                    	case 1:
	                    		that.tableData[i].proveStatusTxt = "审核中";
	                    		break;
	                    	case 2:
	                    		that.tableData[i].proveStatusTxt = "审核成功";
	                    		that.tableData[i].btn_stauts = null
	                    		break;
	                    	case 3:
	                    		that.tableData[i].proveStatusTxt = "审核失败";
	                    		break;
	                    }
                    }
                    console.log(res.data);
                }, function(err){
                    console.log(err);
                })
			},
			// 10.17新增下拉菜单初始化渲染
			selectFn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
				};
				this.$axios.get(that.hostname+'/manage/dsp/sys/config/getDspProjectList',{params: datas}).then(function(res){
          			// 响应成功回调
					console.log(res.data);
					if(res.status == 200) {
						that.selectList = res.data;
					}
				}, function(err){
						console.log(err);
				})
			},
			// 10.17广告活动init
			activtyFn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
				};
				this.$axios.get(that.hostname+'/manage/dsp/sys/config/getDspActivityList',{params: datas}).then(function(res){
          // 响应成功回调
					console.log(res.data);
					if(res.status == 200) {
						that.activtyList = res.data;
					}
				}, function(err){
						console.log(err);
				})
			},
			// 10.17 广告单元init
			unitFn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
				};
				this.$axios.get(that.hostname+'/manage/dsp/sys/config/getDspUnitList',{params: datas}).then(function(res){
          // 响应成功回调
					console.log(res.data);
					if(res.status == 200) {
						that.unitList = res.data;
					}
				}, function(err){
						console.log(err);
				})
			},
			change:function(index,row){
				console.log(index,row.Status);
				var Value;
				if(row.Status) {
					Value = 1
				}else {
					Value = 0
				}
				this.publicFn.statusInitFn(this,this.tableData[index].id,Value,'/manage/dsp/unit/admin/changeStatus');
				setTimeout(this.Init,200);
            	// console.log(index,row);
            },
            statusInitFn(ids,val) {
				var that = this;
				console.log(this);
				var params = new URLSearchParams();
				params.append('id', ids);
				params.append('onlineStatus', val);
				this.$axios.post(this.hostname+'/manage/dsp/unit/admin/changeStatus',params).then(function(res){
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
			openDetails(row) {
				this.$router.push('/ad_detail?id='+row.valueStr+'&type=add');
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
			//搜索查询fn
			searchFn() {
				var that = this;
				that.loading = true;
				if((that.formInline.adProjectId != undefined) || (that.formInline.adActiveId != undefined) || (that.formInline.adUnitId != undefined) || (that.formInline.staus != undefined) || (that.timeVal.length != 0)) {
					let username = localStorage.getItem('ms_username');
					var datas = {
						loginUserName: username,
						id: that.formInline.adUnitId,
						pId: that.formInline.adActiveId,
						ppId: that.formInline.adProjectId,
						onlineStatus: that.formInline.staus,
						startDate: that.timeVal[0],
						endDate: that.timeVal[1]
					};
					this.$axios.get(that.hostname+'/manage/dsp/unit/admin/list',{params: datas}).then(function(res){
						// 响应成功回调
						console.log(res.data);
						that.loading = false;

						that.allPage = res.data.total;
						that.tableData = res.data.rows;
						
						// 特殊处理
						for(var i = 0, Len = that.tableData.length; i < Len; i++) {

							that.tableData[i].btn_stauts = true;
							that.tableData[i].link = that.tableData[i].id;
							// 审核状态判断
							switch(that.tableData[i].proveStatus) {
								case 0:
									that.tableData[i].proveStatusTxt = "未提交";
									break;
								case 1:
									that.tableData[i].proveStatusTxt = "审核中";
									break;
								case 2:
									that.tableData[i].proveStatusTxt = "审核成功";
									that.tableData[i].btn_stauts = null
									break;
								case 3:
									that.tableData[i].proveStatusTxt = "审核失败";
									break;
							}
							// 上线状态
							if(that.tableData[i].onlineStatus == 0) {
								that.tableData[i].Status = false
							}else {
								that.tableData[i].Status = true
							}
						}
                     
					}, function(err){
						console.log(err);
					})
				}else {
					that.loading = false;
					that.$notify.error({
						title: '错误',
						message: "请选择过滤条件！"
					});
				}
			},
			// 格式化时间
			dateChange(val) {
				var timeArr = val.split('至');
				this.timeVal = timeArr;
			}
		}
	}
</script>
<style scoped>
	.cols3 {
		float: left;
	}
		.cols4 {
			/*float: right;*/
		}
		.cols4 button {
			width: 100%;
		}
	.tabs {
		width: 100%;
		height: 2.4vw;
		margin-top: 2vw;
	}
	.tables {
		margin-top: 10px;
	}
		.tables tr {
			height: 50px;
		}
		.table_detail {
			border: 1px solid gray;
			padding: 3px 12px;
			cursor: pointer;
			color: gray;
		}
		.table_detail:hover {
			border-color: #00D1B2;
			color: #00D1B2;
		}
		.table_detail:focus {
			color: gray;
		}
		.names {
			color: #00D1B2;
		}
		
		.ant-badge-status-default {
		    background-color: #d9d9d9;
		}
		.ant-badge-status-processing {
		    background-color: #108ee9;
		    position: relative;
		}
		.ant-badge-status-success {
		    background-color: #00a854;
		}
		.ant-badge-status-error {
		    background-color: #f04134;
		}
		.ant-badge-status-dot {
		    width: 8px;
		    height: 8px;
		    display: inline-block;
		    border-radius: 50%;
		    margin-right: 5px;
		}

		.tabs_btn {
			float: right;
			width: 200px;
			height: 1.8vw;
			text-align: center;
			line-height: 1.8vw;
		}
			.tabs_btn_left,.tabs_btn_right {
				float: left;
				width: 45%;
				height: 100%;
				color: white;
				font-size: .9rem;
				background: #00D1B2;
				cursor: pointer;
			}
			.tabs_btn_right {
				float: right;
				background: #DADDE5;
				color: gray;
			}
				.tabs_btn_left i,.tabs_btn_right i {
					font-size: .8rem;
					margin-right: 4px;
				}
</style>