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
    <ZwHeader :activeUrl="'/founder'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>創辦人簡介</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item">創辦人簡介</li>
        </ol>
      </div>
    </div>
    <div class="parent_child1">
      <div class="parent_child">
        <div class="cont-text">
          <h1 style="color: #bb4b00;">創辦人簡介 — Roland</h1>
          <h3>
            Roland先生為本機構的創辦人與靈魂人物，長期致力於推動社會公益與產業創新，憑藉深厚的專業背景與前瞻視野，帶領團隊在不同領域中持續開創價值。自創立以來，他秉持「以人為本、以創新為動力」的理念，致力於結合社會責任與可持續發展，推動機構在穩健成長的同時，也積極回饋社會。
          </h3>
          <p>
            在創立本機構之前，Roland先生累積了多年跨領域經驗，涵蓋企業管理、策略規劃、資源整合與組織營運。他深知在瞬息萬變的時代中，唯有不斷創新、掌握趨勢，才能引領機構持續向前。因此，他積極引進多元化的經營模式，並透過數位化與系統化的管理思維，提升團隊效率與服務品質。
          </p>
          <p>
            作為一位兼具遠見與實踐精神的領導者，Roland先生非常重視人才培育與團隊凝聚。他相信「成就他人，才能成就自己」，因此在機構內部，他營造開放、合作與互信的文化，鼓勵每位成員勇於發揮專長、提出創新想法，讓機構在競爭激烈的環境中保持活力與優勢。
          </p>
          <p>同時，Roland先生也關注社會弱勢與永續發展議題。他積極參與公益項目，推動教育、環境保護與社會救助等計畫，期望透過機構的力量，凝聚更多資源與社會關注，實現「取之於社會，用之於社會」的使命。</p>
          <p>在他的帶領下，本機構已從初創階段穩步邁向成熟，並在業界建立良好口碑。未來，鐘微霖先生將持續以堅定的信念與創新的思維，引領機構邁向更高的成就，攜手夥伴共創更美好的未來。</p>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/founder/founder01.png" alt="">
        </div>
      </div>
    </div>
    <div class="parent_child2">
      <div class="parent_child">
        <div class="cont-img">
          <img src="@/assets/image/founder/founder02.png" alt="">
        </div>
        <div class="cont-text">
          <p>
            除了專注於機構經營與公益實踐，Roland先生亦積極投身知識傳遞與專業交流，長年受邀於各類論壇、研討會及產學合作計畫中擔任主講嘉賓，分享其在社會企業經營、資源整合及永續發展領域的獨到見解與實務經驗。他曾於 2023
            年「亞洲社會創新高峰會」（台北）以「跨界合作與永續影響力」為題，探討如何結合企業資源與社會需求，創造長期價值；亦於 2024
            年「青年領袖公益論壇」（高雄）中，以「從理念到行動：打造可持續的公益模式」為主題，啟發新世代青年投入社會創新。此外，他多次受邀至國內多所大專院校，包括國立台灣大學、國立雲林科技大學等，開設創業與公益專題講座，透過真實案例分析與互動討論，引導學生培養解決問題的能力與社會責任感。這些經歷不僅擴展了他的影響力，也使更多不同世代與背景的聽眾，能夠從中獲得啟發與行動動力。
          </p>
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
  background: url(@/assets/image/founder/founder.jpg) no-repeat center bottom / cover
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
      font-size: 18px
      margin-top: 16px
      margin-bottom: 25px
    h4
      font-weight:500
      font-size: 18px
      color: #bb4b00
      margin-block: 20px 10px
    p
      font-size: 17px
      font-weight: 500
      color: #000
      line-height: 30px
  .cont-img
    width: 42%
    padding: 0 12px 0 12px
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
  .parent_child2
    .parent_child
      flex-direction: column
  .parent_child1,.parent_child2
    padding: 40px 0
    .parent_child
      flex-direction: column-reverse
      .cont-text
        width: 100%
        padding: 0 20px
        margin-top: 20px
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
          padding: 20px
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
