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
			      prop="ID"
			      label="ID"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="名称"
			      width="220">
			    </el-table-column>
			    <el-table-column
			      prop="balance"
			      label="总预算(剩余)"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="Allprice"
			      label="总消耗"
			      
			      >
			    </el-table-column>
			    <el-table-column
			      prop="Creatdate"
			      label="创建时间"
			      >
			    </el-table-column>
			    <el-table-column property="turn" label="状态">
				    <template scope="scope">
				    <!-- @change="change(scope.$index,scope.row)" -->
				      <el-switch on-text ="进行"
                        off-text = "暂停"
                        on-color="#00D1B2"
                        off-color="#dadde5" 
                        v-model="scope.row.turn"
                        >
					  </el-switch>
					  <el-tag type="success">{{scope.row.status}}</el-tag>
					</template>
			    </el-table-column>
				<el-table-column
			    >
			      <template scope="scope2">
			      	<router-link :to="scope2.row.link"><span class="table_detail">详情</span></router-link>
			      </template>
			    </el-table-column>
		  	</el-table>
		</el-form>
		</div>
		<div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="100">
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
		        }, {
		          ID: "1108118899",
		          Creatdate: '2016-05-03',
		          balance: "76178 (0)",
		          Allprice: "76179.42",
		          turn: false,
		          name: '广州幂动科技有限公司',
		          status: '通过',
		          link: "/basetable"
		        }]
			}
		},
		methods:{
           change:function(index,row){
                console.log(index,row);
           }
        }
	}
</script>
<style>
	.tables {
		margin-top: 20px;
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