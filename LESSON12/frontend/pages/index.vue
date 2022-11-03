<template>
  <div>
    <NuxtLink to="/users/login">Login</NuxtLink>
    <div v-if="loggedIn">
      <p>Current User: {{ currentUser?.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/store/auth";

const { loggedIn, currentUser } = useAuthStore();
</script>

<style lang="scss" scoped>
.subscriber-list {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;

  ul {
    list-style: none;
  }
}

.subscriber-add-form {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
