<template>
    <div class="content">
      <el-main>
        <template>
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item>
              <img src="../../assets/img/y12.jpg">
            </el-carousel-item>
            <el-carousel-item>
            <img src="../../assets/img/y13.png">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../assets/img/y14.jpg">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../assets/img/y15.jpg">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../assets/img/y16.png">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../assets/img/y17.jpg">
            </el-carousel-item>
          </el-carousel>
        </template>
        <el-row class="text-group" :gutter="30">
          <el-col :span="8">
            <mu-card>
              <mu-card-text>
                <h3>考研资料</h3>
                <p>考研资料哪里找？历年真题，考研笔记，专业课讲义......海量资料，免费下载</p>
                <a class="link" style="cursor:pointer" @click="$router.push({ path: '/Document' })" >Read More</a>
              </mu-card-text>
            </mu-card>
          </el-col>
          <el-col :span="8">
            <mu-card>
              <mu-card-text>
                <h3>网络课堂</h3>
                <p>here！名师主题讲解，公共课专业课详细辅导，考研课堂轻松搬回家</p>
                <a class="link" style="cursor:pointer" @click="$router.push({ path: '/OnlineClass' })">Read More</a>
              </mu-card-text>
            </mu-card>
          </el-col>
          <el-col :span="8">
            <mu-card>
              <mu-card-text>
                <h3>社区交流</h3>
                <p>和研友们轻松抱团，一起分享考研信息，让考研简单不孤单</p>
                <a class="link" style="cursor:pointer" @click="$router.push({ path: '/Community' })">Read More</a>
              </mu-card-text>
            </mu-card>
          </el-col>
        </el-row>
        <div class="row pic-wall">
          <el-col :span="12" class="pic-wrapper">
            <img src="" alt="">
            <p>pic1</p>
          </el-col>
          <el-col :span="12" class="pic-wrapper">
            <div class="wrap-inner">
              <img src="" alt="">
              <p>pic2</p>
            </div>
            <div class="wrap-inner">
              <img src="" alt="">
              <p>pic3</p>
            </div>
          </el-col>
        </div>
        <el-col :span="24">
          <div class="info-pub">
            <div class="info-list">
              <mu-list>
                <mu-sub-header>考研信息 {{new Date().toLocaleDateString()}}</mu-sub-header>
                <div class="item-wrapper" v-for="item in infoList"  >
                  <mu-list-item :title="item.title" @click="showDetail(item)">
                <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.sponsor + ' -'}}</span>{{' '+item.content}}</span>
                  </mu-list-item>
                  <mu-divider inset/>
                </div>
              </mu-list>
            </div>
          </div>
        </el-col>


      </el-main>
    </div>
</template>
<script>
  import api from '../../config/api-config'
  export default {

    data () {
      return {
        infoList:[],
      }
    },
    mounted: function () {
      api.reqGetInfoList().then(res=>{
        this.infoList = res.data;
      })
    },
    methods: {
      showDetail(item){
        sessionStorage.setItem('content',JSON.stringify(item));
        this.$router.push({ path: `Content/${item._id}` });
      }
    }
  }
</script>
<style scoped>
  .content{
    width: 65%;
    margin: 90px auto;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .text-group,.pic-wall{
    padding: 50px 0;
  }

  .pic-wall{
    background-color: #EDF2FC;
    margin: 20px auto;
  }

  .info-pub{
    margin: 0 auto;
    background-color: #fff
  }
</style>
