<template>
  <div>
    <button
      class="form-btn"
      @click="setChosenForm('addShift')"
      v-if="getRole == 'admin'"
    >
      Add
    </button>
    <button
      class="form-btn"
      @click="setChosenForm('editShift')"
      v-if="getRole == 'admin'"
    >
      Edit
    </button>
    <modal class="secform" v-on:close="setChosenForm('')" v-if="getChosenForm">
      <add-shift-form v-if="getChosenForm == 'addShift'" />
      <edit-shift-form v-if="getChosenForm == 'editShift'" />
    </modal>
    <div class="table__wrapper">
      <div
        class="table"
        v-for="(shiftValue, shiftName) in getShifts"
        :key="shiftName"
      >
        <div class="table__row header">
          <div class="row">
            <div class="left">{{ shiftName }}</div>
            <div class="cols">
              <div class="col" v-for="cnt in monthCount(shiftName)" :key="cnt">
                {{ cnt }}
              </div>
            </div>
          </div>
        </div>
        <div class="table__row">
          <div class="rows">
            <div
              class="row"
              v-for="employee in shiftValue"
              :key="employee.name"
            >
              <div class="left">{{ employee.name }}</div>
              <div class="cols">
                <div
                  class="col"
                  :class="i.toUpperCase()"
                  v-for="i in employee.shifts"
                  :key="i"
                >
                  {{ i }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import addShiftForm from "./shifts/addShiftForm.vue";
import editShiftForm from "./shifts/editShiftForm.vue";
import modal from "./modal.vue";

export default {
  data() {
    return {};
  },
  name: "shifts",
  components: {
    addShiftForm,
    editShiftForm,
    modal,
  },
  computed: {
    ...mapState(["chosenForm"]),
    ...mapGetters(["getChosenForm", "getRole", "getShifts", "getMonths"]),
  },
  methods: {
    setChosenForm(formName) {
      this.$store.commit("setChosenForm", formName);
    },
    monthCount(month) {
      return parseInt(this.getMonths[month]);
    },
  },
  mounted() {
    this.$store.dispatch("getData", "Shifts");
    this.$store.dispatch("getData", "users");
  },
};
</script>
<style>
.shifts__wrapper {
  margin: 1rem auto;
}
.shifts__wrapper .table__row {
  border-bottom: 1px solid black;
  border-radius: 0;
}

.shifts__wrapper .table__row {
  flex-direction: column;
}
.shifts__wrapper .table__wrapper {
  min-width: 100%;
  margin: auto;
  overflow: auto;
}
.rows .row {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.shifts__wrapper .col:first-of-type{

  border-left: 1px solid #000;
}
.shifts__wrapper .col {
  text-transform: capitalize;
  width: 2.1rem;
  width: 100%;
  border: none;
border-right: 1px solid #000;
}
.shifts__wrapper .table {
  min-width: 76rem;
}
.table__row:nth-child(even){
  margin-bottom: .7rem;
}
.shifts__wrapper .table__row .row .col {
  padding: 0.5rem 0;
  display: grid;
  place-items: center;
  font-size: 0.6rem;
}

.table__row .row .left {
  width: 10rem;
  display: grid;
  place-items: center;

}
.cols {
  width: calc(100% - 10rem);
  display: flex;
}
.A {
  background: rgb(188, 188, 95);
}
.B {
  background: rgb(164, 204, 164);
}
.C {
  background: rgb(30, 149, 89);
}
.O {
  background: rgb(120, 183, 207);
}
.X {
  background: #fff;
}
</style>
