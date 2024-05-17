<template>
  <div class="content-inner">
    <div class="map-wrapper">
      <!-- <img src="/src/assets/KoreaMap.svg" alt="전국지도" /> -->
      <icon-base iconName="koreaMap" viewBox="400 -50 550 650" width="1920" height="1200">
        <!-- <icon-base iconName="koreaMap" viewBox="350 0 600 800" width="1920" height="1200"> -->
        <KoreaMap :groupedByProvince="groupedByProvinceAndPlant" />
      </icon-base>
    </div>

    <RegionInfo />
  </div>
</template>

<script setup lang="ts">
import '@customStyles/KoreaMap.css'
import { CapacitorHttp } from '@capacitor/core'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import KoreaMap from '@/assets/KoreaMap.vue'
import RegionInfo from './RegionInfo.vue'
import type { farmIdentityT } from '@customTypes/identityType.ts'

const farmList = ref([])
const groupedByProvince = ref({})
const groupedByProvinceAndPlant = ref({})

type FarmDataT = {
  addressName: string
  facilityId: string
  product: string
  userId: string
}

type AddressEntryT = {
  addressName: string
  [product: string]: number | string
}

type ResultT = {
  [region: string]: AddressEntryT[]
}

onBeforeMount(() => {
  getFarmList()
})

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
      //   console.log(farmList.value, '<= farmList')
      organizeDataByLocation(res.data)
    }
  })
}

// 지역별로 정리하기
const organizeDataByLocation = (farms: farmIdentityT[]) => {
  const group: { [key: string]: FarmDataT[] } = {}
  farms.map((farm) => {
    const loc: string[] = farm.addressName.split(' ')
    if (!group[loc[0]]) {
      group[loc[0]] = [
        {
          addressName: farm.addressName,
          facilityId: farm.facilityId,
          product: farm.product,
          userId: farm.userId
        }
      ]
    } else {
      group[loc[0]].push(farm)
    }

    return
  })

  organizeDataByPlant(group)
  groupedByProvince.value = group
}

const organizeDataByPlant = (group: { [key: string]: FarmDataT[] }) => {
  const groupByPlant: ResultT = {}
  for (const region in group) {
    if (!groupByPlant[region]) {
      groupByPlant[region] = []
    }

    group[region].map((item) => {
      const { addressName, product } = item

      let addressEntry = groupByPlant[region].find((entry) => entry.addressName === addressName)
      if (!addressEntry) {
        // 해당 주소가 없으면 새 객체를 생성하여 추가합니다.
        addressEntry = { addressName }
        groupByPlant[region].push(addressEntry)
      }

      // 제품 카운트를 업데이트합니다.
      if (!addressEntry[product]) {
        addressEntry[product] = 1
      } else {
        ;(addressEntry[product] as number)++
      }
    })
  }

  groupedByProvinceAndPlant.value = groupByPlant
}
</script>
