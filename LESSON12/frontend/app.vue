<template>
  <div v-for="d in data">
    <pre>{{ d }}</pre>
  </div>

  <div>
    <form @submit.prevent="add">
      <input v-model="formData.name" />
      <input v-model="formData.email" />
      <input v-model="formData.zipCode" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const baseUrl = "http://localhost:3000";
const data = ref([]);
const formData = ref({
  name: "",
  email: "",
  zipCode: "",
});

const fetchSubscribers = async () => {
  data.value = await fetch(baseUrl + "/subscribers").then((res) => res.json());
};

const add = async () => {
  await fetch("http://localhost:3000/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.value),
  });
  formData.value = {
    name: "",
    email: "",
    zipCode: "",
  };
  await fetchSubscribers();
};

await fetchSubscribers();
</script>
