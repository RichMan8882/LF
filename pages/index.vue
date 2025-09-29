<script lang="ts" setup>
const siteStore = useSiteStore()
const { isLogin } = useAuthStore()

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
const pageRef = ref()
onMounted(() => {
  pageRef.value.addEventListener('scroll', handleScroll)
})
const scrollToSection = () => {
  const section = document.getElementById('testsec')
  if (section) {
    section.scrollIntoView()
  }
}
const isWhite = ref(false)
const scrolly = ref()
const handleScroll = () => {
  isWhite.value = pageRef.value.scrollTop >= 100
  scrolly.value = pageRef.value.scrollTop
}
const activeIndex = ref(0)

</script>

<template>
  <div ref="pageRef" class="page">
    <client-only>
      <router-view :page-scroll-top="scrolly" />
    </client-only>
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
