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
      <router-view></router-view>
      <nav class="tabbar">
        <van-tabbar  v-model="active" active-color="#cd4c42" inactive-color="#666" route >
        <van-tabbar-item >
          <span>电影/影院</span>
          <template #icon="props">
            <van-icon class-prefix="iconfont icon-dianying" size=".26rem" />
            <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          </template>
        </van-tabbar-item>
        <van-tabbar-item >
          <span>视频</span>
          <template #icon="props">
            <van-icon class-prefix="iconfont icon-dianshiji" size=".26rem"/>
            <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          </template>
        </van-tabbar-item>
        <van-tabbar-item >
          <span>小视频</span>
          <template #icon="props">
            <van-icon class-prefix="iconfont icon-shipin" size=".26rem"/>
            <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          </template>
        </van-tabbar-item>
        <van-tabbar-item >
          <span>演出</span>
          <template #icon="props">
            <van-icon class-prefix="iconfont icon-dianyingpiao" size=".26rem"/>
            <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          </template>
        </van-tabbar-item>
        <van-tabbar-item  >
          <span>我的</span>
          <template #icon="props">
            <van-icon class-prefix="iconfont icon-wode" size=".26rem"/>
            <!-- <img :src="props.active ? icon.active : icon.inactive" /> -->
          </template>
        </van-tabbar-item>
        </van-tabbar>
      </nav>
    </div>
  </template>
  
  <script>
  import Vue from 'vue'
  import { Tabbar, TabbarItem, Icon } from 'vant';
  import Movies from '@/views/home/movies/Movies.vue'
  Vue.use(Tabbar).use(TabbarItem).use(Icon)
  export default {
    name: '',
    data() {
      return {
        active:0
      }
    },
    components: {
      Movies,
    },
  }
  
  </script>
  <style lang="stylus" scoped>
  @import '@/assets/iconfont/iconfont.css';
  @import '@/assets/stylus/border.styl';
  [class-perfix]
    size: 3rem
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
      ul
        border1px() 
        display flex
        position fixed
        bottom 0
        width 100%
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