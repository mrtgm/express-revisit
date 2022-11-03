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
import { loginUser } from "~/composables/api";

const formData = ref({
  email: "",
  password: "",
});

const router = useRouter();

const login = async () => {
  const { error } = await loginUser(formData.value);

  if (!error.value) {
    router.push("/users");
    console.log("ログイン成功");
  } else {
    alert("失敗しました");
  }
};
</script>
