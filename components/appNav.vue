<template>
  <nav>
    <article class="wiki__nav">
      <i class="fas fa-bars wiki__links-icon" @click="displayLinksMenu"></i>
      <Logo class="nav-logo" />
      <ul
        @click="displayLinksMenu"
        :class="showLinksMenu ? 'wiki__links show' : 'wiki__links'"
      >
        <li @click="() => changeBg(true)"><nuxt-link to="/" >Home</nuxt-link></li>
        <li @click="() => changeBg(false)">
          <nuxt-link to="/staff">Staff</nuxt-link>
        </li>

        <li
          v-if="
            getRole == 'Employee' || getRole == 'admin' || getRole == 'visitor'
          "
          @click="() => changeBg(false)"
        >
          <nuxt-link to="/wikiPage" >WIKI</nuxt-link>
        </li>
        <li @click="() => changeBg(false)">
          <nuxt-link to="/serviceCatalog" >Service Catalog</nuxt-link>
        </li>
        <li v-if="getRole == '' || getRole == ' '">
          <button
            id="registerBtn"
            class="authButton"
            @click="status = 'register'"
          >
            Register
          </button>
        </li>
        <li v-if="getRole == '' || getRole == ' '">
          <button @click="status = 'login'" id="loginBtn" class="authButton">
            Log In
          </button>
        </li>
        <li v-if="getRole != '' && getRole != ' '">
          <button id="logoutBtn" @click="logOut" class="authButton">
            Log Out
          </button>
        </li>
        <!-- <li>
          <button class="theme-btn" @click="toggleTheme">
            <i class="fas fa-moon"></i>
          </button>
        </li> -->
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
        //document.body.style.background ='#fff';
      } else {
        document.querySelector(".theme-btn i").className = "fas fa-moon";
      }
    },
    changeStatus(choice = "") {
      console.log("changes");
      this.status = choice;
    },
changeBg(home){
  const appContainer = document.querySelector('.body')
  if(home) appContainer.className = 'body home';
  else appContainer.className = 'body'
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
</style>
