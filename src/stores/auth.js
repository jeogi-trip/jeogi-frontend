import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    userId: null,
  }),
  actions: {
    login(userId) {
      this.isAuthenticated = true;
      this.userId = userId;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", userId);
    },
    logout() {
      this.isAuthenticated = false;
      this.userId = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
    },
    checkAuth() {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      const userId = localStorage.getItem("userId");
      if (isAuthenticated && userId) {
        this.isAuthenticated = true;
        this.userId = userId;
      }
    },
  },
});
