<template>
  <div class="">
    <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
    <mu-row gutter class="content">
      <mu-col width="100" tablet="75" desktop="75" class="topic-part">
        <mu-paper class="paper">
          <mu-row gutter>
            <mu-col width="90" tablet="90" desktop="90" >
              <h2>{{content.title}}</h2>
              <span style="color: #00bcd4">{{content.sponsor}}  </span><span style="color: #7f8c8d">{{content.createTime}} . {{content.count}} 次阅读</span>
            </mu-col>
            <mu-col width="10" tablet="10" desktop="10">
              <mu-avatar src="/images/avatar1.jpg"/>
            </mu-col>
          </mu-row>
          <hr>
          <mu-row>
            <p>{{content.content}}</p>
          </mu-row>
        </mu-paper>
        <mu-paper v-if="content.reply" style="margin-top: 20px">
          <div class="reply-header">
            <span>{{content.reply.length}} 回复</span>
          </div>
          <div class="reply-list">
            <mu-list>
              <div class="item-wrapper" v-for="item in content.reply"  >
                <mu-list-item>
                  <mu-avatar src="/images/avatar3.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                    <span style="color: rgba(0, 0, 0, .87)">{{item.username + ' -'}}</span>{{' '+item.content}}</span>
                </mu-list-item>
                <mu-divider/>
              </div>
            </mu-list>
          </div>
        </mu-paper>
        <mu-paper v-if="content.reply" style="margin-top: 20px">
          <div class="my-reply">
            <mu-text-field v-model="replyText" hintText="请输入..." multiLine :rows="3" :rowsMax="8" icon="comment" :underlineShow="false" style="border: black; width:90%"/><br/>
            <mu-divider/>
            <mu-raised-button label="回复" class="demo-raised-button" primary style="margin-left: 82%; margin-top: 2%" @click="onReply"/>
          </div>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="25" desktop="25" class="sidebar">
        <div class="tips bm">
          <mu-paper>
            <mu-card-header title="点赞次数"/>
            <mu-divider />
            <mu-list-item>
              <mu-checkbox label="favorite" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite"/> <br/>
            </mu-list-item>
          </mu-paper>
        </div>
      </mu-col>
    </mu-row>
  </div>


</template>

<script>
  import api from '../../config/api-config'
  export default {
    data () {
      return {
        content: {},
        fileList: [],
        top_10_files: [],
        fileId: '',
        value: null,
        errorText: {
          title: '',
          content: ''
        },
        replyText: '',
        toast: false,
        regMsg: '',
      }
    },
    mounted: function () {
      this.content = JSON.parse(sessionStorage.getItem('content'));
    },
    methods: {
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      handleChange (val) {
        this.nav = val
      },
      onReply() {
        let id = this.content._id;
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let username = userInfo.username;
        let content = this.replyText;
        let param = {
          username: username,
          content: content
        };
        api.reqPostReply(id,param).then(() =>{
          this.replyText = '';
          this.regMsg = '回复成功！';
          this.toast = true;
          if (this.toastTimer) clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
        }).catch(() =>{
          this.regMsg = '发布成功！';
          this.toast = true;
          if (this.toastTimer) clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000);})
      },
      handleClick (){

      },
      handleSelect (val) {
        this.value = val
      },
      handleDownload (val) {
        console.log(val);
        const fid = val.$attrs.fileId;
        if(sessionStorage.getItem('isLogin')){
          const uid = JSON.parse(sessionStorage.getItem('userInfo')).id;
          api.reqDownload(uid,fid);
          api.reqGetFileList().then(res=>{
            this.fileList = res.data;
            this.top_10_files = res.data.slice(0,9);
          })
        }
        else{
          this.regMsg = '登录后才能下载资料！';
          this.toast = true;
          if (this.toastTimer) clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
        }
      }
    }
  }
</script>

<style scoped>
  .mu-bottom-nav-shift-wrapper{
    width: 70%!important;
    justify-content: flex-start!important;
  }

  .content{
    width: 65%;
    margin: 80px auto;
  }

  .paper{
    padding: 5%;
  }

  .bm {
    margin-bottom: 16px;
  }

  .reply-header {
    padding: 16px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }

  .my-reply{
    padding: 16px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }

  .demo-divider-form {
    margin-bottom: 0;
    margin-left: 20px;
  }

</style>
