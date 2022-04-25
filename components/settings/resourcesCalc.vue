<template>
  <div class="calc__form-wrapper secform">
    <h1 class="form__title">Resources Calculator</h1>

    <form
      style="margin-top: 1.7rem"
      v-on:submit.prevent="submitData"
      class="calc__form"
    >
      <div class="form__control">
        <input
          type="number"
          name="CoveredWeekHours"
          v-model="CoveredWeekHours"
          autocomplete="off"
          placeholder="Number of Covered Working Hours per Day"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="number"
          name="coveredWeekDays"
          v-model="coveredWeekDays"
          autocomplete="off"
          placeholder="Number of Covered Week Days"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="number"
          name="weekHours"
          v-model="dayHours"
          autocomplete="off"
          required
          placeholder="Employee Hours per Day"
        />
      </div>
      <div class="form__control">
        <input
          type="number"
          name="workingDaysNumber"
          v-model="workingDaysNumber"
          autocomplete="off"
          placeholder="Employee Days per Week"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="number"
          name="annualVacation"
          v-model="annualVacation"
          autocomplete="off"
          placeholder="Annual Vacation days"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="number"
          name="nationVacations"
          v-model="nationVacations"
          autocomplete="off"
          placeholder="Country All Vacations"
          required
        />
      </div>
    </form>
    <p class="result" v-if="message"><span>Result:</span> {{ message }}</p>
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
      dayHours: "",
      workingDaysNumber: "",
      annualVacation: "",
      CoveredWeekHours: "",
      coveredWeekDays: "",
      nationVacations: "",
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    message() {
      return (
        (this.coveredWeekDays * this.CoveredWeekHours * 52) /
        (this.dayHours *
          (this.workingDaysNumber * 52 -
            this.annualVacation -
            this.nationVacations))
      );
    },
  },
  methods: {
    submitData() {
      console.table(
        this.dayHours,
        this.workingDaysNumber,
        this.annualVacation,
        this.nationVacations
      );
      console.log(
        (365 * 24) /
          (this.dayHours *
            (this.workingDaysNumber * 52 -
              this.annualVacation -
              this.nationVacations))
      );
      this.message =
        (365 * 24) /
        (this.dayHours *
          (this.workingDaysNumber * 52 -
            this.annualVacation -
            this.nationVacations));
    },
  },
};
</script>
<style scoped>
.calc__form-wrapper {
  border-radius: 1rem;
  width: 80%;
  margin: 7rem auto;
}
.calc__form-wrapper .form__title {
  color: #fff;
}
.light-mode .calc__form-wrapper .form__title{
  color: #000;
}
.result span {
  font-weight: 600;
  padding-left: 1rem;
}
.calc__form .form__control {
  background: #fff;
  border: 0;
  border-radius: 1rem;
}
.calc__form .form__control input::placeholder {
  font-size: 0.9rem;
}
.calc__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  gap: 1rem;
  margin-top: 1.5rem;
}
.calc__form .form__control:last-of-type {
  grid-column: unset;
}
.light-mode .calc__form .form__control{
  box-shadow: 0 1px 5px 0px rgba(0,0,0,.3);
} 
.light-mode .result{
  color: #000;
}
input[type="date"] {
  color: #fff;
}

@media screen and (max-width: 800px) {
  .calc__form-wrapper{
    width: 98%;
  }
  .calc__form {
    grid-template-columns: 1fr;
  }
}
</style>
