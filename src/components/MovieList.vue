<template>
  <div>
    <ul>
      <li v-for="(mv) in movieList.hot">
        <div>
          <img :src="mv.img" alt="mv.nm">
        </div>
        <div >
          <div class="movie-title">
            <h1>{{ mv.nm }}</h1>
            <MovieVersion :ver=mv.ver :preSale="mv.preSale" :recentShowNum =" mv.recentShowNum"/>
          
          </div>
          <div class="detail">
            <div class="purfix">
            <div class="score-purfix" v-if="mv.sc !== 0">
              <span v-if="mv.scoreLabel === '猫眼购票评分'">观众评 </span>
              <span v-else-if="mv.scoreLabel === '猫眼点映评分'">点映评 </span>
              <span v-else-if="mv.scoreLabel === '暂无评分'">暂无评分 </span>
              <span class="grade">{{ mv.sc }}</span>
            </div>
            <div class="wish-purfix" v-else>
              <p >{{ mv.wish }}</p>
              <span> 人想看</span>
            </div>
          </div>
          </div>
          

          <p class="actor">{{ mv.desc }}</p>
          <div>{{ mv.showInfo }}</div>
        </div>
        <MovieButton :showStateButton=mv.showStateButton />
      </li>
    </ul>
  </div>
</template>
  
  <script>
  import MovieVersion from './MovieVersion'
  import MovieButton from './MovieButton'
  export default {
    name: '',
    props:{
      movieList:[]
    },
    components: {
      MovieButton,
      MovieVersion
    },
  }
  
  </script>
  <style lang="stylus" scoped>

  @import '@/assets/stylus/border.styl';
  @import '@/assets/stylus/ellipsis.styl';
  ul
    padding-left .12rem
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
        flex 1
        font-size: .13rem
        color: #666
        .movie-title
          display flex
          h1
            display flex
            align-items center
            font-size .17rem
            font-weight 700
            color: #333
            padding-right: .05rem
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
            overflow hidden
        .detail
          display flex
          flex-direction: column
          .purfix
            display flex
            flex-direction: row
            .score-purfix
              .grade
                font-weight 700
                color: #faaf00
                font-size: .15rem
            .wish-purfix
              display flex
              flex-direction: row
              p
                font-weight 700
                color: #faaf00
                font-size: .15rem
        .actor
          ellipsis()
      &:last-child
        border1px(0)
  </style>