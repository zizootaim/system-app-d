<template>
  <div class="service__form-wrapper">
    <h1 class="form__title">{{ formTitle }}</h1>

    <form class="service__form" v-on:submit.prevent="submitData">
      <div class="form__control">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          v-model="name"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="owner"
          placeholder="Service Owner"
          v-model="owner"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="description"
          placeholder="Description"
          v-model="description"
          autocomplete="off"
          required
        />
      </div>

      <div class="form__control">
        <input
          type="text"
          name="inputs"
          placeholder="Inputs"
          v-model="inputs"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="output"
          placeholder="Outputs"
          v-model="outputs"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="processes"
          placeholder="Service Processes"
          v-model="processes"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control">
        <input
          type="text"
          name="consumers"
          placeholder="Consumers"
          v-model="consumers"
          autocomplete="off"
          required
        />
      </div>
      <div class="form__control select">
        <select name="status" id="status" v-model="status" required>
          <option value="" selected disabled hidden>Status</option>

          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="form__control select">
        <select name="hoursOptions" id="hours" v-model="hours" required>
          <option value="" selected disabled hidden>Service Hours</option>

          <option value="24*7">24 * 7</option>
          <option value="5*8">5 * 8</option>
        </select>
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
      hours: "",
      inputs: "",
      outputs: "",
      consumers: "",
      processes: "",
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
        hours: this.hours,
        inputs: this.inputs,
        outputs: this.outputs,
        consumers: this.consumers,
        processes: this.processes,
      };
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
      if (response) {
        this.loading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
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

.service__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

@media screen and (max-width: 680px) {
  .service__form {
    grid-template-columns: 1fr;
  }
}
</style>
