<template>
	<div class="ad_report">
	<!-- <el-row>
            <el-col :span="6" v-for="(item,index) in arr" :key="index"><div class="grid-content bg-purple" :class="item.class"><span>{{item.name}}</span><p>{{item.val}}</p></div></el-col>
        </el-row> -->
        <div class="chart_nav">
            <span class="chart_title">{{echart_title}}</span>
						<!-- <el-col :span="3"> -->
	    			<el-select v-model="adsType.ids" placeholder="选择状态" style="margin-left: 15px;">
	    				<el-option label="上线" value="321321"></el-option>
	    				<el-option label="暂停" value="32131233"></el-option>
	    			</el-select>
    			<!-- </el-col> -->
            <div class="all_btn">
                <div class="chart_btn" @click="tap(index)" :class="{echat_active: active ==index}" v-for="(item,index) in echart_btn" :key="index">{{item.name}}</div>

                <!-- 日期选择 -->
                <el-date-picker
                    @change="SelectFn"
                    v-model="valueDate"
                    type="daterange"
                    range-separator="至"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </div>
        </div>
        <el-row :gutter="20">
           <el-col :span="24">
                <div id="mychart"></div>
            </el-col> 
        </el-row>

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
			      prop="date"
			      label="日期"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="advertiser"
			      label="广告主"
			      width="220">
			    </el-table-column>
			    <el-table-column
			      prop="advertiserId"
			      label="广告主ID"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="adsName"
			      label="广告名称"
			      
			      >
			    </el-table-column>
			    <el-table-column
			      prop="showNum"
			      label="展示次数"
			      >
			    </el-table-column>
					<el-table-column
			      prop="clickNum"
			      label="点击次数"
			      >
			    </el-table-column>
					<el-table-column
			      prop="price"
			      label="单价"
			      >
			    </el-table-column>
					<el-table-column
			      prop="consumption"
			      label="消耗金额"
			      >
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
import echarts from 'echarts'
	export default {
		data() {
			return {
				msg: "6得飞起",
				adsType: {
					ids: '321321'
				},
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
						allPage: '',
						paramdata: {
								currentPage: 1,
								returnPage: 10
						},
						
						echart_title: '总消耗趋势',
                show_day: 7,
                startDate: '',
                endDate: '',
                fn: "",
                active: 0,
                valueDate: '',
                echart_btn: [
                    {name: "7天内",value: 7},
                    {name: "30天内",value: 30},
                    {name: "60天内",value: 60}
                    // {name: "更多详情",value: "more"}
                ],
                countdata: [],
                arr: [
                    {name: "今天收入",val: "￥0.000",class: "count_special"},
                    {name: "昨天收入",val: "￥0.000"},
                    {name: "账户余额",val: "￥0.000"},
                    {name: "总收入",val: "￥0.000"}
               ],
               tableData: [],
                Xdate: null,
                val_date: null
			}
		},
		mounted() {
			var that = this;
			that.Init();
            // 初始化echarts
            let myChart = echarts.init(document.getElementById('mychart'));
            // 封装调用api
            that.fn = function () {
                // 金额总计api
                // that.$http.jsonp(that.hostname+"/api/dev/summary"+this.url_token()).then(function(response){
                    
                //     // 总计列表数据渲染
                //     that.countdata = [response.data.data.incometoday,response.data.data.incomeyesterday,response.data.data.balance,response.data.data.totalbalance]
                //     for(let i = 0;i < that.countdata.length; i++) {
                //         that.arr[i].val = that.countdata[i]
                //     }
                // });
								// 日期数据api
								var datas = {
									// loginUserName: username,
									page: that.paramdata.currentPage,
									rows: that.paramdata.returnPage,
									days: that.show_day
								};
                that.$http.get(that.hostname+"/manage/htt/httReportAdsCustomChild/admin/list",{params: datas}).then(function(response){
                    console.log(response);
                    // x轴数据
										// that.Xdate = response.data.data.date
										that.Xdate = ["2018-08-27", "2018-08-28", "2018-08-29", "2018-08-30", "2018-08-31", "2018-09-01", "2018-09-02", "2018-09-03", "2018-09-04"];
                    // 图表val
										// that.val_date = response.data.data.total
										that.val_date = [5290.28, 6618.99, 4339.37, 6703.15, 4463.52, 5159.68, 5742.66, 4208.25, 5383.4, 5367.46]
                    // var len = response.data.data.date.length,obj;
                    // for(var i = 0; i < len; i++) {
                    //    obj = {dates: response.data.data.date[i],all_in: response.data.data.total[i],cpl_in: response.data.data.cpl[i], cpa_in: response.data.data.cpa[i], wx: response.data.data.mini[i], wakeup: response.data.data.wakeup[i]}
                    //    that.tableData.push(obj); 
                    // }
                    // console.log(that.tableData);
                    // 设置echarts
                    myChart.setOption({
                    tooltip : {
                        trigger: 'axis'
										},
										 legend: {
											itemGap: 10,
											data:['展示次数','点击次数','消耗金额']
										},
                    // toolbox: {
                    //     show : true,
                    //     // feature : {
                    //     //     mark : {show: true},
                    //     //     dataView : {show: true, readOnly: false},
                    //     //     restore : {show: true},
                    //     //     saveAsImage : {show: true}
                    //     // }
                    // },
                    dataZoom: {
                        show: true,
                        start: 0,
                    },
                    grid: {
                        x: 50,
                        y: 20,
                        x2: 50,
                        y2: 90
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data: that.Xdate
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        // {
                        //     type: 'line',
                        //     itemStyle: {
                        //         color: '#FFB704'
                        //     },
                        //     // smooth:true,
                        //     // itemStyle: {normal: {areaStyle: {type: 'default'},color: '#FFB704'}},
                        //     data: that.val_date
												// },
												 {
															name:'展示次数',
															type:'line',
															stack: '总量',
															data:[120, 132, 101, 134, 90, 230, 210]
													},
													{
															name:'点击次数',
															type:'line',
															stack: '总量',
															data:[220, 182, 191, 234, 290, 330, 310]
													},
													{
															name:'消耗金额',
															type:'line',
															stack: '总量',
															data:[150, 232, 201, 154, 190, 330, 410]
													},
													// {
													// 		name:'直接访问',
													// 		type:'line',
													// 		stack: '总量',
													// 		data:[320, 332, 301, 334, 390, 330, 320]
													// },
													// {
													// 		name:'搜索引擎',
													// 		type:'line',
													// 		stack: '总量',
													// 		data:[820, 932, 901, 934, 1290, 1330, 1320]
													// }
                    ]
                    })
                });
                // echarts 随着窗口大小改变而改变
                // window.onresize(myChart.resize()) 
                    
                
                
            }
            that.fn();
		},
		methods:{
			Init() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					loginUserName: username,
					page: that.paramdata.currentPage,
					rows: that.paramdata.returnPage
				};
				this.$axios.get(this.hostname+'/manage/htt/httReportAdsCustomChild/admin/list',{params: datas}).then(function(res){
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
				console.log(index,row);
			},
			handleCurrentChange(val) {
				var that = this;
				that.paramdata.currentPage = val;
				that.Init();
			},
			// tab动态显示
			tap(a) {
					this.active = a
					this.show_day = this.echart_btn[a].value
					// 归零处理
					this.tableData = []
					if(this.echart_btn[a].value == 'more') {
								// this.$router.replace('/Income')  //路由跳转（暂时不要）
							this.$notify.success({
								title: '温馨提示',
								message: '暂未开放，敬请期待~',
							});
					}else {
						this.fn()  
					}
			},
			SelectFn(val) {
					this.startDate = val.split('至')[0];
					this.endDate = val.split('至')[1];
					this.fn();
					console.log(this.endDate);
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



		.content {
    background: #EFEFEF;
}
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 8.5rem;
    text-align: center;
    font-size: 1.4rem;
    background: white;
    margin-bottom: .5rem;
  }
    .grid-content span {
        margin-top: 2.4rem;
        display: inline-block;  
    }
    .grid-content p {
        margin-top: .4rem;
        color: #FFB600;
    }
   /* .count_special {
        font-size: 1.8rem;
    }
        .count_special span {
            margin-top: 3.2rem;
            float: left;
            margin-left: 6rem;
        }
        .count_special p {
            margin-top: 3.2rem;
            float: left;
        }*/
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .chart_nav {
    padding-top: 1rem;
    height: 3rem;
    width: 100%;
    color: #333;
    font-size: 20px;
    line-height: 3rem;
    background: white;
  }
    .chart_title {
        float: left;
        margin-left: 2%;
        font-size: 1.4rem;
        font-weight: bold;
    }
    .all_btn {
        float: right;
        margin-right: 3%;
    }
    .chart_btn {
        float: left;
        margin-top: .5rem;
        height: 2rem;
        width: 6rem;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        margin-left: .5rem;
    }
    .echat_active {
        color: #FFB600;
        border-radius: 3rem;
        border: 1px solid #FFB600;
    }
  #mychart {
    width: 100%;
    height: 400px;
    background: white;
    margin-bottom: .5rem;
  }
  .tablist {
    width: 100%;
    padding: 1rem 0;
    background: white;
    padding-bottom: 2rem;
  }
  .tab_title {
    padding-top: 1rem;
    text-indent: 2%;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 2rem;
    background: white;
  }
  .tablist .el-table,.tablist .el-table th>.cell {
    text-align: center;
  }
</style>