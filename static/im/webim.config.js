/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

let currentHost = location.host;
let appKey = '';

if (currentHost == 'localhost:8090' || currentHost == 'localhost:9090' || currentHost == '192.168.9.243:8380' || currentHost == '192.168.9.218:8380' || currentHost == '192.168.9.76:9090') {
    appKey = '1117180509177819#test01';
} else if (currentHost == 'tsgmerchant-web.iflashbuy.com:8383' || currentHost == '192.168.5.177:8090') {
  appKey = '1117180509177819#test01';//测试
}else if(currentHost == 'ysgmerchant-web.z-code.cn'){
  appKey = '1144180320177104#shanliao';   
}else if (currentHost == 'sgmerchant-web.iflashbuy.com') {
  appKey = '1144180320177104#shanliao'; //闪购生產
} else if (currentHost == 'sgmerchant-web.z-code.cn' || currentHost== 'sgmerchant-web.z-code.cn:8381') {
  appKey = '1144180320177104#shanliao'; //码上花生產
}
console.log('配置文件-----',appKey);
var WebIM = {};
WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.easemob.com',
    /*
     * Backend REST API URL
     */
    // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
    apiURL: 'http://a1.easemob.com',
    /*
     * Application AppKey
     */
    appkey: appKey,

    /*
     * Whether to use wss
     * @parameter {Boolean} true or false
     */
    https: false,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /*
     * set presence after login
     */
    isAutoLogin: true,
    /**
     * Whether to use window.doQuery()
     * @parameter {Boolean} true or false
     */
    isWindowSDK: false,
    /**
     * isSandBox=true:  xmppURL: 'im-api-sandbox.easemob.com',  apiURL: '//a1-sdb.easemob.com',
     * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
     * @parameter {Boolean} true or false
     */
    isSandBox: false,
    /**
     * Whether to console.log in strophe.log()
     * @parameter {Boolean} true or false
     */
    isDebug: true,
    /**
     * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 2,
    /**
     * the interval seconds between each auto reconnectting.
     * works only if autoReconnectMaxNum >= 2.
     */
    autoReconnectInterval: 2,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https\:$/.test(window.location.protocol),
    /**
     * after login, send empty message to xmpp server like heartBeat every 45s, to keep the ws connection alive.
     */
    heartBeatWait: 4500,
    /**
     * while http access,use ip directly,instead of ServerName,avoiding DNS problem.
     */
    isHttpDNS: false,

    /**
     * Will show the status of messages in single chat
     * msgStatus: true  show
     * msgStatus: true  hide
     */
    msgStatus: true,

    /**
     * When a message arrived, the receiver send an ack message to the
     * sender, in order to tell the sender the message has delivered.
     * See call back function onReceivedMessage
     */
    delivery: true,

    /**
     * When a message read, the receiver send an ack message to the
     * sender, in order to tell the sender the message has been read.
     * See call back function onReadMessage
     */
    read: true,

    /**
     * When a message sent or arrived, will save it into the localStorage,
     * true: Store the chat record
     * false: Don't store the chat record 
     */
    saveLocal: true,

    /**
     * Will encrypt text message and emoji message
     * {type:'none'}   no encrypt
     * {type:'base64'} encrypt with base64
     * {type:'aes',mode: 'ebc',key: '123456789easemob',iv: '0000000000000000'} encrypt with aes(ebc)
     * {type:'aes',mode: 'cbc',key: '123456789easemob',iv: '0000000000000000'} encrypt with aes(cbc)
     */
    encrypt: {
        type: 'none'
    }
};
