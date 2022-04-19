<template>
  <section class="settings__wrapper">
    <h1 class="sec__title">Settings</h1>

    <button class="form-btn" @click="showHomeModal">Home Settings</button>
    <modal
      v-if="homeFormModal"
      class="secform"
      v-on:close="homeFormModal = false"
    >
      <home-content-form />
    </modal>

    <button class="form-btn" @click="showUsersModal">Show Users</button>

    <modal v-if="usersModal" class="usersmodal" v-on:close="usersModal = false">
      <div class="users" v-if="getUsers.length > 1">
        <h1 class="sec__title">Users</h1>
        <div class="table__wrapper">
          <div class="table">
            <div class="table__row header">
              <div class="col">
                <h4>Name</h4>
              </div>
              <div class="col">
                <h4>Email</h4>
              </div>
              <div class="col">
                <h4>Role</h4>
              </div>
              <div class="col">
                <h4>Approved</h4>
              </div>
            </div>

            <div class="table__row" v-for="user in getUsers" :key="user.id">
              <div class="row top-row" v-if="user.role != 'admin'">
                <div class="col">
                  <p>
                    <span>{{ user.name }}</span>
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span style="text-transform: none;">{{ user.email }}</span>
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span>{{ user.role }}</span>
                  </p>
                </div>
                <div class="col">
                  <!-- <button
                    v-if="getRole == 'admin' && user.role != 'admin'"
                    class="approve-btn"
                    @click="(event) => approveUser(user.email, event)"
                  >
                    {{ user.role == "Employee" ? "approved" : "approve" }}
                    <BaseSpinner />
                  </button> -->
                  <!-- <button
                    v-if="user.role == 'visitor'"
                    class="approve-btn"
                    @click="approveUser(user.email)"
                  >
                    approve
                  </button>
                  <button
                    v-if="user.role != 'visitor'"
                    class="disapprove-btn"
                    @click="disapproveUser(user.email)"
                  >
                    disapprove
                  </button> -->
                  <label class="switch" @click="changeRole(user)">
                    <input type="checkbox" />
                    <span
                      :class="`slider round${
                        user.role == 'Employee' ? ' approved' : ''
                      }`"
                    ></span>
                    <span :class="`user-status ${user.role == 'Employee' ? 'enabled' : 'disabled'
                      }`">{{user.role == 'Employee' ? 'Enabled' : 'Disabled'}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import BaseSpinner from "../components/baseSpinner.vue";
import modal from "../components/modal.vue";
import HomeContentForm from "../components/settings/homeContentForm.vue";

export default {
  name: "users",
  data() {
    return {
      loading: false,
      usersModal: false,
      homeFormModal: false,
    };
  },
  computed: {
    ...mapGetters(["getUsers", "getRole"]),
  },
  mounted() {
    this.$store.dispatch("getData", "users");
  },
  components: {
    BaseSpinner,
    modal,
    HomeContentForm,
  },
  methods: {
    changeRole(user) {
      console.log(user);
      const { email, role } = user;
      if (role == "visitor") this.approveUser(email);
      else this.disapproveUser(email);
    },
    async approveUser(email) {
      this.loading = true;
      let response = await this.$store.dispatch("approveUser", email);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    async disapproveUser(email) {
      this.loading = true;
      let response = await this.$store.dispatch("disApproveUser", email);
      this.loading = false;
    },
    showHomeModal() {
      this.homeFormModal = true;
    },
    showUsersModal() {
      this.usersModal = true;
    },
  },
};
</script>
<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 130px;
  height: 34px;
}
.user-status{
  position: absolute;
  color: #fff ;
  top: 12%;

}
.enabled{
  left: 1.2rem;
}
.disabled{
  right: 1.2rem;
}


/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(201, 13, 13);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}


.slider.approved {
  background-color: green;
}


.slider.approved {
  box-shadow: 0 0 1px green;
}

.slider.approved::before {
  -webkit-transform: translateX(95px);
  -ms-transform: translateX(95px);
  transform: translateX(95px);

}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.sec__title {
  text-align: center;
}
.settings__wrapper {
  width: 90%;
  margin: auto;
  display: grid;
  place-items: center;
  gap: 2rem;
  padding: 1.5rem 0;
}
.settings__wrapper .form-btn {
  width: 30%;
}
.users .table__row.header {
  background-color: #0b2094;
}

.users .table__row:not(.table__row.header) {
  background: #ffffff;
}

.users .table__row .col p {
  color: #000;
}

.users .col {
  display: grid;
  place-items: center;
}
.users .table__row .col p,
.users .table__row .col h4 {
  max-height: unset;
  max-width: unset;
}

.approve-btn,
.disapprove-btn {
  width: 8rem;
  padding: 0.2rem 0;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.6rem;
  background: #162682;
  border: 1px solid #162682;
  text-transform: capitalize;
  position: relative;
}
.disapprove-btn {
  background: #c34b47;
  border-color: #c34b47;
}
.approve-btn .loader {
  width: 15px;
  height: 15px;
  padding: 0.3rem;
  margin-right: 0.3rem;
  display: none;
}
.approve-btn:hover,
.disapprove-btn:hover {
  background: #fff;
  color: #162682;
}
.disapprove-btn:hover {
  color: #c34b47;
}
</style>
