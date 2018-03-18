<template>
  <div class="wrapper">
    <div class="sub-header">
      <mu-sub-header>阳光</mu-sub-header>
      <mu-content-block>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-content-block>
    </div>
    <div class="gridlist-demo-containerr">
      <mu-grid-list class="gridlist-inline-demo">
        <mu-grid-tile v-for="tile, index in list" :key="index">
          <img :src="tile.image"/>
          <span slot="title">{{tile.title}}</span>
          <span slot="subTitle">by <b>{{tile.author}}</b></span>
          <mu-icon-button icon="star_border" slot="action"/>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
    <mu-pagination :total="total" :showSizeChanger="showSizeChanger" :pageSizeOption="pageSizeOption" @pageSizeChange="handleClick">
    </mu-pagination>
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
        list: [{
          image: '/images/breakfast.jpg',
          title: 'Breakfast',
          author: 'Myron',
          featured: true
        }, {
          image: '/images/burger.jpg',
          title: 'Burger',
          author: 'Linyu'
        }, {
          image: '/images/camera.jpg',
          title: 'Camera',
          author: 'ruolin'
        }, {
          image: '/images/hats.jpg',
          title: 'Hats',
          author: 'kakali'
        }, {
          image: '/images/honey.jpg',
          title: 'Honey',
          author: 'yuyang'
        }, {
          image: '/images/morning.jpg',
          title: 'Morning',
          author: 'mokayi',
          featured: true
        }, {
          image: '/images/vegetables.jpg',
          title: 'Vegetables',
          author: 'NUyyyyyyy'
        }, {
          image: '/images/water-plant.jpg',
          title: 'water',
          author: 'TDDyyyyyyy'
        }]
      }
    },
    methods: {
      handleClick (newIndex) {
        console.log('page size change event', newIndex)
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    padding: 0 17.5% ;
  }
  .sub-header{
    margin-top: 100px;
  }
  .mu-pagination{
    margin-top: 20px;
    justify-content: center!important;
  }
</style>
