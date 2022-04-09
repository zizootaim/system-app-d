<template>
  <div class="shift__form-wrapper">
    <h3 class="form__title" style="padding: 1rem 0">Add Staff Member</h3>
    <form class="long__form" v-on:submit.prevent="submitData">
    <div class="form__control select" >
      <select required name="type" v-model="type">
        <option value="parent">Parent</option>
        <option value="child">Child</option>
      </select>
      <span class="form__control-label">Member Type</span>
    </div>
    <div class="form__control select">
      <select required name="parentLevel" v-model="level">
        <option value="1">Top</option>
        <option value="2-1">Right</option>
        <option value="2-2">Left</option>
      </select>
      <span class="form__control-label">Parent Position</span>
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
      <div class="form__control full">
        <input type="text" name="phone" required v-model="phone" />
        <span class="form__control-label">Phone</span>
      </div>
      <div class="submit__btn-wrapper full">
        <button class="submit-btn" @click="() => submitData()">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      level: "",
      name: "",
      title: "",
      email: "",
      mobile: "",
      phone: "",
      addingChild: false,
      spinnerLoading: false,
    };
  },
  computed: {
    dataObj() {
      let ParentName = "",
        child = 0;
      let obj = {};
      if (this.level == "1") ParentName = "top";
      if (this.level == "2-1") ParentName = "right";
      if (this.level == "2-2") ParentName = "left";

      if (this.type == "child") child = 1;

      obj = {
        ParentName,
        Name: this.name,
        Title: this.title,
        Email: this.email,
        Mobile: this.mobile,
        Phone: this.phone,
        child,
      };

      return obj;
    },
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
      if (response) {
        this.spinnerLoading = false;

        setTimeout(() => {
          document.querySelector(".close").click();
        }, 1000);
      }
    },
  },
};
</script>
<style></style>
