<template>
  <div>
    <div class="shifts__top">
      <div>
        <button
          class="form-btn"
          @click="setChosenForm('addShift')"
          v-if="getRole == 'admin' || getRole == 'Employee'"
          style="margin-right: 1rem"
        >
          <i class="fas fa-plus"></i> Add Shift
        </button>
        <button
          class="form-btn"
          @click="setChosenForm('editShift')"
          v-if="
            (getRole == 'admin' || getRole == 'Employee') &&
            getPermission == 'write'
          "
        >
          <i class="fas fa-edit"></i> Edit Shift
        </button>
      </div>
      <div class="shifts">
        <p>Shifts</p>
        <div class="shift A">A <span>24x7</span></div>
        <div class="shift B">B <span>12x5</span></div>
        <div class="shift C">C <span>8x5</span></div>
        <div class="shift O">O <span>On Call</span></div>
        <div class="shift X">X <span>Off</span></div>
      </div>
    </div>

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
              <div
                class="col"
                v-for="(cnt, index) in monthCount(shiftName)"
                :key="index"
              >
                {{ cnt }}
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
        <div class="table__row">
          <div class="rows">
            <div
              class="row"
              v-for="(employee, index) in shiftValue"
              :key="index"
            >
              <div class="left">
                <p>{{ employee.name }}</p>
              </div>
              <div class="cols">
                <div
                  class="col"
                  :class="i.toUpperCase()"
                  v-for="(i, index) in employee.shifts"
                  :key="index"
                >
                  {{ i }}
                </div>
                <div class="col" style="border: 0">
                  <button
                    v-if="
                      (getRole == 'admin' || getRole == 'Employee') &&
                      getPermission == 'write'
                    "
                    class="delete"
                    @click="
                      deleteData({
                        body: { name: employee.name, month: shiftName },
                        apiName: 'Shifts',
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
    <div class="no-data" v-if="getShifts.length == 0">
      <h3>no data to show.</h3>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import modal from "./modal.vue";

export default {
  data() {
    return {};
  },
  name: "shifts",
  components: {
    modal,
  },
  computed: {
    ...mapState(["chosenForm"]),
    ...mapGetters([
      "getChosenForm",
      "getRole",
      "getShifts",
      "getMonths",
      "getPermission",
    ]),
  },
  methods: {
    setChosenForm(formName) {
      this.$store.commit("setChosenForm", formName);
    },
    monthCount(month) {
      return parseInt(this.getMonths[month]);
    },
    deleteData(data) {
      console.log(data.body.name);
      this.$store.dispatch("delete", data);
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
.shifts__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shifts__top .shifts {
  display: flex;
  flex-direction: row;
  margin-right: 1rem;
}
.shifts__top .shifts p {
  margin-right: 0.5rem;
  align-self: center;
}
.light-mode .shifts__top .shifts p {
  color: #000;
}
.shifts__top .shifts .shift {
  padding: 0.5rem 1rem;
  position: relative;
}
.shift span {
  position: absolute;
  top: -1.6rem;
  left: 0.4rem;
  font-size: 0.85rem;
  color: #fff;
}
.light-mode .shift span {
  color: #000;
}
.shift:first-of-type {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.shift:last-of-type {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.O span {
  left: 0;
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
.shifts__wrapper .col:first-of-type {
  border-left: 1px solid #000;
}

.shifts__wrapper .col {
  text-transform: capitalize;
  width: 2.1rem;
  width: 100%;
  border: none;
  border-left: 1px solid #000;
}
.shifts__wrapper .col:first-of-type {
  border-left: 0;
}
.header .col:last-of-type {
  border: 0;
}
.shifts__wrapper .table {
  min-width: 75rem;
}

.shifts__wrapper .table__row .row .col {
  padding: 0.5rem 0;
  display: grid;
  place-items: center;
  font-size: 0.6rem;
}

.table__row .row .left:not(.skill-matrix .left) {
  width: 10rem;
  display: grid;
  place-items: center;
  position: relative;
}
.left p {
  color: #000;
}
.col .delete {
  color: rgb(180, 19, 19);
  position: absolute;
  right: 0.5rem;
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
