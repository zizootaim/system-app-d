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
    if (!localStorage.getItem("role")) {
      localStorage.setItem("name", "");
      localStorage.setItem("role", "");
    }
    this.$store.commit("changeRole");
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
.light-mode .mainContent {
  background: #eee;
}
</style>
