<script setup>
import culture1 from '@/assets/image/culture/culture-1.jpg'
import culture2 from '@/assets/image/culture/culture-2.jpg'
import culture3 from '@/assets/image/culture/culture-3.jpg'



const cultureLis = [{
  id: 1,
  src: culture1,
  title: '漢服專區',
  text: '我們將舉辦漢服體驗與交流活動，一起拍照、喝茶、聊文化，讓漢服不只是一套衣服，而是一種生活',
  cont: ''
}, {
  id: 2,
  src: culture2,
  title: '古蹟繪畫專區',
  text: '邀請每一位小朋友用創意與色彩守護我們的文化寶藏！讓古蹟在童心中重生一筆一畫守護歷史，一顆童心傳承文化'
}, {
  id: 3,
  src: culture3,
  title: '書法專區',
  text: '在靜謐的紙上，落下一筆，墨香便悄然蔓延。不只是文字，更是一份情感的寄託，一段與自己與文化對話的旅程。'
}]
const props = defineProps({
  'page-scroll-top': Number
})
const deg = ref(0)
const timer = ref()
let num = 0.2
const y = ref()
const wonderfultop = ref(400)
const windowWidth = ref()
const titleFixed = ref()
const isMobile = computed(() => {
  return windowWidth.value >= 720
})
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  wonderfultop.value = windowWidth.value >= 720 ? 150 : 1600
}
const scrollTop = ref(0)
const handleScroll = () => {
  // console.log(window.scrollY);
  scrollTop.value = window.scrollY
}
onMounted(() => {
  if (window) {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateWidth)
    windowWidth.value = window.innerWidth
    wonderfultop.value = window.innerWidth >= 720 ? 150 : 1600
  }
  timer.value = setInterval(() => {
    deg.value += num
    if (deg.value < 1 && deg.value > -1) {
      num = num > 0 ? 0.03 : -0.03
    } else {
      num = num > 0 ? 0.2 : -0.2
    }
    if (deg.value > 50 || deg.value < -50) {
      num *= -1
    }
  }, 10)
})
onUnmounted(() => {
  if (window) {
    window.removeEventListener('resize', updateWidth) // 清理事件
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div class="culturepage">
    <ZwHeader :activeUrl="'/culture'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>文化特區</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item">文化特區</li>
        </ol>
      </div>
    </div>
    <div class="culturebg-bg2">
      <div class="culturebg2">
        <div class="culturebg2-item" v-for="(item, index) in cultureLis" :key="index">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <img :src="item.src" alt="">
          <div class="item-cont">
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
            <div @click="navigateTo('/culture-detail?id=' + item.id)" class="user">瞭解更多
              <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                <rect width="100%" height="100%"></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ZwFooter />
  </div>
</template>

<style scoped lang="sass">
// 動畫
@keyframes fadeSlideIn 
  to 
    opacity: 1
    transform: translateY(0)

@keyframes fadeSlideIn2 
  to 
    opacity: 1
    transform: translateY(0)

@keyframes fadeHeaderInDown 
  0% 
    opacity: 0
    transform: translate3d(0, -100%, 0)
  100% 
    opacity: 1
    transform: translate3d(0, 0, 0)
@keyframes dashed_border_running 
  100% 
    stroke-dashoffset: -1000
// 

.culturebg-bg1
  background: url(@/assets/image/culture/culturepage1.jpg) no-repeat center bottom / cover
  padding: 150px 0 140px
  text-align: center
  color: #fff
  text-shadow: rgba(0, 0, 0, .3) 2px 1px 3px
  &::before
    content: ''
    background-color: rgb(179 144 39 / 35%)
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 0
  h1
    font-size: 48px
    font-weight: 700
  .nav-tab
    display: flex
    justify-content: center
    ol
      display: flex
      align-items: center
      .breadcrumb-item
        cursor: pointer
        position: relative
        padding-inline-start: 15px
        &::before
          content: ""
          display: block
          position: absolute
          top: 50%
          left: 6px
          transform: translateY(-50%)
          width: 4px
          height: 4px
          z-index: 1
          border-radius: 50%
          background: #f9608c
.culturebg-bg2
  padding: 80px 0 50px
  color: #33355c
  .culturebg2
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding-bottom: 30px
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 0
    .culturebg2-item
      position: relative
      padding: 20px
      margin-inline: 12px
      margin-bottom: 30px
      .item-cont
        padding: 20px 0 0
        h1
          font-size: 20px
          margin-bottom: 10px
          font-weight: 700
        p
          font-size: 14px
          margin-bottom: 15px

      &:hover
        svg.inner-dashed-border2
          animation-play-state: running
        .user
          .inner-dashed-border
            stroke-width: 1
            animation-play-state: running
      svg.inner-dashed-border2
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        pointer-events: none
        animation: dashed_border_running 20s linear infinite both
        animation-play-state: paused
        stroke-width: 3px
        stroke-dasharray: 9, 5
        stroke-dashoffset: 0
        stroke-linecap: round
        transition: 0.4s
        stroke: #72c0f0
        fill: none
      &:nth-child(3n+2)
        svg.inner-dashed-border2
          stroke: #f7c870
        .user
          background-color: #f7c870
      &:nth-child(3n)
        svg.inner-dashed-border2
          stroke: #f9608c
        .user
          background-color: #f9608c
      &:nth-child(4n)
        svg.inner-dashed-border2
          stroke: #33355c
        .user
          background-color: #33355c
// 按鈕
@keyframes fadeSlideIn-2
  to
    opacity: 1
    transform: translateY(0)
.user
  font-size: 14px
  color: #fff
  display: inline-flex
  align-items: center
  padding: 8px 24px
  transition: 0.5s all
  font-weight: 500
  background-color: #72c0f0
  text-align: center
  justify-content: center
  white-space: nowrap
  border-radius: 0px
  position: relative
  animation: fadeSlideIn-2 1s ease-out forwards
  animation-delay: 0.5s
  &:hover
    background-color: #33355c !important
    border-color: transparent
    .inner-dashed-border
      stroke-width: 2
      animation-play-state: running
      stroke: white
      stroke-dasharray: 3, 3
      top: 3px
      left: 3px
      width: calc(100% - 6px)
      height: calc(100% - 6px)

  .inner-dashed-border
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    pointer-events: none
    animation: dashed_border_running 20s linear infinite both
    animation-play-state: paused
    stroke-width: 3px
    stroke-dasharray: 9, 5
    stroke-dashoffset: 0
    stroke-linecap: round
    fill: none
    transition: 0.4s
    stroke: #fff
    stroke-width: 2
    stroke-dasharray: 3, 3
    top: 3px
    left: 3px
    width: calc(100% - 6px)
    height: calc(100% - 6px)
    rect 
      ry: 0px
      width: 100%
      height: 100%
@media (max-width: 992px)
  .culturebg-bg2
    .culturebg2
      grid-template-columns: repeat(2, 1fr)
@media (max-width: 720px)
  .culturebg-bg2
    .culturebg2
      grid-template-columns: repeat(1, 1fr)
</style>
