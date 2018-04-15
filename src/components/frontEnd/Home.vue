<template>
    <div class="content">
      <div class="carousel">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="nav-card-group">
        <div class="nav-card">
          <mu-card>
            <mu-card-media>
              <img src="../../assets/nav1.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="资料下载" labelPosition="before" icon="folder" @click="$router.push({ path: '/Document' })"/>
            </mu-card-actions>
          </mu-card>
        </div>
        <div class="nav-card">
          <mu-card>
            <mu-card-media>
              <img src="../../assets/nav2.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="网络课堂" labelPosition="before" icon=" movie" @click="$router.push({ path: '/OnlineClass' })"/>
            </mu-card-actions>
          </mu-card>
        </div>
        <div class="nav-card">
          <mu-card>
            <mu-card-media>
              <img src="../../assets/nav3.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="社区交流" labelPosition="before" icon="people" @click="$router.push({ path: '/Community' })"/>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
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

  .nav-card-group{
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
  }

  .nav-card{
    width: 30%;
  }

  .info-pub{
    margin: 0 auto;
    background-color: #fff
  }
</style>
