<template>
  <div class="region-wrapper">
    <div class="region-inner">
      <div class="region">
        <div class="region-title">{{ regionTitle }}</div>
        <div class="region-content">
          <div class="region-content-inner">
            <div class="sido-title">시도</div>
            <div class="crops">
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
            </div>
          </div>

          <div class="region-content-inner">
            <div class="sido-title">시도</div>
            <div class="crops">
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
              <div class="crops-info">
                <div class="crops-name">가지</div>
                <div class="crops-count">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const regionTitle = ref('')
// const regionList = ref()
</script>

<style>
.region-wrapper {
  /* display: none; */
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, #fbfcfc, #bdffdf 80%);
  transition: all 0.3s;
}

.region-inner {
  padding: 12px 24px;
}

.region .region-title {
  text-align: center;
  margin: 12px 0;
  font-size: 36px;
  font-weight: bold;
}

.region-content-inner {
  background: linear-gradient(90deg, #fbfcfc, #d7ffb0);
  padding: 12px;
  margin-top: 12px;
}

.sido-title {
  font-size: 24px;
  font-weight: bold;
}

.crops {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.crops-info {
  display: flex;
  margin: 4px 0;
}

.crops-count {
  margin-left: 6px;
}

@media screen and (min-width: 1200px) {
  .crops {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
