<script setup>
import pet01 from '@/assets/image/pet/pet01.jpg'
import pet02 from '@/assets/image/pet/pet02.jpg'
import pet03 from '@/assets/image/pet/pet03.jpg'
import pet04 from '@/assets/image/pet/pet04.jpg'
import pet05 from '@/assets/image/pet/pet05.jpg'
import pet06 from '@/assets/image/pet/pet06.jpg'
import pet07 from '@/assets/image/pet/pet07.jpg'
import pet08 from '@/assets/image/pet/pet08.jpg'
import pet09 from '@/assets/image/pet/pet09.jpg'
import pet10 from '@/assets/image/pet/pet10.jpg'
import pet11 from '@/assets/image/pet/pet11.jpg'

const petChilLis = [{
  id: 1,
  src: pet01,
  title: '幫助浪浪-台中市南屯區',
  text: '正在餵一隻小橘貓吃雞肉,確保牠有飽足感,也順便觀察牠的健康狀況,希望牠能安心地在這裡生活。',
  cont: ''
}, {
  id: 2,
  src: pet02,
  title: '幫助浪浪-高雄市壽山森林區',
  text: '正在為牠做的事:志工們正在森林裡為一群流浪狗分發食物,確保牠們在山區中也能獲得飽足與關愛,同時觀察牠們的健康狀況。'
}, {
  id: 3,
  src: pet03,
  title: '幫助浪浪-台中忠明路街角',
  text: '深夜街頭替浪浪準備溫暖宵夜,讓他在寒冷的夜裡 也可以有一絲溫暖!'
},
{
  id: 4,
  src: pet04,
  title: '幫助浪浪-嘉義文化路巷口',
  text: '清晨替街貓補滿一天的第一餐，能為浪浪做的東西不多，但我們願意盡全力!'
},
{
  id: 5,
  src: pet05,
  title: '幫助浪浪-花蓮壽豐鄉社區中心後方停車場',
  text: '團隊第一次跑這麼遠,不過這一切辛苦也是值得的,花蓮的浪浪我們來了喔!'
},
{
  id: 6,
  src: pet06,
  title: '幫助浪浪-台南仁德犬隻保護園區',
  text: '中午時分替園區裡的狗狗準備營養餐,讓牠們在遮陽棚下安心享用,讓牠們也有一個地方可以安心吃飯'
}]
const petChilLis2 =
  [{
    id: 7,
    src: pet07,
    title: '待領養資料-1',
    name: '仙草',
    variety: '台灣土狗',
    area: '南投草屯',
    sex: '母',
    color: '黑色/左胸口有一條白線',
    text: '已打基礎疫苗(5合1或10合1)、狂犬病疫苗、萊姆病疫苗、梨形鞭毛蟲疫苗'
  },
  {
    id: 8,
    src: pet08,
    title: '待領養資料-2',
    name: '拿鐵',
    age: '2個月',
    variety: '台灣土狗',
    area: '南投草屯',
    sex: '母',
    color: '米色',
    text: '已打基礎疫苗(5合1或10合1)、狂犬病疫苗、萊姆病疫苗、梨形鞭毛蟲疫苗'
  },
  {
    id: 9,
    src: pet09,
    title: '待領養資料-3',
    name: '虎妞',
    variety: '雪納瑞',
    age: '3個月',
    area: '台北萬華',
    sex: '母',
    color: '胡椒色',
    text: '第一劑疫苗打完、結紮、有晶片、親人'
  },
  {
    id: 10,
    src: pet10,
    title: '待領養資料-4',
    name: 'TOTO',
    variety: '台灣土狗',
    age: '3歲',
    area: '台中',
    sex: '公',
    color: '黃橘色',
    text: '坐下、握手、換手、會顧家,不會亂吠,熱情和人相處非常融洽。全能狗S, 有打8合一疫苗,狂犬疫苗。'
  },
  {
    id: 11,
    src: pet11,
    title: '待領養資料-5',
    name: '多多',
    variety: '馬爾濟斯',
    age: '4個月',
    area: '桃園',
    sex: '母',
    color: '純白',
    text: '已打基礎疫苗(5合1或10合1)、狂犬病疫苗、萊姆病疫苗、梨形鞭毛蟲疫苗'
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
    <ZwHeader :activeUrl="'/pet'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>寵物專區</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item">寵物專區</li>
        </ol>
      </div>
    </div>
    <div class="parent_child1">
      <div class="child1-title">
        <div class="subtitle">
          Pet Zone
        </div>
        <div class="title">
          <h2>寵物專區</h2>
          <h5></h5>
        </div>
      </div>
      <div class="parent_child">
        <div class="cont-text">
          <h1>關於我們-</h1>
          <p>
            我們是一個專為無家可歸的貓狗提供庇護與照顧的溫暖港灣。
          </p>
          <p>
            許多流浪動物因受傷、生病、被棄養或走失而流落街頭,面臨飢餓、疾病及惡劣
            環境的威脅。我們的使命,是為牠們提供一個安全的棲身之所,讓牠們獲得足夠的食物、完善的醫療照護,以及耐心的陪伴與社會化訓練,幫助牠們重新建立對人類的信任。
          </p>
          <p>在這裡,每一隻動物都有屬於自己的故事,或許曾經受過傷害,卻依然渴望愛與歸屬。</p>
          <p>
            我們相信,「領養代替購買」不僅能改變牠們的命運,也能讓更多人感受到生命的珍貴與溫度。
          </p>
          <p>因此,我們定期舉辦領養活動與宣導教育,讓更多人認識流浪動物的處境,並參與改善牠們生活的行動。</p>
          <p>流浪動物之家不只是收容所,更是牠們通往新生活的起點。</p>
          <p>我們邀請您用行動支持,不論是領養、捐款、物資捐贈,或是成為志工,都能為這 些小生命點亮希望的燈火。</p>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/pet/pet01.png" alt="">
        </div>
      </div>
    </div>

    <div class="parent_child2">

    </div>

    <div class="parent_child4">
      <div class="culturebg2">
        <div class="culturebg2-item" v-for="(item, index) in petChilLis" :key="index">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <img :src="item.src" alt="">
          <div class="item-cont">
            <h1>{{ item.title }}</h1>
            <p>{{ item.text }}</p>
            <!-- <div @click="navigateTo('/culture-detail?id=' + item.id)" class="user">瞭解更多
              <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                <rect width="100%" height="100%"></rect>
              </svg>
            </div> -->
          </div>
        </div>
      </div>
      <div class="parent_child parent_child-bg">
        <div class="cont-text">
          <h1>幫助浪浪們-</h1>
          <p>
            你願意幫幫我們嗎?你們覺得微不足道的幫助對我們來說會是不一樣的下面，有可以幫助我們的連結，謝謝你們!
          </p>
          <p>
            捐款連結:
          </p>
          <h2><a href="https://www.ntpsa.org.tw/donations1/">https://www.ntpsa.org.tw/donations1/</a></h2>
          <h2><a href="https://hsapf.org.tw/donate/">https://hsapf.org.tw/donate/</a></h2>
          <h2><a href="https://donation.savedogs.org/">https://donation.savedogs.org/</a></h2>
          <h2><a href="https://kitanimals.neticrm.tw">https://kitanimals.neticrm.tw</a></h2>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/pet/pet02.png" alt="">
        </div>
      </div>
      <div class="culturebg2">
        <div class="culturebg2-item" v-for="(item, index) in petChilLis2" :key="index">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <img :src="item.src" alt="">
          <div class="item-cont">
            <h1>{{ item.title }}</h1>
            <h5>-名稱:{{ item.name }}</h5>
            <h5>-品種:{{ item.variety }}</h5>
            <h5>-年齡:{{ item.age }}</h5>
            <h5>-地點:{{ item.area }}</h5>
            <h5>-性別:{{ item.sex }}</h5>
            <h5>-毛色:{{ item.color }}</h5>
            <h5>備註:{{ item.text }}</h5>
          </div>
        </div>
      </div>
      <div class="parent_child">
        <div class="cont-text">
          <h1>全國動物收容中心-</h1>
          <p>
            全國的收容中心不少，其中有許多浪浪正在等待一個溫暖的家，只要一個機緣，就可以為牠帶來無比的幸福!
          </p>
          <h5>
            <a href="https://www.pet.gov.tw/AnimalApp/ShelterMap.aspx" target="_blank"
              style="background-color: antiquewhite;padding: 10px;">進入查詢收容中心</a>
          </h5>
          <p>
            領養代替購買，可以幫助更多浪浪給予愛的關懷，世界上因為有愛，才會更美好!
          </p>
        </div>
        <div class="cont-img">
          <img src="@/assets/image/pet/pet03.png" alt="">
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
  background: url(@/assets/image/pet/pet.jpg) no-repeat center bottom / cover
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
  .child1-title
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
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
      font-size: 22px
      color: #0022bb
      margin-bottom: 5px
    h2
      color: #33355c
      font-size: 16px
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
    h5
      display: inline-block
      margin-block: 20px
      background-color: antiquewhite
      padding: 10px
      transition: all .2s ease
      &:hover
        color: #f9608c
    p
      font-size: 16px
      font-weight: 500
      color: #7e2e00
      margin-top: 10px
  .cont-img
    width: 42%
    padding: 0 12px
    img
      width: 100%

.parent_child4
  padding: 0px 0 50px
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
      color: #33355c
      margin-bottom: 30px
      img
        width: 100%
      .item-cont
        padding: 20px 0 0
        
        h1
          font-size: 20px
          margin-bottom: 10px
          font-weight: 700
        h5
          color: #33355c
          font-size: 14px
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
  .parent_child-bg
    .cont-text
      background: #fff2e2
      padding: 20px 10px
    .cont-img
      padding: 0 40px
  .parent_child
    padding: 20px 0
    align-items: flex-start
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
  .parent_child1
    padding: 40px 0
    .parent_child
      flex-direction: column
      .cont-text
        width: 100%
        padding: 0 20px
      .cont-img
        width: 100%
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
