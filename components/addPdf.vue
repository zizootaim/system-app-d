<template>
  <div class="pdfs__top">
    <div class="upload-file__wrapper">
      <h4>Upload File</h4>
      <div class="form__control">
        <input
          type="text"
          name="title"
          v-model="title"
          placeholder="Title"
          required
        />
      </div>
      <input type="file" id="file" ref="file" required />
    </div>
    <div class="submit__btn-wrapper">
      <button class="submit-btn upload-btn" @click="upload">
        Submit <BaseSpinner v-if="loading" />
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
      </button>
    </div>
    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      loading: false,
      submitIcon: false,
      message: "",
    };
  },
  props: {
    apiName: {
      type: String,
      default: "",
    },
  },
  methods: {
    async upload() {
      this.loading = true;
      this.message = "";
      console.log("start");
      let formData = new FormData();
      let file = document.querySelector("input[type=file]");
      if (this.title && file.files[0] != undefined) {
        formData.append("file", file.files[0]);
        formData.append("title", this.title);
        let response = await this.$store.dispatch("uploadPdf", {
          apiName: this.apiName,
          body: formData,
        });
        this.loading = false;
        if (response) {
          this.submitIcon = true;
          setTimeout(() => {
            this.submitIcon = false;
            document.querySelector(".close").click();
          }, 1000);
        } else {
          console.log("fsfasdfv");
          this.loading = false;
          this.message = "Something Went Wrong, Try Again !";
          setTimeout(() => {
            this.message = "";
          }, 4000);
        }
      } else {
        console.log("fsfasdfv");
        this.loading = false;
        this.message = "Something Went Wrong, Try Again !";
        setTimeout(() => {
          this.message = "";
        }, 4000);
      }
    },
  },
};
</script>

<style>
.upload-file__wrapper {
  margin: 2rem;
}

.upload-file__wrapper h4 {
  color: #000a4a;
  font-weight: 600;
}
</style>
