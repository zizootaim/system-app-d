<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Daily Health Check</h1>
    <form class="health__form" v-on:submit.prevent="submitData">
      <div class="long__form">
        <div class="form__control select full" style="margin-top: 1rem">
          <select required name="description" v-model="description">
            <option v-for="(d, index) in dailyChecks" :value="d" :key="index">
              {{ d }}
            </option>
          </select>
          <span class="form__control-label">Check Description</span>
        </div>
        <div class="form__control" v-if="description == 'Other'">
          <input
            type="text"
            name="otherCheckDescription"
            required
            v-model="otherCheckDescription"
            autocomplete="off"
          />
          <span class="form__control-label">Other Description</span>
        </div>
        <div class="form__control full">
          <select name="status" required v-model="status">
            <option value="Ok">Ok</option>
            <option value="Not Ok">Not Ok</option>
          </select>
          <span class="form__control-label">Health Status</span>
        </div>

        <div class="health__issues-form full" v-if="this.status == 'Not Ok'">
          <h1 class="form__title">Health Issues</h1>

          <div class="long__form">
            <div class="form__control">
              <input
                type="text"
                name="issuesfound"
                required
                v-model="issuesfound"
                autocomplete="off"
              />
              <span class="form__control-label">Issues Found</span>
            </div>
            <div class="form__control">
              <input
                type="text"
                name="component"
                required
                v-model="healthIssue.component"
                autocomplete="off"
              />
              <span class="form__control-label">Component</span>
            </div>
            <div class="form__control">
              <input
                type="text"
                name="ip"
                required
                v-model="healthIssue.ip"
                autocomplete="off"
              />
              <span class="form__control-label">IP</span>
            </div>
            <div class="form__control">
              <input
                type="text"
                name="Hostname"
                required
                v-model="healthIssue.hostname"
                autocomplete="off"
              />
              <span class="form__control-label">Hostname</span>
            </div>
            <div class="form__control time-control">
              <label for="startDate" class="date">Start Date</label>
              <input
                id="startDate"
                type="date"
                v-model="healthIssue.startDate"
                required
              />
              <label for="startTime" class="time">Start Time</label>
              <input
                type="time"
                v-model="healthIssue.startTime"
                id="startTime"
                required
              />
            </div>
            <div class="form__control">
              <input
                type="text"
                name="who"
                required
                v-model="healthIssue.who"
              />
              <span class="form__control-label">Who</span>
            </div>

            <div class="form__control full textarea">
              <textarea
                required
                name="IssueDescription"
                v-model="healthIssue.issueDescription"
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
                v-model="healthIssue.actionTaken"
              />
              <span class="form__control-label">Action Taken</span>
            </div>
            <div class="form__control">
              <input
                type="text"
                name="NextAction"
                required
                v-model="healthIssue.nextAction"
              />
              <span class="form__control-label">Next Action</span>
            </div>

            <div class="form__control full">
              <select
                required
                name="issueStatus"
                v-model="healthIssue.issueStatus"
              >
                <option
                  v-for="(i, index) in shiftStatus"
                  :key="index"
                  :value="i"
                >
                  {{ i }}
                </option>
              </select>
              <span class="form__control-label">Issue Status</span>
            </div>
            <div class="form__control time-control">
              <label for="CloseDate" class="date">Close Date</label>
              <input
                type="date"
                name="CloseDate"
                v-model="healthIssue.closeDate"
                required
              />
              <label for="CloseTime" class="time">Close Time</label>
              <input
                type="time"
                name="CloseTime"
                v-model="healthIssue.closeTime"
                required
              />
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

import { dailyChecks, shiftStatus } from "../assets/data";
export default {
  data() {
    return {
      dailyChecks,
      shiftStatus,
      spinnerLoading: false,
      description: "",
      otherCheckDescription: "",
      status: "",
      issuesfound: "",
      healthIssue: {
        component: "",
        ip: "",
        hostname: "",
        startDate: "",
        startTime: "",
        issueDescription: "",
        actionTaken: "",
        nextAction: "",
        who: "",
        issueStatus: "",
        closeTime: "",
        closeDate: "",
        message: "",
      },

      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        id: this.chosenFormId,
        Description: this.currentDescription,
        Status: this.status,
        IssuesFound: this.issuesfound,
        Component: this.healthIssue.component,
        Ip: this.healthIssue.ip,
        Hostname: this.healthIssue.hostname,
        StartTime: `${this.healthIssue.startDate} ${this.healthIssue.startTime}`,
        IssueDescription: this.healthIssue.issueDescription,
        ActionTaken: this.healthIssue.actionTaken,
        NextAction: this.healthIssue.nextAction,
        Who: this.healthIssue.who,
        IssueStatus: this.healthIssue.issueStatus,
        CloseTime: `${this.healthIssue.closeDate} ${this.healthIssue.closeTime}`,
      };
    },
    currentDescription() {
      return this.description == "Other"
        ? this.otherCheckDescription
        : this.description;
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getHealthCheck"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getHealthCheck.filter(
        (issue) => issue.id == this.chosenFormId
      );
      let a = res[0].Description;
      this.status = res[0].Status;
      this.issuesfound = res[0].IssuesFound;
      this.description = res[0].Description;
      this.healthIssue.component = res[0].Component;
      this.healthIssue.ip = res[0].Ip;
      this.healthIssue.issueDescription = res[0].IssueDescription;
      this.healthIssue.hostname = res[0].Hostname;
      this.healthIssue.actionTaken = res[0].ActionTaken;
      this.healthIssue.nextAction = res[0].NextAction;
      this.healthIssue.issueStatus = res[0].IssueStatus;
      this.healthIssue.who = res[0].Who;
    }
  },
  methods: {
    async submitData() {
      this.message = "";
      console.log(this.dataObj);
      this.spinnerLoading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "healthCheck",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        this.$store.dispatch("getData", "healthCheck");
        response = await this.$store.dispatch("editData", {
          apiName: "healthCheck",
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
        this.loading = false;
        this.message = "Something Went Wrong";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
  },

  name: "healthCheckForm",
};
</script>
<style>
.shift__form-wrapper {
  padding: 0rem 1rem 1rem 1.7rem;
  width: 100%;
}
.submit-btn__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.health__issues-form .long__form {
  max-height: unset;
}
textarea {
  width: 100%;
}
.health__issues-form .form__title {
  margin-top: -1rem;
}
</style>
