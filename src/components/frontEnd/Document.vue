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
                      style="width: 100%"
                      @cell-click="downZT">
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
                          <el-button @cell-click="downZT(scope.row, scope.column, scope.cell, scope.event)" type="text" size="small">{{scope.row.y2018}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="y2017"
                        label="2017"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @cell-click="downZT(scope.row, scope.column, scope.cell, scope.event)" type="text" size="small">{{scope.row.y2017}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="y2016"
                        label="2016"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @cell-click="downZT(scope.row, scope.column, scope.cell, scope.event)" type="text" size="small">{{scope.row.y2016}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="y2015"
                        label="2015"
                        align="center">
                        <template slot-scope="scope">
                          <el-button @cell-click="downZT(scope.row, scope.column, scope.cell, scope.event)" type="text" size="small">{{scope.row.y2015}}</el-button>
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
                                 layout="total, prev, pager, next, jumper"
                                 :total="totalRows"
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
        let type;
        if(this.nav === '历史真题'){
          type = new RegExp('zt')
        }
        if(this.nav === '数学'){
          type = new RegExp('math')
        }
        if(this.nav === '英语'){
          type = new RegExp('english')
        }
        if(this.nav === '政治'){
          type = new RegExp('politics')
        }
        if(this.nav === '计算机'){
          type = new RegExp('computer')
        }
        api.reqGetDocList().then(res=>{
          let fileList = res.data.filter(v=>v.type.match(type)).reverse();
          this.totalRows = fileList.length;
          this.filter.beginIndex = (this.filter.currentPage-1)*10;
          this.fileList = fileList.splice(this.filter.beginIndex,10);
          this.top_10_files = res.data.slice(0,9);
        })
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      handleChange (val) {
        this.nav = val;
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
      downZT(row, column) {
        console.log(row, column);
        if(row.type === '政治'){
          if(column.label === '2015'){
            this.handleDownload("5ada25b4ae58b031d4f11c9c")
          }
          if(column.label === '2016'){
            this.handleDownload("5ada25b4ae58b031d4f11c9d")
          }
          if(column.label === '2017'){
            this.handleDownload("5ada25b4ae58b031d4f11c9e")
          }
          if(column.label === '2018'){
            this.handleDownload("5ada25b4ae58b031d4f11c9f")
          }
        }
        if(row.type === '英语一'){
          if(column.label === '2015'){
            this.handleDownload("5ada24d7ae58b031d4f11c82")
          }
          if(column.label === '2016'){
            this.handleDownload("5ada24d7ae58b031d4f11c85")
          }
          if(column.label === '2017'){
            this.handleDownload("5ada24d7ae58b031d4f11c8a")
          }
          if(column.label === '2018'){
            this.handleDownload("5ada24f9ae58b031d4f11c8c")
          }
        }
        if(row.type === '英语二'){
          if(column.label === '2015'){
            this.handleDownload("5ada24d7ae58b031d4f11c81")
          }
          if(column.label === '2016'){
            this.handleDownload("5ada24d7ae58b031d4f11c83")
          }
          if(column.label === '2017'){
            this.handleDownload("5ada24d7ae58b031d4f11c89")
          }
          if(column.label === '2018'){
            this.handleDownload("5ada24f9ae58b031d4f11c8b")
          }
        }
        if(row.type === '数学一'){
          if(column.label === '2015'){
            this.handleDownload("5ada2580ae58b031d4f11c90")
          }
          if(column.label === '2016'){
            this.handleDownload("5ada2580ae58b031d4f11c93")
          }
          if(column.label === '2017'){
            this.handleDownload("5ada259aae58b031d4f11c97")
          }
          if(column.label === '2018'){
            this.handleDownload("5ada259aae58b031d4f11c9b")
          }
        }
        if(row.type === '数学二'){
          if(column.label === '2015'){
            this.handleDownload("5ada257fae58b031d4f11c8d")
          }
          if(column.label === '2016'){
            this.handleDownload("5ada2580ae58b031d4f11c91")
          }
          if(column.label === '2017'){
            this.handleDownload("5ada2580ae58b031d4f11c96")
          }
          if(column.label === '2018'){
            this.handleDownload("5ada259aae58b031d4f11c99")
          }
        }
        if(row.type === '数学三'){
          if(column.label === '2015'){
            this.handleDownload("5ada2580ae58b031d4f11c8f")
          }
          if(column.label === '2016'){
            this.handleDownload("5ada2580ae58b031d4f11c95")
          }
          if(column.label === '2017'){
            this.handleDownload("5ada259aae58b031d4f11c98")
          }
          if(column.label === '2018'){
            this.handleDownload("5ada259aae58b031d4f11c9a")
          }
        }
        if(row.type === '计算机'){
          if(column.label === '2015'){
            this.handleDownload('5ada2446ae58b031d4f11c7f')
          }
          if(column.label === '2016'){
            this.handleDownload('5ada2446ae58b031d4f11c80')
          }
          if(column.label === '2017'){
            this.handleDownload('5ada2446ae58b031d4f11c7e')
          }
          if(column.label === '2018'){
            this.handleDownload('5ada2446ae58b031d4f11c7d')
          }
        }
      },
      handleDownload (val) {
        console.log(val);
        console.log(typeof val);
        let fid;
        if(typeof val === 'string'){
          fid = val
        }
        else{
          fid = val.$attrs.fileId;
        }
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
