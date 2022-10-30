<template>
  <div v-if="!pending">
    <div class="subscriber-list" v-for="d in data" :key="d._id">
      <ul>
        <li>Name: {{ d.name }}</li>
        <li>Email: {{ d.email }}</li>
        <li>ZipCode: {{ d.zipCode }}</li>
        <li v-for="course of d.courses">Course: {{ course }}</li>
      </ul>
    </div>
    <div class="subscriber-add-form">
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
import { fetchSubscribers, createSubscriber } from "~/composables/api";

const formData = ref({
  name: "",
  email: "",
  zipCode: "",
});

const { data, error, pending, refresh } = await fetchSubscribers();

const add = async () => {
  const { error } = await createSubscriber(formData.value);

  formData.value = {
    name: "",
    email: "",
    zipCode: "",
  };
  refresh();
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

.subscriber-add-form {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
