<template>
  <div class="subscriber-add-form">
    <form @submit.prevent="edit">
      <label for="name">Name</label><br />
      <input v-model="formData.name" /><br />

      <label for="email">Email</label><br />
      <input v-model="formData.email" /><br />

      <label for="zipCode">ZipCode</label><br />
      <input v-model="formData.zipCode" /><br />
      <button type="submit">Edit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { updateSubscriber, fetchSubscriber } from "~/composables/api";

const router = useRouter();
const route = useRoute();

const { data: subscriber, pending, error, refresh } = await fetchSubscriber(route.params.id as string);

const formData = ref({
  name: subscriber.value.name,
  email: subscriber.value.email,
  zipCode: subscriber.value.zipCode,
});

const edit = async () => {
  const { error } = await updateSubscriber(route.params.id as string, formData.value);

  formData.value = {
    name: "",
    email: "",
    zipCode: "",
  };

  if (!error.value) {
    router.push("/subscribers");
  } else {
    alert("失敗しました");
  }
};
</script>
