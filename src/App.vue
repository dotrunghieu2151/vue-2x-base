<template>
  <v-app>
    <v-main class="blue-grey lighten-5">
      <transition name="fade">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import { appConfig } from "@/config";
import { mapGetters } from "vuex";
import Loading from "./components/common/Loading";

export default {
  name: "App",

  components: {
    Loading,
  },

  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },

  watch: {
    error(error) {
      if (error !== null && error.message !== "") {
        this.$toasted.show(error.message);
      }
    },
    message(value) {
      if (value) {
        this.$toasted.show(value);
      }
    },
    isAuthenticated(value) {
      if (!value) {
        this.$router.push({ name: "login" });
      }
    },
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
</style>