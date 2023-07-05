<template>
  <main>
    <nav class="movie-nav">
      <ul>
        <li>
          天安门<b class="iconfont icon-jiantou_liebiaozhankai_o"></b>
        </li>
        <li>
          <span class="active">热映</span>
          <span>影院</span>
          <span>待映</span>
          <span>经典电影</span>
        </li>
        <li>
          <b class="iconfont icon-sousuo"> </b>
        </li>
      </ul>
    </nav>
    <div class="movie-list">
      <MovieList :movie-list="movieList"></MovieList>
    </div>
  </main>
</template>
  
<script>
import axios from 'axios'
import MovieList from '@/components/MovieList'
export default {
  name: '',
  data() {
    return {
      movieList:[]
    }
  },
  components: {
    MovieList,
  },
  async mounted() {
    let result = await this.$http.get({
      url:'/api/mmdb/movie/v3/list/hot.json',
      params:{
        ct:'重庆',
        ci:292,
        channelId:4,
      }
  })
  console.log(result.data);
  this.movieList = result.data
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