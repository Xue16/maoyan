<template>
  <main>
    <nav class="movie-nav">
      <ul>
        <li @click="handleCityClick">
          {{city.name}}<b class="iconfont icon-jiantou_liebiaozhankai_o"></b>
        </li>
        <li>
          <router-link to="/home/movies/intheaters" tag="span" active-class="active">热映</router-link>
          <router-link to="/home/movies/theaters" tag="span" active-class="active">影院</router-link>
          <router-link to="/home/movies/comingsoon" tag="span" active-class="active">待映</router-link>
          <router-link to="/home/movies/clasicmovie" tag="span" active-class="active">经典电影</router-link>
        </li>
        <li>
          <b class="iconfont icon-sousuo"> </b>
        </li>
      </ul>
    </nav>
    
    <section class="movie-list" v-if="this.$route.name ==='intheaters' ">
      <van-skeleton 
        v-for="i in 7"
        :key="'a'+i"
        class="skeleton"
        :loading="showSkeleton"
        title 
        avatar 
        avatar-shape="square" 
        avatar-size="60"  :row="2" ></van-skeleton>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model ="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <div class="top-rated" data-view-bid="b_movie_bt66pvrm_mv">
            <p class="title">最受好评电影</p>
            <div class="top-rated-list view-scroll-x-container">
		          <div class="top-rated-item" v-for="(expact ,index) in popularData " :key="index" :data-id=expact.id data-view-bid="b_movie_xl4zo6n0_mv" data-bid="b_movie_xl4zo6n0_mc"
		      	    :data-lab='{ "movie_id": expact.id }' >
		      	    <div class="poster default-img-bg">
		      	    	<img :src=expact.img  onerror="this.style.visibility='hidden'">
		      	    	<span class="wish-bg"></span>
		      	    	<span class="wish"><span class="wish-num">{{ expact.wish}}</span>人想看</span>
		      	    </div>
		      	    <h5 class="name line-ellipsis">{{expact.nm}}</h5>
		          </div>
	        </div>
          </div>
          <router-view :movie-list="movieList"></router-view>
        </van-list>
      </van-pull-refresh>
    </section>
    <section class="movie-list" v-else>
      <router-view></router-view>
    </section>
  </main>
</template>
  
<script>
import Vue from 'vue';
import { List,Skeleton} from 'vant';
import {mapState} from 'vuex'
Vue.use(List).use(Skeleton)
export default {
  name: '',
  data() {
    return {
      movieList: [],
      finished: false,//控制加载状态 数据全部加载完毕
      loading: false,//控制加载状态 数据更新
      refreshing: false,
      maxLength:0,
      movieIds:[],
      showSkeleton: true,
      url:"/api/mmdb/movie/v3/list/hot.json",
      groupedData:{},
      popularData:[]
    }
  },
  created(){
    this.hasMore = false
    this.limit = 10
  },
  async mounted() {
    if(this.$route.name ==="intheaters" ){
      await this._initMovieData();
      this.showSkeleton = false
    }
  },
  computed:{
    ...mapState(['city'])
  },
  methods: {
    async _initMovieData() {
      let result,return_data=false ;
      this.movieIds = []
      this.movieList={}
      this.maxLength = 0
      if(this.$route.name ==="intheaters"){
        result = await this.$http.get({
        url: "/api/mmdb/movie/v3/list/hot.json",
        params: {
          ct: this.city.name,
          ci: this.city.id,
          channelId: 4,}
        })
        this.movieList = result.data.hot
        return_data = true
        this.maxLength = result.data.total
        this.movieIds = result.data.movieIds
        this.movieIds.splice(0,12)

        this.popularData = this.movieList
        this.popularData.sort((a,b)=>b.sc-a.sc)
      }
      return return_data
    },

    async moreMovieData() {
      let sendmovieIds = this.movieIds.splice(0,10)
      let sendmovieIds1 = sendmovieIds.join(',')
      let params= {
          token:'',
          movieIds:sendmovieIds1,
          optimus_uuid:'',
          optimus_risk_level:71,
          optimus_code:10,
      }
      let result = await this.$http.get({
        url: '/ajax/moreComingList',
        params: params
      })
      this.movieList = [
        ...this.movieList,
        ...result.coming
      ]
    },
    handleCityClick() {
      this.$router.push('/citypicker')
    },
    async onRefresh() {
      this.showSkeleton = true
      this.movieList = []
      this.finished = false
      let refreshData =[]
      refreshData = await this._initMovieData()

      if(refreshData){
        this.refreshing = false
      }
      this.showSkeleton = false
    },
    async onLoad() {
      await this.moreMovieData()
      this.loading = false;
      if(this.movieList.length=== this.maxLength){
        this.finished = true
      }
    },
  },
  watch:{
      // $route:{
      //   handler(route){
      //     if(route.name === 'intheaters' || route.name === 'comingsoon'){
      //       if(route.name === 'intheaters'){
      //         this.url = "/api/mmdb/movie/v3/list/hot.json"
      //       }else if(route.name === 'comingsoon'){
      //         this.url = '/ajax/comingList'
      //       }
      //       this.refreshing = true
      //       this.onRefresh()
      //     }
          
      //   }
      // }
    }
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
      .skeleton
        margin-top .2rem
  </style>