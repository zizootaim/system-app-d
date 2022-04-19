<template>
  <div class="service__form-wrapper">
    <h1 class="form__title">Service Catalog</h1>

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

      <div class="form__control textarea">
        <textarea
          required
          name="inputs"
          placeholder=""
          v-model="inputs"
          cols="20"
          rows="3"
        ></textarea>
        <span class="form__control-label">Inputs</span>
      </div>

      <div class="form__control textarea">
        <textarea
          required
          name="output"
          v-model="outputs"
          cols="20"
          rows="3"
        ></textarea>
        <span class="form__control-label">Outputs</span>
      </div>
      <div class="form__control textarea">
        <textarea
          required
          name="description"
          v-model="description"
          cols="20"
          rows="3"
        ></textarea>
        <span class="form__control-label">Description</span>
      </div>
      <div class="form__control textarea">
        <textarea
          required
          name="consumers"
          v-model="consumers"
          cols="20"
          rows="3"
        ></textarea>
        <span class="form__control-label">Consumers</span>
      </div>

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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <span class="form__control-label">Status</span>
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
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
      id: this.chosenFormId,
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
        id: this.chosenFormId,
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
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getServiceCatalog"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getServiceCatalog.filter(
        (serviceCatalog) => serviceCatalog.id == this.chosenFormId
      );
      console.log(res);
      this.name = res[0].name;
      this.owner = res[0].owner;
      this.description = res[0].description;
      this.status = res[0].status;
      this.inputs = res[0].inputs;
      this.outputs = res[0].outputs;
      this.consumers = res[0].consumers;
      this.processes = res[0].processes;
    }
  },
  methods: {
    async submitData() {
      this.loading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "serviceCatalog",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "serviceCatalog",
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
