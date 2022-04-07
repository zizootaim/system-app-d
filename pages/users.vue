<template>
  <section
    class="users__wrapper"
    v-if="getRole == 'employee' || getRole == 'admin'"
  >
    <h1 class="sec__title">Users</h1>
    <div class="users">
      <div class="user" v-for="user in getUsers" :key="user.id">
        <h2><span>Name : </span>{{ user.name }}</h2>
        <p><span>E-Mail : </span>{{ user.email }}</p>
        <p>Role : {{ user.role }}</p>
        <button :class="user.role == 'Employee' ? 'approve-btn approved' : 'approve-btn'" @click="(event) => approveUser(user.email,event)">
          {{user.role == 'Employee' ? 'approved' : 'approve'}}
          <BaseSpinner />
   
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "users",
  data(){
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters(["getUsers", "getRole"]),
  },
  mounted() {
    this.$store.dispatch("getData", "users");
  },
  methods: {
    approveUser(email,event) {
   
       this.$store.dispatch("approveUser", email);
 const loader = event.target.querySelector('.loader');
 loader.style.display = 'block'
 setTimeout(() => {
loader.style.display = 'none'
event.target.classList.add('approved')
event.target.innerText = 'approved'
 },1000)
    },
  },
};
</script>
<style>
.sec__title{
  text-align: center;
}
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
  width: 8rem;
  padding: .2rem 0;
  text-align: calc();
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.6rem;
  background: #162682;
  border: 1px solid #162682;
  color: #fff;
  text-transform: capitalize;
  position: relative;
}
.approve-btn .loader{
  width: 15px;
  height: 15px;
padding: .3rem;
margin-right: .3rem;
display: none;
}
  .approve-btn:hover {
    background: #fff;
    color: #162682;
  }
.approve-btn.approved{
 cursor: auto;
 background: green;
 pointer-events: none;
}
.approve-btn.approved:hover{
  background: green;
  color: #fff;
}
</style>
