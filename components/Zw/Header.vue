<script setup lang="ts">
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group'

const router = useRouter()
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const { t } = useI18n()
const { signout, isLogin } = useAuthStore()
const isMenuVisible = ref(false)

const props = defineProps({
  activeUrl: {
    type: String,
    default: '/'
  },
  navFixed: {
    type: Boolean,
    default: false
  }
})

const navList = computed(() =>
  accessTokenCookie.value ? loginList : unLoginList
)

const menuClick = (link: string) => {
  if (link === 'game') {
    gameWindowOpen()
  } else if (link === 'contact') {
    window.open(siteStore.chatbox, '_blank')
  } else {
    router.push(link)
  }
}

await onMounted(async () => {
  const queryChatboxPromise = siteStore.queryChatbox()
  queryChatboxPromise
    .then((queryChatboxRes) => {
      // 處理響應結果
      console.log('queryChatboxRes', queryChatboxRes.data)
    })
    .catch((error) => {
      console.error('Error loading queryChatboxRes data:', error)
    })
})

const gameWindowOpen = () => {
  window.open(`${window.location.origin}/game`, '_blank')
}

const handleClick = () => {
  console.log('-------------------------------')
  console.log('handleClick')
  console.log('-------------------------------')
  isMenuVisible.value = !isMenuVisible.value
}

const accessTokenCookie = useCookie('accessToken', {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
}) as any

const unLoginList = [
  {
    title: t('聯絡我們'),
    path: 'contact'
  }
]

const loginList = [
  {
    title: t('首頁'),
    path: '/'
  },
  {
    title: t('理單介面'),
    path: 'game'
  },
  {
    title: t('薪資提領'),
    path: '/user/withdraw'
  },
  {
    title: t('聯絡我們'),
    path: 'contact'
  },
  {
    title: t('新聞媒體報導'),
    path: '/user/news'
  }
]

// const { locale } = useI18n()
// const changeLang = (value) => {
//   locale.value = value
//   console.log('change lang', locale.value)
// }
const activeIndex = ref(0)
const checkTab = (index, top) => {
  isMenu.value = false
  if (index == 2) {
    navigateTo('/discount')
  } else {
    navigateTo('/')
  }
  activeIndex.value = index
  setTimeout(() => {
    pageRef.value.scrollTop = top
  }, 10)
}
const isMenu = ref(false)
</script>

<template>
  <header :class="props.navFixed ? 'header-fixed' : ''">
    <div class="headerMobile">
      <img class="logo" :src="siteStore.siteData.logo" />
      <div></div>
      <div class="headerMobileright">
        <div v-if="!isLogin()" class="resbtn" @click="navigateTo('/register')">
          <div class="user">
            辦理到職
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
        <div v-else class="resbtn" @click="navigateTo('/game')">
          <div class="user">開始測試
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
        <div class="menu-btn">
          <div class="hamburger-btn" @click="isMenu = !isMenu" :class="{ open: isMenu }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <section class="header bg-white" :class="{ openMemu: isMenu }" @click.self="isMenu = !isMenu">
      <img class="pclogo" :src="siteStore.siteData.logo" />
      <div class="ir-navs-items">
        <div class="ir-navs-item" :class="props.activeUrl == '/' ? 'active' : ''">
          <a @click="navigateTo('/')">生命之光首頁</a>
        </div>
        <div class="ir-navs-item" :class="props.activeUrl == '/culture' ? 'active' : ''">
          <a @click="navigateTo('/culture')">文化特區</a>
        </div>
        <div class="ir-navs-item" :class="props.activeUrl == '/parent-child' ? 'active' : ''">
          <a @click="navigateTo('/parent-child')">親子活動</a>
        </div>
        <div class="ir-navs-item" :class="props.activeUrl == '/pet' ? 'active' : ''">
          <a @click="navigateTo('/pet')">寵物專區</a>
        </div>
        <div class="ir-navs-item" :class="props.activeUrl == '/guardian' ? 'active' : ''">
          <a @click="navigateTo('/guardian')">致敬守護者</a>
        </div>
        <div class="ir-navs-item" :class="props.activeUrl == '/login' ? 'active' : ''">
          <a @click="navigateTo('/login')">加入我們</a>
        </div>
        <div class="ir-navs-item" :class="props.activeUrl == '/founder' ? 'active' : ''">
          <a @click="navigateTo('/founder')">創辦人簡介</a>
        </div>
        <div class="ir-navs-item">
          <a v-if="!isLogin()" class="ir-link" @click="navigateTo('/login')"><span>職員登入</span></a>
          <a v-else class="ir-link" @click="navigateTo('/user/info')"><span>職員中心</span></a>
        </div>
        <div class="ir-navs-item">
          <div @click="navigateTo('/game')" class="user">開始測試
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
        <div class="line-nav">
          <a @click="menuClick('contact')" class="line" target="_blank">
            <img src="@/assets/image/index/cs.png" alt="">
          </a>
        </div>
      </div>
    </section>
  </header>
</template>
<style scoped lang="sass">
@keyframes fixed-to
  to 
    position: sticky
    transform: translate3d(0px, 0px, 0px)
    opacity: 1
.header-fixed
  opacity: 0
  top: 0
  position: relative
  transform: translate3d(0, -100%, 0)
  animation: fixed-to .8s ease-out forwards
header
  position: relative
  z-index: 5000
  top: 0
  width: 100%
  height: auto
  background-color: #fff
  box-shadow: 0 0 5px rgba(0, 0, 0, .1)
  .headerMobile
    align-items: center
    display: flex
    justify-content: space-between
    // position: fixed
    // top: 0
    width: 100%
    z-index: 5000
    display: none
    background-color: #fff
    padding: 1rem 1.5rem
    
    .logo
      height: 40px
    @media (max-width: 768px)
      display: flex
      .headerMobileright
        .menu-btn
          display: flex !important
          align-items: center
          justify-content: center
          background: #72c0f0
          width: 37px
          height: 37px
          .hamburger-btn
            span
              display: block
              width: 23px
              height: 2px
              margin-bottom: 5px
              background-color: white
              transition: 0.5s all
              position: relative
              &:nth-child(3)
                margin-bottom: 0
          .open
            span:nth-child(1)
              transform: rotate(45deg)
              top: 4px
            span:nth-child(2)
              display: none
            span:nth-child(3)
              transform: rotate(-45deg)
              top: -3px
    .headerMobileright
      display: flex
      align-items: center
      .resbtn
        margin-inline-end: 15px
      .menu-btn
        display: none
  .openMemu
    opacity: 1 !important
    transform: translateY(0) !important
  .header
    max-width: 1320px
    width: 100%
    margin: 0 auto
    align-items: center
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 7px 20px
    transition: all .5s 
    @media (max-width: 768px)
      opacity: 0
      background: #87083380
      position: fixed
      transform: translateY(-100%)
      width: 100%
      height: calc(100vh)
      z-index: 499
      left: 0
      right: 0
      top: 0
      padding: 72px 0 0
      display: block !important
      img
        display: none
    .pclogo
      height: 80px
      width: auto
      @media (max-width: 1200px)
        height: 50px
      @media (max-width: 768px)
        display: none
        position: absolute
        right: 20px
        top: 20px
        z-index: 6000
    .ir-navs-items
      display: flex
      align-items: center
      flex-direction: row
      justify-content: center
      position: relative
      z-index: 20
      @media (max-width: 768px)
        display: block
        .ir-navs-item
          a
            justify-content: flex-start !important
            padding: 0 15px !important
            height: 60px !important
            background: #f18495
            color: white !important
            border-block-end: 1px solid #ffffff
      .ir-navs-item
        font-weight: bold
        text-align: center
        overflow: hidden
        color: #33355c
        cursor: pointer
        font-size: 14px
        font-weight: 400
        position: relative
        @media (max-width: 992px)
          font-size: 12px
          white-space: nowrap
        @media (max-width: 768px)
          font-size: 14px
          white-space: nowrap
        &.active
          background: #f9608c
          color: #fff
        a
          position: relative
          z-index: 1
          height: 80px
          font-weight: bold
          padding: 27px 15px
          display: flex
          align-items: center
          justify-content: center
          transition: all 0.3s ease
          &::before
            content: ''
            position: absolute
            background-color: transparent
            width: 0%
            height: 100%
            right: 0
            z-index: -1
            transition: all 0.8s ease
          &:hover
            color: #fff
            &::before
              width: 100% !important
              background-color: #f9608c !important
              left: 0 !important
              right: auto !important
              bottom: 0
              transition: all 0.5s ease
              pointer-events: none
              z-index: -1
          @media (max-width: 1200px)
            padding: 27px 10px !important
        .user
          @media (max-width: 768px)
            display: none
        .line-nav
          width: 80px
          max-height: 80px
          padding: 0
          img
            width: 100%

@keyframes fadeSlideIn-2
  to 
    opacity: 1
    transform: translateY(0)
.user
  margin-left: 1rem
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
    background-color: #33355c
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
.footer
  padding: 30px
  background-color: #231e1c

  &-support
    width: 1200px
    margin: 0 auto
    display: flex
    justify-content: space-between
    color: #fff
</style>
