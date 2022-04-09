<template>
  <div>
    <div class="btns-wrapper">
      <button
        v-if="getRole == 'admin' || getRole == 'Employee'"
        class="form-btn"
        @click="changeForm('add')"
      >
        + add
      </button>
    </div>
    <org-structure />
    <modal v-if="showModal" class="secform" v-on:close="showModal = false">
      <post-form v-if="chosenForm == 'add'" />
      <edit-form v-if="chosenForm == 'edit'" />
    </modal>
  </div>
</template>

<script>
import orgStructure from "@/components/orgStructure.vue";
import postForm from "@/components/staff/postForm.vue";
import editForm from "@/components/staff/editForm.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getRole"]),
  },

  data() {
    return {
      chosenForm: "",
      showModal: false,
    };
  },
  components: {
    orgStructure,
    postForm,
    editForm,
  },
    computed: {
    ...mapGetters(["getUsers", "getRole"]),
  },
  methods: {
    changeForm(form) {
      this.chosenForm = form;
      this.showModal = true;
    },
  },
  mounted() {
    this.$store.dispatch("getData", "staff");
  },
};
</script>

<style>
.btns-wrapper {
  padding: 1rem;
}
.btns-wrapper button {
  margin-left: 1rem;
}
</style>
