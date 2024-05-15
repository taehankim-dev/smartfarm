<template>
  <div class="content-inner">
    <div class="map-wrapper">
      <!-- <img src="/src/assets/KoreaMap.svg" alt="전국지도" /> -->
      <icon-base iconName="koreaMap" viewBox="400 -50 550 650" width="1920" height="1200">
        <!-- <icon-base iconName="koreaMap" viewBox="350 0 600 800" width="1920" height="1200"> -->
        <KoreaMap :groupedByProvince="groupedByProvince" />
      </icon-base>

      <!-- <div
        v-for="(count, province) in groupedByProvince"
        :key="province"
        :class="'province-point-wrapper point-' + province"
      >
        <div class="point-inner">
          <p>{{ province }}</p>
          <img src="/src/assets/icons/marker.png" alt="표시 마크" class="marker-img" />
        </div>
      </div> -->
    </div>

    <RegionInfo />
  </div>
</template>

<script setup lang="ts">
import '@customStyles/KoreaMap.css'
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
  //   getFarmList()
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

  console.log(provinceDetail.value, 'HH')
  console.log(groupedByProvince.value, 'HH2')
}
</script>
