<template>
  <div>
    <use-case-form />
    <button @click="apicall">apiCall</button>
  </div>
</template>

<script>
import baseSpinner from "@/components/baseSpinner.vue";
import { mapState } from "vuex";

import UseCaseForm from "../components/useCaseForm.vue";

export default {
  components: {
    UseCaseForm,
  },

  computed: {
    ...mapState(["advisorySource"]),
  },

  methods: {
    apicall() {
      let obj = {
        source: "sasasas",
        date: "2022-03-24 12:24:43",
        referenceid: "sasasa",
        description: "sasas",
        applicable: "0",
        token: "sasasasa",
        notes: "sasasasas",
      };

      this.$store.dispatch("postData", {
        apiName: "advisorySource",
        body: obj,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
