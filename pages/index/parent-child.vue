<script setup>
import parChi01 from '@/assets/image/parent-child/parChi01.jpg'
import parChi02 from '@/assets/image/parent-child/parChi02.jpg'
import parChi03 from '@/assets/image/parent-child/parChi03.jpg'
import parChi04 from '@/assets/image/parent-child/parChi04.jpg'
import parChi05 from '@/assets/image/parent-child/parChi05.jpg'

const parentChilLis = [{
  id: 1,
  src: parChi01,
  title: '誰是小小冒險王',
  text: '透過互動方式認識野外求生基本常識、方向辨別、動植物觀察、安全守則等知識',
  cont: ''
}, {
  id: 2,
  src: parChi02,
  title: '小小神廚',
  text: '小廚神們將動手製作一道簡單又好吃的料理或點心,可選擇家長們與孩子適合的主題'
}, {
  id: 3,
  src: parChi03,
  title: '色彩裡的我們',
  text: '透過色彩表達心情、透過畫筆創作想像，這是一場以「陪伴」為核心的親子彩繪活動'
},
{
  id: 4,
  src: parChi04,
  title: '我是生活小達人',
  text: '讓孩子透過實際動手做、任務挑戰、親子協作的方式學會生活基本能力，提升獨立性與自信心'
},
{
  id: 5,
  src: parChi05,
  title: '親子主題拍照專題活動',
  text: '你和寶貝的親子裝、配色呼應、風格搭配，不用專業攝影，只要有愛就夠'
}
]
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

const details = [
  {
    id: 1,
    cont: `
    
    `
  }
]

</script>

<template>
  <div class="culturepage">
    <ZwHeader :activeUrl="'/parent-child'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>親子活動</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item">親子活動</li>
        </ol>
      </div>
    </div>
    <div class="parent_child1">
      <div class="parent_child">
        <div class="cont-text">
          <h1>小孩的人生課題</h1>
          <h3>這裡是給每一位父母的育兒基地，我們相信養孩子不只是知識的累積，更是陪伴的旅程。在這裡，你不孤單</h3>
          <h4>育兒知識與教養指南-1</h4>
          <p>不同年齡層的育兒技巧（0-3歲、3-6歲、國小）</p>
          <p>
            在孩子成長的不同階段，父母的角色與教養方式需隨之調整。0至3歲是建立安全感的關鍵期，透過親密互動、規律作息與即時回應，幫助孩子發展信任與基本情緒穩定。3至6歲孩子逐漸建立自我意識與社會互動能力，此階段應以明確規範引導行為，提供選擇與情緒教養，培養自主性與人際技巧。進入6至12歲的國小階段，孩子學習能力與責任感迅速成長，父母應鼓勵自主學習、參與家務、建立規律生活，並透過溝通與引導協助孩子面對同儕關係與壓力挑戰。整體而言，有效教養的關鍵在於理解孩子的發展需求，給予適當的愛、界線與支持，陪伴他們建立健康的自我與良好的生活習慣。
          </p>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/parent-child/parentChild1.png" alt="">
        </div>
      </div>
    </div>
    <div class="parent_child2">
      <div class="parent_child">
        <div class="cont-img">
          <img src="@/assets/image/parent-child/parentChild2.png" alt="">
        </div>
        <div class="cont-text">
          <h1>小孩的人生課題</h1>
          <h3>這裡是給每一位父母的育兒基地，我們相信養孩子不只是知識的累積，更是陪伴的旅程。在這裡，你不孤單</h3>
          <h4>育兒知識與教養指南-1</h4>
          <p>不同年齡層的育兒技巧（0-3歲、3-6歲、國小）</p>
          <p>
            在孩子成長的不同階段，父母的角色與教養方式需隨之調整。0至3歲是建立安全感的關鍵期，透過親密互動、規律作息與即時回應，幫助孩子發展信任與基本情緒穩定。3至6歲孩子逐漸建立自我意識與社會互動能力，此階段應以明確規範引導行為，提供選擇與情緒教養，培養自主性與人際技巧。進入6至12歲的國小階段，孩子學習能力與責任感迅速成長，父母應鼓勵自主學習、參與家務、建立規律生活，並透過溝通與引導協助孩子面對同儕關係與壓力挑戰。整體而言，有效教養的關鍵在於理解孩子的發展需求，給予適當的愛、界線與支持，陪伴他們建立健康的自我與良好的生活習慣。
          </p>
        </div>

      </div>
    </div>
    <div class="parent_child3">
      <div class="parent_child">
        <div class="cont-text">
          <h1>小孩的人生課題</h1>
          <h3>這裡是給每一位父母的育兒基地，我們相信養孩子不只是知識的累積，更是陪伴的旅程。在這裡，你不孤單</h3>
          <h4>育兒知識與教養指南-1</h4>
          <p>不同年齡層的育兒技巧（0-3歲、3-6歲、國小）</p>
          <p>
            在孩子成長的不同階段，父母的角色與教養方式需隨之調整。0至3歲是建立安全感的關鍵期，透過親密互動、規律作息與即時回應，幫助孩子發展信任與基本情緒穩定。3至6歲孩子逐漸建立自我意識與社會互動能力，此階段應以明確規範引導行為，提供選擇與情緒教養，培養自主性與人際技巧。進入6至12歲的國小階段，孩子學習能力與責任感迅速成長，父母應鼓勵自主學習、參與家務、建立規律生活，並透過溝通與引導協助孩子面對同儕關係與壓力挑戰。整體而言，有效教養的關鍵在於理解孩子的發展需求，給予適當的愛、界線與支持，陪伴他們建立健康的自我與良好的生活習慣。
          </p>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/parent-child/parentChild3.png" alt="">
        </div>
      </div>
    </div>
    <div class="parent_child4">
      <div class="child4-title">
        <div class="subtitle">
          Activities
        </div>
        <div class="title">
          <h2>親子活動</h2>
          <h5>活動與課程資訊</h5>
        </div>
      </div>

      <div class="culturebg2">
        <div class="culturebg2-item" v-for="(item, index) in parentChilLis" :key="index">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <img :src="item.src" alt="">
          <div class="item-cont">
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
            <div @click="navigateTo('/parent-child-detail?id=' + item.id)" class="user">瞭解更多
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
  background: url(@/assets/image/parent-child/parent-child.jpg) no-repeat center bottom / cover
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

    
.parent_child1
  padding: 80px 0 50px
  background-color: rgb(255, 255, 235)
.parent_child2
  padding: 80px 0 50px
  background-color: #dcf3ff
.parent_child3
  padding: 80px 0 50px
  background-color: #fbeeff
.parent_child
  font-family: 'Roboto', sans-serif
  margin: 0 auto
  width: 1320px
  max-width: 100vw
  display: flex
  justify-content: center
  flex-wrap: wrap
  .cont-text
    width: 42%
    padding: 0 12px 0 48px
    h1
      font-size: 30px
      color: #33355c
      margin-bottom: 5px
    h3
      color: #0414a1
      font-weight:500
      font-size: 17px
      margin-top: 16px
    h4
      font-weight:500
      font-size: 18px
      color: #bb4b00
      margin-block: 20px 10px
    p
      font-size: 17px
      font-weight: 500
      color: #000
  .cont-img
    width: 42%
    padding: 0 12px
    img
      width: 100%
.parent_child4
  padding: 80px 0 50px
  .child4-title
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
  .culturebg2
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding-bottom: 30px
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 20
    .culturebg2-item
      position: relative
      padding: 20px
      color: #33355c
      margin-inline: 12px
      margin-bottom: 30px
      img
        width: 100%
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
      &:nth-child(2n)
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
// 標題
.title
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center
  margin-bottom: 20px        
  h2
    font-size: 30px
    color: #33355c
  h5
    margin-bottom: 30px
    color: #959595
    font-size: 14px
.subtitle
  font-size: 20px
  padding: 0 20px
  position: relative
  color: #f9608c
  &::before,&::after
    content: ''
    width: 15px
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
  .parent_child1,.parent_child2,.parent_child3,.parent_child4
    padding: 40px 0
    .cont-text,.cont-img
      width: 100%
      padding: 0 20px
      .cont-img
        margin-top: 20px
  .parent_child1
    .parent_child
      flex-direction: column
  .parent_child2
    .parent_child
      flex-direction: column-reverse
  .parent_child3
    .parent_child
      flex-direction: column
  .parent_child4
    .culturebg2
      grid-template-columns: repeat(2, 1fr)
@media (max-width: 720px)
  .parent_child4
    .culturebg2
      grid-template-columns: repeat(1, 1fr)
</style>
