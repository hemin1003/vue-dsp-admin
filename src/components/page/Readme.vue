<template>
    <div>
        <!-- <el-row>
            <el-col :span="6" v-for="(item,index) in arr" :key="index"><div class="grid-content bg-purple" :class="item.class"><span>{{item.name}}</span><p>{{item.val}}</p></div></el-col>
        </el-row>
        <div class="chart_nav">
            <span class="chart_title">{{echart_title}}</span>
            <div class="all_btn">
                <div class="chart_btn" @click="tap(index)" :class="{echat_active: active ==index}" v-for="(item,index) in echart_btn" :key="index">{{item.name}}</div>
            </div>
        </div>
        <el-row :gutter="20">
           <el-col :span="24">
                <div id="mychart"></div>
            </el-col> 
        </el-row>
        <div class="tab_title">详细信息列表</div>
        <div class="tablist">
            <el-table
            :data="tableData"
            stripe
            :default-sort = "{prop: 'dates',order: 'descending'}"
            style="width: 94%;margin: 0 auto;font-size: 1rem">
            <el-table-column v-for="item in table"
              :prop="item.prop"
              :label="item.name"
              :sortable="item.turn" >
            </el-table-column>
          </el-table>
        </div> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            var _self = this;
            // // 传统写法
            // _self.$http.post('http://182.92.82.188:8280/manage/sys/user/admin/login?userName='+_self.datas.name+'&pwd='+_self.datas.pwd).then(function(res){
            //     // 响应成功回调
            //     // console.log(res.data);
            //     if(res.data.resultCode != 200) {
            //       _self.initLogin(res.data.message);
            //     }else {
            //       _self.$router.push('/index');
            //     }
            // }, function(err){
            //     console.log(err);
            // })
            // _self.$http.get('http://182.92.82.188:8280/manage/sys/menu/getUserMenu?parentId=1&isUserMenuTree=true').then(function(res){
            //         // 响应成功回调
            //         console.log(res);
                    
            //     }, function(err){
            //         console.log(err);
            //     })
        }
    }
</script>

<style>
.content {
    background: #EFEFEF;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
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