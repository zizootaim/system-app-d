<template>
  <div>
    <incident-main-form />
  </div>
</template>

<script>
import { mapState } from "vuex";
import incidentMainForm from "@/components/incidentMainForm.vue";

export default {
  components: {
    incidentMainForm,
  },

  data() {
    return {
      title: "",
    };
  },
  computed: {
    ...mapState(["advisorySource"]),
  },

  methods: {
    uploadPostMan() {
      let file = document.querySelector("input[type=file]");
      var formdata = new FormData();
      formdata.append("file", file.files[0]);

      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch("https://beapis.herokuapp.com/api/ProceduresPDF", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    upload() {
      let formData = new FormData();
      let file = document.querySelector("input[type=file]");
      formData.append("file", file.files[0]);
      formData.append("title", this.title);

      fetch("https://beapis.herokuapp.com/api/ReportsPDF", {
        method: "POST",

        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
