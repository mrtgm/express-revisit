<template>
  <header class="header">
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/users">User</nuxt-link></li>
      <li><nuxt-link to="/subscribers">Subscriber</nuxt-link></li>
      <li><nuxt-link to="/users/login">Login</nuxt-link></li>
      <li @click="handleClickLogout">Logout</li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const router = useRouter();

const handleClickLogout = async () => {
  try {
    await useAuthStore().logout();
    router.push("/");
  } catch (error) {
    alert("ログアウトに失敗しました");
  }
};
</script>

<style lang="scss">
.header {
  background-color: #eee;
  padding: 10px;
  ul {
    list-style: none;
    display: flex;
    li {
      margin-right: 10px;
    }
  }
}
</style>
