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
      <input type="text" v-model="name" required placeholder="Name" />
    </div>
    <div class="form__control">
      <i class="fas fa-envelope"></i>
      <input
        v-model="email"
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
      v-model="password"
      type="password"
      id="pwd"
      placeholder="Password"
      name="pswd"
      required
    />
    </div>

    <div class="form__control">
      <i class="fas fa-lock"></i>
      <input
      v-model="confirmPassword"
      type="password"
      id="pwd"
      placeholder="Confirm Password"
      name="pswd"
      required
    />
      </div>
   <div class="form__control">
     <i class="fas fa-phone"></i>
      <input
      v-model="phone"
      type="number"
      id="phone"
      placeholder="Phone Number"
      name="phoneNumber"
      required
    />
   </div>

    <button type="submit" class="submit-btn">Sign Up</button>
    <p>{{ message }}</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      message: "",
    };
  },
  methods: {
    doRegister() {
      if (this.password === this.confirmPassword) {
        this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          phone: this.phone,
        });
      } else {
        this.message = "Please confirm password correctly";
      }
    },
  },
};
</script>

<style scoped></style>
