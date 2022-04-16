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
        <button class="submit-btn" type="submit" >
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
  </div>
</template>
<script>
import { dailyChecks, shiftStatus } from "../assets/data";
export default {
  data() {
    return {
      dailyChecks,
      shiftStatus,
      description: "",
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
      },
      spinnerLoading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        Description: this.description,
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
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.spinnerLoading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "healthCheck",
        body: this.dataObj,
      });
      console.log(response);
      if (response) {
        this.spinnerLoading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      }
    },
  },

  name: "healthCheckForm",
};
</script>
<style>
.shift__form-wrapper {
  width: 80%;
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
</style>
