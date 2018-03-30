<template>
  <div class="">
    <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
    <mu-row gutter class="content">
      <mu-col width="100" tablet="75" desktop="75" class="topic-part">
        <mu-paper>
          <div class="file-list">
            <mu-list :value="value" @change="handleSelect" @itemClick="handleDownload">
              <mu-sub-header>话题详情</mu-sub-header>

            </mu-list>
          </div>
          <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageSizeChange="handleClick">
          </mu-pagination>
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
  .mu-bottom-nav-shift-wrapper{
    width: 70%!important;
    justify-content: flex-start!important;
  }

  .content{
    width: 65%;
    margin: 80px auto;
  }

  .bm {
    margin-bottom: 16px;
  }

</style>
