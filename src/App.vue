<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useApi } from "@/composition";
import { Header, Button, Card, Form } from "./components";

const { users, getCards, allPages, isLoading } = useApi();
let currentPage = 1;
const isSuccessRegister = ref(false);

const loadUsers = async () => {
  isLoading.value = true;
  currentPage++;
  await getCards(6, currentPage);
  isLoading.value = false;
};

const updateCards = async () => {
  isSuccessRegister.value = true;
  await getCards(6, currentPage);
};

onMounted(async () => {
  isLoading.value = true;
  await getCards(6, 1);
  isLoading.value = false;
});
</script>

<template>
  <div class="app">
    <Header />
    <div class="container">
      <div class="intro">
        <div class="intro-content">
          <h1 class="intro-content__title">
            Test assignment for front-end developer
          </h1>
          <p class="intro-content__description">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button theme="yellow">Sign up</Button>
        </div>
      </div>
      <div class="get-section">
        <h1 class="section-title">Working with GET request</h1>
        <div class="cards-wrapper">
          <Card
            v-for="user in users"
            :key="user.id"
            :data="user"
            class="card"
          />
        </div>
        <div class="button-wrapper">
          <Button
            @click="loadUsers"
            :disabled="isLoading"
            v-if="allPages > currentPage"
            >Show more</Button
          >
        </div>
      </div>
      <div class="post-section">
        <h1 class="section-title">
          {{
            isSuccessRegister
              ? "User successfully registered"
              : "Working with POST request"
          }}
        </h1>
        <div class="form-wrapper">
          <div class="success-image-wrapper" v-if="isSuccessRegister">
            <img
              src="@/assets/images/success-image.svg"
              alt="success-registration"
            />
          </div>
          <Form @success="updateCards" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  background: #f8f8f8;
  padding-bottom: 100px;
}

.intro {
  background: url("@/assets/images/intro-bg.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  padding: 164px 0;
  margin-bottom: 140px;
  @media (max-width: 768px) {
    padding: 89px 0 88px;
  }
  @media (max-width: 480px) {
    padding: 40px 0 70px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 380px;

    @media (max-width: 480px) {
      margin: 0 16px;
    }

    &__title {
      font-size: 40px;
      line-height: 40px;
      margin-bottom: 21px;
    }

    &__description {
      margin-bottom: 32px;
    }
  }
}
.post-section {
  @media (max-width: 480px) {
    margin: 0 16px;
  }
}
.get-section {
  margin-bottom: 140px;

  @media (max-width: 480px) {
    margin-left: 16px;
    margin-right: 16px;
  }
}
.section-title {
  margin-bottom: 50px;
  text-align: center;
  font-weight: 400;
  font-size: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.87);
}

.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  @media (max-width: 1024px) {
    margin: 0 60px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 32px;
    grid-gap: 16px;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    margin: 0;
    grid-gap: 20px;
  }
}
.button-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
}
.form-wrapper {
  max-width: 380px;
  width: 100%;
  margin: auto;
}
.success-image-wrapper {
  img {
    width: 100%;
  }
}
</style>
