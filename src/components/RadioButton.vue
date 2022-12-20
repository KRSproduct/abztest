<script setup lang="ts">
defineProps({
  labelName: { type: String, default: "" },
  id: { type: Number, default: 1 },
  value: { type: Number, default: 1 },
});

const emit = defineEmits<{ (e: "change", value: any) }>();

const change = (e: any) => {
  emit("change", e.target.value);
};
</script>

<template>
  <div class="">
    <input
      type="radio"
      :value="value"
      name="position"
      :id="id"
      @change="change"
    />
    <label :for="id">{{ labelName }}</label>
  </div>
</template>

<style >
[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #00bdd3;
  border-radius: 100%;
  background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 10px;
  height: 10px;
  background: #00bdd3;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
::v-deep .inline-block {
  display: block !important;
}
</style>