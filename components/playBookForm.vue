<template>
  <div class="service__form-wrapper">
    <h1 class="form__title">Playbooks</h1>

    <form class="long__form" v-on:submit.prevent>
      <textarea
      class="full"
        name="description"
        placeholder="Description"
        v-model="description"
        required
        cols="20"
        rows="3"
      ></textarea>

 <div class="form__table">
        <div class="form__control">
        <input
          type="text"
          name="category"
          placeholder="Category"
          v-model="category"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="title"
          placeholder="Title"
          v-model="title"
          autocomplete="off"
          required
        />
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
            placeholder="Activity"
            v-model="activity"
            autocomplete="off"
            required
          />
        </div>
        <div class="form__control">
          <input
            type="text"
            name="irStage"
            placeholder="IR Stage"
            v-model="irStage"
            autocomplete="off"
            required
          />
        </div>
        <div class="form__control">
          <input
            type="text"
            name="team"
            placeholder="Team"
            v-model="team"
            autocomplete="off"
            required
          />
        </div>
        <button class="form-btn" @click="addRow">add</button>
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
      loading: false,
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
  },

  methods: {
    addRow() {
      this.data.push({
        activity: this.activity,
        team: this.team,
        irStage: this.irStage,
      });
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
          console.log(result.message);
          this.loading = false;
          if (result.message == "Created Successfully") {
            this.submitIcon = true;
            setTimeout(() => {
              this.submitIcon = false;
              document.querySelector(".close").click();
            }, 1000);
            this.$store.dispatch("getData", "Playbooks");
          }
        })
        .catch((error) => console.log("error", error));
    },
  },
  name: "serviceCatalogeForm",
};
</script>

<style scoped>
.full{
  grid-column: -1 / 1;
}

.service__form-wrapper {
  width: 85%;
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
