<template>
  <div class="shift__form-wrapper">
    <h3 class="form__title" style="padding: 1rem 0">Add Staff Member</h3>
    <form class="long__form" v-on:submit.prevent="submitData">
      <div class="form__control select">
        <select required name="parentLevel" v-model="title">
          <option value="SOC Manager">SOC Manager</option>
          <option value="L3 Analyst">L3 Analyst</option>
          <option value="L2 Analyst">L2 Analyst</option>
          <option value="L1 Analyst">L1 Analyst</option>
        </select>
        <span class="form__control-label">Title</span>
      </div>
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
      <!-- <div class="form__control">
        <input type="text" name="title" required v-model="title" />
        <span class="form__control-label">Title</span>
      </div> -->
      <div class="form__control">
        <input type="email" name="email" required v-model="email" />
        <span class="form__control-label">Email</span>
      </div>
      <div class="form__control">
        <input type="number" name="mobile" required v-model="mobile" />
        <span class="form__control-label">Mobile</span>
      </div>
      <div class="form__control full">
        <input type="number" name="phone" required v-model="phone" />
        <span class="form__control-label">Phone</span>
      </div>
      <div class="submit__btn-wrapper full">
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
      </div>
    </form>
    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      title: "",
      email: "",
      mobile: "",
      phone: "",
      message: "",
      addingChild: false,
      spinnerLoading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      let obj = {};
      // if (this.getStaff[0] && this.level == "top") this.type = 1;
      // if (this.getStaff[1] && this.getStaff[1].parent && this.level == "left")
      //   this.type = 1;
      // if (this.getStaff[2] && this.getStaff[2].parent && this.level == "right")
      //   this.type = 1;
      // console.log(this.type);
      // console.log(this.getStaff);

      return {
        Name: this.name,
        Title: this.title,
        Email: this.email,
        Mobile: this.mobile,
        Phone: this.phone,
      };
    },
    ...mapGetters(["getStaff"]),
  },
  methods: {
    async submitData() {
      let obj = this.dataObj;
      console.log(obj);
      this.spinnerLoading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "staff",
        body: obj,
      });
      console.log(response);
      this.spinnerLoading = false;
      if (response) {
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      } else {
        this.spinnerLoading = false;
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
