<template>
  <div class="header">
    <div class="header-in w">
      <div class="header-l">
        <a href="http://mall.lshao.cn" target="_blank" class="header-font">
          <img src="https://lshaomall.oss-cn-shenzhen.aliyuncs.com/images/Logo3.png">
        </a>
        <!-- <ul> -->
        <!-- <li><a href="http://mall.lshao.cn" target="_blank" class="header-font">老师好平台</a></li> -->
        <!-- <li><a href="https://gitee.com/paascloud/paascloud-master" class="header-font" target="_blank">码云</a></li>
          <li><a href="https://github.com/paascloud/paascloud-master" class="header-font" target="_blank">GITHUB</a></li>
        <li><a href="http://blog.paascloud.net" class="header-font" target="_blank">BLOG</a></li>-->
        <!-- </ul> -->
      </div>
      <div class="header-r">
        <a class="reg" v-if="!isRegister">还没有注册？
          <!-- <span class="link" @click="loadPage('Register')">立即注册</span> -->
          <span class="link" @click="loadPage('RegisterUser')">立即注册</span>
        </a>
        <a class="reg" v-if="isRegister">已有账号？
          <span class="link" @click="loadPage('Login')">立即登录</span>
        </a>
        <!-- <a @click="loadPage('Login')">登录</a> -->
        <!-- <ul>
          <li><a @click="loadPage('Register')" class="header-font">注册</a> </li>
          <li><a @click="loadPage('Login')" class="header-font">登录</a></li>
        </ul>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {
    isRegister() {
      console.log(this.$route.name);
      return this.$route.name === 'Register';
    },
    cartList() {
      return this.$store.getters.getCartList;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.header {
  // background-color: #303643;
  height: 100px;
  position: absolute;
  z-index: 10;
  width: 100%;
}
.header-in {
  width: 1000px;
  height: 100px;
}
.header-l,
.header-r {
  width: 500px;
  height: 100px;
  position: relative;
}
.header-l {
  float: left;
}

.header-font {
  font-size: 14px;
  cursor: pointer;
}

.header-r {
  float: left;
}
.header-l img {
  // width: 100px;
  // height: 30px;
  margin-top: 24px;
  float: left;
}
.header-l li {
  float: left;
  height: 46px;
  line-height: 46px;
  margin: 0 18px;
}

.header-r .reg {
  bottom: 25px;
  position: absolute;
  right: 0;

  height: 18px;
  font-size: 18px;
  color: #333333;
}

.header-r .reg span {
  height: 18px;
  font-size: 18px;
  color: #4d7fff;
}

.header-r input {
  outline: 0;
  float: left;
  width: 203px;
  height: 26px;
  margin-left: 170px;
  margin-top: 10px;
  border: 1px solid #8c92a4;
  border-radius: 50px;
  background-color: #303643;
  text-indent: 1em;
  color: #8c92a4;
}

.header-r li {
  height: 46px;
  line-height: 46px;
  margin: 0 10px;
  color: #8c92a4;
  float: right;
}

.header-r li a {
  color: #8c92a4;
}
</style>

