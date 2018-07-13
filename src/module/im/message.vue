<template>
  <div class="talks">
    <div class="left-side">
      <el-input :clearable="true" class="search-box" size="small" placeholder="请输入客户名称" prefix-icon="el-icon-search" v-model="searchUserName">
      </el-input>
      <p class="all-persons">
        {{dataList.length}}人正在聊天
      </p>
      <ul class="customers">
        <li v-for="item in showDataList" @click="talkwith(item)" :class="[item.recentUserId===currentUserId?'active':'',item.hasUnread?'unread':'']"
          :key="item.recentUserId">
          <img class="appuser-img" :src="item.recentUserHeadImg||'/static/images/logo.png'" alt="">
          <div class="appuser-info">
            <p class="head">
              {{item.recentName}}
            </p>
            <p class="time">
              <!-- {{item.msgTime}} -->
              {{getDate(item.talkList[item.talkList.length-1])}}
              <i class="icon-unread"></i>
            </p>
            <p class="ellipse">
              {{getContent(item.talkList[item.talkList.length-1])}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="right-side"> -->
    <div class="right-side" :class="[showAppend?'':'big-part']" v-if="currentUserId && dataList.length>0">
      <div class="box">
        <h2>
          <img class="h2-img" :src="selectedItem.recentUserHeadImg||'/static/images/logo.png'" alt=""> {{selectedItem.recentName}}

        </h2>

        <div class="talk-box" id="talkBox">
          <!-- <div>
            <p>{{selectedItem.recentName}} {{selectedItem.msgTime}}</p>
            {{getContent(selectedItem.msgContent)}}
          </div> -->
         <!-- <div  id="talkWrapper"> -->
            <div v-for="item in selectedItem.talkList" class="all-info">
            <div class="block left" v-if="!(getIsWeb(item))&&isInfo(item)">
              <p class="talk-info ">
                <span class="app">
                  <span class="app-name">{{selectedItem.recentName}}</span> &nbsp;&nbsp;&nbsp;&nbsp; {{getDate(item)}}</span>
              </p>
              <div class="IMcontent app-text" v-if="isText(item)">
                <span class="app-text" v-if="isText(item)">{{getContent(item)}}</span>
              </div>
              <img v-if="!(isText(item))" :src="getContent(item)" @click="enlarge($event)">

            </div>
            <div class="block right" v-if="(getIsWeb(item))&&isInfo(item)">
              <p class="talk-info ">
                <span class="web">
                  <span class="web-name">{{webName.nickName}}</span> &nbsp;&nbsp;&nbsp;&nbsp; {{getDate(item)}}</span>
              </p>
              <div class="IMcontent web-text" v-if="isText(item)">
                <span class="web-text" v-if="isText(item)">{{getContent(item)}}</span>
              </div>
              <img v-if="!(isText(item))" :src="getContent(item)" @click="enlarge($event)">
            </div>
          </div>
         <!-- </div> -->
        </div>

        <div>
          <div class="operation">
            <label for="image" class="img-upload ">
              <i class="el-icon-picture"></i>
              <input class="input" type="file" id="image" @change="sendPrivateImg">
            </label>
            <el-popover ref="popover2" placement="right" width="400" trigger="click" v-model="popVisible">
              <ul class="quick-info">
                <li v-for="item in quickInfo" @click="quickSend(item)">
                  {{item.content}}
                </li>
              </ul>
            </el-popover>
            <div class="more-btn">
              <!-- <el-button type="text" @click="testSend"> test</el-button> -->
              <el-button type="text" v-popover:popover2>快捷回复</el-button>
              <el-button type="text" @click="toggleRecord">消息记录</el-button>
            </div>
          </div>
          <el-input ref="talkBox" type="textarea" :rows="8" :autofocus="true" v-model="message" v-on:keyup.prevent.enter.ctrl.native="sendMsg"></el-input>

          <div class="btn-group send">
            <span class="tip">
              单次最多输入100字符
            </span>
            <el-button type="primary" @click="sendMsg">发送消息</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="append-side" v-if="showAppend">
      <div class="resource-info" v-if="!showRecord&&selectedItem.relatedInfo&&selectedItem.relatedInfo.resourceType==1">
        <p class="time">
          <i class="el-icon-time"></i>{{selectedItem.relatedInfo.sendTime}}
        </p>
        <img class="img" :src="(selectedItem.relatedInfo.resourceInfo.imageList&&selectedItem.relatedInfo.resourceInfo.imageList[0])"
          alt="">
        <p class="name">{{selectedItem.relatedInfo.resourceInfo.productName}}</p>
        <p class="price">¥{{selectedItem.relatedInfo.resourceInfo.skuList&&selectedItem.relatedInfo.resourceInfo.skuList[0].price}}</p>
      </div>
      <div class="resource-info" v-if="!showRecord&&selectedItem.relatedInfo&&selectedItem.relatedInfo.resourceType==2">
        <p class="time">
          <i class="el-icon-time"></i>{{selectedItem.relatedInfo.resourceInfo.sendTime}}
        </p>
        <div class="order">
          <p>
            <span class="order-info">订单状态：{{selectedItem.relatedInfo.resourceInfo.orderStatus}}</span>
          </p>
          <p>
            <span class="order-info">订单编号：{{selectedItem.relatedInfo.resourceInfo.orderCode}}</span>
          </p>
          <p>
            <span class="order-info">买家昵称：{{selectedItem.relatedInfo.resourceInfo.consignee}}</span>
          </p>
          <p>
            <span class="order-info">联系电话：{{selectedItem.relatedInfo.resourceInfo.consigneePhone}}</span>
          </p>
          <p>
            <span class="order-info">商品：</span>
          </p>
        </div>
        <div v-for="(item,index) in selectedItem.relatedInfo.resourceInfo.orderItems" :key="index">
          <img class="img" :src="item.productImages" alt="">
          <p class="name">{{item.productName}}</p>
          <p class="price">¥{{item.currentPrice}}</p>
        </div>
      </div>
      <div v-show="showRecord">
        <el-date-picker class="time-range" v-model="recordTime" align="right" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <div class="btn-group">
          消息记录:
          <el-button size="mini" type="primary" @click="searchRecord">点击搜索</el-button>
        </div>
        <div v-for="item in recordList" class="all-info">
          <div class="block " v-if="!(getIsWeb(item))&&isInfo(item)">
            <p class="talk-info">
              <span class="app">
                {{selectedItem.recentName}} &nbsp;&nbsp;&nbsp;&nbsp; {{getDate(item)}}</span>
            </p>
            <span v-if="isText(item)">{{getContent(item)}}</span>
            <img v-if="!(isText(item))" :src="getContent(item)">

          </div>
          <div class="block " v-if="(getIsWeb(item))&&isInfo(item)">
            <p class="talk-info">
              <span class="web">
                {{webName.nickName}} &nbsp;&nbsp;&nbsp;&nbsp; {{getDate(item)}}</span>
            </p>
            <span v-if="isText(item)">{{getContent(item)}}</span>
            <img v-if="!(isText(item))" :src="getContent(item)">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const imUser = JSON.parse(localStorage.getItem('imUser')) || {};
  // import {
  //   mixin
  // } from './mixin.js';
  import * as Service from '@/common/service/im/index.js';
  import {
    goodsDetail
  } from '@/common/service/goods/goods.js';
  import {
    orderDetail
  } from '@/common/service/order/index.js';
  import {
    getUploadImgSrc
  } from '@/common/service/common.js';
  const todayTime = () => {
    let today = new Date();
    let obj = {
      year: today.getFullYear(today),
      month: today.getMonth(today),
      date: today.getDate(today),
    }
    return obj;
  }
  export default {
    // mixins: [mixin],
    data() {
      return {
        //搜索用户名称
        searchUserName: '',
        intervalInt: '',
        showRecord: false,
        conn: null,
        popVisible: false,
        message: '',
        // 闪聊用户
        imUser: JSON.parse(localStorage.getItem('imUser')) || {},

        toBeSavedInfo: [],
        //当前所选联系人的用户ID
        currentUserId: '',
        //所要向用户发送信息的用户ID
        currentSendUserId: '',
        // currentUser: {},
        dataList: [],
        // showDataList: [],
        selectedItem: {
          recentName: '',
          recentUserId: '',
          msgContent: '',
          msgTime: '',
          msgType: '',
          recentUserHeadImg: '',
          talkList: [],
          relatedInfo: {
            //1为商品类型 2为店铺 3为订单
            resourceType: '',
            resourceId: '',
            sendTime: '',
            resourceInfo: {}
          },

        },
        talkList: [],
        waiting: false,
        // quickInfo: [{
        //     type: 1,
        //     content: '亲，请问有什么可以帮到您？'
        //   },
        //   {
        //     type: 1,
        //     content: '请您稍等，现在为您查询。'
        //   },
        //   {
        //     type: 1,
        //     content: '这里帮您核实一下情况。麻烦提供一下订单号，好吗?'
        //   },
        //   {
        //     type: 1,
        //     content: '很抱歉亲，现在小店咨询量较多，已在加急回复，有什么可留言，请您莫着急！'
        //   },
        // ],
        autoFeedback: {
          on: false,
          content: ''
        },
        currentInfo: {
          type: 1,
          content: ''
        },
        quickInfo: [],
        //聊天记录查询
        recordTime: [
          new Date(todayTime().year, todayTime().month, todayTime().date - 1),
          new Date(todayTime().year, todayTime().month, todayTime().date + 1),
        ],
        recordList: []
      }
    },
    computed: {
      currentTalks: function () {
        console.log('currentTalks---------');
        let findVal = this.dataList.find(x => {
          x.recentUserId === this.currentUserId
        });
        return findVal ? Object.assign({}, x.talkList) : [];

      },
      account: function () {
        return user.chatAccount || '';
      },
      // webName: function () {
      //   return imUser.nickName || '';
      // },
      webName: function () {
        return this.imUser || {};
      },
      showAppend: function () {
        return this.showRecord || this.selectedItem.relatedInfo.resourceType == 1 || this.selectedItem.relatedInfo.resourceType ==
          2;
      },
      hasUnread: function () {
        return this.dataList.some(item => {
          return item.hasUnread;
        });
      },
      showDataList: function () {
        console.log('datalist最近联系人总数----',this.dataList)
        return this.dataList.filter(z => {
          if (!z) {
            return false;
          }
          // console.log('z-----------',z);
          if(z.recentName){
            return (z.recentName.match(this.searchUserName)) ? true : false;
          }
          return true;
          
        });
      }
    },
    watch: {
      'dataList': {
        handler: 'handleChange',
        deep: true
      },
      'currentUserId': function () {
        this.showRecord = false;
      },
      'hasUnread': function (val) {
        console.log('unread: ', val);
        var int;
        if (val) {
          var titleInit = document.title,
            isShine = true;
          this.intervalInt = setInterval(function () {
            var title = document.title;
            if (isShine == true) {
              if (/新/.test(title) == false) {
                document.title = '【你有新消息】';
              } else {
                document.title = '【　　　　　】';
              }
            } else {
              document.title = titleInit;
            }
          }, 500);
        } else {
          window.clearInterval(this.intervalInt);
          document.title = '商家服务中心';


        }
      },
    },
    methods: {
      testSend() {
        // this.sendPrivateText(1, 'test ', 'web_9');
        //  vm.sortSending(1, vm.autoFeedback.content, message.from);
        this.sortSending(1, '666', 'app_11');
      },
      enlarge(e){
        // console.log(e.target.classList);
        e.target.classList.toggle('enlarge');
      },
      getInfo(type, id) {
        //type 1为商品类型 2为店铺 3为订单
        if (type == 1) {
          return goodsDetail({
            productId: id
          })
        } else if (type == 2) {
          return orderDetail({
            code: id
          })
        }
      },
      toggleRecord() {
        this.showRecord = !this.showRecord;
        this.recordList = [];
        this.recordTime = [
          new Date(todayTime().year, todayTime().month, todayTime().date - 1),
          new Date(todayTime().year, todayTime().month, todayTime().date + 1),
        ]
      },
      //查询聊天记录
      searchRecord(e,id) {
        let vm = this;
        let params = {
          sendAccounts: this.account,
          receiverAccounts: this.currentUserId,
          startTime: this.recordTime[0].getTime(),
          endTime: this.recordTime[1].getTime(),
        }
        console.log('search ', this.recordTime, params);
        Service.IMgetHistory(params).then(res => {
          console.log('search result ', res);
          this.recordList = res.map(z => z.msgContent);
          // 防止搜索不到（前后一天）聊天记录
          if(e === 1 && res.length>0){
            this.selectedItem.talkList = res.map(z => z.msgContent).reverse();
            let idx = this.dataList.findIndex(x => x.recentUserId === id);
            // console.log('weizhi -----------------------',idx);
            // this.dataList[idx] = JSON.parse(JSON.stringify(vm.selectedItem));
            // this.dataList[idx] = this.selectedItem;

            this.dataList = this.dataList.map(xinfo =>{
              if(xinfo.recentUserId === id){
                return vm.selectedItem
              }
              return xinfo;
            })
          }
        }).catch(res => {
          this.$message.error(res.message);
        })

      },
      handleChange() {
        console.log('datalist change ', this.dataList);
        localStorage.setItem('chatsInfo', JSON.stringify(this.dataList));
        console.log('after store ', JSON.parse(localStorage.getItem('chatsInfo')))
      },
      getContent(info) {
        try {
          // console.log('info----------',info,JSON.parse(info));
          if(JSON.parse(info).msgContent){
            return JSON.parse(info).msgContent;
          }
          return info;
          // return JSON.parse(info).msgContent;
        } catch (e) {
          // console.log('e-------',e);
          return info;
        }
      },
      getIsWeb(info) {
        try {
          return JSON.parse(info).clientType === 'web';
        } catch (e) {
          return false;
        }
      },
      isText(info) {
        try {
          return JSON.parse(info).msgType == 1;
        } catch (e) {
          return true;
        }
      },
      isInfo(info) {
        try {
          return !(JSON.parse(info).resourceType);
        } catch (e) {
          return true;
        }
      },
      getDate(info) {
        try {
          return new Date(JSON.parse(info).sendTime).Format('yyyy-MM-dd hh:mm:ss');
        } catch (e) {
          return '';
        }
      },
      init() {
        let vm = this;
        console.log('Service-----',Service.IMgetRecentUsers,user.chatAccount);
        Service.IMgetRecentUsers({
          chatAccounts: user.chatAccount
        }).then(res => {
          // console.log('result--------',res)
          this.dataList = res.map(x => {
            x.talkList = [x.msgContent];
            x.hasUnread = false;
            x.relatedInfo = {
              //1为商品类型 2为店铺 3为订单
              resourceType: '',
              resourceId: '',
              sendTime: '',
              resourceInfo: {}
            };
            return x;
          });
          // console.log('map datalist----', this.dataList);
          //保存聊天记录
          // let info = JSON.parse(localStorage.getItem('chatsInfo'));
          // if (info) {
          //   this.dataList = this.dataList.map(z => {
          //     let findVal = info.find(zinfo => zinfo.recentUserId === z.recentUserId);
          //     if (findVal) {
          //       return findVal
          //     }
          //     return z;
          //   })
          // }
          let currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
          if (currentUserId) {
            vm.currentUserId = currentUserId;
            // 获取聊天记录
            let params = {
              sendAccounts: this.account,
              receiverAccounts: this.currentUserId,
              startTime: this.recordTime[0].getTime(),
              endTime: this.recordTime[1].getTime(),
            }
            Service.IMgetHistory(params).then(res => {
                let currentChatInfo = vm.dataList.find(sinfo => sinfo.recentUserId === currentUserId);
                if(res.length > 0){
                  currentChatInfo.talkList = res.map(rinfo => rinfo.msgContent).reverse();
                  // 去掉重复项
                  let len = currentChatInfo.talkList.length;
                  // if(JSON.parse(currentChatInfo.talkList[len-1]).sendTime === JSON.parse(currentChatInfo.talkList[len-2]).sendTime ){
                  //   console.log('重复啦！',JSON.parse(currentChatInfo.talkList[len-1]).sendTime,JSON.parse(currentChatInfo.talkList[len-2]).sendTime);
                  //   currentChatInfo.talkList.pop();
                  // }
                }
                vm.selectedItem = Object.assign({}, {
                  relatedInfo: {
                    //1为商品类型 2为店铺 3为订单
                    resourceType: '',
                    resourceId: '',
                    sendTime: '',
                    resourceInfo: {}
                  },
                  hasUnread: false
                }, currentChatInfo);
                // console.log('合并后的selectedItem----',vm.selectedItem,res,currentChatInfo,vm.dataList);
               vm.goToBottom();
                
            })
            
          }
          // console.log('华丽的分割线-------------------',this.dataList)
        })
        .catch(res=>{
          this.$message.error(res.message);
        });
        this.getInitSet();
      },
      getInitSet() {
        Service.IMgetConfigInfos({
          customerServiceId: user.chatAccount.slice(8)
        }).then(res => {
          console.log('获取客服配置信息------',res)
          if (res.length !== 0) {
            //执行比较初始化设置内容
            // this.dataList = this.dataList.map(x => {
            //   let findVal = res.find(y => y.contentType === x.contentType);
            //   if (findVal) {
            //     x = Object.assign({}, x, findVal);
            //     x.precontent = x.content;
            //   }
            //   return x;
            // })
            let findVal = res.find(y => y.contentType === 3);
            if (findVal&&findVal.isEnable==1) {
              this.autoFeedback.on = true;
              this.autoFeedback.content = findVal.content;
            } else {
               this.autoFeedback.on = false;
            }
            let contentType2List = res.filter(z => z.contentType === 2);
            console.log('==== ', contentType2List);
            if (contentType2List.length > 0) {
              this.quickInfo = contentType2List.map(one => {
                return {
                  type: 1,
                  content: one.content
                }
              })

            }
          }
        });
      },
      goToBottom(){
             setTimeout(()=>{
                this.$nextTick(()=>{
                  if(document.getElementById("talkBox")){
                    var chat = document.getElementById("talkBox").lastChild;
                    console.log('chat ', chat);
                    if(chat){
                      chat.scrollIntoView(false);
                    }
                  }
              })
             },200);
      },
      talkwith(item) {
        let params = {
          sendAccount:user.chatAccount,
          receiveAccount:item.recentUserId
        }
        //获取当前聊天对象的token值
        Service.IMgetToken(params).then(res=>{
          console.log('当前聊天对象用户token值',res);
          localStorage.setItem('currentChatToken', res.chatToken);
        })
        item.hasUnread = false;
        this.selectedItem = Object.assign({}, item);
        this.currentUserId = this.selectedItem.recentUserId;
        // 获取聊天记录
        this.searchRecord(1,item.recentUserId);
        console.log('1351454165153',item,user,this.selectedItem,this.dataList);
        if(this.$refs["talkBox"]){
          this.$refs["talkBox"].focus();
        }else {
          setTimeout(()=>{
            this.$refs["talkBox"].focus();
          },100)
        }
        
        localStorage.setItem('currentUserId', JSON.stringify(this.currentUserId));
         this.goToBottom();
      },
      sendMsg() {
        // this.currentInfo.type = 1;
        // this.currentInfo.content = this.message;
        // this.sendPrivateText(1, this.message);
        // this.loginIm();
        this.sortSending(1, this.message);

      },
      sortSending(type, content, toPerson) {
        console.log('sortSending----> ', type, content, toPerson);
        let vm = this;
        let fn = (type, content, toPerson) => {
          vm.currentInfo.type = type;
          vm.currentInfo.content = content;
          if (toPerson) {
            vm.currentSendUserId = toPerson;
          } else {
            vm.currentSendUserId = vm.currentUserId;
          }
          vm.sendPrivateText(type, content, toPerson);
        };
        console.log('after sortSending----> ', type, content, vm.currentSendUserId)

        if (vm.waiting) {
          setTimeout(() => {
            fn(type, content, toPerson);
          }, 400);
        } else {
          fn(type, content, toPerson);
        }
      },
      sendPrivateImg() {
        let obj = document.getElementById('image');
        getUploadImgSrc(obj.files[0]).then(res => {
          // this.currentInfo.type = 2;
          // this.currentInfo.content = res;
          // this.sendPrivateText(2, res);
          this.sortSending(2, res);

          obj.value = '';
        });

      },
      quickSend(item) {
        // this.currentInfo.type = item.type;
        // this.currentInfo.content = item.content;
        // this.sendPrivateText(item.type, item.content);
        this.sortSending(item.type, item.content);

      },
      pushTalk(item) {
        let vm = this;
        let currentChatToken = localStorage.getItem('currentChatToken');
        console.log('start push talk ', vm.talkList, item,currentChatToken);
        // if(!currentChatToken){
        //   console.log('不存在currentChatToken！');
        // }

        let currentTime = new Date();
        let message = JSON.stringify({
          'clientType': 'web',
          'sendTime': currentTime.getTime(),
          'hxMsgId': item.hxMsgId,
          'msgType': item.msgType,
          'msgContent': item.msgContent
        });
        let params = {
          msgType: item.msgType,
          sendTime: item.sendTime,
          sendAccounts: user.chatAccount,
          receiverAccounts: item.to,
          // msgContent: vm.message,
          msgContent: message,
          clientType: 'web',
          // 添加chatToken
          chatToken: currentChatToken
        };
        // console.log('保存聊天记录时传输的参数------',params);
        // 1表示发送的消息 2表示收到的消息

        // let obj = {
        //   type: 1,
        //   time: currentTime.Format('yyyy-MM-dd hh:mm:ss'),
        //   from: user.chatAccount,
        //   // data: vm.message,
        //   data: message,
        //   // params: params
        // }
        // console.log('华丽分割线----------------')
        let talkperson = this.dataList.find(y => y.recentUserId === item.to);
        console.log('pushtalk ---- ', params,this.currentSendUserId,talkperson,this.dataList);
        if (talkperson) {
          talkperson.talkList.push(message);
          // this.selectedItem.talkList.push(message);
          // talkperson = this.selectedItem;
          // this.selectedItem = talkperson;
          console.log('push obj ', talkperson,message,this.selectedItem,this.dataList);
        }
        if(item.to== this.currentUserId){
          this.goToBottom();
        }
        this.popVisible = false;


        Service.IMsaveInfo(params).then(res => {
          console.log('聊天记录保存成功！');
          this.message = '';
          this.waiting = false;
        }).catch(res => {
          this.$message.error(res.message);
        })
        console.log('push talk ', vm.talkList);
      },
      sendPrivateText(type, content, toPerson) {
        console.log('begin send message ', type, content, toPerson);
        if (content.length > 100) {
          this.$message.error('单次最多输入100字符');
          return;
        }
        if (content.length === 0) {
          this.$message.error('聊天内容不能为空');
          return;
        }
        let vm = this;
        var id = (vm.conn).getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('txt', id); // 创建文本消息
        let message = JSON.stringify({
          'clientType': 'web',
          'sendTime': new Date().getTime(),
          'hxMsgId': id,
          'msgType': type,
          'msgContent': content
        });
        let infoObj = JSON.parse(message);
        infoObj.to = vm.currentSendUserId;
        infoObj.msg = message;
        // infoObj.chatToken =
        vm.toBeSavedInfo.push(infoObj);
        console.log('sendPrivateText ', id, msg, vm.currentSendUserId,vm.toBeSavedInfo,infoObj);
        msg.set({
          msg: message, // 消息内容
          to: vm.currentSendUserId, // 接收消息对象（用户id）
          roomType: false,
          success: function (id, serverMsgId) {
            console.log('send private text Success ', id, serverMsgId);
          },
          fail: function (e) {
            console.log("Send private text error");
          }
        });
        msg.body.chatType = 'singleChat';
        (vm.conn).send(msg.body);
      },
      loginIm() {
        let vm = this;
        this.conn = new WebIM.connection({
          isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
          https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
          url: WebIM.config.xmppURL,
          heartBeatWait: WebIM.config.heartBeatWait,
          autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
          autoReconnectInterval: WebIM.config.autoReconnectInterval,
          apiUrl: WebIM.config.apiURL,
          isAutoLogin: true
        });
        this.conn.listen({
          onOpened: function (message) { //连接成功回调
            // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
            // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
            // 则无需调用conn.setPresence();      
            console.log("%c [opened] 连接已成功建立", "color: green")
          },
          // onClosed: function (message) {}, //连接关闭回调
          // 接收客户端消息回调
          onTextMessage: function (message) {
            console.log('receive message ', message, message.data);
            let currentTime = new Date();

            // vm.talkList.push({
            //   time: currentTime.Format('yyyy-MM-dd hh:mm:ss'),
            //   type: 2, //1表示发送的消息 2表示收到的消息
            //   from: message.from,
            //   data: message.data
            // });
            // message.from = 'app_26';
            let talkperson = vm.dataList.find(y => y.recentUserId === message.from);

            if (talkperson) {
              let type = JSON.parse(message.data).resourceType;
              console.log('talk ===  talkperson ', vm.dataList, talkperson, type);
              if (type == 1 || type === 3) {
                talkperson.relatedInfo.resourceType = type;
                talkperson.relatedInfo.resourceId = JSON.parse(message.data).resourceId;
                talkperson.relatedInfo.sendTime = new Date(JSON.parse(message.data).sendTime).Format(
                  'yyyy-MM-dd hh:mm:ss');
                console.log('-----------', talkperson);
                vm.getInfo(talkperson.relatedInfo.resourceType, talkperson.relatedInfo.resourceId).then(res => {
                  talkperson.relatedInfo.resourceInfo = res;
                  console.log('talk per ', vm.dataList);
                })
              } else {
                let len = talkperson.talkList.length;
                //去掉重复项
                // if(JSON.parse(talkperson.talkList[len-1]).sendTime === JSON.parse(message.data).sendTime ){
                //   console.log('重复啦！',JSON.parse(talkperson.talkList[len-1]).sendTime,JSON.parse(message.data).sendTime);
                //   talkperson.talkList.pop();
                //   talkperson.talkList.push(message.data);
                // }else {
                //   talkperson.talkList.push(message.data);
                //   console.log('push上去-----',talkperson)
                // }
                if(JSON.parse(talkperson.talkList[len-1]).sendTime !== JSON.parse(message.data).sendTime){
                  talkperson.talkList.push(message.data);
                  console.log('push上去-----',talkperson);
                }
              }
              if (talkperson.recentUserId !== vm.currentUserId) {
                talkperson.hasUnread = true;
              }
              let findValIndex = vm.dataList.findIndex(y => y.recentUserId === message.from);
              vm.dataList.unshift(vm.dataList.splice(findValIndex, 1)[0]);
            } else {
              //刷新最近联系人列表
              // vm.init();
              Service.IMgetUserAccountInfo({
                appUserId: message.from
              }).then(res => {
                console.log('res最近联系人信息-----',res)
                let info = {
                  recentName: res.nickName,
                  recentUserId: message.from,
                  msgContent: message.data,
                  msgTime: currentTime.Format('yyyy-MM-dd hh:mm:ss'),
                  msgType: JSON.parse(message.data).msgType,
                  recentUserHeadImg: res.headPic,
                  talkList: [],
                  relatedInfo: {
                    //1为商品类型 2为店铺 3为订单
                    resourceType: '',
                    resourceId: '',
                    sendTime: '',
                    resourceInfo: {}
                  },
                  hasUnread: true,

                };
                let type = JSON.parse(message.data).resourceType;
                if (type == 1 || type === 3) {
                  info.relatedInfo.resourceType = type;
                  info.relatedInfo.resourceId = JSON.parse(message.data).resourceId;
                  info.relatedInfo.sendTime = new Date(JSON.parse(message.data).sendTime).Format(
                    'yyyy-MM-dd hh:mm:ss');
                  console.log('-----------', info);
                  vm.getInfo(info.relatedInfo.resourceType, info.relatedInfo.resourceId).then(res => {
                    info.relatedInfo.resourceInfo = res;
                    console.log('talk per ', vm.dataList);
                  })
                } else {
                  info.talkList.push(message.data);
                }
                vm.dataList.unshift(info);
              })
            }
            console.log('autofeedback ', vm.autoFeedback)
            if (vm.autoFeedback.on) {
              // 自动回复
              // setTimeout(() => {
              vm.sortSending(1, vm.autoFeedback.content, message.from);

              // }, 1000);
            }
            if(vm.currentUserId==message.from){
              vm.goToBottom();
            }

          }, //收到文本消息
          // onEmojiMessage: function (message) {}, //收到表情消息
          onPictureMessage: function (message) {
            console.log('get Img message ', message);
          }, 
          // onOnline: function () {}, //本机网络连接成功
          // onOffline: function () {}, //本机网络掉线
          onError: function (message) {
            // vm.$message.error('消息处理错误，请重试');
          }, //失败回调
          // onBlacklistUpdate: function (list) { //黑名单变动
          //   // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          //   console.log(list);
          // },
          // 客户端收到服务端发送的消息回调
          onReceivedMessage: function (message) {
            console.log('confirm message ', message);
            console.log('--- ', vm.toBeSavedInfo);
            let findValIndex = vm.toBeSavedInfo.findIndex(x => x.hxMsgId === message.id);

            if (findValIndex > -1) {
              let findVal = vm.toBeSavedInfo.splice(findValIndex, 1)[0];
               // console.log('x的值--------',findValIndex,findVal,vm);
              vm.pushTalk(findVal);
              vm.goToBottom();
            }



          }, //收到消息送达服务器回执
          onDeliveredMessage: function (message) {
            console.log('收到消息送达客户端回执 message ', message);
            // let obj = {
            //   type: 1,
            //   time: currentTime.Format('yyyy-MM-dd hh:mm:ss'),
            //   from: user.chatAccount,
            //   data: vm.message,
            //   // params: params
            // }
            // console.log('push obj ', obj, vm.talkList);

          }, //收到消息送达客户端回执
          onReadMessage: function (message) {}, //收到消息已读回执
          onCreateGroup: function (message) {}, //创建群组成功回执（需调用createGroupNew）
          onMutedMessage: function (message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        });
        let userInfo = JSON.parse(localStorage.getItem('user'));
        console.log('userinfo ', userInfo, userInfo.chatAccount, userInfo.chatPwd);
        var options = {
          apiUrl: WebIM.config.apiURL,
          user: userInfo.chatAccount,
          pwd: userInfo.chatPwd,
          appKey: WebIM.config.appkey,
        };
        console.log('options ', options);
        this.conn.open(options);
      }
    },
    mounted() {
      this.init();
      this.loginIm();
      let vm = this;
         window.addEventListener("storage", function (e) {
        console.log(e)
        console.log(e.newValue);
        if (e.key === 'imUser') {
          if (!e.newValue) {
            vm.conn.close();
          }
        }
      });
      // this.getInfo(1, 72);
      // this.getInfo(2, '20180330171133011810');
    }
  }

</script>
<style lang="scss" scoped>
  .talks {
    width: 1300px;
  }

  .left-side {
    display: inline-block;
    width: 250px;
    background-color: #F9F9F9;
    height: 100vh;
    padding-top: 29px;
    .all-persons {
      padding-left: 20px;
      background-color: #eee;
      line-height: 40px;
      margin-bottom: 20px;
    }
    /deep/ .search-box {
      margin-left: 20px;
      margin-right: 20px;
      width: 210px;
      background-color: #eee;
      border-radius: 100px;
      margin-bottom: 29px;
      .el-input__inner {
        border-radius: 100px;
        background-color: #eee;
      }
    }
  }

  .append-side {
    /*order or goods info start */
    .resource-info {
      padding: 30px 10px;
      .time {
        color: $color-heavy;
      }
      .img {

        height: auto;
        max-width: 320px;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      .name {
        font-weight: bold; // font-size: 14px;
      }
      .price {
        color: #EC4E46;
      }
      .order {
        margin-top: 10px;
        p {
          margin-bottom: 10px;
          .order-info {
            font-weight: bold;
          }
        }
      }

    }

    /*order or goods info end */
    display: inline-block; // margin-top: 58px;
    height: 100vh;
    width: 400px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
    vertical-align: top;
    overflow-y: scroll;
    word-break: break-all;
    word-wrap: break-word;
    .time-range {
      width: 360px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .btn-group {
      font-size: 14px;
      line-height: 30px;
      text-align: right;
      margin-bottom: 20px;
    }
    .all-info {}
    .block {
      margin-bottom: 3px;
      .talk-info {
        color: $color-normal;
        img {
          max-width: 500px;
        }
      }

    }
    .web {
      color: $color-success;
    }
    .app {
      color: $color-primary;
    }
  }

  .right-side {
    // padding-top: 58px;
    // margin-left: 30px;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    &.big-part {
      .box {
        width: 800px;
      }
    }
    .box {
      width: 600px; // width: 100%;
      background-color: #fff;
      border: 1px solid #ddd;
      height: 100vh;
      text-align: left;

      h2 {
        padding: 10px;
        line-height: 54px;
        background-color: #EFEFEF;
        text-indent: 20px;
        font-weight: bold;
        .h2-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        margin-bottom: 10px;
      }
      .el-textarea {
        height: 40%;
      }
      .left {
        text-align: left;
      }
      .right {
        text-align: right;
      }
      .talk-box {
        height: 50%;
        overflow-y: auto;
        border-right: 1px solid #ddd; // padding-bottom: 10px;
        img {
          max-width:60%;
          width:20%;
        }
        img.enlarge{
          width: 50%;
        }
        .talk-info {
          font-size: 12px;
          color: $color-light;
          margin-bottom: 5px;

          .app-name,
          .web-name {
            color: $color-heavy;
            font-size: 14px;
          }

          img {
            max-width: 500px;
            // height: 200px;
          }


        }
        .IMcontent {
          display: inline-block;
          max-width: 80%;
          text-align: left;
          padding: 3px 8px;
          border-radius: 8px;
          &.app-text {

            background-color: #0076FF;
            color: #fff;
          }
          &.web-text {
            background-color: #efefef;
            color: $color-normal;


          }
        }

        .all-info {
          padding-left: 20px;
          padding-right: 20px;
          word-break: break-all;
          word-wrap: break-word;
        }
        .block {
          padding-bottom: 8px;
          .talk-info {
            color: $color-normal;
          }

        } // .web {
        //   color: $color-success;
        // }
        // .app {
        //   color: $color-primary;
        // }
      }
    }
    .btn-group {
      text-align: right;
      margin-top: 15px;
      margin-bottom: 15px;
      &.send {
        margin-right: 20px;
      }
      .tip {
        margin-right: 10px;
      }

    }
  }

  .customers {
    // border-bottom: 1px solid #ddd;
    .active {
      // color: $color-primary;
      background-color: #EFEFEF;
    }
    .unread {
      // background: red;
      .icon-unread {
        display: inline-block;
      }

    }
    .icon-unread {
      display: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      right: -25px;
      top: 3px;
    }
    li {
      // border-top: 1px solid #ddd;
      padding: 10px 20px; // background-color: #f5f5f5;
      background-color: #fff;


      cursor: pointer;
      &:hover {
        // color: $color-primary;
        background-color: #EFEFEF;
      }
      .time {
        // float: right;
        color: $color-light;
        position: relative;
      }
      .head {
        font-weight: bold;
        color: $color-heavy;

      }
      .ellipse {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; // font-weight: normal;
        color: $color-normal;

      }
    }
    .appuser-img {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      vertical-align: middle;
      border-radius: 50%;

    }
    .appuser-info {
      display: inline-block;
      vertical-align: middle;
      width: 120px;
    }
  }


  .operation {
    background-color: #efefef;
    padding: 10px; // margin-top: 10px;
  }

  .quick-info {
    li {
      // height: 30px;
      line-height: 1.5; // margin-bottom: 5px;
      padding: 3px;
      cursor: pointer;
      &:hover {
        // background-color: #f5f5f5;
        background-color: $color-primary;
        color: #fff;
      }
    }
  }

  .img-upload {
    font-size: 20px;
    padding-left: 20px;
    i {
      cursor: pointer;
      vertical-align: middle;
    }
    .input {
      display: none;
    }
  }

  .more-btn {
    display: inline-block;
    float: right;
  }

</style>
