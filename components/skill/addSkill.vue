<template>
  <div class="shift__form-wrapper">
    <form v-on:submit.prevent="submitData">
      <h1 class="form__title">Add Competency</h1>
      <div class="form__control">
        <select required v-model="Category">
          <option value="Soft Skills">Soft Skills</option>
          <option value="Technical Skills">Technical Skills</option>
          <option value="Certifications">Certifications</option>
          <option value="Edu">Education</option>
        </select>
        <span class="form__control-label">Competency</span>
      </div>

      <div class="form__control">
        <input
          type="text"
          name="skillName"
          required
          v-model="Skill"
          autocomplete="off"
        />
        <span class="form__control-label">Competency Name</span>
      </div>
      <div
        v-if="Category == 'Certifications' || Category == 'Edu'"
        class="form__control"
      >
        <select required v-model="L1">
          <option v-for="op in level" :key="op" :value="op">{{ op }}</option>
        </select>
        <span class="form__control-label"> Analyst 1</span>
      </div>
      <div
        v-if="Category == 'Certifications' || Category == 'Edu'"
        class="form__control"
      >
        <select required v-model="L2">
          <option v-for="op in level" :key="op" :value="op">{{ op }}</option>
        </select>
        <span class="form__control-label"> Analyst 2</span>
      </div>
      <div
        v-if="Category == 'Certifications' || Category == 'Edu'"
        class="form__control"
      >
        <select required v-model="L3">
          <option v-for="op in level" :key="op" :value="op">{{ op }}</option>
        </select>
        <span class="form__control-label"> Analyst 3</span>
      </div>
      <div
        v-if="Category == 'Certifications' || Category == 'Edu'"
        class="form__control"
      >
        <select required v-model="admin">
          <option v-for="op in level" :key="op" :value="op">{{ op }}</option>
        </select>
        <span class="form__control-label">Soc Admin</span>
      </div>
      <div
        v-if="Category == 'Certifications' || Category == 'Edu'"
        class="form__control"
      >
        <select required v-model="manager">
          <option v-for="op in level" :key="op" :value="op">{{ op }}</option>
        </select>
        <span class="form__control-label">Soc Manager</span>
      </div>
      <div
        v-if="Category == 'Soft Skills' || Category == 'Technical Skills'"
        class="form__control"
      >
        <input
          type="number"
          name="skillName"
          required
          v-model="L1"
          min="0"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label"> Analyst 1</span>
      </div>
      <div
        v-if="Category == 'Soft Skills' || Category == 'Technical Skills'"
        class="form__control"
      >
        <input
          type="number"
          name="skillName"
          required
          v-model="L2"
          min="0"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label"> Analyst 2</span>
      </div>
      <div
        v-if="Category == 'Soft Skills' || Category == 'Technical Skills'"
        class="form__control"
      >
        <input
          type="number"
          name="skillName"
          required
          v-model="L3"
          min="0"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label"> Analyst 3</span>
      </div>
      <div
        v-if="Category == 'Soft Skills' || Category == 'Technical Skills'"
        class="form__control"
      >
        <input
          type="number"
          name="skillName"
          required
          v-model="admin"
          min="0"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Soc Admin</span>
      </div>
      <div
        v-if="Category == 'Soft Skills' || Category == 'Technical Skills'"
        class="form__control"
      >
        <input
          type="number"
          name="skillName"
          required
          v-model="manager"
          min="0"
          max="5"
          autocomplete="off"
        />
        <span class="form__control-label">Soc Manager</span>
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
      <p v-if="message" class="errMessage">{{ message }}</p>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
      Category: "",
      Skill: "",
      L1: "",
      L2: "",
      L3: "",
      admin: "",
      manager: "",
      level: [
        "Mandatory",
        "Nice to Have",
        "Not a Priority",
        "Significant Value ",
      ],
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj: function () {
      return {
        id: this.chosenFormId,
        Category: this.Category,
        Skill: this.Skill,
        Level:
          this.L1 +
          "," +
          this.L2 +
          "," +
          this.L3 +
          "," +
          this.admin +
          "," +
          this.manager,
      };
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getSkillMatrix"]),
  },

  methods: {
    async submitData() {
      this.loading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "skillMatrix",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "skillMatrix",
          body: this.dataObj,
        });
      }
      console.log(response);
      this.loading = false;
      if (response) {
        this.submitIcon = true;
        this.$store.dispatch("getData", "skillMatrix");
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      } else {
        this.message = "Some Thing Went Wrong , Try Again !";
        setTimeout(() => {
          this.message = "";
        }, 4000);
      }
    },
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      console.log("sdgdhf");
      for (let i in this.getSkillMatrix) {
        console.log(i);
        for (let j of this.getSkillMatrix[i]) {
          if (j.id == this.chosenFormId) {
            this.Skill = j.Skill;
            this.Category = j.Category;
            let levels = j.Level.split(",");
            this.L1 = levels[0];
            this.L2 = levels[1];
            this.L3 = levels[2];
            this.admin = levels[3];
            this.manager = levels[4];
          }
        }
      }
    }
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
