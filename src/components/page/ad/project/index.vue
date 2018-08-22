<template>
	<div class="ad_project">
		<el-row :gutter="20">
			<el-form :inline="true" :model="formInline" label-width="500px">
				<el-col :span="12">
					<el-input placeholder="查询广告主" icon="search"  class="search" ></el-input>
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
			      label="名称"
			      width="220">
			      <template scope="scope_name">
			      	<router-link class="names" to="/ad_active">{{scope_name.row.name}}</router-link>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="ads"
			      label="广告主"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="Allprice"
			      label="消耗"
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
				msg: "广告项目",
				formInline: {
		          user: '',
		          region: ''
		        },
		        timeVal: '',
		        tableData: [{
		          ID: "1108118799",
		          Allprice: "76179.42",
		          turn: true,
		          name: '为行投资',
		          link: "/pro_detail",
		          ads: ""
		        }, {
		          ID: "1108118899",
		          Allprice: "76179.42",
		          turn: false,
		          name: '幂动科技',
		          link: "/pro_detail",
		          ads: ""
		        }]
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
		.names {
			color: #00D1B2;
		}
</style>