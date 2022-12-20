<script lang="ts" setup>
import { ref } from "@vue/reactivity";

const emit = defineEmits<{ (e: "update:modelValue", image: string) }>();
const props = defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
});

const imageUpload: HTMLInputElement = ref(null);
const image: any = ref(null);

const uploadedImage = ($event: any) => {
  const file = $event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = async () => {
    image.value = reader.result as string;
  };
  reader.readAsDataURL(file as File);

  emit("update:modelValue", file);
};
</script>
<template>
  <div :class="{ error: isError }">
    <div class="avatar-image" @click="imageUpload.click()">
      <input
        type="file"
        accept="image/jpg,image/jpeg"
        hidden
        ref="imageUpload"
        @change="uploadedImage"
      />
      <div class="upload">
        <span class="upload-square">Upload</span>
        <span class="upload-text">
          <template v-if="!image"> Upload your photo </template>
          <template v-else>
            <div class="upload-text__image">
              <img :src="image" />
              <span>Image loaded</span>
            </div>
          </template>
        </span>
        <div class="input-text-helper text-red" v-if="isError">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.upload {
  position: relative;
  border: 1px solid #d0cfcf;
  border-radius: 4px;
  color: #7e7e7e;
  font-size: 16px;
  line-height: 26px;
  cursor: pointer;
  &-square {
    position: absolute;
    left: -1px;
    top: -1px;
    bottom: -1px;

    border: 1px solid rgba(0, 0, 0, 0.87);
    border-radius: 4px 0px 0px 4px;
    color: rgba(0, 0, 0, 0.87);
    max-width: 83px;
    width: 100%;
    padding: 14px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-text {
    display: flex;
    margin-left: auto;
    padding: 14px 16px;
    width: calc(100% - 114px);
    &__image {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 12px;
        object-fit: cover;
      }
    }
  }
}
.input-text-helper {
  position: absolute;
  left: 16px;

  font-size: 12px;
  line-height: 14px;
  color: #7e7e7e;
}

.error {
  color: #cb3d40;
  .upload {
    background: transparent;
    border: 2px solid #cb3d40;
    &-square {
      border: 2px solid #cb3d40;
    }
  }
}
.text-red {
  color: #cb3d40;
}
</style>