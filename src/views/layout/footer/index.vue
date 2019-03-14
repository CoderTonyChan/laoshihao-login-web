<template>
  <div class="footer">
    <div class="bottom">
      <div class="w">
        <!-- <div class="links">
        <a class="link" href="https://juejin.im" target="_blank">掘金</a> |
        <a class="link" href="https://www.baidu.com" target="_blank">百度</a> |
        <a class="link" href="https://www.taobao.com" target="_blank">淘宝</a> |
        <a class="link" href="https://www.zhihu.com" target="_blank">知乎</a>
        </div>-->
        <p class="copyright">
          <a class="link" href="http://mall.lshao.cn/aboutMe">关于我们</a>&nbsp;&nbsp;|&nbsp;&nbsp;
          <a class="link" href="http://mall.lshao.cn/privacy" @click.prevent="loadPage('privacy')">隐私政策</a> &nbsp;&nbsp;|&nbsp;&nbsp;
          <!-- <a class="link" href="javascript:void(0)" @click.prevent="loadPage('disclaimer')">免责声明</a> |
          <a class="link" href="javascript:void(0)" @click.prevent="loadPage('about')">关于老师好商城</a>|-->
          <a class="link" href="http://mall.lshao.cn/disclaimer" @click.prevent="loadPage('disclaimer')">免责声明</a>
        </p>
        <p
          class="copyright"
        >Copyright © 2019 All Right Reserved 老师好网校 道明公司 版权所有 &nbsp;&nbsp;|&nbsp;&nbsp;京ICP备14046643号</p>
      </div>
    </div>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
.w1{
  /* color: black; */
  position: absolute;
    top: 55px;
    left: 255px;
}

.w2{
  /* color: black; */
  position: absolute;
    top: 55px;
    left: 405px;
}


.w3{
  /* color: black; */
  position: absolute;
    top: 55px;
    left: 555px;
}


.w4{
  /* color: black; */
  position: absolute;
    top: 55px;
    left: 705px;
}


.footer .f-title {
  margin-bottom: 20px;
    font-size: large;
}

.footer .f-title-2 {
    position: absolute;
    right: 18px;
    top: 175px;
}

.footer .f-img{
    display: block;
    position: absolute;
    right: 0;
    margin-top: -99px;
}

.footer .f-table .item {
  margin-top: 8px;
}


.footer .copyright {    
    margin: 0 0 0px;
    text-align: center;
    margin-bottom: 11px;
    color: #999;
}

.footer img {
  margin-top: 90px;
}

.footer .top {
	height: 227px;
	// background-color: #fafbfc;
}


</style>
