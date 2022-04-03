<template>
  <div class="shift__form-wrapper">
 <form class="shift__form long__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="component"
          placeholder="Component"
          v-model="component"
          autocomplete="off"
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="ip"
          placeholder="IP"
          v-model="ip"
          autocomplete="off"
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="Hostname"
          placeholder="Hostname"
          v-model="hostname"
          autocomplete="off"
        />
      </div>
      <div class="form__control time-control">
        <label for="startDate" class="date">Start Date</label>
        <input id="startDate" type="date" v-model="startDate" />
        <label for="startTime" class="time">Start Time</label>
        <input type="time" v-model="startTime" id="startTime" />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="IssueDescription"
          placeholder="Issue Description"
          v-model="IssueDescription"
        />
      </div>
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
      <div class="form__control" style="grid-column: -1 /1;">
        <select name="status" v-model="status">
          <option value="" selected disabled hidden>ٍStatus</option>

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
     
    </form>
          <div class="submit-btn__wrapper">
        <button class="submit-btn" @click="submitData">
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
      component: "",
      ip: "",
      hostname: "",
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
        component: this.component,
        ip: this.ip,
        Hostname: this.hostname,
        StartTime: this.startDate + " " + this.startTime,
        IssueDescription: this.IssueDescription,
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
        apiName: "healthIssue",
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
<style></style>
