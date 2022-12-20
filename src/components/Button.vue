<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  theme: { type: String, default: "yellow" },
  disabled: { type: Boolean, default: false },
});
</script>
<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="['button', theme, disabled ? 'disabled' : '']"
  >
    <slot />
  </button>
</template>
<style scoped lang="scss">
.button {
  padding: 4px 23px;
  border: none;
  font-size: 16px;
  line-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 100px;
}
.yellow {
  background: #f4e041;
  border-radius: 80px;
  color: rgba(0, 0, 0, 0.87);
  transition: background 0.3s ease;
  &:hover {
    background: #ffe302;
  }
}
.disabled {
  background: #b4b4b4;
  color: #fff;
  cursor: default;
  user-select: none;
  &:hover {
    background: #b4b4b4;
  }
}
</style>
