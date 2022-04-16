<template>
  <section class="settings__wrapper">
    <h1 class="sec__title">Settings</h1>

    <button class="form-btn" @click="() => showModal(false)">
      Home Settings
    </button>
    <modal
      v-if="homeFormModal"
      class="secform"
      v-on:close="
        () => {
          this.homeFormModal = false;
        }
      "
    >
      <home-content-form />
    </modal>

    <button class="form-btn" @click="() => showModal(true)">Show Users</button>
    <modal
      v-if="usersModal"
      class="usersmodal"
      v-on:close="
        () => {
          this.usersModal = false;
        }
      "
    >
      <div class="users">
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
                    <span>{{ user.email }}</span>
                  </p>
                </div>
                <div class="col">
                  <p>
                    <span>{{ user.role }}</span>
                  </p>
                </div>
                <div
                  class="col"
                >
                  <!-- <button
                    v-if="getRole == 'admin' && user.role != 'admin'"
                    class="approve-btn"
                    @click="(event) => approveUser(user.email, event)"
                  >
                    {{ user.role == "Employee" ? "approved" : "approve" }}
                    <BaseSpinner />
                  </button> -->
                  <button
                    v-if="user.role == 'visitor'"
                    class="approve-btn"
                    @click="(event) => approveUser(user.email, event)"
                  >
                    approve
                    <BaseSpinner />
                  </button>
                  <button v-if="user.role != 'visitor'" class="approve-btn">
                    disapprove
                    <BaseSpinner />
                  </button>
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
    approveUser(email, event) {
      this.$store.dispatch("approveUser", email);
      const loader = event.target.querySelector(".loader");
      loader.style.display = "block";
      setTimeout(() => {
        loader.style.display = "none";
        event.target.classList.add("approved");
        event.target.innerText = "approved";
      }, 1000);
    },
    showModal(users) {
      if (users) this.usersModal = true;
      else this.homeFormModal = true;
    },
  },
};
</script>
<style>
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
  border: 1px solid #162682;
  display: grid;
  place-items: center;
}
.users .table__row .col p,
.users .table__row .col h4 {
  max-height: unset;
  max-width: unset;
}

.approve-btn {
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
.approve-btn .loader {
  width: 15px;
  height: 15px;
  padding: 0.3rem;
  margin-right: 0.3rem;
  display: none;
}
.approve-btn:hover {
  background: #fff;
  color: #162682;
}
</style>
