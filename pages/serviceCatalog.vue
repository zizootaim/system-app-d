<template>
  <div class="service">
    <h1 class="sec__title" ref="document">Service Catalog</h1>
    <button
      class="form-btn"
      @click="showForm('POST')"
      v-if="getRole == 'Employee' || getRole == 'admin'"
    >
      <i class="fas fa-plus"></i> add
    </button>
    <div class="table__wrapper" v-if="getServiceCatalog.length > 0">
      <div class="table">
        <div class="table__row header" ref="header">
          <div class="col">
            <h4>Service ID</h4>
          </div>
          <div class="col">
            <h4>Service Name</h4>
          </div>
          <div class="col">
            <h4>Service Owner</h4>
          </div>
          <div class="col">
            <h4>Service Status</h4>
          </div>
          <div
            class="col"
            v-if="
              (getRole == 'Employee' || getRole == 'admin') &&
              getPermission == 'write'
            "
          ></div>
        </div>
        <div
          class="table__row"
          v-for="serviceCard in getServiceCatalog"
          :key="serviceCard.id"
          :id="serviceCard.id"
        >
          <div class="row top-row">
            <i
              class="fas fa-angle-down row-btn"
              style="color: #000"
              @click="(event) => showService(event)"
            ></i>
            <div class="col">
              <p>
                <span>{{ serviceCard.id }}</span>
              </p>
            </div>
            <div class="col">
              <p>
                <span>{{ serviceCard.name }}</span>
              </p>
            </div>

            <div class="col">
              <p>
                <span>{{ serviceCard.owner }}</span>
              </p>
            </div>
            <div class="col">
              <p :class="`status ${statusClass(serviceCard.status)}`">
                <span>{{ serviceCard.status }}</span>
              </p>
            </div>
            <div
              class="col"
              v-if="
                (getRole == 'Employee' || getRole == 'admin') &&
                getPermission == 'write'
              "
            >
              <div class="btns__wrapper">
                <button
                  class="table-btn"
                  @click="showForm('PUT', serviceCard.id)"
                >
                  <i class="fal fa-pen"></i>
                </button>
                <button
                  class="table-btn"
                  @click="
                    deleteData({
                      body: { id: serviceCard.id },
                      apiName: 'serviceCatalog',
                    })
                  "
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row bottom-row">
            <div class="com-row">
              <div class="primary">
                <div>
                  <span>Description</span> : {{ serviceCard.description }}
                </div>
                <div><span>Service Hours</span> : {{ serviceCard.hours }}</div>
                <div><span>Inputs</span> : {{ serviceCard.inputs }}</div>
              </div>
              <div class="secondary">
                <div><span>Consumers</span> : {{ serviceCard.consumers }}</div>
                <div><span>Processes</span> : {{ serviceCard.processes }}</div>
                <div><span>Outputs</span> : {{ serviceCard.outputs }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="getServiceCatalog.length == 0">
      <h3>no data to show.</h3>
    </div>

    <modal v-if="addService" class="secform" v-on:close="showForm">
      <service-cataloge-form />
    </modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import modal from "@/components/modal.vue";
import ServiceCatalogeForm from "../components/serviceCatalogeForm.vue";

import {showContent} from '../assets/timeMethods'

export default {
  components: {
    modal,

    ServiceCatalogeForm,
  },
  data() {
    return {
      addService: false,
    };
  },
  computed: {
    ...mapGetters(["getServiceCatalog", "getRole", "getPermission"]),
  },
  methods: {
    download() {
      let htmlToPdfOptions = {
        margin: 0,

        filename: `hehehe.pdf`,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        enableLinks: false,

        html2canvas: {
          scale: 1,
          useCORS: true,
        },

        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };
    },
    showService(event){
      showContent(event)
    },
    deleteData(data) {
      this.$store.dispatch("delete", data);
    },
    showForm(method, id) {
      this.addService = !this.addService;
      this.$store.commit("setChosenFormMethod", method);
      this.$store.commit("setChosenFormId", id);
    },
    
    statusClass(status) {
      return status.includes(" ")
        ? status.substring(0, status.indexOf(" ")).toLowerCase()
        : status.toLowerCase();
    },
  },
  mounted() {
    this.$store.dispatch("getData", "serviceCatalog");
  },
};
</script>
<style>
/* Service Catalog */
.service {
  width: 80%;
  margin: auto;
  padding-top: 1rem;
}
.service .sec__title {
  margin-top: 0;
}
.service .active {
  background: green;
}
.service .inactive {
  background: rgb(156, 17, 17);
}
.service .inactive p span,
.service .active p span {
  color: #fff;
}
.service .row-btn {
  color: #fff;
}
</style>
