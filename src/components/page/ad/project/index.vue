<template>
	<div class="ad_project">
		<el-row :gutter="20">
			<el-form :inline="true" :model="formInline" label-width="500px">
				<el-col :span="12">
					<el-select v-model="formInline.region" placeholder="查询广告项目">
	    				<el-option v-for="(items,index) in selectList" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
	    			</el-select>
					<!-- <el-input placeholder="查询广告主" icon="search"  class="search" ></el-input> -->
				</el-col>
				<el-col :span="3">
	    			<el-select v-model="formInline.region" placeholder="选择状态">
	    				<el-option label="上线" value="online"></el-option>
	    				<el-option label="暂停" value="off"></el-option>
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

    			<el-col class="cols4" :span="3">
	  				<!-- @click="onSubmit" -->
	    			<el-button type="primary">查询</el-button>
	    		</el-col>
			</el-form>
		</el-row>

		<div class="tabs">
		    <div class="tabs_btn">
		    	<div class="tabs_btn_left" @click="dialogFormVisible = true"><i class="el-icon-plus"></i><span>新建</span></div>
		    	<div class="tabs_btn_right"><span>下载数据</span></div>
		    </div>
		</div>

		<div class="tables">
		 <el-form>
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%"
				row-style="height:60px"
				>
			    <el-table-column
			      prop="id"
			      label="ID"
			      >
			    </el-table-column>
			    <el-table-column
			      label="名称"
			      width="220">
			      <template scope="scope_name">
			      	<router-link class="names" to="/ad_activity">{{scope_name.row.name}}</router-link>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="pName"
			      label="广告主"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="consumption"
			      label="消耗"
			      >
			    </el-table-column>
			    <el-table-column label="状态">
				    <template scope="scope">
				      <el-switch 
						@change="change(scope.$index,scope.row)"
				      	on-text ="上线"
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
			      <template scope="scope2">
			      	<router-link :to="{path: '/pro_detail',query: {id: scope2.row.link}}"><span class="table_detail">详情</span></router-link>
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
				:data="selectList"
				style="width: 100%"
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
				dialogTitle: '选择广告主',
				dialogFormVisible: false,
				selectList: "",
				msg: "广告项目",
				formInline: {
		          user: '',
		          region: ''
		        },
		        timeVal: '',
		        tableData: [],
		        allPage: ''
			}
		},
		mounted() {
			this.dataInit();
			this.selectFn();
		},
		methods: {
			dataInit() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
					page: 1,
					rows: 10
				};
				this.$axios.get(this.hostname+'/manage/dsp/project/admin/list',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data)

                    that.allPage = res.data.total;
                    that.tableData = res.data.rows;
                     
                    // 特殊处理
                    for(var i = 0, Len = that.tableData.length; i < Len; i++) {

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
			// 10.17新增下拉菜单初始化渲染
			selectFn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
				};
				this.$axios.get(this.hostname+'/manage/dsp/sys/config/getDspUserInfoList',{params: datas}).then(function(res){
                    // 响应成功回调
					console.log(res)
					if(res.status == 200) {
						that.selectList = res.data;
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
				this.statusInitFn(this.tableData[index].id,Value);
				setTimeout(this.dataInit,200);
            	// console.log(index,row);
            },
            statusInitFn(ids,val) {
            	var that = this;
				var params = new URLSearchParams();
				params.append('id', ids);
				params.append('onlineStatus', val);
				this.$axios.post(this.hostname+'/manage/dsp/project/admin/changeStatus',params).then(function(res){
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
				this.$router.push('/pro_detail?id='+row.valueStr+'&type=add');
				// console.log(row.valueStr);
			}
		}
	}
</script>
<style>
	.cols3 {
		float: left;
	}
		.cols4 button {
			width: 50%;
		}

	.tabs {
		margin-top: 4vw;
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

		.el-select {
			width: 100%;
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


			.el-dialog--small {
				width: 30%;
			}
			.el-dialog__header {
				border-bottom: 1px solid rgb(223, 236, 235);
				padding-bottom: .8vw;
			}
</style>