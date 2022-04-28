<template>
  <div class="calc__form-wrapper secform">
    <h1 class="form__title">Resources Calculator</h1>
    <form
      style="margin-top: 1.7rem"
      v-on:submit.prevent="submitData"
      class="calc__form"
    >
      <div class="resource_section">
        <label for="CoveredWeekHours">Employee Annual Vacation Days : </label>
        <div>
          <input
            type="number"
            name="annualVacation"
            v-model="annualVacation"
            autocomplete="off"
            required
          />
        </div>

        <label for="CoveredWeekHours">National Vacations Days:</label>
        <div>
          <input
            type="number"
            name="nationVacations"
            v-model="nationVacations"
            autocomplete="off"
            required
          />
        </div>
      </div>
      <span v-show="annualVacation && nationVacations"
        >Total Business Days =365-({{ annualVacation }}+{{
          nationVacations
        }}+104 ( 2days vacation per week )) ={{ businessDays }}</span
      >
      <div class="resource_section">
        <label for="CoveredWeekHours">Employee Hours per Day :</label>
        <div>
          <input
            type="number"
            name="weekHours"
            v-model="dayHours"
            autocomplete="off"
            required
          />
        </div>

        <label for="CoveredWeekHours">Employee Days per Week :</label>
        <div>
          <input
            type="number"
            name="workingDaysNumber"
            v-model="workingDaysNumber"
            autocomplete="off"
            required
          />
        </div>
      </div>
      <span
        v-if="
          workingDaysNumber && dayHours && annualVacation && nationVacations
        "
        >Total Working Hours per Year = Employee Working Hours per Day x
        Business Days ={{ dayHours }} X {{ businessDays }}=
        {{ employeeHours }}
      </span>
      <div class="resource_section">
        <label for="CoveredWeekHours">Company Working Hours per Day :</label>
        <div>
          <input
            type="number"
            name="CoveredWeekHours"
            v-model="CoveredWeekHours"
            autocomplete="off"
            required
          />
        </div>

        <label for="CoveredWeekHours">Company Working Hours per Day :</label>
        <div>
          <input
            type="number"
            name="coveredWeekDays"
            v-model="coveredWeekDays"
            autocomplete="off"
            required
          />
        </div>
      </div>
      <span v-if="coveredWeekDays && CoveredWeekHours"
        >Company Working Hours per Year = Company Working Hours per Day x Number
        Of days per Week x 52week ={{ CoveredWeekHours }} X
        {{ coveredWeekDays }} x 52=
        {{ coveredHours }}
      </span>
      <div class="submit-btn__wrapper full">
        <button class="submit-btn btn-calc" @submit="submitData">
          Calculate
        </button>
      </div>
    </form>
    <p class="result" v-if="l1">
      <span
        >L1 = {{ coveredHours }} / {{ employeeHours }} =
        {{ l1.toFixed(2) }}</span
      >
    </p>
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
      l1: "",
      l2: "",
      l3: "",
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
    businessDays() {
      return 365 - 104 - this.annualVacation - this.nationVacations;
    },
    employeeHours() {
      return this.businessDays * this.dayHours;
    },
    coveredHours() {
      return this.coveredWeekDays * this.CoveredWeekHours * 52;
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
      this.l1 =
        (this.coveredWeekDays * this.CoveredWeekHours * 52) /
        (this.dayHours *
          (this.workingDaysNumber * 52 -
            this.annualVacation -
            this.nationVacations));
      this.l2 =
        (4160 * 1.25) /
          (this.dayHours *
            (this.workingDaysNumber * 52 -
              this.annualVacation -
              this.nationVacations)) +
        1;
    },
  },
};
</script>
<style scoped>
.calc__form-wrapper {
  border-radius: 1rem;
  width: 100%;
  margin: 7rem auto;
}
.calc__form-wrapper .form__title {
  color: #fff;
}
label {
  color: #fff;
  margin: 0px 15px;
}
.btn-calc {
  width: 250px;
}
.light-mode .calc__form-wrapper .form__title {
  color: #000;
}
.light-mode label{
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
  width: 50px;
}
p {
  text-align: center;
}
.calc__form .form__control input::placeholder {
  font-size: 0.9rem;
  border-radius: 15px;
}
.calc__form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.calc__form .form__control:last-of-type {
  grid-column: unset;
}
.light-mode .calc__form .form__control {
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.3);
}
.light-mode .result {
  color: #000;
}
span {
  color: #fff;
  padding-bottom: 50px;
  text-align: center;
  border-bottom: 1px solid #000;
}
input {
  color: #000;
  width: 40px;
  height: 30px;
  border: 1px solid #fff;
  border-radius: 8px;

  text-align: center;
}
.resource_section {
  display: flex;
  padding: 20px 0px;
  justify-content: center;
}
@media screen and (max-width: 800px) {
  .calc__form-wrapper {
    width: 98%;
  }
  .calc__form {
    grid-template-columns: 1fr;
  }
}
</style>
