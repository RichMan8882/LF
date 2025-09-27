declare global {
  interface Window {
    Swiper: any
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swiper: window.Swiper
    }
  }
})
