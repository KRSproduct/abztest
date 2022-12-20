<script setup>
import { ref } from "vue";

defineEmits(["update:modelValue", "blur"]);
const isPlaceholderClicked = ref(false);
const props = defineProps({
  inputPlaceholder: {
    type: String,
    default: "",
  },
  inputTextHelper: {
    type: String,
    default: "",
  },
  isOnlyNumber: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
  maxlength: {
    type: [String, Number],
    default: Infinity,
  },
  minlength: {
    type: [String, Number],
    default: Infinity,
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
});
const onlyNumber = ($event) => {
  if (!props.isOnlyNumber) {
    return;
  }
  let keyCode = $event.keyCode || $event.which;

  if (keyCode === 13) {
    return;
  }

  if (keyCode != 43 && keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
    $event.preventDefault();
  }
};
</script>

<template>
  <div :class="['input-wrapper', { error: isError }]">
    <span
      :class="['input-caption']"
      v-if="isPlaceholderClicked || modelValue"
      >{{ inputPlaceholder }}</span
    >
    <input
      :class="['input']"
      :value="modelValue"
      :maxlength="maxlength"
      :minlength="minLength"
      :placeholder="isPlaceholderClicked ? '' : inputPlaceholder"
      :type="type"
      :disabled="disabled"
      @keypress="onlyNumber"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isPlaceholderClicked = true"
      @blur="isPlaceholderClicked = false"
    />

    <span class="input-text-helper" v-if="!isError">{{ inputTextHelper }}</span>

    <div class="input-text-helper text-red" v-if="isError">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
.input-caption {
  position: absolute;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  z-index: 10;
  background: #f8f8f8;
  left: 20px;
  top: -5px;
  padding: 0 4px;
}
.input {
  font-size: 16px;
  line-height: 26px;
  padding: 14px 16px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d0cfcf;
  background: #f8f8f8;
  color: rgba(0, 0, 0, 0.87);
  outline: none;
}

input[type="text"],
input[type="button"],
input[type="submit"] {
  -webkit-appearance: none;
}
input::placeholder {
  color: #7e7e7e;
}
.input-text-helper {
  position: absolute;
  left: 16px;
  bottom: -16px;
  font-size: 12px;
  line-height: 14px;
  color: #7e7e7e;
}
.text-red {
  color: #cb3d40;
}
.error {
  color: #cb3d40;
  .input {
    background: transparent;
    border: 2px solid #cb3d40;
  }
}
</style>
