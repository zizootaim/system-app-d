<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Communication</h1>
    <form class="incident-main__form" v-on:submit.prevent="submitData">
      <div class="long__form">
        <div>
          <p>Information</p>
          <div class="form__control">
            <input
              type="text"
              name="team"
              v-model="team"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Team</span>
          </div>

          <div class="form__control">
            <input
              type="text"
              name="action"
              v-model="action"
              autocomplete="off"
              required
            />
            <span class="form__control-label">When to Contact ?</span>
          </div>
          <p>Primary Information</p>
            <div class="form__control">
            <input
              type="text"
              name="primaryName"
              v-model="primaryName"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Primary Name</span>
          </div>
          <div class="form__control">
            <input
              type="email"
              name="primaryEmail"
              v-model="primaryEmail"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Primary Email</span>
          </div>
        
          <div class="form__control">
            <input
              type="number"
              name="primaryPhone"
              v-model="primaryPhone"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Primary Phone</span>
          </div>
          <div class="form__control">
            <input
              type="number"
              name="primaryPhone"
              v-model="primaryMobile"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Primary Mobile</span>
          </div>
          <p>Seconadry Information</p>
     

          <div class="form__control">
            <input
              type="text"
              name="aecondaryName"
              v-model="secondaryName"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Secondary Name</span>
          </div>
               <div class="form__control" style="margin-top: 1rem;">
            <input
              type="email"
              name="secondaryEmail"
              v-model="secondaryEmail"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Secondary Email</span>
          </div>
          <div class="form__control">
            <input
              type="number"
              name="secondaryPhone"
              v-model="secondaryPhone"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Secondary Phone </span>
          </div>
          <div class="form__control">
            <input
              type="number"
              name="secondaryMobile"
              v-model="secondaryMobile"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Secondary Mobile</span>
          </div>
          <p>Group Information</p>
              <div class="form__control" style="grid-column: unset">
            <input
              type="text"
              name="groupManager"
              v-model="groupManager"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Group Manager</span>
          </div>
          <div class="form__control">
            <input
              type="email"
              name="groupEmail"
              v-model="groupEmail"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Group Email</span>
          </div>
      
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
          <BaseSpinner v-if="loading" />
        </button>
      </div>
    </form>
    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      team: "",
      action: "",
      primaryEmail: "",
      primaryPhone: "",
      primaryMobile: "",
      secondaryMobile: "",
      primaryName: "",
      secondaryEmail: "",
      secondaryPhone: "",
      secondaryName: "",
      groupEmail: "",
      message: "",
      groupManager: "",
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        id: this.chosenFormId,
        Team: this.team,
        Action: this.action,
        PrimaryEmail: this.primaryEmail,
        PrimaryName: this.primaryName,
        PrimaryPhone: this.primaryPhone,
        SecondaryEmail: this.secondaryEmail,
        SecondaryName: this.secondaryName,
        SecondaryPhone: this.secondaryPhone,
        PrimaryMobile: this.primaryMobile,
        SecondaryMobile: this.secondaryMobile,
        GroupEmail: this.groupEmail,
        GroupManager: this.groupManager,
      };
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getCommunication"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getCommunication.filter(
        (communication) => communication.id == this.chosenFormId
      );
      if (res.length != 0) {
     
        this.team = res[0].Team;
        this.action = res[0].Action;
        this.primaryEmail = res[0].PrimaryEmail;
        this.primaryName = res[0].PrimaryName;
        this.primaryPhone = res[0].PrimaryPhone;
        this.secondaryEmail = res[0].SecondaryEmail;
        this.secondaryName = res[0].SecondaryName;
        this.secondaryPhone = res[0].SecondaryPhone;
        this.secondaryMobile = res[0].SecondaryMobile;
        this.primaryMobile = res[0].PrimaryMobile;
        this.groupEmail = res[0].GroupEmail;
        this.groupManager = res[0].GroupManager;
      }
    }
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.message = "";
      this.loading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "Communication",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        if (this.dataObj.id == "") {
          await this.$store.dispatch("getData", "Communication");
        }
        response = await this.$store.dispatch("editData", {
          apiName: "Communication",
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

  name: "healthCheckForm",
};
</script>
<style>
.long__form p:not(.mitre p) {
  text-transform: capitalize;
  color: #fff;
  background: #40358e;
  border-radius: 0.7rem;
  margin-bottom: 1.3rem;
  text-align: center;
  padding: 0.4rem 0;
  text-transform: uppercase;
}
.long__form p:nth-of-type(3) {
  font-weight: 400;
  margin-bottom: 0.2rem;
}
.submit-btn__wrapper {
  margin-top: 1.4rem;
}
.classification {
  display: inline-block;
  color: #010f60;
}
.classification label {
  padding: 10px;
  color: #010f60;
}
.classification p {
  background: inherit;
  color: #010f60;
}
.classificationItem {
  padding: 0 10px 10px 10px;
}
.class__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
