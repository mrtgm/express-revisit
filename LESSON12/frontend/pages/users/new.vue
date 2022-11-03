<template>
  <div>
    <form @submit.prevent="add">
      <label for="name">Name</label><br />
      <input v-model="formData.firstName" /><br />
      <input v-model="formData.lastName" /><br />

      <label for="name">Email</label><br />
      <input v-model="formData.email" /><br />

      <label for="name">Pass</label><br />
      <input v-model="formData.password" /><br />

      <label for="name">ZipCode</label><br />
      <input v-model="formData.zipCode" /><br />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { createUser } from "~/composables/api";

const router = useRouter();
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  zipCode: "",
});

const add = async () => {
  const { error } = await createUser(formData.value);

  if (!error.value) {
    router.push("/users");
  } else {
    alert("失敗しました");
  }
};
</script>
