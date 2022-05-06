<template>
  <div class="calc__form-wrapper secform">
    <h1 class="form__title">Resources Calculator</h1>
    <form
      style="margin-top: 1.7rem"
      v-on:submit.prevent="submitData"
      class="calc__form"
    >
      <div class="resource_section">
        <div>
          <label for="CoveredWeekHours">Employee Annual Vacation Days: </label>
          <input
            type="number"
            name="annualVacation"
            v-model="annualVacation"
            autocomplete="off"
            required
            min="0"
          />
        </div>

        <div>
          <label for="CoveredWeekHours">National Vacations Days:</label>
          <input
            type="number"
            name="nationVacations"
            v-model="nationVacations"
            autocomplete="off"
            required
            min="0"
          />
        </div>
      </div>
      <span class="spanBody" v-show="annualVacation && nationVacations"
        >Total Business Days =365-({{ annualVacation }}+{{
          nationVacations
        }}+104 ( 2days vacation per week )) ={{ businessDays }}</span
      >
      <div class="resource_section">
        <div>
          <label for="CoveredWeekHours">Employee Hours per Day:</label>
          <input
            type="number"
            name="weekHours"
            v-model="dayHours"
            autocomplete="off"
            required
            min="0"
          />
        </div>

        <div>
          <label for="CoveredWeekHours">Employee Days per Week:</label>
          <input
            type="number"
            name="workingDaysNumber"
            v-model="workingDaysNumber"
            autocomplete="off"
            required
            min="0"
          />
        </div>
      </div>
      <span
        class="spanBody"
        v-if="
          workingDaysNumber && dayHours && annualVacation && nationVacations
        "
        >Total Working Hours per Year = Employee Working Hours per Day x
        Business Days ={{ dayHours }} X {{ businessDays }}=
        {{ employeeHours }}
      </span>
      <div class="resource_section">
        <div>
          <label for="CoveredWeekHours">SOC Operating Mode Hours:</label>
          <input
            type="number"
            name="CoveredWeekHours"
            v-model="CoveredWeekHours"
            autocomplete="off"
            required
            min="0"
          />
        </div>

        <div>
          <label for="CoveredWeekHours">SOC Operating Mode Days:</label>
          <input
            type="number"
            name="coveredWeekDays"
            v-model="coveredWeekDays"
            autocomplete="off"
            required
            min="0"
          />
        </div>
      </div>
      <span class="spanBody" v-if="coveredWeekDays && CoveredWeekHours"
        >Company Working Hours per Year = Company Working Hours per Day x Number
        Of days per Week x 52week = {{ CoveredWeekHours }} X
        {{ coveredWeekDays }} x 52 =
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
      <br />
      <span class="resultRecord"> L1 = {{ Math.ceil(l1) }} </span>
    </p>
    <p class="result" v-if="l1">
      <span> To Have 2 resources per shift</span>
      <br />
      <span class="resultRecord"> L1 = {{ Math.ceil(l1) + 1 }} </span>
    </p>
    <br />
    <p class="result" v-if="l1">
      <span
        >L2 Analyst Usually covers 16x5 and be in call during vacations.
      </span>
    </p>

    <p class="result" v-if="l1">
      <span
        >Number Of Hours Per Year = 52 weeks x 5 days x 16H = 4160 hours
      </span>
    </p>
    <br />
    <p class="result" v-if="l1">
      <span
        >Number Of Resources for L2 = 4160 /{{ employeeHours }} =
        {{ (4160 / employeeHours).toFixed(2) }}
      </span>
    </p>
    <p class="result" v-if="l1">
      <span
        >For oncall Rotation,pay hours for oncall = 1/2 pay hours for onsite
      </span>
    </p>
    <br />
    <p class="result" v-if="l1">
      <span
        >So the total FTE for L2 = {{ (4160 / employeeHours).toFixed(2) }}+{{
          (4160 / employeeHours / 4).toFixed(2)
        }}
        = {{ ((4160 * 1.25) / employeeHours).toFixed(2) }} .
      </span>
      <br />
      <span class="resultRecord">
        L2 = {{ Math.ceil((4160 * 1.25) / employeeHours) }}
      </span>
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
.resultRecord {
  border-bottom: 2px solid blue;
}
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
.light-mode label {
  color: #000;
}
.result .spanBody {
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
.spanBody {
  color: #fff;
  padding-bottom: 50px;
  text-align: center;
  border-bottom: 1px solid #000;
}
.light-mode .spanBody {
  color: #000;
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
  padding: 20px 0px;
  width: 60%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.resource_section div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 920px) {
  .calc__form-wrapper {
    width: 98%;
  }
  .resource_section {
    grid-template-columns: 1fr;
    width: 100%;
  }
}
</style>
