<template>
  <div>
    <div class="primary-btn">
      <NuxtLink to="/users/new">Add User</NuxtLink>
    </div>
    <div class="user-list" v-for="user in users" :key="user._id">
      <NuxtLink :to="`/users/${user._id}`">
        <p>Name: {{ getFullName(user) }}</p>
        <p>Email: {{ user.email }}</p>
        <p>ZipCode: {{ user.zipCode }}</p>
      </NuxtLink>
      <NuxtLink :to="`/users/${user._id}/edit`">Edit</NuxtLink>
      <span class="delete" @click="handleClickDelete(user._id)">Delete</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchUsers, deleteUser, UserEntity } from "~/composables/api";

const { data: users, error, pending, refresh } = await fetchUsers();

const getFullName = (user: UserEntity) => {
  return `${user?.name?.first} ${user?.name?.last}`;
};

const handleClickDelete = async (userId: string) => {
  if (window.confirm("本当に消していい？")) {
    const { error } = await deleteUser(userId);
    if (!error.value) {
      refresh();
    } else {
      alert("削除に失敗しました");
    }
  }
};
</script>

<style lang="scss" scoped>
.primary-btn {
  background-color: #eee;
  padding: 10px;
}
.user-list {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}

.delete {
  color: red;
  cursor: pointer;
}
</style>
