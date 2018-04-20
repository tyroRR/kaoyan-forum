<template>
  <div class="wrapper">
    <div class="sub-header">
      <mu-sub-header>在线学习实景</mu-sub-header>
      <mu-content-block>
        网络课堂辅导，帮你把课堂搬进电脑
      </mu-content-block>
    </div>
    <div class="gridlist-demo-containerr">
      <mu-grid-list class="gridlist-inline-demo">
       <mu-grid-tile style="width:auto!important" v-for="(item,index) in lessonList" :key="index">
          <img :src="item.pic"/>
          <span slot="title"><a :href="item.url">{{item.title}}</a></span>
          <span slot="subTitle">from <b>{{item.type}}</b></span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
    <el-pagination class="paging"
                   :current-page="filter.currentPage"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="filter.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalRows"
                   @size-change="pageSizeChange"
                   @current-change="pageCurrentChange">
    </el-pagination>
  </div>
</template>


<script>
  import api from '../../config/api-config'
  export default {
    data () {
      return {
        filter: {
          pageSize: 10,
          currentPage: 1,
          beginIndex: 0,
        },
        totalRows: 0,
        lessonList: []
      }
    },
    mounted: function () {
      api.reqGetLessonList().then(res=>{
        this.lessonList = res.data;
      })
    },
    methods: {
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
    }
  }
</script>

<style scoped>
  .gridlist-demo-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .gridlist-demo{
    width: 500px;
    height: 450px;
    overflow-y: auto;
  }
  .wrapper{
    padding: 0 17.5% ;
  }
  .sub-header{
    margin-top: 100px;
  }
  .mu-pagination{
    margin-top: 20px;
    justify-content: center!important;
  }
</style>
