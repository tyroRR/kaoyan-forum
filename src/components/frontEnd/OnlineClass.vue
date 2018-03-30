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
    <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageSizeChange="handleClick">
    </mu-pagination>
  </div>
</template>


<script>
  import api from '../../config/api-config'
  export default {
    data () {
      return {
        total: 130,
        current: 1,
        showSizeChanger: true,
        pageSizeOption: [10, 20, 30, 40],
        lessonList: []
      }
    },
    mounted: function () {
      api.reqGetLessonList().then(res=>{
        this.lessonList = res.data;
      })
    },
    methods: {
      handleClick (newIndex) {
        console.log('page size change event', newIndex)
      }
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
