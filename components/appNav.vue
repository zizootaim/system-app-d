<template>
  <div>
    <article class="wiki__nav">
      <i class="fas fa-bars wiki__links-icon" @click="displayLinksMenu"></i>
      <Logo />

      <ul
        @click="displayLinksMenu"
        :class="showLinksMenu ? 'wiki__links show' : 'wiki__links'"
      >
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li>
          <nuxt-link to="/staff">Staff</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/users">Users</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/wikiPage"> WIKI</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/serviceCatalog"> Service Catalog</nuxt-link>
        </li>
        <li v-if="getterRole == 'employee'">
          <nuxt-link to="/soc">Soc</nuxt-link>
        </li>
        <li v-if="getterRole == 'employee'"><a href="/account">Account</a></li>
        <li v-if="getterRole == ' '">
          <button
            id="registerBtn"
            class="authButton"
            @click="status = 'register'"
          >
            Register
          </button>
        </li>
        <li v-if="getterRole == ' '">
          <button @click="status = 'login'" id="loginBtn" class="authButton">
            Log In
          </button>
        </li>
        <li v-if="getterRole != ' '">
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
  </div>
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
    ...mapGetters(["getterRole"]),
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
body {
  margin: 0;
}
img {
  width: 100px;
  height: 100%;
}

nav a {
  transition-property: text-decoration;
  transition-duration: 2s;
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.authButton {
  color: white;
  background: inherit;
  border: 0px;
  cursor: pointer;
}
</style>
