<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Alerts</h1>
    <form class="shift__form alerts__form long__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="alertName"
          required
          v-model="alertName"
          autocomplete="off"
        />
        <span class="form__control-label">Alert Name</span>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="alertNumber"
          required
          v-model="alertNumber"
          autocomplete="off"
        />
        <span class="form__control-label">Alert Number</span>
      </div>

      <div class="form__control time-control">
        <label for="startDate" class="date">Start Date</label>
        <input id="startDate" type="date" v-model="startDate" />
        <label for="startTime" class="time">Start Time</label>
        <input type="time" v-model="startTime" id="startTime" />
      </div>
      <div class="form__control">
        <input type="text" name="who" required v-model="who" />
        <span class="form__control-label">Who</span>
      </div>
      <textarea
        style="grid-column: -1/1"
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
          required
          v-model="ActionTaken"
        />
        <span class="form__control-label">Action Taken</span>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="NextAction"
          required
          v-model="NextAction"
        />
        <span class="form__control-label">Next Action</span>
      </div>

      <div class="form__control" style="grid-column: -1/1">
        <select name="status" v-model="status">
          <option value="" selected disabled hidden>Status</option>

          <option value="Initial Investigation">Initial Investigation</option>
          <option value="Sloution In Progress">Sloution In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="form__control time-control">
        <label for="closeDate" class="date">Close Date</label>
        <input
          type="date"
          name="CloseDate"
          id="closeDate"
          v-model="closeDate"
        />
        <label for="closeTime" class="time">Close Time</label>
        <input
          type="time"
          name="CloseTime"
          id="closeTime"
          v-model="closeTime"
        />
      </div>
   
    </form>
    <div class="submit-btn__wrapper">
         <button class="submit-btn">
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
      alertName: "",
      alertNumber: "",
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
        name: this.alertName,
        number: this.alertNumber,
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
        apiName: "alerts",
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
};
</script>
<style>

</style>
