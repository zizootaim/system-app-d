<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Pending Issues</h1>
    <form class="shift__form long__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="issue"
          placeholder="Issue"
          v-model="issue"
          autocomplete="off"
        />
      </div>

      <div class="form__control time-control">
        <label for="startDate" class="date">Start Date</label>
        <input id="startDate" type="date" v-model="startDate" />
        <label for="startTime" class="time">Start Time</label>
        <input type="time" v-model="startTime" id="startTime" />
      </div>
        <textarea style="grid-column:-1/1;"
        name="IssueDescription"
          placeholder="Issue Description"
          v-model="IssueDescription"
        cols="20"
        rows="3"
      ></textarea>

      <div class="form__control">
        <input
          type="text"
          name="ActionTaken"
          placeholder="Action Taken"
          v-model="ActionTaken"
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="NextAction"
          placeholder="Next Action"
          v-model="NextAction"
        />
      </div>
      <div class="form__control">
        <input type="text" name="who" placeholder="Who" v-model="who" />
      </div>
      <div class="form__control" >
        <select name="status" v-model="status">
          <option value="" selected disabled hidden>Status</option>
          <option value="Initial Investigation">Initial Investigation</option>
          <option value="Sloution In Progress">Sloution In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="form__control time-control">
        <label for="CloseDate" class="date">Close Date</label>
        <input type="date" name="CloseDate" v-model="closeDate" />
        <label for="CloseTime" class="time">Close Time</label>
        <input type="time" name="CloseTime" v-model="closeTime" />
      </div>
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
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
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

      spinnerLoading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        issue: this.issue,
        StartTime: this.startDate + " " + this.startTime,
        description: this.IssueDescription,
        ActionTaken: this.ActionTaken,
        NextAction: this.NextAction,
        who: this.who,
        status: this.status,
        CloseTime: this.closeDate + " " + this.closeTime,
      };
    },
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.spinnerLoading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "pendingIssues",
        body: this.dataObj,
      });
      console.log(response);
      if (response) {
        this.spinnerLoading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 2000);
      }
    },
  },
  name: "healthIssues",
};
</script>
<style>
.shift__form{
  padding-top: 1.5rem;
}
</style>
