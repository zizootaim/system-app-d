<template>
  <section class="settings__wrapper">
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
            <div class="col">
              <h4>Editor</h4>
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
                  <span style="text-transform: none">{{ user.email }}</span>
                </p>
              </div>
              <div class="col">
                <p>
                  <span>{{ user.role }}</span>
                </p>
              </div>
              <div class="col">
                <label class="switch" @click="changeRole(user)">
                  <input type="checkbox" />
                  <span
                    :class="`slider round${
                      user.role == 'Employee' ? ' approved' : ''
                    }`"
                  ></span>
                  <span
                    :class="`user-status ${
                      user.role == 'Employee' ? 'enabled' : 'disabled'
                    }`"
                    >{{
                      user.role == "Employee" ? "Enabled" : "Disabled"
                    }}</span
                  >
                </label>
              </div>
              <div class="col">
                <label class="switch" @click="changePerm(user)">
                  <input type="checkbox" />
                  <span
                    :class="`slider round${
                      user.permission == 'write' ? ' approved' : ''
                    }`"
                  ></span>
                  <span
                    :class="`user-status ${
                      user.permission == 'write' ? 'enabled' : 'disabled'
                    }`"
                    >{{
                      user.permission == "write" ? "Enabled" : "Read Only"
                    }}</span
                  >
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="getUsers.length == 1">
      <h3>no data to show.</h3>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "users",
  computed: {
    ...mapGetters(["getUsers", "getRole"]),
  },
  mounted() {
    this.$store.dispatch("getData", "users");
  },

  methods: {
    changeRole(user) {
      console.log(user);
      const { email, role } = user;
      if (role == "visitor") this.approveUser(email);
      else this.disapproveUser(email);
    },
    async approveUser(email) {
      let response = await this.$store.dispatch("changeUserDate", {
        email,
        type: "approve",
      });
    },

    async disapproveUser(email) {
      let response = await this.$store.dispatch("changeUserDate", {
        email,
        type: "disapprove",
      });
      this.readPerm(email);
    },
    changePerm(user) {
      if (user.permission == "read") {
        this.writePerm(user.email);
      } else {
        this.readPerm(user.email);
      }
    },
    async writePerm(email) {
      let response = await this.$store.dispatch("changeUserDate", {
        email,
        type: "write",
      });
    },
    async readPerm(email) {
      let response = await this.$store.dispatch("changeUserDate", {
        email,
        type: "read",
      });
    },
  },
};
</script>
<style>
.settings__wrapper {
  width: 95%;
  margin-left: 1rem;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}
.users .switch {
  width: 130px;
  height: 34px;
}
.user-status {
  position: absolute;
  color: #fff;
  top: 12%;
}
.enabled {
  left: 1.2rem;
}
.disabled {
  right: .75rem;
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
  height: 18px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.users .slider::before {
  height: 26px;
  width: 26px;
}

.slider.approved,
.switch:not(.users .switch) input:checked + .slider {
  background-color: green;
}

.slider.approved,
.switch:not(.users .switch) input:checked + .slider {
  box-shadow: 0 0 1px green;
}
.switch:not(.users .switch) input:checked + .slider::before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}
.users .slider.approved::before {
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

@media screen and (max-width: 800px) {
  .users .form-btn {
    width: auto;
  }
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
