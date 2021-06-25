<template>
  <div class="loading-wrapper" v-if="loading">
    <slot />
  </div>
</template>

<script>
export default {
  name: "LoaderWrapper",
  props: {
    loading: Boolean,
  },
};
</script>

<style scoped>
.loading-wrapper {
  display: grid;
  place-items: center;
  background-color: rgba(244, 246, 249, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
}
</style>
