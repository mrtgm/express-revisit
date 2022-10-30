<template>
  <div>
    <div class="primary-btn">
      <NuxtLink to="/subscribers/new">Add Subscriber</NuxtLink>
    </div>
    <div v-if="!pending">
      <div class="subscriber-list" v-for="d in data" :key="d._id">
        <NuxtLink :to="`/subscribers/${d._id}`">
          <ul>
            <li>Name: {{ d.name }}</li>
            <li>Email: {{ d.email }}</li>
            <li>ZipCode: {{ d.zipCode }}</li>
            <li v-for="course of d.courses">Course: {{ course }}</li>
          </ul>
        </NuxtLink>
        <NuxtLink :to="`/subscribers/${d._id}/edit`">Edit</NuxtLink>
        <span class="delete" @click="handleClickDelete(d._id)">Delete</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchSubscribers, deleteSubscriber } from "~/composables/api";
const { data, error, pending, refresh } = await fetchSubscribers();

const handleClickDelete = async (subscriberId: string) => {
  if (window.confirm("本当に消していい？")) {
    const { error } = await deleteSubscriber(subscriberId);
    if (!error.value) {
      refresh();
    } else {
      alert("削除に失敗しました");
    }
  }
};
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
