<template>
    <div class="content">
      <el-main>
        <template>
          <el-carousel :interval="4000" type="card" height="350px" >
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
        <div class="row text-group">
          <el-col :span="8">
            <div class="text">
              <h3>Text1</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tempor incididunt ut laboret dolore magna ut consequat siad esqudiat dolor</p>
              <a class="link" href="#">Read More</a>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="text">
              <h3>Text2</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tempor incididunt ut laboret dolore magna ut consequat siad esqudiat dolor</p>
              <a class="link" href="#">Read More</a>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="text">
              <h3>Text3</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tempor incididunt ut laboret dolore magna ut consequat siad esqudiat dolor</p>
              <a class="link" href="#">Read More</a>
            </div>
          </el-col>
        </div>
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

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .text-group,.pic-wall{
    padding: 50px 0;
    border-bottom:solid thin #EDF2FC;
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
