<template>
  <nav>
    <article class="wiki__nav">
      <i class="fas fa-bars wiki__links-icon" @click="displayLinksMenu"></i>
      <Logo class="nav-logo" />
      <button class="theme-btn" @click="toggleTheme">
        <i class="fas fa-moon"></i>
      </button>
      <ul
        @click="displayLinksMenu"
        :class="showLinksMenu ? 'wiki__links show' : 'wiki__links'"
      >
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li>
          <nuxt-link to="/staff">Staff</nuxt-link>
        </li>
        <li v-if="getRole == 'Employee' || getRole == 'admin'">
          <nuxt-link
            to="/users"
            v-if="getRole == 'Employee' || getRole == 'admin'"
            >Users</nuxt-link
          >
        </li>
        <li v-if="getRole == 'Employee' || getRole == 'admin'">
          <nuxt-link to="/wikiPage"> WIKI</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/serviceCatalog"> Service Catalog</nuxt-link>
        </li>
        <li v-if="getRole == 'Employee'">
          <nuxt-link to="/soc">Soc</nuxt-link>
        </li>
        <li v-if="getRole == 'Employee'"><a href="/account">Account</a></li>
        <li v-if="getRole == ''">
          <button
            id="registerBtn"
            class="authButton"
            @click="status = 'register'"
          >
            Register
          </button>
        </li>
        <li v-if="getRole == ''">
          <button @click="status = 'login'" id="loginBtn" class="authButton">
            Log In
          </button>
        </li>
        <li v-if="getRole != ''">
          <button id="logoutBtn" @click="logOut" class="authButton">
            Log Out
          </button>
        </li>
      </ul>
      <modal v-on:close="changeStatus" v-if="statusChosen != ''">
        <login-form v-if="statusChosen == 'login'" />
        <register v-if="statusChosen == 'register'" />
      </modal>
    </article>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import modal from "@/components/modal.vue";
import loginForm from "@/components/loginForm.vue";
import register from "@/components/register.vue";
export default {
  data() {
    return {
      status: "",
      showLinksMenuStatus: false,
      showLinksMenu: "",
    };
  },

  computed: {
    ...mapGetters(["getRole"]),
    statusChosen: function () {
      return this.status;
    },
  },
  watch: {
    showLinksMenuStatus(newValue, oldValue) {
      this.showLinksMenu = newValue;
    },
  },
  components: {
    modal,
    loginForm,
    register,
  },
  methods: {
    toggleTheme() {
      // 'fas fa-moon'
      document.querySelector(".body").classList.toggle("light-mode");
      if (document.querySelector(".body").className.includes("light-mode")) {
        document.querySelector(".theme-btn i").className = "fas fa-sun";
      } else {
        document.querySelector(".theme-btn i").className = "fas fa-moon";
      }
    },
    changeStatus(choice = "") {
      console.log("changes");
      this.status = choice;
    },

    displayLinksMenu() {
      this.showLinksMenu = !this.showLinksMenu;
    },
    logOut() {
      this.$store.commit("logOut");
      this.$store.commit("changeRole");
    },
  },
};
</script>
<style>
img {
  width: 100px;
  height: 100%;
}

.authButton {
  color: white;
  background: inherit;
  border: 0px;
  cursor: pointer;
}

.theme-btn {
  position: absolute;
  top: 4.2rem;
  right: 0.3rem;
  color: #fff;
  z-index: 100;
}
</style>
