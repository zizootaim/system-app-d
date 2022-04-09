<template>
  <div class="service__form-wrapper">
    <h1 class="form__title">Playbooks</h1>

    <form class="long__form" v-on:submit.prevent>
   

       <div class="form__control full textarea">
        <textarea
          required
          name="IssueDescription"
          v-model="IssueDescription"
          cols="20"
          rows="3"
        ></textarea>
        <span class="form__control-label">Description</span>
      </div>

      <div class="form__table">
        <div class="form__control">
          <input
            type="text"
            name="category"
            v-model="category"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Category</span>
        </div>
        <div class="form__control">
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
          <input type="file" id="file" ref="file" />
        </div>
      </div>
      <div class="form__table">
        <div class="form__control">
          <input
            type="text"
            name="activity"
            v-model="activity"
            autocomplete="off"
            required
          />
          <span class="form__control-label">Activity</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="irStage"
            v-model="irStage"
            autocomplete="off"
            required
          />
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
        <button class="form-btn" type="submit" @click="addRow">
          add row <BaseSpinner class="smallSpinner" v-if="loadingAdd" />
        </button>
      </div>
      <button class="submit-btn" type="submit" @click="submitData">
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
      <p class="errMessage">{{ messageErr }}</p>
    </form>
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";

export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
      title: "",
      category: "",
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
  computed: {
    dataObj() {
      let formData = new FormData();
      let file = document.querySelector("input[type=file]");
      formData.append("file", file.files[0]);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category", this.category);
      formData.append("data", this.data);
      return {
        formData,
      };
    },
    messageErr() {
      return this.message;
    },
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
      }, 500);
    },
    async submitData() {
      this.loading = true;
      let formData = new FormData();
      let file = document.querySelector("input[type=file]");
      formData.append("file", file.files[0]);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("category", this.category);

      formData.append("data", JSON.stringify(this.data));
      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

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
    },
  },
  name: "serviceCatalogeForm",
};
</script>

<style scoped>
.service__form-wrapper {
  width: 85%;
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
