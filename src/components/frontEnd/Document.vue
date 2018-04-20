<template>
  <div class="">
    <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
    <mu-row class="sub-nav">
      <mu-col width="100" tablet="100" desktop="100">
        <mu-paper>
          <mu-bottom-nav :value="nav" @change="handleChange">
            <mu-bottom-nav-item value="历史真题" title="历史真题" icon="description"/>
            <mu-bottom-nav-item value="数学" title="数学" icon="description"/>
            <mu-bottom-nav-item value="英语" title="英语" icon="description"/>
            <mu-bottom-nav-item value="政治" title="政治" icon="description"/>
            <mu-bottom-nav-item value="计算机" title="计算机" icon="description"/>
          </mu-bottom-nav>
        </mu-paper>
      </mu-col>
    </mu-row>
    <mu-row gutter class="content">
      <mu-col width="100" tablet="75" desktop="75" class="topic-part">
        <mu-card style="margin-bottom: 80px">
          <mu-card-title :title="nav"/>
          <mu-card-text>
            <div class="file-list">
              <mu-list :value="value" @change="handleSelect" @itemClick="handleDownload">
                <mu-sub-header>资料下载</mu-sub-header>
                  <template v-if="this.nav === '历史真题'">
                    <el-table
                      :data="files"
                      border
                      style="width: 100%">
                      <el-table-column
                        fixed
                        prop="type"
                        label="分类/日期"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="y2018"
                        label="2018"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @click="downZT(scope.index,scope.row)" type="text" size="small">{{scope.row.y2018}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="y2017"
                        label="2017"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @click="downZT(scope.index,scope.row)" type="text" size="small">{{scope.row.y2017}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="y2016"
                        label="2016"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @click="downZT(scope.$index,scope.row)" type="text" size="small">{{scope.row.y2016}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="y2015"
                        label="2015"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @click="downZT(scope.$index,scope.row)" type="text" size="small">{{scope.row.y2015}}</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                <template v-else>
                  <mu-list-item v-for="(item,index) in fileList" :key="index" :title="item.fileName" :fileId="item._id" :value="index" >
                    <mu-avatar icon="folder" slot="leftAvatar" />
                    <mu-icon value="file_download" slot="right"/>
                    <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.createTime + ' -'}}</span>下载次数{{' '+item.count}}</span>
                  </mu-list-item>

                    <el-pagination class="paging"
                                   :current-page="filter.currentPage"
                                   :page-sizes="[10, 20, 50, 100]"
                                   :page-size="filter.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalRows"
                                   @size-change="pageSizeChange"
                                   @current-change="pageCurrentChange">
                    </el-pagination>


                </template>
              </mu-list>
            </div>
          </mu-card-text>
        </mu-card>
      </mu-col>
      <mu-col width="0" tablet="25" desktop="25" class="sidebar">
        <div class="tips bm">
          <mu-paper>
            <mu-card-header title="热门下载Top10"/>
            <mu-divider />
            <mu-list-item v-for="(item,index) in top_10_files" :key="index" :title="item.fileName">
              <mu-badge :content="item.count.toString()" circle secondary slot="after"/>
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
        files:[{
          type: '政治',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        },{
          type: '英语一',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        },{
          type: '英语二',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        },{
          type: '数学一',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        },{
          type: '数学二',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        },{
          type: '数学三',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        },{
          type: '计算机',
          y2018: '2018',
          y2017: '2017',
          y2016: '2016',
          y2015: '2015'
        }],
        fileList: [],
        top_10_files: [],
        fileId: '',
        value: null,
        errorText: {
          title: '',
          content: ''
        },
        nav: '历史真题',
        toast: false,
        regMsg: '',
        filter: {
          pageSize: 10,
          currentPage: 1,
          beginIndex: 0,
        },
        totalRows: 0,
      }
    },
    mounted: function () {
      this.getFile();
    },
    methods: {
      getFile(){
        api.reqGetDocList().then(res=>{
          let fileList = res.data;
          this.totalRows = res.data.length;
          fileList.beginIndex = (this.filter.currentPage-1)*this.filter.pageSize;
          this.fileList = fileList.splice(this.filter.beginIndex,this.filter.pageSize);
          this.top_10_files = res.data.slice(0,9);
        })
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      handleChange (val) {
        this.nav = val
      },
      pageSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.filter.pageSize = val;
        this.getFile();
      },
      pageCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filter.currentPage = val;
        this.getFile();
      },
      handleSelect (val) {
        this.value = val
      },
      downZT(index,row) {
        console.log(index);

      },
      handleDownload (val) {
        console.log(val);
        const fid = val.$attrs.fileId;
        if(sessionStorage.getItem('isLogin')){
          const uid = JSON.parse(sessionStorage.getItem('userInfo')).id;
          api.reqDownload(uid,fid);
          api.reqGetDocList().then(res=>{
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

  .paging{
    min-height: 48px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 16px;
    color: rgba(0,0,0,.87);
    position: relative;
  }

</style>
