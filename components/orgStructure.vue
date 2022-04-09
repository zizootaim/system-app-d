<template>
  <div class="container" v-if="getStaff.length >= 1">
    <div class="level-1 rectangle" v-for="(t,index) in getStaff[0]" :key="index">
      <i
        class="fas fa-edit edit-btn"
        @click="() => showEditForm(t)"
      ></i>

      <manSvg />
      <div class="person__info">
        <h4>{{ t.Name }}</h4>
        <p>
          {{ t.Title }}
        </p>
        <div class="person__data">
          <p>{{ t.Email }}</p>
          <p><span>Phone : </span> {{ t.Phone }}</p>
          <p><span>Mobile : </span> {{ t.Mobile }}</p>
        </div>
      </div>
    </div>
    <ol class="level-2-wrapper">
      <li>
        <div class="level-2 rectangle">
          <i
            class="fas fa-edit edit-btn"
            @click="() => showEditForm(getStaff[1].parent)"
          ></i>

          <manSvg />
          <div class="person__info">
            <h4>{{ getStaff[1].parent.Name }}</h4>
            <p>
              {{ getStaff[1].parent.Title }}
            </p>
            <div class="person__data">
              <p>{{ getStaff[1].parent.Email }}</p>
              <p><span>Phone : </span> {{ getStaff[1].parent.Phone }}</p>
              <p><span>Mobile : </span> {{ getStaff[1].parent.Mobile }}</p>
            </div>
          </div>
        </div>
        <ol class="level-3-wrapper">
          <li>
            <div
              class="level-3 rectangle"
              v-for="s in getStaff[1].childs"
              :key="s.id"
            >
              <i
                class="fas fa-edit edit-btn"
                @click="() => showEditForm(s)"
              ></i>

              <manSvg />
              <div class="person__info">
                <h4>{{ s.Name }}</h4>
                <p>
                  {{ s.Title }}
                </p>
                <div class="person__data">
                  <p>{{ s.Email }}</p>
                  <p><span>Phone : </span> {{ s.Phone }}</p>
                  <p><span>Mobile : </span> {{ s.Mobile }}</p>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </li>
      <li>
        <div class="level-2 rectangle">
          <i
            class="fas fa-edit edit-btn"
            @click="() => showEditForm(getStaff[2].parent)"
          ></i>

          <manSvg />
          <div class="person__info">
            <h4>{{ getStaff[2].parent.Name }}</h4>
            <p>
              {{ getStaff[2].parent.Title }}
            </p>
            <div class="person__data">
              <p>{{ getStaff[2].parent.Email }}</p>
              <p><span>Phone : </span> {{ getStaff[2].parent.Phone }}</p>
              <p><span>Mobile : </span> {{ getStaff[2].parent.Mobile }}</p>
            </div>
          </div>
        </div>
        <ol class="level-3-wrapper">
          <li>
            <div
              class="level-3 rectangle"
              v-for="s in getStaff[2].childs"
              :key="s.id"
            >
              <i
                class="fas fa-edit edit-btn"
                @click="() => showEditForm(s)"
              ></i>

              <manSvg />
              <div class="person__info">
                <h4>{{ s.Name }}</h4>
                <p>
                  {{ s.Title }}
                </p>
                <div class="person__data">
                  <p>{{ s.Email }}</p>
                  <p><span>Phone : </span> {{ s.Phone }}</p>
                  <p><span>Mobile : </span> {{ s.Mobile }}</p>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </li>
    </ol>
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
    return { showModal: false, editingUser: {} };
  },
  components: {
    manSvg,
    Modal,
    EditForm,
  },
  computed: {
    ...mapState(["wikiSections", "chosenForm"]),

    ...mapGetters(["getStaff"]),
  },
  mounted() {
    this.$store.dispatch("getData", "staff");
  },
  methods: {
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
      //   await fetch(state.url[dataObj.apiName], {
      //   method: "POST",
      //   headers: { "Content-Type": " application/json" },
      //   body: JSON.stringify(dataObj.body),
      // })
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
        })
        .catch((err) => console.log(err));

      this.$store.dispatch("getData", "staff");
    },
  },
};
</script>

<style scoped>
.container div:first-of-type .level-1::before {
  height: 50px;
}
.container {
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
}

.rectangle {
  position: relative;
  padding: 0.5rem;
  box-shadow: 0 5px 15px rgba(26, 23, 23, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
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

/* LEVEL-1 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-1 {
  width: 25%;
  margin: 0 auto 40px;
}

.level-1::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}
.level-1::before{
  height: 40px;
}
.level-1:last-of-type::before{
  height: 20px;
}

/* LEVEL-2 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-2-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.level-2-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 25%;
  width: 50%;
  height: 2px;
  background: rgb(255, 255, 255);
}

.level-2-wrapper::after {
  display: none;
  content: "";
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: calc(100% + 20px);
  height: 2px;
  background: rgb(255, 255, 255);
}

.level-2-wrapper li {
  position: relative;
}

.level-2-wrapper > li::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

.level-2 {
  width: 70%;
  margin: 0 auto 40px;
}

.level-2::before,
.level-3::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

.level-3:last-child:before {
  display: none;
}

.level-2::after {
  display: none;
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-100%, -50%);
  width: 20px;
  height: 2px;
  background: rgb(255, 255, 255);
}

/* LEVEL-3 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-3-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  grid-column-gap: 20px;
  width: 80%;
  margin: 0 auto;
}

.level-3-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: calc(25% - 5px);
  width: calc(50% + 10px);
  height: 2px;
  background: rgb(255, 255, 255);
}

.level-3-wrapper > li::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

.level-3 {
  margin-bottom: 20px;
}

/* MQ STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
@media screen and (max-width: 700px) {
  .rectangle {
    padding: 20px 10px;
  }

  .level-1,
  .level-2 {
    width: 100%;
  }

  .level-1 {
    margin-bottom: 20px;
  }

  .level-1::before,
  .level-2-wrapper > li::before {
    display: none;
  }

  .level-2-wrapper,
  .level-2-wrapper::after,
  .level-2::after {
    display: block;
  }

  .level-2-wrapper {
    width: 90%;
    margin-left: 10%;
  }

  .level-2-wrapper::before {
    left: -20px;
    width: 2px;
    height: calc(100% + 40px);
  }

  .level-2-wrapper > li:not(:first-child) {
    margin-top: 50px;
  }
}

.level-1 {
  width: 35%;
}

.level-3-wrapper {
  width: 70%;
  grid-template-columns: 1fr;
}
.level-2 {
  width: 70%;
}
.level-3-wrapper::before {
  display: none;
}
.rectangle {
  width: 260px;
  height: 130px;
  background: #010a3d;
}
.light-mode .container *::before {
  background: #010a3d;
}

@media screen and (max-width: 769px) {
  .level-1 {
    width: 75%;
  }
  .level-2 {
    width: 95%;
  }
  .level-3-wrapper {
    width: 90%;
  }
  .level-4-wrapper {
    width: 90%;
  }
}
@media screen and (max-width: 426px) {
  .level-4-wrapper {
    width: 100%;
  }
  .level-3-wrapper {
    width: 96%;
    grid-template-columns: 1fr;
  }
  .level-1 {
    width: 90%;
  }
  .level-2 {
    width: 100%;
  }
  .level-4-wrapper::before {
    display: none;
  }
  .level-2-wrapper::after {
    display: block;
  }
  .level-2-wrapper {
    margin-left: 8%;
    width: 92%;
  }
  .rectangle {
    width: 100%;
    height: 175px;
  }
  .person__info p {
    width: 96%;
    margin: 0.3rem auto;
  }
  .person__data {
    flex-wrap: wrap;
  }
}
</style>
