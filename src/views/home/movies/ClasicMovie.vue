<template>
  <div >
    <ul>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
      <li v-for="(cmv) in clasicmovie">
        <div>
          <img :src="cmv.img " alt="cmv.nm">
        </div>
        <div >
          <div class="movie-title">
            <h1 class="movie-nm line-ellipsis">{{ cmv.nm }}</h1>
          </div>
          <div class="detail line-ellipsis">{{cmv.enm}}</div>
          <div class="detail line-ellipsis">{{cmv.cat}}</div>
          <div class="detail line-ellipsis">{{cmv.pubDesc}}</div>
        </div>
        <div class="grade">
          <span class="score">{{ cmv.sc }}</span>
          <span>分</span>
        </div>
      </li>
      </van-list>

      
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import { List} from 'vant';
Vue.use(List)
export default {
    name:'',
   data() {
     return {
       clasicmovie:[],
       maxLength:0,
       finished: false,//控制加载状态 数据全部加载完毕
       loading: false,//控制加载状态 数据更新
       offset : 0
     }
   },
   created(){
    //  this.offset=0
  },
  mounted(){
    this.loadData()
  },
  methods: {
    //https://i.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=10&optimus_uuid=65DA1AF0166311EEB1B283CBF15CD35ED5EE520EE27748A2B436587D49F17A12&optimus_risk_level=71&optimus_code=10
    async loadData(){
      let result = await this.$http.get({
        url:"/ajax/moreClassicList",
        params:{
          sortId:1,
          showType:3,
          limit:10,
          offset:this.offset,
          optimus_uuid:'',
          optimus_risk_level:71,
          optimus_code:10,
        }
      })
      this.maxLength = result.classicMovies.total
      this.clasicmovie = [
        ...this.clasicmovie,
        ...result.classicMovies.list
      ]
      this.offset+=10
      if(this.clasicmovie.length===this.maxLength){
          this.finished = true;
      }
    },
    async onLoad(){
        await this.loadData()
        // 加载状态结束
        this.loading = false;
        
    },
  },
}

</script>
<style scoped lang="stylus">
.line-ellipsis {
    // text-overflow: ellipsis;
    // overflow: hidden;
    // white-space: nowrap;
    display -webkit-box
    -webkit-line-clamp 1
    -webkit-box-orient vertical
    overflow hidden
}
  ul
    padding-left .15rem
    li
      height 1.14rem
      display flex
      padding .12rem .12rem .12rem 0
      border1px(0 0 1px 0)
      > div:first-child
        width .76rem
        img
          width .64rem
          height .9rem
      > div:nth-child(2)
        flex: 1
        h1
          font-size: .17rem
          line-height: .23rem;
          color: #333;
          font-weight: 700;
        .detail
          margin-bottom: 0.02rem
          font-size: .13rem;
          line-height: .19rem;
          color: #666;
        
      .grade
        display: inline-block
        font-size: .12rem
        .score
          color: #faaf00
          font-size: .14rem 
          line-height: .34rem
</style>