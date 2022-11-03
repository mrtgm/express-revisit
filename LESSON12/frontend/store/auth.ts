import { defineStore } from "pinia";
import { loginUser, logoutUser, LoginOptions } from "~/composables/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
    token: null,
  }),

  getters: {
    loggedIn() {
      return !!this.currentUser;
    },
  },

  actions: {
    setCurrentUser(user) {
      this.currentUser = user;
    },

    setToken(token) {
      this.token = token;
    },

    async login(options: LoginOptions) {
      const { data: user } = await loginUser(options);

      if (!user) {
        throw new Error("Login failed");
        return;
      }

      this.setCurrentUser(user.value);
      this.setToken(user.value.token);
      localStorage.setItem("token", user.value.token);

      return user;
    },

    async logout() {
      const { data } = await logoutUser();

      if (!data) {
        throw new Error("Logout failed");
        return;
      }

      this.currentUser = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
