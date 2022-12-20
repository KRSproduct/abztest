<script setup lang="ts">
import { useApi } from "@/composition";
import { onMounted, reactive, ref } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import RadioButton from "./RadioButton.vue";
import Upload from "./Upload.vue";

const { getPosition, positions, addUser, getToken, tokenKey, isLoading } =
  useApi();

const emit = defineEmits(["success"]);

const formData: any = reactive({
  name: "",
  email: "",
  phone: "",
  position_id: "",
  photo: "",
});

const phoneValid = ref(null);
const emailValid = ref(null);

const phoneError = ref(false);
const emailError = ref(false);
const nameError = ref(false);
const positionError = ref(false);
const photoError = ref(false);

const emailValidation =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const phoneValidation = /^[\+]{0,1}380([0-9]{9})$/;

const onEmailInput = (value: any) => {
  let valueReplaced2 = value.target.value.split(" ").join("");
  emailValid.value = valueReplaced2.match(emailValidation);
};

const onMobileInput = (value: any) => {
  let valueReplaced = value.target.value.split(" ").join("");
  phoneValid.value = valueReplaced.match(phoneValidation);
};

async function submit() {
  await getToken();

  if (!phoneValid.value || formData.name === "") {
    phoneError.value = true;
  }
  if (!emailValid.value || formData.email === "") {
    emailError.value = true;
  }
  if (formData.name === "" || formData.name.length < 2) {
    nameError.value = true;
  }
  if (formData.position_id === "") {
    positionError.value = true;
  }
  if (formData.photo === "") {
    photoError.value = true;
    return;
  } else {
    isLoading.value = true;
    await addUser(formData);
    emit("success");
    isLoading.value = false;
  }
}

onMounted(async () => {
  await getPosition();
});
</script>
<template>
  <form
    class="form"
    @submit.prevent="submit"
    v-if="!success"
    method="post"
    enctype="multipart/form-data"
  >
    <div class="form__field">
      <Input
        inputPlaceholder="Your name"
        v-model="formData.name"
        name="name"
        class="field"
        minlength="2"
        maxlength="60"
        :isError="nameError"
      >
        Error
      </Input>
      <Input
        inputPlaceholder="Email"
        v-model="formData.email"
        name="email"
        class="field"
        @input="onEmailInput($event)"
        :isError="emailError"
      >
        Error
      </Input>
      <Input
        inputPlaceholder="Phone"
        v-model="formData.phone"
        name="phone"
        isOnlyNumber
        maxlength="60"
        class="field"
        @input="onMobileInput($event)"
        inputTextHelper="+38 (XXX) XXX - XX - XX"
        :isError="phoneError"
      >
        Error
      </Input>
    </div>
    <div class="radio-wrapper">
      <p class="radio-wrapper__title">Select your position</p>
      <template v-for="(position, index) in positions" :key="position.id">
        <RadioButton
          v-model="formData.position_id"
          :labelName="position.name"
          :id="position.id"
          class="radio-wrapper__item"
          @change="formData.position_id = index + 1"
        />
      </template>
      <span v-if="positionError" class="text-red">Error</span>
    </div>
    <div class="upload-wrapper">
      <Upload v-model="formData.photo" :isError="photoError">Error</Upload>
    </div>
    <div class="button-wrapper">
      <Button :disabled="isLoading" theme="yellow">Sign up</Button>
    </div>
  </form>
</template>
<style scoped lang="scss">
.form__field {
  display: flex;
  flex-direction: column;
}
.field {
  display: flex;
  margin-bottom: 50px;
  width: 100%;

  &:last-child {
    margin-bottom: 47px;
  }
}
.button-wrapper {
  display: flex;
  justify-content: center;
}
.radio-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 47px;
  &__title {
    margin-bottom: 11px;
  }
  &__item {
    margin-bottom: 7px;
  }
}
.upload-wrapper {
  margin-bottom: 50px;
}
.text-red {
  color: #cb3d40;
}
</style>


