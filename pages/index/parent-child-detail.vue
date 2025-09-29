<script setup>
const route = useRoute();

import parChi01 from '@/assets/image/parent-child/parChi01.jpg'
import parChi02 from '@/assets/image/parent-child/parChi02.jpg'
import parChi03 from '@/assets/image/parent-child/parChi03.jpg'
import parChi04 from '@/assets/image/parent-child/parChi04.jpg'
import parChi05 from '@/assets/image/parent-child/parChi05.jpg'



const parentChilLis = [{
  id: 1,
  src: parChi01,
  title: '誰是小小冒險王',
  text: '透過互動方式認識野外求生基本常識、方向辨別、動植物觀察、安全守則等知識',
  cont: ''
}, {
  id: 2,
  src: parChi02,
  title: '小小神廚',
  text: '小廚神們將動手製作一道簡單又好吃的料理或點心'
}, {
  id: 3,
  src: parChi03,
  title: '色彩裡的我們',
  text: '透過色彩表達心情、透過畫筆創作想像，這是一場以「陪伴」為核心的親子彩繪活動'
},
{
  id: 4,
  src: parChi04,
  title: '我是生活小達人',
  text: '讓孩子透過實際動手做、任務挑戰、親子協作的方式學會生活基本能力'
},
{
  id: 5,
  src: parChi05,
  title: '親子主題拍照專題活動',
  text: '你和寶貝的親子裝、配色呼應、風格搭配，不用專業攝影，只要有愛就夠'
}
]
const props = defineProps({
  'page-scroll-top': Number
})
const deg = ref(0)
const timer = ref()
let num = 0.2
const y = ref()
const wonderfultop = ref(400)
const windowWidth = ref()
const titleFixed = ref()
const isMobile = computed(() => {
  return windowWidth.value >= 720
})
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  wonderfultop.value = windowWidth.value >= 720 ? 150 : 1600
}
const scrollTop = ref(0)
const handleScroll = () => {
  // console.log(window.scrollY);
  scrollTop.value = window.scrollY
}

const pageId = ref(route.query.id || '1');
onMounted(() => {
  if (window) {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateWidth)
    windowWidth.value = window.innerWidth
    wonderfultop.value = window.innerWidth >= 720 ? 150 : 1600
  }
  timer.value = setInterval(() => {
    deg.value += num
    if (deg.value < 1 && deg.value > -1) {
      num = num > 0 ? 0.03 : -0.03
    } else {
      num = num > 0 ? 0.2 : -0.2
    }
    if (deg.value > 50 || deg.value < -50) {
      num *= -1
    }
  }, 10)
  if (route.query.id) {
    navTile.value = (parentChilLis.find(item => item.id === Number(pageId.value))).title
  }
})
onUnmounted(() => {
  if (window) {
    window.removeEventListener('resize', updateWidth) // 清理事件
    window.removeEventListener('scroll', handleScroll)
  }
})

const details = [
  {
    id: 1,
    cont: `
    
    `
  }
]
const navTile = ref('')

const onNavGO = (id) => {
  console.log('navGO');
  navigateTo('/parent-child-detail?id=' + id)
  pageId.value = id
  navTile.value = (parentChilLis.find(item => item.id === Number(pageId.value))).title
}


</script>

<template>
  <div class="culturepage">
    <ZwHeader :activeUrl="'/parent-child'" :nav-fixed="scrollTop > 95" />
    <div class="culturebg-bg1">
      <h1>親子活動</h1>
      <div class="nav-tab">
        <ol class="breadcrumb">
          <li class=""><a @click="navigateTo('/')">返回首頁</a></li>
          <li class="breadcrumb-item" v-if="navTile">{{ navTile }}</li>
        </ol>
      </div>
    </div>
    <div class="culturebg-bg2">
      <div class="culturebg2">
        <div class="culturebg2-item">
          <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
            <rect width="100%" height="100%"></rect>
          </svg>
          <div class="culture-detail" v-if="pageId == '5'">
            <div class="post_caption">
              <h2 class="post_title">
                親子主題拍照專題活動
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;color: #c90286">
                  投稿就有機會獲得 500元獎金！
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  活動主題（三擇一投稿）：<br>
                  ●成長記錄<br>
                  用照片記下孩子的一個特別時刻<br>
                  （第一步、第一場演出、第一次理髮、換牙…）<br>
                  例句:：這是我小孩子弟一次參加，學校_____演出
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  ●親子穿搭<br>
                  你和寶貝的親子裝、配色呼應、風格搭配，不用專業攝影，只要有愛就夠！<br>
                  例句:：今天跟小孩子出門我跟小孩子穿了______親子裝我覺得很搭配恨可愛
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  ●親子旅遊瞬間<br>
                  無論是去大自然、動物園、海邊或只是家附近走走，一張你們最喜歡的合照 + 一句話回憶～<br>
                  文字搭配建議：「這是我們一起＿＿＿＿的照片
                </p>

                <p class="post_desc" style="font-size: 17px;color: #02641a;">
                  活動獎勵<br>
                  只要有參與活動即可獲得500元抽獎資格共30個名額<br>
                  獲選的30作品將公開展示，並可參與下次攝影展or月曆收錄名單！<br>
                  拍攝照片1張（畫質佳，手機拍也OK）<br>
                  文字說明一句（描述故事 / 時刻）<br>
                  投稿者姓名＋孩子小名（可匿名公開）
                </p>
                <p class="post_desc" style="font-size: 17px;color: #ad5c00;">
                  注意事項：<br>
                  照片需為本人/家庭所有，請勿盜圖<br>
                  本活動投稿即同意主辦單位用於活動相關推廣用途（如社群、展出）<br>
                  同一家庭最多可投稿3張，但每個主題限1張參賽
                </p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/5-2.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/5-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>


                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
          <div class="culture-detail" v-if="pageId == '1'">
            <div class="post_caption">
              <h2 class="post_title">
                誰是小小冒險王
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  冒險知識小學堂：
                  <br>
                  透過互動方式認識野外求生基本常識、方向辨別、動植物觀察、安全守則等知識，讓孩子不只是「玩過去」，而是「學進去」，培養獨立思考與基礎戶外素養。
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  探索基地導覽：
                  <br>
                  實地走訪活動基地（如森林步道、古宅園區、公園任務區等），由工作人員引導認識地形環境、設施功能與不同冒險挑戰區域的設計原理，理解冒險世界背後的規劃邏輯。
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  親子互動時光：
                  <br>
                  活動過程鼓勵家長與孩子一同闖關，共享每一刻的冒險時光。設有「任務補給站」供家長拍照、紀錄與孩子互動的畫面，留下專屬親子記憶。
                </p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  活動完成可獲得： <br>
                  ★小小冒險王證書（每位完成任務的孩子都可獲得） <br>
                  ★任務完成包：內含闖關紀念品＋冒險貼紙包＋徽章 <br>
                  ★冒險裝備拍照體驗：穿著探險帽、望遠鏡、冒險背心等拍照道具 <br>
                  ★驚喜小禮物（每場次略有不同）

                </p>

                <p class="post_desc" style="font-size: 17px;">
                  注意事項： <br>
                  本活動採事前報名制，每場名額有限，額滿即止 <br>
                  建議穿著適合活動之運動服與運動鞋 <br>
                  部分關卡會有輕度體能挑戰，請視孩子體能斟酌參與 <br>
                  若遇雨將備有備案場地（室內）或延期公告
                </p>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/1-2.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/1-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
          <div class="culture-detail" v-if="pageId == '2'">
            <div class="post_caption">
              <h2 class="post_title">
                小小神廚
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  是一場親子共廚的冒險旅程，從認識食材開始，到親手完成一道料理，孩子將體驗動手做的樂趣、學會耐心與合作，還能品嚐自己親手做出的成品！</p>
                <p class="post_desc" style="font-size: 17px;">
                  親子料理DIY教學 <br>
                  在指導老師帶領下，小廚神們將動手製作一道簡單又好吃的料理或點心 <br>
                  可選擇家長們與孩子適合的主題（依場次不同）
                </p>

                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  小便當創作（飯糰、蔬菜捲、愛心荷包蛋） <br>
                  義式小餐點（焗烤馬鈴薯、起司捲、蔬菜義大利麵） <br>
                  中式點心（紅豆酥、芋圓、湯圓DIY） <br>
                  異國風小吃（迷你披薩、玉米餅、捲餅）
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  食育小教室 <br>
                  讓孩子了解食材從哪裡來、每種食材的營養價值，以及正確的清洗、處理方法。簡單介紹廚房安全知識與衛生觀念，學會尊重食物、珍惜資源。
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  親子共廚互動
                  <br>
                  每位孩子皆由家長陪同，共同完成料理，是孩子學習的夥伴，也是全程紀錄的攝影師，為彼此留下珍貴「一起完成」的回憶。
                </p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  活動完成可獲得： <br>
                  小小廚神證書（含姓名、活動日） <br>
                  親手完成的餐點作品（可打包帶回家） <br>
                  小廚師帽與圍裙拍照體驗（部分場次可贈送） <br>
                  活動專屬小禮物包（依主辦單位不同略有調整）
                </p>
                <p class="post_desc" style="font-size: 17px;color: #ad5c00;">
                  注意事項： <br>
                  活動會準備全套食材與工具，請勿自帶 <br>
                  建議穿著輕便好洗衣物，現場提供圍裙與帽子 <br>
                  活動中可自由拍照，但請勿錄製全程教學影片 <br>
                  若有食物過敏，請於報名表中註明
                </p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/2-2.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/2-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>


                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
          <div class="culture-detail" v-if="pageId == '3'">
            <div class="post_caption">
              <h2 class="post_title">
                色彩裡的我們
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  給孩子一把畫筆，給親子一段珍貴的時光<br>
                  透過色彩表達心情、透過畫筆創作想像，這是一場以「陪伴」為核心的親子彩繪活動。<br>
                  不需技巧，只需要笑聲與彼此
                </p>


                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  活動亮點：<br>
                  主題彩繪體驗<br>
                  每場設計一個親子共同創作主題，如：<br>
                  我的家庭（畫出一家人的模樣）<br>
                  夢想公園（想像未來最棒的遊樂場）<br>
                  小動物大冒險（畫出孩子最愛的動物世界）<br>
                  節慶創作（中秋燈籠、春聯年畫、聖誕窗貼…）
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  媒材可彈性選擇：<br>
                  紙本畫作（壓克力、水彩、油畫棒）<br>
                  陶瓷彩繪（碗盤、杯子）<br>
                  布面創作（帆布袋、衣服、帽子）<br>
                  木作彩繪（拼圖板、玩具、門牌）
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  色彩小學堂（教育延伸）
                  <br>
                  老師帶孩子認識基本顏色、混色技巧、圖像表達的趣味與自由，啟發藝術感知與想像力。
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  親子合作創作
                  <br>
                  活動中設計**「一起完成一幅作品」**的任務，鼓勵家長不是指導者，而是「一起畫」的夥伴。 過程中可互相交換角色、互畫對方、聯合作品，增加親子互動樂趣
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  拍照時光 + 成果展示

                  <br>
                  作品完成後設「拍照區＋展示牆」，每位家庭的作品都可拍照上牆紀錄，形成一場親子家庭畫展。
                </p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  活動完成可獲得：<br>
                  ★親子彩繪小藝術家證書<br>
                  ★完成的創作作品（可帶回家）<br>
                  ★參加小禮物包（貼紙、畫筆組、創作本）<br>
                  ★親子合照數位檔（現場拍攝紀錄）
                </p>
                <p class="post_desc" style="font-size: 17px;color: #ad5c00;">
                  注意事項：<br>
                  請穿著可輕微弄髒的衣物（或自備圍裙）<br>
                  活動提供畫材與工具，無需自備<br>
                  活動期間可自由拍照，但請尊重他人創作空間<br>
                  作品可當日攜回，若需吹乾時間請配合工作人員安排
                </p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/3-2.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/3-3.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                </div>


                <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                  與更多報名資訊請聯繫客服<br>
                  <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                </p>
              </div>
            </div>
          </div>
          <div class="culture-detail" v-if="pageId == '4'">
            <div class="post_caption">
              <h2 class="post_title">
                我是生活小達人
              </h2>
              <div class="post_description">
                <p class="post_desc" style="font-size: 17px;">
                  活動目標：<br>
                  讓孩子透過實際動手做、任務挑戰、親子協作的方式學會生活基本能力， 提升獨立性與自信心，打造「會洗手、會整理、會照顧自己」的生活力！
                </p>


                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  活動資訊<br>
                  地點:○○親子中心 / 活動教室 / 社區廣場<br>
                  對象:適合 3～7 歲親子組<br>
                  費用:NT$ 350 / 組（含材料、道具、證書、禮物）<br>
                  報名:採事前報名制，額滿即止
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  活動形式：<br>
                  闖關任務形式（5～6 關）＋ 成果展示區 ＋ 親子合照留念區<br>
                  任務闖關區（關卡建議）
                </p>
                <p class="post_desc" style="font-size: 17px;color: #015706">
                  ●洗手小達人-正確洗手 7 步驟，使用泡泡水模擬-培養衛生習慣
                  <br><br>
                  ●穿衣收衣挑戰-穿外套、摺衣服、分類衣物遊戲-動作協調、自理能力
                  <br><br>
                  ●餐桌禮儀GO-正確使用湯匙、夾菜、擦嘴遊戲-餐桌禮儀
                  <br><br>
                  ●打掃高手-拖地、掃地、分類垃圾趣味比賽-清潔與環保
                  <br><br>
                  ●時間小幫手-記住起床、刷牙、吃飯、睡覺順序-建立作息與自律
                  <br><br>
                  ●整理我最棒-鋪床鋪棉被遊戲、擺好小抱枕與娃娃
                </p>
                <p class="post_desc" style="font-size: 17px;">
                  活動加分區： <br>
                  成果展示＋證書領取 <br>
                  完成闖關可領取「生活小達人證書」＋拍照留念牆！
                </p>
                <p class="post_desc" style="font-size: 17px;color: #7c0000;">
                  親子互動禮包<br>
                  活動結束可獲得：<br>
                  成就勳章貼紙<br>
                  生活任務小冊（可延伸到家裡練習）<br>
                  小道具（兒童圍裙、迷你拖把等）
                </p>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      <img src="@/assets/image/parent-child/4-2.jpg" alt="img" class="image-fit">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="blog_gallry_img">
                      < </div>
                    </div>
                  </div>
                  <p class="post_desc" style="font-size: 17px;color: #7c0000;">想了解推薦拍攝店家<br>
                    與更多報名資訊請聯繫客服<br>
                    <a href="https://lin.ee/Cyo5PLs1"><img src="@/assets/image/index/cs-2.png" alt=""></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="culturebg2-item">
            <svg class="inner-dashed-border2" height="100%" width="100%" preserveAspectRatio="none">
              <rect width="100%" height="100%"></rect>
            </svg>
            <div class="whtq">
              <div class="title">
                親子活動
              </div>
              <ul class="whtq_lis">
                <li v-for="(item, index) in parentChilLis">
                  <div class="user">
                    <a>
                      <img :src="item.src" class="image-fit" alt="img">
                    </a>
                    <svg class="inner-dashed-border" height="100%" width="100%" preserveAspectRatio="none">
                      <rect width="100%" height="100%"></rect>
                    </svg>
                  </div>
                  <div class="post_caption">
                    <h6 class="post_title" @click="onNavGO(item.id)">
                      <a>{{ item.text }}</a>
                    </h6>
                    <div class="post_date">
                      {{ item.title }}
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <ZwFooter />
    </div>
</template>

<style scoped lang="sass">
// 動畫
@keyframes fadeSlideIn 
  to 
    opacity: 1
    transform: translateY(0)

@keyframes fadeSlideIn2 
  to 
    opacity: 1
    transform: translateY(0)

@keyframes fadeHeaderInDown 
  0% 
    opacity: 0
    transform: translate3d(0, -100%, 0)
  100% 
    opacity: 1
    transform: translate3d(0, 0, 0)
@keyframes dashed_border_running 
  100% 
    stroke-dashoffset: -1000
// 

.culturebg-bg1
  background: url(@/assets/image/culture/culturepage1.jpg) no-repeat center bottom / cover
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
.culturebg-bg2
  padding: 80px 0 50px
  color: #33355c
  .culturebg2
    margin: 0 auto
    width: 1320px
    max-width: 100vw
    display: grid
    grid-template-columns: 2fr 1fr
    align-items: flex-start
    gap: 0px
    .culturebg2-item
      position: relative
      padding: 20px
      margin-bottom: 30px
      margin-inline: 12px
      font-family: "Font Awesome 5 Pro"
      .post_caption
        padding: 20px 0 0
        h2.post_title
          font-size: 32px
          margin-bottom: 10px
          font-weight: 700
        p
          font-size: 17px
          margin-bottom: 15px
        .row
          --bs-gutter-x: 1.5rem
          --bs-gutter-y: 0
          display: flex
          flex-wrap: wrap
          margin-top: calc(-1 * var(--bs-gutter-y))
          margin-right: calc(-.5 * var(--bs-gutter-x))
          margin-left: calc(-.5 * var(--bs-gutter-x))
          &>*
            max-width: 100%
            padding-right: calc(var(--bs-gutter-x) * .5)
            padding-left: calc(var(--bs-gutter-x) * .5)
            margin-top: var(--bs-gutter-y)
        .col-sm-6
          p
            color: #959595
            font-size: 14px
          @media (min-width: 576px)
            flex: 0 0 auto
            width: 50%
            
        .blog_gallry_img
          margin-bottom: 15px
          border-radius: 0px
          position: relative
          overflow: hidden
        .image-fit
          width: 100%
          height: 100%
          object-fit: cover
          object-position: center
      &:hover
        svg.inner-dashed-border2
          animation-play-state: running
        .user
          .inner-dashed-border
            stroke-width: 1
            animation-play-state: running
      svg.inner-dashed-border2
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        pointer-events: none
        animation: dashed_border_running 20s linear infinite both
        animation-play-state: paused
        stroke-width: 3px
        stroke-dasharray: 9, 5
        stroke-dashoffset: 0
        stroke-linecap: round
        transition: 0.4s
        stroke: #72c0f0
        fill: none
      .whtq
        .title
          line-height: normal
          margin-bottom: 20px
          text-align: center
          text-transform: uppercase
          font-size: 18px
          background-color: #72c0f0
          color: white
          padding: 10px 0
          border-radius: 0px
        .whtq_lis
          li
            display: flex
            align-items: center
            margin-bottom: 20px
            gap: 5px
            .post_title
              transition: all .3s
              &:hover
                color: #fa608c
            .post_date
              font-size: 14px
            .post_caption
              padding: 0 !important
            .user
              padding: 12px
              background: #00000000
              &:hover
                background-color: #00000000 !important
                border-color: transparent
              .image-fit
                width: 60px
                height: 60px
                min-width: 60px
              .inner-dashed-border
                stroke: #72c0f0
                stroke-dasharray: 9, 4
                stroke-width: 3
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
      stroke-width: 2
      animation-play-state: running
      stroke: white
      stroke-dasharray: 3, 3
      top: 3px
      left: 3px
      width: calc(100% - 6px)
      height: calc(100% - 6px)

  .inner-dashed-border
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
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

@media (max-width: 992px)
  .culturebg-bg2 .culturebg2
    display: flex
    flex-direction: column-reverse
@media (max-width: 720px)


</style>
