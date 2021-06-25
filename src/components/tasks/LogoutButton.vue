<template>
  <div class="btn-logout">
    <v-btn color="success" @click="handleLogout">ログアウト</v-btn>
  </div>
</template>

<script>
import { userActions } from "@/store/modules/user";

export default {
  name: "LogoutButton",
  methods: {
    ...userActions(["logout"]),
    async handleLogout() {
      await this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
</style>