<template>
  <div>
    <div class="skill-matrix">
      <button class="form-btn" @click="showHomeModal('POST')">
        Add Competency
      </button>

      <div class="table__wrapper">
        <div
          class="table"
          v-for="(skillValue, skillName) in getSkillMatrix"
          :key="skillName"
        >
          <div class="table__row header">
            <div class="row">
              <div class="col">
                <h4>
                  {{ skillName }}
                </h4>
              </div>

              <div class="col" v-for="role in header" :key="role">
                <h4>{{ role }}</h4>
              </div>
              <div class="col"></div>
            </div>
          </div>
          <div class="table__row">
            <div class="rows">
              <div class="row" v-for="skill in skillValue" :key="skill">
                <div class="left">
                  <p>{{ skill.Skill }}</p>
                </div>

                <div class="cols">
                  <div
                    class="col"
                    v-for="i in skill.Level.split(',')"
                    :class="'class' + i"
                    :key="i"
                  >
                    <p>{{ i }}</p>
                  </div>
                  <div class="col">
                    <div class="btns__wrapper">
                      <button
                        class="table-btn"
                        @click="showHomeModal('PUT', skill.id)"
                      >
                        <i class="fal fa-pen"></i>
                      </button>
                      <button
                        class="table-btn"
                        @click="
                          deleteData({
                            body: { id: skill.id },
                            apiName: 'skillMatrix',
                          })
                        "
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal v-if="skillModal" class="secform" v-on:close="showHomeModal('', '')">
      <add-skill />
    </modal>
  </div>
</template>

<script>
import AddSkill from "./addSkill.vue";
import modal from "@/components/modal.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      header: [
        "Analysis 1",
        "Analysis 2",
        "Analysis 3",
        "Soc Admin",
        "Soc Manager",
      ],
      skillModal: false,
    };
  },
  computed: {
    ...mapGetters(["getSkillMatrix"]),
  },
  components: {
    modal,
    AddSkill,
  },
  methods: {
    showHomeModal(method = "", id = "") {
      this.skillModal = !this.skillModal;
      this.$store.commit("setChosenFormMethod", method);
      this.$store.commit("setChosenFormId", id);
    },

    deleteData(data) {
      this.$store.dispatch("delete", data);
    },
  },
};
</script>

<style scoped>


</style>
