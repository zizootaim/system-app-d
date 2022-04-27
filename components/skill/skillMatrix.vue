<template>
  <div>
    <div class="skill-matrix">
      <h1 class="sec__title">Skill Matrix</h1>
      <button
        class="form-btn"
        v-if="
          (getRole == 'admin' || getRole == 'Employee') &&
          getPermission == 'write'
        "
        @click="showHomeModal('POST')"
      >
        <i class="fas fa-plus"></i> Add Competency
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
                  {{ skillName != "Edu" ? skillName : "Education" }}
                </h4>
              </div>

              <div class="col" v-for="(role, index) in header" :key="index">
                <h4>{{ role }}</h4>
              </div>
              <div
                class="col"
                v-if="
                  (getRole == 'admin' || getRole == 'Employee') &&
                  getPermission == 'write'
                "
              ></div>
            </div>
          </div>
          <div class="table__row">
            <div class="rows">
              <div
                class="row"
                v-for="(skill, index) in skillValue"
                :key="index"
              >
                <div class="col">
                  <p>{{ skill.Skill }}</p>
                </div>

                <div
                  v-for="(i, index) in skill.Level.split(',')"
                  :class="'col level c-' + statusClass(i)"
                  :key="index"
                >
                  <p v-if="skillName == 'Certifications' || skillName == 'Edu'">
                    {{ i }}
                  </p>
                </div>
                <div
                  class="col"
                  v-if="
                    (getRole == 'admin' || getRole == 'Employee') &&
                    getPermission == 'write'
                  "
                >
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
      <div class="no-data" v-if="getSkillMatrix.length == 0">
        <h3>no data to show.</h3>
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
        "Analyst L1",
        "Analyst L2",
        "Analyst L3",
        "SOC Admin",
        "SOC Manager",
      ],
      skillModal: false,
    };
  },
  computed: {
    ...mapGetters(["getSkillMatrix", "getRole", "getPermission"]),
  },
  components: {
    modal,
    AddSkill,
  },
  mounted() {
    console.log(this.getSkillMatrix);
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
    statusClass(status) {
      return status.includes(" ")
        ? status.substring(0, status.indexOf(" ")).toLowerCase()
        : status.toLowerCase();
    },
  },
};
</script>

<style>
.skill-matrix .rows .row {
  height: 1.3rem;
}
.skill-matrix .rows .row * {
  font-size: 0.8rem;
}
.skill-matrix .rows .row .col {
  padding: 0;
}
.skill-matrix .header .col {
  padding: 0rem;
}
.level {
  position: relative;
  border-left: 2px solid #000;
}
.level::after {
  display: grid;
  place-items: center;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgb(236, 175, 62);
}
.level.c-1::after {
  width: 20%;
  content: "1";
}
.level.c-2::after {
  width: 40%;
  content: "2";
}
.level.c-3::after {
  width: 60%;
  content: "3";
}
.level.c-4::after {
  width: 80%;
  content: "4";
}
.level.c-5::after {
  width: 100%;
  content: "5";
}
.c-mandatory {
  background-color: rgb(247, 193, 193);
}
.c-not {
  background-color: rgb(175, 175, 229);
}
.c-nice {
  background-color: rgb(168, 194, 168);
}
.c-significant {
  background-color: rgb(214, 214, 144);
}
.table {
  margin-bottom: 10px;
}
</style>
