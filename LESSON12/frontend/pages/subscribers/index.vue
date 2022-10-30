<template>
  <div>
    <div class="primary-btn">
      <NuxtLink to="/subscribers/new">Add Subscriber</NuxtLink>
    </div>
    <div v-if="!pending">
      <div class="subscriber-list" v-for="d in data" :key="d._id">
        <ul>
          <li>Name: {{ d.name }}</li>
          <li>Email: {{ d.email }}</li>
          <li>ZipCode: {{ d.zipCode }}</li>
          <li v-for="course of d.courses">Course: {{ course }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchSubscribers, createSubscriber } from "~/composables/api";
const { data, error, pending, refresh } = await fetchSubscribers();
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

.primary-btn {
  background-color: #eee;
  padding: 10px;
}
</style>
