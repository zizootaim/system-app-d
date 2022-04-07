<template>
  <div class="service__form-wrapper">
    <h1 class="form__title">{{ formTitle }}</h1>

    <form class="service__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="name"
          v-model="name"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Service Name</span>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="owner"
          v-model="owner"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Service Owner</span>
      </div>

      <textarea
        name="inputs"
        placeholder="Inputs"
        v-model="inputs"
        required
        cols="20"
        rows="3"
      ></textarea>

      <textarea
        name="output"
        placeholder="Outputs"
        v-model="outputs"
        required
        cols="20"
        rows="3"
      ></textarea>
      <textarea
        name="description"
        placeholder="Description"
        v-model="description"
        required
        cols="20"
        rows="3"
      ></textarea>

      <textarea
        name="consumers"
        placeholder="Consumers"
        v-model="consumers"
        required
        cols="20"
        rows="3"
      ></textarea>

      <div class="form__control">
        <input
          type="text"
          name="processes"
          v-model="processes"
          autocomplete="off"
          required
        />
        <span class="form__control-label">Service Processes</span>
      </div>

      <div class="form__control select">
        <select name="status" id="status" v-model="status" required>
          <option value="" selected disabled hidden>Status</option>

          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="hours">
        <p>Service Hours</p>
        <div></div>
        <div>
          <input type="checkbox" value="24 X 7" v-model="hours" />
          <label for="jack">24 X 7</label>
        </div>
        <div>
          <input type="checkbox" value="8 X 5" v-model="hours" />
          <label for="john">8 X 5</label>
        </div>

        <div>
          <input type="checkbox" value="ad-hoc per request" v-model="hours" />
          <label for="ad-hoc per request">ad-hoc per request</label>
        </div>
      </div>
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
      name: "",
      owner: "",
      description: "",
      status: "",
      hours: [],
      inputs: "",
      outputs: "",
      consumers: "",
      processes: "",
      message: "",
      loading: false,
      submitIcon: false,
    };
  },
  props: {
    formTitle: "",
  },
  computed: {
    dataObj() {
      return {
        name: this.name,
        owner: this.owner,
        description: this.description,
        status: this.status,
        hours: this.hours.join("  ,  "),
        inputs: this.inputs,
        outputs: this.outputs,
        consumers: this.consumers,
        processes: this.processes,
      };
    },
    messageErr() {
      return this.message;
    },
  },

  methods: {
    async submitData() {
      this.loading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "serviceCatalog",
        body: this.dataObj,
      });
      console.log(response);
      this.loading = false;
      if (response) {
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      } else {
        this.message = "Some Thing Went Wrong";
      }
    },
  },
  name: "serviceCatalogeForm",
};
</script>

<style scoped>
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
.service__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
.errMessage {
  text-align: center;
  color: red;
  padding: 10px;
}
.hours {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 680px) {
  .service__form {
    grid-template-columns: 1fr;
  }
}
</style>
