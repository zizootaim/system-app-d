<template>
  <div class="shift__form-wrapper">
    <form v-on:submit.prevent="submitData">
      <h1 class="form__title">Add Shift</h1>
      <div class="form__control">
        <select id="month" name="month" v-model="month">
          <option value="" selected disabled hidden>Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div class="form__control">
        <select v-model="employee">
          <option disabled hidden>Shift</option>
          <option value="" selected disabled hidden>Employee</option>
          <option v-for="user in users" :value="user.name" :key="user.name">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="day"
          required
          v-model="day"
          autocomplete="off"
        />
        <span class="form__control-label">Day</span>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="shifts"
          required
          v-model="shifts"
          autocomplete="off"
        />
        <span class="form__control-label">Shifts</span>
      </div>

      <div class="submit__btn-wrapper">
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
      <div>
        <p v-if="message" class="errMessage">{{ message }}</p>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import shiftsVue from "../shifts.vue";

export default {
  data() {
    return {
      employee: "",
      shifts: "",
      month: "",
      day: 12,
      message: "",
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getShifts"]),
    users: function () {
      return this.getUsers.filter((user) => user.role != "visitor");
    },
    dataObj: () => {
      return { name: this.employee, month: this.month, shifts: this.shifts };
    },
  },

  methods: {
    async submitData() {
      this.message = "";
      let updatedShift;
      let found = false;
      if (this.getShifts[this.month]) {
        for (let item of this.getShifts[this.month]) {
          if (item.name == this.employee) {
            updatedShift = item.shifts.toString();
            updatedShift = updatedShift.split("");
            updatedShift.splice(this.day - 1, 1, this.shifts);
            updatedShift = updatedShift.join("");
            console.log(updatedShift);
            found = true;
          }
        }
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("name", this.employee);
      urlencoded.append("month", this.month);
      urlencoded.append("shifts", updatedShift);

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      //   for (let i of this.$store.state.shifts[this.month]) {
      //     console.log(i.id);
      //   }
      console.log(this.$store.state.months[this.month]);
      if (
        found &&
        updatedShift.length == this.$store.state.months[this.month]
      ) {
        this.loading = true;
        fetch("https://beapis.herokuapp.com/api/Shifts", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.loading = false;
            console.log(result.message);
            this.submitIcon = true;
            this.$store.dispatch("getData", "Shifts");
            setTimeout(() => {
              this.submitIcon = false;
              document.querySelector(".close").click();
            }, 1000);
          })
          .catch((error) => {
            console.log("error", error);
            this.loading = false;
            this.message = "Some thing Went Wrong";
          });
      } else {
        this.message = "Please Add Correct Shift ";
      }
    },
  },
  mounted() {
    this.$store.dispatch("getData", "shifts");
    this.$store.dispatch("getData", "users");
  },
};
</script>
<style>
.shift__form-wrapper {
  margin-top: 1rem;
}
.submit__btn-wrapper {
  display: grid;
  place-items: center;
}
.errMessage {
  text-align: center;
}
</style>
