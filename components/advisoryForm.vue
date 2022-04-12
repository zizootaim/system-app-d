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
        <option v-for="(s,index) in advisorySource" :key="index" :value="s">{{s}}</option>
         
        </select>
        <span class="form__control-label">Advisory Source</span>
      </div>
      <div class="form__control full" v-if="source == 'Other'">
        <input type="text" v-model="otherSource" autocomplete="off" required />
        <span class="form__control-label">Other Source</span>
      </div>
      <div class="form__control select">
        <select name="applicable" id="applicable" v-model="applicable" required>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <span class="form__control-label">Applicable</span>
      </div>
      <div class="form__control" v-if="applicable == 'No'">
        <input
          type="text"
          name="action"
          v-model="token"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Action Token</span>
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
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";
import {advisorySource} from '../assets/data'

export default {
  components: {
    baseSpinner,
  },

  name: "advisoryForm",
  data() {
    return {advisorySource,
      source: "",
      dateY: "",
      dateT: "",
      referenceid: "",
      description: "",
      applicable: "",
      token: "",
      notes: "",
      otherSource: "",
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
        source: this.currentSource,
        date: this.dateY + " " + this.dateT,
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
  },
  methods: {
    async submitData(e) {
      this.loading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "advisory",
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
