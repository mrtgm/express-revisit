<template>
  <div v-if="user">
    <p>Name: {{ getFullName(user) }}</p>
    <p>Email: {{ user?.email }}</p>
    <p>ZipCode: {{ user?.zipCode }}</p>
    <div v-if="user?.subscribedAccount">
      <NuxtLink :to="`/subscribers/${user?.subscribedAccount}`">{{ user?.subscribedAccount }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchUser, UserEntity } from "~/composables/api";

const route = useRoute();

const { data: user, error, pending, refresh } = await fetchUser(route.params.id as string);

const getFullName = (user: UserEntity) => {
  return `${user?.name?.first} ${user?.name?.last}`;
};
</script>
