let conn;
export const mixin = {
  data() {
    return {
        conn: null,
        talkList:[]
    }
  },
  methods: {
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
        onTextMessage: function (message) {
          console.log('receive message ', message,message.data);
          let currentTime = new Date();
          vm.talkList.push({
            time: currentTime.Format('yyyy-MM-dd hh:mm:ss'),
            type:2,//1表示发送的消息 2表示收到的消息
            from: message.from,
            data: message.data
          });

          console.log('talkList ', vm.talkList);
        }, //收到文本消息
        // onEmojiMessage: function (message) {}, //收到表情消息
        // onPictureMessage: function (message) {}, //收到图片消息
        // onCmdMessage: function (message) {}, //收到命令消息
        // onAudioMessage: function (message) {}, //收到音频消息
        // onLocationMessage: function (message) {}, //收到位置消息
        // onFileMessage: function (message) {}, //收到文件消息
        // onVideoMessage: function (message) {
        //   var node = document.getElementById('privateVideo');
        //   var option = {
        //     url: message.url,
        //     headers: {
        //       'Accept': 'audio/mp4'
        //     },
        //     onFileDownloadComplete: function (response) {
        //       var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
        //       node.src = objectURL;
        //     },
        //     onFileDownloadError: function () {
        //       console.log('File down load error.')
        //     }
        //   };
        //   WebIM.utils.download.call(conn, option);
        // }, //收到视频消息
        // onPresence: function (message) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        // onRoster: function (message) {}, //处理好友申请
        // onInviteMessage: function (message) {}, //处理群组邀请
        // onOnline: function () {}, //本机网络连接成功
        // onOffline: function () {}, //本机网络掉线
        // onError: function (message) {}, //失败回调
        // onBlacklistUpdate: function (list) { //黑名单变动
        //   // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        //   console.log(list);
        // },
        onReceivedMessage: function (message) {
          console.log('confirm message ', message);
          vm.pushTalk();
        }, //收到消息送达服务器回执
        onDeliveredMessage: function (message) {
          console.log('收到消息送达客户端回执 message ', message);
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


}
