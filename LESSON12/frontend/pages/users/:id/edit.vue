<template>
  <div>
    <form @submit.prevent="edit">
      <label for="name">Name</label><br />
      <input v-model="formData.firstName" /><br />
      <input v-model="formData.lastName" /><br />

      <label for="name">Email</label><br />
      <input v-model="formData.email" /><br />

      <label for="name">Pass</label><br />
      <input v-model="formData.password" /><br />

      <label for="name">ZipCode</label><br />
      <input v-model="formData.zipCode" /><br />
      <button type="submit">Edit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { updateUser, fetchUser } from "~/composables/api";

const router = useRouter();
const route = useRoute();
const { data: user, error, pending, refresh } = await fetchUser(route.params.id as string);

const formData = ref({
  firstName: user.value.name.first,
  lastName: user.value.name.last,
  email: user.value.email,
  password: user.value.password,
  zipCode: user.value.zipCode,
});

const edit = async () => {
  const { error } = await updateUser(route.params.id as string, formData.value);

  formData.value = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipCode: "",
  };

  if (!error.value) {
    router.push("/users");
  } else {
    alert("失敗しました");
  }
};
</script>
