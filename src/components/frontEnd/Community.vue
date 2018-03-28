<template>
    <div>
      <mu-row class="sub-nav">
        <mu-col width="100" tablet="100" desktop="100">
          <mu-paper>
            <mu-bottom-nav :value="nav" @change="handleChange">
              <mu-bottom-nav-item value="默认" title="默认" icon="assignment"/>
              <mu-bottom-nav-item value="优质帖子" title="优质帖子" icon="star_border"/>
              <mu-bottom-nav-item value="最近发布" title="最近发布" icon="restore"/>
              <mu-bottom-nav-item value="最新回复" title="最新回复" icon="autorenew"/>
              <mu-bottom-nav-item value="无人问津" title="无人问津" icon="location_off"/>
            </mu-bottom-nav>
          </mu-paper>
        </mu-col>
      </mu-row>
      <mu-row gutter class="content">
        <mu-col width="100" tablet="75" desktop="75" class="topic-part">
          <mu-card>
            <mu-card-title :title="nav"/>
            <mu-card-text>
              <div class="info-list">
                <mu-list>
                  <mu-sub-header>考研信息 {{new Date().toLocaleDateString()}}</mu-sub-header>
                  <div class="item-wrapper" v-for="item in topicList" >
                    <mu-list-item :title="item.title">
                      <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
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
              <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageSizeChange="handleClick">
              </mu-pagination>
            </mu-card-text>
          </mu-card>
        </mu-col>
        <mu-col width="0" tablet="25" desktop="25" class="sidebar">
          <div class="post-topic bm">
            <mu-card>
              <mu-card-actions>
                <mu-flat-button label="发布新话题" class="post-topic" color="#FFF" backgroundColor="#a4c639" @click="postTopic"/>
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
    import api from '../../config/api-config'
    export default {
      data () {
        return {
          total: 130,
          current: 1,
          showSizeChanger: true,
          pageSizeOption: [10, 20, 30, 40],
          topicList: [],
          nav: '默认'
        }
      },
      mounted: function () {
        api.reqGetTopicList().then(res=>{
          this.topicList = res.data;
        })
      },
      methods: {
        handleChange (val) {
          this.nav = val
        },
        postTopic () {
          api.reqPostTopic().then()
        }
      }
    }
</script>

<style>
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
.post-topic{
  width:100%;
}

.bm{
  margin-bottom: 16px;
}
</style>
