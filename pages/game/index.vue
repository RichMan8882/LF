<script lang="ts" setup>
// import
const { t } = useI18n()
const siteStore = useSiteStore()
const PlayerStore = usePlayerStore()
const orderStore = useOrderStore()
const { queryKlines, queryRounds, queryOrder, bet } = useGameStore()
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
  title: t('訂單查詢'),
  type: 'currentOrder',
  search: true
})
const search = ref({
  symbol: '',
  roundNo: '',
  dateRangeStart: '',
  dateRangeEnd: '',
  limit: 60,
  page: 1,
  pageSize: 100
})
const showToolPopup = ref(false)
const symbol = ref('')
const symbolData: any = ref(null)
const availableCurrency: any = ref([])
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const socket: any = ref(null)
const socketConnected = ref(false)
const betData = ref({
  playerId: PlayerStore.playerInfo.id,
  option: [],
  amount: '',
  roundNo: ''
})
const recordList = ref([])
const historyRecordList = ref([])
// 圖表數據值
const nowTimestamp: any = ref(null)
const socketNewPrice: any = ref(null)
const isFirstGet = ref(true)
const createChartData = ref(null)
const socketCurrentRoundCountdown = ref(0)
const news = ref(null)
const rule = ref(null)
const disableBet = ref(false)
const currentSelectSymbolPrice = ref(0)
const playerWalletBalance = computed(() => {
  const findWallet = PlayerStore.playerInfo.wallet.find(
    (wallet: any) => wallet.type === 1
  )
  if (findWallet) {
    return Number(findWallet.balance)
  } else {
    return 0
  }
})
const selectSymbolValue = ref()
const selectSymbol = (value: any) => {
  console.log(value.symbol, 'value.symbol')
  if (value.symbol == 'LEPBD3M') {
    selectSymbolValue.value = value
    centerDialogVisible.value = true
    return
  }
  symbol.value = value.symbol
  symbolData.value = value.symbolData
  closeWebSocket()
  document.getElementById('coinBox').checked = false
}
const sureVerify = () => {
  if (verifyNumber.value == '14621') {
    centerDialogVisible.value = false
    symbol.value = selectSymbolValue.value.symbol
    symbolData.value = selectSymbolValue.value.symbolData
    verifyNumber.value = ''
    closeWebSocket()
    document.getElementById('coinBox').checked = false
  }
}
// method
const goPopup = async (title: string) => {
  console.log('recordList', recordList)
  record.value.title = title
  showToolPopup.value = true
  search.value.symbol = symbol.value
  // 確認order數據

  if (title === t('訂單查詢')) {
    orderList.value = socketOrderList.value.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    record.value.type = 'currentOrder'
    record.value.search = true
    return
  }
  if (title === t('歷史委託')) {
    orderList.value = socketOrderList.value.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    record.value.type = 'historyOrder'
    record.value.search = true
    return
  }
  if (title === t('歷史盤口')) {
    record.value.title = ' 歷史總覽'
    record.value.type = 'historyRecord'
    const response = await queryRounds({
      symbol: symbol.value,
      limit: 60,
      page: 1,
      pageSize: 100
    })
    console.log('queryRounds', response.data.result)
    historyRecordList.value = response.data.result.filter((item: any) => {
      return Number(item.roundNo) < Number(betData.value.roundNo)
    })
    console.log('betData.value.roundNo', betData.value.roundNo)
    console.log('queryRounds', historyRecordList.value)
    record.value.search = true
    return
  }
  if (title === t('網站公告')) {
    record.value.type = 'announcement'
    record.value.search = false
    return
  }
  if (title === t('規則說明')) {
    record.value.type = 'rule'
    record.value.search = false
  }
}
const closePopup = () => {
  showToolPopup.value = false
}
const connectRecordList = computed(() => {
  const title = record.value.type
  switch (title) {
    case 'currentOrder':
      orderList.value = socketOrderList.value
        .filter((item: any) => item.status === 0)
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })
      console.log(orderList.value, 'connectRecordList')

      return orderList.value
    case 'historyOrder':
      orderList.value = socketOrderList.value
        .filter((item: any) => item.status === 1)
        .sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        })
      return orderList.value
  }
})
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
      betData.value.productId = symbolData.value.id
      console.log(betData.value)
      const pairData = symbolData.value
      console.log('pairData', pairData)
      // banned action
      if (pairData.banned) {
        ElNotification({
          message: pairData.notice,
          type: 'error',
          showClose: false
        })
        return
      }
      // banned player
      const bannedPlayer = pairData.bannedPlayers.find(
        (item: any) => item.playerId === PlayerStore.playerInfo?.id
      )
      if (bannedPlayer) {
        if (bannedPlayer.banned) {
          ElNotification({
            message: bannedPlayer.reason,
            type: 'error',
            showClose: false
          })
          return
        }
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
      if (
        parseFloat(betData.value.amount) < symbolData.value.config.minBetAmount
      ) {
        ElNotification({
          message: ` ${t('最低交易金額為')} $ ${symbolData.value.config.minBetAmount}`,
          type: 'error',
          showClose: false
        })
        return
      }
      if (
        parseFloat(betData.value.amount) > symbolData.value.config.maxBetAmount
      ) {
        ElNotification({
          message: `${t('最高交易金額為')} $ ${symbolData.value.config.maxBetAmount}`,
          type: 'error',
          showClose: false
        })
        return
      }
      setTimeout(
        async () => {
          betData.value.amount = betData.value.amount.toString()
          const response = await bet(betData.value)
          console.log('bet response', response)
          if (response.success) {
            ElMessageBox.alert(
              `
               <p style="margin:0 0 8px 0"> ${t('交易期別')}: ${response.data.roundNo} </p>
               <p style="margin:0 0 8px 0"> ${t('交易金額')}: ${response.data.amount} </p>
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
            // ElNotification({
            //   title: response.message,
            //   type: 'error',
            //   showClose: false
            // })
          }
          clearBetData()
          await PlayerStore.fetchInfo()
        },
        bannedPlayer ? (bannedPlayer.delay + 1) * 1000 : 1000
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
      return symbolData.value
        ? symbolData.value.config.option[0].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 1:
      return symbolData.value
        ? symbolData.value.config.option[1].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 2:
      return symbolData.value
        ? symbolData.value.config.option[2].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 3:
      return symbolData.value
        ? symbolData.value.config.option[3].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 4:
      return symbolData.value
        ? symbolData.value.config.option[4].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 5:
      return symbolData.value
        ? symbolData.value.config.option[5].odds * 100 + '%'
        : 0.1 * 100 + '%'
    case 6:
      return symbolData.value
        ? symbolData.value.config.option[6].odds * 100 + '%'
        : 0.1 * 100 + '%'
    default:
      return ''
  }
}

const showOption = (type: number) => {
  switch (type) {
    case 0:
      return symbolData.value ? symbolData.value.config.option[0].isOpen : false
    case 1:
      return symbolData.value ? symbolData.value.config.option[1].isOpen : false
    case 2:
      return symbolData.value ? symbolData.value.config.option[2].isOpen : false
    case 3:
      return symbolData.value ? symbolData.value.config.option[3].isOpen : false
    case 4:
      return symbolData.value ? symbolData.value.config.option[4].isOpen : false
    case 5:
      return symbolData.value ? symbolData.value.config.option[5].isOpen : false
    case 6:
      return symbolData.value ? symbolData.value.config.option[6].isOpen : false
    default:
      return true
  }
}

const clearBetData = () => {
  betData.value = {
    playerId: PlayerStore.playerInfo.id,
    productId: '',
    option: [],
    amount: '',
    roundNo: ''
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
      // return `${t('漲')}`
      return symbol.value === 'LEAHD3M' ? t('發送') : t('做多')
    case 5:
      // return `${t('跌')}`
      return symbol.value === 'LEAHD3M' ? t('接收') : t('做空')
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
      // return `${t('漲')}`
      return symbol.value === 'LEAHD3M' ? t('發送') : t('做多')
    case 5:
      // return `${t('跌')}`
      return symbol.value === 'LEAHD3M' ? t('接收') : t('做空')
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
  // const data = {
  //   symbol: symbol.value,
  //   interval: '1',
  //   startTime,
  //   endTime
  // }
  // console.log(symbolData.value)
  const data = {
    productId: symbolData.value.id
  }
  const klineData = await queryKlines(data)
  if (klineData.success) {
    isFirstGet.value = false // 第一次獲取開關關閉
    const { result } = klineData.data
    // console.log('klines', result)
    const newKLines = Object.entries(result).map(([timestamp, value]) => {
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
    const response = await queryOrder(search.value)
    if (response.success) {
      orderList.value = response.data.result
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
  search.value.roundNo = ''
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

const productList: any = ref([])

const orderList: any = ref([])
const socketOrderList: any = ref([])
const ogOrderList: any = ref(null)
// ctyptoData
const reconnected = ref(true)
const closeWebSocket = async () => {
  if (socket.value) {
    socket.value.close()
  }
}

const sendMessage = (msg: any) => {
  // send message to server
  socket.value.send(JSON.stringify(msg))
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
    // console.log('Connected to socket', event)
    socketConnected.value = true
    sendMessage({
      op: 'subscribe',
      channel: ['kline', 'order', 'product']
    })
  }
  socket.value.onmessage = async (e) => {
    const message = JSON.parse(e.data)
    // console.log('收到來自 socket 的訊息', message);
    const { event, data } = message
    switch (event) {
      case 'PRODUCT_UPDATE': {
        // console.log('PRODUCT_UPDATE', data)
        productList.value = data.result
        if (symbolData.value === null) {
          symbol.value = productList.value[0].symbol
          symbolData.value = productList.value[0]
        }
        break
      }
      case 'ORDER_UPDATE': {
        // console.log('ORDER_UPDATE', data)
        socketOrderList.value = data.result
      }
      case 'KLINE_UPDATE': {
        // console.log('KLINE_UPDATE', data)
        if (productList.value.length > 0) {
          productList.value.forEach((item: any) => {
            const findSystemPrice = data.result.find(
              (socketData: any) => socketData.symbol === item.symbol
            )
            // console.log('findSystemPrice', findSystemPrice)

            const currency = availableCurrency.value.find(
              (currency: any) => currency.symbol === item.symbol
            )
            if (currency) {
              currency.price.push({
                open: parseFloat(
                  currency.price[currency.price.length - 1].close
                ),
                close: findSystemPrice.price
                  ? parseFloat(findSystemPrice.price.close)
                  : 0
              })
            } else {
              availableCurrency.value.push({
                symbol: item.symbol,
                price: [
                  {
                    open: findSystemPrice.price
                      ? parseFloat(findSystemPrice.price.open)
                      : 0,
                    close: findSystemPrice.price
                      ? parseFloat(findSystemPrice.price.close)
                      : 0
                  }
                ],
                symbolData: item
              })
            }
          })
        }

        // 圖表列表數據
        const { timestamp: correctTimestamp } = message
        const lastTimestamp = Math.floor(nowTimestamp.value / 1000)
        if (lastTimestamp !== Math.floor(correctTimestamp / 1000)) {
          const timestamp = initMilliseconds(correctTimestamp)
          nowTimestamp.value = timestamp
          const symbolData = data.result.find(
            (item) => item.symbol === symbol.value
          )
          // console.log('symbol.value', symbol.value)
          // console.log('symbolData', symbolData)
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
        }
        break
      }
      case 'SERVER_TIME': {
        const {
          currentRoundId,
          currentRoundCountdown,
          allowBetRoundId,
          allowBetRoundCountdown
        } = data
        betData.value.roundNo = allowBetRoundId
        socketCurrentRoundCountdown.value = allowBetRoundCountdown
        // console.log(data);
        if (currentRoundCountdown === 59) {
          await PlayerStore.fetchInfo()
          // const queryOrderRes = await orderStore.queryOrder({
          //   pair: symbol.value
          // })
          // recordList.value = queryOrderRes.data.result
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
const counting = ref({
  ers: 33.71,
  sers: 3.3,
  ber: 400,
  es: 70,
  mock1: 251110,
  mock2: 242419
})

const updateCountingNumber = (value, min, max, fixed) => {
  counting.value[value] = parseFloat(
    (Math.random() * (max - min) + min).toFixed(fixed)
  )
}

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

const ersTimer = ref('')
const sersTimer = ref('')
const berTimer = ref('')
const esTimer = ref('')

// 組件掛載時設置計時器並更新時間和倒數計時
await onMounted(async () => {
  await startConnectWebSocket()

  const pair = symbol.value
  const type = 'game'
  const path = 'game'
  /** await Promise then  */
  // 開始加載數據（此處沒有使用 await，因此主線程不會被阻塞）
  const queryInstructionPromise = queryInstruction(lang, type)
  const queryNewsPromise = queryNews(lang, path)
  // 使用 .then() 方法處理異步任務結果
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

  ersTimer.value = setInterval(
    () => updateCountingNumber('ers', 30, 50, 2),
    1000
  )
  sersTimer.value = setInterval(
    () => updateCountingNumber('sers', 3, 8, 1),
    1000
  )
  berTimer.value = setInterval(
    () => updateCountingNumber('ber', 400, 600, 1),
    1000
  )
  esTimer.value = setInterval(() => updateCountingNumber('es', 70, 90, 1), 1000)
})

// 組件卸載時清除計時器
onUnmounted(() => {})

onBeforeUnmount(() => {
  clearInterval(ersTimer)
  clearInterval(sersTimer)
  clearInterval(berTimer)
  clearInterval(esTimer)
  reconnected.value = false
  // console.log('closeWebSocket', reconnected.value)
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
      return ''
  }
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
const betAmountsList = computed(() => {
  if (symbolData.value) {
    return symbolData.value.config.betAmount
  } else {
    return []
  }
})
const formatHour = (timestamp: string) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
const centerDialogVisible = ref(false)
const verifyNumber = ref('')
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
                  new Intl.NumberFormat('zh-TW').format(playerWalletBalance)
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
                @click="selectSymbol(item)"
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
                  <div class="card">
                    <div class="title">
                      {{ $lang('單號') }} {{ betData.roundNo }}
                    </div>
                    <div class="info">
                      <div class="image">
                        <img src="@/assets/image/gameIcon.png" alt="" />
                      </div>
                      <div class="text">
                        <div class="name">{{ symbolChange(symbol) }}</div>
                        <div class="value">{{ currentSelectSymbolPrice }}</div>
                      </div>
                    </div>
                    <div class="time">
                      <div class="text">{{ $lang('剩餘時間') }}</div>
                      <div class="value">
                        {{ socketCurrentRoundCountdown }}s
                      </div>
                    </div>
                    <div class="box">
                      <div class="mock1">
                        <div class="text">
                          {{ $lang('本日全球統計驗證碼數') }}
                        </div>
                        <div class="value">{{ counting.mock1 }}</div>
                      </div>
                      <div class="mock2">
                        <div class="text">
                          {{ $lang('本日全球統計接收號碼數') }}
                        </div>
                        <div class="value">{{ counting.mock2 }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="availableCurrency.length > 0"
                v-show="symbol !== 'LEAHD3M'"
                class="game-box"
              >
                <gameChart
                  :symbol="symbol"
                  :symbol-data="symbolData"
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
                      <div class="game-uid">
                        <h6>{{ $lang('單號') }}</h6>
                        <b data-roundNum>: {{ betData.roundNo }}</b>
                      </div>
                      <div class="end-time">
                        <h6>{{ $lang('剩餘時間') }}</h6>
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
                                ? $lang('發送')
                                : $lang('做多')
                            }}
                            <!-- <span class="odds">{{
                              gameOptionOdd(4)
                            }}</span> -->
                          </label>
                          <label
                            v-if="showOption(5)"
                            for="game-6"
                            class="red"
                            @click="addBetGameType(5)"
                            >{{
                              symbol === 'LEAHD3M'
                                ? $lang('接收')
                                : $lang('做空')
                            }}
                            <!-- <span class="odds">{{
                              gameOptionOdd(5)
                            }}</span> -->
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
                              v-for="item in betAmountsList"
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
                    new Intl.NumberFormat('zh-TW').format(playerWalletBalance)
                  }}</span
                >
              </div>

              <label for="nav-control" class="nav-close">
                <i class="fas fa-times"></i>
              </label>
            </div>
            <div class="modal-link">
              <div class="info-item" @click="goPopup('訂單查詢')">
                <span class="fas fa-clipboard-list"></span>
                {{ $lang('訂單查詢') }}
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
                <select
                  v-model="search.symbol"
                  name="coin"
                  @change="searchOrder"
                >
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
                  v-model="search.roundNo"
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
                    <tr v-for="(item, index) in connectRecordList" :key="index">
                      <td>
                        <div>{{ formatDate(item.createdAt) }}</div>
                        <div>{{ item.label || item.name || item.symbol }}</div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('期號') }}: <span>{{ item.roundNo }}</span>
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
                            }).format(Number(item.openPrice))
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('金額') }}:
                          <span>
                            {{
                              new Intl.NumberFormat('zh-TW').format(
                                Number(item.amount)
                              )
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
                    <tr v-for="(item, index) in connectRecordList" :key="index">
                      <td>
                        <div>{{ formatDate(item.createdAt) }}</div>
                        <div>{{ item.label || item.name || item.symbol }}</div>
                      </td>
                      <td>
                        <div>
                          {{ $lang('期號') }}: <span>{{ item.roundNo }}</span>
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
                            }).format(Number(item.openPrice))
                          }}</span>
                        </div>
                        <div>
                          {{ $lang('結束') }}:
                          <span>{{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(Number(item.roundInfo.closePrice))
                          }}</span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <span>
                            {{
                              new Intl.NumberFormat('zh-TW').format(
                                Number(item.amount)
                              )
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
                        <div>{{ item.roundNo }}</div>
                        <div>{{ item.label || item.name || item.symbol }}</div>
                      </td>
                      <td>
                        <div>
                          {{
                            new Intl.NumberFormat('zh-TW', {
                              minimumFractionDigits: 4,
                              maximumFractionDigits: 6
                            }).format(Number(item.closePrice))
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
    <el-dialog
      v-model="centerDialogVisible"
      width="500"
      :show-close="false"
      align-center
    >
      <el-input v-model="verifyNumber" type="text" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="(centerDialogVisible = false), (verifyNumber = '')"
            >取消</el-button
          >
          <el-button type="primary" @click="sureVerify"> 確定 </el-button>
        </div>
      </template>
    </el-dialog>
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
[hidden] {
  display: none !important;
}
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
/* .inputDate >>> .el-input__prefix {
  display: none;
} */
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
/* .el-input__wrapper {
  background-color: #00000000;
  border: 1px solid #00000000;
  box-shadow: none;
}
.custom-input-border .el-input__inner {
  border-color: red;
} */
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
