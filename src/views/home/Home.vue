<template>
    <div class="home-wrap">
      <header>
        <ul>
          <li></li>
          <li>
            <div class="title">猫眼电影</div>
          </li>
          <li>
            <div class="iconfont icon-caidan menu"></div>
          </li>
        </ul>
      </header>
      <Movies></Movies>
      <nav class="tabbar">
        <ul>
          <li class="active">
            <b class="iconfont icon-dianying "></b>
            <span>电影/影院</span>
          </li>
          <li>
            <b class="iconfont icon-shipin"></b>
            <span>视频</span>
          </li>
          <li>
            <b class="iconfont icon-dianshiji"></b>
            <span>小视频</span>
          </li>
          <li>
            <b class="iconfont icon-dianyingpiao"></b>
            <span>演出</span>
          </li>
          <li>
            <b class="iconfont icon-wode"></b>
            <span>我的</span>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  import Movies from '@/views/home/movies/Movies.vue'
  export default {
    name: '',
    data() {
      return {

      }
    },
    components: {
      Movies,
    }
  }
  
  </script>
  <style lang="stylus" scoped>
  @import '@/assets/iconfont/iconfont.css';
  @import '@/assets/stylus/border.styl';
  .home-wrap
    display: flex
    flex-direction: column
    height: 100%
    header
      background rgb(229,72,71)
      color #FFF
      height .5rem
      font-size .18rem
      font-weight normal
      text-align center
      line-height .44rem
      ul
        display flex
        li
          flex: 1
          .menu
            float  right 
            font-size .3rem
            margin-right .1rem
    .tabbar
      height .5rem
      border1px() 
      ul
        display flex
        li 
          flex 1
          display flex
          flex-direction column
          justify-content center
          align-items center
          padding-top .04rem
          color rgb(161,161,161)
          b
            font-size .26rem
            font-weight normal
            // text-align center
            line-height .2rem
          span
            font-size .16rem
            transform scale(0.9)
          &.active
            color #cd4c42
  </style>