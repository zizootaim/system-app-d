<template>
  <div class="service">
    <h1 class="sec__title">Service Catalog</h1>
    <button
      class="form-btn"
      @click="showForm"
      v-if="getRole == 'Employee' || getRole == 'admin'"
    >
      + add
    </button>
    <div class="table__wrapper">
      <div class="table">
        <div class="table__row header">
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
        </div>
        <div
          class="table__row"
          v-for="serviceCard in getServiceCatalog"
          :key="serviceCard.id"
        >
          <div class="row top-row">
            <i
              class="fas fa-angle-down row-btn"
              @click="(event) => showContent(event)"
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
          </div>
          <div class="row bottom-row">
            <div>Description : {{ serviceCard.description }}</div>
            <div>Service Hours : {{ serviceCard.hours }}</div>
            <div>Inputs : {{ serviceCard.inputs }}</div>
            <div>Outputs : {{ serviceCard.outputs }}</div>
            <div>Consumers : {{ serviceCard.consumers }}</div>
            <div>Processes : {{ serviceCard.processes }}</div>
          </div>
        </div>
      </div>
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
    ...mapGetters(["getServiceCatalog", "getRole"]),
  },
  methods: {
    showForm() {
      this.addService = !this.addService;
    },
    showContent(event) {
      Array.from(document.querySelectorAll(".row-btn")).forEach((i) => {
        i.className = "fas fa-angle-down row-btn";
      });
      event.target.className = "fas fa-angle-up row-btn";
      const topRowElements =
        event.target.parentElement.querySelectorAll(".col p");
      const bottomRow =
        event.target.parentElement.parentElement.querySelector(".bottom-row");
      let open =
        event.target.parentElement.getBoundingClientRect().height > 47
          ? true
          : false;
      if (bottomRow) {
        open = bottomRow.getBoundingClientRect().height > 0 ? true : false;
        Array.from(document.querySelectorAll(".bottom-row")).forEach((row) => {
          row.style.height = 0;
        });
        let height = 0;
        Array.from(bottomRow.children).forEach((el) => {
          height += el.getBoundingClientRect().height;
        });
        if (open) {
          event.target.className = "fas fa-angle-down row-btn";
          height = 0;
        }
        bottomRow.style.height = height + "px";
      }
      Array.from(document.querySelectorAll(".col p")).forEach((p) => {
        p.style.maxHeight = "1.8rem";
      });
      Array.from(topRowElements).forEach((p) => {
        if (!open) p.style.maxHeight = "unset";
        else p.style.maxHeight = "1.8rem";
      });
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
