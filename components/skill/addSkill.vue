<template>
  <div class="shift__form-wrapper">
    <form v-on:submit.prevent="submitData">
      <h1 class="form__title">Add Skill</h1>
      <div class="form__control">
        <select required v-model="Category">
          <option value="SOFTSKILL">SOFT SKILL</option>
          <option value="TECHNICALSKILL">TECHNICAL SKILL</option>
        </select>
        <span class="form__control-label">Skill Category</span>
      </div>

      <div class="form__control">
        <input
          type="text"
          name="skillName"
          required
          v-model="Skill"
          autocomplete="off"
        />
        <span class="form__control-label">Skill Name</span>
      </div>

      <div class="form__control">
        <input
          type="number"
          name="skillName"
          required
          v-model="level1"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Beginner Level</span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="skillName"
          required
          v-model="level2"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Senior Level</span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="skillName"
          required
          v-model="level3"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Team Lead Level</span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="skillName"
          required
          v-model="level4"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Beginner Level</span>
      </div>
      <div class="form__control">
        <input
          type="number"
          name="skillName"
          required
          v-model="level5"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Beginner Level</span>
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

export default {
  data() {
    return {
      Category: "",
      Skill: "",
      level1: "",
      level2: "",
      level3: "",
      level4: "",
      level5: "",

      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    ...mapGetters(["getUsers"]),
    users: function () {
      return this.getUsers.filter((user) => user.role == "Employee");
    },
    dataObj: () => {
      return { name: this.employee, month: this.month, shifts: this.shifts };
    },
    val: function () {
      return this.$store.state.months[this.month];
    },
  },

  methods: {
    async submitData() {
      this.message = "";

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("name", this.employee);
      urlencoded.append("month", this.month);
      urlencoded.append("shifts", this.shifts);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      //   for (let i of this.$store.state.shifts[this.month]) {
      //     console.log(i.id);
      //   }
      console.log(this.$store.state.months[this.month]);
      if (this.shifts.length == this.$store.state.months[this.month]) {
        this.loading = true;
        fetch("https://beapis.herokuapp.com/api/Shifts", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.loading = false;
            console.log(result.message);
            if (result.message == "Created Successfully") {
              this.submitIcon = true;
              setTimeout(() => {
                this.submitIcon = false;
              }, 1000);
              this.$store.dispatch("getData", "Shifts");
            }
          })
          .catch((error) => {
            console.log("error", error);
            this.loading = false;
            this.message = "Some thing Went Wrong";
          });
      } else {
        this.message = "Please Fill all days shifts";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getData", "Shifts");
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
.indicator {
  padding-bottom: 5px;
  text-align: center;
  color: #010f60;
}
</style>
