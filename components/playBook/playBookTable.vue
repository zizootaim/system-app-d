<template>
  <div class="play__form-wrapper">
    <h1 class="form__title">Playbooks</h1>

    <form v-on:submit.prevent>
      <div class="long__form">
        <div class="form__table full">
          <p style="margin-bottom: 1rem;color: #fff;">Playbook Table</p>
          <div class="form__control">
            <input
              ref="activity"
              type="text"
              name="activity"
              v-model="activity"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Activity</span>
          </div>
          <div class="form__control">
            <select required name="issueStatus" v-model="irStage">
              <option
                v-for="option in irStageOptions"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
            <span class="form__control-label">IR Stage</span>
          </div>
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
        </div>
      </div>
      <div class="submit-btn__wrapper full">
        <button
          class="submit-btn"
          @click="submitData('PUT')"
          v-if="chosenFormMethod == 'PUT'"
        >
          Edit <BaseSpinner v-if="loading && method == 'PUT'" />
          <svg
            v-if="submitIcon && method == 'PUT'"
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
        </button>
        <button
        style="margin-left:.3rem;"
          class="submit-btn"
          @click="submitData('DEL')"
          v-if="chosenFormMethod == 'PUT'"
        >
          Delete <BaseSpinner v-if="loading && method == 'DEL'" />
          <svg
            v-if="submitIcon && method == 'DEL'"
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
        </button>
        <button
          class="submit-btn"
          @click="submitData('ADD')"
          v-if="chosenFormMethod == 'ADD'"
        >
          Add
          <BaseSpinner v-if="loading && method == 'ADD'" />
          <svg
            v-if="submitIcon && method == 'ADD'"
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
        </button>
      </div>
    </form>
    <p class="errMessage">{{ messageErr }}</p>
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  components: {
    baseSpinner,
  },
  computed: {
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getPlayBook"]),
    messageErr() {
      return this.message;
    },
    formId: function () {
      return this.chosenFormId.split("+")[0];
    },
    rowId: function () {
      return this.chosenFormId.split("+")[1];
    },
  },
  data() {
    return {
      irStageOptions: [
        "Preparation",
        "Identification",
        "Containment",
        "Eradication",
        "Recovery",
        "Lessons Learned",
      ],
      method: "",
      activity: "",
      irStage: "",
      team: "",
      message: "",
      loading: false,
      loadingAdd: false,
      submitIcon: false,
    };
  },
  props: {
    formTitle: "",
  },
  mounted() {
    if (this.chosenFormId.split("+").length > 1) {
      let res = this.getPlayBook.filter(
        (book) => book.id == this.chosenFormId.split("+")[0]
      );
      console.log(res);
      if (res != undefined) {
        let tableData = JSON.parse(res[0].data);
        this.activity = tableData[this.chosenFormId.split("+")[1]].activity;
        this.irStage = tableData[this.chosenFormId.split("+")[1]].irStage;
        this.team = tableData[this.chosenFormId.split("+")[1]].team;
      }
    }
  },
  methods: {
    async submitData(method) {
      this.method = method;
      this.loading = true;
      let formData = new FormData();
      let res = this.getPlayBook.filter((book) => book.id == this.formId);
      let tableData = JSON.parse(res[0].data);
      if (method == "PUT") {
        tableData.splice(this.rowId, 1, {
          activity: this.activity,
          irStage: this.irStage,
          team: this.team,
        });
      } else if (method == "DEL") tableData.splice(this.rowId, 1);
      else {
        console.log("addRow" + " " + method);
        tableData.push({
          activity: this.activity,
          irStage: this.irStage,
          team: this.team,
        });
      }
      formData.append("data", JSON.stringify(tableData));
      formData.append("id", this.formId);
      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

      fetch(
        "https://beapis.herokuapp.com/api/PlayBook?_method=PUT",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.loading = false;
          console.log(result.message);

          this.submitIcon = true;
          setTimeout(() => {
            this.submitIcon = false;
            document.querySelector(".close").click();
          }, 1000);
          this.$store.dispatch("getData", "Playbooks");
        })
        .catch((error) => {
          this.loading = false;
          this.message = "Something Went Wrong";
          setTimeout(() => {
            this.message = "";
          }, 3000);
        });
    },
  },
  name: "serviceCatalogeForm",
};
</script>

<style scoped>
.play__form-wrapper {
  width: 85%;
}
.play__form-wrapper .long__form {
  max-height: 30rem;
}
.play__form-wrapper .submit-btn__wrapper {
  margin-top: 1rem;
}
.errMessage {
  text-align: center;
  color: red;
  padding: 10px;
}
.smallSpinner {
  width: 20px;
  height: 20px;
}
label,
p {
  color: #010f60;
}
p {
  padding: 10px 0;
}

.hours {
  display: flex;
  flex-direction: column;
}
</style>
