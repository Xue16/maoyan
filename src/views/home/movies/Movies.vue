<template>
  <main>
    <nav class="movie-nav">
      <ul>
        <li @click="handleCityClick">
          天安门<b class="iconfont icon-jiantou_liebiaozhankai_o"></b>
        </li>
        <li>
          <router-link to="/home/movies/intheaters" tag="span" active-class="active">热映</router-link>
          <router-link to="/home/movies/comingsoon" tag="span" active-class="active">影院</router-link>
          <router-link to="/home/movies/comingsoon" tag="span" active-class="active">待映</router-link>
          <router-link to="/home/movies/comingsoon" tag="span" active-class="active">经典电影</router-link>
        </li>
        <li>
          <b class="iconfont icon-sousuo"> </b>
        </li>
      </ul>
    </nav>
    <section class="movie-list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model ="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <router-view :movie-list="movieList"></router-view>

        </van-list>
      </van-pull-refresh>
    </section>
  </main>
</template>
  
<script>
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List)
export default {
  name: '',
  data() {
    return {
      movieList: [],
      finished: false,//控制加载状态 数据全部加载完毕
      loading: false,//控制加载状态 数据更新
      refreshing: false,
      maxLength:0,
      movieIds:[]
    }
  },
  created(){
    this.hasMore = false
  },
  mounted() {
    this.hasMore = this._initMovieData();
  },
  methods: {
    async _initMovieData() {
      let result = await this.$http.get({
        url: '/api/mmdb/movie/v3/list/hot.json',
        params: {
          ct: '重庆',
          ci: 292,
          channelId: 4,
        }
      })
      // .then((response)=>{
      //   this.movieList = response.data
      //   console.log(response.data);
      // })
      this.movieList = result.data.hot
      this.maxLength = result.data.movieIds.maxLength
      this.movieIds = result.data.movieIds.splice(0,10)
      return result.data ? true: false
    },
    async moreMovieData() {
      let sendmovieIds = this.movieIds.splice(0,10)
      let sendmovieIds1 = sendmovieIds.join(',')
      console.log(sendmovieIds.join(',').toString());
      let result = await this.$http.get({
        url: '/ajax/moreComingList',
        params: {
          token:'',
          optimus_uuid:'',
          optimus_risk_level:71,
          optimus_code:10,
          movieIds:''
        }
      })
      
      // .then((response)=>{
      //   this.movieList = response.data
      //   console.log(response.data);
      // })
    },
    handleCityClick() {
      this.$router.push('/citypicker')
    },
    async onRefresh() {
      let refreshData =await this._initMovieData()
      if(refreshData){
        this.refreshing = false
      }
    },
    async onLoad() {
      
      await this.moreMovieData()
      // this.loading = false;
      // this.finished = true
    },

  },
}
</script>
<style lang="stylus" scoped>
  main
    flex 1
    overflow: hidden
    display: flex
    flex-direction: column
    .movie-nav
      > ul
       border-bottom solid 1px #eee
       display flex
       height .44rem
       li:first-child
         width .8rem
         font-size: .15rem
         color rgb(127,102,127)
         display flex
         justify-content: center
         align-items: center
       li:nth-child(2)
         flex 1
         display: flex
         justify-content: center
         align-items: center
         span
          display: inline-block
          height: .44rem
          line-height: .44rem
          text-align: center
          font-weight: 700
          font-size: .15rem
          color: rgb(102,102,102)
          flex: 1
          margin: 0 auto
          margin 0 .05rem
          &:last-child
            flex: 2
          &.active
            border-bottom: solid 2px rgb(240,61,55)
            color: rgb(0,0,0)
            font-size: .18rem
       li:last-child
         width .44rem
         font-size .2rem
         line-height .44rem
         color rgb(239,66,56)
         text-align center
         b
          display inline-block
          transform scale(1.2)
    .movie-list
      flex: 1
      overflow-y: scroll
  </style>