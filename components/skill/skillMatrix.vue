<template>
  <div>
    <button class="form-btn" @click="showHomeModal">Add Skill</button>
    <modal v-if="skillModal" class="secform" v-on:close="skillModal = false">
      <add-skill />
    </modal>
  </div>
</template>

<script>
import addSkill from "@/components/skill/addSkill.vue";
import AddSkill from "./addSkill.vue";
import modal from "@/components/modal.vue";

export default {
  data() {
    return {
      skillModal: false,
    };
  },
  components: {
    modal,
    AddSkill,
  },
  methods: {
    showHomeModal() {
      this.skillModal = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
