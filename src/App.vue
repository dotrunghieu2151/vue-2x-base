<template>
  <v-app>
    <v-layout row justify-center>
      <v-container fluid>
        <LoaderWrapper :loading="isLoading">
          <LoaderSpin />
        </LoaderWrapper>
        <v-main>
          <transition name="fade">
            <router-view />
          </transition>
        </v-main>
      </v-container>
    </v-layout>
  </v-app>
</template>


<script>
import { commonGetters } from "@/store/modules/common";
import LoaderWrapper from "./components/common/loaders/LoaderWrapper.vue";
import LoaderSpin from "./components/common/loaders/LoaderSpin.vue";

export default {
  name: "App",
  components: {
    LoaderWrapper,
    LoaderSpin,
  },
  data: () => ({
    //
  }),
  computed: {
    ...commonGetters(["isLoading"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style";
</style>
