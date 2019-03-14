
<template>
  <div class="user-login">
    <!-- <img class="main-img" src="http://img.paascloud.net/login/paascloud/paascloud.png" alt=""> -->
    <div class="res">
      <h1>登录老师好在线</h1>
      <!-- <div class="main-top">
        <i class="fa fa-user-o" aria-hidden="true"></i>
        <span class="login">登录</span>
        <a href="#" class="login-register" @click="loadPage('Register')">注册</a>
      </div> -->
      <div class="main-bot">
        <input class="login-input" @keyup.13="doLogin" v-model="loginForm.loginName" type="text" placeholder="请输入手机号"/>
        <input class="login-input" @keyup.13="doLogin" v-model="loginForm.loginPwd" type="password"
               placeholder="请输入密码"/>
        <div class="image-code-div">
          <input type="text" v-model="loginForm.captchaCode" placeholder="请输入正确验证码">
          <img :src="imageCode" @click="getImage"/>
        </div>
        <button class="login" @click="doLogin">登录</button>

        <div class="main-password">
          <input id="button" type="checkbox" class="button" @click="rememberMeFn" :checked="rememberMe" value="Bike" title=""/>
          <label for="button" class="remMe">7天内自动登录</label>
          <a class="fog" @click="loadPage('ResetPwdPhone')">忘记密码?</a>
        </div>
        <!-- <div class="other">
          <hr/><p>其他方式登录</p><hr/>
        </div>
        <div class="last">
          <a href="#"><img src="../../../assets/images/login/git1.png" alt=""></a>
          <a href="#"><img src="../../../assets/images/login/git2.png" alt=""></a>
          <a href="#"><img src="../../../assets/images/login/git3.png" alt=""></a>
          <a href="/uac/auth/qq"><img src="../../../assets/images/login/git4.png" alt=""></a>
          <a href="/auth/weixin"><img src="../../../assets/images/login/git5.png" alt=""></a>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // import {enums, PcCookie} from '../../../utils/';
  export default {
    data () {
      return {
        imageCode: '',
        deviceId: '',
        loginForm: {
          loginName: '',
          loginPwd: '',
          captchaCode: ''
        }
      };
    },
    mounted () {
      this.getImage();
    },
    methods: {
      doLogin () {
        let validateResult = this.formValidate();
        if (!validateResult.status) {
          this.$store.dispatch('new_notice', {
            autoClose: true,
            content: validateResult.msg
          });
          return;
        }
        this.login();
      },
      login () {
        let loginName = this.loginForm.loginName;
        let loginPwd = this.loginForm.loginPwd;
        this.$http({
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'deviceId': this.deviceId
          },
          url: '/uac/auth/form',
          auth: {
            username: 'lshao-client-uac',
            password: 'lshaoClientSecret'
          },
          params: {
            username: loginName,
            password: loginPwd,
            imageCode: this.loginForm.captchaCode
          },
          withCredentials: true
        }).then((res) => {
          this.getImage();
          if (res && res.code === 200) {
            this.$store.dispatch('update_auth_token', res.result);
            console.log(`登录成功 : this.redirectUri:${this.redirectUri}`);
            console.log(`process.env.NODE_ENV :${process.env.NODE_ENV} `);
            console.log(res.result);
            // debugger;
            window.location.href = this.redirectUri;
            // PcCookie.set({
            //   key: enums.USER.REDIRECT_URI,
            //   value: res.redirectUri});
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      getImage () {
        this.deviceId = new Date().getTime();
        let that = this;
        that.$http({
          method: 'POST',
          url: '/uac/auth/code/image',
          headers: {
            'deviceId': that.deviceId
          }
        }).then((res) => {
          that.imageCode = 'data:image/jpg;base64,' + res.result;
        });
      },
      rememberMeFn() {
        this.$store.dispatch('update_remember_me');
      },
      formValidate () {
        let result = {
          status: false,
          msg: ''
        };
        if (!this.validate(this.loginForm.loginName, 'require')) {
          result.msg = '用户名不能为空';
          return result;
        }
        if (!this.validate(this.loginForm.loginPwd, 'require')) {
          result.msg = '密码不能为空';
          return result;
        }
        if (!this.validate(this.loginForm.captchaCode, 'require')) {
          result.msg = '验证码不能为空';
          return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
      }
    },
    computed: {
      rememberMe() {
        return this.$store.getters.getRememberMe;
      },
      redirectUri() {
        return this.$store.getters.getRedirectUri;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .user-login{

	width: 1080px;
	height: 582px;
	background-color: #ffffff;
	border: solid 1px #e6e6e6;
	border-top: solid 1px #4d7fff;
    margin-top: -115px;
  }
  .image-code-div {
    width: 380px;
    height: 50px;
    margin-bottom: 14px;
    input {
      width: 265px;
      height: 50px;
      outline: none;
      font-size: 14px;
      text-indent: 1em;
      border-radius: 2px;
      border: 1px solid #e6e6e6;
    }
    img {
      width: 95px !important;
      height: 50px;
      border: 1px solid #e6e6e6;
      padding-left: 0;
      float: right;
    }
  }

  .main-img {
    width: 375px;
    margin: 27px 52.5px;
    float: left;
  }

  .main .res {
    width: 420px;
    background-color: #ffffff;
    margin: 0 auto;
    h1 {
      font-size: 36px;
      // display: block;
      // margin: 0 auto;
      margin-top: 90px;
      text-align: center;
    }

    .main-top {
      height: 25px;
      line-height: 25px;
      margin: 10px 20px;
      i {
        font-size: 14px;
      }
      .login {
        display: inline-block;
        color: #40485b;
        font-size: 16px;
      }
      .login-register {
        float: right;
        color: #e97b21;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .main-bot {
      width: 380px;
      margin: 65px 24px 30px;
      .login-input {
        width: 100%;
        height: 50px;
        margin-bottom: 28px;
        outline: 0;
        font-size: 14px;
        color: #b3b3b3;
        text-indent: 1em;
        border-radius: 4px;
        border: solid 1px #e6e6e6;
      }
      .button {
        width: 15px;
        height: 15px;
        vertical-align: middle;
      }
      .main-password {
        height: 20px;
        line-height: 20px;
        margin-bottom: 10px;
        .remMe {
          vertical-align: middle;
          cursor: pointer;
          color: #7e8c8d;
        }
      }
      .login {
        
    margin-top: 25px;
    border: 0;
    outline: 0;
    width: 100%;
    height: 50px;
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    background-color: #4d7fff;
    border-radius: 4px;
      }
    }
    .other {
      width: 100%;
      height: 20px;
      line-height: 20px;
      margin-bottom: 20px;
      hr {
        width: 90px;
        display: inline-block;
        vertical-align: middle;
      }
      p {
        width: 136px;
        color: #9b9b9b;
        text-align: center;
        display: inline-block;
      }
    }
    .last {
      width: 100%;
      img {
        width: 42px;
        height: 42px;
        margin: 0 12px;
      }
      a:first-child img {
        float: left;
        margin-left: 80px;
      }
      a:last-child img {
        float: right;
        margin-right: 80px;
      }
    }
  }

  .fog {
    float: right;
    cursor: pointer;
  }
</style>
