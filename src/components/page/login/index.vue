<template>
  <div class="login" @keydown.enter="loginFn">
    <div class="login_title">{{msg}}</div>
    <div class="inputs">
      <input type="text" v-model="datas.name" placeholder="用户名" name="username"/>
      <input type="password" v-model="datas.pwd" placeholder="密码" name="password"/>
      <el-row>
        <el-button class="login_btn" type="primary" @click="loginFn">登录</el-button>
      </el-row>
    </div>
  </div>
</template>


<script>
import md5 from 'js-md5';
export default {
  name: 'login',
  data () {
    return {
      msg: '悦动广告平台',
      datas: {
        name: "",
        pwd: ""
      }
    }
  },
  mounted() {
    
  },
  methods: {
    initLogin(msg) {
      var _self = this;
      _self.$notify.error({
        title: '错误',
        message: msg
      });
      _self.datas.name = "";
      _self.datas.pwd = "";
    },
    loginFn() {
      var _self = this;
      if(_self.datas.name == "") {
        _self.initLogin("用户名不能为空");
      }else if(_self.datas.pwd == "") {
        _self.initLogin("密码不能为空");
      }else {
        // 传统写法 http://182.92.82.188:8280
        _self.$axios.post(_self.hostname+'/manage/sys/user/admin/login?userName='+_self.datas.name+'&pwd='+md5(_self.datas.pwd)).then(function(res){
            // 响应成功回调
            console.log(res.data);
            if(res.data.resultCode != 200) {
              _self.initLogin(res.data.message);
            }else {
               // _self.$cookies.set('qbsusername',_self.datas.name);
                // _self.$cookies.set('qbsusername',_self.datas.name);
               localStorage.setItem('ms_username',_self.datas.name);
               localStorage.setItem('Login_username',res.data.data.dsp_adr_name);
              _self.$router.push('/ad_userinfo');
            }
        }, function(err){
            console.log(err);
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login {
  width: 100%;
  height: 100%;
  background: url(./images/login_bg.jpg) no-repeat center;
  background-size: cover;
}
  .login_title {
    position: relative;
    color: white;
    font-size: 2.4rem;
    letter-spacing: .6vw;
    top: 16rem;
    text-align: center;
  }
  .inputs {
    position: relative;
    width: 40%;
    height: 10rem;
    /*margin: auto;*/
    top: 17rem;
    left: 40%;
  }
    .inputs input {
      width: 50%;
      height: 3rem;
      border: none;
      font-size: 1.2rem;
      margin-top: 1.5rem;
      text-indent: 1rem;
      border-radius: 5px;
      background: rgba(255,255,255,.7);
    }
    .login_btn {
      margin-top: 1.8rem;
      width: 50%;
      height: 3rem;
      font-size: 1.2rem;
      letter-spacing: .6vw;
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
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
