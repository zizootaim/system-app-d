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
        placeholder="email@info.com"
        name="email"
        required
      />
    </div>
    <div class="form__control">
      <i class="fas fa-lock"></i>
      <input
        v-model="passwordLogin"
        type="password"
        id="pwd"
        placeholder="Password"
        name="pswd"
        required
      />
    </div>
    <a class="forget-link" href="#">Forget Password ?</a>

    <button class="submit-btn" type="submit">Login</button>
    <p>{{ message }}</p>
  </form>
</template>

<script>
import { mapState } from "vuex";
import BaseSpinner from "@/components/baseSpinner.vue";
export default {
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
    };
  },

  computed: {
    ...mapState(["message"]),
  },

  components: {
    BaseSpinner,
  },
  methods: {
    doLogin() {
      console.log(this.passwordLogin);
      this.$store.dispatch("login", {
        email: this.emailLogin,
        password: this.passwordLogin,
      });
    },
  },
};
</script>

<style scoped></style>
