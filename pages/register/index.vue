<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const referrerCodeCookiee = useCookie('referrerCode') as any
const siteStore = useSiteStore()
const signupData = ref({
  account: '',
  password: '',
  transactionPassword: '',
  username: '',
  referrerCode: '',
  countryCode: siteStore.siteData.localsOptions[0],
  mobile: '',
  socialPlatform: '',
  socialId: '',
  additionalInfo: {}
})
const additionalInfo1Value = ref('Line')
const showReferrerInput = ref(false)
const verifyPassword = ref('')
const verifyTransactionPassword = ref('')
const isChecked = ref(true)
const recaptchaCode = ref('')
const recaptchaCheckFunction = ref(null)
const passwordEyes = ref(false)
const tPasswordEyes = ref(false)
const { signup } = useAuthStore()
const validationStatus = reactive({
  accountValid: false,
  passwordValid: false,
  passwordSame: true,
  transactionPasswordValid: false,
  transactionPasswordSameWithPassword: false,
  transactionPasswordSame: true,
  phoneValid: false
})
const passwordSameRef = ref(null)
const transactionPasswordRef = ref(null)
const transactionPasswordSameRef = ref(null)
const usernameRef = ref(null)
const mobileRef = ref(null)
const socialIdRef = ref(null)
const isFormValid = computed(() => {
  console.log('passwordSameRef.value', passwordSameRef.value)
  console.log(
    'transactionPasswordSameRef.value',
    transactionPasswordSameRef.value
  )

  // 如果有額外欄位資訊，則需要添加額外驗證
  let isValid = validationStatus.accountValid && validationStatus.passwordValid

  if (passwordSameRef.value !== null) {
    isValid = isValid && validationStatus.passwordSame
  }

  if (transactionPasswordRef.value !== null) {
    isValid =
      isValid &&
      validationStatus.transactionPasswordValid &&
      !validationStatus.transactionPasswordSameWithPassword
  }
  if (transactionPasswordSameRef.value !== null) {
    isValid =
      isValid &&
      validationStatus.transactionPasswordSame &&
      !validationStatus.transactionPasswordSameWithPassword
  }
  if (usernameRef.value !== null) {
    isValid = isValid && signupData.value.username
  }
  if (mobileRef.value !== null) {
    isValid = isValid && signupData.value.mobile
  }
  if (signupData.value.mobile) {
    isValid = isValid && validationStatus.phoneValid
  }
  if (socialIdRef.value !== null) {
    isValid = isValid && signupData.value.socialId
  }

  console.log('isFormValid:', isValid) // 添加日志
  return isValid
})

const validateAccount = () => {
  const regex = /^[a-zA-Z0-9]{4,20}$/
  validationStatus.accountValid = regex.test(signupData.value.account)
  checkTransactionPasswordSameWithPassword()
}

const checkPasswordRequired = () => {
  // const passwordRegex = /^.{3,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
  validationStatus.passwordValid =
    passwordRegex.test(signupData.value.password) &&
    signupData.value.password !== signupData.value.account
  if (verifyPassword.value) {
    checkPasswordSame()
  }
  if (signupData.value.transactionPassword) {
    checkTransactionPasswordSameWithPassword()
  }
}

const checkPasswordSame = () => {
  validationStatus.passwordSame =
    signupData.value.password === verifyPassword.value
}

const checkTransactionPasswordRequired = () => {
  // const passwordRegex = /^.{3,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/
  validationStatus.transactionPasswordValid = passwordRegex.test(
    signupData.value.transactionPassword
  )
  checkTransactionPasswordSameWithPassword()
  if (verifyTransactionPassword.value) {
    checkTransactionPasswordSame()
  }
}

const checkTransactionPasswordSameWithPassword = () => {
  validationStatus.transactionPasswordSameWithPassword =
    signupData.value.transactionPassword === signupData.value.password ||
    signupData.value.transactionPassword === signupData.value.account
}

const checkTransactionPasswordSame = () => {
  validationStatus.transactionPasswordSame =
    signupData.value.transactionPassword === verifyTransactionPassword.value
}

const showPhoneValid = computed(() => {
  if (signupData.value.countryCode == '+886') {
    return true
  } else {
    return false
  }
})

const checkPhoneValid = () => {
  const regex = /^09\d{8}$/
  if (signupData.value.countryCode == '+886') {
    validationStatus.phoneValid = regex.test(signupData.value.mobile)
  } else {
    validationStatus.phoneValid = !!signupData.value.mobile
  }
}

const checkHepler = async (data) => {
  recaptchaCheckFunction.value = data
}
// methods
const showPassword = (type: boolean) => {
  passwordEyes.value = type
}
const showTranscationPassword = (type: boolean) => {
  tPasswordEyes.value = type
}

const handleRegisterClick = () => {
  console.log('Button clicked, isFormValid:', isFormValid.value)
  if (isFormValid.value) {
    goRegister()
  }
}

const goRegister = async () => {
  console.log('goRegister')
  if (!isChecked.value) {
    ElNotification({
      title: `${t('請勾選同意條款')}`,
      type: 'error',
      duration: 1000,
      showClose: false
    })
    return
  }
  const recaptchaCheck = await recaptchaCheckFunction.value.validate(
    recaptchaCode.value
  )
  if (!recaptchaCheck) {
    ElMessage({
      message: `${t('驗證碼錯誤')}`,
      type: 'error',
      showClose: false
    })
  } else {
    console.log('signupData.value', signupData.value)
    console.log('321')

    const signupRes = await signup(signupData.value)
    console.log('signupRes', signupRes)
    if (signupRes.success) {
      referrerCodeCookiee.value = ''
      navigateTo('/')
    }
  }
}

const { isLogin } = useAuthStore()
await useAsyncData(async () => {
  if (!router.currentRoute.value.name.includes('model')) {
    if (isLogin()) {
      navigateTo('/')
    }
  }
  if (router.currentRoute.value.query.referrer) {
    signupData.value.referrerCode = router.currentRoute.value.query.referrer
  } else if (referrerCodeCookiee.value) {
    signupData.value.referrerCode = referrerCodeCookiee.value
  }
})

const scrollTop = ref(0)
const handleScroll = () => {
  // console.log(window.scrollY);
  scrollTop.value = window.scrollY
}
onMounted(async () => {
  if (window) {
    window.addEventListener('scroll', handleScroll)
  }
})

await onMounted(() => {
  showReferrerInput.value = !!(
    router.currentRoute.value.query.referrer || referrerCodeCookiee.value
  )
})

onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div>
    <client-only>
      <ZwHeader activeUrl="/login" :navFixed="scrollTop > 100" />
      <div class="form-block page">
        <div class="culturebg-bg1">
          <h1>加入我們</h1>
          <div class="nav-tab">
            <ol class="breadcrumb">
              <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
              <li class="breadcrumb-item">註冊</li>
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
                {{ $lang('註冊') }}
                {{ $lang('帳號') }}
              </div>
              <div class="register_form">
                <div class="form-bg">
                  <div v-if="showReferrerInput" class="input-classic">
                    <span class="input-title">{{ $lang('推薦碼') }}</span>
                    <input v-model="signupData.referrerCode" v-trim-input type="text" name="pAcc" :readonly="true" />
                  </div>
                  <div class="input-classic">
                    <span class="input-title">{{ $lang('職員帳號') }}</span>
                    <input v-model="signupData.account" v-trim-input type="text" class="input_style"
                      @input="validateAccount" @copy.prevent @paste.prevent @contextmenu.prevent />
                    <div class="tips">
                      <div :class="validationStatus.accountValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.accountValid">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('需使用4-20位英文或數字') }}
                      </div>
                    </div>
                  </div>
                  <div class="input-classic">
                    <span class="input-title">{{ $lang('密碼') }}</span>
                    <input v-model="signupData.password" v-trim-input :type="passwordEyes ? 'text' : 'password'"
                      class="input_style" @input="checkPasswordRequired" @copy.prevent @paste.prevent
                      @contextmenu.prevent />
                    <div class="tips">
                      <div :class="validationStatus.passwordValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.passwordValid">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('需混合使用 3 個字元以上的大小寫英文或數字') }}
                        <!-- {{ $lang('需混合使用 3 個字元以上的英文或數字。') }} -->
                      </div>
                      <div v-if="signupData.password" :class="signupData.password !== signupData.account
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="signupData.password !== signupData.account">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('登入密碼不可與帳號相同') }}
                      </div>
                    </div>
                  </div>
                  <div class="input-classic">
                    <span class="input-title">{{ $lang('密碼確認') }}</span>
                    <input ref="passwordSameRef" v-model="verifyPassword" v-trim-input
                      :type="passwordEyes ? 'text' : 'password'" class="input_style" @input="checkPasswordSame"
                      @copy.prevent @paste.prevent @contextmenu.prevent />
                    <div class="tips">
                      <div v-if="verifyPassword">
                        <div v-if="validationStatus.passwordSame" class="valid-feedback">
                          <i class="fas fa-check"></i> {{ $lang('確認相同') }}
                        </div>
                        <div v-else class="invalid-feedback">
                          <i class="fas fa-times"></i>
                          {{ $lang('與登入密碼不相同') }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="siteStore.siteData.transactionPasswordRequired" class="input-classic">
                    <span class="input-title">{{ $lang('提款密碼') }}</span>
                    <input ref="transactionPasswordRef" v-model="signupData.transactionPassword" v-trim-input
                      :type="tPasswordEyes ? 'text' : 'password'" class="input_style"
                      @input="checkTransactionPasswordRequired" @copy.prevent @paste.prevent @contextmenu.prevent />
                    <div class="tips">
                      <div :class="validationStatus.transactionPasswordValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.transactionPasswordValid">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('需混合使用 3 個字元以上的大小寫英文或數字') }}
                        <!-- {{ $lang('需混合使用 3 個字元以上的英文或數字。') }} -->
                      </div>
                      <div v-if="signupData.transactionPassword" :class="!validationStatus.transactionPasswordSameWithPassword
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="
                          !validationStatus.transactionPasswordSameWithPassword
                        ">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('交易密碼不可與登入密碼,帳號相同') }}
                      </div>
                    </div>
                  </div>
                  <!-- <div
                v-if="siteStore.siteData.transactionPasswordRequired"
                class="input-classic"
              >
                <span class="input-title">{{ $lang('提款密碼確認') }}</span>
                <input
                  ref="transactionPasswordSameRef"
                  v-model="verifyTransactionPassword"
                  v-trim-input
                  :type="tPasswordEyes ? 'text' : 'password'"
                  class="input_style"
                  @input="checkTransactionPasswordSame"
                  @copy.prevent
                  @paste.prevent
                  @contextmenu.prevent
                />
                <div class="tips">
                  <div v-if="verifyTransactionPassword">
                    <div
                      v-if="validationStatus.transactionPasswordSame"
                      class="valid-feedback"
                    >
                      <i class="fas fa-check"></i> {{ $lang('確認相同') }}
                    </div>
                    <div v-else class="invalid-feedback">
                      <i class="fas fa-times"></i>
                      {{ $lang('與交易密碼不相同') }}
                    </div>
                  </div>
                </div>
              </div> -->
                  <div class="input-classic">
                    <span class="input-title">{{ $lang('姓名') }}</span>
                    <input v-model="signupData.username" v-trim-input type="text" class="input_style" />
                    <div class="tips">
                      <div ref="usernameRef" :class="signupData.username
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="signupData.username">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('必填') }}
                      </div>
                    </div>
                  </div>
                  <div class="input-classic">
                    <span class="input-title">{{ $lang('手機驗證') }}</span>
                    <div class="flex">
                      <select v-model="signupData.countryCode" name="phoneCode" @change="checkPhoneValid">
                        <option v-for="item in siteStore.siteData.localsOptions" :key="item">
                          {{ item }}
                        </option>
                      </select>
                      <input v-model="signupData.mobile" v-trim-input type="text" class="input_style"
                        @input="checkPhoneValid" />
                    </div>
                    <div class="tips">
                      <div v-if="showPhoneValid" :class="validationStatus.phoneValid
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="validationStatus.phoneValid">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('手機號碼開頭須為09，共10碼') }}
                      </div>
                      <div ref="mobileRef" :class="signupData.mobile
                        ? 'valid-feedback'
                        : 'invalid-feedback'
                        ">
                        <span v-if="signupData.mobile">
                          <i class="fas fa-check"></i>
                        </span>
                        {{ $lang('必填') }}
                      </div>
                    </div>
                  </div>
                  <!-- <div class="input-classic">
                <span class="input-title">{{ $lang('聯絡方式') }}</span>
                <select v-model="signupData.socialPlatform" name="contactType">
                  <option
                    v-for="item in siteStore.siteData.socialOptions"
                    :key="item"
                  >
                    {{ item }}
                  </option>
                </select>
                <input
                  v-model="signupData.socialId"
                  name="contactInfo"
                  type="text"
                />
              </div> -->
                  <div class="input-classic">
                    <span class="input-title b-$t">
                      <b class="zh_TW">{{ $lang('驗證碼') }}</b>
                    </span>
                    <div class="form-flex">
                      <recaptcha @check-hepler="checkHepler"></recaptcha>
                      <input v-model="recaptchaCode" v-trim-input type="text" name="vcode" required />
                    </div>
                  </div>
                  <div class="submit-info">
                    <label>
                      <input v-model="isChecked" class="submit-check" type="checkbox" />
                      {{
                        $lang(
                          '我已年滿 18 歲，並已閱讀、接受並同意條款和條件、規則、隱私政策、Cookie 政策以及與年齡驗證相關的政策'
                        )
                      }}
                      <a target="_blank">{{ $lang('條款和條件') }}</a>
                    </label>
                  </div>
                  <div class="info-text span-$t text-center">
                    <span class="zh_TW">{{
                      $lang('本頁面受 reCAPTCHA 機制保護，並遵守 Google 的')
                    }}
                      <a href="https://policies.google.com/privacy" target="_blank">{{ $lang('隱私權政策') }}</a>
                      及
                      <a href="https://policies.google.com/terms" target="_blank">{{ $lang('服務條款') }}</a>。</span>
                  </div>
                  <div class="button-row">
                    <!-- <a class="btn-cancel" @click="navigateTo('/login')">{{
                      $lang('取消')
                    }}</a> -->
                    <button type="button" class="submit btn-submit user"
                      data-loading-text="<i class='fa fa-circle-notch fa-spin'></i> Loading......"
                      :class="{ disabled: !isFormValid }" @click="handleRegisterClick">
                      {{ $lang('送出') }}
                      <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                        <rect width="100%" height="100%"></rect>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="form-sec-bg">
                  <div class="info-text text-center span-$t">
                    <i class="fas fa-exclamation-circle"></i>
                    <span class="zh_TW">{{ $lang('請將您用來登入') }}
                      {{ siteStore.siteData.title }}
                      {{
                        $lang(
                          '的手機設定兩步驟驗證，這可以保護您的帳戶安全，使其不致於因為密碼外洩而遭盜用，即使密碼遭盜用，盜用者也無法成功登入您的帳戶。'
                        )
                      }}</span>
                  </div>
                </div>
                <div class="link-text-block">
                  <div class="span-$t">
                    <span class="zh_TW">{{ $lang('已經註冊過?') }}</span>
                    <a class="link-text" @click="navigateTo('/login')">{{
                      $lang('登入')
                    }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ZwFooter />
      </div>
    </client-only>
  </div>
</template>
<style scoped lang="sass">
label
  white-space: pre-wrap
  a
    color: #f9608c
    &:hover
      color: #33355c
.submit-info
  margin-top: 20px
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
      .register_form
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
