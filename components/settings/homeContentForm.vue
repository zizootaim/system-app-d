<template>
  <div class="home__form-wrapper">
    <h1 class="form__title">Home Content</h1>
    <form @submit.prevent="submitData">
      <div class="form__control">
        <input type="text" name="title" v-model="title" required />
        <span class="form__control-label">Title</span>
      </div>
      <div class="form__control">
        <input type="text" name="subTitle" v-model="subTitle" required />
        <span class="form__control-label">Sub Title</span>
      </div>
      <div class="form__control">
        <input type="text" name="mission" v-model="mission" required />
        <span class="form__control-label">Mission</span>
      </div>
      <div class="form__control">
        <input type="text" name="vision" v-model="vision" required />
        <span class="form__control-label">Vision</span>
      </div>
      <div class="form__control">
        <input type="text" name="goal" v-model="goal" required />
        <span class="form__control-label">Goals</span>
      </div>
      <div class="form__control">
        <input type="file" id="file" ref="file" required />
      </div>
      <div class="submit-btn__wrapper full">
        <button class="submit-btn" type="submit">
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
        <p>{{ message }}</p>
      </div>
    </form>
  </div>
</template>
<script>
import baseSpinner from "@/components/baseSpinner.vue";

export default {
  components: {
    baseSpinner,
  },

  name: "homeContentForm",
  data() {
    return {
      title: this.$store.state.home[0].title,
      mission: this.$store.state.home[0].mission,
      vision: this.$store.state.home[0].vision,
      goal: this.$store.state.home[0].goal,
      subTitle: this.$store.state.home[0].subtitle,
      loading: false,
      submitIcon: false,
      message: "",
    };
  },
  dataObj() {
    return {};
  },
  methods: {
    submitData() {
      var formdata = new FormData();
      formdata.append("id", "2");
      formdata.append("title", this.title);
      formdata.append("subtitle", this.subTitle);
      formdata.append("vision", this.vision);
      formdata.append("mission", this.mission);
      formdata.append("goal", this.goal);
      let file = document.querySelector("input[type=file]");
      formdata.append("file", file.files[0], "[PROXY]");

      var requestOptions = {
        method: "POSt",
        body: formdata,
        redirect: "follow",
      };
      this.loading = true;
      fetch("https://beapis.herokuapp.com/api/Home?_method=PUT", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.loading = false;
          if (result.message == "Updated Successfully") {
            this.submitIcon = true;
            setTimeout(() => {
              this.loadingAdd = false;
              document.querySelector(".close").click();
            }, 500);
            this.$store.dispatch("getData", "home");
          } else this.message = result;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>
<style>
.home__form-wrapper {
  width: 80%;
  margin: auto;
}
</style>
