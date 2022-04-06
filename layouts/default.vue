<template>
  <div class="body">
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
  mounted() {
    if (!localStorage.getItem("name")) {
      localStorage.setItem("name", "");
      localStorage.setItem("role", "");
    }
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
  min-height: 91vh;
}
.light-mode .mainContent{
  background: #fff;
}
</style>
