<template>
	<div class="ad_unit">
		<el-row :gutter="10">
			<el-form :inline="true" :model="unitData" label-width="500px">
				<el-col :span="3">
	    			<el-select v-model="unitData.adProject" placeholder="选择广告项目">
	    				<el-option v-for="items in selectMore.adProject" :label="items.name" :value="items.val"></el-option>
	    			</el-select>
    			</el-col>
				<el-col :span="3">
	    			<el-select v-model="unitData.adActive" placeholder="选择广告活动">
	    				<el-option v-for="items in selectMore.adActive" :label="items.name" :value="items.val"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="3">
	    			<el-select v-model="unitData.adUnit" placeholder="查询广告单元">
	    				<el-option v-for="items in selectMore.adUnit" :label="items.name" :value="items.val"></el-option>
	    			</el-select>
    			</el-col>
				<el-col :span="3">
	    			<el-select v-model="unitData.adQd" placeholder="选择渠道">
	    				<el-option v-for="items in selectMore.adUnit" :label="items.name" :value="items.val"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="3">
	    			<el-select v-model="unitData.adRandom" placeholder="随机位置">
	    				<el-option v-for="items in selectMore.adUnit" :label="items.name" :value="items.val"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="3">
	    			<el-select v-model="unitData.status" placeholder="选择状态">
	    				<el-option v-for="items in selectMore.status" :label="items.name" :value="items.val"></el-option>
	    			</el-select>
    			</el-col>

			    <el-date-picker
			      class="cols3"
			      span="3"
			      v-model="timeVal"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>

    			<el-col class="cols4" :span="2">
	  				<!-- @click="onSubmit" -->
	    			<el-button type="primary">查询</el-button>
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
		    	<div class="tabs_btn_left"><i class="el-icon-plus"></i><span>新建</span></div>
		    	<div class="tabs_btn_right"><span>下载数据</span></div>
		    </div>
		</div>

		<div class="tables">
		 <el-form>
			<el-table
			    :data="tableData"
			    stripe
			    :cell-class-name="cell"
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="ID"
			      >
			    </el-table-column>
			    <el-table-column
			      label="名称"
			    >
			      <template scope="scope_name">
			      	<router-link class="names" to="/ad_active">{{scope_name.row.base_name}}</router-link>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="所属广告项目"
			      >
			      <template scope="scope_ads">
			      	<router-link class="names" to="/ad_active">{{scope_ads.row.pName}}</router-link>
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
			    <el-table-column property="turn" label="状态">
				    <template scope="scope">
				    <!-- @change="change(scope.$index,scope.row)" -->
				      <el-switch 
				        @change="change(scope.$index,scope.row)"
                        v-if="scope.row.switch"
				        on-text ="进行"
                        off-text = "暂停"
                        on-color="#00D1B2"
                        off-color="#dadde5" 
                        v-model="scope.row.Status"
                        >
					  </el-switch>
					</template>
			    </el-table-column>
				<el-table-column
			    >
			      <template scope="scope2" v-if="scope2.row.switch">
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
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: "广告项目",
				radioes: "0",
				unitData: {
		          adName: '',
		          adActive: '',
		          adUnit: '',
		          adQd: '',
		          adRandom: '',
		          status: ''
		        },
		        selectMore: {
		        	adProject: [{name:"为行投资", val: "one"},{name:"没有更多", val: "t"}],
		        	adActive: [{name:"上海为行", val: "one"},{name:"为行投资", val: "two"},{name:"没有更多", val: "t"}],
		        	adUnit: [{name:"上海为行", val: "one"},{name:"为行投资", val: "two"},{name:"没有更多", val: "t"}],
		        	adQd: [{name:"上海为行", val: "one"},{name:"为行投资", val: "two"},{name:"没有更多", val: "t"}],
		        	adRandom: [{name:"上海为行", val: "one"},{name:"为行投资", val: "two"},{name:"没有更多", val: "t"}],
		        	status: [{name:"上线", val: "on"},{name:"暂停", val: "off"}]
		        },
		        timeVal: '',
		        tableData: [{
		          ID: "1108118799",
		          Allprice: "",
		          turn: true,
		          name: '上海为行',
		          link: "/login",
		          alone_ads: "为行投资",
		          requestNum: "",
		          exposureNum: "",
		          clickIng: "",
		          clickRate: "",
		          ecpm: "",
		          acp: "",
		          switch: true
		        }, {
		          ID: "1108118899",
		          Allprice: "￥76179.42",
		          turn: false,
		          name: '幂动科技',
		          link: "/ad_detail?id=2313123",
		          alone_ads: "为行投资",
		          requestNum: "610604251",
		          exposureNum: "4760230",
		          clickIng: "158277",
		          clickRate: "3.33%",
		          ecpm: "16.01",
		          acp: "0.49",
		          switch: true
		        }, {
		          ID: "",
		          turn: false,
		          name: '',
		          link: "/basetable",
		          alone_ads: "",
		          switch: true,
		          Allprice: "累计￥76179.42",
		          requestNum: "累计610604251",
		          exposureNum: "累计4760230",
		          clickIng: "累计158277",
		          clickRate: "平均3.33%",
		          ecpm: "平均16.01",
		          acp: "平均0.49",
		          switch: false
		        }]
			}
		},
		mounted() {
			this.Init()
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
				var hostname = "http://192.168.0.205";
				this.$axios.get(this.hostname+'/manage/dsp/unit/admin/list',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data.rows)

                    that.allPage = res.data.total;
                    that.tableData = res.data.rows;
                     
                    // 特殊处理
                    for(var i = 0, Len = that.tableData.length; i < Len; i++) {
                    	that.tableData[i].switch = true;
                    	// that.tableData[i+1].switch = false;
                    	that.tableData[i].btn_stauts = true;
                    	that.tableData[i].link = that.tableData[i].id;
	                    // 上线状态
	                    if(that.tableData[i].onlineStatus == 0) {
	                    	that.tableData[i].Status = false
	                    }else {
	                    	that.tableData[i].Status = true
	                    }
                    }
                    console.log(res.data);
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
				this.statusInitFn(this.tableData[index].id,Value);
				setTimeout(this.Init,200);
            	// console.log(index,row);
            },
            statusInitFn(ids,val) {
            	var that = this;
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
            }
		}
	}
</script>
<style>
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