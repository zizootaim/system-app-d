<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Daily Health Check</h1>
    <form class="health__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="description"
          placeholder="Check Description"
          v-model="description"
          autocomplete="off"
        />
      </div>
      <div class="form__control">
        <select name="status" v-model="status">
          <option value="" selected disabled hidden>Health Status</option>
          <option value="1">Ok</option>
          <option value="0">Not Ok</option>
        </select>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="issuesfound"
          placeholder="Issues Found"
          v-model="issuesfound"
          autocomplete="off"
        />
      </div>
      <div class="health__issues-form" v-if="this.status == '0'">
        <h1 class="form__title">Health Issues</h1>
        <div class="long__form">
          <div class="form__control">
            <input
              type="text"
              name="component"
              placeholder="Component"
              v-model="healthIssue.component"
              autocomplete="off"
            />
          </div>
          <div class="form__control">
            <input
              type="text"
              name="ip"
              placeholder="IP"
              v-model="healthIssue.ip"
              autocomplete="off"
            />
          </div>
          <div class="form__control">
            <input
              type="text"
              name="Hostname"
              placeholder="Hostname"
              v-model="healthIssue.hostname"
              autocomplete="off"
            />
          </div>
          <div class="form__control time-control">
            <label for="startDate" class="date">Start Date</label>
            <input id="startDate" type="date" v-model="healthIssue.startDate" />
            <label for="startTime" class="time">Start Time</label>
            <input type="time" v-model="healthIssue.startTime" id="startTime" />
          </div>
          <div class="form__control">
            <input
              type="text"
              name="IssueDescription"
              placeholder="Issue Description"
              v-model="healthIssue.issueDescription"
            />
          </div>
          <div class="form__control">
            <input
              type="text"
              name="ActionTaken"
              placeholder="Action Taken"
              v-model="healthIssue.actionTaken"
            />
          </div>
          <div class="form__control">
            <input
              type="text"
              name="NextAction"
              placeholder="Next Action"
              v-model="healthIssue.nextAction"
            />
          </div>
          <div class="form__control">
            <input type="text" name="who" placeholder="Who" v-model="healthIssue.who" />
          </div>
          <div class="form__control" style="grid-column: -1 /1">
            <select name="issueStatus" v-model="healthIssue.issueStatus">
              <option value="" selected disabled hidden>Issue Status</option>

              <option value="Initial Investigation">
                Initial Investigation
              </option>
              <option value="Sloution In Progress">Sloution In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div class="form__control time-control">
            <label for="CloseDate" class="date">Close Date</label>
            <input type="date" name="CloseDate" v-model="healthIssue.closeDate" />
            <label for="CloseTime" class="time">Close Time</label>
            <input type="time" name="CloseTime" v-model="healthIssue.closeTime" />
          </div>
        </div>
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
          <path
            d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z"
            fill="#43A047"
          />
        </svg>
        <BaseSpinner v-if="spinnerLoading" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      description: "",
      status: "",
      issuesfound: "",
      healthIssue:{
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
        Component:this.healthIssue.component,
        Ip:this.healthIssue.ip,
        Hostname:this.healthIssue.hostname,
        StartTime:`${this.healthIssue.startDate} ${this.healthIssue.startTime}`,
        IssueDescription:this.healthIssue.issueDescription,
        ActionTaken:this.healthIssue.actionTaken,
        NextAction:this.healthIssue.nextAction,
        Who:this.healthIssue.who,
        IssueStatus:this.healthIssue.issueStatus,
CloseTime:`${this.healthIssue.closeDate} ${this.healthIssue.closeTime}`,
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
.health__form {
  max-height: 30rem;
  overflow: auto;
  padding-right: 1rem;
}
</style>
