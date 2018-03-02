<template>
    <div class="content">
      <div class="sub-header">
        <mu-card>
          <mu-card-title title="Content Title"/>
          <mu-card-text>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
            调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          </mu-card-text>
        </mu-card>
      </div>
      <div class="nav-card-group">
        <div class="nav-card">
          <mu-card>
            <mu-card-media title="Image Title" subTitle="Image Sub Title">
              <img src="/images/sun.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="考研信息" labelPosition="before" icon="folder"/>
            </mu-card-actions>
          </mu-card>
        </div>
        <div class="nav-card">
          <mu-card>
            <mu-card-media title="Image Title" subTitle="Image Sub Title">
              <img src="/images/sun.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="网络课堂" labelPosition="before" icon="folder"/>
            </mu-card-actions>
          </mu-card>
        </div>
        <div class="nav-card">
          <mu-card>
            <mu-card-media title="Image Title" subTitle="Image Sub Title">
              <img src="/images/sun.jpg" />
            </mu-card-media>
            <mu-card-actions>
              <mu-flat-button label="社区交流" labelPosition="before" icon="folder"/>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
      <div class="info-pub">
        <div class="info-list">
          <mobile-tear-sheet>
            <mu-list>
              <mu-sub-header>今天</mu-sub-header>
              <mu-list-item title="这个周末一起吃饭么?">
                <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
                <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
      </span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                  <mu-menu-item title="回复" />
                  <mu-menu-item title="标记" />
                  <mu-menu-item title="删除" />
                </mu-icon-menu>
              </mu-list-item>
              <mu-divider inset/>
              <mu-list-item title="Alex Qin">
                <mu-avatar src="/images/avatar2.jpg" slot="leftAvatar"/>
                <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">看电影啊</span> <br/>
        我们去看电影，最近有部烂片上映，又有吐槽的了
      </span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                  <mu-menu-item title="回复" />
                  <mu-menu-item title="标记" />
                  <mu-menu-item title="删除" />
                </mu-icon-menu>
              </mu-list-item>
              <mu-divider inset/>
              <mu-list-item title="LOL">
                <mu-avatar src="/images/avatar3.jpg" slot="leftAvatar"/>
                <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
        周末一起 LOL
      </span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                  <mu-menu-item title="回复" />
                  <mu-menu-item title="标记" />
                  <mu-menu-item title="删除" />
                </mu-icon-menu>
              </mu-list-item>
              <mu-divider inset/>
              <mu-list-item title="Myron Liu">
                <mu-avatar src="/images/uicon.jpg" slot="leftAvatar"/>
                <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/> 实在编不下去，这就是个demo
      </span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                  <mu-menu-item title="回复" />
                  <mu-menu-item title="标记" />
                  <mu-menu-item title="删除" />
                </mu-icon-menu>
              </mu-list-item>
            </mu-list>
          </mobile-tear-sheet>
        </div>
      </div>
    </div>
</template>
<script>


  export default {

    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  .content{
    width: 65%;
    margin: 30px auto;
  }

  .sub-header{
    text-align: center;
  }

  .nav-card-group{
    display: flex;
    justify-content: space-between;
    margin: 120px auto 0 auto;
  }

  .nav-card{
    width: 30%;
  }

  .info-pub{
    margin: 35px auto;
    background-color: #fff
  }
</style>
