<script lang="ts" setup>
const playerStore = usePlayerStore()
const siteStore = useSiteStore()
const { t } = useI18n()

const walletName = (type) => {
  switch (type) {
    case 1:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('美元資產(電子錢包)')
    case 2:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('電力資產(電子錢包)')
    case 3:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('商城資產(電子錢包)')
    case 4:
      return siteStore.siteData.mainWalletType === type
        ? t('我的資產(電子錢包)')
        : t('質押資產(電子錢包)')
    default:
      return t('其他資產')
  }
}
</script>
<template>
  <div class="page">
    <div class="sec-title">
      <span>{{ $lang('職員列表') }}</span>
      <i class="fas fa-user-circle"></i>
    </div>
    <div class="sec-form-block">
      <div class="user-title">
        <span>{{ $lang('姓名') }}</span>
        <span>{{ playerStore.playerInfo.username }}</span>
      </div>
      <div class="user-title">
        <span>{{ $lang('職員帳號') }}</span>
        <span>{{ playerStore.playerInfo.account }}</span>
      </div>
      <div class="user-title">
        <span>{{ $lang('手機') }}</span>
        <span
          >{{ playerStore.playerInfo.countryCode }}
          {{ playerStore.playerInfo.mobile | maskMobile }}</span
        >
      </div>
      <div class="user-title">
        <span>{{ $lang('聯絡方式') }}</span>
        <span
          >《{{ playerStore.playerInfo.social.platform }}》{{
            playerStore.playerInfo.social.id
          }}</span
        >
      </div>
      <div
        v-for="(item, index) in playerStore.playerInfo?.wallet"
        class="user-title"
      >
        <span class="b-$lang">
          <b class="zh_TW">{{ walletName(item.type) }}</b>
        </span>
        <span class="get-wallet">
          $ {{ new Intl.NumberFormat('zh-tw').format(item.balance) }}
        </span>
      </div>
    </div>
    <InstructionSection></InstructionSection>
  </div>
</template>
<style scoped lang="sass">
@import '@/assets/sass/coin2.scss'
</style>
