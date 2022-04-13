<template>
  <div class="body home">
    <AppNav />
    <div class="mainContent">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import AppNav from "@/components/appNav.vue";

export default {
  data: () => {
    return {
      url: "",
    };
  },
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
  watch: {
    $route: function () {
      this.setBg();
    },
  },
  mounted() {
    this.setBg();
  },
  methods: {
    setBg() {
      this.url = window.location.pathname;
      console.log(this.url);
      const appContainer = document.querySelector(".body");
      if (this.url == "/") {
        appContainer.className = "body home";
      } else appContainer.className = "body";
    },
  },
};
</script>
<style>
.mainContent {
  min-height: 91vh;
}
.light-mode .mainContent {
  background: #eee;
}
</style>
