<template>
  <div class="">
    <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
    <mu-row class="sub-nav">
      <mu-col width="100" tablet="100" desktop="100">
        <mu-paper>
          <mu-bottom-nav :value="nav" @change="handleChange">
            <mu-bottom-nav-item value="全部" title="全部" icon="description"/>
            <mu-bottom-nav-item value="数学" title="数学" icon="description"/>
            <mu-bottom-nav-item value="英语" title="英语" icon="description"/>
            <mu-bottom-nav-item value="政治" title="政治" icon="description"/>
            <mu-bottom-nav-item value="专业课" title="专业课" icon="description"/>
          </mu-bottom-nav>
        </mu-paper>
      </mu-col>
    </mu-row>
    <mu-row gutter class="content">
      <mu-col width="100" tablet="75" desktop="75" class="topic-part">
        <mu-card>
          <mu-card-title :title="nav"/>
          <mu-card-text>
            <div class="file-list">
              <mu-list :value="value" @change="handleSelect" @itemClick="handleDownload">
                <mu-sub-header>资料下载</mu-sub-header>
                <mu-list-item v-for="(item,index) in fileList" :key="index" :title="item.fileName" :fileId="item._id" :value="index" >
                  <mu-avatar icon="assignment" backgroundColor="blue" slot="leftAvatar" />
                  <mu-icon value="file_download" slot="right"/>
                  <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.createTime + ' -'}}</span>下载次数{{' '+item.count}}</span>
                </mu-list-item>
              </mu-list>
            </div>
            <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageSizeChange="handleClick">
            </mu-pagination>
          </mu-card-text>
        </mu-card>
      </mu-col>
      <mu-col width="0" tablet="25" desktop="25" class="sidebar">
        <div class="tips bm">
          <mu-paper>
            <mu-card-header title="热门下载Top10"/>
            <mu-divider />
            <mu-list-item v-for="item in top_10_files" :key="index" :title="item.fileName">
              <mu-badge :content="item.count" circle secondary slot="after"/>
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
        fileList: [],
        top_10_files: [],
        fileId: '',
        value: null,
        errorText: {
          title: '',
          content: ''
        },
        nav: '全部',
        toast: false,
        regMsg: '',
        total: 130,
        current: 1,
        showSizeChanger: true,
        pageSizeOption: [10, 20, 30, 40]
      }
    },
    mounted: function () {
      api.reqGetFileList().then(res=>{
        this.fileList = res.data;
        this.top_10_files = res.data.slice(0,9);
      })
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
  .sub-nav{
    margin: 65px 0;
  }
  .mu-bottom-nav-shift-wrapper{
    width: 70%!important;
    justify-content: flex-start!important;
  }

  .content{
    width: 65%;
    margin: 20px auto;
  }

  .bm {
    margin-bottom: 16px;
  }

</style>
