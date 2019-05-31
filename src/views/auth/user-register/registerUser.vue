<template>
  <div class="register">
    <!-- <img class="main-img" src="http://img.paascloud.net/login/paascloud/paascloud.png" alt=""> -->
    <div class="res">
      
      <h1>欢迎注册老师好在线</h1>
      <div class="main-bot">
          <input
            class="main-input"
            type="text"
            v-model="registerForm.mobileNo"
            @blur="validatePhone"
            placeholder="请输入手机号"
          >
          <input class="main-input" type="password" v-model="registerForm.loginPwd" placeholder="请输入密码">
        
          <input class="main-input" type="password" v-model="registerForm.confirmPwd" placeholder="请再次输入密码">
       
          <input
          
            type="text"
            v-model="registerForm.imageCode"
            class="main-input-2"
            @blur="checkImageCode"
            placeholder="请输入正确验证码"
          >
          <img :src="imageCode" @click="getImage" class="check-ma">
          
          <input type="text" v-model="registerForm.smsCode" class="main-input-2" placeholder="请输入短信验证码">
          <pc-timer-button
            :class="activeSendSmsButton && isTimerStop ? 'active-send-sms-code' : 'inactive-send-sms-code'"
            ref="timerBtn"
            @on-run="sendPhoneCode"
            @on-stop="isTimerStop = true"
          >发送验证码</pc-timer-button>

        <button class="register-btn" @click="submit">注册</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import PcTimerButton from "components/form/timer-button/index.vue";
export default {
  data() {
    return {
      imageCode: "",
      registerForm: {
        loginName: "",
        mobileNo: "",
        loginPwd: "",
        email: "",
        confirmPwd: "",
        imageCode: "",
        smsCode: "",
        inviteCode: '',
        registerSource: "PC"
      },
      checkTelephoneResult: false,
      checkKaptchaCodeResult: false,
      isTimerStop: true
    };
  },
  created() {
    this.getImage();
  },
  mounted() {
    // const inviteCode = this.getUrlParam('inviteCode');
    // window.location.href = `http://mall.lshao.cn?inviteCode=${inviteCode}`;
  },
  methods: {
    getImage() {
      this.deviceId = new Date().getTime();
      let that = this;
      that
        .$http({
          method: "POST",
          url: "/uac/auth/code/image",
          headers: {
            deviceId: that.deviceId
          }
        })
        .then(res => {
          that.imageCode = "data:image/jpg;base64," + res.result;
        });
    },
    submit() {
      console.log(this.getUrlParam('inviteCode'));
      let validateResult = this.formValidate();
      // 验证成功
      if (validateResult.status) {
        this.register(() => {
          this.$store.dispatch("new_notice", {
            autoClose: true,
            content: "注册成功"
          });
          this.loadPage("Login");
        });
      } else {
        this.$store.dispatch("new_notice", {
          autoClose: true,
          content: validateResult.msg
        });
      }
    },
    register(resolve) {
      this.registerForm.inviteCode = this.getUrlParam('inviteCode');
      var params = this.registerForm;
      params.imageCode = null;
      this.$http({
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          deviceId: this.deviceId
        },
        url: "/uac/auth/register",
        params: params
      })
        .then(res => {
          this.getImage();
          if (res) {
            resolve(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    validatePhone() {
      this.checkTelephoneResult = false;
      let mobileNo = this.registerForm.mobileNo;
      if (!mobileNo) {
        this.$store.dispatch("new_notice", {
          autoClose: true,
          content: "手机号码不能为空"
        });
        return;
      }
      let that = this;
      let reg = /^1\d{10}$/;
      let result = reg.test(mobileNo);
      if (!result) {
        that.$store.dispatch("new_notice", {
          autoClose: true,
          content: "手机号码格式不正确"
        });
      } else {
        that.checkTelephoneResult = true;
        // this.$http({
        //   method: 'POST',
        //   url: '/uac/auth/checkPhoneActive/' + mobileNo,
        //   data: ''
        // }).then((res) => {
        //   if (!res.result) {
        //     that.$store.dispatch('new_notice', {
        //       autoClose: true,
        //       content: '帐号没有激活'
        //     });
        //   }
        //   that.checkTelephoneResult = res.result;
        // });
      }
    },
    checkImageCode() {
      let that = this;
      this.$http({
        method: "GET",
        url: `/uac/auth/code/image`,
        headers: {
          deviceId: that.deviceId
        },
        params: {
          imageCode: this.registerForm.imageCode
        }
      }).then(res => {
        that.checkKaptchaCodeResult = res.result;
      });
    },
    sendPhoneCode() {
      let mobileNo = this.registerForm.mobileNo;
      this.isTimerStop = false;
      if (!mobileNo) {
        this.$store.dispatch("new_notice", {
          autoClose: true,
          content: "手机号码不能为空"
        });
        return;
      }
      this.$refs.timerBtn.start();
      this.$http({
        method: "POST",
        url: `/uac/auth/code/sms`,
        headers: {
          deviceId: this.deviceId
        },
        params: {
          mobile: mobileNo,
          imageCode: this.registerForm.imageCode
        }
      }).then(res => {
        if (res.code === 200) {
          console.info("发送验证码成功");
        } else {
          alert(res.message);
          this.getImage();
          this.$refs.timerBtn.stop();
        }
      });
    },
    formValidate() {
      let result = {
        status: false,
        msg: ""
      };
      // 验证用户名是否为空
      if (!this.validate(this.registerForm.mobileNo, "require")) {
        result.msg = "手机号不能为空";
        return result;
      }

      // 校验登录名是否存在
      //        this.checkCount((res) => {
      //          if (!res.result) {
      //            result.status = false;
      //            result.msg = '用户名已存在';
      //            return result;
      //          }
      //        }, this.registerForm.loginName, 'loginName');
      // 验证邮箱
      // if (!this.validate(this.registerForm.email, 'require')) {
      //   result.msg = '邮箱不能为空';
      //   return result;
      // }

      // 验证邮箱正则
      // if (!this.validate(this.registerForm.email, 'email')) {
      //   result.msg = '邮箱格式不正确';
      //   return result;
      // }

      // 校验邮箱是否存在
      //        this.checkCount((res) => {
      //          if (!res.result) {
      //            result.status = false;
      //            result.msg = '邮箱已存在';
      //            return result;
      //          }
      //        }, this.registerForm.email, 'email');
      // 验证 密码
      if (!this.validate(this.registerForm.loginPwd, "require")) {
        result.msg = "密码不能为空";
        return result;
      }
      // 验证 密码
      if (!this.validate(this.registerForm.confirmPwd, "require")) {
        result.msg = "确认密码不能为空";
        return result;
      }
      if (!this.validate(this.registerForm.loginPwd, "pwd")) {
        result.msg = "密码格式不正确";
        return result;
      }
      if (!this.validate(this.registerForm.confirmPwd, "pwd")) {
        result.msg = "确认密码格式不正确";
        return result;
      }
      // 验证两次输入的密码是否一致
      if (this.registerForm.loginPwd !== this.registerForm.confirmPwd) {
        result.msg = "两次输入的密码不一致";
        return result;
      }

      if (!this.validate(this.registerForm.mobileNo, "require")) {
        result.msg = "手机号码不能为空";
        return result;
      }

      // 验证手机号
      if (!this.validate(this.registerForm.mobileNo, "phone")) {
        result.msg = "手机号格式不正确";
        return result;
      }

      //        this.checkCount((res) => {
      //          if (!res.result) {
      //            result.status = false;
      //            result.msg = '手机号码已存在';
      //            return result;
      //          }
      //        }, this.registerForm.mobileNo, 'mobileNo');

      if (!this.validate(this.registerForm.smsCode, "require")) {
        result.msg = "短信验证码不能为空";
        return result;
      }

      // 通过验证，返回正确提示
      result.status = true;
      result.msg = "验证通过";
      return result;
    },
    checkCount(resolve, validValue, type) {
      this.ajax({
        url: `/uac/auth/checkValid`,
        isUnMusk: true,
        data: {
          validValue: validValue,
          type: type
        },
        success: resolve
      });
    }
  },
  computed: {
    activeSendSmsButton() {
      return this.checkKaptchaCodeResult && this.checkTelephoneResult;
    }
  },
  components: {
    PcTimerButton
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.register {
  // width: 1080px;
  // height: 582px;
  // background-color: #ffffff;
  // border: solid 1px #e6e6e6;
  // border-top: solid 1px #4d7fff;
  //   margin-top: -50px;
}

.main-img {
  width: 375px;
  margin: 27px 52.5px;
  float: left;
}

 .main .register .res {
  // float: right;
	width: 1080px;
	height: 740px;
	background-color: #ffffff;
	border: solid 1px #e6e6e6;
  border-top: solid 1px #4d7fff;
  margin-top: 42px;

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
      line-height: 1;
      vertical-align: baseline;
    }
    .register {
      display: inline-block;
      color: #40485b;
      font-size: 16px;
    }
    .zhu {
      float: right;
      color: #e97b21;
      font-size: 16px;
    }
  }
  .main-bot {
    width: 380px;
    margin: 60px auto;
    .check-ma {
      width: 106px !important;
      height: 50px;
      border: 1px solid #dce4e6;

      border-radius: 4px;
      padding-left: 0;
      float: right;
    }
    .field-inline {
      width: 330px;
      height: 40px;
      margin-bottom: 10px;
      p {
        float: left;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      input {
        float: right;
      }
    }
    .main-input {
      margin-bottom: 30px;
      outline: 0;
      font-size: 16px;
      color: #a1a1a2;
      text-indent: 1em;

      width: 380px;
      height: 50px;
      border-radius: 4px;
      border: solid 1px #e6e6e6;
    }

    .main-input-2 {
      margin-bottom: 30px;
      outline: 0;
      font-size: 16px;
      color: #a1a1a2;
      text-indent: 1em;

      width: 260px;
      height: 50px;
      border-radius: 4px;
      border: solid 1px #e6e6e6;
    }
    .register-btn {
      
      width: 380px;
      height: 50px;
      background-color: #4d7fff;
      border-radius: 4px;
      margin-bottom: 20px;
      outline: 0;
      font-size: 16px !important;
      border: 0;
      cursor: pointer;
      color: #ffffff;
      margin-top: 10px;
    }
    .btn {
      width: 100px;
      height: 40px;
      margin-bottom: 20px;
      outline: 0;
      font-size: 16px !important;
      background-color: #fe7300;
      border: 0;
      cursor: pointer;
      color: #ffffff;
      margin-left: 7px;
    }
  }
}

.register-check-dev {
  width: 330px;
  height: 40px;
  margin-bottom: 14px;
}
.register-check-dev p {
  float: left;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}

.register-check-dev input {
  margin-left: 40px;
  float: left;
  width: 135px;
  height: 40px;
  padding-right: 7px;
  border-radius: 2px;
  border: 1px solid #dce3e8;
  outline: none;
  background: #f3f6f8;
  padding-left: 26px;
  line-height: 18px;
  font-size: 16px;
}

.register-check-sms input {
  margin-left: 13px;
  float: left;
  width: 135px;
  height: 40px;
  padding-right: 7px;
  border-radius: 2px;
  border: 1px solid #dce3e8;
  outline: none;
  background: #f3f6f8;
  padding-left: 26px;
  line-height: 18px;
  font-size: 16px;
}

.register-check-sms p {
  float: left;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}

.register .inactive-send-sms-code {
  width: 106px !important;
  height: 50px;
  float: right;
  padding: 0.5em 0.92857em;
  font-weight: normal;
  border-radius: 2px;
  box-shadow: none !important;
  // background-color: #dcddde !important;
  color: #4d7fff;
  opacity: 0.3 !important;
  pointer-events: none;
  cursor: default;
	border-radius: 4px;
	border: solid 1px #4d7fff;
}
.register .active-send-sms-code {
  width: 106px !important;
  height: 50px;
  float: right;
  padding: 0.5em 0.92857em;
  font-weight: normal;
  border-radius: 2px;
  box-shadow: none !important;
  cursor: pointer;
  color: #4d7fff;
  // background-color: #fe7300;
	border: solid 1px #4d7fff;
}
</style>
