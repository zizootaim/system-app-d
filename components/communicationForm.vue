<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Communication</h1>
    <form class="shift__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="team"
          v-model="team"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Team</span>
      </div>

      <div class="form__control">
        <input
          type="text"
          name="action"
          v-model="action"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Action</span>
      </div>
      <div class="form__control">
        <input
          type="email"
          name="primaryEmail"
          v-model="primaryEmail"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Primary Email</span>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="primaryName"
          v-model="primaryName"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Primary Name</span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="primaryPhone"
          v-model="primaryPhone"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Primary Phone</span>
      </div>
      <div class="form__control">
        <input
          type="email"
          name="secondaryEmail"
          v-model="secondaryEmail"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Secondary Email</span>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="aecondaryName"
          v-model="secondaryName"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Secondary Name</span>
      </div>

      <div class="form__control">
        <input
          type="number"
          name="secondaryPhone"
          v-model="secondaryPhone"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Secondary Phone</span>
      </div>
      <div class="submit-btn__wrapper">
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
          <BaseSpinner v-if="loading" />
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      team: "",
      action: "",
      primaryEmail: "",
      primaryPhone: "",
      primaryName: "",
      secondaryEmail: "",
      secondaryPhone: "",
      secondaryName: "",
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        Team: this.team,
        Action: this.action,
        PrimaryEmail: this.primaryEmail,
        PrimaryName: this.primaryName,
        PrimaryPhone: this.primaryPhone,
        SecondaryEmail: this.secondaryEmail,
        SecondaryName: this.secondaryName,
        SecondaryPhone: this.secondaryPhone,
      };
    },
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.loading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "Communication",
        body: this.dataObj,
      });
      console.log(response);
      if (response) {
        this.loading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      }
    },
  },

  name: "healthCheckForm",
};
</script>
<style></style>
