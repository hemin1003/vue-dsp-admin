<template>
	<div class="dashboard">
		<!-- v-model="search" -->
		
		<!-- <el-form-item label="活动区域">
		    <el-select placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
		    </el-select>
	  	</el-form-item> -->
	  	<el-row :gutter="20">
			<el-form :inline="true" :model="formInline" label-width="500px">
				<el-col :span="14">
					<el-input placeholder="查询广告主" icon="search"  class="search" ></el-input>
				</el-col>
				<el-col :span="3">
	    			<el-select v-model="formInline.region" placeholder="选择状态">
	    				<el-option label="上线" value="online"></el-option>
	    				<el-option label="暂停" value="off"></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="7">
	  				<!-- @click="onSubmit" -->
	    			<el-button type="primary">查询</el-button>
	    		</el-col>
			</el-form>
		</el-row>
		<div class="tables">
		 <el-form>
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="ID"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="名称"
			      width="220">
			    </el-table-column>
			    <el-table-column
			      prop="budget"
			      label="总预算(剩余)"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="consumption"
			      label="总消耗"
			      
			      >
			    </el-table-column>
			    <el-table-column
			      prop="createDate"
			      label="创建时间"
			      >
			    </el-table-column>
			    <el-table-column property="turn" label="状态">
				    <template scope="scope">
				    <!-- @change="change(scope.$index,scope.row)" -->
				      <el-switch
												@change="change(scope.$index,scope.row)"
												on-text ="上线"
                        off-text = "下线"
                        on-color="#00D1B2"
                        off-color="#dadde5" 
                        :disabled="scope.row.btn_stauts"
                        v-model="scope.row.Status"
                        >
					  </el-switch>
					  <el-tag type="success">{{scope.row.proveStatusTxt}}</el-tag>
					</template>
			    </el-table-column>
				<el-table-column
			    >
			      <template scope="scope2">
			      	<router-link :to="{path: '/details',query: {id: scope2.row.link}}"><span class="table_detail">详情</span></router-link>
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
				msg: "6得飞起",
				formInline: {
		          user: '',
		          region: ''
		        },
		        tableData: [{
		          ID: "1108118799",
		          Creatdate: '2016-05-02',
		          balance: "76178 (0)",
		          Allprice: "76179.42",
		          turn: true,
		          name: '上海为行投资管理有限公司',
		          status: '审核中',
		          link: "/login"
		        }],
		        allPage: ''
			}
		},
		mounted() {
			this.Init();
		},
		methods:{
			Init() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
					page: 1,
					rows: 10
				};
				this.$axios.get(this.hostname+'/manage/dsp/userInfo/admin/list',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data);

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
			},
            change:function(index,row){
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
							this.$axios.post(this.hostname+'/manage/dsp/userInfo/admin/changeStatus',params).then(function(res){
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
	.tables {
		margin-top: 20px;
	}
		.tables tr {
			height: 60px;
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
</style>