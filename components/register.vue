<template>
  <form class="form-inline" id="registerForm" v-on:submit.prevent="doRegister">
    <div class="form__info">
      <i class="fas fa-user-plus"></i>
      <div class="form__text">
        <h2>SIGN UP</h2>
        <p>Sign up to Continue to Our Website</p>
      </div>
    </div>
    <div class="form__control">
      <i class="fas fa-user"></i>
      <input type="text" v-model="name" required />
      <span class="form__control-label">Name</span>
    </div>
    <div class="form__control">
      <i class="fas fa-envelope"></i>
      <input
        v-model="email"
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
        v-model="password"
        type="password"
        id="pwd"
        name="pswd"
        autocomplete="off"
        required
      />
      <span class="form__control-label">Password</span>
    </div>

    <div class="form__control">
      <i class="fas fa-lock"></i>
      <input
        v-model="confirmPassword"
        type="password"
        id="pwd"
        name="pswd"
        autocomplete="off"
        required
      />
      <span class="form__control-label">Confirm Password</span>
    </div>
    <div class="form__control">
      <i class="fas fa-phone"></i>
      <input
        v-model="phone"
        type="text"
        id="phone"
        name="phoneNumber"
        autocomplete="off"
        required
      />
      <span class="form__control-label">Phone Number</span>
    </div>

    <button type="submit" class="submit-btn">
      Sign Up <BaseSpinner v-if="loading" />
    </button>
    <p id="errMessage">{{ getMessage }}</p>
  </form>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getMessage"]),
  },

  components: {
    baseSpinner,
  },

  methods: {
    async doRegister() {
      if (this.password === this.confirmPassword) {
        this.loading = true;
        this.$store.commit("errMessage", "");
        await this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          phone: this.phone,
        });
        this.loading = false;
      } else {
        this.$store.commit("errMessage", "Please confirm Password Correctly");
      }
    },
  },
};
</script>

<style></style>
