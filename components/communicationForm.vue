<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Communication</h1>
    <form class="shift__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="team"
          placeholder="Team"
          v-model="team"
          autocomplete="off"
          required
        />
      </div>

      <div class="form__control">
        <input
          type="text"
          name="action"
          placeholder="Action"
          v-model="action"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="email"
          name="primaryEmail"
          placeholder="Primary Email"
          v-model="primaryEmail"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="primaryName"
          placeholder="Primary Name"
          v-model="primaryName"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="number"
          name="primaryPhone"
          placeholder="Primary Phone"
          v-model="primaryPhone"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="email"
          name="secondaryEmail"
          placeholder="Secondary Email"
          v-model="secondaryEmail"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="aecondaryName"
          placeholder="Secondary Name"
          v-model="secondaryName"
          autocomplete="off"
          required
        />
      </div>

      <div class="form__control">
        <input
          type="number"
          name="secondaryPhone"
          placeholder="Secondary Phone"
          v-model="secondaryPhone"
          autocomplete="off"
          required
        />
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
