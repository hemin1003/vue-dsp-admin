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
				<el-col :span="12">
					<!-- <el-input placeholder="查询广告主" icon="search"  class="search" ></el-input> -->
					<el-select clearable v-model="formInline.id" placeholder="查询广告主">
	    				<el-option v-for="(items,index) in home_project" :key="index" :label="items.keyStr" :value="items.valueStr"></el-option>
	    			</el-select>
				</el-col>
				<el-col :span="3">
	    			<el-select clearable v-model="formInline.staus" placeholder="选择状态">
	    				<el-option label="上线" value=1></el-option>
	    				<el-option label="暂停" value=0></el-option>
	    			</el-select>
    			</el-col>
    			<el-col :span="2">
	  				<!-- @click="onSubmit" -->
	    			<el-button style="width: 100%" @click="searchFn" type="primary">查询</el-button>
	    		</el-col>
			</el-form>
		</el-row>
		<div class="tables">
		 <el-form>
			<el-table
				v-loading="loading"
				element-loading-text="数据加载中"
			    :data="tableData"
			    stripe
			    style="width: 100%"
				row-style="height:60px">
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
				  	<template scope="scope">
						{{ scope.row.budget }}({{ scope.row.surplus}})
					</template>
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
			    <el-table-column property="turn" label="状态" width="160">
				    <template scope="scope">
				    <!-- @change="change(scope.$index,scope.row)" -->
				      <el-switch
						@change="change(scope.$index,scope.row)"
						on-text ="上线"
                        off-text = "暂停"
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
				loading: true,
				msg: "6得飞起",
				formInline: {},
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
				allPage: '',
				nowPages: 1
			}
		},
		mounted() {
			this.Init();
			this.home_project_Fn();
		},
		methods:{
			handleCurrentChange(val) {
				this.loading = true;
				this.nowPages = val;
				this.Init();
			},
			Init() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
					page: that.nowPages,
					rows: 10,
					id: that.formInline.id,
					onlineStatus: that.formInline.staus
				};
				this.$axios.get(this.hostname+'/manage/dsp/userInfo/admin/list',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data);
					that.loading = false;

                    that.allPage = (res.data.total/10)*10;
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
				this.publicFn.statusInitFn(this,this.tableData[index].id,Value,'/manage/dsp/userInfo/admin/changeStatus');
				setTimeout(this.Init,200);
					// console.log(index,row);
			},
			// 11.12 - 3.0主页下拉菜单选项
			home_project_Fn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
				};
				this.$axios.get(that.hostname+'/manage/dsp/sys/config/getDspUserInfoList',{params: datas}).then(function(res){
          			// 响应成功回调
					console.log(res.data);
					if(res.status == 200) {
						that.home_project = res.data;
					}
				}, function(err){
						console.log(err);
				})
			},
			//搜索查询fn
			searchFn() {
				var that = this;
				that.loading = true;
				if((that.formInline.id != undefined) || (that.formInline.staus != undefined)) {
					let username = localStorage.getItem('ms_username');
					var datas = {
						loginUserName: username,
						id: that.formInline.id,
						onlineStatus: that.formInline.staus
					};
					this.$axios.get(that.hostname+'/manage/dsp/userInfo/admin/list',{params: datas}).then(function(res){
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
				// console.log(that.formInline);
			} 
        }
	}
</script>
<style scoped>
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
		.el-select {
			width: 100%;
		}
</style>