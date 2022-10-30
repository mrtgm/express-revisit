<template>
  <div v-if="subscriber">
    <p>Name: {{ subscriber?.name }}</p>
    <p>Email: {{ subscriber?.email }}</p>
    <p>ZipCode: {{ subscriber?.zipCode }}</p>
  </div>
</template>

<script setup lang="ts">
import { fetchSubscriber, SubscriberEntity } from "~/composables/api";

const route = useRoute();

const { data: subscriber, error, pending, refresh } = await fetchSubscriber(route.params.id as string);
</script>
