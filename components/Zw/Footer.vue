<script setup lang="ts">
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
  <footer>
    <div class="footer">
      <div class="footer-container">
        <div class="footer-item footer-item1">
          <img class="logo" :src="siteStore?.siteData?.logo" />
          <p>
            用愛與行動守護人、地球、生命
            <br>
            支持弱勢家庭與教育、守護環境、關懷流浪動物
            <br>
            「捐款支持」、「加入志工」、「了解更多」
          </p>
          <a @click="menuClick('contact')">
            <img src="@/assets/image/index/cs-2.png" alt="line" />
          </a>
        </div>
        <div class="footer-item footer-item2">
          <div class="">

            <ul class="ft_menu">
              <li>
                <a href="index.html">生命之光首頁</a>
              </li>

              <li>
                <a href="culture.html">文化特區</a>
              </li>

              <li>
                <a href="parent-child.html">親子活動</a>
              </li>

              <li>
                <a href="pet.html">寵物專區</a>
              </li>

              <li>
                <a href="guardian.html">致敬守護者</a>
              </li>

              <li>
                <a href="login.php">加入我們</a>
              </li>

              <li>
                <a href="founder.html">創辦人簡介</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-item footer-item3">
          <div class="">
            <h5 class="ft_title"></h5>
            <p>我們致力於推動人群關懷、環境守護與動物關懷三大公益方向，凝聚社會力量，讓愛心成為改變的動力。我們相信，每一個微小的行動，都能累積成影響世界的力量。</p>
            <p>打造一個溫暖、可持續且充滿希望的社會。無論是為弱勢家庭帶來援助，守護地球的生態環境，或是為流浪動物找回歸屬感，我們都希望讓更多人參與，讓公益成為生活的一部分。</p>
          </div>
        </div>
        <div class="footer-item footer-item4">
          <div class="">
            <h5 class="ft_title"></h5>
            <div class="item-grid">
              <div class="grid-item">
                <img src="@/assets/image/index/item1.jfif" alt="">
                <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                  <rect width="100%" height="100%"></rect>
                </svg>
              </div>

              <div class="grid-item">
                <img src="@/assets/image/index/item2.jfif" alt="">
                <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                  <rect width="100%" height="100%"></rect>
                </svg>
              </div>

              <div class="grid-item">
                <img src="@/assets/image/index/item3.jfif" alt="">
                <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                  <rect width="100%" height="100%"></rect>
                </svg>
              </div>

              <div class="grid-item">
                <img src="@/assets/image/index/item4.jfif" alt="">
                <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                  <rect width="100%" height="100%"></rect>
                </svg>
              </div>

              <div class="grid-item">
                <img src="@/assets/image/index/item5.jfif" alt="">
                <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                  <rect width="100%" height="100%"></rect>
                </svg>
              </div>

              <div class="grid-item">
                <img src="@/assets/image/index/item6.jfif" alt="">
                <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                  <rect width="100%" height="100%"></rect>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="footer-support">
      {{ siteStore?.siteData?.copyRight }}
    </p>
  </footer>
</template>
<style scoped lang="sass">
// footer
.footer
  background: #33355c
  .footer-container
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding: 65px 0
    display: flex
    flex-wrap: wrap
    .footer-item
      padding: 0 12px
    .footer-item1
      flex: 3
      .logo
        width: 60px
      p
        padding: 20px 0
        font-size: 14px
        color: #fff
      
    .footer-item2
      flex: 2
      .ft_menu
        li
          padding: 5px 0
          font-size: 14px
          padding-left: 10px
          a
            color: #fff
            display: flex
            align-items: center
            transition: 0.3s all
            
            &::before
              content: ''
              width: 6px
              height: 2px
              margin-right: 5px
              background: #f9608c
            &:hover
              color: #f9608c
          &:nth-child(1)
            color: #f9608c
            a::before
              background: #f9608c
            &:hover a
              color: #f9608c 
          &:nth-child(2)
            a::before
              background: #d7aa6a
            &:hover a
              color: #d7aa6a
          &:nth-child(3)
            a::before
              background: #5da4d8
            &:hover a
              color: #5da4d8
          &:nth-child(4)
            a::before
              background: #d9527e
            &:hover a
              color: #d9527e
          &:nth-child(5)
            a::before
              background: #5da4d8
            &:hover a
              color: #5da4d8
          &:nth-child(6)
            a::before
              background: #d7aa6a
            &:hover a
              color: #d7aa6a
          &:nth-child(7)
            a::before
              background: #d7aa6a
            &:hover a
              color: #d7aa6a
    .footer-item3
      flex: 3
      color: #fff
      .ft_title
        font-weight: 500
        font-size: 18px
        margin-bottom: 20px
        padding-bottom: 10px
        position: relative
        &::after
          content: ''
          position: absolute
          width: 25px
          height: 2px
          background: #f9608c
          bottom: 0
          left: 0
          transition: 0.3s all
      p
        margin-bottom: 15px
    .footer-item4
      flex: 4
      .ft_title
        font-weight: 500
        font-size: 18px
        margin-bottom: 20px
        padding-bottom: 10px
        position: relative
        &::after
          content: ''
          position: absolute
          width: 25px
          height: 2px
          background: #72c0f0
          bottom: 0
          left: 0
          transition: 0.3s all
      .item-grid
        display: grid
        grid-template-columns: repeat(3, 80px)
        grid-gap: 5px
        .grid-item
          width: 80px
          height: 80px
          position: relative
          &:hover
            svg.inner-dashed-border
              animation-play-state: running
          img
            border-radius: 0px
            width: calc(100% - 10px)
            height: calc(100% - 10px)
            top: 5px
            left: 5px
            object-fit: cover
            position: relative
          svg.inner-dashed-border
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            pointer-events: none
            animation: dashed_border_running 20s linear infinite both
            animation-play-state: paused
            stroke-dashoffset: 0
            stroke-linecap: round
            fill: none
            transition: 0.4s
            stroke: #f7c870
            stroke-width: 2
            stroke-dasharray: 9, 5
          &:nth-child(2),&:nth-child(4)
            svg.inner-dashed-border
              stroke: #f9608c 
          &:nth-child(3),&:nth-child(5)
            svg.inner-dashed-border
              stroke: #72c0f0
@keyframes dashed_border_running 
  100% 
    stroke-dashoffset: -1000
.footer-support
  text-align: center
  background: #f9608c
  padding: 8px 0
  color: #fff
  font-size: 14px


@media (max-width: 920px)
  .footer-container
    .footer-item
      flex: auto !important
      width: 50%
      margin-bottom: 20px
@media (max-width: 720px)
  .footer-container
    .footer-item
      flex: auto !important
      width: 100%
  // .footer .footer-container
  //   .footer-item3 .ft_title
  //     &::after
  //       left: calc( 50% - 12.5px ) !important
  //   .footer-item4
  //     .ft_title
  //       &::after
  //         left: calc( 50% - 12.5px ) !important
  //     .item-grid
  //       justify-content: center
</style>
