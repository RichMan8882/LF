<script setup>
import i11 from '@/assets/image/zw/zw-i11.jpg'
import i12 from '@/assets/image/zw/zw-i12.jpg'
import i13 from '@/assets/image/zw/zw-i13.jpg'
import i21 from '@/assets/image/zw/zw-i21.jpeg'
import i22 from '@/assets/image/zw/zw-i22.jpg'
import i31 from '@/assets/image/zw/zw-i31.png'
import i32 from '@/assets/image/zw/zw-i32.jpeg'
import i33 from '@/assets/image/zw/zw-i33.jpg'
import i41 from '@/assets/image/zw/zw-i41.jpg'
import i42 from '@/assets/image/zw/zw-i42.jpg'
import i43 from '@/assets/image/zw/zw-i43.jpg'

const list1 = [i11, i12, i13]
const list2 = [i21, i22]
const list3 = [i31, i32, i33]
const list4 = [i41, i42, i43]
</script>

<template>
  <video
    src="@/assets/image/zw-herosmall.mp4"
    autoplay
    muted
    playsinline
    loop
  />

  <section>
    <div class="container">
      <div class="zw-info">
        <h2>
          {{ $lang('我們的理念') }}
        </h2>
        <p>
          {{
            $lang(
              '開放的企業文化，對話精神與尊重。 獨到的合作理念和方法，是和客戶或合作伙伴在各個層面的協同作業上產生緊密的互動，以隨時回饋及分享的精神，確保客戶或合作伙伴在合作的過程中獲得最大效益，協助在市場中掌握更大的商機。'
            )
          }}
        </p>
      </div>
      <div class="zw-info">
        <h2>
          {{ $lang('5G行業 未來可期') }}
        </h2>
        <p>
          {{
            $lang(
              '供應鏈常是不同產業之間的銜接，以主動積極的精神，主動與客戶合作夥伴提出資訊連線交換資料，以確保資料一致性與作業快速，讓客戶降低人工作業之不必要風險，並協助客戶完整串起整體供應鏈電子化，讓客戶無論在發送、接收、帳務、訂單數量等等資料是最即時與完整。'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '近年來大空產業為了解決通訊傳輸、軍事用途、與商業能合而為一，尋找不少解決方案；而太空產業龍頭SpaceX就是在這思維下的公司，從原本的主力歐洲市場進軍美國市場，包含美國西岸、東北部，與多家衛星業者合作。臺灣早已能自主生產地面終端元件，成熟的5G 研發經驗及技術協助客戶運用作業系統提升訊號對街效率在市場中掌握更大的商機以結合集團之經營理念『永續經營，利潤共享』'
            )
          }}
        </p>
      </div>

      <img src="@/assets/image/zw/zw-b1.jpg" alt="" />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="zw-info">
        <h2>
          {{ $lang('公益宗旨') }}
        </h2>
        <p>
          {{
            $lang(
              '「取之於社會，用之於社會」的理念，以扶助社會弱勢為宗旨向關懷弱勢、熱心公益，且實際付出行動。早年在報章雜誌上看到弱勢者的報導，便馬上派人上門探訪，自掏腰包送慰問金，提供即時協助。在企業版圖逐漸壯大的同時，便期許能以更制度化、組織化的模式來進行急難救助。'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '與台灣這片土地共同成長、茁壯，並許為「社會的發電機」，積極投入不同面向的社會公益領域，飲水思源，回饋社會，未來也將持續傳承並公益理念，善盡企業社會責任，致力創造社會的共好！'
            )
          }}
        </p>
      </div>

      <ZwSlider name="list1" :images="list1" />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="zw-info">
        <h2>
          {{ $lang('理財觀念') }}
        </h2>
        <img src="@/assets/image/zw/zw-b2.jpg" alt="" />
        <p>
          {{
            $lang(
              '根據《富達國際全球女性投資理財調查》顯示，在台灣有超過七成的女性有經濟獨立的意識，堪稱全球之冠。隨著單身社會的來臨，亞太區有將近56%的女性積極投入理財。而在台灣，女性不僅是最積極理財的群體，也是最認同退休後持續投資的一群，可見女性對於投資理財的重視程度。'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '理財規劃第一步，可先分別設定短、中、長期的財富目標，才能幫助你循序漸進地完成，同時還能有效的控管資產 CFD和智能理財資產管理業務在科技 文化 通訊 軍用 民用屢有等領域成功表現出卓越的成績，若想要讓資產有所增加，除了控管支出外，選擇合適的管道也很重要，不僅能幫助你累積資產，還能有效的運用閒置的資金能讓資產的分配與應用更完善。'
            )
          }}
        </p>
        <p>
          {{
            $lang(
              '訂立目標後，接著審視自身的財務狀況，若每月平均支出高於收入，那麼就需要檢討支出的來源，並重新調整，以及分配資產的應用。能讓資產的分配與應用更完善。'
            )
          }}
        </p>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="zw-info">
        <p>
          {{
            $lang(
              '短期目標 未來的1年內，將會有哪些支出需求，像是需要購買新的電器或是工作設備等。'
            )
          }}
        </p>
      </div>

      <ZwSlider name="list2" :images="list2" />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="zw-info">
        <p>
          {{
            $lang(
              '中期目標 檢視在3～5年內，有哪些目標需要達成，如出國留學、結婚花費、孩子的教育金等。'
            )
          }}
        </p>
      </div>

      <ZwSlider name="list3" :images="list3" />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="zw-info">
        <p>
          {{
            $lang(
              '長期目標 建議評估較為長期的需求，像是買車、買房、退休生活費規劃等。'
            )
          }}
        </p>
      </div>

      <ZwSlider name="list4" :images="list4" />
    </div>
  </section>
</template>

<style lang="sass" scoped>
video
  width: 100dvw
section
  padding: 40px 20px
  color: #212529

h2
  font-size: 18px
  font-weight: bold
  margin-bottom: 16px

p
  margin-bottom: 16px

img
  width: 100%
  margin-bottom: 32px

@media screen and (min-width: 1200px)
  section
    padding: 80px 20px

  .container
    width: 1200px
    margin: 0 auto

  img
    width: auto
    margin: 0 auto 32px
</style>
