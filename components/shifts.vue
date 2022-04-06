<template>
  <div class="shifts__wrapper">
    <button class="form-btn" @click="setChosenForm('addShift')">Add</button>
    <button class="form-btn" @click="setChosenForm('editShift')">Edit</button>
    <modal class="secform" v-on:close="setChosenForm('')" v-if="getChosenForm">
      <add-shift-form v-if="getChosenForm == 'addShift'" />
      <edit-shift-form v-if="getChosenForm == 'editShift'" />
    </modal>

    <div class="table__wrapper">
      <div class="table">
        <div class="table__row header">
          <div class="row">
            <div class="left">January 2022</div>
            <div class="cols">
              <div class="col">1</div>
            <div class="col">2</div>
            <div class="col">3</div>
            <div class="col">4</div>
            <div class="col">5</div>
            <div class="col">6</div>
            <div class="col">7</div>
            <div class="col">8</div>
            <div class="col">9</div>
            <div class="col">10</div>
            <div class="col">11</div>
            <div class="col">12</div>
            <div class="col">13</div>
            <div class="col">14</div>
            <div class="col">15</div>
            <div class="col">16</div>
            <div class="col">17</div>
            <div class="col">18</div>
            <div class="col">19</div>
            <div class="col">20</div>
            <div class="col">21</div>
            <div class="col">22</div>
            <div class="col">23</div>
            <div class="col">24</div>
            <div class="col">25</div>
            <div class="col">26</div>
            <div class="col">27</div>
            <div class="col">28</div>
            <div class="col">29</div>
            <div class="col">30</div>
            </div>
          </div>
        </div>
        <div class="table__row">
          <div class="rows">
            <div class="row">
              <div class="left">Employee 1</div>
              <div class="cols">
                <div class="col shift-a"></div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col shift-b"></div>
                <div class="col shift-b"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col shift-c"></div>
                <div class="col shift-c"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
            </div>
            <div class="row">
              <div class="left">Employee 2</div>
              <div class="cols">
                <div class="col shift-a"></div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col shift-b"></div>
                <div class="col shift-b"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col shift-c"></div>
                <div class="col shift-c"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
            </div>
            <div class="row">
              <div class="left">Employee 3</div>
              <div class="cols">
                <div class="col shift-a"></div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col shift-b"></div>
                <div class="col shift-b"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col shift-c"></div>
                <div class="col shift-c"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col">off</div>
                <div class="col">off</div>
                <div class="col shift-a"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
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
  name: "shifts",
  components: {
    addShiftForm,
    editShiftForm,
    modal,
  },
  computed: {
    ...mapState(["chosenForm"]),
    ...mapGetters(["getChosenForm"]),
  },
  methods: {
    setChosenForm(formName) {
      this.$store.commit("setChosenForm", formName);
    },
  },
};
</script>
<style>
.shifts__wrapper {
  margin-top: 1rem;
}
.shifts__wrapper .table__row {
  border-bottom: 3px solid red;
}
.shifts__wrapper .table{
  min-width: 70rem;
}

.shifts__wrapper .table__row {
  flex-direction: column;
}
.rows {
  min-width: 65rem;
}
.rows .row {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.shifts__wrapper .table__row .row .col {
  display: grid;
  place-items: center;
  font-size: 0.6rem;
}
.table__row .row .left{
  width: 10rem;
  display: grid;
  place-items: center;
}
.shift-a {
  background: rgb(188, 188, 95);
}
.shift-b {
  background: rgb(164, 204, 164);
}
.shift-c {
  background: rgb(30, 149, 89);
}
.on-call {
  background: rgb(120, 183, 207);
}

.cols {
  width: calc(100% - 10rem);
  display: flex;
}
</style>
