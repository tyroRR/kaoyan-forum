<template lang="html">
  <div class="article-detail">

    <div v-show="!isLoading" class="body">

      <div class="article-title">
        <h1><span class="flag" v-show="infos.top || infos.good">{{infos.top ? '置顶' : '精华'}}</span>{{infos.title}}</h1>
        <div class="desc">
           <p> 发布于 {{changeTime(infos.create_at)}}  作者 <router-link :to="{name: 'user', params: {name: infos.author && infos.author.loginname}}">{{infos.author && infos.author.loginname}}</router-link>  {{infos.visit_count}} 次浏览  来自 {{types[infos.tab]}}</p>
        </div>
      </div>

      <div v-html="infos.content" class="md"></div>

      <div class="reply">

        <div class="other">
          <div @click="collect" class="collect"><i :class="[isCollected ? 'collected' : 'collected-no']"></i>收藏文章</div>
          <div class="total-reply">{{infos.reply_count}} 回复</div>
        </div>

        <div class="reply-input">
          <input v-model.trim="replyContent" type="text" placeholder="请输入回复内容">
          <button @click="reply('')" type="button">回复</button>
        </div>

        <div v-for="(item, index) of replies" class="reply-item">

          <div class="reply-author">
            <div class="reply-avatar">
              <img :src="item.author.avatar_url" alt="">
              <div class="reply-desc">
                <router-link :to="{name: 'user', params: {name: item.author && item.author.loginname}}">{{item.author.loginname}}</router-link>
                  {{replies.length - index}}楼 • {{changeTime(item.create_at)}}
                  <span @click="currentIndex=index" class="reply-at">回复</span>
                  <i @click="ups(index, item.id, item)" :class="[item.ups.indexOf(userInfo.id) !== -1 ? 'ups-yes' : 'ups-no']" class="icon-reply-at"></i>
                  <span class="ups-count">{{ item.ups.length }}</span>
              </div>
            </div>
          </div>

          <div v-html="item.content" class="reply-content"></div>

          <transition name="slide-top">
            <div v-show="currentIndex===index" class="reply-one">
              <input type="text" name="" v-model.trim="replyOneContent" :placeholder="'@' + item.author.loginname">
              <button @click="reply(item.id, item.author.loginname)">回复</button>
              <button @click="currentIndex=null;replyOneContent=''">取消</button>
            </div>
          </transition>


        </div>

      </div>

    </div>

    <div class="back">
      <i @click.stop.prevent="$router.go(-1)" class="icon-back"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'articleDetail',
  data() {
    return {
      id: this.$route.params.id,
      infos: {},
      types: { share: '分享', ask: '问答', job: '招聘'},
      oImgs: [],
      isCollected: false,
      replyContent: '',
      replyOneContent: '',
      isReplyOne: false,
      isUps: false,
      flag: true,
      up: 0,
      currentIndex: null, // 回复某个人的 index
      currentUps: null,
      replies: []
      // oArticleDetail: {}
    }
  },
  created() {
    this.$store.commit('viewArcticle', true);
    this.$store.commit('showInfo', false);
    this.$store.commit('showAsideMenu', false);
    this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
      .then(result => result.data.data)
      .then(data => this.infos = data)
      .then(infos => this.replies = infos.replies.reverse())
      .then(() => this.$store.commit('viewArcticle', false))
      .then(() => {
        this.oImgs = document.querySelector('.md').querySelectorAll('img');
        for (let img of this.oImgs) {
          img.onclick = () => location.href = img.src;
        }
      })
  },
  // mounted() {
  //   this.oArticleDetail = document.getElementById('article-detail');
  // },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    ak() {
      return this.$store.state.ak;
    },
    collectTopics() {
      return this.$store.state.collectTopics;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    if (!this.ak) {
      return;
    }
    this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
      .then(result => result.data.data)
      .then(collectTopics => {
        this.$store.commit('updateCollect', collectTopics);
        collectTopics.forEach(item => {
          item.id === this.id ? this.isCollected = true : '';
        })
      })

  },
  methods: {
    // toScroll(event) {
    //   this.oArticleDetail = event.target;
    // },
    collect() {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (!this.isCollected) {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`, {
          accesstoken: this.ak,
          topic_id: this.id
        }).then(result => {
          console.log('result', result);
          if (result.data.success) {
            this.isCollected = !this.isCollected;
          }
        })
      }
    },

    reply(id, name) {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      else if (!id) {
        this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: this.replyContent
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.replyContent ='';
          })
        })
      } else {
        this.axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
          accesstoken: this.ak,
          content: '@' + name + ' ' + this.replyOneContent,
          reply_id: id
        }).then(() => {
          this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
            .then(result => result.data.data)
            .then(data => this.infos = data)
            .then(infos => this.replies = infos.replies.reverse())
            .then(() => {
              // this.oArticleDetail.scrollTop = this.oArticleDetail.scrollHeight;
              this.currentIndex = null;
              this.replyOneContent = ''
            })
        })
      }
    },

    //点赞
    ups(index, upsId, item) {
      if (!this.ak) {
        this.$store.commit('showLogin', true);
        return;
      }
      if (item.author.loginname === this.userInfo.loginname) {
        alert('不能自己为自己点赞哦😯');
        return;
      }
      this.axios.post(`https://cnodejs.org/api/v1/reply/${upsId}/ups`, {accesstoken: this.ak})
        .then(result => {
          if (result.data.success) {
            this.axios.get('https://cnodejs.org/api/v1/topic/' + this.id)
              .then(result => result.data.data)
              .then(data => this.infos = data)
              .then(infos => this.replies = infos.replies.reverse())
          }
        })

    }
  }
}
</script>


