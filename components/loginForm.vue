<template>
  <form class="form-inline" id="loginForm" v-on:submit.prevent="doLogin">
    <div class="form__info">
      <i class="fas fa-user-check"></i>
      <div class="form__text">
        <h2>LOGIN</h2>
        <p>Login to Continue to Our Website</p>
      </div>
    </div>
    <div class="form__control">
      <i class="far fa-envelope"></i>
      <input
        v-model="emailLogin"
        type="email"
        id="email"
      
        name="email"
        autocomplete="off"
        required
      />
        <span class="form__control-label">Email</span>

    </div>
    <div class="form__control">
      <i class="fas fa-lock"></i>
      <input
        v-model="passwordLogin"
        type="password"
        id="pwd"

        name="pswd"
        autocomplete="off"
        required
      />
              <span class="form__control-label">Password</span>

    </div>

    <button class="submit-btn" type="submit">
      Login <BaseSpinner v-if="loading" />
    </button>
    <p id="errMessage">{{ getMessage }}</p>
  </form>
</template>

<script>
import { mapState } from "vuex";
import baseSpinner from "@/components/baseSpinner.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters(["getMessage"]),
  },
  watch: {
    baseSpinnerClass(newValue, oldValue) {
      this.baseSpinnerClass = newValue;
    },
  },
  methods: {
    async doLogin() {
      this.loading = true;
      this.$store.commit("errMessage", "");
      let response = await this.$store.dispatch("login", {
        email: this.emailLogin,
        password: this.passwordLogin,
      });

      this.loading = false;
    },
  },
};
</script>

<style>
#errMessage {
  color: red;
  padding: 10px;
}
</style>
