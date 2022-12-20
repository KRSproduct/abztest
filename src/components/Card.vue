<script lang="ts" setup>
import Popper from "vue3-popper";

defineProps({
  data: { type: Object, default: {} },
});
</script>
<template>
  <div class="card">
    <div class="card-image">
      <img v-if="data.photo" :src="data.photo" />
      <img v-else src="/photo-cover.svg" />
    </div>
    <div class="text clickable">
      <Popper :content="data.name">
        {{ data.name }}
      </Popper>
    </div>
    <div class="info">
      <div class="text">{{ data.position }}</div>
      <div class="text clickable">
        <Popper :content="data.email">
          {{ data.email }}
        </Popper>
      </div>
      <div class="text">{{ data.phone }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  max-width: 330px;
  padding: 20px;
  background: #fff;
  overflow: hidden;
  white-space: nowrap;
  @media (max-width: 480px) {
    max-width: inherit;
  }
}
.card-image {
  width: 70px;
  height: 70px;
  margin: auto;
  margin-bottom: 20px;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}
.info {
  margin-top: 20px;
}
.text {
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.clickable {
  cursor: pointer;
}
</style>