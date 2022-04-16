<template>
  <div class="body home">
    <AppNav />
    <div class="mainContent">
      <Nuxt />
    </div>
      <footer>Powered by Group-IB</footer>
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
    this.setBg();
  },
  watch: {
    $route: function () {
      this.setBg();
    },
  },
  methods: {
    setBg() {
      this.url = window.location.pathname;
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
  min-height: 87vh;
}
.body{
  min-height: 100vh;
}
.light-mode .mainContent {
  background: #eee;
}
footer{
  text-align: center;
  color: #fff;

}
.light-mode footer{
  color: #000;
}
</style>
