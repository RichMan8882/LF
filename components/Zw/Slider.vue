<template>
  <div>
    <div class="swiper-navigation">
      <div class="title">
        <p>News</p>
        <h2>最新活動 / 新聞區</h2>
      </div>
      <button class="nav-button prev-button" @click="slidePrev">
        <i class="arrow-left"></i>
      </button>
      <button class="nav-button next-button" @click="slideNext">
        <i class="arrow-right"></i>
      </button>
    </div>
    <swiper :modules="modules" class="mySwiper" :slides-per-view="1" :space-between="20" :loop="true" :breakpoints="{
      768: { slidesPerView: 2, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 }
    }" @swiper="onSwiper">
      <swiper-slide v-for="(item, index) in slides" :key="index" :class="`slide${index + 1}`">
        <div class="cardItem">
          <div class="infotitle">
            <p class="comment">
              <span style="font-size: 22px;">{{ item.title }}</span>
              <br>
            <p v-for="value in item.text">{{ value }}</p>
            </p>
          </div>
          <div class="infoItem">
            <img :src="item.src" alt="">
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import { Scrollbar, Autoplay } from 'swiper/modules'

export default {
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiper: null
    }
  },
  setup() {
    return {
      modules: [Autoplay]
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    slideNext() {
      if (this.swiper) {
        this.swiper.slideNext()
      }
    },
    slidePrev() {
      if (this.swiper) {
        this.swiper.slidePrev()
      }
    }
  }
}
</script>

<style scoped lang="sass">
// 動畫
@keyframes spin_left 
  100% 
    transform: rotateZ(-360deg)
@keyframes spin_right
  100% 
    transform: rotateZ(360deg)
// 


.swiper
  width: 100%
  height: 100%

.swiper-slide 
  text-align: center
  font-size: 18px
  background: #fff
  display: flex
  justify-content: center
  align-items: center
  &.slide1
    .cardItem
      .infotitle
        background: #43a4df !important
  &.slide2
    .cardItem
      background: rgb(218, 250, 253) !important
      .infotitle
        background: #33355c !important
        &::after
          border-right-color: #33355c
          border-top-color: #33355c
  &.slide3
    .cardItem
      background: rgb(255, 230, 239) !important
      .infotitle
        background: #f9608c !important
        &::after
          border-right-color: #f9608c
          border-top-color: #f9608c
  &.slide4
    .cardItem
      .infotitle
        background: #33355c !important
        &::after
          border-right-color: #33355c
          border-top-color: #33355c
  .cardItem
    background: beige
    display: block
    color: #121214
    border: 1px solid #f5f7fa
    transition: all .17s cubic-bezier(.52,.07,.45,2.35)
    cursor: pointer
    margin: 0 0 24px 0
    padding: 20px
    .infotitle
      border-radius: 0px
      position: relative
      background-color: #43a4df
      padding: 15px
      padding-top: 5px
      margin-bottom: 30px
      text-align: left
      &::after
        content: ''
        width: 0
        height: 0
        border-width: 20px
        border-style: solid
        border-top-color: #43a4df
        border-left-color: transparent
        border-right-color: #43a4df
        border-bottom-color: transparent
        position: absolute
        bottom: 0
        top: calc(100% - 15px)
        left: 30px
      .comment
        margin-bottom: 0
        color: white
        font-size: 15px
        line-height: 1.5
        margin-top: 10px
  .infoItem
    width: 300px
    @media (max-width: 768px)
      width: 100%
    img
      width: 100%      
          
.swiper-navigation
  position: relative
  width: 100%
  margin-bottom: 20px
  .title
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    text-align: center
    margin-bottom: 20px
    p
      font-size: 22px
      padding: 0 40px
      position: relative
      color: #f9608c
      &::before,&::after
        content: ''
        width: 20px
        height: 2px
        background-color: #f9608c
        display: block
        z-index: 1
        position: absolute
        top: calc( 50% - 1px )
        left: 0
      &::after
        left: auto
        right: 0
        
    h2
      font-size: 30px
      color: #33355c
.prev-button
  &::after
    animation: spin_left 5s linear infinite
    animation-play-state: paused
.next-button
  &::after
    animation: spin_right 5s linear infinite
    animation-play-state: paused
.nav-button
  position: absolute
  top: 50%
  transform: translateY(-50%)
  width: 40px
  height: 40px
  border-radius: 50%
  background: #72c0f0
  border: none
  cursor: pointer
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  &::after
    content: ''
    border: 1.5px dashed white
    position: absolute
    top: 3px
    left: 3px
    width: calc(100% - 6px)
    height: calc(100% - 6px)
    pointer-events: none
    border-radius: 50%
  &:hover
    background: #33355c
    &::after
      animation-play-state: running !important
  .arrow-left
    margin-right: -5px
  .arrow-right
    margin-left: -5px

.prev-button
  left: 10px

.next-button
  right: 10px

.arrow-left,
.arrow-right
  border: solid white
  border-width: 0 2px 2px 0
  display: inline-block
  padding: 5px

.arrow-left
  transform: rotate(135deg)
  -webkit-transform: rotate(135deg)

.arrow-right
  transform: rotate(-45deg)
  -webkit-transform: rotate(-45deg)
</style>
