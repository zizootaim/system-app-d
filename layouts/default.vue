<template>
  <div class="body home">
    <AppNav />
    <div class="mainContent">
      <Nuxt />
    </div>
    <footer>Powered by Group-IB <logo /></footer>
  </div>
</template>
<script>
import AppNav from "@/components/appNav.vue";
import { mapGetters } from "vuex";
import Logo from '../components/Logo.vue'

export default {
  computed: {
    ...mapGetters(["getHomeData"]),
  },

  data: () => {
    return {
      url: "",
    };
  },
  components: {
    AppNav,
    Logo
  },
  mounted() {
    if (!localStorage.getItem("role")) {
      localStorage.setItem("name", "");
      localStorage.setItem("role", "");
    }
    this.$store.commit("changeRole");
    this.setBg();
    this.$store.dispatch("getData", "home");
    // setTimeout(() => {
    //   document.querySelector(
    //     ".home .body"
    //   ).style.background = `url('${this.getHomeData[0].background_url}')`;
    // }, 2000);
  },
  watch: {
    $route: function () {
      this.setBg();
    },
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
  min-height: 80vh;
}
.body {
  min-height: 100vh;
}
.light-mode .mainContent {
  background: #eee;
}
footer{
  color: #fff;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
footer .logo{
  margin-left: 2rem;
}
.light-mode footer {
  color: #000;
}
</style>
