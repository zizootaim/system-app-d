<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Incidents</h1>
    <form class="shift__form" v-on:submit.prevent="submitData">
      <div class="long__form">
        <div class="form__control">
          <input
            type="text"
            name="incidentName"
            required
            v-model="incidentName"
            autocomplete="off"
          />
          <span class="form__control-label">Incident Name</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="incidentNumber"
            required
            v-model="incidentNumber"
            autocomplete="off"
          />
          <span class="form__control-label">Incident Number</span>
        </div>

        <div class="form__control time-control">
          <label for="incidentDate" class="date">Incident Date</label>
          <input
            id="incidentDate"
            type="date"
            v-model="incidentDate"
            required
          />
          <label for="incidentTime" class="time">Incident Time</label>
          <input
            type="time"
            v-model="incidentTime"
            id="incidentTime"
            required
          />
        </div>
        <div class="form__control">
          <input type="text" name="who" required v-model="who" />
          <span class="form__control-label">Who</span>
        </div>

        <div class="form__control full textarea">
          <textarea
            required
            name="incidentDescription"
            v-model="incidentDescription"
            cols="20"
            rows="3"
          ></textarea>
          <span class="form__control-label">Incident Description</span>
        </div>

        <div class="form__control">
          <input
            type="text"
            name="ActionTaken"
            required
            v-model="ActionTaken"
          />
          <span class="form__control-label">Action Taken</span>
        </div>
        <div class="form__control">
          <input type="text" name="NextAction" required v-model="NextAction" />
          <span class="form__control-label">Next Action</span>
        </div>

        <div class="form__control full">
          <select name="status" required v-model="status">
            <option v-for="(i, index) in shiftStatus" :key="index" :value="i">
              {{ i }}
            </option>
          </select>
          <span class="form__control-label">Status</span>
        </div>
        <div class="form__control time-control">
          <label for="incidentDate2" class="date">Close Date</label>
          <input id="incidentDate2" type="date" v-model="closeDate" required />
          <label for="incidentTime2" class="time">Close Time</label>
          <input type="time" v-model="closeTime" id="incidentTime2" required />
        </div>
      </div>

      <div class="submit-btn__wrapper full">
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
          <BaseSpinner v-if="spinnerLoading" />
        </button>
      </div>
    </form>
    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import * as timeMethods from "../assets/timeMethods";
import { shiftStatus } from "../assets/data";
export default {
  data() {
    return {
      shiftStatus,
      incidentName: "",
      incidentNumber: "",
      incidentDate: "",
      incidentTime: "",
      incidentDescription: "",
      ActionTaken: "",
      NextAction: "",
      who: "",
      status: "",
      closeDate: "",
      closeTime: "",
      message: "",
      spinnerLoading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        name: this.incidentName,
        number: this.incidentNumber,
        date: this.incidentDate + " " + this.incidentTime,
        description: this.incidentDescription,
        ActionTaken: this.ActionTaken,
        NextAction: this.NextAction,
        who: this.who,
        status: this.status,
        CloseTime: this.closeDate + " " + this.closeTime,
        id: this.chosenFormId,
      };
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getIncidents"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getIncidents.filter(
        (incident) => incident.id == this.chosenFormId
      );
      console.log(res);

      this.incidentDate = timeMethods.getDay(res[0].date);
      this.incidentTime = timeMethods.getTime(res[0].date);
      this.closeDate = timeMethods.getDay(res[0].CloseTime);
      this.closeTime = timeMethods.getTime(res[0].CloseTime);
      this.incidentName = res[0].name;
      this.incidentDescription = res[0].description;
      this.incidentNumber = res[0].number;
      this.ActionTaken = res[0].ActionTaken;
      this.NextAction = res[0].NextAction;
      this.status = res[0].status;
      this.who = res[0].who;
    }
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.spinnerLoading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "incidents",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "incidents",
          body: this.dataObj,
        });
      }
      console.log(response);
      this.spinnerLoading = false;
      if (response) {
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      } else {
        this.message = "Something Went Wrong";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
  },
};
</script>
<style></style>
