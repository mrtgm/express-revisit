<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">Email</label><br />
      <input v-model="formData.email" /><br />
      <label for="password">Password</label><br />
      <input v-model="formData.password" /><br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";

const formData = ref({
  email: "",
  password: "",
});

const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login(formData.value);
    router.push("/");
  } catch (error) {
    alert("ログインに失敗しました");
  }
};
</script>
