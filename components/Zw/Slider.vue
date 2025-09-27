<script setup>
const { t } = useI18n()
const router = useRouter()

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: () => []
  }
})

const { $swiper } = useNuxtApp()

onMounted(() => {
  const swiper = new $swiper('.' + props.name, {
    loop: true,
    pagination: {
      el: '.swiper-pagination'
    },
    autoplay: {
      delay: 3000
    }
  })
})
</script>

<template>
  <div :class="[props.name, 'renew']">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <div
        v-for="(item, index) in props.images"
        :key="`renew-${index}`"
        class="swiper-slide renew-item"
      >
        <div class="renew-img">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<style lang="sass">
.swiper-pagination-bullet
  width: 10px
  height: 10px
  border-radius: 10px
  background-color: darken(#ccc, 5)

  &-active
    background-color: darken(#ccc, 15)
</style>

<style scoped lang="sass">
.renew
  overflow: hidden
  padding-bottom: 50px

  &-img
    width: 100%

    img
      width: 100%
</style>
