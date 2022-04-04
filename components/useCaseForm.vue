<template>
  <div class="use-case__form-wrapper">
    <h1 class="form__title">{{ formTitle }}</h1>
    <form class="use-case__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="identifier"
          placeholder="Use Case Identifier"
          v-model="identifier"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control select">
        <select name="priority" id="priority" v-model="priority">
          <option value="" selected disabled hidden>Priority</option>
          <option value="p1">P1</option>
          <option value="p2">P2</option>
          <option value="p3">P3</option>
          required
        </select>
      </div>

      <div class="form__control" style="grid-column:-1/1;">
        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          v-model="purpose"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          v-model="stakeholders"
          type="text"
          name="stakeholders"
          placeholder="Stakeholders"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="requirements"
          placeholder="Data Requirements"
          v-model="requirements"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          v-model="logic"
          type="text"
          name="logic"
          placeholder="Logic"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          v-model="output"
          name="output"
          placeholder="Output"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          v-model="playbook"
          name="playbook"
          placeholder="Playbook"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="falsepositive"
          placeholder="Know False Positive ?"
          v-model="falsepositive"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="risk"
          placeholder="Risk or Threat"
          v-model="risk"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control select">
        <select v-model="useCaseType" name="usecasetype" id="use-case__type">
          <option value="" selected disabled hidden>Use Case Type</option>
          <option value="self monitoring">Self Monitoring</option>
          <option value="insider threat">Insider Threat</option>
          <option value="external threat">External Threat</option>
          <option value="compliance pci">Compliance - PCI</option>
          <option value="compliance cbe">Compliance - CBE</option>
          <option value="other">Other</option>
          required
        </select>
      </div>
      <div class="form__control" style="grid-column:-1/1;" v-if="useCaseType == 'other'">
        <input
          type="text"
          name="otherUseCaseType"
          placeholder="Use Case Type"
          v-model="otherUseCaseType"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control select">
        <select name="alertvolume" v-model="volume" id="alert-volume">
          <option value="" selected disabled hidden>Alert Volume</option>
          <option value="very high">Very High</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="very low">Very Low</option>
          required
        </select>
      </div>
      <div class="form__control select">
        <select name="testing" id="testing" v-model="testing">
          <option value="" selected disabled hidden>Testing</option>
          <option value="tested">Tested</option>
          <option value="not tested">Not Tested</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      
      <div class="form__control select">
        <select v-model="production" name="production" id="production">
          <option value="" selected disabled hidden>Production</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
          <option value="under testing">Under Testing</option>
          required
        </select>
      </div>
     
    </form>
        <div class="submit-btn__wrapper">
      <button class="submit-btn" type="submit" @click="submitData">
        Submit
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
        <BaseSpinner v-if="loading" />
      </button>
    </div>
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";

export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
      identifier: "",
      purpose: "",
      risk: "",
      useCaseType: "",
      testing: "",
      stakeholders: "",
      requirements: "",
      logic: "",
      output: "",
      volume: "",
      falsepositive: "",
      priority: "",
      playbook: "",
      production: "",
      otherUseCaseType: "",
      submitIcon: false,
      loading: false,
    };
  },
  props: {
    formTitle: "",
  },
  computed: {
    dataObj() {
      return {
        identifier: this.identifier,
        purpose: this.purpose,
        risk: this.risk,
        type: this.currentType,
        stakeholders: this.stakeholders,
        requirements: this.requirements,
        logic: this.logic,
        output: this.output,
        volume: this.volume,
        falsepositive: this.falsepositive,
        testing: this.testing,
        priority: this.priority,
        playbook: this.playbook,
        production: this.production,
      };
    },
    currentType() {
      return this.useCaseType == "other"
        ? this.otherUseCaseType
        : this.useCaseType;
    },
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.loading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "useCase",
        body: this.dataObj,
      });
      console.log(response);
      if (response) {
        this.submitIcon = true;
        this.loading = false;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      }
    },
  
  },

  name: "UseCaseForm",
};
</script>
<style>
.use-case__form-wrapper {
  width: 85%;
}
.use-case__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
.form__title {
  color: #000;
  text-transform: capitalize;
  text-align: center;
  margin-bottom: 0.6rem;
}

.secform .form__control {
  border-color: #000;
  color: #010f60;
  width: 100%;
}
.secform .form__control input,
.secform .form__control select {
  color: #010f60;
  width: 100%;
}
.secform .form__control input::placeholder {
  color: #010f60;
}
.secform .submit-btn {
  width: 50%;
  margin: auto auto 10px auto;

  border-color: #010f60;
}
.secform .form__control input[type="date"] {
  color: #010f60;
}
.secform .form__control * {
  color: #010f60;
}
.use-case__form {
  max-height: 30rem;
  overflow: auto;
  padding-right: 0.6rem;
}

@media screen and (max-width: 680px) {
  .use-case__form {
    grid-template-columns: 1fr;
  }
}
</style>
