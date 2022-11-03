import { useAuthStore } from "~~/store/auth";
import { fetchCurrentUser } from "~/composables/api";

export default defineNuxtPlugin(async (nuxt) => {
  const authStore = useAuthStore();

  if (process.client) {
    // token + localStorage 使った認証
    const token = localStorage.getItem("token");
    if (token) {
      authStore.setToken(token);
    }

    // Cookie を使った認証
    const { data: user } = await fetchCurrentUser();
    if (user.value) {
      authStore.setCurrentUser(user.value);
    }
  }
});
