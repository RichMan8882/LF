<script setup>
const route = useRoute();


import culture1 from '@/assets/image/culture/culture-1.jpg'
import culture2 from '@/assets/image/culture/culture-2.jpg'
import culture3 from '@/assets/image/culture/culture-3.jpg'



const cultureLis = [{
  id: 1,
  src: culture1,
  title: '漢服專區',
  text: '讓漢服不只是一套衣服，而是一種生活'
}, {
  id: 2,
  src: culture2,
  title: '古蹟繪畫專區',
  text: '讓古蹟在童心中重生一筆一畫守護歷史，一顆童心傳承文化'
}, {
  id: 3,
  src: culture3,
  title: '書法專區',
  text: '不只是文字，更是一份情感的寄託，一段與自己與文化對話的旅程。'
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

const pageId = ref(route.query.id || '1');
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
  if (route.query.id) {
    navTile.value = (cultureLis.find(item => item.id === Number(pageId.value))).title
  }
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
    cont: ``
  }
]
const navTile = ref('')


const onNavGO = (id) => {
  console.log('navGO');
  navigateTo('/culture-detail?id=' + id)
  pageId.value = id
  navTile.value = (cultureLis.find(item => item.id === Number(pageId.value))).title
}
</script>

<template>
  <div class="culturepage">
    <ZwHeader :activeUrl="'/culture'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>文化特區</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item">{{ navTitl }}</li>
        </ol>
      </div>
    </div>
    <div class="culturebg-bg2">
      <div class="culturebg2">
        <div class="culturebg2-item">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <div class="culture-detail" v-if="pageId == '1'">
            <div class="post_caption">
              <h2 class="post_title">
                漢族服飾參與活動辦法：
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  找喜歡漢服、拍過漢服的同好或是沒有拍過想體驗看看的～我們將舉辦漢服體驗與交流活動，一起拍照、喝茶、聊文化，讓漢服不只是一套衣服，而是一種生活。</p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">「交領右衽，衣袂飄飄；一襲華服，千年風華。」</p>

                <p class="post_desc" style="font-size: 17px;">漢族服飾由來：<br>
                  漢服是指中漢族的傳統衣飾，又稱華服、漢裝、衣冠，「始於黃帝，備於堯舜」，定型於周朝，再發展至明末清初（西元17世紀中葉），有着數千年的歷史。</p>

                <p class="post_desc" style="font-size: 17px;">漢族服飾特色介紹：<br>
                  漢服擁有多個特點，其主要有交領右衽、大襟、寬衣博帶、繫帶隱扣等，以繩帶系結取代扣子，漢服注重的是舒適性和禮儀性，因此多為寬袖大袍，這不只使穿衣者身體能夠活動自如，也給他們溫暖，並起到禮儀的作用。<br>
                  每一件漢服的顏色、紋飾，都蘊含着不同的寓意：雲紋象徵祥瑞，花鳥寓意富貴長壽，色彩搭配更與季節、場合、身份息息相關。</p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">漢服必備元素示意圖</p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <p>交領右衽</p>
                      <img src="@/assets/image/culture/1-2.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <p>系帶暗扣</p>
                      <img src="@/assets/image/culture/1-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <p>平面剪裁</p>
                      <img src="@/assets/image/culture/1-4.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <p>中縫接袖</p>
                      <img src="@/assets/image/culture/1-5.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <p class="post_desc" style="font-size: 17px;">活動氛圍與拍攝元素：<br>
                  現場將融入古典庭院布景、梅蘭竹菊擺設、中式屏風與茶具，搭配簪花、玉佩、團扇等精緻配飾，讓每一張照片都宛如穿越千年的畫卷。</p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">

                      <img src="@/assets/image/culture/1-6.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">

                      <img src="@/assets/image/culture/1-7.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">

                      <img src="@/assets/image/culture/1-8.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">

                      <img src="@/assets/image/culture/1-9.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <p class="post_desc" style="font-size: 17px;">漢族服飾代表性作品：《大明風華》<br>
                  劇中漢服的形制主要有「上衣下裳」制（上衣和下裳分開，上身穿短衣，下身穿裙）、「深衣」制（上下縫合在一起）、「襦裙」制（襦，即短衣）等。色彩、紋樣和細節設計，也融入了明代服飾的特點，總而言之，《大明風華》劇組在服裝設計上，既尊重了漢服的基本形製和特點，又結合了明代服飾的風格，展現歷史的真實感和美感。
                </p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/1-10.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <p class="post_desc" style="font-size: 17px;">漢族服飾代表性作品：《長安十二時辰》<br>
                  在服裝設計上，對唐代服飾進行了深入研究與復原。劇中出現的漢服，主要以唐代男子的常服和禮服為主，包括幞頭、袍衫、圓領窄袖袍衫、大袖衫、圍裳等。這些服飾在形製、色彩、紋樣等方面，都力求還原唐代的風格和特質展現了唐代服飾的魅力，也讓更多人了解了漢服的文化內涵。
                </p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/1-11.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
          <div class="culture-detail" v-if="pageId == '2'">
            <div class="post_caption">
              <h2 class="post_title">
                古蹟繪畫專區參與活動辦法：
              </h2>
              <img src="@/assets/image/culture/2-2.jpg" alt="">
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  為了讓更多孩子認識與珍惜我們的文化資產，我們特別舉辦「童畫古蹟」繪畫比賽，邀請小朋友用畫筆描繪出心中的淡水紅毛城與安平古堡，讓歷史透過童真的視角被看見、被記住。</p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  活動辦法：請小朋友繪畫紅毛城與安平古堡，拍照上傳。參加即可獲得獎勵金200元，第一名者則可領取大獎1000元！！</p>

                <p class="post_desc" style="font-size: 17px;">
                  邀請每一位小朋友用創意與色彩守護我們的文化寶藏！讓古蹟在童心中重生一筆一畫守護歷史，一顆童心傳承文化不讓古蹟被遺忘，從孩子的畫裡看見未來!<br>
                </p>

                <p class="post_desc" style="font-size: 17px;">「畫出記憶，留住歷史」<br>
                  「畫我所見，守我所愛」</p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/2-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">

                      <img src="@/assets/image/culture/2-4.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>


                <p class="post_desc" style="font-size: 17px;">紅毛城（Fort San
                  Domingo）位於台灣新北市淡水區，是台灣保存最完整的西式古蹟之一。建於1629年，最初由西班牙人建立，後來歷經荷蘭人、清朝、英國等多方統治與使用，具有多重文化歷史背景。建築融合西洋與在地風格，曾作為領事館與軍事據點，現為重要觀光景點與歷史教育場所。
                </p>

                <p class="post_desc" style="font-size: 17px;">安平古堡（Fort
                  Zeelandia）位於台南市安平區，是台灣最早的西式城堡之一，由荷蘭東印度公司於1624年建造。當時是荷蘭在台灣的統治中心。1662年鄭成功攻下該城，結束荷蘭統治。古堡現今保留部分城牆與遺跡，並設有展示館，是重要的歷史古蹟與觀光景點。
                </p>

                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
          <div class="culture-detail" v-if="pageId == '3'">
            <div class="post_caption">
              <h2 class="post_title">
                書法專區參與活動辦法：
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  在靜謐的紙上，落下一筆，墨香便悄然蔓延。
                  <br>
                  書法，不只是文字，更是一份情感的寄託，一段與自己、與文化對話的旅程。
                </p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  我們誠摯邀請每一位熱愛書法的人，在比賽中用心書寫屬於自己的節奏與故事，讓筆端的溫度，將漢字之美細細傳遞。</p>

                <p class="post_desc" style="font-size: 17px;">一筆一心，一字一情，讓文化在墨色中綻放。</p>
                <p>活動辦法：
                  <br>
                  作品規範
                </p>
                <p class="post_desc" style="font-size: 17px;color: #025706;">
                  1. 主題不限，必須為本人原創作品（不可抄襲他人作品，否則取消資格）。<br>
                  2. 書法種類：毛筆書法或硬筆書法皆可。<br>
                  3. 作品需清晰拍攝或掃描，存為 JPG/PNG 檔。<br>
                  3. 作品需清晰拍攝或掃描，存為 JPG/PNG 檔。
                </p>
                <p class="post_desc" style="font-size: 17px;">參加方式</p>
                <p class="post_desc" style="font-size: 17px;color: #025706;">
                  1. 完成作品後，將作品照片或掃描檔上傳至指定表單（或官方聯絡方式）。<br>
                  2. 上傳時需附以下資料：<br>
                  姓名（或筆名）<br>
                  聯絡方式（LINE、Email、手機） <br>
                  作品簡介（20~50 字，可寫創作理念）<br>
                  3. 主辦單位確認資料無誤後，回覆參加成功訊息。
                </p>
                <p class="post_desc" style="font-size: 17px;">獎勵辦法</p>
                <p class="post_desc" style="font-size: 17px;color: #025706;">
                  ● 第一名：NT$ 1,000 元獎金<br>
                  ● 參加獎：凡成功提交作品並符合規範者，即可獲得 NT$ 200 元獎金
                </p>
                <p class="post_desc" style="font-size: 17px;">書法的由來，可以追溯到 文字誕生 與 書寫工具的演變，它不只是寫字的方法，而是結合了藝術、美感與文化的表現方式。
                </p>
                <img src="@/assets/image/culture/3-2.jpg" alt="" style="margin-bottom: 20px;">
                <p class="post_desc" style="font-size: 17px;">
                  書法的起源 <br>
                  文字的發明<br>
                  最早的中國文字源於 甲骨文（約公元前 1200 年，商朝），刻在龜甲與獸骨上，用於占卜。後來發展出青銅器上的
                  金文（銘刻文字）。書寫材料的改變西周、春秋戰國時期，開始用竹簡、木牘與帛布作為書寫載體，文字逐漸有筆意。秦朝統一文字，形成 小篆，是中國書法走向規範化的重要一步。 毛筆與書法藝術的誕生。相傳毛筆由
                  蒙恬發明（秦朝），但其實毛筆在更早的戰國時期就已經存在。有了毛筆，文字開始具備更多筆劃變化與藝術性，書法也從「實用」轉向「藝術」。
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  書法的意義 <br>
                  文化承載：書法是漢字文化的重要載體，保留了歷史與思想。<br>
                  美學價值：筆劃的粗細、節奏、布局都富有藝術性。<br>
                  修身養性：古人認為書法能培養耐心、專注與心境。
                </p>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/3-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/3-4.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/3-5.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/culture/3-6.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>

                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="culturebg2-item">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <div class="whtq">
            <div class="title">
              文化特區
            </div>
            <ul class="whtq_lis">
              <li v-for="(item, index) in cultureLis">
                <div class="user">
                  <a>
                    <img :src="item.src" class="image-fit" alt="img">
                  </a>
                  <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                    <rect width="100%" height="100%"></rect>
                  </svg>
                </div>
                <div class="post_caption">
                  <h6 class="post_title" @click="onNavGO(item.id)"><a>{{
                    item.text }}</a>
                  </h6>
                  <div class="post_date">
                    {{ item.title }}
                  </div>
                </div>
              </li>

            </ul>
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
    display: grid
    grid-template-columns: 2fr 1fr
    align-items: flex-start
    gap: 0px
    .culturebg2-item
      position: relative
      padding: 20px
      margin-bottom: 30px
      margin-inline: 12px
      .post_caption
        padding: 20px 0 0
        &>img
          margin-bottom: 20px
        h2.post_title
          font-size: 32px
          margin-bottom: 10px
          font-weight: 700
        p
          font-size: 17px
          margin-bottom: 15px
        .row
          --bs-gutter-x: 1.5rem
          --bs-gutter-y: 0
          display: flex
          flex-wrap: wrap
          margin-top: calc(-1 * var(--bs-gutter-y))
          margin-right: calc(-.5 * var(--bs-gutter-x))
          margin-left: calc(-.5 * var(--bs-gutter-x))
          &>*
            max-width: 100%
            padding-right: calc(var(--bs-gutter-x) * .5)
            padding-left: calc(var(--bs-gutter-x) * .5)
            margin-top: var(--bs-gutter-y)
        .col-sm-6
          p
            color: #959595
            font-size: 14px
          @media (min-width: 576px)
            flex: 0 0 auto
            width: 50%
            
        .blog_gallry_img
          margin-bottom: 15px
          border-radius: 0px
          position: relative
          overflow: hidden
        .image-fit
          width: 100%
          height: 100%
          object-fit: cover
          object-position: center
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
      .whtq
        .title
          line-height: normal
          margin-bottom: 20px
          text-align: center
          text-transform: uppercase
          font-size: 18px
          background-color: #72c0f0
          color: white
          padding: 10px 0
          border-radius: 0px
        .whtq_lis
          li
            display: flex
            align-items: center
            margin-bottom: 20px
            gap: 5px
            .post_title
              transition: all .3s
              &:hover
                color: #fa608c
            .post_date
              font-size: 14px
            .post_caption
              padding: 0 !important
            .user
              padding: 12px
              background: #00000000
              &:hover
                background-color: #00000000 !important
                border-color: transparent
              .image-fit
                width: 60px
                height: 60px
                min-width: 60px
              .inner-dashed-border
                stroke: #72c0f0
                stroke-dasharray: 9, 4
                stroke-width: 3
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


</style>
