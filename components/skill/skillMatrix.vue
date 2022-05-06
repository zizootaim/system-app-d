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
      <div v-if="getSkillMatrix">
        <div class="table__wrapper">
          <div class="table__row header">
            <div class="row">
              <div class="left">Competency Name</div>
              <div class="cols">
                <div class="col">
                  <h4>L1-Analyst</h4>
                </div>
                <div class="col">
                  <h4>L2-Analyst</h4>
                </div>
                <div class="col">
                  <h4>L3-Analyst</h4>
                </div>
                <div class="col">
                  <h4>SOC Admin</h4>
                </div>
                <div class="col">
                  <h4>SOC Manager</h4>
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
          </div>
          <div
            class="table"
            v-for="(skillValue, skillName) in getSkillMatrix"
            :key="skillName"
          >
            <div class="col rotate">
              <p>{{ skillName == "Edu" ? "Education" : skillName }}</p>
            </div>
            <div class="table__row">
              <div class="rows">
                <div
                  class="row"
                  v-for="(skill, index) in skillValue"
                  :key="index"
                >
                  <div class="col level">
                    <p>{{ skill.Skill }}</p>
                  </div>

                  <div
                    v-for="(i, index) in skill.Level.split(',')"
                    :class="'col level c-' + statusClass(i)"
                    :key="index"
                  >
                    <p
                      v-if="skillName == 'Certifications' || skillName == 'Edu'"
                    >
                      {{ i }}
                    </p>
                    <p
                      v-if="skillName != 'Certifications' || skillName != 'Edu'"
                    >
                      {{ skillLevel[i] }}
                    </p>
                  </div>
                  <div
                    class="col btns"
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
        "L1-Analyst",
        "L2-Analyst",
        "L3-Analyst",
        "SOC Admin",
        "SOC Manager",
      ],
      skillLevel: [
        "0-Not Required ",
        "1-Beginner",
        "2-Intermediate",
        "3-Advanced",
        "4-Expert",
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
.skill-matrix .col.btns {
  display: grid;
  place-items: center;
}
.skill-matrix .col .btns__wrapper {
  width: 100%;
}
.skill-matrix .table__wrapper .table {
  display: grid;
  grid-template-columns: 50px 1fr;
}
.skill-matrix
  .table__row:not(.table__row:first-child):not(.book__table .table__row)
  .col {
  padding: 0;
}
.skill-matrix .left {
  width: 14rem;
  font-weight: 600;
  text-align: center;
}
.skill-matrix .table__row:not(.table__row:first-child) .col p {
  max-height: unset;
  width: auto;
  max-width: unset;
  word-break: normal;
  padding: 0.1rem;
}
.rotate {
  /* width: 50px; 
flex-basis: content;
  transform: rotate(-90deg); */
  display: grid;
  place-items: center;
  height: 100px;
}
.rotate p {
  font-size: 0.8rem;
  margin: auto;
  width: 100px;
  transform: rotate(-90deg) translateY(-2rem) translateX(-0.2rem);
}
.form-btn {
  margin-top: 0.2rem;
}
.light-mode .rotate p {
  color: #000;
}

.skill-matrix .rows .row {
  padding-bottom: 2px;
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
  border-right: 2px solid #000;
  display: grid;
  place-items: center;
}
.skill-matrix .rows .row {
  border-bottom: 0.4px solid #000;
}
.skill-matrix .rows .row:last-child {
  border-bottom: none;
}
.level::after {
  display: grid;
  place-items: center;
  color: #fff;
  position: absolute;
  align-self: center;
  content: "";
  left: 0;
  height: 1rem;
  background: rgb(236, 175, 62);
}
.level p {
  z-index: 500;
}
.level.c-0::after {
  width: 100%;
  color: #000;
  background: none;
  justify-content: left;
  padding-left: 0.2rem;
}
.level.c-1::after {
  width: 25%;
}
.level.c-2::after {
  width: 50%;
}
.level.c-3::after {
  width: 75%;
}
.level.c-4::after {
  width: 100%;
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
.skill-matrix .table:not(.skill-matrix .table:first-of-type) {
  margin-bottom: 10px;
}
.skill-matrix .header {
  min-width: 65rem;
}
</style>
