<template>
  <div class="set-main">
    <h2 class="title">
      设置
    </h2>
    <div class="set-box">
      <ul>
        <li v-for="(item,index) in dataList" class="info">
          <p class="set-name">{{item.name}}
            <el-switch v-if="item.contentType!=2" class="set-switch" @change="switchItem(item,index)" v-model="item.isEnable" :active-value="1"
              :inactive-value="0"></el-switch>
            <el-button v-if="item.contentType==2" type="text" class="set-switch" @click="addQuikInfo">+ 新增快捷回复</el-button>
          </p>
          <div v-if="item.contentType!=2">
            <p v-show="!item.isEdit">{{item.content}}
              <i class="icon el-icon-edit-outline" @click="editItem(index)"></i>
            </p>
            <el-input v-show="item.isEdit" v-model="item.precontent"></el-input>
            <div class="btn-group" v-show="item.isEdit">
              <el-button size="mini" @click="cancelMsg(index)">取消</el-button>
              <el-button size="mini" type="primary" @click="saveMsg(item,index)">保存</el-button>
              <i class="msgLen">{{item.precontent.length}}/100</i>
            </div>
          </div>
          <div v-if="item.contentType==2" v-for="(one,oneIndex) in item.dataList" class="content-list">
            <p v-show="!one.isEdit">{{one.content}}
              <i class="icon el-icon-edit-outline" @click="editQuikInfo(oneIndex)"></i>
              <i class="icon el-icon-delete" @click="deleteQuikInfo(oneIndex)"></i>
            </p>
            <el-input v-show="one.isEdit" v-model="one.precontent" @change="msgLen"></el-input>
            <div class="btn-group" v-show="one.isEdit">
              <el-button size="mini" @click="cancelQuikInfo(oneIndex)">取消</el-button>
              <el-button size="mini" type="primary" @click="saveQuikInfo(one,oneIndex)">保存</el-button>
              <i class="msgLen">{{one.precontent.length}}/100</i>
            </div>
          </div>
        </li>
        <li class="info">
          <p class="set-name">昵称设置</p>
          <div>
            <p v-show="!nickNameEditting">{{nickName}}
              <i class="icon el-icon-edit-outline" @click="editNick()"></i>
            </p>
            <el-input v-show="nickNameEditting" v-model="preNickName"></el-input>
            <div class="btn-group" v-show="nickNameEditting">
              <el-button size="mini" @click="cancelNickName">取消</el-button>
              <el-button size="mini" type="primary" @click="saveNickName">保存</el-button>
              <i class="msgLen">{{nickNameLen}}/20</i>
            </div>
          </div>
        </li>
        <li class="info">
          <p class="set-name">头像设置</p>
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="btn-group imgset">
            <el-button size="mini" @click="cancelImg">取消</el-button>

            <el-button size="mini" type="primary" @click="saveImg">保存</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // const user = () => {
  // return JSON.parse(localStorage.getItem('user')) || {}
  // };
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const imUser = () => {
    return JSON.parse(localStorage.getItem('imUser')) || {}
  };
  import {
    SET_HEAD_IMG,
    SET_NICK_NAME
  } from '@/store/mutation-types';
  import * as Service from '@/common/service/im/index.js';
  import {
    getUploadImgSrc
  } from '@/common/service/common.js';
  export default {
    data() {
      return {
        imageUrl: '', //用户头像
        nickName: '', //用户昵称
        preNickName: '', //用户昵称输入框
        nickNameEditting: false, //是否正在编辑用户昵称
        dataList: [{
            id: '',
            contentType: 1,
            name: '首问语',
            content: '',
            precontent: '',
            isEnable: 0,
            isEdit: false
          },
          {
            id: '',
            contentType: 2,
            name: '快捷回复',
            // content: '亲，现在咨询用户较多，请稍后！',
            // precontent: '亲，现在咨询用户较多，请稍后！',
            dataList: [],
            isEnable: 0,
            isEdit: false
          },
          {
            id: '',
            contentType: 3,
            name: '自动回复',
            precontent: '不客气！',
            content: '不客气！',
            isEnable: 0,
            isEdit: false
          },
        ],
      }
    },
    computed: {
      nickNameLen: function(){
        return this.preNickName.length;
      }
    },
    methods: {
      init() {
        Service.IMgetConfigInfos({
          customerServiceId: user.chatAccount.slice(8)
        }).then(res => {
          if (res.length !== 0) {
            //执行比较初始化设置内容
            this.dataList = this.dataList.map(x => {
              let findVal = res.find(y => y.contentType === x.contentType);
              if (findVal) {
                if(findVal.contentType === 2){
                  let obj = {
                    id: findVal.id,
                    isEdit: false,
                    content: findVal.content,
                  };
                  obj.precontent = obj.content;
                  x.dataList.push(obj);
                  x.isEnable = findVal.isEnable;
                  x.isEdit = false;
                }else {
                  x = Object.assign({}, x, findVal);
                  x.precontent = x.content;
                }
              }
              return x;
            })
            
            let contentType2List = res.filter(z => z.contentType === 2);
            if (contentType2List.length > 0) {
              this.dataList[1].dataList = contentType2List.map(one => {
                return {
                  id: one.id,
                  content: one.content,
                  precontent: one.content,
                  isEdit: false,
                }
              })
            }
            this.imageUrl = imUser().headImg;
            this.nickName = this.preNickName = imUser().nickName;
            console.log(this.dataList);
          }
        });
      },
      cancelMsg(index) {
        this.dataList[index].precontent = this.dataList[index].content;
        this.dataList[index].isEdit = false;
      },
      saveMsg(item, index) {
        if(item.precontent.length > 100){
          this.$message.error('内容最多输入100字符');
          return;
        }
        this.saveInfo(item, index).then(res => {
          this.dataList[index].content = this.dataList[index].precontent;
          this.dataList[index].isEdit = false;
          this.dataList[index].id = res;
        }).catch(res => {
          this.$message.error(res.message);
        })
      },
      editQuikInfo(index) {
        this.dataList[1].dataList[index].isEdit = true;

      },
       deleteQuikInfo(index) {
        Service.IMdeleteQickReply({
          configDTOIds: this.dataList[1].dataList[index].id+''
        }).then(res => {
          this.dataList[1].dataList.splice(index, 1);

        }).catch(res => {
          this.$message.error(res.message);
        })
      },
      addQuikInfo() {
        this.dataList[1].dataList.push({
          id: '',
          isEdit: true,
          content: '',
          precontent: ''
        })
      },
      cancelQuikInfo(index) {
        this.dataList[1].dataList[index].isEdit = false;
        this.dataList[1].dataList[index].precontent = this.dataList[1].dataList[index].content;
      },
      saveQuikInfo(one, index) {
        console.log('length-----',one.precontent.length)
        if (one.precontent === '') {
          this.$message.error('内容不能为空');
          return;
        }else if(one.precontent.length > 100){
          // console.log('cuowu dawe dw ')
          this.$message.error('内容最多输入100字符');
          return;
        }
        // else if(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(one.precontent)){
        //   console.log('you biao qing');
        //   return;
        // }
        let params = {
          content: one.precontent,
          contentType: 2,
          id: one.id,
          isEnable: 1,
          /*customerServiceId: user.chatAccount.slice(4)*/
          customerServiceId: user.chatAccount.slice(8)
        };
        Service.IMupdateAndAddConfigInfo(params).then(res => {
          // this.dataList[index].content = this.dataList[index].precontent;
          // this.dataList[index].isEdit = false;
          // this.dataList[index].id = res;
          this.dataList[1].dataList[index].content = this.dataList[1].dataList[index].precontent;
          this.dataList[1].dataList[index].isEdit = false;
          this.dataList[1].dataList[index].id = res;

        }).catch(res => {
          this.$message.error(res.message);
        })
      },
      switchItem(item, index) {
        if(item.precontent.length > 100){
          this.$message.error('内容最多输入100字符');
          return;
        }
        this.saveInfo(item, index).then(res => {
          this.dataList[index].id = res;
          console.log('自动回复-----------',this.dataList,item,index)
        }).catch(res => {
          this.dataList[index].isEnable = (this.dataList[index].isEnable === 1) ? 0 : 1;
          this.$message.error(res.message);
        })
      },
      saveInfo(item, index) {
        console.log('save ', item, index);
        let params = {
          content: item.precontent,
          contentType: item.contentType,
          id: item.id,
          isEnable: item.isEnable,
          customerServiceId: user.chatAccount.slice(8)
        };
        return Service.IMupdateAndAddConfigInfo(params);
      },
      editItem(index) {
        this.dataList[index].isEdit = true;

      },
      beforeAvatarUpload(file) {
        getUploadImgSrc(file).then(res => {
          this.imageUrl = res;

        });
        return false;
      },
      //取消保存图片
      cancelImg() {
        this.imageUrl = imUser().headImg;
      },
      saveImg() {
        let params = {
          ...imUser(),
          headImg: this.imageUrl
        };
        console.log(imUser(), 'params ', params);
        Service.IMupdateInfo(params).then(res => {
          // this.popVisible = false;
          let user = imUser();
          user.headImg = this.imageUrl;
          localStorage.setItem('imUser', JSON.stringify(user));
          this.$store.commit(SET_HEAD_IMG, this.imageUrl);
          this.$message.success('头像设置成功');
        }).catch(res => {
          this.$message.error(res.message);
        });

      },
      editNick() {
        this.nickNameEditting = true;
      },
      //取消编辑昵称
      cancelNickName() {
        this.preNickName = this.nickName;
        this.nickNameEditting = false;
      },
      saveNickName() {
        if (this.preNickName === '') {
          this.$message.error('昵称不能为空');
          return;
        }else if(this.preNickName.length > 20){
          this.$message.error('昵称内容长度需小于20字符');
          return;
        }
        let params = {
          ...imUser(),
          nickName: this.preNickName
        }
        Service.IMupdateInfo(params).then(res => {
          this.nickName = this.preNickName;
          let user = imUser();
          user.nickName = this.nickName;
          localStorage.setItem('imUser', JSON.stringify(user));
          this.$store.commit(SET_NICK_NAME, this.nickName);
          this.$message.success('昵称设置成功');
          this.nickNameEditting = false;
        }).catch(res => {
          this.$message.error(res.message);
        });
      },
    },
    mounted() {
      this.init();
    }

  }

</script>
<style lang="scss" scoped>
  .set-main {
    margin-left: 20px;
    background-color: #fff;
    padding: 60px 100px; // padding-left:
    .title {
      font-size: 16px;
      color: $color-primary;
      margin-bottom: 12px;

    }
    .info {
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
    }
    .set-box {
      border: 1px solid #ddd;
      width: 700px;
    }
    .icon {
      margin-left: 5px;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
    }
    .set-name {
      color: $color-heavy;
      position: relative;
      font-weight: bold;
      margin-bottom: 8px;

    }
    .set-switch {
      position: absolute;
      right: 0;
      top: 0;
    }
    .btn-group {
      margin-top: 15px;
      position: relative;
      .msgLen {
        position: absolute;
        right: 26px;
        top: -12px;
      }
    }
    .imgset {
      display: inline-block;
      vertical-align: text-bottom;
      margin-left: 20px;
    }
    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border-radius: 50%;

    }
    /deep/ .avatar-uploader {
      display: inline-block;
    }
    /deep/ .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 58px;
      height: 58px;
      line-height: 58px;
      text-align: center;
    }

    .avatar {
      width: 58px;
      height: 58px;
      display: block;
    }
  }

  .content-list {
    margin-bottom: 10px;
  }

</style>
