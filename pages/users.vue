<template>
  <section class="users__wrapper">
    <h1>Happy to deploy Dynamic</h1>
    <h1 class="sec__title">Users</h1>
    <div class="users">
      <div class="user" v-for="user in getUsers" :key="user.id">
        <h2><span>Name : </span>{{ user.name }}</h2>
        <p><span>E-Mail : </span>{{ user.email }}</p>
        <p>Role : {{ user.role }}</p>
        <button class="approve-btn" @click="approveUser(user.email)">
          Approve
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "users",
  computed: {
    ...mapGetters(["getUsers"]),
  },
  mounted() {
    this.$store.dispatch("getData", "users");
  },
  methods: {
    approveUser(email) {
      this.$store.dispatch("approveUser", email);
    },
  },
};
</script>
<style>
.users__wrapper {
  width: 90%;
  margin: auto;
  padding: 1.5rem 0;
}
.users {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.user p,
.user h2 {
  font-size: 0.9rem;
  color: #dbdddfdf;
}
.user span {
  color: #fff;
  font-size: 1.1rem;
}
.user {
  background: #091457;
  margin: 1rem;
  padding: 1.3rem 1rem;
  border-radius: 1rem;
}

.approve-btn {
  padding: 0.2rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.6rem;
  background: #162682;
  border: 1px solid #162682;
}
.approve-btn:hover {
  background: #fff;
  color: #162682;
}
</style>
