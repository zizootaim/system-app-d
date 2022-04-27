<template>
  <div class="play__form-wrapper">
    <h1 class="form__title">Playbooks</h1>

    <form v-on:submit.prevent>
      <div class="long__form">
        <div class="form__control full">
          <input
            type="text"
            name="title"
            v-model="title"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Title</span>
        </div>

        <div class="form__control">
          <input type="file" id="file" ref="file" required />
        </div>

        <div class="form__control">
          <select name="category" v-model="category" required>
            <option
              v-for="(c, index) in playbookCategories"
              :key="index"
              :value="c"
            >
              {{ c }}
            </option>
          </select>
          <span class="form__control-label">Category</span>
        </div>
        <div class="form__control full" v-if="category == 'Other'">
          <input
            type="text"
            name="otherCategory"
            v-model="otherCategory"
            required
          />
          <span class="form__control-label">Other Category</span>
        </div>
        <div class="form__control full textarea">
          <textarea
            required
            name="IssueDescription"
            v-model="description"
            cols="20"
            rows="3"
          ></textarea>
          <span class="form__control-label">Description</span>
        </div>

        <div class="form__table full" v-if="chosenFormMethod=='POST'">
          <p style="margin-bottom: 1rem;color: #fff;">RACI Matrix</p>
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
          <button
            class="form-btn btn"
            type="submit"
            @click="addRow"
            style="color: #010f60"
          >
            add row <BaseSpinner class="smallSpinner" v-if="loadingAdd" />
          </button>
        </div>
      </div>
      <div class="submit-btn__wrapper full">
        <button class="submit-btn" @click="submitData">
          Submit <BaseSpinner v-if="loading" />
          <svg
            v-if="submitIcon"
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
import { playbookCategories } from "../assets/data";
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
  },
  data() {
    return {
      playbookCategories,
      title: "",
      irStageOptions: [
        "Preparation",
        "Identification",
        "Containment",
        "Eradication",
        "Recovery",
        "Lessons Learned",
      ],
      category: "",
      otherCategory: "",
      activity: "",
      irStage: "",
      team: "",
      description: "",
      data: [],
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
    if (this.chosenFormMethod == "PUT") {
      let res = this.getPlayBook.filter((book) => book.id == this.chosenFormId);
      console.log(res);
      this.title = res[0].title;
      this.description = res[0].description;
    this.category = res[0].category;
  if(!playbookCategories.includes(res[0].category)){
    this.category = 'Other';
    this.otherCategory = res[0].category
  }
      this.$refs["file"].required = false;
    }
  },
  methods: {
    addRow() {
      this.data.push({
        activity: this.activity,
        team: this.team,
        irStage: this.irStage,
      });
      this.loadingAdd = true;
      setTimeout(() => {
        this.loadingAdd = false;
        this.activity = " ";
        this.irStage = " ";
        this.team = " ";
      }, 500);
    },
    async submitData() {
      this.loading = true;
      let formData = new FormData();
      let file = document.querySelector("input[type=file]");
      formData.append("file", file.files[0]);
      formData.append("id", this.chosenFormId);
      formData.append("title", this.title);
      formData.append("description", this.description);
      let category =
        this.category == "Other" ? this.otherCategory : this.category;
      formData.append("category", category);

      formData.append("data", JSON.stringify(this.data));
      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

      if (this.chosenFormMethod == "POST") {
        fetch("https://beapis.herokuapp.com/api/PlayBook", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            this.loading = false;
            console.log(result.message);
            if (result.message == "Created Successfully") {
              this.submitIcon = true;
              setTimeout(() => {
                this.submitIcon = false;
                document.querySelector(".close").click();
              }, 1000);
              this.$store.dispatch("getData", "Playbooks");
            }
          })
          .catch((error) => {
            console.log("error", error);
            this.loading = false;
            this.message = "Some thing Went Wrong";
          });
      } else {
        let formData2 = new FormData();
        if (file.files[0] != undefined) {
          formData2.append("file", file.files[0]);
        }
        console.log(this.data.length);
        if (this.data.length) {
        
          formData2.append("data", JSON.stringify(this.data));
        }
        formData2.append("id", this.chosenFormId);
        formData2.append("title", this.title);
        formData2.append("description", this.description);
        let category =
          this.category == "Other" ? this.otherCategory : this.category;
        formData2.append("category", category);
        var requestOptions1 = {
          method: "POST",
          body: formData2,
          redirect: "follow",
        };

        fetch(
          "https://beapis.herokuapp.com/api/PlayBook?_method=PUT",
          requestOptions1
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
      }
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
  width: 12px;
  height: 12px;
  margin-left: .5rem;
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
