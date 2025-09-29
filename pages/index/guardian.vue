<script setup>
import guardian01 from '@/assets/image/guardian/guardian01.jpg'
import guardian02 from '@/assets/image/guardian/guardian02.jpg'
import guardian03 from '@/assets/image/guardian/guardian03.jpg'

const guardianLis = [{
  id: 1,
  src: guardian01,
  title: '一起為偏鄉而教',
  text: '在偏鄉，教育資源有限，但孩子的夢想無限。我們走進山林與小我們走進山林與小鎮，陪伴孩子探索知識的世界，讓學習不再因距離而受限。每一次的教學互動都是改變未來的種子，讓希望在偏鄉萌芽、茁壯。',
}, {
  id: 2,
  src: guardian02,
  title: '致敬守護生命的消防英雄',
  text: '感謝每一位消防員，無畏危險守護我們的安全。您的付出，是城市最堅強的屏障，讓我們安心生活。歡迎您加入我們，共同守護這片土地！'
}, {
  id: 3,
  src: guardian03,
  title: '關懷偏鄉醫護，溫暖每個角落',
  text: '謝謝每位醫護人員，默默守護偏遠及弱勢地區的健康。您的專業與熱忱，讓更多人感受到關愛與與希望。歡迎您加入我們，一起護偏鄉的生命力量！'
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
    <ZwHeader :activeUrl="'/guardian'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>致敬守護者</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item">致敬守護者</li>
        </ol>
      </div>
    </div>
    <div class="parent_child1">
      <div class="parent_child">
        <div class="cont-text">
          <h1>守護社會的您，我們來守護</h1>
          <h3>向軍人、公務員、教師與醫護人員致敬 感謝您守護國家與民眾，我們用行動回應您的付出</h3>
          <p>在我們的生活背後，有一群人始終堅守在各自的崗位上。</p>
          <p>
            在教室裡，他們啟發下一代的夢想與智慧；在醫院裡，他們用專業與耐心守護著每一條生命；在各種崗位與公務中，他們默默承擔，維繫著社會的安全與秩序。這份責任與堅持，讓我們得以安心前行。
            本機構懷著由衷的感謝，特別舉辦「致敬守護者」活動，向軍人、公務員、教師與醫護人員表達最高的敬意。因為有您們的無私奉獻，這個社會才能更加穩定、美好與溫暖。這份心意，願成為對您們辛勞的最好回應。
          </p>
          <h5>致敬無聲的守護者：</h5>
          <h5>軍公教醫護人員的堅持與奉獻</h5>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/guardian/guardian01.png" alt="">
        </div>
      </div>
    </div>

    <div class="parent_child4">
      <div class="culturebg2">
        <div class="culturebg2-item" v-for="(item, index) in guardianLis" :key="index">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <img :src="item.src" alt="">
          <div class="item-cont">
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="parent_child2">
      <div class="parent_child">
        <div class="cont-img">
          <img src="@/assets/image/guardian/guardian02.png" alt="">
        </div>
        <div class="cont-text">
          <h1>「致敬守護者」專屬回饋活動</h1>
          <h2>活動對象：
            <br>
            現役軍人、公務員、教師、醫護人員（憑有效證明文件）
          </h2>
          <h2 style="color: #030d9e;"><span style="color: #bb4b00;">活動內容：</span> <br>
            ●贈送專屬感謝禮品
            <br>
            ●每月抽獎，贏取精美好禮
            <br>
            ●專屬優惠與福利方案
          </h2>

          <h2 style="color: #030d9e;"><span style="color: #bb4b00;">參加方式：</span> <br>
            線上報名填寫資料
            <br>
            活動現場出示證明領取禮品
          </h2>
        </div>
      </div>
    </div>
    <div class="parent_child3">
      <div class="title">
        <h2>活動內容</h2>
      </div>
      <div class="child3-items">
        <div class="child3-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <h2>健康關懷區</h2>
          <p style="font-size: 18px;">
            ●免費健康檢測<br>
            ●醫師健康諮詢<br>
            ●營養師飲食建議
          </p>
        </div>
        <div class="child3-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <h2>知識成長講座</h2>
          <p style="font-size: 18px;">
            ●《壓力調適與心理韌性》專題<br>
            ●《退休理財與保障規劃》分享
          </p>
        </div>
        <div class="child3-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <h2>趣味互動比賽</h2>
          <p style="font-size: 18px;">
            ●團隊合作闖關
            <br>
            ●軍公教知識小測驗
          </p>
        </div>
        <div class="child3-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <h2>幸福大抽獎</h2>
          <p style="font-size: 18px;">
            ●參與闖關或講座即可獲得抽獎券<br>
            ●獎品包括家電、禮券、健康檢測套餐
          </p>
        </div>
      </div>
    </div>
    <div class="parent_child4">
      <div class="title">
        <h2>贊助單位</h2>
      </div>
      <div class="child4-items">
        <div class="child4-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <div class="item">
            <img src="@/assets/image/guardian/guardian03.png" alt="">
          </div>
        </div>
        <div class="child4-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <div class="item">
            <img src="@/assets/image/guardian/guardian04.png" alt=""></img>
          </div>
        </div>
        <div class="child4-item user">
          <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <div class="item">
            <img src="@/assets/image/guardian/guardian05.png" alt=""></img>
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
  background: url(@/assets/image/guardian/guardian.jpg) no-repeat center bottom / cover
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
  .parent_child
    .cont-text
      h1
        font-size: 26px
        color: #bb4b00
        font-weight: 500
.parent_child
  font-family: 'Roboto', sans-serif
  margin: 0 auto
  width: 1320px
  max-width: 100vw
  display: flex
  justify-content: center
  flex-wrap: wrap
  .cont-text
    width: 40%
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
    h5
      font-size: 26px
      color: #a1047a
    h2
      font-size: 20px
      color: #000
      margin-block: 20px 10px
      line-height: 38px
    h4
      font-weight:500
      font-size: 18px
      color: #bb4b00
      margin-block: 20px 10px
    p
      font-size: 17px
      font-weight: 500
      color: #793702
      margin-bottom: 20px
      margin-top: 10px
  .cont-img
    width: 42%
    padding: 0 12px
    img
      width: 100%
.parent_child4
  padding: 80px 0 50px
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

.parent_child3
  padding: 80px 0 50px
  .child3-items
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    display: grid
    grid-template-columns: repeat(3, 1fr)
    .child3-item
      font-family: "Font Awesome 5 Pro"
      display: block
      color: #33355c
      margin: 0 12px 30px
      padding: 20px
      background-color: #00000000 !important
      h2
        font-size: 20px
        margin-bottom: 10px
      p
        font-size: 18px
        line-height: 35px
        
      .inner-dashed-border
        stroke-width: 3
        stroke-dasharray: 9, 4
        stroke: #72c0f0
        &:nth-child(2n)
          stroke: #f7c870
        &:nth-child(3n)
          stroke: #f9608c
.parent_child4
  padding: 80px 0 50px
  .child4-items
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    display: grid
    grid-template-columns: repeat(3, 1fr)
    .child4-item
      font-family: "Font Awesome 5 Pro"
      display: block
      color: #33355c
      margin: 0 12px 30px
      padding: 40px
      background-color: #00000000 !important
      .item
        img
          width: 100%
          padding: 30px 0
        &::before,&::after
          content: ''
          border: 2px dashed #d1d1d1
          position: absolute
          top: 0
          left: 0
          width: 50px
          height: 50px
          border-radius: 0px
          border-right-width: 0
          border-bottom-width: 0
          border-top-right-radius: 0
          border-bottom-left-radius: 0
          pointer-events: none
        &::after
          left: auto
          right: 0
          top: auto
          bottom: 0
          border-right-width: 2px
          border-bottom-width: 2px
          border-top-width: 0
          border-left-width: 0
          border-bottom-right-radius: 0
          border-top-left-radius: 0
          pointer-events: none
      h2
        font-size: 20px
        margin-bottom: 10px
      p
        font-size: 18px
        line-height: 35px
        
      .inner-dashed-border
        stroke-width: 3
        stroke-dasharray: 9, 4
        stroke: #d1d1d1

// 標題
.title
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center
  margin-bottom: 30px        
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
  .parent_child2
    .parent_child
      flex-direction: column-reverse
  .parent_child1,.parent_child2
    padding: 40px 0
    .parent_child
      flex-direction: column
      .cont-text
        width: 100%
        padding: 0 20px
      .cont-img
        width: 100%
  .parent_child3
    .child3-items
      grid-template-columns: repeat(1, 1fr)
  .parent_child4
    .child4-items
      grid-template-columns: repeat(1, 1fr)
  .parent_child4
    .culturebg2
      grid-template-columns: repeat(2, 1fr)
      .parent_child-bg 
        flex-direction: column
        padding: 0 20px
        .cont-text
          width: 100%
          padding: 0 20px
          margin-top: 20px
        .cont-img
          width: 100%
      .parent_child
        flex-direction: column
        padding: 0 20px
        .cont-text
          width: 100%
          padding: 20px
        .cont-img
          width: 100%
@media (max-width: 720px)
  .parent_child4
    .culturebg2
      grid-template-columns: repeat(1, 1fr)
</style>
