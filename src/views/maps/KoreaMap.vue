<template>
  <div class="content-inner">
    <div class="map-wrapper">
      <!-- <img src="/src/assets/KoreaMap.svg" alt="전국지도" /> -->
      <icon-base iconName="koreaMap" viewBox="400 -50 550 650" width="1920" height="1200">
        <!-- <icon-base iconName="koreaMap" viewBox="350 0 600 800" width="1920" height="1200"> -->
        <KoreaMap />
      </icon-base>
    </div>

    <div
      v-for="(count, province) in groupedByProvince"
      :key="province"
      :class="'province-point-wrapper point-' + province"
    >
      <div class="point-inner">
        <img src="/src/assets/icons/marker.png" alt="표시 마크" class="marker-img" />
        <p>{{ province }}</p>
      </div>
    </div>

    <RegionInfo />
  </div>
</template>

<script setup lang="ts">
import { CapacitorHttp } from '@capacitor/core'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import throttle from 'lodash/throttle'
import KoreaMap from '@/assets/KoreaMap.vue'
import RegionInfo from './RegionInfo.vue'
import type { farmIdentityT } from '@customTypes/identityType.ts'

const farmList = ref([])
const groupedByProvince = ref({})
const provinceDetail = ref({})

onBeforeMount(() => {
  //   resizingPage()
  getFarmList()
})

const resizingPage = () => {
  const resizeHandler = throttle(function () {
    let svg = document.getElementById('koreaMap')
    const pageWidth = window.outerWidth

    if (pageWidth < 720) {
      svg?.setAttribute('viewBox', '400 -50 1200 520')
    } else {
      svg?.setAttribute('viewBox', '400 -50 1200 520')
    }
  }, 1000)

  window.addEventListener('resize', resizeHandler)
}

// 농가 전체 정보 가져오기.
const getFarmList = async () => {
  await CapacitorHttp.get({
    url: `/api/getIdentityDataList/${import.meta.env.VITE_APP_SERVICE_KEY}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((res) => {
    if (res.status === 200) {
      farmList.value = res.data
      organizeDataByLocation(res.data)
    }
  })
}

// 지역별로 정리하기
const organizeDataByLocation = (data: farmIdentityT[]) => {
  const locations = Array.from(new Set([...data.map((item) => item.addressName)]))

  const groupedLoc: { [key: string]: { [key: string]: number } } = {}
  const provinceCount: { [key: string]: number } = {}

  locations.map((loc) => {
    let address: string[] = loc.split(' ')
    let province: string = ''
    let city: string = ''
    if (address.length > 1) {
      province = address[0]
      city = address[1]
    } else {
      province = address[0]
    }

    if (!groupedLoc[province]) {
      groupedLoc[province] = {}
      provinceCount[province] = 0
    }

    if (!groupedLoc[province][city]) {
      groupedLoc[province][city] = 0
    }

    provinceCount[province]++
    groupedLoc[province][city]++
  })

  groupedByProvince.value = provinceCount
  provinceDetail.value = groupedLoc
}
</script>
<style>
.content-inner {
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
  /* display: grid; */
  /* grid-template-columns: 2fr 1fr; */
}

.map-wrapper {
  transition: all 0.3s;
  width: 100%;
}

.map-wrapper svg {
  width: 100%;
}

.province-point-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}

.marker-img {
  display: flex;
  width: 30px;
  height: 30px;
  margin: 0 auto;
}

.point-강원특별자치도 {
  top: 300px;
  left: 400px;
}

.point-서울특별시 {
  top: 320px;
  left: 260px;
}

.point-경기도 {
  top: 360px;
  left: 310px;
}

.point-충청북도 {
  top: 420px;
  left: 350px;
}

.point-세종특별자치시 {
  top: 465px;
  left: 280px;
}

.point-충청남도 {
  top: 480px;
  left: 240px;
}

.point-전라북도 {
  top: 580px;
  left: 290px;
}

.point-전라남도 {
  top: 690px;
  left: 270px;
}

.point-광주광역시 {
  top: 645px;
  left: 248px;
}

.point-경상북도 {
  top: 480px;
  left: 440px;
}

.point-경상남도 {
  top: 630px;
  left: 400px;
}

.point-부산광역시 {
  top: 650px;
  left: 490px;
}
</style>
