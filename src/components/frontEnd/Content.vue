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
                <mu-list-item :title="item.username">
                  <mu-avatar src="/images/avatar3.jpg" slot="leftAvatar"/>
                    <span slot="describe">
                    <span style="color: rgba(0, 0, 0, .87)">{{item.username + ' -'}}</span>{{' '+item.content}}</span>
                </mu-list-item>
                <mu-divider/>
              </div>
            </mu-list>
          </div>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="25" desktop="25" class="sidebar">
        <div class="tips bm">
          <mu-paper>

            <mu-card-header title="点赞次数"/>
            <mu-divider />

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
        toast: false,
        regMsg: '',
        total: 130,
        current: 1,
        showSizeChanger: true,
        pageSizeOption: [10, 20, 30, 40]
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
    padding: 18px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
  }

  

</style>
