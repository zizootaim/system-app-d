<template>
  <div>
    <AppNav />
    <div class="mainContent">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import AppNav from "@/components/appNav.vue";

export default {
  components: {
    AppNav,
  },
};
</script>
<style>
.mainContent {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  );
  min-height: 89vh;
}
</style>
