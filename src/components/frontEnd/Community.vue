<template>
    <div>
      <mu-card>
        <mu-card-title title="Content Title"/>
        <mu-card-text class="sub-nav">
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
        </mu-card-text>
      </mu-card>
      <mu-row gutter class="content">
        <mu-col width="100" tablet="75" desktop="75" class="topic-part">
          <mu-card>
            <mu-card-title title="Content Title"/>
            <mu-card-text>
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
              <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageSizeChange="handleClick">
              </mu-pagination>
            </mu-card-text>
          </mu-card>
        </mu-col>
        <mu-col width="0" tablet="25" desktop="25" class="sidebar">
          <div class="post-topic bm">
            <mu-card>
              <mu-card-actions>
                <mu-flat-button label="发布新话题" class="post-topic" color="#FFF" backgroundColor="#a4c639"/>
              </mu-card-actions>
            </mu-card>
          </div>
          <div class="tips bm">
            <mu-paper>
              <mu-card-header title="小帖士"/>
              <mu-divider />
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
            </mu-paper>
          </div>
          <div class="rules bm">
            <mu-card>
              <mu-card-header title="社区规则"/>
              <mu-divider />
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
            </mu-card>
          </div>
          <div class="statistics bm">
            <mu-card>
              <mu-card-header title="Myron Avatar" subTitle="sub title">
              </mu-card-header>
              <mu-divider />
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="Follow up">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
            </mu-card>
          </div>
        </mu-col>
      </mu-row>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          total: 130,
          current: 1,
          showSizeChanger: true,
          pageSizeOption: [10, 20, 30, 40],
        }
      },
      methods: {

      }
    }
</script>

<style>
.sub-nav{
  margin: 0 17.5% ;
}
.content{
  width: 65%;
  margin: 20px auto;
}
.post-topic{
  width:100%;
}

.bm{
  margin-bottom: 16px;
}
</style>
