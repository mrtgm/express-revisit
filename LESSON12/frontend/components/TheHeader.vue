<template>
  <header class="header">
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/user">User</nuxt-link></li>
      <li><nuxt-link to="/subscriber">Subscriber</nuxt-link></li>
    </ul>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.header {
  background-color: #eee;
  padding: 10px;
  ul {
    list-style: none;
    display: flex;
    li {
      margin-right: 10px;
    }
  }
}
</style>
