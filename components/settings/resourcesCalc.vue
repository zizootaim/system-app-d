<template>
  <div class="advisory__form-wrapper">
    <h1 class="form__title">{{ formTitle }}</h1>

    <form
      class="advisory__form"
      style="margin-top: 1.7rem"
      v-on:submit.prevent="submitData"
    >
      <div class="form__control">
        <input
          type="number"
          name="weekHours"
          v-model="weekHours"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Working Hours per week </span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="annualVacation"
          v-model="annualVacation"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Annual Vacation days</span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="nationVacations"
          v-model="nationVacations"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Country All Vacations</span>
      </div>

      <button class="submit-btn" type="submit">
        Submit <BaseSpinner v-if="loading" />
        <svg
          v-if="submitIcon"
          class="svgIcon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <p>Success</p>
          <path
            d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z"
            fill="#43A047"
          />
        </svg>
      </button>
    </form>
    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";

export default {
  components: {
    baseSpinner,
  },

  name: "advisoryForm",
  data() {
    return {
      weekHours: "",
      annualVacation: "",
      nationVacations: "",
      loading: false,
      submitIcon: false,
    };
  },
};
</script>
<style scoped>
.advisory__form-wrapper {
  width: 85%;
}
.advisory__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
input[type="date"] {
  color: #fff;
}

@media screen and (max-width: 800px) {
  .advisory__form {
    grid-template-columns: 1fr;
  }
}
</style>
