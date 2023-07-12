<template>
  <div class="body">
    <div class="top-rated" data-view-bid="b_movie_bt66pvrm_mv">
      <p class="title">最受期待电影</p>
      <div class="top-rated-list view-scroll-x-container">
		    <div class="top-rated-item" v-for="(expact ,index) in mostExpectedData " :key="index" :data-id=expact.id data-view-bid="b_movie_xl4zo6n0_mv" data-bid="b_movie_xl4zo6n0_mc"
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
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
      :immediate-check="false">
      <div class="group_movie" v-for="(groupe, key) in groupedData" :key="key">
        <p>{{ formate(groupe[0].rt) }}</p>
        <MovieList :movie-list="groupe"></MovieList>
      </div>
    </van-list>


  </div>
</template>

<script>
import Vue from 'vue'
import { List } from 'vant';
import MovieList from '@/components/MovieList'
import {mapState} from 'vuex'
Vue.use(List)
export default {
  name: '',
  data() {
    return {
        groupedData:[],
        groupkey:[],
        limit : 10,
        movieList:{},
        maxLength:0,
        loading: false,
        finished : false,
        mostExpectedData :[],
    }
  },
  components: {
    MovieList
  },
  computed:{
    ...mapState(['city'])
  },
  async mounted() {
    await this.ExpectedData()
    await this._initMovieData();
  },
  methods: {
    async _initMovieData() {
      let result,return_data=false ;
      this.movieIds = []
      this.movieList={}
      this.maxLength = 0
      this.groupedData=[]
      result = await this.$http.get({
        url: "/ajax/comingList",
        params: {
          ci: this.city.id,
          limit:this.limit,
          movieIds:'',
          token:'',
          optimus_uuid:'65DA1AF0166311EEB1B283CBF15CD35ED5EE520EE27748A2B436587D49F17A12',
          optimus_risk_level:71,
          optimus_code:10,
        }
      })
     return_data = true
     this.movieList = result.coming
     this.maxLength = result.movieIds.length
     this.movieIds = result.movieIds
     this.movieIds.splice(0,this.limit)
     this.groupData(result.coming)
     return return_data
    },
    async moreMovieData() {
      let sendmovieIds = this.movieIds.splice(0,10)
      let sendmovieIds1 = sendmovieIds.join(',')
      let params= {
          ci : this.city.id,
          limit:this.limit,
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
      this.groupData(result.coming)
    },
    async onLoad(){
      await this.moreMovieData()
      this.loading = false
      if(this.movieList.length>= this.maxLength){
        this.finished = true
      }
    },
    formate(key){
        const date = new Date(key);
        const month = date.getMonth() + 1; // getMonth 返回的月份从 0 开始，因此需要加 1
        const day = date.getDate();
        const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const weekDay = weekDays[date.getDay()];

        // 返回格式化后的字符串
        return `${month}月${day}日 ${weekDay}`;
    },
    groupData(list) {
      for(let i =0;i<list.length;i++){
        let key = list[i].rt
        if(this.groupkey.includes(key)){
          this.groupedData[this.groupkey.length-1].push(list[i])
        }else{
          this.groupkey.push(key)
          this.groupedData.push([list[i]])
        }
      }
    },
    async ExpectedData(){
      let result = await this.$http.get({
        url: '/ajax/mostExpected',
        params: {
          limit:this.limit,
          token:'',
          optimus_uuid:'',
          optimus_risk_level:71,
          optimus_code:10,
          offset:0,
        }
      })
      this.mostExpectedData = result.coming
    }
  },
}
</script>
<style scoped lang="stylus">
.top-rated{
  background-color #fff
  margin: 0 0 10px
  }
  .body{
    background-color rgb(245,245,245)
    }
.group_movie
  background-color #fff
  p
    padding: 0.12rem 0.15rem 0;
    margin: 0
    font-size: .14rem
    color: #333
    border1px(0 0 1px 0)
</style>