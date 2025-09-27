<script lang="ts" setup>
// import
const { t } = useI18n()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const orderStore = useOrderStore()
const { queryKlines, queryRounds } = useGameStore()
const { getListenkey } = PlayerStore
const { locale } = useI18n()
const lang = locale.value
const { queryInstruction, queryNews } = useSiteStore()
const router = useRouter()
const timeoutId = ref(null)
const hourDegrees = ref(0)
const minuteDegrees = ref(0)
const secondDegrees = ref(0)
// data
const coinBoxChecked = ref(false)
const record = ref({
  title: '當前委託',
  type: 'currentOrder',
  search: true
})
const search = ref({
  pair: '',
  roundId: '',
  dateRangeStart: '',
  dateRangeEnd: ''
})
const showToolPopup = ref(false)
const symbol = ref(
  Object.keys(PlayerStore.playerInfo.availablePairs).find(
    (key) => PlayerStore.playerInfo.availablePairs[key].isOpen
  )
)
const availableCurrency = ref([])
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const socket = ref(null)
const socketConnected = ref(false)
const betData = ref({
  symbol: '',
  option: [],
  amount: '',
  roundId: ''
})
const recordList = ref([])
const historyRecordList = ref([])
// 圖表數據值
const nowTimestamp = ref(null)
const socketNewPrice = ref(null)
const isFirstGet = ref(true)
const createChartData = ref(null)
const socketCurrentRoundCountdown = ref(0)
const news = ref(null)
const rule = ref(null)
const disableBet = ref(false)
const currentSelectSymbolPrice = ref(0)
const selectSymbol = () => {
  closeWebSocket()
  document.getElementById('coinBox').checked = false
}
// method
const goPopup = async (title: string) => {
  console.log('recordList', recordList)
  record.value.title = title
  showToolPopup.value = true
  search.value.pair = symbol.value
  if (title === '當前委託') {
    record.value.type = 'currentOrder'
    record.value.search = true
    return
  }
  if (title === '歷史委託') {
    record.value.type = 'historyOrder'
    record.value.search = true
    return
  }
  if (title === '歷史盤口') {
    record.value.title = ' 歷史總覽'
    const response = await queryRounds({
      pair: symbol.value
    })
    record.value.type = 'historyRecord'
    historyRecordList.value = response.data.result
    record.value.search = true
    return
  }
  if (title === '網站公告') {
    record.value.type = 'announcement'
    record.value.search = false
    return
  }
  if (title === '規則說明') {
    record.value.type = 'rule'
    record.value.search = false
  }
}
const closePopup = () => {
  showToolPopup.value = false
}
const connectRecordList = (title: String) => {
  switch (title) {
    case 'currentOrder':
      return recordList.value.filter((item) => !item.closeAt)
    case 'historyOrder':
      return recordList.value.filter((item) => item.closeAt)
  }
}
const addBetGameType = (type: string) => {
  if (betData.value.option.includes(type)) {
    betData.value.option = betData.value.option.filter((item) => item !== type)
  } else {
    betData.value.option.push(type)
  }
  console.log(betData.value.option)
}
const checkBetData = () => {
  if (!disableBet.value) {
    disableBet.value = true
    try {
      betData.value.symbol = symbol.value
      console.log(betData.value)
      const pairData = PlayerStore.playerInfo.availablePairs[symbol.value]
      // console.log("pairData", pairData);
      // banned action
      if (pairData.banned) {
        ElNotification({
          message: pairData.message,
          type: 'error',
          showClose: false
        })
        return
      }
      if (betData.value.amount === '') {
        ElNotification({
          message: `${t('請輸入下單金額')}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (betData.value.option.length === 0) {
        ElNotification({
          message: `${t('請選擇參與遊戲模式')}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (parseFloat(betData.value.amount) < siteStore.siteData.minBetAmount) {
        ElNotification({
          message: ` ${t('最低交易金額為')} $ ${siteStore.siteData.minBetAmount}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (parseFloat(betData.value.amount) > siteStore.siteData.maxBetAmount) {
        ElNotification({
          message: `${t('最高交易金額為')} $ ${siteStore.siteData.maxBetAmount}`,
          type: 'error',
          showClose: false
        })
        return
      }
      setTimeout(
        async () => {
          betData.value.amount = betData.value.amount.toString()
          const response = await orderStore.bet(betData.value)
          if (response.success) {
            ElMessageBox.alert(
              `
              <p style="margin:0 0 8px 0"> ${t('單號')}: ${response.data.roundId} </p>
              
               <p style="margin:0 0 8px 0"> ${t('交易期別')}: ${gameOptionNameList(
                 response.data.option
               )} </p>
               <p style="margin:0 0 8px 0"> ${t('時間')}: ${formatDate(
                 response.data.openAt
               )} </p>
             `,
              `${t('下單成功')}`,
              {
                confirmButtonText: `${t('確認')}`,
                center: true,
                dangerouslyUseHTMLString: true
              }
            )
          } else {
            ElNotification({
              title: response.data.message,
              type: 'error',
              showClose: false
            })
          }
          clearBetData()
          await PlayerStore.fetchInfo()
          const queryOrderRes = await orderStore.queryOrder({
            pair: symbol.value
          })
          recordList.value = queryOrderRes.data.result
        },
        (pairData.delay + 1) * 1000
      )
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        disableBet.value = false
      }, 3000)
    }
  }
}
const gameOptionOdd = (type: number) => {
  switch (type) {
    case 0:
      return PlayerStore.playerInfo.gameOptions[0].odds * 100 + '%'
    case 1:
      return PlayerStore.playerInfo.gameOptions[1].odds * 100 + '%'
    case 2:
      return PlayerStore.playerInfo.gameOptions[2].odds * 100 + '%'
    case 3:
      return PlayerStore.playerInfo.gameOptions[3].odds * 100 + '%'
    case 4:
      return PlayerStore.playerInfo.gameOptions[4].odds * 100 + '%'
    case 5:
      return PlayerStore.playerInfo.gameOptions[5].odds * 100 + '%'
    case 6:
      return PlayerStore.playerInfo.gameOptions[6].odds * 100 + '%'
    default:
      return ''
  }
}

const showOption = (type: number) => {
  switch (type) {
    case 0:
      return PlayerStore.playerInfo.gameOptions[0].isOpen
    case 1:
      return PlayerStore.playerInfo.gameOptions[1].isOpen
    case 2:
      return PlayerStore.playerInfo.gameOptions[2].isOpen
    case 3:
      return PlayerStore.playerInfo.gameOptions[3].isOpen
    case 4:
      return PlayerStore.playerInfo.gameOptions[4].isOpen
    case 5:
      return PlayerStore.playerInfo.gameOptions[5].isOpen
    case 6:
      return PlayerStore.playerInfo.gameOptions[6].isOpen
    default:
      return ''
  }
}

const clearBetData = () => {
  betData.value = {
    symbol: '',
    option: [],
    amount: '',
    roundId: ''
  }
  document.getElementById('game-1').checked = false
  document.getElementById('game-2').checked = false
  document.getElementById('game-3').checked = false
  document.getElementById('game-4').checked = false
  document.getElementById('game-5').checked = false
  document.getElementById('game-6').checked = false
  document.getElementById('game-7').checked = false
}

const initMilliseconds = (timestamp: any) => {
  const newDate = new Date(timestamp)
  newDate.setMilliseconds(0)
  return newDate.getTime()
}

const randomVolume = () => {
  return parseFloat((Math.random() * 100 + 1).toFixed(2))
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const gameOptionNameList = (list: Array) => {
  const result = []
  list.forEach((item) => {
    result.push(gameOptionName(item))
  })
  return result.join(', ')
}
const gameOptionName = (type: Number) => {
  switch (type) {
    case 0:
      return `${t('高')}`
    case 1:
      return `${t('低')}`
    case 2:
      return `${t('單')}`
    case 3:
      return `${t('雙')}`
    case 4:
      return symbol.value === 'LEAHD3M' ? `${t('發送')}` : `${t('做多')}`
    case 5:
      return symbol.value === 'LEAHD3M' ? `${t('接收')}` : `${t('做空')}`
    case 6:
      return `${t('反指標')}`
    default:
      return ''
  }
}
const gameResultName = (type: Number) => {
  // 0 : 高、1 : 低、2 : 單、3 : 雙、4 : 漲、5 : 跌 6 : 合
  switch (type) {
    case 0:
      return `${t('高')}`
    case 1:
      return `${t('反指標')}`
    case 2:
      return `${t('單')}`
    case 3:
      return `${t('雙')}`
    case 4:
      return `${t('發送')}`
    case 5:
      return `${t('做空')}`
    case 6:
      return `${t('和')}`
    default:
      return `${t('未知')}`
  }
}
const getChartData = async (timestamp: any) => {
  // 取得遠端資料
  // 取 3 分鐘的資料
  const now = new Date(nowTimestamp.value)
  now.setSeconds(0, 0)
  now.setMinutes(now.getMinutes() - 3)
  const startTime = now.getTime()
  const endTime = timestamp
  const data = {
    symbol: symbol.value,
    interval: '1',
    startTime,
    endTime
  }
  const klineData = await queryKlines(data)
  if (klineData.success) {
    isFirstGet.value = false // 第一次獲取開關關閉
    const { klines } = klineData.data
    const newKLines = Object.entries(klines).map(([timestamp, value]) => {
      const volume = randomVolume()
      const turnover = Number(value.close) * volume
      return {
        timestamp: Number(timestamp) * 1000,
        open: Number(value.open),
        close: Number(value.close),
        high: Number(value.high),
        low: Number(value.low),
        volume,
        turnover
      }
    })
    createChartData.value = { newKLines, time: timestamp }
  }
}

const searchOrder = async () => {
  const startDate = new Date(search.value.dateRangeStart)
  search.value.dateRangeStart = startDate.getTime()
  const endDate = new Date(search.value.dateRangeEnd)
  search.value.dateRangeEnd = endDate.getTime()
  console.log('searchOrder', search.value)
  if (!search.value.dateRangeStart) {
    delete search.value.dateRangeStart
  }
  if (!search.value.dateRangeEnd) {
    delete search.value.dateRangeEnd
  }
  if (record.value.type !== 'historyRecord') {
    const response = await orderStore.queryOrder(search.value)
    if (response.success) {
      recordList.value = response.data.result
    } else {
      ElNotification({
        message: response.message,
        type: 'error'
      })
    }
  } else {
    // 搜尋盤口
    const response = await queryRounds(search.value)
    if (response.success) {
      historyRecordList.value = response.data.result
    } else {
      ElNotification({
        message: response.message,
        type: 'error'
      })
    }
  }
  search.value.dateRangeStart = ''
  search.value.dateRangeEnd = ''
  search.value.roundId = ''
}

const pickerOptions = {
  daterange: {
    maxTime: '', // 最大日期
    minTime: '', // 最小日期
    max: 30 // 限制范围 30天
  }
}
const disabledDate = (time) => {
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  return time.getTime() < threeMonthsAgo.getTime()
}
// ctyptoData
const reconnected = ref(true)
const closeWebSocket = async () => {
  if (socket.value) {
    socket.value.close()
  }
}
// 連接 socket
const startConnectWebSocket = async () => {
  const getListenkeyRes = await getListenkey()
  console.log('getListenkeyRes', getListenkeyRes)
  const runtimeConfig = useRuntimeConfig()
  const { SOCKETBASE } = runtimeConfig.public
  socket.value = new WebSocket(
    `${SOCKETBASE}/${getListenkeyRes.data.listenkey}`
  )
  socket.value.onopen = (event) => {
    console.log('Connected to socket', event)
    socketConnected.value = true
  }
  socket.value.onmessage = async (e) => {
    const message = JSON.parse(e.data)
    // console.log('收到來自 socket 的訊息', message);
    const { event, data } = message
    switch (event) {
      case 'KLINE_UPDATE': {
        // 右側列表數據
        data.forEach((item) => {
          if (availableCurrency.value.length === 0) {
            if (
              PlayerStore.playerInfo.availablePairs[item.symbol] &&
              PlayerStore.playerInfo.availablePairs[item.symbol].isOpen
            ) {
              availableCurrency.value.push({
                symbol: item.symbol,
                price: [
                  {
                    open: parseFloat(item.price.open),
                    close: parseFloat(item.price.close)
                  }
                ],
                symbolData: PlayerStore.playerInfo.availablePairs[item.symbol]
              })
            }
          } else if (
            PlayerStore.playerInfo.availablePairs[item.symbol] &&
            PlayerStore.playerInfo.availablePairs[item.symbol].isOpen
          ) {
            const currency = availableCurrency.value.find(
              (currency) => currency.symbol === item.symbol
            )
            if (currency) {
              currency.price.push({
                open: parseFloat(
                  currency.price[currency.price.length - 1].close
                ),
                close: parseFloat(item.price.close)
              })
            } else {
              availableCurrency.value.push({
                symbol: item.symbol,
                price: [
                  {
                    open: parseFloat(item.price.open),
                    close: parseFloat(item.price.close)
                  }
                ],
                symbolData: PlayerStore.playerInfo.availablePairs[item.symbol]
              })
            }
          }
        })

        // 圖表列表數據
        const { timestamp: correctTimestamp } = message
        const timestamp = initMilliseconds(correctTimestamp)
        nowTimestamp.value = timestamp
        const symbolData = data.find((item) => item.symbol === symbol.value)

        // 已選擇數據整理
        if (symbolData) {
          const { price } = symbolData
          // 數據整理
          let newPrice = Object.entries(price).reduce((acc, [key, value]) => {
            acc[key] = parseFloat(value)
            return acc
          }, {})
          const volume = randomVolume()
          const turnover = newPrice.close * volume
          newPrice = {
            timestamp,
            ...newPrice,
            turnover,
            volume
          }
          socketNewPrice.value = newPrice

          // 第一次取得所有數據 & 產生空資料
          if (isFirstGet.value) getChartData(timestamp)

          // currentSelectSymbolPrice
          currentSelectSymbolPrice.value = price.close
        }
        break
      }
      case 'SERVER_TIME': {
        const { currentRoundId, currentRoundCountdown } = data
        betData.value.roundId = currentRoundId
        socketCurrentRoundCountdown.value = currentRoundCountdown
        // console.log(data);
        if (currentRoundCountdown === 59) {
          await PlayerStore.fetchInfo()
          const queryOrderRes = await orderStore.queryOrder({
            pair: symbol.value
          })
          recordList.value = queryOrderRes.data.result
        }
        break
      }
      default:
        break
    }
  }
  socket.value.onclose = async () => {
    console.log('Disconnected from socket')
    isFirstGet.value = true
    socketConnected.value = false
    if (reconnected) {
      await startConnectWebSocket()
      console.log('reconnected to socket')
    }
  }

  socket.value.onerror = (error) => {
    socketConnected.value = false
    console.error('WebSocket error:', error)
  }
}
// 更新時鐘的函數
const updateClock = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  hourDegrees.value = (hours % 12) * 30 + minutes * 0.5
  minuteDegrees.value = minutes * 6
  secondDegrees.value = seconds * 6
}

// 初次呼叫更新時鐘
updateClock()

// 定義一些狀態變數和函數
const currentTime = ref('')
const countdown60 = ref(60)
const countdown70 = ref(70)
const inputValue = ref(50)

// 更新當前時間的函數
const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

// 更新 60 秒倒數計時的函數
const updateCountdown60 = () => {
  if (countdown60.value > 0) {
    countdown60.value--
  } else {
    countdown60.value = 60
  }
}

// 更新 70 秒倒數計時的函數
const updateCountdown70 = () => {
  if (countdown70.value > 0) {
    countdown70.value--
  } else {
    countdown70.value = 70
  }
}

const counting = ref({
  mock1: 251110,
  mock2: 242419
})

const updateCountingNumber = (value, min, max, fixed) => {
  counting.value[value] = parseFloat(
    (Math.random() * (max - min) + min).toFixed(fixed)
  )
}

const betFormatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k'
  } else {
    return num.toString()
  }
}

const timeTimer = ref(null)
const firstTimer = ref(null)
const secondTimer = ref(null)

// 組件掛載時設置計時器並更新時間和倒數計時
await onMounted(async () => {
  await startConnectWebSocket()
  const pair = symbol.value
  const type = 'game'
  const path = 'game'
  /** await Promise then  */
  // 開始加載數據（此處沒有使用 await，因此主線程不會被阻塞）
  const queryOrderPromise = orderStore.queryOrder({ pair })
  const queryInstructionPromise = queryInstruction(lang, type)
  const queryNewsPromise = queryNews(lang, path)
  // 使用 .then() 方法處理異步任務結果
  queryOrderPromise
    .then((queryOrderRes) => {
      // 處理響應結果
      recordList.value = queryOrderRes.data.result
    })
    .catch((error) => {
      console.error('Error loading order data:', error)
    })

  queryInstructionPromise
    .then((queryInstructionRes) => {
      // 處理響應結果
      rule.value = queryInstructionRes.data
    })
    .catch((error) => {
      console.error('Error loading instruction data:', error)
    })

  queryNewsPromise
    .then((queryNewsRes) => {
      // 處理響應結果
      news.value = queryNewsRes.data
    })
    .catch((error) => {
      console.error('Error loading news data:', error)
    })
  /** await Promise then  */

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = setTimeout(
      () => {
        navigateTo('/user')
      },
      siteStore.siteData?.gameCenterOutInterval
        ? siteStore.siteData?.gameCenterOutInterval * 60 * 1000
        : 5 * 60 * 1000
    ) // 5 分钟
  }
  window.onload = resetTimer
  window.onmousemove = resetTimer
  window.onmousedown = resetTimer
  window.ontouchstart = resetTimer
  window.onclick = resetTimer
  window.onscroll = resetTimer
  window.onkeypress = resetTimer

  updateTime()
})

// 組件卸載時清除計時器
onUnmounted(() => {})

onBeforeUnmount(() => {
  clearInterval(firstTimer)
  clearInterval(secondTimer)
  reconnected.value = false
  console.log('closeWebSocket', reconnected.value)
  closeWebSocket()
})

// 處理加法按鈕事件的函數
const addToInput = (value) => {
  betData.value.amount = value
}

const cryptoSelect = ref(false)
const openCryptoSelect = () => {
  cryptoSelect.value = !cryptoSelect.value
}
const cryptoName = (crypto) => {
  switch (crypto.symbol) {
    case 'BTCUSDT':
      return '太陽能'
    case 'WFEURUSD':
      return '風能'
    case 'WFGBPUSD':
      return '地熱能'
    case 'WFUSDTWD':
      return '海洋能'
    default:
      return crypto.label || crypto.name || crypto.symbol
  }
}
// action methods
const symbolChange = (symbol: string) => {
  switch (symbol) {
    case 'BTCUSDT':
      return '太陽能'
    case 'WFEURUSD':
      return '風能'
    case 'WFGBPUSD':
      return '地熱能'
    case 'WFUSDTWD':
      return '海洋能'
    default:
      return (
        PlayerStore.playerInfo.availablePairs[symbol]?.label ||
        PlayerStore.playerInfo.availablePairs[symbol]?.name ||
        PlayerStore.playerInfo.availablePairs[symbol]?.symbol
      )
  }
}

const progress = ref(0)

const totalDuration = 60 // 總時間是 60 秒

// 監聽 socketCurrentRoundCountdown 的變化，並更新進度條
watch(socketCurrentRoundCountdown, (newValue) => {
  if (newValue >= 0 && newValue <= totalDuration) {
    progress.value = ((totalDuration - newValue) / totalDuration) * 100 // 進度條會隨時間遞增
  } else {
    progress.value = 0 // 如果時間超過範圍，進度條保持為 0
  }
})
</script>

<template>
  <div id="Base_Member" class="page">
    <input id="nav-control" type="checkbox" hidden />
    <header>
      <div class="b-container mobile-pad">
        <div class="header-row">
          <div class="left-block">
            <div class="logo">
              <img :src="siteStore.siteData.logo" alt="" data-webLogo />
            </div>
            <div class="info">
              <i class="fas fa-user"></i>
              <span data-userName>{{ PlayerStore.playerInfo.username }}</span>
            </div>
            <div class="info">
              <i class="fas fa-dollar-sign"></i>
              <span data-userWallet>
                {{
                  new Intl.NumberFormat('zh-TW').format(
                    PlayerStore.playerInfo.balance
                  )
                }}</span
              >
            </div>
            <div class="info game-time">
              Now Time：<span>{{ currentTime }}</span>
            </div>
          </div>
          <div class="right-block">
            <label for="nav-control" class="nav-icon">
              <i class="fas fa-bars"></i>
            </label>
          </div>
        </div>
      </div>
    </header>
    <main class="gw">
      <div class="b-container">
        <div class="main-block">
          <div class="main-left">
            <!-- <div class="left-title">
              <span>{{ $lang('名稱') }}</span>
              <span>{{ $lang('匯率') }}</span>
            </div> -->
            <div class="itemRow" data-pairRow>
              <a
                v-for="item in availableCurrency"
                :key="item.symbol"
                class="nav-list"
                :class="{ active: symbol === item.symbol }"
                @click="(symbol = item.symbol), selectSymbol()"
              >
                <div class="nav-name" data-game data-itemName>
                  {{
                    item.symbolData.label ||
                    item.symbolData.name ||
                    item.symbolData.symbol
                  }}
                </div>
                <!-- <div class="itemInfo">
                  <div
                    class="view-item-amplitude"
                    :data-type="
                      item.price[item.price.length - 1].close >
                      item.price[item.price.length - 1].open
                        ? 'up'
                        : 'down'
                    "
                  >
                    <span class="view-item-title">{{ $lang('即時') }}</span>
                    <span class="view-item-data" data-pairNow>{{
                      item.price[item.price.length - 1].open
                    }}</span>
                  </div>
                  <div class="view-item-amplitude">
                    <span class="view-item-title">{{ $lang('收盤') }}</span>
                    <span class="text-right" data-pairLast>{{
                      item.price[item.price.length - 1].close
                    }}</span>
                  </div>
                </div> -->
              </a>
            </div>
          </div>
          <div class="main-game">
            <!-- Frame -->
            <div id="inside-page" data-bopt>
              <div v-show="symbol === 'LEAHD3M'" class="cardBox">
                <video
                  src="@/assets/image/game_zw.mp4"
                  autoplay
                  loop
                  muted
                  playsinline
                ></video>
                <div class="containers">
                  <div class="cardContainers">
                    <div class="speedContainers">
                      <div id="speedGauge">
                        <div class="gauge">
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="slice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="subslice"></div>
                          <div class="rpm">L</div>
                          <div class="rpm"></div>
                          <div class="rpm"></div>
                          <div class="rpm"></div>
                          <div class="rpm">N</div>
                          <div class="rpm"></div>
                          <div class="rpm"></div>
                          <div class="rpm"></div>
                          <div class="rpm">H</div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSlice"></div>
                          <div class="rpmSpeed">0</div>
                          <div class="rpmSpeed">10</div>
                          <div class="rpmSpeed">15</div>
                          <div class="rpmSpeed">20</div>
                          <div class="rpmSpeed">25</div>
                          <div class="rpmSpeed">30</div>
                          <div class="rpmSpeed">35</div>
                          <div class="rpmSpeed">40</div>
                          <div class="rpmSpeed">50</div>
                          <div class="rpmSpeed">60</div>
                          <div class="rpmSpeed">70</div>
                          <div class="rpmSpeed">75</div>
                          <div class="rpmSpeed">80</div>
                          <div class="rpmSpeed">85</div>
                          <div class="rpmSpeed">90</div>
                          <div class="rpmSpeed">95</div>
                          <div class="rpmSpeed">100</div>
                          <div id="sui"></div>
                          <div id="suiCircle" class="suiCircle"></div>
                          <div class="bottomStroke">
                            <div class="speedPlus">
                              {{ currentSelectSymbolPrice }}
                            </div>
                          </div>
                          <div class="gaugeCircle1"></div>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="title">
                        {{ $lang('數據碼') }} {{ betData.roundId }}
                      </div>
                      <div class="info">
                        <div class="image">
                          <img src="@/assets/image/gameIcon.png" alt="" />
                        </div>
                        <div class="text">
                          <div class="name">{{ symbolChange(symbol) }}</div>
                          <div class="value">
                            {{ currentSelectSymbolPrice }}
                          </div>
                        </div>
                      </div>
                      <div class="time">
                        <div class="text"></div>
                        <div class="value">
                          <div class="countdown-bar">
                            <div
                              class="progress"
                              :style="{ width: `${progress}%` }"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="box">
                        <div class="mock1">
                          <div class="text">
                            {{ $lang('本日統計全球數據碼') }}
                          </div>
                          <div class="value">{{ counting.mock1 }}</div>
                        </div>
                        <div class="mock2">
                          <div class="text">
                            {{ $lang('剩餘時間') }}
                          </div>
                          <div class="value">
                            {{ socketCurrentRoundCountdown }}s
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="symbol !== 'LEAHD3M'" class="game-box">
                <gameChart
                  :symbol="symbol"
                  :socket-new-price="socketNewPrice"
                  :create-chart-data="createChartData"
                  :now-timestamp="nowTimestamp"
                  :socket-current-round-countdown="socketCurrentRoundCountdown"
                />
              </div>
              <div class="analysis-box" hidden>
                <input id="analysis-control" type="checkbox" hidden />
                <label for="analysis-control" class="analysis-on">{{
                  $lang('路子')
                }}</label>
                <div class="analysis">
                  <!-- @record -->
                  <div class="nav nav-tabs tab-page">
                    <!-- @title -->
                    <div
                      data-toggle="tab"
                      href="#page"
                      class="tab-page-item"
                      data-road="111"
                    >
                      111
                    </div>
                    <!-- @title -->
                  </div>
                  <div class="tab-content tab-box">
                    <!-- @content -->
                    <div id="page-1" class="tab-box-item tab-pane fade show">
                      <div class="table">
                        <!-- @list -->
                        <div class="cell -1" title="1">1</div>
                        <!-- @list -->
                      </div>
                    </div>
                    <!-- @content -->
                  </div>
                  <!-- @record -->
                </div>
                <label for="analysis-control" class="analysis-off">
                  <i class="fas fa-sign-out-alt"></i>
                </label>
              </div>
              <div class="control-box">
                <div class="form">
                  <input
                    id="game-1"
                    class="gameType"
                    name="game-1"
                    type="checkbox"
                    data-gameType
                    data-group="1"
                    hidden
                  />
                  <input
                    id="game-2"
                    class="gameType"
                    name="game-2"
                    type="checkbox"
                    data-gameType
                    data-group="1"
                    hidden
                  />
                  <input
                    id="game-3"
                    class="gameType"
                    name="game-3"
                    type="checkbox"
                    data-gameType
                    data-group="2"
                    hidden
                  />
                  <input
                    id="game-4"
                    class="gameType"
                    name="game-4"
                    type="checkbox"
                    data-gameType
                    data-group="2"
                    hidden
                  />
                  <input
                    id="game-5"
                    class="gameType"
                    name="game-5"
                    type="checkbox"
                    data-gameType
                    data-group="3"
                    hidden
                  />
                  <input
                    id="game-6"
                    class="gameType"
                    name="game-6"
                    type="checkbox"
                    data-gameType
                    data-group="3"
                    hidden
                  />
                  <input
                    id="game-7"
                    class="gameType"
                    name="game-7"
                    type="checkbox"
                    data-gameType
                    data-group="4"
                    hidden
                  />
                  <div class="button-row">
                    <div class="time-block">
                      <div class="game-uid" v-if="symbol === 'LEAHD3M'">
                        <h6>{{ $lang('數據碼') }}</h6>
                        <b data-roundNum>: {{ betData.roundId }}</b>
                      </div>
                      <div class="game-uid" v-else>
                        <h6>Grayscale Bitcoin Trust(BTC)</h6>
                        <b data-roundNum class="marginStyle"
                          >價格: {{ currentSelectSymbolPrice }}</b
                        >
                      </div>
                      <div class="end-time">
                        <h6 v-if="symbol === 'LEAHD3M'">
                          {{ $lang('測試時間') }}
                        </h6>
                        <h6 v-else>{{ $lang('倒數時間') }}</h6>
                        <div class="time-box gameTime">
                          <span id="time" class="pl-1">{{
                            socketCurrentRoundCountdown
                          }}</span
                          >s
                        </div>
                      </div>
                    </div>
                    <div class="button-item-row">
                      <div class="button-block">
                        <div
                          v-if="
                            showOption(0) ||
                            showOption(1) ||
                            showOption(2) ||
                            showOption(3)
                          "
                          class="button-item row-1"
                        >
                          <label
                            v-if="showOption(0)"
                            for="game-1"
                            class="green button-item"
                            @click="addBetGameType(0)"
                            >{{ gameOptionName(0)
                            }}<span class="odds">{{
                              gameOptionOdd(0)
                            }}</span></label
                          >
                          <label
                            v-if="showOption(1)"
                            for="game-2"
                            class="red"
                            @click="addBetGameType(1)"
                            >{{ gameOptionName(1)
                            }}<span class="odds">{{
                              gameOptionOdd(1)
                            }}</span></label
                          >
                          <label
                            v-if="showOption(2)"
                            for="game-3"
                            class="basis"
                            @click="addBetGameType(2)"
                            >{{ gameOptionName(2)
                            }}<span class="odds">{{
                              gameOptionOdd(2)
                            }}</span></label
                          >
                          <label
                            v-if="showOption(3)"
                            for="game-4"
                            class="basis"
                            @click="addBetGameType(3)"
                            >{{ gameOptionName(3)
                            }}<span class="odds">{{
                              gameOptionOdd(3)
                            }}</span></label
                          >
                        </div>
                        <div
                          v-if="showOption(4) || showOption(5)"
                          class="button-item row-2"
                        >
                          <label
                            v-if="showOption(4)"
                            for="game-5"
                            class="green"
                            @click="addBetGameType(4)"
                            >{{
                              symbol === 'LEAHD3M'
                                ? `${t('上傳')}`
                                : `${t('做多')}`
                            }}
                            <span class="odds" v-if="symbol !== 'LEAHD3M'">{{
                              gameOptionOdd(4)
                            }}</span>
                          </label>
                          <label
                            v-if="showOption(5)"
                            for="game-6"
                            class="red"
                            @click="addBetGameType(5)"
                            >{{
                              symbol === 'LEAHD3M'
                                ? `${t('下載')}`
                                : `${t('做空')}`
                            }}
                            <span class="odds" v-if="symbol !== 'LEAHD3M'">{{
                              gameOptionOdd(5)
                            }}</span>
                          </label>
                        </div>
                        <div v-if="showOption(6)" class="button-item row-3">
                          <label
                            v-if="showOption(6)"
                            for="game-7"
                            class="outer"
                            @click="addBetGameType(6)"
                            >{{ gameOptionName(6)
                            }}<span class="odds">{{
                              gameOptionOdd(6)
                            }}</span></label
                          >
                        </div>
                      </div>
                      <div class="money-rank">
                        <div class="rank-box">
                          <input id="add-control" type="checkbox" hidden />
                          <div class="outerSelect" data-coinList hidden></div>
                          <div class="add-box" data-quickSelect>
                            <button
                              v-for="item in siteStore.siteData.betAmounts"
                              type="button"
                              class="game-coin"
                              data-coin="100"
                              @click="betData.amount = `${Number(item)}`"
                            >
                              {{ betFormatNumber(item) }}
                            </button>
                            <!-- <button
                              type="button"
                              class="game-coin"
                              data-coin="100"
                              @click="betData.amount = '100'"
                            >
                              100
                            </button>
                            <button
                              type="button"
                              class="game-coin"
                              data-coin="100"
                              @click="betData.amount = '1000'"
                            >
                              1k
                            </button>
                            <button
                              type="button"
                              class="game-coin"
                              data-coin="100"
                              @click="betData.amount = '10000'"
                            >
                              10k
                            </button>
                            <button
                              type="button"
                              class="game-coin"
                              data-coin="100"
                              @click="betData.amount = '100000'"
                            >
                              100k
                            </button>
                            <button
                              type="button"
                              class="game-coin"
                              data-coin="100"
                              @click="betData.amount = '1000000'"
                            >
                              1M
                            </button> -->
                          </div>
                          <div class="add-arrow">
                            <label for="add-control"
                              ><i class="fas fa-caret-square-up"></i
                            ></label>
                            <input
                              id="keyInput"
                              v-model="betData.amount"
                              v-trim-input
                              type="text"
                              name="totalView"
                              autocomplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        class="btn-re"
                        type="button"
                        @click="clearBetData()"
                      >
                        {{ $lang('取消') }}
                      </button>
                      <button
                        class="btn-check"
                        type="button"
                        @click="checkBetData()"
                      >
                        {{ $lang('確定') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Frame -->
          </div>
          <div class="main-right">
            <div class="mobile-row">
              <div class="mobile-time game-time">Now Time：<span></span></div>
              <div class="info">
                <i class="fas fa-user"></i>
                <span data-userName>{{ PlayerStore.playerInfo.username }}</span>
              </div>
              <div class="info">
                <i class="fas fa-dollar-sign"></i>
                <span data-userWallet>
                  {{
                    new Intl.NumberFormat('zh-TW').format(
                      PlayerStore.playerInfo.balance
                    )
                  }}</span
                >
              </div>

              <label for="nav-control" class="nav-close">
                <i class="fas fa-times"></i>
              </label>
            </div>
            <div class="modal-link">
              <div class="info-item" @click="goPopup('當前委託')">
                <span class="fas fa-clipboard-list"></span>
                {{ $lang('當前委託') }}
              </div>
              <!-- <div class="info-item" @click="goPopup('歷史委託')">
                <span class="fas fa-history"></span>
                {{ $lang('歷史委託') }}
              </div>
              <div class="info-item" @click="goPopup('歷史盤口')">
                <span class="fas fa-award"></span>
                {{ $lang('歷史盤口') }}
              </div>
              <div class="info-item" @click="goPopup('網站公告')">
                <span class="fas fa-bullhorn"></span>
                {{ $lang('網站公告') }}
              </div>
              <div class="info-item" @click="goPopup('規則說明')">
                <span class="fas fa-question-circle"></span>
                {{ $lang('規則說明') }}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </main>
    <div v-if="showToolPopup" class="popup">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ record.title }}</h2>
          <button type="button" data-dismiss="modal" @click="closePopup">
            {{ $lang('關閉') }}
          </button>
        </div>
        <div class="modal-body modal-body-sp">
          <div data-type="1" class="log">
            <div
              v-if="record.type !== 'announcement' && record.type !== 'rule'"
              class="searchRow"
            >
              <div class="coinSelect">
                <select v-model="search.pair" name="coin" @change="searchOrder">
                  <option
                    v-for="item in availableCurrency"
                    :key="item.symbol"
                    :value="item.symbol"
                  >
                    {{
                      item.symbolData.label ||
                      item.symbolData.name ||
                      item.symbolData.symbol
                    }}
                  </option>
                </select>
              </div>
              <label for="inputSearch" class="inputDate"
                ><i class="fas fa-search"></i>
                <input
                  id="inputSearch"
                  v-model="search.roundId"
                  v-trim-input
                  type="text"
                  name="number"
                  :placeholder="`${$lang('請輸入期號')}`"
              /></label>
              <label for="dateStart" class="inputDate"
                ><i class="fas fa-calendar-alt"></i>
                <el-date-picker
                  v-model="search.dateRangeStart"
                  type="datetime"
                  :placeholder="`${$lang('起始時間')}`"
                  :default-time="defaultTime"
                  :disabled-date="disabledDate"
                >
                </el-date-picker>
              </label>
              <label for="dateEnd" class="inputDate"
                ><i class="fas fa-calendar-alt"></i>
                <el-date-picker
                  v-model="search.dateRangeEnd"
                  type="datetime"
                  :placeholder="`${$lang('結束時間')}`"
                  :default-time="defaultTime"
                  :disabled-date="disabledDate"
                >
                </el-date-picker>
              </label>
              <button type="button" class="searchBtn" @click="searchOrder">
                {{ $lang('搜尋') }}
              </button>
            </div>
            <div class="dataBlock">
              <!-- currentOrder -->
              <div v-if="record.type === 'currentOrder'" class="modal-1">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $lang('時間/幣種') }}</th>
                      <th>{{ $lang('投注內容') }}</th>
                      <th>{{ $lang('投注金額') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in connectRecordList('currentOrder')"
                      :key="index"
                    >
                      <td>
                        <div>{{ formatDate(item.openAt) }}</div>
                        <div>{{ item.symbol }}</div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('期號') }}: <span>{{ item.roundId }}</span>
                        </div>
                        <div>
                          {{ $lang('賠率') }}:
                          <span>{{ item.odds }}</span>
                        </div>
                        <div v-if="item.option.length > 0">
                          {{ $lang('內容') }}:
                          <span
                            v-for="optionItem in item.option"
                            :key="optionItem"
                            class="gameOptionSpan"
                            >{{ gameOptionName(optionItem) }}</span
                          >
                        </div>
                        <div v-else>
                          {{ $lang('內容') }}:
                          <span class="gameOptionSpan">
                            {{ gameOptionName(item.option) }}</span
                          >
                        </div>
                        <div>
                          {{ $lang('匯率') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.openPrice)
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('金額') }}:
                          <span>
                            {{
                              new Intl.NumberFormat('zh-TW').format(item.amount)
                            }}</span
                          >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- historyOrder -->
              <div v-if="record.type === 'historyOrder'" class="modal-1">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $lang('時間/幣種') }}</th>
                      <th>{{ $lang('投注內容') }}</th>
                      <th>{{ $lang('投注金額') }}</th>
                      <th style="text-align: center">{{ $lang('輸贏') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in connectRecordList('historyOrder')"
                      :key="index"
                    >
                      <td>
                        <div>{{ formatDate(item.openAt) }}</div>
                        <div>{{ item.symbol }}</div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('期號') }}: <span>{{ item.roundId }}</span>
                        </div>
                        <div>
                          {{ $lang('賠率') }}:
                          <span>{{ item.odds }}</span>
                        </div>
                        <div v-if="item.option.length > 0">
                          {{ $lang('內容') }}:
                          <span
                            v-for="optionItem in item.option"
                            :key="optionItem"
                            class="gameOptionSpan"
                            >{{ gameOptionName(optionItem) }}</span
                          >
                        </div>
                        <div v-else>
                          {{ $lang('內容') }}:
                          <span class="gameOptionSpan">
                            {{ gameOptionName(item.option) }}</span
                          >
                        </div>
                        <div>
                          {{ $lang('匯率') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.openPrice)
                          }}</span>
                        </div>
                        <div>
                          {{ $lang('結束') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.closePrice)
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span>
                            {{
                              new Intl.NumberFormat('zh-TW').format(item.amount)
                            }}</span
                          >
                        </div>
                      </td>
                      <td>
                        <div style="text-align: center">
                          <span>{{ item.profit }}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="record.type === 'historyRecord'" class="modal-1">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $lang('期號/類別') }}</th>
                      <th>{{ $lang('盤口') }}</th>
                      <th>{{ $lang('結果') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in historyRecordList" :key="index">
                      <td>
                        <div>{{ item.roundId }}</div>
                        <div>{{ item.name }}</div>
                      </td>
                      <td>
                        <div>
                          {{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(item.closePirce)
                          }}
                        </div>
                      </td>
                      <td class="gameResultName">
                        <div
                          v-for="resultItem in item.result"
                          :key="resultItem"
                          class="gameResultNameItem"
                        >
                          {{ gameResultName(resultItem) }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="record.type === 'announcement'" class="modal-3">
                <label
                  v-for="(item, index) in news.result"
                  :key="index"
                  class="bulItem"
                >
                  <input :id="item.title" type="checkbox" />
                  <div class="title">
                    <span class="titleBox">{{ item.title }}</span>
                  </div>
                  <div class="content" v-html="item.content"></div>
                </label>
              </div>
              <div v-if="record.type === 'rule'" class="modal-4">
                <div v-for="(item, index) in rule.result" :key="index">
                  <div v-html="item.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.page
  position: relative
</style>

<style scoped lang="sass">
@import '@/assets/sass/game/model6/binary5.css'
</style>

<style scoped>
.popup {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.15s linear;
  padding: 0 40px;
}
.dataBody {
  padding: 10px 0;
}
.gameOptionSpan {
  padding: 0 5px;
}
.inputDate >>> .el-input__prefix {
  display: none;
}
.inputDate input {
  padding: 5px;
  margin: 0 1px;
}
.inputDate svg {
  margin: 0 5px 0 0;
  color: #000;
}
.bulItem input[type='checkbox'] {
  display: none;
}
.bulItem .content {
  display: none;
}
.bulItem input[type='checkbox']:checked ~ .content {
  display: block;
}
.gameResultName {
  display: flex;
}
.gameResultNameItem {
  padding: 0 5px;
  font-size: 16px;
}
@media screen and (max-width: 768px) {
  .popup {
    padding: 0 10px;
    height: 92%;
  }
}
input {
  margin: 0;
}
</style>

<style>
.el-input__wrapper {
  background-color: #00000000;
  border: 1px solid #00000000;
  box-shadow: none;
}
</style>

<style scoped lang="sass">
.cardBox
  width: 100%
  height: calc(100% - 150px)
  position: relative
  @media screen and (max-width: 1024px)
    height: 100%
  video
    width: 100%
    height: 100%
    object-fit: cover
  .containers
    width: 100%
    height: 100%
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    position: absolute
    top: 0
    right: 0
    .cardContainers
      max-width: 400px
      width: 100%
      position: relative
      .card
        max-width: 400px
        width: 100%
        border-radius: 5px
        box-shadow: 0 2px 5px rgba(0, 0, 0, .5)
        background-color: rgba(255, 255, 255, 0.8)
        .title
          width: 100%
          padding: 10px
          font-size: 15px
          font-weight: bold
          color: #222
          border-bottom: 1px solid #eee
        .info
          width: 100%
          display: flex
          flex-flow: row nowrap
          justify-content: flex-start
          align-items: center
          border-bottom: 1px solid #eee
          .image
            width: 60px
            height: 60px
            img
              width: 60px
              height: 60px
          .text
            width: calc(100% - 60px)
            display: flex
            flex-direction: column
            justify-content: center
            align-items: flex-start
            padding: 10px
            .name
              font-size: 14px
              font-weight: 500
              color: #333
            .value
              font-size: 20px
              font-weight: bold
              color: #333
        .time
          width: 100%
          padding: 10px
          font-size: 12px
          color: #666
          text-align: center
          border-bottom: 1px solid #eee
          .text
            font-size: 14px
            font-weight: bold
            color: #333
          .value
            font-size: 16px
            font-weight: bold
            color: #333
        .box
          width: 100%
          display: flex
          flex-direction: row
          justify-content: space-between
          align-items: center
          .mock1, .mock2
            width: 50%
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            padding: 10px
            .text
              font-size: 14px
              font-weight: bold
              color: #333
            .value
              font-size: 16px
              font-weight: bold
              color: #333
</style>

<style scoped>
.countdown-bar {
  width: 100%;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: green;
  transition: width 0.5s ease;
}

.marginStyle {
  margin: 0 4px;
}

.speedContainers {
  width: 100%;
  position: absolute;
  top: -140px;
  left: 0;
  z-index: 2;
}
</style>

<style scoped lang="sass">
#speedGauge
  width: 254px
  height: 254px
  margin: 0 auto
  background-color: #000
  object-fit: cover
  border-radius: 50%
  overflow: hidden
  zoom:77%
  transform: scale(0.6)
  @media screen and (max-width: 768px)
    zoom: 58%
  .gauge
    width: 252px
    height: 249px
    margin: 2px 2px 2px 1px
    position: absolute
    border: 1px #fff solid
    border-radius: 50%
    border-bottom-color: rgba(0,0,0,0)
    animation: rota 2s infinite
    @keyframes rota
      0%
        border-color: #fff
        border-bottom-color: rgba(0,0,0,0)
      50%
        border-color: #4c697a
        border-bottom-color: rgba(0,0,0,0)
      100%
        border-color: #fff
        border-bottom-color: rgba(0,0,0,0)
    .slice
      width: 10px
      height: 2px
      position: absolute
      background: #fff
      &:nth-child(1)
        margin-top: -2px
        left: 16px
        top: 74%
        transform: rotate(150deg)
        background: #35be1a
      &:nth-child(2)
        margin-top: 0px
        left: 0px
        top: 50%
        transform: rotate(179deg)
        background: #35be1a
      &:nth-child(3)
        margin-top: 0px
        left: 16px
        top: 26%
        transform: rotate(212deg)
        background: #17e7e7
      &:nth-child(4)
        margin-top: 0px
        left: 60px
        top: 8%
        transform: rotate(241deg)
        background: #17e7e7
      &:nth-child(5)
        margin-top: 0px
        left: 119px
        top: 2%
        transform: rotate(90deg)
        background: #17e7e7
      &:nth-child(6)
        margin-top: 0px
        left: 178px
        top: 8%
        transform: rotate(121deg)
        background: #e1c554
      &:nth-child(7)
        margin-top: 0px
        left: 223px
        top: 26%
        transform: rotate(150deg)
        background: #e1c554
      &:nth-child(8)
        margin-top: 0px
        left: 238px
        top: 50%
        transform: rotate(179deg)
        background: #ad191b
      &:nth-child(9)
        margin-top: -2px
        left: 223px
        top: 74%
        transform: rotate(210deg)
        background: #ad191b
    .subslice
      width: 5px
      height: 2px
      position: absolute
      background: #fff
      &:nth-child(10)
        margin-top: -1px
        left: 4px
        top: 62%
        transform: rotate(168deg)
        background: #35be1a
      &:nth-child(11)
        margin-top: 1px
        left: 5px
        top: 37%
        transform: rotate(20deg)
        background: #35be1a
      &:nth-child(12)
        margin-top: 1px
        left: 36px
        top: 15%
        transform: rotate(223deg)
        background: #28b5df
      &:nth-child(13)
        margin-top: -1px
        left: 90px
        top: 3%
        transform: rotate(71deg)
        background: #28b5df
      &:nth-child(14)
        margin-top: -1px
        left: 153px
        top: 3%
        transform: rotate(103deg)
        background: #28b5df
      &:nth-child(15)
        margin-top: 1px
        left: 207px
        top: 15%
        transform: rotate(134deg)
        background: #e1c554
      &:nth-child(16)
        margin-top: 1px
        left: 238px
        top: 37%
        transform: rotate(168deg)
        background: #ad191b
      &:nth-child(17)
        margin-top: 1px
        left: 238px
        top: 62%
        transform: rotate(198deg)
        background: #ad191b
    .rpm
      width: 10px
      height: 10px
      display: block
      position: absolute
      font-size: 1em
      line-height: 11px
      text-align: center
      vertical-align: middle
      background: rgba(0, 0, 0, 0)
      color: #fff
      &:nth-child(18)
        margin-top: -1px
        left: 27px
        top: 69%
      &:nth-child(19)
        margin-top: -3px
        left: 16px
        top: 49%
      &:nth-child(20)
        margin-top: -1px
        left: 28px
        top: 28%
      &:nth-child(21)
        margin-top: -2px
        left: 66px
        top: 13%
      &:nth-child(22)
        margin-top: -3px
        left: 118px
        top: 7%
      &:nth-child(23)
        margin-top: 0px
        left: 172px
        top: 12%
      &:nth-child(24)
        margin-top: -1px
        left: 210px
        top: 28%
      &:nth-child(25)
        margin-top: -1px
        left: 224px
        top: 49%
        color: #ad191b
      &:nth-child(26)
        margin-top: -1px
        left: 210px
        top: 69%
        color: #ad191b
    .rpmSlice
      width: 7px
      height: 2px
      position: absolute
      background: #fff
      &:nth-child(27)
        margin-top: -1px
        left: 43px
        top: 68%
        transform: rotate(152deg)
        background: #fff
      &:nth-child(28)
        margin-top: -1px
        left: 33px
        top: 59%
        transform: rotate(166deg)
        background: #fff
      &:nth-child(29)
        margin-top: -1px
        left: 31px
        top: 50%
        transform: rotate(180deg)
        background: #fff
      &:nth-child(30)
        margin-top: 4px
        left: 33px
        top: 39%
        transform: rotate(195deg)
        background: #fff
      &:nth-child(31)
        margin-top: -1px
        left: 43px
        top: 32%
        transform: rotate(211deg)
        background: #fff
      &:nth-child(32)
        margin-top: -3px
        left: 57px
        top: 25%
        transform: rotate(45deg)
        background: #fff
      &:nth-child(33)
        margin-top: -2px
        left: 75px
        top: 19%
        transform: rotate(59deg)
        background: #fff
      &:nth-child(34)
        margin-top: -1px
        left: 97px
        top: 15%
        transform: rotate(75deg)
        background: #fff
      &:nth-child(35)
        margin-top: -2px
        left: 121px
        top: 14%
        transform: rotate(90deg)
        background: #fff
      &:nth-child(36)
        margin-top: -1px
        left: 144px
        top: 15%
        transform: rotate(105deg)
        background: #fff
      &:nth-child(37)
        margin-top: 0px
        left: 166px
        top: 18%
        transform: rotate(120deg)
        background: #fff
      &:nth-child(38)
        margin-top: 0px
        left: 185px
        top: 24%
        transform: rotate(134deg)
        background: #fff
      &:nth-child(39)
        margin-top: -2px
        left: 199px
        top: 32%
        transform: rotate(150deg)
        background: #fff
      &:nth-child(40)
        margin-top: 1px
        left: 208px
        top: 40%
        transform: rotate(165deg)
        background: #fff
      &:nth-child(41)
        margin-top: -1px
        left: 211px
        top: 50%
        transform: rotate(180deg)
        background: #fff
      &:nth-child(42)
        margin-top: 0px
        left: 208px
        top: 59%
        transform: rotate(15deg)
        background: #fff
      &:nth-child(43)
        margin-top: 1px
        left: 199px
        top: 67%
        transform: rotate(30deg)
        background: #fff
    .rpmSpeed
      width: auto
      height: 10px
      display: block
      position: absolute
      font-size: .7em
      line-height: 11px
      text-align: center
      vertical-align: middle
      background: rgba(0, 0, 0, 0)
      color: #fff
      &:nth-child(44)
        left: 54px
        top: 64%
      &:nth-child(45)
        left: 43px
        top: 56%
      &:nth-child(46)
        left: 41px
        top: 48%
      &:nth-child(47)
        left: 43px
        top: 40%
      &:nth-child(48)
        left: 51px
        top: 32%
      &:nth-child(49)
        left: 62px
        top: 26%
      &:nth-child(50)
        left: 77px
        top: 20%
      &:nth-child(51)
        left: 97px
        top: 17%
      &:nth-child(52)
        left: 119px
        top: 15%
      &:nth-child(53)
        left: 139px
        top: 17%
      &:nth-child(54)
        left: 159px
        top: 20%
      &:nth-child(55)
        left: 175px
        top: 26%
      &:nth-child(56)
        left: 183px
        top: 32%
      &:nth-child(57)
        left: 190px
        top: 40%
      &:nth-child(58)
        left: 193px
        top: 48%
      &:nth-child(59)
        left: 189px
        top: 56%
      &:nth-child(60)
        left: 181px
        top: 64%
      &:nth-child(61)
        left: 58px
        top: 71%
    #sui
      width: 6px
      height: 90px
      display: inline-block
      position: absolute
      left: 49%
      top: 14%
      background: #fff
      border-left-style: inset
      border-left-color: #ada6a6
      border-bottom-left-radius: 5px
      border-bottom-right-radius: 5px
      border-top-left-radius: 100%
      border-top-right-radius: 100%
      transform-origin: bottom
      transform: rotate(-120deg)
      animation: rotateAnimation 4s infinite alternate
    @keyframes rotateAnimation
      0%
        transform: rotate(-40deg)
      100%
        transform: rotate(10deg)
    .suiCircle
      width: 29px
      height: 29px
      position: absolute
      top: 43%
      left: 44.5%
      border-radius: 50%
      background: #659f0a
      border-style: dotted
      transform: rotate(-120deg)
    .bottomStroke
      width: 174px
      height: 38px
      position: absolute
      left: 15%
      top: 77%
      background-image: url('https://upload.comethico.com/uploads/1729609298938.png')
      background-size: contain
      background-repeat: no-repeat
      background-position: center
      object-fit: cover
      .speedPlus
        width: 100%
        display: block
        font-size: 25px
        text-align: center
        vertical-align: middle
        background: rgba(0,0,0,0)
        color: #fff
        animation: rota 1s infinite
        @keyframes rota
          0%
            border-color: #fff
            border-bottom-color: rgba(0,0,0,0)
          50%
            border-color: #4c697a
            border-bottom-color: rgba(0,0,0,0)
          100%
            border-color: #fff
            border-bottom-color: rgba(0,0,0,0)
    .gaugeCircle1
      width: 190px
      height: 190px
      margin: auto
      position: absolute
      right: 0px
      bottom: 0px
      left: 0px
      top: 0px
      z-index: 0
      border: 2px #fff solid
      border-radius: 50%
      animation: rota 1s infinite
      @keyframes rota
        0%
          border-color: #fff
          border-bottom-color: rgba(0,0,0,0)
        50%
          border-color: #4c697a
          border-bottom-color: rgba(0,0,0,0)
        100%
          border-color: #fff
          border-bottom-color: rgba(0,0,0,0)
</style>
