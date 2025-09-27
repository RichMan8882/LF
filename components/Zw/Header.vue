<script setup lang="ts">
const router = useRouter()
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const { t } = useI18n()
const { signout } = useAuthStore()
const isMenuVisible = ref(false)

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
</script>

<template>
  <header class="header">
    <div class="header-left">
      <button class="logo" @click="router.push('/')">
        <img :src="siteStore.siteData.logo" />
      </button>
      <button
        type="button"
        v-for="item in navList"
        :key="item.title"
        @click="menuClick(item.path)"
      >
        {{ item.title }}
      </button>
    </div>

    <div class="header-right">
      <div class="header-loginBox" v-if="accessTokenCookie">
        <button
          type="button"
          class="header-loginBox-btn"
          @click="router.push('/user/info')"
        >
          {{ $lang('職員列表') }}
        </button>
        <button
          type="button"
          class="header-loginBox-btn header-loginBox-orange mobile-hide"
          @click="signout"
        >
          {{ $lang('登出') }}
        </button>

        <button type="button" class="header-loginBox-flag">
          <img src="@/assets/image/zw/zw-tw.png" alt="" />
        </button>

        <!-- <div class="lang-row">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <button
                class="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                <span class="lang-img" :class="locale"></span>
              </button>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changeLang('zh_TW')">
                  <span class="dropdownItemIcon zh_TW"></span>
                  <div class="dropdownItemTxt">繁體中文</div>
                </el-dropdown-item>
                <el-dropdown-item @click="changeLang('en_US')">
                  <span class="dropdownItemIcon en-US"></span>
                  <div class="dropdownItemTxt">English</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div> -->
      </div>
      <div class="header-loginBox" v-else>
        <button
          type="button"
          class="header-loginBox-btn"
          @click="router.push('/login')"
        >
          {{ $lang('登入') }}
        </button>
        <button
          type="button"
          class="header-loginBox-btn header-loginBox-orange mobile-hide"
          @click="router.push('/register')"
        >
          {{ $lang('辦理入職') }}
        </button>

        <button type="button" class="header-loginBox-flag">
          <img src="@/assets/image/zw/zw-tw.png" alt="" />
        </button>

        <!-- <div class="lang-row">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <button
                class="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                <span class="lang-img" :class="locale"></span>
              </button>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="changeLang('zh_TW')">
                  <span class="dropdownItemIcon zh_TW"></span>
                  <div class="dropdownItemTxt">繁體中文</div>
                </el-dropdown-item>
                <el-dropdown-item @click="changeLang('en_US')">
                  <span class="dropdownItemIcon en-US"></span>
                  <div class="dropdownItemTxt">English</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div> -->
      </div>

      <div
        type="button"
        class="header-hamburger"
        :class="{
          active: isMenuVisible
        }"
        @click="handleClick"
      >
        <span v-show="!isMenuVisible">
          <i class="fas fa-bars"></i>
        </span>
        <span v-show="isMenuVisible">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>

    <div
      class="menu"
      :class="{
        active: isMenuVisible
      }"
    >
      <ul>
        <li
          v-for="item in navList"
          :key="item.title"
          @click="menuClick(item.path)"
        >
          {{ item.title }}
        </li>
      </ul>

      <button
        type="button"
        class="orangeButton header-loginBox-orange header-loginBox-btn"
        v-if="accessTokenCookie"
        @click="signout"
      >
        {{ $lang('登出') }}
      </button>
      <button
        type="button"
        class="orangeButton header-loginBox-orange header-loginBox-btn"
        v-else
        @click="router.push('/register')"
      >
        {{ $lang('辦理入職') }}
      </button>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.header
  position: sticky
  top: 0
  left: 0
  right: 0
  z-index: 99
  padding: 0 16px
  height: 60px
  display: flex
  align-items: center
  justify-content: space-between
  background-color: #fff

  &-left
    display: flex
    align-items: center

    .logo
      width: 60px
      height: 60px
      object-fit: cover

    button
      display: none
      margin: 0 12px
      font-size: 16px
      color: #333
      background-color: transparent
      cursor: pointer

  &-right
    display: flex
    align-items: center
    padding: 16px 0
    gap: 8px

  &-loginBox
    display: flex
    align-items: center
    padding: 16px 0
    gap: 8px
    &-btn
      color: #333
      height: 100%
      padding: 4px 10px
      border: 1px solid rgb(0, 50, 71)
      border-radius: 50px
      display: flex
      justify-content: center
      align-items: center
      font-size: 14px
      font-weight: bold

    &-orange
      color: #fff
      background-color: darken(#f5a623, 10)
      border-color: darken(#f5a623, 10)

    &-flag
      width: 30px
      height: 30px
      border-radius: 50%
      overflow: hidden

    .mobile-hide
      @media screen and (max-width: 768px)
        display: none

  &-hamburger
    font-size: 30px
    color: rgba(0, 0, 0, .2)
    transform: rotate(180deg)
    width: 40px
    text-align: center
    transition: all .3s ease-in-out

    &.active
      transform: rotate(0)


.menu
  position: fixed
  left: 100%
  top: 60px
  height: calc(100vh - 60px)
  padding: 24px 30px
  color: #fff
  background-color: rgb(0, 50, 71)
  transform: translateX(0)
  transition: all .3s ease-in-out
  width: 270px

  &.active
    transform: translateX(-100%)

  li
    padding: 15px 0
    cursor: pointer

  .orangeButton
    width: 100%
    display: block
    height: 33px
    margin-top: 12px

@media screen and (min-width: 768px)
  .menu
    display: none

  .header
    height: 80px
    padding: 0 36px

    &-left
      display: flex
      align-items: center

      button
        display: block

    &-btn
      width: 90px

    &-hamburger
      display: none
</style>

<!-- <style lang="scss" scoped>
.lang-row {
  margin-left: 5px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}

.lang-row button {
  background-color: transparent;
  border: 0;
  outline: 0;
  border-radius: 50%;
  padding: 0;
}

.lang-row button::after {
  display: none;
}

.lang-row .lang-img {
  display: block;
  border-radius: 50%;
  width: 26.7px;
  height: 26.7px;
  background-image: url('@/assets/image/lang-img-2.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  text-align: center;
}

.dropdownItemIcon {
  display: block;
  border-radius: 50%;
  width: 26.7px;
  height: 26.7px;
  background-image: url('@/assets/image/lang-img-2.jpg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  text-align: center;
}

.dropdownItemTxt {
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  font-size: 1rem;
}

.zh_TW {
  background-position: 50% 0%;
}

.en-US {
  background-position: 50% 50%;
}

.lang-row .dropdown-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
}

.lang-row .dropdown-item:hover {
  background-color: rgba(115, 160, 179, 0.2);
}

.lang-row .dropdown-item:active,
.lang-row .dropdown-item:focus {
  background-color: #73a0b3;
  color: #fff;
}

.lang-row .dropdown-item .lang-img {
  margin-right: 10px;
}
</style> -->
