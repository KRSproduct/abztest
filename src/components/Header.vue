<script setup lang="ts">
import Button from "./Button.vue";
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <!-- <img src="@/assets/images/logo.svg" /> -->
        </div>
        <div class="buttons">
          <Button theme="yellow">Users</Button>
          <Button class="buttons__button" theme="yellow">Sign up</Button>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
.header {
  width: 100%;
  padding: 13px 0;
  background: #fff;
  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1024px) {
      margin: 0 60px;
    }
    @media (max-width: 768px) {
      margin: 0 32px;
    }
    @media (max-width: 480px) {
      margin: 0 16px;
    }
  }
}
.buttons {
  display: flex;
  &__button {
    margin-left: 10px;
  }
}
.logo {
  width: 104px;
  height: 26px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>