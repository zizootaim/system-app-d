<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Pending Issues</h1>
    <form class="shift__form pending-form" v-on:submit.prevent="submitData">
      <div class="long__form">
        <div class="form__control">
          <input
            type="text"
            name="issue"
            required
            v-model="issue"
            autocomplete="off"
          />
          <span class="form__control-label">Issue</span>
        </div>

        <div class="form__control time-control">
          <label for="startDate" class="date">Start Date</label>
          <input id="startDate" type="date" v-model="startDate" />
          <label for="startTime" class="time">Start Time</label>
          <input type="time" v-model="startTime" id="startTime" />
        </div>

        <div class="form__control full textarea">
          <textarea
            required
            name="IssueDescription"
            v-model="IssueDescription"
            cols="20"
            rows="3"
          ></textarea>
          <span class="form__control-label">Issue Description</span>
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
        <div class="form__control">
          <input type="text" name="who" required v-model="who" />
          <span class="form__control-label">Who</span>
        </div>
        <div class="form__control">
          <select required name="status" v-model="status">
            <option v-for="(i, index) in shiftStatus" :key="index" :value="i">
              {{ i }}
            </option>
          </select>
          <span class="form__control-label">Status</span>
        </div>
        <div class="form__control time-control">
          <label for="CloseDate" class="date">Close Date</label>
          <input type="date" name="CloseDate" v-model="closeDate" />
          <label for="CloseTime" class="time">Close Time</label>
          <input type="time" name="CloseTime" v-model="closeTime" />
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
import { shiftStatus } from "../assets/data";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import * as timeMethods from "../assets/timeMethods";

export default {
  data() {
    return {
      shiftStatus,
      issue: "",
      startDate: "",
      startTime: "",
      IssueDescription: "",
      ActionTaken: "",
      NextAction: "",
      who: "",
      status: "",
      closeTime: "",
      closeDate: "",
      message: "",
      spinnerLoading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        id: this.chosenFormId,
        issue: this.issue,
        StartTime: `${this.startDate} ${this.startTime}`,
        description: this.IssueDescription,
        ActionTaken: this.ActionTaken,
        NextAction: this.NextAction,
        who: this.who,
        status: this.status,
        CloseTime: this.closeDate + " " + this.closeTime,
      };
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getPendingIssues"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getPendingIssues.filter(
        (issue) => issue.id == this.chosenFormId
      );
      console.log(res[0]);



      this.startDate = timeMethods.getDay(res[0].StartTime);
     this.startTime =  timeMethods.getTime(res[0].StartTime);
     this.closeDate =  timeMethods.getDay(res[0].CloseTime);
      this.closeTime =  timeMethods.getTime(res[0].CloseTime);

      this.issue = res[0].issue;
      this.IssueDescription = res[0].description;
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
          apiName: "pendingIssues",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "pendingIssues",
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
  name: "healthIssues",
};
</script>
<style>
.pending-form {
  padding-top: 1rem;
}
</style>
