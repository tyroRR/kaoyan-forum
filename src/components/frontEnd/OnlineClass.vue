<template>
  <div class="wrapper">
    <div class="sub-header">
      <mu-sub-header>在线学习实景</mu-sub-header>
      <mu-content-block>
        网络课堂辅导，帮你把课堂搬进电脑
      </mu-content-block>
    </div>
    <div class="gridlist-demo-container">
      <mu-grid-list class="gridlist-inline-demo">
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/四六级与考研的区别.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/考研英语长难句导学课.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/考试大纲分析总结.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
      </mu-grid-list>
      <mu-grid-list class="gridlist-inline-demo">
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/考研目标确定的重要性与规则.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/2019考研数学高分指导.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/考研计算机复习总结.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
      </mu-grid-list>
      <mu-grid-list class="gridlist-inline-demo">
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/2019考研政治高分攻略及报考指导.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/复习规划课.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
        <video width="320" height="240" controls class="mg">
          <source src="../../assets/复习教材介绍与指导.mp4" type="video/mp4">
          您的浏览器不支持Video标签。
        </video>
      </mu-grid-list>
    </div>
  </div>
</template>


<script>
  import api from '../../config/api-config'
  export default {
    data () {
      return {
        filter: {
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
    margin-bottom: 130px;
  }
  .gridlist-inline-demo{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  .mg{
    margin:0 2px;
  }
  .wrapper{
    padding: 0 17.5% ;
  }
  .sub-header{
    margin-top: 100px;
  }
</style>
