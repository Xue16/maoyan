<template>
    <div class="container">
      <div :style="{'background-color':buttoncolor}" >{{showStateButton.content}}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'aaa',
    props: {
      showStateButton:{}
    },
    computed:{
      buttoncolor(){
        return this.showStateButton.color
      }
    },
  }
  </script>
  
  <style lang='stylus' scoped>
  .container
    position relative
    display flex
    flex-direction column
    align-items flex-end
    justify-content center
    width .6rem
    color #f3ad00
    > div
      width .46rem
      height .28rem
      background #dd5042
      border-radius .04rem
      color #fff
      text-align center
      line-height .28rem
      border-radius: .14rem
      &.pre-sale
        background #69afe5
  </style>