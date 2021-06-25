<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>
          4<span
            ><img
              style="width: 100%; height: 100%"
              :src="require('@/assets/images/cry-emoji.png')"
              alt="" /></span
          >4
        </h1>
      </div>
      <h2>Oops! Page Not Be Found</h2>
      <p>
        Sorry but the page you are looking for does not exist, have been
        removed. name changed or is temporarily unavailable
      </p>
      <router-link to="/">Back to homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/404";
</style>