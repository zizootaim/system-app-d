<template>
  <div class="home__form-wrapper">
    <h1 class="form__title">Home Content</h1>
    <form @submit.prevent>
      <div class="form__control">
        <input type="text" name="title" v-model="title" required />
        <span class="form__control-label">Title</span>
      </div>
      <div class="form__control">
        <input type="text" name="subTitle" v-model="subTitle" required />
        <span class="form__control-label">Sub Title</span>
      </div>
      <div class="form__control">
        <input type="email" name="email" v-model="email" required />
        <span class="form__control-label">Email</span>
      </div>
      <div class="form__control">
        <input type="tel" name="phone" v-model="phone" required />
        <span class="form__control-label">Phone</span>
      </div>
      <div class="form__control">
        <input type="text" name="mission" v-model="mission" required />
        <span class="form__control-label">Mission</span>
      </div>
      <div class="form__control">
        <input type="text" name="vision" v-model="vision" required />
        <span class="form__control-label">Vision</span>
      </div>
      <div>
        <div class="form__control">
          <input type="text" name="goalAdded" v-model="goalAdded" />
          <span class="form__control-label">Goals</span>
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

      <div class="form__control">
        <span>Logo:</span>
        <input type="file" id="file" ref="file" />
      </div>
      <div class="form__control">
        <span>Background:</span>
        <input type="file" id="background" ref="background" />
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
      <p class="errMessage">{{ message }}</p>
    </form>
  </div>
</template>
<script>
import baseSpinner from "@/components/baseSpinner.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getHomeData"]),
  },

  components: {
    baseSpinner,
  },

  name: "homeContentForm",
  data() {
    return {
      title: this.$store.state.home[0].title,
      mission: this.$store.state.home[0].mission,
      vision: this.$store.state.home[0].vision,
      goal: [],
      goalAdded: "",
      subTitle: this.$store.state.home[0].subtitle,
      email: this.$store.state.home[0].email,
      phone: this.$store.state.home[0].phone,
      loading: false,
      submitIcon: false,
      message: "",
      loadingAdd: false,
    };
  },
  dataObj() {
    return {};
  },
  methods: {
    addRow() {
      this.goal.push(this.goalAdded);
      this.loadingAdd = true;
      setTimeout(() => {
        this.loadingAdd = false;
        this.goalAdded = "";
      }, 500);
    },
    submitData() {
      console.log(this.getHomeData);
      var formdata = new FormData();
      formdata.append("id", this.getHomeData[0].id);
      formdata.append("title", this.title);
      formdata.append("subtitle", this.subTitle);
      formdata.append("vision", this.vision);
      formdata.append("mission", this.mission);
      formdata.append("email", this.email);
      formdata.append("phone", this.phone);
      if (this.goal.length != 0)
        formdata.append("goal", JSON.stringify(this.goal));
      let file = document.querySelector("#file");
      let background = document.querySelector("input[id='background']");
      console.log(file.files[0]);
      console.log(background.files[0]);
      if (file.files[0] != undefined) formdata.append("file", file.files[0]);
      if (background.files[0] != undefined)
        formdata.append("background", background.files[0]);

      var requestOptions = {
        method: "POSt",
        body: formdata,
        redirect: "follow",
      };
      this.loading = true;
      console.log(formdata);
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
          } else this.message = "Something Went Wrong";
        })
        .catch((error) => {
          console.log("error", error);
          this.loading = false;
          this.message = "Something Went Wrong";
        });
    },
  },
};
</script>
<style>
.home__form-wrapper {
  width: 90%;
  margin: auto;
}
.btn {
  font-size: 12px;
}

</style>
