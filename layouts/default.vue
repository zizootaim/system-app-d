<template>
  <div class="body home">
    <AppNav />
    <div class="mainContent">
      <Nuxt />
    </div>
    <footer>Powered by <logo :footer="true" /></footer>
  </div>
</template>
<script>
import AppNav from "@/components/appNav.vue";
import { mapGetters } from "vuex";
import Logo from "../components/Logo.vue";

export default {
  computed: {
    ...mapGetters(["getHomeData", "getTheme"]),
  },

  data: () => {
    return {
      url: "",
      theme: "",
    };
  },
  components: {
    AppNav,
    Logo,
  },
  beforeCreate() {
    this.$store.dispatch("getData", "home");
  },
  mounted() {
    if (!localStorage.getItem("role")) {
      localStorage.setItem("name", "");
      localStorage.setItem("permission", "");
      localStorage.setItem("role", "");
    }
    this.$store.commit("changeRole");
    this.$store.dispatch("getData", "serviceCatalog");
    this.setBg();
  },
  watch: {
    getHomeData: function () {
      this.setBg();
    },
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
        if (this.getHomeData[0].background_url) {
          appContainer.style = `background: url('${this.getHomeData[0].background_url}');background-repeat: no-repeat; background-size: 100% 100%;background-position: center;`;
        }
      } else {
        const theme = localStorage.getItem("theme");
        appContainer.style = "";
        appContainer.className =
          "body sec" + ` ${theme == "light" ? "light-mode" : ""}`;
        if (theme == "light") {
          document.querySelector(".theme-btn i").className = "fas fa-moon";
        } else {
          document.querySelector(".theme-btn i").className = "fas fa-sun";
        }
      }
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
footer {
  color: #fff;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
footer .logo {
  margin-left: 2rem;
}
.light-mode footer {
  color: #000;
}
</style>
