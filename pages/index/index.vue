<script setup>
import swp1 from '@/assets/image/index/swp1.png'
import swp2 from '@/assets/image/index/swp2.png'
import swp3 from '@/assets/image/index/swp3.png'
import swp4 from '@/assets/image/index/swp4.png'

import event1 from '@/assets/image/index/home-event1.jfif'
import event2 from '@/assets/image/index/home-event2.jfif'
import event3 from '@/assets/image/index/home-event3.jfif'
import event4 from '@/assets/image/index/home-event4.jfif'

const slides = [{
  src: swp1,
  title: '漢服活動招募令',
  text: ['讓愛傳遞，衣起做愛心，用愛溫暖全世界!', '此公益主要為了環境保護及資源再利用工作', '使之發揮取之於社會，回饋予社會。']
}, {
  src: swp2,
  title: '永生花乾燥花體驗',
  text: ['製作獨一無二的作品，為愛發聲!', '此公益體驗主要為了資源再利用與提供職位的體驗!', '輕鬆上課，簡易上手。']
}, {
  src: swp3,
  title: '手沖咖啡DIY手作體驗',
  text: ['讓愛傳遞，為忙碌的人們加油打氣!', '透過一杯杯手作手沖的心意', '一同為無私奉獻的義工們加油']
}, {
  src: swp4,
  title: '豆花DIY手作體驗',
  text: ['透過溫暖手作發送愛!甜進心頭!', '可透過課程學習製作豆花的知識外', '也可以為需要的人提供一點溫飽']
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
    console.log('window', window.innerWidth)
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


const activeimg = ref('')

const showPopup = ref(false)

const onOpenPopup = (url) => {
  if (url) {
    activeimg.value = url
    showPopup.value = true
  }
}
const onClosePopup = () => {
  showPopup.value = false
  activeimg.value = ''
}

</script>

<template>
  <div class="homepage">
    <ZwHeader :activeUrl="'/'" :nav-fixed="scrollTop > 95" />
    <div class="homebg-bg1">
      <img src="@/assets/image/index/home-up1.png" class="bg-icon-1">
      <img src="@/assets/image/index/home-up2.png" class="bg-icon-2">
      <img src="@/assets/image/index/home-up4.png" class="bg-icon-4">
      <div class="homebg1 view-auto">
        <img src="@/assets/image/index/home-up3.png" class="bg-icon-3">
        <div class="bg1-left">
          <h3>
            愛與關懷的世界
          </h3>
          <h1>用愛與行動<span class="thm-color-three">守護</span>我們的一切</h1>
          <p class="text">支持弱勢家庭與教育、守護環境、關懷流浪動物</p>
          <div @click="navigateTo('/game')" class="user">加入我們
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
        <div class="bg1-right">
          <img src="@/assets/image/index/home-right2.png" alt="">
        </div>
      </div>
    </div>
    <div class="">
      <div class="homebg2">
        <div class="homebg2-item" @click="navigateTo('/parent-child')">
          <svg t="1759033115304" class="icon" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2090">
            <path
              d="M1081.99936 458.32192c3.3024 2.65216 5.98016 8.23808 5.98016 12.47744 0 3.12832-1.59744 7.63392-3.56352 10.06592l-20.1984 24.82176c-2.65216 3.25632-8.21248 5.90336-12.41088 5.90336-3.13344 0-7.6544-1.60256-10.0864-3.584L960 441.24672v486.09792c0 17.664-14.336 32-32 32l-256 0.66048c-17.664 0-32-14.336-32-32V671.8464l-128-0.59904v256c0 17.664-14.336 32-32 32h-256c-17.664 0-32-14.336-32-32V441.24672L110.27968 508.0064c-2.42176 1.94048-6.89664 3.51232-9.99936 3.51232-4.19328 0-9.74848-2.6368-12.40064-5.89312l-20.20352-24.81664c-1.9712-2.432-3.57376-6.94784-3.57376-10.07616 0-4.19328 2.64192-9.7536 5.89312-12.40064l465.61792-380.04224c9.75872-7.86944 27.84768-14.25408 40.38144-14.25408s30.62272 6.38464 40.38144 14.25408l279.61856 228.23936V203.86816a12.0064 12.0064 0 0 1 12.00128-12.00128h40.00256a12.0064 12.0064 0 0 1 12.00128 12.00128v154.8032z m-186.21952 437.17632L896 389.0176l-320-261.14048L256 389.0176v506.48064h191.97952v-256.2816c0-17.664 14.336-32 32-32h0.1024l192 0.5376c17.55648 0.10752 31.8464 14.44352 31.8976 32v256.33792l191.80032-0.59904z"
              p-id="2091"></path>
          </svg>
          <div>
            <h2>
              用關懷傳遞愛
            </h2>
            <p>
              給予像家一樣的溫暖
            </p>
          </div>
          <div class="more">
            瞭解更多
            <svg t="1759033318573" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4008">
              <path
                d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
                fill="" p-id="4009"></path>
            </svg>
          </div>
        </div>
        <div class="homebg2-item" @click="navigateTo('/pet')">
          <svg t="1759032714238" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="8657">
            <path
              d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
              p-id="8658"></path>
          </svg>
          <div>
            <h2>
              用心的力量
            </h2>
            <p>
              為更多人加油
            </p>
          </div>
          <div class="more">
            瞭解更多
            <svg t="1759033318573" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4008">
              <path
                d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
                fill="" p-id="4009"></path>
            </svg>
          </div>
        </div>
        <div class="homebg2-item" @click="navigateTo('/guardian')">
          <svg t="1759032843101" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="17641">
            <path
              d="M512 970.105263a458.105263 458.105263 0 1 1 458.105263-458.105263 458.105263 458.105263 0 0 1-458.105263 458.105263z m0-862.315789a404.210526 404.210526 0 1 0 404.210526 404.210526A404.210526 404.210526 0 0 0 512 107.789474z"
              p-id="17642"></path>
            <path
              d="M512 749.136842a235.52 235.52 0 0 1-167.612632-69.52421 26.947368 26.947368 0 1 1 37.99579-37.99579 183.242105 183.242105 0 0 0 258.96421 0 26.947368 26.947368 0 0 1 37.99579 37.99579A235.52 235.52 0 0 1 512 749.136842zM368.370526 500.412632a26.947368 26.947368 0 0 1-26.947368-26.947369 39.343158 39.343158 0 0 0-78.95579 0 26.947368 26.947368 0 0 1-53.894736 0 93.237895 93.237895 0 0 1 186.745263 0 26.947368 26.947368 0 0 1-26.947369 26.947369zM788.48 500.412632a26.947368 26.947368 0 0 1-26.947368-26.947369 39.343158 39.343158 0 0 0-78.95579 0 26.947368 26.947368 0 0 1-53.894737 0 93.237895 93.237895 0 0 1 186.745263 0 26.947368 26.947368 0 0 1-26.947368 26.947369z"
              p-id="17643"></path>
          </svg>

          <div>
            <h2>
              溫暖的微笑
            </h2>
            <p>
              也可以綻放出未來
            </p>
          </div>
          <div class="more">
            瞭解更多
            <svg t="1759033318573" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4008">
              <path
                d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
                fill="" p-id="4009"></path>
            </svg>
          </div>
        </div>
        <div class="homebg2-item" @click="navigateTo('/login')">
          <svg t="1759032976673" class="icon" viewBox="0 0 1264 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1970">
            <path
              d="M1222.469818 895.379394c0 47.693576-38.671515 86.512485-86.225454 86.512485h-224.015516V670.626909H1222.469818v224.752485z m-310.24097-311.156364H1220.32097c-7.641212 29.874424-34.707394 52.037818-66.839273 52.037818h-241.252849v-52.045575z m168.455758-189.137454l18.641455 18.695757a126.851879 126.851879 0 0 1 28.152242 136.083394H934.865455l145.819151-154.779151zM878.002424 636.260848H569.902545c7.641212-29.889939 34.707394-52.045576 66.839273-52.045575H878.002424v52.045575z m0 345.631031H567.753697V757.123879c0-47.693576 38.671515-86.49697 86.225455-86.49697h224.015515v311.26497zM386.482424 325.135515H627.74303c0.434424 0 0.822303-0.116364 1.256728-0.116363h67.731394v33.815272l0.294787 0.178424-30.355394 30.456243A161.349818 161.349818 0 0 0 626.812121 550.873212c-52.208485 5.096727-93.323636 48.857212-93.323636 102.555152 0 9.510788 7.687758 17.198545 17.144242 17.198545h19.370667a120.60703 120.60703 0 0 0-36.507152 86.49697v224.768H386.482424v-656.756364z m0-86.419394H694.582303c-7.524848 29.44-33.885091 51.238788-65.365333 51.929212H386.490182v-51.921454z m168.455758-189.129697l18.641454 18.695758a126.890667 126.890667 0 0 1 28.152243 136.091151H409.126788L554.945939 49.586424z m300.412121 500.278303H662.745212a126.882909 126.882909 0 0 1 28.16-136.083394l18.618182-18.695757L855.350303 549.85697zM352.256 290.645333H128.232727c-0.861091 0-1.667879 0.100848-2.521212 0.116364H44.163879c7.641212-29.882182 34.707394-52.037818 66.839273-52.037818H352.256v51.921454z m0 691.246546H42.01503V411.508364c0-47.259152 38.004364-85.682424 84.968728-86.372849h225.272242v656.756364zM165.158788 68.282182l18.641454-18.695758L329.619394 204.373333H136.998788a126.890667 126.890667 0 0 1 28.16-136.083394z m1074.424242 567.978666h-9.852121c16.601212-18.385455 26.996364-42.511515 26.996364-69.220848 0-9.487515-7.68-17.175273-17.144243-17.175273h-75.962182c16.92703-56.110545 2.249697-117.915152-40.067878-160.395636l-31.084606-31.185455a16.934788 16.934788 0 0 0-12.350061-5.019151 17.051152 17.051152 0 0 0-12.218182 5.376l-172.792242 183.396848L730.996364 367.825455V307.820606a17.144242 17.144242 0 0 0-17.144243-17.175273h-9.743515c16.523636-18.385455 26.887758-42.457212 26.887758-69.096727a17.144242 17.144242 0 0 0-17.144243-17.175273h-75.954424c16.919273-56.118303 2.249697-117.915152-40.075636-160.395636l-31.084606-31.185455A17.128727 17.128727 0 0 0 554.612364 7.757576h-0.232728a17.097697 17.097697 0 0 0-12.218181 5.383757L369.37697 196.545939 196.57697 13.141333A17.128727 17.128727 0 0 0 184.366545 7.757576c-4.569212-0.155152-9.076364 1.745455-12.35006 5.026909l-31.084606 31.185454a161.349818 161.349818 0 0 0-39.858424 161.411879C48.872727 210.478545 7.757576 254.23903 7.757576 307.960242c0 9.487515 7.68 17.175273 17.144242 17.175273h19.223273A120.661333 120.661333 0 0 0 7.757576 411.508364v587.558788c0 9.487515 7.68 17.175273 17.144242 17.175272h1111.342546c66.428121 0 120.482909-54.217697 120.482909-120.86303V653.436121c0-9.487515-7.68-17.175273-17.144243-17.175273z"
              p-id="1971"></path>
          </svg>
          <div>
            <h2>
              用自己的能力
            </h2>
            <p>
              幫助需要的人
            </p>
          </div>
          <div class="more">
            瞭解更多
            <svg t="1759033318573" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4008">
              <path
                d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"
                fill="" p-id="4009"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="homebg3">
        <ZwSlider :slides="slides" />
      </div>
    </div>
    <div class="homebg-bg2">
      <div class="homebg4">
        <div class="left-img">
          <img src="@/assets/image/index/home-left1.png" alt=""></img>
        </div>
        <div class="right-text">
          <p class="subtitle">About Us</p>
          <h1>我們的使命與願景</h1>
          <h3 class="text1">我們的使命</h3>
          <h3>我們致力於推動人群關懷、環境守護與動物關懷三大公益方向，凝聚社會力量，讓愛心成為改變的動力。我們相信，每一個微小的行動，都能累積成影響世界的力量。</h3>
          <h3 class="text2">我們的願景</h3>
          <h3>打造一個溫暖、可持續且充滿希望的社會。無論是為弱勢家庭帶來援助，守護地球的生態環境，或是為流浪動物找回歸屬感，我們都希望讓更多人參與，讓公益成為生活的一部分。</h3>
          <div @click="navigateTo('/founder')" class="user">創辦人簡介
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="homebg5">
        <div class="title">
          <p class="subtitle">Partner</p>
          <h2>合作夥伴</h2>
          <h5>感謝所有支持我們公益行動的夥伴與朋友</h5>
        </div>
        <div class="partner-items">
          <div class="item">
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <div class="img-box">
              <img src="@/assets/image/index/partner-1.png" alt=""></img>
            </div>
          </div>
          <div class="item">
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <div class="img-box">
              <img src="@/assets/image/index/partner-2.png" alt=""></img>
            </div>
          </div>
          <div class="item">
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <div class="img-box">
              <img src="@/assets/image/index/partner-3.png" alt=""></img>
            </div>
          </div>
        </div>
        <div class="partner-video">
          <video autoplay muted loop>
            <source src="https://upload.comethike.com/uploads/1759050107440.mp4">
            </source>
          </video>
        </div>
      </div>
    </div>
    <div class="">
      <div class="homebg6">
        <div class="home-header">
          <div class="title">
            <p class="subtitle">Event photos</p>
            <h2>親子與照護花絮</h2>
          </div>
          <div @click="navigateTo('/founder')" class="user">親子活動區
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
        <div class="homebg6-items">
          <div class="h-item h-item1">
            <a class="popup-image thm-bg-color-four" @click="onOpenPopup(event1)">
              <i class="fa-solid fa-plus"></i>
            </a>
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <img :src="event1" alt=""></img>
          </div>
          <div class="h-item h-item2">
            <a class="popup-image thm-bg-color-four" @click="onOpenPopup(event2)">
              <i class="fa-solid fa-plus"></i>
            </a>
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <img :src="event2" alt=""></img>
          </div>
          <div class="o-item">
            <div class="m-item m-item1">
              <a class="popup-image thm-bg-color-four" @click="onOpenPopup(event3)">
                <i class="fa-solid fa-plus"></i>
              </a>
              <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                <rect width="100%" height="100%"></rect>
              </svg>
              <img :src="event3" alt=""></img>
            </div>
            <div class="m-item m-item2">
              <a class="popup-image thm-bg-color-four" @click="onOpenPopup(event4)">
                <i class="fa-solid fa-plus"></i>
              </a>
              <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                <rect width="100%" height="100%"></rect>
              </svg>
              <img :src="event4" alt=""></img>
            </div>
          </div>
        </div>
      </div>
      <!-- 圖片預覽 -->
      <div class="popup-overlay" v-if="showPopup" @click.self="onClosePopup">
        <div class="popup-content">
          <span class="close-popup" @click="onClosePopup">
            <i class="fa-solid fa-xmark" style="width: 20px;height: 20px;color: #fff;"></i>
          </span>
          <img :src="activeimg" alt="">
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
// 


.homepage
  background-color: #ffffff
  position: relative
  .homebg-bg1
    background-image: url(@/assets/image/index/zwbgimg.png)
    .bg-icon-1
      position: absolute
      left: 0
      top: 0
      width: 300px
      transform: translate(-30%, -50%)
    .bg-icon-2
      position: absolute
      right: 80px
      top: 80px
      width: 60px
    .bg-icon-4
      position: absolute
      bottom: 5%
      left: 80px
      width: 80px
      z-index: 0
  .homebg1
    position: relative
    max-width: 100%
    min-height: 666px
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding: 65px 0
    display: flex
    align-items: center
    justify-content: space-between
    .bg-icon-3
      position: absolute
      left: 25%
      top: 130px
      width: 80px
      z-index: 0
    .bg1-left
      font-weight: 800
      padding-inline: 12px
      .user
        background-color: #4faae1
        margin-top: 20px
        transform: translateY(30px)
        animation: fadeSlideIn2 1s ease-out forwards
        animation-delay: 0.5s
      h3
        font-weight: 500
        position: relative
        display: flex
        align-items: center
        color: #3f51b5
        margin-bottom: 5px
        padding-left: 60px
        font-size: 20px
        opacity: 0
        transform: translateY(30px)
        animation: fadeSlideIn2 1s ease-out forwards
        &::before
          content: ""
          width: 50px
          height: 2px
          background-color: rgb(63, 81, 181)
          display: block
          position: absolute
          left: 0px
          top: 50%
          transform: translateY(-50%)
          z-index: 1
      h1
        margin-bottom: 8px
        font-weight: 900
        font-family: "微軟正黑體"
        opacity: 0
        transform: translateY(30px)
        padding-right: 60px
        animation: fadeSlideIn2 1s ease-out forwards
        animation-delay: 0.5s
        font-size: 60px
        color: #33355c
        .thm-color-three
          color: #f9608c
      .text
        font-size: 16px
        color: #ff7622
        transform: translateY(30px)
        animation: fadeSlideIn2 1s ease-out forwards
        animation-delay: 0.5s
    .bg1-right
      min-width: 60%
      width: 60%
      padding-inline: 12px
      img
        width: 100%
  .homebg2
    position: relative
    display: grid
    grid-template-columns: repeat(4, 1fr)
    .homebg2-item
      position: relative
      padding: 30px 60px
      display: flex
      align-items: center
      justify-content: flex-start
      color: #fff
      font-weight: 700
      gap: 18px
      &:nth-child(1)
        background: #f9608c
      &:nth-child(2)
        background: #4faae1
      &:nth-child(3)
        background: #f7c870
      &:nth-child(4)
        background: #33355c
      .icon
        height: 65px
        min-width: 65px
        fill: rgb(255, 255, 255)
      &:hover
        .more
          color: rgb(255, 255, 255) !important
          .icon
            fill: rgb(255, 255, 255) !important
      .more
        position: absolute
        right: 15px
        bottom: 15px
        font-size: 12px
        display: flex
        align-items: center
        justify-content: flex-end
        color: rgb(255, 255, 255,.5)
        transition: all 0.4s ease 
        .icon
          height: 14px
          width: 14px
          min-width: 16px
          fill: rgb(255, 255, 255,.5)
          transition: all 0.4s ease 
  .homebg3
    margin: 0 auto
    padding: 80px 0
    width: 1320px
    max-width: 100vw
  .homebg-bg2
    background: #ffffeb
    .homebg4
      margin: 0 auto
      width: 1320px
      max-width: 100vw
      padding: 80px 0 50px
      display: flex
      justify-content: center
      .left-img
        max-width: 45%
        img
          width: 100%
          margin-bottom: 20px
      .right-text
        max-width: 50%
        padding-inline: 50px 60px
        display: flex
        flex-direction: column
        align-items: flex-start
        justify-content: flex-start
        .user
          margin-top: 20px
        .text1
          font-weight: 700
          color: #33355c
        .text2
          font-weight: 700
          color: #bd4b00
        h1
          font-weight: 700
          font-size: 30px
        h3
          font-weight: 600
          margin-top: 16px
          font-size: 17px
  .homebg5
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding: 80px 0
    .partner-items
      display: flex
      justify-content: space-between
      gap: 0
      padding-top: 20px
      .item
        width: 100%
        max-width: 430px
        padding: 40px
        margin: 0 12px
        &:hover
          svg.inner-dashed-border
            animation-play-state: running
        svg.inner-dashed-border 
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
          stroke: #d1d1d1
        .img-box
          padding-block: 40px
          width: 100%
          display: flex
          justify-content: center
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
          img
            height: 100%
    .partner-video
      padding: 50px 0 0
      video
        width: 100%
  .homebg6
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding: 80px 0 50px
    .home-header
      display: flex
      align-items: center
      justify-content: space-between
      margin-inline: 12px
      .user
        background: #4faae1
        &:hover
          background: #33355c
    .homebg6-items
      margin-inline: 12px
      display: grid
      gap: 24px
      grid-template-columns: repeat(3, 1fr)
      .h-item
        img
          width: 100%
          height: 100%
          object-fit: cover
      .o-item
        display: flex
        flex-direction: column
        gap: 24px
        .m-item
          flex: 1
          img
            width: 100%
            height: 100%
      .h-item,.m-item
        position: relative
        overflow: hidden
        svg.inner-dashed-border
          position: absolute
          pointer-events: none
          animation: dashed_border_running 20s linear infinite both
          animation-play-state: paused
          stroke-width: 3px
          stroke-dasharray: 9, 5
          stroke-dashoffset: 0
          stroke-linecap: round
          fill: none
          opacity: 0
          visibility: hidden
          transition: 0.4s
          z-index: 2
          top: 40px
          left: 40px
          width: calc(100% - 80px)
          height: calc(100% - 80px)
        &:hover
          .popup-image
            transform: translateX(0) !important
          svg.inner-dashed-border
            opacity: 1
            visibility: visible
            stroke: white
            
            transition: 0.3s all
            animation-play-state: running

        .popup-image
          position: absolute
          z-index: 1
          top: 0
          left: 0
          width: 100%
          height: 100%
          opacity: 83%
          display: flex
          align-items: center
          justify-content: center
          transition: 0.3s all
          transform: translateX(-100%)
          .fa-plus
            color: white
            width: 40px
            height: 40px
            background: rgba(255,255,255,.3)
            padding: 15px
            border-radius: 50%
            transition: 0.3s all
            &:hover
              background: rgba(255,255,255,.5)
      .h-item1
        .popup-image
          background: #f9608c
      .h-item2
        .popup-image
          background: #f7c870
      .m-item1
        .popup-image
          background: #4faae1
      .m-item2
        .popup-image
          background: #33355c
      
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

// 圖片預覽
.popup-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0,0,0,0.7)
  z-index: 9999
  display: flex
  align-items: center
  justify-content: center
  .popup-content
    position: relative
    z-index: 1
    max-width: 100%
    max-height: 100%
    padding: 20px 0
    img
      width: 100%
      height: 100%
      object-fit: cover
    .close-popup
      position: absolute
      top: 0
      right: 0
      width: 20px
      height: 20px
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
  background-color: #f9608c
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
      stroke-width: 1
      animation-play-state: running
      stroke: white
      stroke-dasharray: 3, 3
      top: 3px
      left: 3px
      width: calc(100% - 6px)
      height: calc(100% - 6px)
  @keyframes dashed_border_running 
    100% 
      stroke-dashoffset: -1000
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
    stroke: #d1d1d1
    stroke-width: 1
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
  .homepage 
    .homebg1
      .bg1-left
        h1
          font-size:40px
    .homebg2
      grid-template-columns: repeat(2, 1fr)
    .homebg-bg2
      .homebg4
        .right-text
          padding: 0 20px
@media (max-width: 720px)
  .homepage 
    .homebg1
      display: block
      .bg1-left
        width: 100%
        margin-bottom: 20px
        h3
          display: inline-block
        h1
          padding: 0
      .bg1-right
        width: 100%
    .homebg2
      grid-template-columns: repeat(1, 1fr)
    .homebg-bg2
      .homebg4
        display: block
        .left-img
          width: 100%
          max-width: 100%
        .right-text
          width: 100%
          max-width: 100%
          padding: 0 12px
    .homebg5
      .partner-items
        display: block
        padding: 0 12px
        .item
          max-width: 100% !important
          width: 100%
          margin: 0 0 20px
    .homebg6
      .home-header
        flex-direction: column
      .homebg6-items
        margin-top: 20px
        grid-template-columns: repeat(1, 1fr)
        .o-item
          flex-direction: row
</style>
