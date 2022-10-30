<template>
  <div v-if="!pending">
    <div v-for="d in data" :key="d._id">
      <ul>
        <li>{{ d.name }}</li>
        <li>{{ d.email }}</li>
        <li>{{ d.zipCode }}</li>
        <li v-for="course of d.courses">{{ course }}</li>
      </ul>
    </div>
    <div>
      <form @submit.prevent="add">
        <input v-model="formData.name" />
        <input v-model="formData.email" />
        <input v-model="formData.zipCode" />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchSubscribers, addSubscriber } from "~/composables/api";

const formData = ref({
  name: "",
  email: "",
  zipCode: "",
});

const { data, error, pending, refresh } = await fetchSubscribers();

const add = async () => {
  const { error } = await addSubscriber(formData.value);

  formData.value = {
    name: "",
    email: "",
    zipCode: "",
  };
  refresh();
};
</script>
