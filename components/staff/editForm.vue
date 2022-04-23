<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Edit {{ editingUser.Name }}</h1>
    <form class="long__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="name"
          required
          v-model="name"
          autocomplete="off"
        />
        <span class="form__control-label">Name</span>
      </div>

      <div class="form__control">
        <input type="text" name="title" required v-model="title" />
        <span class="form__control-label">Title</span>
      </div>
      <div class="form__control">
        <input type="text" name="email" required v-model="email" />
        <span class="form__control-label">Email</span>
      </div>
      <div class="form__control">
        <input type="text" name="mobile" required v-model="mobile" />
        <span class="form__control-label">Mobile</span>
      </div>
      <div class="form__control">
        <input type="text" name="phone" required v-model="phone" />
        <span class="form__control-label">Phone</span>
      </div>

      <button class="submit-btn" type="submit">
        Submit
        <svg
          v-if="submitIcon"
          class="svgIcon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z"
            fill="#43A047"
          />
        </svg>
        <BaseSpinner v-if="spinnerLoading" />
      </button>
      <p class="errMessage" v-if="message">{{ message }}</p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      title: "",
      email: "",
      mobile: "",
      phone: "",
      message: "",
      child: 1,
      spinnerLoading: false,
      submitIcon: false,
    };
  },
  props: {
    editingUser: {},
  },
  mounted() {
    this.id = this.editingUser.id;
    this.name = this.editingUser.Name;
    this.title = this.editingUser.Title;
    this.email = this.editingUser.Email;
    this.phone = this.editingUser.Phone;
    this.mobile = this.editingUser.Mobile;
    if (this.editingUser.child == false) this.child = 0;
  },
  computed: {
    dataObj() {
      return {
        ...this.editingUser,
        id: this.editingUser.id,
        ParentName: this.editingUser.ParentName,
        Name: this.name,
        Title: this.title,
        Email: this.email,
        Mobile: this.mobile,
        Phone: this.phone,
        child: this.child,
      };
    },
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.spinnerLoading = true;
      let response = await this.$store.dispatch("editStaff", {
        apiName: "staff",
        body: this.dataObj,
      });
      console.log(response);
      this.spinnerLoading = false;
      if (response == true) {
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 2000);
      } else {
        this.message = "Something Went Wrong";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
  },
};
</script>
<style></style>
