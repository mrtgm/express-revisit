<template>
  <div class="subscriber-add-form">
    <form @submit.prevent="add">
      <label for="name">Name</label><br />
      <input v-model="formData.name" /><br />

      <label for="email">Email</label><br />
      <input v-model="formData.email" /><br />

      <label for="zipCode">ZipCode</label><br />
      <input v-model="formData.zipCode" /><br />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { createSubscriber } from "~/composables/api";

const router = useRouter();
const formData = ref({
  name: "",
  email: "",
  zipCode: "",
});

const add = async () => {
  const { error } = await createSubscriber(formData.value);

  formData.value = {
    name: "",
    email: "",
    zipCode: "",
  };

  if (!error.value) {
    router.push("/user");
  } else {
    alert("失敗しました");
  }
};
</script>
