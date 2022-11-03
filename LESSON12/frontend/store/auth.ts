import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
  }),

  actions: {
    async login() {
      // ...
    },
  },
});
