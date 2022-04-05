<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Edit Member</h1>
    <form class="long__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="id"
          placeholder="Id "
          v-model="id"
          autocomplete="off"
        />
      </div>
      <div class="form__control">
        <input
          type="Parent"
          name="parentName"
          placeholder="Parent Name"
          v-model="parentName"
          autocomplete="off"
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="name"
          placeholder="Name"
          v-model="name"
          autocomplete="off"
        />
      </div>

      <div class="form__control">
        <input type="text" name="title" placeholder="Title" v-model="title" />
      </div>
      <div class="form__control">
        <input type="text" name="email" placeholder="Email" v-model="email" />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          v-model="mobile"
        />
      </div>
      <div class="form__control">
        <input type="text" name="phone" placeholder="Phone" v-model="phone" />
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
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      parentName: "",
      name: "",
      title: "",
      email: "",
      mobile: "",
      phone: "",
      spinnerLoading: false,
      submitIcon: false,
    };
  },

  computed: {
    dataObj() {
      return {
        id: this.id,
        ParentName: this.parentName,
        Name: this.name,
        Title: this.title,
        Email: this.email,
        Mobile: this.mobile,
        Phone: this.phone,
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
      if (response) {
        this.spinnerLoading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      }
    },
  },
};
</script>
<style></style>
