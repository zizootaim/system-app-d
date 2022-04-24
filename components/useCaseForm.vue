<template>
  <div class="use-case__form-wrapper">
    <h1 class="form__title">{{ formTitle }}</h1>
    <form v-on:submit.prevent="submitData">
      <div class="long__form">
        <div class="form__control">
          <input
            type="text"
            name="identifier"
            v-model="identifier"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Use Case Identifier</span>
        </div>
        <div class="form__control select">
          <select required name="priority" id="priority" v-model="priority">
            <option value="p1">P1</option>
            <option value="p2">P2</option>
            <option value="p3">P3</option>
            required
          </select>
          <span class="form__control-label">Priority</span>
        </div>

        <div class="form__control full textarea">
          <textarea
            name="purpose"
            v-model="purpose"
            autocomplete="off"
            required
            cols="20"
            rows="2"
          ></textarea>
          <span class="form__control-label">Purpose</span>
        </div>

        <div class="form__control">
          <input
            v-model="stakeholders"
            type="text"
            name="stakeholders"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Stakeholders</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="requirements"
            v-model="requirements"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Data Requirements</span>
        </div>
        <div class="form__control">
          <input
            v-model="logic"
            type="text"
            name="logic"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Logic</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            v-model="output"
            name="output"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Output</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            v-model="playbook"
            name="playbook"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Playbook</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="falsepositive"
            v-model="falsepositive"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Know False Positive ?</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="risk"
            v-model="risk"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Risk or Threat</span>
        </div>
        <div class="form__control select">
          <select
            required
            v-model="useCaseType"
            name="usecasetype"
            id="use-case__type"
          >
            <option v-for="(t, index) in caseTypes" :key="index" :value="t">
              {{ t }}
            </option>
          </select>
          <span class="form__control-label">Use Case Type</span>
        </div>
        <div class="form__control full" v-if="useCaseType == 'Other'">
          <input
            type="text"
            name="otherUseCaseType"
            v-model="otherUseCaseType"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Use Case Type</span>
        </div>
        <div class="form__control select">
          <select
            required
            name="alertvolume"
            v-model="volume"
            id="alert-volume"
          >
            <option v-for="(v, index) in alertVolumes" :key="index" :value="v">
              {{ v }}
            </option>
          </select>
          <span class="form__control-label">Alert Volume</span>
        </div>
        <div class="form__control select">
          <select required name="testing" id="testing" v-model="testing">
            <option v-for="(t, index) in caseTesting" :key="index" :value="t">
              {{ t }}
            </option>
          </select>
          <span class="form__control-label">Testing</span>
        </div>

        <div class="form__control select full">
          <select
            required
            v-model="production"
            name="production"
            id="production"
          >
            <option
              v-for="(p, index) in caseProductions"
              :key="index"
              :value="p"
            >
              {{ p }}
            </option>
          </select>
          <span class="form__control-label">Production</span>
        </div>
        
           
     
    
           <div class="full mitre">
         <div>
                     <label class="switch" >
                    <input type="checkbox" v-model="mitre" />
                    <span
                      class="slider round"    
                    ></span>
                    
                  </label>
                  <p>Advanced</p>
         </div>
          
            <div  v-if="mitre">
            <p>Mitre Tactics</p>
            <div class="btns__wrapper">
              <label
                v-for="(k, index) in mitreKeys"
                :class="`mitre-btn${
                  isChecked(choosenMitres, k) ? ' checked' : ''
                }`"
                :key="index"
                @click="showTech(k)"
              >
                <span> {{ k }}</span>
                <input
                  type="checkbox"
                  :value="k"
                  :id="k"
                  :name="k"
                  v-model="choosenMitres"
                />
              </label>
            </div>
          </div>
          <div v-if="mitreTechs.length > 0 && mitre">
            <p>Mitre Techniques</p>
            <div class="btns__wrapper tech">
              <label
                v-for="(t, index) in mitreTechs"
                :class="`mitre-btn${
                  isChecked(choosenTechs, t) ? ' checked' : ''
                }`"
                :key="index"
                ><span> {{ t }}</span>

                <input
                  type="checkbox"
                  :value="t"
                  :name="t"
                  v-model="choosenTechs"
              /></label>
            </div>
          </div>
         
        </div>
      </div>
      <div class="submit-btn__wrapper">
        <button class="submit-btn" type="submit">
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
    </form>

    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import mitre from "../assets/mitre";

import {
  caseTypes,
  alertVolumes,
  caseTesting,
  caseProductions,
} from "../assets/data";

export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
      mitre: false,
      mitreKeys: [],
      mitreTechs: [],
      choosenMitres: [],
      choosenTechs: [],
      caseTypes,
      alertVolumes,
      caseTesting,
      caseProductions,
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
      message: "",

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
        id: this.chosenFormId,
        identifier: this.identifier,
        purpose: this.purpose,
        tactics: `[${this.choosenMitres}]`,
        techniques: `[${this.choosenTechs}]`,
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
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getUseCase"]),
    currentType() {
      return this.useCaseType == "other"
        ? this.otherUseCaseType
        : this.useCaseType;
    },
  },
  mounted() {
    this.mitreKeys = Object.keys(mitre);
    console.log(this.mitreKeys);
    if (this.chosenFormMethod == "PUT") {
      let res = this.getUseCase.filter(
        (useCase) => useCase.id == this.chosenFormId
      );
      console.log(res);
      this.identifier = res[0].identifier;
      this.purpose = res[0].purpose;
      this.risk = res[0].risk;
      this.useCaseType = res[0].type;
      this.stakeholders = res[0].stakeholders;
      this.requirements = res[0].requirements;
      this.logic = res[0].logic;
      this.output = res[0].output;
      this.volume = res[0].volume;
      this.falsepositive = res[0].falsepositive;
      this.testing = res[0].testing;
      this.priority = res[0].priority;
      this.playbook = res[0].playbook;
      this.production = res[0].production;
    }
  },
  methods: {
    showMitre(){
      this.mitre = !this.mitre;
    },
    isChecked(arr, value) {
      return arr.includes(value);
    },
    showTech(key) {
      this.mitreTechs = mitre[key];
      this.choosenMitre = key;
    },
    async submitData() {
      console.log(this.dataObj);
      this.loading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "useCase",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "useCase",
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

  name: "UseCaseForm",
};
</script>
<style>

.mitre {
  border: none;
  overflow: auto;
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr;
}
.mitre div:first-of-type{
  display: flex;
  align-items: center;
}
.mitre div:first-of-type p{
  margin-left: 1rem;
  margin-top: .8rem;
  font-size: 1.4rem;
}

.use-case__form-wrapper .btns__wrapper {
  flex-wrap: wrap;
  justify-content: unset;
  align-items: flex-start;
}

.use-case__form-wrapper .long__form {
  overflow-x: unset;
}
.mitre p {
  display: block;
  margin: 1rem 0;
  color: #010f60;
  background: none;
  text-transform: capitalize;
}
.mitre-btn {
  padding: 0.2rem 0.5rem;
  background: none;
  border: 1px solid #010f60;
  border-radius: 0.5rem;
  margin: 0.2rem;
  position: relative;
  cursor: pointer;
}
.mitre-btn span {
  color: #010f60;
}
.mitre-btn input {
  visibility: hidden;
  opacity: 0;
  position: absolute;
}

/* .tech .mitre-btn {
  background: purple;
} */
.checked {
  /* background: green; */
  background: rgb(179, 179, 179);
  background: #8e8e8e;
  border: none;
}
.checked span {
  color: #fff;
}

/* .mitre .tech{
  min-width: 35rem;
} */
.use-case__form-wrapper {
  width: 90%;
}

.form__title {
  color: #000;
  text-transform: capitalize;
  text-align: center;
  margin-top: -3.5rem;
  margin-bottom: 0.6rem;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.3rem;
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
.secform .form__control *:not(.mitre-btn span) {
  color: #010f60;
}
</style>
