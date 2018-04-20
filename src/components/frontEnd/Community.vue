<template>
    <div>
      <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
      <mu-row class="sub-nav">
        <mu-col width="100" tablet="100" desktop="100">
          <mu-paper>
            <mu-bottom-nav :value="nav" @change="handleChange">
              <mu-bottom-nav-item value="学习讨论区" title="学习讨论区" icon="assignment"/>
              <mu-bottom-nav-item value="经验互动区" title="经验互动区" icon="star_border"/>
              <mu-bottom-nav-item value="名校交流区" title="名校交流区" icon="autorenew"/>
            </mu-bottom-nav>
          </mu-paper>
        </mu-col>
      </mu-row>
      <mu-row gutter class="content">
        <mu-col width="100" tablet="75" desktop="75" class="topic-part">
          <mu-card style="margin-bottom: 80px">
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
              <el-pagination class="paging"
                             :current-page="filter.currentPage"
                             layout="total, prev, pager, next, jumper"
                             :total="totalRows"
                             @current-change="pageCurrentChange">
              </el-pagination>
            </mu-card-text>
          </mu-card>
        </mu-col>
        <mu-col width="0" tablet="25" desktop="25" class="sidebar">
          <div class="post-topic bm">
            <mu-card>
              <mu-card-actions>
                <mu-flat-button label="发布新话题" class="post-topic" color="#FFF" backgroundColor="#009688" @click="postTopic"/>
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
          <mu-select-field v-model="topic.type" label="选择分类">
            <mu-menu-item value="study" title="学习讨论区"/>
            <mu-menu-item value="experience" title="经验互动区"/>
            <mu-menu-item value="school" title="名校交流区"/>
          </mu-select-field><br>
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
          nav: '学习讨论区',
          toast: false,
          regMsg: '',
          filter: {
            currentPage: 1,
            beginIndex: 0,
          },
          totalRows: 0,
        }
      },
      mounted: function () {
        this.getTopic();
      },
      methods: {
        hideToast () {
          this.toast = false;
          if (this.toastTimer) clearTimeout(this.toastTimer)
        },
        getTopic() {
          let type;
          if(this.nav === '学习讨论区'){
            type = new RegExp('study')
          }
          if(this.nav === '经验互动区'){
            type = new RegExp('experience')
          }
          if(this.nav === '名校交流区'){
            type = new RegExp('school')
          }
          api.reqGetTopicList().then(res=>{
            let topicList = res.data.filter(v=>v.type.match(type)).reverse();
            this.totalRows = topicList.length;
            this.filter.beginIndex = (this.filter.currentPage-1)*10;
            this.topicList = topicList.splice(this.filter.beginIndex,10);
          })
        },
        handleChange (val) {
          this.nav = val;
          this.getTopic();
        },
        pageCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.filter.currentPage = val;
          this.getTopic();
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
              type: this.topic.type,
              sponsor: userInfo.username,
              avatar: userInfo.avatar
            };
            api.reqUserPostTopic(userInfo.id,params).then(() =>{
              this.postTopicDialog = false;
              this.regMsg = '发布成功！';
              this.topic = {};
              this.getTopic();
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
          console.log(JSON.parse(sessionStorage.getItem('content')));
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

.paging{
  min-height: 48px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px;
  color: rgba(0,0,0,.87);
  position: relative;
}

</style>
