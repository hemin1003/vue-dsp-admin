<template>
	<div class="ad_message" v-loading="loading" element-loading-text="数据加载中">
		<div class="ad_title">广告主信息</div>
		<!-- v-model="search" -->
		
		<!-- <el-form-item label="活动区域">
		    <el-select placeholder="请选择活动区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
		    </el-select>
	  	</el-form-item> -->
	  	<!-- <el-row :gutter="20">
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
	    			<el-button type="primary">查询</el-button>
	    		</el-col>
			</el-form>
		</el-row> -->
		<div class="tables">
		 <el-form>
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%"
					row-style="height:60px">
			    <el-table-column
			      prop="id"
			      label="广告主ID"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="广告主名"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="loginUserName"
			      label="账号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="rechargeAmount"
			      label="充值总金额"
			      
			      >
			    </el-table-column>
			    <el-table-column
			      prop="surplus"
			      label="剩余金额"
			      >
			    </el-table-column>
		  	</el-table>
		</el-form>
		</div>
		<!-- <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="allPage">
            </el-pagination>
        </div> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading: true,
				msg: "6得飞起",
				formInline: {
		          user: '',
		          region: ''
		        },
		        tableData: [{}],
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
										that.loading = false;
										
                    that.allPage = res.data.total;
										that.tableData = res.data.rows;
										for(var i =0; i < that.tableData.length; i++) {
											that.tableData[i].rechargeAmount = "￥"+that.tableData[i].rechargeAmount;
											that.tableData[i].surplus = "￥"+that.tableData[i].surplus;
										}
                }, function(err){
                    console.log(err);
                })
			},
            change:function(index,row){
            	console.log(index,row);
            }
        }
	}
</script>
<style>
	.ad_title {
		font-size: 20px;
		margin-bottom: 20px;
	}
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