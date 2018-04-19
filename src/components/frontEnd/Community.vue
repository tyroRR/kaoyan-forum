<template>
    <div>
      <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
      <mu-row class="sub-nav">
        <mu-col width="100" tablet="100" desktop="100">
          <mu-paper>
            <mu-bottom-nav :value="nav" @change="handleChange">
              <mu-bottom-nav-item value="考研资讯区" title="考研资讯区" icon="assignment"/>
              <mu-bottom-nav-item value="学习讨论区" title="学习讨论区" icon="star_border"/>
              <mu-bottom-nav-item value="经验互动区" title="经验互动区" icon="restore"/>
              <mu-bottom-nav-item value="名校交流区" title="名校交流区" icon="autorenew"/>
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
                  <div class="item-wrapper" v-for="item in topicList">
                    <mu-list-item :title="item.title">
                      <mu-avatar src="" slot="leftAvatar"/>
                      <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.sponsor + ' -'}}</span>{{' '+item.content}}</span>
                      <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                        <mu-menu-item title="查看详情" @click="showDetail(item)"/>
                        <mu-menu-item title="点赞"/>
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
              <mu-card-header title="励志语录"/>
              <mu-divider />
              <mu-list-item title="不忘初心，矢志前行">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="既然选择了远方，便只顾风雨兼程">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="你的孤独，虽败犹荣">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="路漫漫其修远兮，吾将上下而求索">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="想过成功，想过失败，但从没想过放弃">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="真正无愧自己的努力才是真的见证">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="临渊羡鱼，不如退而结网">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
            </mu-paper>
          </div>
          <div class="rules bm">
            <mu-card>
              <mu-card-header title="社区规则"/>
              <mu-divider />
              <mu-list-item title="文明交流，分享经验">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="积极向上，奋发图强">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
            </mu-card>
          </div>
          <div class="statistics bm">
            <mu-card>
              <mu-card-header title="Statistics" subTitle="sub title">
              </mu-card-header>
              <mu-divider />
              <mu-list-item title="Statistics 1">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
              <mu-list-item title="Statistics 2">
                <mu-icon slot="right" value="info"/>
              </mu-list-item>
            </mu-card>
          </div>
        </mu-col>
      </mu-row>
      <div class="post-topic">
        <mu-dialog :open="postTopicDialog" title="发布新话题" @close="closePostTopic">
          <mu-text-field label="标题" v-model="topic.title" :errorText="errorText.title" labelFloat/><br/>
          <mu-text-field hintText="请输入..." v-model="topic.content" multiLine :errorText="errorText.content" :rows="10" :rowsMax="30" fullWidth/><br/>
          <mu-flat-button slot="actions" @click="closePostTopic" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="handlePostTopic" label="确定"/>
        </mu-dialog>
      </div>
    </div>
</template>

<script>
    import api from '../../config/api-config'
    export default {
      data () {
        return {
          topicList: [],
          topic: {},
          errorText: {
            title: '',
            content: ''
          },
          postTopicDialog: false,
          nav: '考研资讯区',
          toast: false,
          regMsg: '',
          total: 130,
          current: 1,
          showSizeChanger: true,
          pageSizeOption: [10, 20, 30, 40]
        }
      },
      mounted: function () {
        api.reqGetTopicList().then(res=>{
          let type = this.topicType();
          this.topicList = res.data.filter(v=>v.type === type);
        })
      },
      methods: {
        topicType () {
          let topicType = '';
          if(this.nav === '考研资讯区'){
            topicType = 'info'
          }
          if(this.nav === '学习讨论区'){
            topicType = 'dis'
          }
          if(this.nav === '经验互动区'){
            topicType = 'exp'
          }
          if(this.nav === '名校交流区'){
            topicType = 'elite'
          }
          return topicType;
        },
        hideToast () {
          this.toast = false;
          if (this.toastTimer) clearTimeout(this.toastTimer)
        },
        handleChange (val) {
          this.nav = val
        },
        handleClick (){

        },
        postTopic () {
          if(sessionStorage.getItem('isLogin')){
            this.postTopicDialog = true
          }
          else{
            this.regMsg = '登录后才能发布消息！';
            this.toast = true;
            if (this.toastTimer) clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
          }
        },
        handlePostTopic () {
          const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          if(userInfo){
            let params = {
              title: this.topic.title,
              content: this.topic.content,
              sponsor: userInfo.username,
              avatar: userInfo.avatar
            };
            api.reqUserPostTopic(userInfo.id,params).then(() =>{
              this.postTopicDialog = false;
              this.regMsg = '发布成功！';
              this.topic = {};
              api.reqGetTopicList().then(res=>{
                let type = this.topicType;
                this.topicList = res.data.filter(v=>v.role === type);
              });
              this.toast = true;
              if (this.toastTimer) clearTimeout(this.toastTimer);
              this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
            })
          }
        },
        closePostTopic(){
          this.topic = {};
          this.errorText = {};
          this.postTopicDialog = false
        },
        showDetail(item){
          sessionStorage.setItem('content',JSON.stringify(item));
          this.$router.push({ path: `Content/${item._id}` });
        }
      }
    }
</script>

<style scoped>
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
