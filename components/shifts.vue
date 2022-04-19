<template>
  <div>
    <button
      class="form-btn"
      @click="setChosenForm('addShift')"
      v-if="getRole == 'admin'"
      style="margin-right: 1rem;"
    >
      <i class="fas fa-plus"></i> Add
    </button>
    <button
      class="form-btn"
      @click="setChosenForm('editShift')"
      v-if="getRole == 'admin'"
    >
      <i class="fas fa-edit"></i> Edit
    </button>

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
  border-right: 1px solid #000;
}
.shifts__wrapper .col:last-of-type {
  border-right: 0;
}
.shifts__wrapper .table {
  min-width: 75rem;
}
.table__row:nth-child(even) {
  margin-bottom: 0.7rem;
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
.left p {
  color: #000;
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
