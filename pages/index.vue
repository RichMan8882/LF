<script lang="ts" setup>
const router = useRouter()
const referrerCodeCookiee = useCookie('referrerCode', {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
}) as any
await useAsyncData(async () => {
  if (router.currentRoute.value.query.referrer) {
    referrerCodeCookiee.value =
      router.currentRoute.value.query.referrer.replace(/[^a-zA-Z0-9]/g, '')
  }
})
</script>

<template>
  <div class="page">
    <!-- <document :content="documentContent"></document> -->
    <ZwHeader />
    <router-view />

    <footer class="footer">
      <div class="footer-container">
        <h2>
          {{ $lang('聯絡我們') }}
        </h2>

        <div class="footer-body">
          <a href="/">
            {{ $lang('支援中心') }}
          </a>
          <a href="/">
            {{ $lang('隱私權政策') }}
          </a>
        </div>
      </div>

      <p class="footer-support">
        {{
          $lang(
            '建議使用Chrome 74.0.3729.169，Firefox 67.0.1，Safari 5.1.10或相容瀏覽器並具有1024 x 768（或更高）解析度的螢幕，以獲得最佳瀏覽體驗。'
          )
        }}
      </p>
    </footer>
  </div>
</template>

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
.page
  position: relative
  width: 100dvw
  height: 100dvh
  overflow-y: auto
  overflow-x: hidden
  background-color: #fff

.footer
  padding: 30px 40px 50px
  background-color: #eee

  &-container
    width: calc(50% - 2rem)
    margin: 0 auto 50px

  h2
    font-size: 18px
    font-weight: bold
    margin-bottom: 16px

  &-body
    a
      display: block
      font-size: 16px
      margin-bottom: 16px
      color: #000000cc

  &-support
    font-size: 12px
    color: #000000cc
</style>
