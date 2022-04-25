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
          type="text"
          name="referenceid"
          v-model="referenceid"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Reference ID</span>
      </div>
      <div class="form__control time-control">
        <label for="date" class="date">Date</label>
        <input name="date" type="date" v-model="dateY" required />
        <label for="time" class="time">Time</label>
        <input name="time" type="time" v-model="dateT" required />
      </div>

      <div class="form__control full textarea required">
        <textarea
          required
          name="description"
          v-model="description"
          cols="20"
          rows="2"
        ></textarea>
        <span class="form__control-label">Description</span>
      </div>
      <div class="form__control full textarea required">
        <textarea
          required
          name="notes"
          v-model="notes"
          cols="20"
          rows="2"
        ></textarea>
        <span class="form__control-label">Notes</span>
      </div>

      <div class="form__control full select">
        <select
          name="advisorysource"
          id="advisory-source"
          v-model="source"
          required
        >
          <option v-for="(s, index) in advisorySource" :key="index" :value="s">
            {{ s }}
          </option>
        </select>
        <span class="form__control-label">Advisory Source</span>
      </div>
      <div class="form__control full" v-if="source == 'Other'">
        <input type="text" v-model="otherSource" autocomplete="off" required />
        <span class="form__control-label">Other Source</span>
      </div>
      <div class="form__control select full">
        <select name="applicable" id="applicable" v-model="applicable" required>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <span class="form__control-label">Applicable</span>
      </div>
      <div class="form__control full" v-if="applicable == 'Yes'">
        <input
          type="text"
          name="action"
          v-model="token"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Action Taken</span>
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
import { advisorySource } from "../assets/data";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import * as timeMethods from '../assets/timeMethods' 

export default {
  components: {
    baseSpinner,
  },

  name: "advisoryForm",
  data() {
    return {
      advisorySource,
      source: "",
      dateY: "",
      dateT: "",
      referenceid: "",
      description: "",
      applicable: "",
      token: "",
      notes: "",
      otherSource: "",
      message: "",
      loading: false,
      submitIcon: false,
    };
  },
  props: {
    formTitle: "",
  },
  computed: {
    dataObj() {
      return {
        id: this.chosenFormId,
        source: this.currentSource,
        date: `${this.dateY} ${this.dateT}`,
        referenceid: this.referenceid,
        description: this.description,
        applicable: this.applicable,
        token: this.token,
        notes: this.notes,
      };
    },
    currentSource() {
      return this.source == "Other" ? this.otherSource : this.source;
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getAdvisory"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getAdvisory.filter(
        (advisory) => advisory.id == this.chosenFormId
      );
      console.log(res);



      this.dateY = timeMethods.getDay(res[0].date);
      this.dateT = timeMethods.getTime(res[0].date);

      this.source = res[0].source;
      this.description = res[0].description;
      this.applicable = res[0].applicable;
      this.token = res[0].token;
      this.notes = res[0].notes;
      this.referenceid = res[0].referenceid;
    }
  },
  methods: {
    async submitData(e) {
      this.loading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "advisory",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "advisory",
          body: this.dataObj,
        });
      }
      console.log(response);
      this.loading = false;
      if (response) {
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      } else {
        this.loading = false;
        this.message = "Something Went Wrong";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
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
