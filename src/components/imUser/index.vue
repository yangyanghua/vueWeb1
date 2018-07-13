<template>
  <div class="nav">
    <!-- 主导航 -->
    <div class="navMain">
      <el-popover v-if="canChange" ref="popover1" placement="right" width="30" trigger="click" v-model="popVisible">
        <ul class="online-list">
          <li :class="[form.onlineType===1?'is-checked': '']" @click="setOnline(1)">
            <i class="el-icon-check"></i>
            <i class="online"></i> 在线</li>
          <li :class="[form.onlineType===2?'is-checked': '']" @click="setOnline(2)">
            <i class="el-icon-check"></i>
            <i class="busy el-icon-remove"></i> 忙碌</li>
          <li :class="[form.onlineType===3?'is-checked': '']" @click="setOnline(3)">
            <i class="el-icon-check"></i>
            <i class="offline"></i> 离线</li>
        </ul>
      </el-popover>
      <div class="nav_img">
        <!-- <img  src="/static/images/logo.png"> -->
        <img @click="showPop" class="head-img" :src="form.headImg || '/static/images/im/customerService.png'">
      </div>
      <el-button class="im-username" type="text" v-popover:popover1 :title="form.nickName">
        <i class="online" v-show="form.onlineType===1"></i>
        <i class="busy el-icon-remove" v-show="form.onlineType===2"></i>
        <i class="offline" v-show="form.onlineType===3"></i>
        {{form.nickName}}</el-button>
      <div class="talk-menu">
        <router-link class="chat" :to="{path:'/im/message'}">
          <img class="talk-icon" src="/static/images/im/talk.png" alt="">
        </router-link>
      </div>
      <!-- <div class=""> -->
      <router-link :to="{path:'/im/set'}" class="set">
        <img class="set-icon" src="/static/images/im/set.png" alt="">
      </router-link>
      <!-- </div> -->
      <!-- <div  class="nav-item">
        <router-link class="nav-item" :to="{path:'/index'}">
          返回
        </router-link>
      </div> -->
      <!-- <div class="navlist">
        <router-link class="navlist-item" 
        v-for="(item) in navData.navList" :class="[item.icon, (navData.navLevelFirst==item.id)?'active':'']" :key="item.id" :to="item.link" > 
         {{item.name}}
        </router-link>
      </div>
      <div class="sign_out">
        <button v-text="btnText||'用户名'" @click="showToggle" class="btn_out"></button>  
        <div v-show="isShow" class="sign_lr">
          <p class="title">{{btnText}}</p>
          <p class="sign_btn">
          <el-button type="primary" class="refresh_btn" @click="sign_out()">退出登录</el-button> 
          </p>
        </div>  
      </div> -->

    </div>

  </div>
</template>
<script>
  import {
    mapGetters,
  } from 'vuex';

  import * as Service from '@/common/service/im/index.js'; //退出的接口
  import {
    getNavList
  } from '@/common/service/common.js';
  const user = JSON.parse(localStorage.getItem('user')) || {};
  export default {
    data() {
      return {
        canChange: true,
        hideSecond: false,
        btnText: "",
        isShow: false,
        popVisible: false,
        form: {
          nickName: '',
          onlineType: 3,
          headImg: '',
          id: ''
        }
        // currentNavIndex: 0
        // navInfo: {navList}, 
      }
    },
    computed: {
      ...mapGetters(['currentHeadImg', 'currentNickName'])
    },
    watch: {
      'currentHeadImg': function (val) {
        this.form.headImg = val;
      },
      'currentNickName': function (val) {
        this.form.nickName = val;
      }
    },
    methods: {
      setOnline(status) {
        let vm = this;
        this.form.onlineType = status;
        // console.log('this.form客服配置信息---',this.form)
        Service.IMupdateInfo(this.form).then(res => {
          this.popVisible = false;
          // 更新当前闪聊用户的在线状态信息
          let userInfo = JSON.parse(localStorage.getItem('imUser'));
          if(userInfo){
            userInfo.onlineType = status;
            localStorage.setItem('imUser', JSON.stringify(userInfo));
          }

        }).catch(res => {
          this.$message.error(res.message);
        });
      },
      getLoginUserName() {
        this.btnText = user.name;
      },
      showPop() {
        this.popVisible = !this.popVisible;
      }

    },
    mounted() {
      let vm = this;
      console.log('get nav1231 ', user);
      Service.IMgetInfo({
        userId: user.chatAccount.slice(8)
      }).then(res => {
        console.log('rr ', res);
        this.form = res;
        localStorage.setItem('imUser', JSON.stringify(res));
        // this.setOnline(1);
      });
      this.getLoginUserName();
      window.addEventListener("storage", function (e) {
        console.log(e)
        console.log(e.newValue);
        if (e.key === 'imUser') {
          if (!e.newValue) {
            vm.setOnline(3);
            vm.canChange = false;
          }
        }
      });

    }
  }

</script>
<style lang="scss" scoped>
  body,
  html {
    height: 100%;
  }

  .online,
  .offline {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: $color-success;
    vertical-align: middle;
    margin-right: 5px; // margin: 0 auto;
  }

  .busy {
    vertical-align: middle;
    font-size: 12px;
    color: $color-danger;
    margin-right: 5px;
  }

  .offline {
    background-color: $color-btnbg-gray;
  }

  .head-img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
  }

  .im-username {
    // display: block;
    margin-left: 8px;
    margin-top: 5px;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    font-size: 12px;
  }

  .online-list {
    padding-left: 20px;
    li {
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      &.is-checked .el-icon-check {
        display: inline-block
      }
      .el-icon-check {
        position: absolute;
        left: -20px;
        top: 9px;
        display: none;
      }
    }
  }

  .talk-menu {

    margin-top: 40px;
    .chat {
      display: inline-block; // width: 58px;
      height: 58px;
      width: 100%;
      line-height: 58px;
      text-align: center;
      &.router-link-active {
        background-color: #2A3641;
      }
      .talk-icon {
        display: inline-block;
        width: 28px;
        height: 28px;
      }

    }


  }

  .set {
    display: inline-block; // width: 58px;
    position: absolute;
    bottom: 60px;
    left: 0;
    height: 58px;
    width: 100%;
    line-height: 58px;
    text-align: center;
    &.router-link-active {
      background-color: #2A3641;
    }
    .set-icon {
      display: inline-block;
      width: 28px;
      height: 28px;
    }
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0; // width: 225px;
    height: 100vh;
    background: #fff;
    z-index: 99;
  }

  .navMain {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: #2D4053;
    width: 100px;

    .nav_img {
      padding: 55px 0 0 30px;
    } // .navlist {
    //   .navlist-item {
    //     width: 100px;
    //     height: 38px;
    //     display: inline-block;
    //     padding-left: 40px;
    //     line-height: 38px;
    //     font-size: 14px;
    //     color: #B6B6B6;
    //     margin-top: 20px;
    //     cursor: pointer;
    //     &.home {
    //       background: url(/static/images/im/talk.png)no-repeat 15px 8px;
    //       &:hover,
    //       &.router-link-active {
    //         background: #fff url(/static/images/navigation/home1.png)no-repeat 15px 8px;
    //         color: #333;
    //       }
    //     }
    //   }
    // }
  }

  .menu {
    position: fixed;
    top: 0;
    left: 100px;
    width: 125px;
    height: 100vh;
    border-right: 1px solid #E6E6E6;
    font-size: 14px;
    .title {
      color: #333333;
      height: 55px;
      line-height: 55px;
      text-align: center;
      border-bottom: 1px solid #E6E6E6;
    }
    ul {
      padding: 0 12px;
      li a {
        width: 100px;
        height: 38px;
        display: inline-block;
        text-align: center;
        line-height: 38px;
        margin-top: 18px;
        cursor: pointer;
        color: #787878;
        &:hover,
        &.router-link-active {
          background: #E7F1F8;
          border-radius: 5px;
          color: #333333;

        }
      }
    }
  }

  .sign_out {
    height: 56px;
    background: rgba(255, 255, 255, .1);
    line-height: 56px;
    text-align: center;
    width: 100px;
    font-size: 14px;
    color: #FFFFFF; // cursor:pointer;
    position: absolute;
    left: 0;
    bottom: 0;

    .sign_lr {
      position: absolute;
      width: 162px;
      height: 115px;
      background: #FFFFFF;
      box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.28);
      border-radius: 2px;
      color: #787878;
      top: -125px;
      left: 10px;
      &:after {
        content: '';
        border-width: 7px;
        border-color: #FFFFFF;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
        position: absolute;
        left: 23px;
        bottom: -7px;
      }
      .title {
        background: #F8F8F8;
        height: 50px;
        padding: 0 10px 0 20px;
        line-height: 50px;
        color: #333;
        font-size: 14px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sign_btn {
        text-align: left;
        padding-left: 20px;
      }

    }


  }

  .btn_out {
    border: none;
    background: none;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*重置的样式*/

  .el-dropdown-menu__item {
    padding: 0;
  } //   .el-button {
  //     background: none;
  //     font-size: 14px;
  //     color: #787878;
  //     border: none;
  //     padding: 0;
  //   }

</style>
