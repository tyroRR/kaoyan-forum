<template>
    <div class="content">
      <div class="sub-header">
        <mu-card>
          <mu-card-title title="KY-forum"/>
          <mu-card-text>
            在一个人奋斗的道路上，你也许会孤单寂寞，可是别忘了，朋友的祝福还在，父母的叮咛还在，对希望的追求还在，至少你的信仰还在。
            那么再苦再累算什么，你将永远不会孤独，你将永远的走下去。
          </mu-card-text>
        </mu-card>
      </div>
      <div class="nav-card-group">
        <div class="nav-card">
          <mu-card>
            <mu-card-media>
              <img src="../../assets/nav1.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="资料下载" labelPosition="before" icon="folder"/>
            </mu-card-actions>
          </mu-card>
        </div>
        <div class="nav-card">
          <mu-card>
            <mu-card-media>
              <img src="../../assets/nav2.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="网络课堂" labelPosition="before" icon=" movie"/>
            </mu-card-actions>
          </mu-card>
        </div>
        <div class="nav-card">
          <mu-card>
            <mu-card-media>
              <img src="../../assets/nav3.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="社区交流" labelPosition="before" icon="people"/>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
      <div class="info-pub">
        <div class="info-list">
          <mu-list>
            <mu-sub-header>考研信息 {{new Date().toLocaleDateString()}}</mu-sub-header>
            <div class="item-wrapper" v-for="item in infoList"  >
              <mu-list-item :title="item.title">
                <mu-avatar src="" slot="leftAvatar"/>
                <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.sponsor + ' -'}}</span>{{' '+item.content}}</span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                  <mu-menu-item title="回复" />
                  <mu-menu-item title="标记" />
                  <mu-menu-item title="删除" />
                </mu-icon-menu>
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

    }
  }
</script>
<style scoped>
  .content{
    width: 65%;
    margin: 90px auto;
  }

  .sub-header{
    text-align: center;
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
