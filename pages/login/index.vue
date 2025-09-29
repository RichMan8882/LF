<script lang="ts" setup>
const siteStore = useSiteStore()
const { queryChatbox } = siteStore
const { signin } = useAuthStore()
const { isLogin } = useAuthStore()
const passwordEyes = ref(false)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)
const router = useRouter()
const fetchSigninApi = ref({
  account: '',
  password: ''
})
const showPassword = (type: boolean) => {
  passwordEyes.value = type
}

await useAsyncData(async () => {
  if (!router.currentRoute.value.name.includes('model')) {
    if (isLogin()) {
      navigateTo('/')
    }
  }
})

const setLogin = async () => {
  if (!fetchSigninApi.value.account) {
    ElMessage({
      message: '請輸入帳號',
      type: 'error'
    })
    return
  }
  if (!fetchSigninApi.value.password) {
    ElMessage({
      message: '請輸入密碼',
      type: 'error'
    })
    return
  }
  const recaptchaCheck = await recaptchaCheckFunction.value.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: '驗證碼錯誤',
      type: 'error'
    })
  } else {
    const res = await signin(fetchSigninApi.value)
    if (res.success) {
      navigateTo('/')
    }
  }
}
const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}
const scrollTop = ref(0)
const handleScroll = () => {
  // console.log(window.scrollY);
  scrollTop.value = window.scrollY
}
onMounted(async () => {
  if (window) {
    window.addEventListener('scroll', handleScroll)
  }
  const queryChatboxPromise = queryChatbox()
  queryChatboxPromise
    .then((queryChatboxRes) => {
      // 處理響應結果
      console.log('queryChatboxRes', queryChatboxRes.data)
    })
    .catch((error) => {
      console.error('Error loading queryChatboxRes data:', error)
    })
})
onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
<template>
  <div>
    <ZwHeader activeUrl="/login" :navFixed="scrollTop > 100" />
    <div class="form-block page">
      <div class="culturebg-bg1">
        <h1>加入我們</h1>
        <div class="nav-tab">
          <ol class="breadcrumb">
            <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
            <li class="breadcrumb-item">登入</li>
          </ol>
        </div>
      </div>
      <div class="gw template">
        <div class="form-container small">
          <div class="form-box user">
            <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <div class="form-title">
              <!-- {{ $lang('登入') }} {{ siteStore.siteData.title }} -->
              成為我們的一員
            </div>
            <div class="login_form formBlock">
              <div class="form-bg">
                <div class="input-classic">
                  <span class="input-title">{{ $lang('您的帳號') }}</span>
                  <input v-model="fetchSigninApi.account" v-trim-input type="text" name="acc" required
                    placeholder="請輸入帳號" />
                </div>
                <div class="input-classic">
                  <span class="input-title">{{ $lang('您的密碼') }}</span>
                  <input v-model="fetchSigninApi.password" v-trim-input type="password" name="pwd" required
                    @keyup.enter="setLogin" placeholder="請輸入密碼">
                </div>
                <div class="input-classic">
                  <span class="input-title">{{ $lang('驗證碼') }}</span>
                  <div class="form-flex">
                    <recaptcha @check-hepler="checkHepler"></recaptcha>
                    <input v-model="recaptchaCode" v-trim-input type="text" name="vcode" required
                      @keyup.enter="setLogin" />
                  </div>
                </div>
                <div class="info-text span-$lang text-center">
                  <span class="zh_TW">{{
                    $lang('本頁面受 reCAPTCHA 機制保護，並遵守 Google 的')
                  }}
                    <a href="https://policies.google.com/privacy" target="_blank">{{ $lang('隱私權政策') }}</a>
                    {{ $lang('及') }}
                    <a href="https://policies.google.com/terms" target="_blank">{{ $lang('服務條款') }}</a>。</span>
                </div>
                <div class="button-row">
                  <!-- <a class="btn-cancel" @click="navigateTo('/')">{{
                      $lang('取消')
                    }}</a> -->
                  <button class="btn-submit submit user" type="button" value="" @click="setLogin">
                    {{ $lang('登入') }}
                    <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                      <rect width="100%" height="100%"></rect>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="form-sec-bg">
                <!-- <div class="info-text text-center span-$lang">
                    <i class="fas fa-exclamation-circle"></i>
                    <span class="zh_TW">{{ $lang('請將您用來登入職員系統')
                      }}{{
                        $lang(
                          '的手機設定兩步驟驗證，這可以保護您的帳戶安全，使其不致於因為密碼外洩而遭盜用，即使密碼遭盜用，盜用者也無法成功登入您的帳戶。'
                        )
                      }}</span>
                  </div> -->
              </div>
              <div class="link-text-block">
                <div class="span-lang">
                  尚未加入我們嗎？
                  <a class="link-text" style="cursor: pointer" @click="navigateTo('/register')">{{ $lang('立即註冊')
                  }}</a>
                </div>
                <!-- <div>
                    <a class="link-text" :href="siteStore.chatbox" target="_blank">{{ $lang('忘記密碼') }}?</a>
                  </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <ZwFooter />
    </div>
  </div>
</template>

<style scoped lang="sass">
.template
  position: relative
  padding: 60px 0
  .form-container
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    padding: 20px
    .form-box
      color: #33355c
      max-width: calc(100vw - 40px)
      width: 856px
      padding: 20px
      margin: 0 auto
      text-align: left
      display: block
      background-color: #00000000
      &:hover
        background-color: #00000000 !important
        .inner-dashed-border
          animation-play-state: running !important
      .inner-dashed-border
        stroke-width: 3
        stroke: #f9608c
        stroke-dasharray: 9,5  
        z-index: 0    
      .form-title
        font-size:25px
        color: #d15e00
      .login_form
        .form-bg
          padding: 20px 0
          .input-classic
            .input-title
              font-size: 16px
              display: block
              margin-bottom: 10px
              margin-top: 20px
              font-weight: 600
            input
              outline: none
              width: 100%
              border-radius: 0px
              border: 1px solid #d1d1d1
              background-color: transparent
              padding: 10px 15px
              height: auto
              transition: 0.3s all
        .form-flex
          display: flex
          align-items: center
          gap: 5px
          input
            flex: 1
      .button-row
        display: flex
        .btn-submit
          flex: 1
          padding: 10px 15px
          background-color: #f9608c
          &:hover
            .inner-dashed-border
              animation-play-state: running !important
          .inner-dashed-border
            stroke-width: 3
            stroke: #fff
            stroke-dasharray: 6,4 
      .info-text
        padding: 20px 0
        .zh_TW
          white-space: pre-wrap
        a
          color: #f9608c
          &:hover
            color: #33355c
      .link-text-block
        text-align: center
        .span-lang
          color: #33355c
          font-size: 16px
        .link-text
          color: #f9608c
          &:hover
            color: #33355c
.culturebg-bg1
  background: url(@/assets/image/index/login.jpg) no-repeat center bottom / cover
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
// 
@keyframes dashed_border_running 
  100% 
    stroke-dashoffset: -1000

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
      animation-play-state: running
  .inner-dashed-border
    position: absolute
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
