<script lang="ts" setup>
const router = useRouter()
const siteStore = useSiteStore()
const { signout } = useAuthStore()
const { queryChatbox } = siteStore
const PlayerStore = usePlayerStore()
const ticketStore = useTicketStore()
const { queryTicket } = ticketStore
const intervalId = ref(null)
const checkPath = (link: string) => {
  if (router.currentRoute.value.fullPath === `/user/${link}`) {
    return 'active'
  } else {
    return ''
  }
}
const unreadMessage = () => {
  const list = []
  ticketStore.tickets.forEach((item: any) => {
    if (
      item.thread.find(
        (message: any) => message.role !== 0 && message.read === null
      )
    ) {
      list.push(item)
    }
  })
  return list.length
}
onMounted(async () => {
  if (siteStore.siteData?.smsVerify === 1) {
    if (!PlayerStore.playerInfo?.smsVerify) {
      return navigateTo('/user/smsVerify')
    }
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

  const queryTicket_INTERVAL = 3 * 1000
  intervalId.value = setInterval(async () => {
    const res = await queryTicket()
    if (!res) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }, queryTicket_INTERVAL)
})
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})
const gameWindowOpen = () => {
  window.open(`${window.location.origin}/game`, '_blank')
}
watch(
  () => router.currentRoute.value.name,
  () => {
    if (siteStore.siteData?.smsVerify === 1) {
      if (!PlayerStore.playerInfo?.smsVerify) {
        return router.push('/user/smsVerify')
      }
    }
  }
)
const pledgeSocketStore = usePledgeSocketStore()

const scrollTop = ref(0)
const handleScroll = () => {
  scrollTop.value = window.scrollY
}

await onMounted(async () => {
  if (window) {
    window.addEventListener('scroll', handleScroll)
  }
  // 判斷gameType 是否有 5 pledge type
  if (siteStore.siteData?.gameType?.find((item: any) => item === 5)) {
    await pledgeSocketStore.startConnectWebSocket()
  }
})
onBeforeUnmount(() => {
  // 判斷gameType 是否有 5 pledge type
  if (siteStore.siteData?.gameType?.find((item: any) => item === 5)) {
    pledgeSocketStore.closeWebSocket()
  }
})
</script>
<template>
  <client-only>
    <ZwHeader :nav-fixed="scrollTop > 95" />
    <div class="user-view">
      <div class="userpage">
        <div class="form-block">
          <div class="gw template">
            <div class="form-container big">
              <input id="form-control" type="checkbox" hidden />
              <div class="form-row">
                <div class="left-block">
                  <label for="form-control" class="form-close">
                    <i class="fas fa-long-arrow-alt-left"></i>
                  </label>
                  <a target="_blank" class="auth" @click="gameWindowOpen">
                    <i class="fas fa-chart-line"></i>
                    {{ $lang('理單介面') }}
                  </a>
                  <a v-if="
                    siteStore.siteData?.gameType?.find(
                      (item: any) => item === 5
                    )
                  " :class="checkPath('pledge')" @click="navigateTo(`/user/pledge`)">
                    <i class="fas fa-coins"></i>
                    {{ $lang('質押') }}
                  </a>
                  <a :class="checkPath('info')" @click="navigateTo(`/user/info`)">
                    <i class="fas fa-user-circle"></i>
                    {{ $lang('職員列表') }}
                  </a>
                  <!-- <a
                  :class="checkPath('activity')"
                  @click="navigateTo(`/user/activity`)"
                >
                  <i class="fas fa-gift"></i>
                  {{ $lang('優惠活動') }}
                </a> -->
                  <a :class="checkPath('setting')" @click="navigateTo(`/user/setting`)">
                    <i class="fab fa-whmcs"></i>
                    {{ $lang('職員設定') }}
                  </a>
                  <!-- <a
                  :class="checkPath('deposit')"
                  @click="navigateTo(`/user/deposit`)"
                >
                  <i class="fas fa-wallet"></i>
                  {{ $lang('置入資產') }}
                </a> -->
                  <a :class="checkPath('withdraw') || checkPath('bank')" @click="navigateTo(`/user/withdraw`)">
                    <i class="fas fa-wallet"></i>
                    {{ $lang('薪資提款') }}
                  </a>
                  <!-- <a
                :class="checkPath('gamePage')"
                @click="navigateTo(`/user/gamePage`)"
              >
                <i class="fab fa-fantasy-flight-games"></i>
                {{ $lang("其他交易") }}
              </a> -->
                  <!-- <a :class="checkPath('news')" @click="navigateTo(`/user/news`)">
                  <i class="far fa-comment-alt"></i>
                  {{ $lang('網站公告') }}
                </a> -->
                  <a :class="checkPath('record')" @click="navigateTo(`/user/record`)">
                    <i class="fas fa-history"></i>
                    {{ $lang('交易紀錄') }}
                  </a>
                  <!-- <a
                  :class="checkPath('message')"
                  class="message"
                  @click="navigateTo(`/user/message`)"
                >
                  <i class="far fa-comments"></i>
                  {{ $lang('站內訊息') }}
                  <span v-if="unreadMessage() > 0" class="badgeOpint"> </span>
                </a> -->
                  <a :href="siteStore.chatbox" target="_blank">
                    <i class="fas fa-headset"></i>
                    {{ $lang('聯繫客服') }}
                  </a>
                </div>
                <div class="right-block">
                  <label for="form-control" class="form-btn">
                    <i class="fas fa-list"></i>
                  </label>
                  <router-view></router-view>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ZwFooter />
  </client-only>
</template>
<style scoped lang="sass">
.user-view
  padding: 100px 0 0
.pages
  padding: 80px 0 
@import '@/assets/sass/coin2.scss'
.form-block
  min-height: 80dvh
  max-height: 100dvh
  overflow-y: auto
  @media screen and (max-width: 768px)
    padding: 0 0 100px 0
input[type='checkbox']
  display: none
</style>

<style scoped lang="sass">
.left-block
  a
    svg
      margin-right: 10px
</style>

<style scoped>
.form-row {
  cursor: pointer;
}

.message {
  position: relative;
}

.badgeOpint {
  background-color: #ff0000;
  color: #fff;
  border-radius: 50%;
  /* position: absolute; */
  margin: 0 0 0 10px;
  width: 10px;
  height: 10px;
}
</style>

<style scoped lang="sass">
.navBar
  display: flex
  justify-content: space-between
  align-items: center
  padding: 25px 30px
  .left
    width: 50%
  .right
    width: 50%
    display: flex
    justify-content: flex-end
    align-items: center
</style>

<style scoped lang="sass">
a
  border-radius: 4px
  min-width: 100px
  padding: 5px 16px
  margin: .5em
  font-size: 14px
  letter-spacing: .15px
  white-space: normal
  transition: all .5s ease-in-out
  text-align: center
  font-weight: bold
  cursor: pointer
.btn-login
  max-width: 130px
  background-color: #262f37
  border: 1px solid #262f37
  color: #fff
  display: flex
  align-items: center
  justify-content: center
  flex-flow: row nowrap
  border-radius: 50px
  svg
    width: 22px
    display: inline-block
    margin-left: 10px
.btn-reg
  background-color: rgba(255, 255, 255, .8)
  backdrop-filter: blur(30px)
  border: 1px solid #ebedf0
  color: #0f1215
</style>

<style>
.input {
  min-height: 16px;
}
</style>

<style lang="sass">
@keyframes heroIn
  from
    opacity: 0.8
    transform: scale(1.2)
  to
    opacity: 1
    transform: scale(1)
</style>

<style lang="sass">
.only-pc
  display: none

@media screen and (min-width: 768px)
  .only-mobile
    display: none

  .only-pc
    display: flex
</style>

<style scoped lang="sass">
.footer
  padding: 30px 40px 50px
  background-color: #eee
  text-align: left

  &-container
    width: calc(50% - 2rem)
    margin: 0 auto 50px

  h2
    font-size: 18px
    font-weight: bold
    margin-bottom: 16px

  &-body
    .text
      display: block
      font-size: 16px
      margin-bottom: 16px
      color: #000000cc
      cursor: pointer

  &-support
    font-size: 12px
    color: #000000cc
</style>
