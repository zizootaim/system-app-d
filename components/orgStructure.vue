<template>
  <div class="container">
    <div class="staff__wrapper">
      <div class="parent" v-if="getStaff.soc">
        <div class="rectangle" v-for="(t, index) in getStaff.soc" :key="index">
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-edit edit-btn"
            @click="() => showEditForm(t)"
          ></i>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-trash-alt delete-btn"
            @click="() => deleteMember(t.id)"
          ></i>
          <div class="bg"></div>
          <manSvg />
          <div class="person__info">
            <h4>{{ t.Name }}</h4>
            <p>
              {{ t.Title }}
            </p>
            <div class="person__data">
              <p>{{ t.Email }}</p>
              <p><span>Phone: </span> {{ t.Phone }}</p>
              <p><span>Mobile: </span> {{ t.Mobile }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="parent" v-if="getStaff.a__3">
        <div class="rectangle" v-for="(t, index) in getStaff.a__3" :key="index">
          <div class="bg"></div>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-edit edit-btn"
            @click="() => showEditForm(t)"
          ></i>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-trash-alt delete-btn"
            @click="() => deleteMember(t.id)"
          ></i>

          <manSvg />
          <div class="person__info">
            <h4>{{ t.Name }}</h4>
            <p>
              {{ t.Title }}
            </p>
            <div class="person__data">
              <p>{{ t.Email }}</p>
              <p><span>Phone: </span> {{ t.Phone }}</p>
              <p><span>Mobile: </span> {{ t.Mobile }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="parent" v-if="getStaff.a__2">
        <div class="rectangle" v-for="(t, index) in getStaff.a__2" :key="index">
          <div class="bg"></div>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-edit edit-btn"
            @click="() => showEditForm(t)"
          ></i>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-trash-alt delete-btn"
            @click="() => deleteMember(t.id)"
          ></i>

          <manSvg />
          <div class="person__info">
            <h4>{{ t.Name }}</h4>
            <p>
              {{ t.Title }}
            </p>
            <div class="person__data">
              <p>{{ t.Email }}</p>
              <p><span>Phone: </span> {{ t.Phone }}</p>
              <p><span>Mobile: </span> {{ t.Mobile }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="parent" v-if="getStaff.a__1">
        <div class="rectangle" v-for="(t, index) in getStaff.a__1" :key="index">
          <div class="bg"></div>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-edit edit-btn"
            @click="() => showEditForm(t)"
          ></i>
          <i
            v-if="
              (getRole == 'admin' || getRole == 'Employee') &&
              getPermission == 'write'
            "
            class="fas fa-trash-alt delete-btn"
            @click="() => deleteMember(t.id)"
          ></i>

          <manSvg />
          <div class="person__info">
            <h4>{{ t.Name }}</h4>
            <p>
              {{ t.Title }}
            </p>
            <div class="person__data">
              <p>{{ t.Email }}</p>
              <p><span>Phone: </span> {{ t.Phone }}</p>
              <p><span>Mobile: </span> {{ t.Mobile }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      class="secform"
      v-on:close="setChosenForm('')"
      v-if="showModal"
      formTitle="Edit Staff"
    >
      <edit-form :editingUser="editingUser" />
    </modal>
  </div>
</template>

<script>
import manSvg from "./manSvg.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

import Modal from "./modal.vue";
import EditForm from "./staff/editForm.vue";

export default {
  data() {
    return { showModal: false, editingUser: {}, checkStaff: false };
  },
  components: {
    manSvg,
    Modal,
    EditForm,
  },
  computed: {
    ...mapState(["wikiSections", "chosenForm"]),

    ...mapGetters(["getStaff", "getRole", "getPermission"]),
  },

  mounted() {
    this.$store.dispatch("getData", "staff");
    this.checkLines();
  },
  watch:{
    getStaff(){
      this.checkLines();
    }
  },
  methods: {
    checkLines() {
      const parents = Array.from(document.querySelectorAll(".parent"));
      parents.forEach(p => {
        
        Array.from(p.children).forEach(r => {
          const top =  r.getBoundingClientRect().top - p.getBoundingClientRect().top ;
          console.log(top);
         if(top > 35) r.classList.add('no-line');
        })

    
      
      })
     
      
    },
    setChosenForm(formName) {
      this.showModal = false;
      this.$store.commit("setChosenForm", formName);
    },
    showEditForm(user) {
      this.showModal = true;
      this.editingUser = user;
      console.log(user);
    },
    async deleteMember(id) {
      console.log(id);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("id", id);
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      fetch("https://beapis.herokuapp.com/api/Staff", requestOptions)
        .then((res) => res.text())
        .then((result) => {
          console.log(result);
          this.$store.dispatch("getData", "staff");
          this.checkLines();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
}
.staff__wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
}
.staff__wrapper .parent {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.rectangle {
  padding: 0.5rem;
  box-shadow: 0 5px 15px rgba(26, 23, 23, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin-top: 0.5rem;
}

.edit-btn,
.delete-btn {
  color: #fff;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.delete-btn {
  left: 2rem;
  color: rgb(163, 21, 21);
}
.person__info {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;

  text-align: center;
}
.person__info p {
  margin: 0.2rem auto;
  width: 100%;
  font-size: 0.8rem;
}
.person__info h4 {
  font-size: 1rem;
}
.person__data {
  display: flex;
  flex-direction: column;
}
.person__data p {
  font-size: 0.74rem;
  display: flex;
  justify-content: space-between;
  justify-self: flex-start;
  align-self: flex-start;
}

.rectangle {
  width: 260px;
  height: 130px;
  background: #010a3d;
  position: relative;
  margin: 0.8rem 1rem;
}
.light-mode .container *::before {
  background: #010a3d;
}
.light-mode .person__info h4 {
  color: #fff;
}
.parent:not(.parent:nth-child(1)) {
  border-top: 2px solid #fff;
  padding-top: 1rem;
  width: fit-content;
  position: relative;
  margin: auto;
}
.light-mode .parent:not(.parent:nth-child(1)) {
  border-color: #010a3d;
}
.rectangle:not(.parent:first-child .rectangle:first-of-type)::before,
.parent::before {
  position: absolute;
  content: "";
  width: 2px;
  top: -1.8rem;
  left: 0;
  right: 0;
  margin: auto;
  height: 1.8rem;
  background: #fff;
}
.rectangle.no-line::before {
  display: none;
  background: #fff;
}
.light-mode
  .rectangle:not(.parent:first-child .rectangle:first-of-type)::before,
.light-mode .parent::before {
  background: #010a3d;
}
.parent:first-of-type .rectangle {
  box-shadow: 0px 2px 6px 2px blue;
}
.parent:nth-child(2) .rectangle {
  box-shadow: 0px 2px 6px 2px gray;
}
.parent:nth-child(3) .rectangle {
  box-shadow: 0px 2px 6px 2px orange;
}
.parent:nth-child(4) .rectangle {
  box-shadow: 0px 2px 6px 2px skyblue;
}

@media screen and (max-width: 426px) {
  .person__info p {
    width: 96%;
    margin: 0.3rem auto;
  }
  .person__data {
    flex-wrap: wrap;
  }
}
</style>
