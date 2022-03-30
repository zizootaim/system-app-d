<template>
  <section class="wiki">
    <article class="wiki__content-wrapper">
      <div class="wiki__content">
        <div class="wiki__menu-wrapper">
          <div class="menu__icon" v-on:click="displaySideMenu()">
            <i class="fas fa-arrow-right"></i>
            <span>Menu</span>
          </div>
          <div :class="showSideMenu ? 'wiki__menu' : 'wiki__menu show'">
            <div
              @click="changeWikiPage(item.section)"
              :class="
                item.subPages ? 'menu__item submenu-wrapper' : 'menu__item'
              "
              v-for="item in wikiSections"
              :key="item.section"
            >
              <button @click="showMenu($event)">
                <i :class="item.class"></i>
                {{ item.section }}
                <i
                  class="fas fa-angle-down sub-menu-icon"
                  v-if="
                    item.section == 'Use Case Framework' ||
                    item.section == 'Shift Handover'
                  "
                ></i>
              </button>
              <ul
                class="sub-menu"
                v-if="
                  item.section == 'Use Case Framework' ||
                  item.section == 'Shift Handover'
                "
              >
                <li
                  v-for="s in item.subPages"
                  :key="s.name"
                  @click="subCatFunc(s.callFunc)"
                >
                  {{ s.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="wiki__items" v-if="wikiPage == ''">
          <div
            @click="changeWikiPage(wikiItem.section)"
            class="wiki__item"
            v-for="wikiItem in wikiSections"
            :key="wikiItem.section"
          >
            <h3 class="wiki__item-title">{{ wikiItem.section }}</h3>
            <ul>
              <li v-for="i in 3" :key="i">Lorem ipsum dolor sit amet.</li>
            </ul>
          </div>
        </div>

  <div class="shiftHand" v-if="wikiPage == 'Shift Handover'">
    <h1>Hello Shift Handover</h1>
  </div>
        <div class="useCase" v-if="wikiPage == 'Use Case Framework'">
          <div class="use-case__into" v-if="useCaseChosenCat == ''">
            <div class="use-case__panar">
              <h1 class="title">business risks</h1>
              <h1 class="title">use cases</h1>
              <h1 class="title">detection rules</h1>
            </div>
            <p>Use Cases are driven from Business(Risk,Threates,Compliance).</p>
            <p>
              Use Cases Top-down tracebility to determine the completeness of
              implementation and demonstrable risk reduction.
            </p>
            <p>
              Use Cases Bottom-up tracebility for contextualizing use case
              output and business alignment.
            </p>
          </div>
          <div v-if="useCaseChosenCat == 'useCase'">
            <h1 class="sec__title">Use Case Intro</h1>

            <button class="form-btn" @click="setChosenForm('useCase')">
              + add
            </button>
            <loader class="loaderComp" />
            <div class="service-cards-wrapper">
              <div
                class="service-card"
                v-for="useCaseCard in getUseCase"
                :key="useCaseCard.type"
              >
                <p v-for="(value, name) in useCaseCard" :key="name">
                  {{ name }}: <span> {{ value }}</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="useCaseChosenCat == 'advisory'">
            <h1 class="sec__title">Advisory</h1>

            <button class="form-btn" @click="setChosenForm('advisory')">
              + add
            </button>
            <loader class="loaderComp" />
            <div class="service-cards-wrapper">
              <div
                class="service-card"
                v-for="advisoryCard in getAdvisory"
                :key="advisoryCard.name"
              >
                <p v-for="(value, name) in advisoryCard" :key="name">
                  {{ name }}: <span>{{ value }}</span>
                </p>
              </div>
            </div>
          </div>
          <div v-if="useCaseChosenCat == 'serviceCatalog'">
            <h1 class="sec__title">Service Catalog</h1>
            <button class="form-btn" @click="setChosenForm('serviceCatalog')">
              + add
            </button>
            <loader class="loaderComp" />
            <div class="service-cards-wrapper">
              <div
                class="service-card"
                v-for="serviceCard in getServiceCatalog"
                :key="serviceCard.name"
              >
                <div v-for="(value, name) in serviceCard" :key="name">
                  <p>
                    {{ name }} : <span> {{ value }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal
        class="secform"
        v-on:close="setChosenForm('')"
        v-if="getChosenForm"
      >
        <use-case-form
          :formTitle="getChosenForm"
          v-if="getChosenForm == 'useCase'"
        />
        <serviceCatalogeForm
          :formTitle="getChosenForm"
          v-if="getChosenForm == 'serviceCatalog'"
        />
        <advisoryForm
          :formTitle="getChosenForm"
          v-if="getChosenForm == 'advisory'"
        />
      </modal>
    </article>
  </section>
</template>

<script>
// Use Case Framework Shift Handover
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import wikiPDF from "@/components/wikiPDF.vue";
import modal from "@/components/modal.vue";
import advisoryForm from "@/components/advisoryForm.vue";
import serviceCatalogeForm from "@/components/serviceCatalogeForm.vue";
import baseSpinner from "@/components/baseSpinner.vue";

import UseCaseForm from "../components/useCaseForm.vue";
import loader from "../components/loader.vue";

export default {
  data() {
    return {
      showSideMenuStatus: false,
      wikiSelectedPage: "",
      showSideMenu: "",
      wikiPage: "",
      useCaseChosenCat: "",
      newAddedObjects: [],
    };
  },
  components: {
    wikiPDF,
    modal,
    UseCaseForm,
    serviceCatalogeForm,
    advisoryForm,
    baseSpinner,
    loader,
  },

  computed: {
    ...mapState(["wikiSections", "chosenForm"]),
    ...mapGetters([
      "getUseCase",
      "getAdvisory",
      "getServiceCatalog",
      "getChosenForm",
      "getNewAddedObjects",
    ]),
    getAllUseCases() {
      let test = [];
      test = [...this.getUseCase, ...this.newAddedObjects];
      return test;
    },
  },

  name: "wikiPage",

  methods: {
    subCatFunc(catName) {
      if (["useCase", "advisory", "serviceCatalog"].includes(catName)) {
        this.changeUseCaseCat(catName);
        Array.from(document.querySelectorAll(".sub-menu li")).forEach((li) => {
          li.classList.remove("active");
        });
        event.target.classList.add("active");
      }
    },
    displaySideMenu() {
      this.showSideMenu = !this.showSideMenu;
    },
    changeWikiPage(page) {
      console.log("change" + " " + page);
      this.wikiSelectedPage = page;
    },
    showMenu(event) {
      const parent = event.target.parentElement;
      const list = parent.querySelector(".sub-menu");
      if (list) {
        let height = list.getBoundingClientRect().height;
        if (height > 17) {
          list.style.height = "0px";
          list.classList.remove("show");

          return;
        }
        height = 10;
        Array.from(parent.querySelector(".sub-menu").children).forEach((li) => {
          height += li.getBoundingClientRect().height;
        });
        document.querySelectorAll(".menu__item .sub-menu").forEach((ul) => {
          ul.style.height = "0";
        });
        list.classList.add("show");
        list.style.height = `${height}px`;
      } else return;
    },
    setChosenForm(formName) {
      this.$store.commit("setChosenForm", formName);
    },
    async changeUseCaseCat(val) {
      if (val.length && !this.$store.state[val].length) {
        this.useCaseChosenCat = val;

        let response = await this.$store.dispatch("getData", val);
        if (response) {
          document.querySelector(".loaderComp").style.display = "none";
        }
      }
    },
  },
  watch: {
    showSideMenuStatus(newValue, oldValue) {
      this.showSideMenu = newValue;
    },
    wikiSelectedPage(newValue, oldValue) {
      this.wikiPage = newValue;
    },
    changeUseCaseCat(newValue) {
      this.useCaseChosenCat = newValue;
      document.querySelector(".loaderComp").style.display = "inline";
    },
  },
};
</script>
<style>
.menu__icon {
  color: #fff;
  letter-spacing: 0.06rem;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #fff;
  width: 6rem;
  display: none;
}
button {
  color: #fff;
  background: inherit;
}
.wiki__content-wrapper {
  display: flex;
  flex-direction: column;
}
.wiki__content {
  display: flex;
  width: 100%;
}
.wiki__menu {
  display: flex;
  flex-direction: column;
  width: 0%;
  height: 100%;
  opacity: 0;
  transition: width 0.3s;
  overflow: hidden;
  height: 89vh;
}
.wiki__menu.show {
  opacity: 1;
  width: 100%;
}
.wiki__menu-wrapper {
  width: 206px;
}
.wiki__menu .menu__item {
  width: 100%;
}
.wiki__menu .menu__item button {
  padding: 0.8rem 0.5rem;
  text-align: left;
  background: none;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  transition: 0.3s;
  border-bottom: 1px solid #fff;
  position: relative;
}
.sub-menu-icon {
  position: absolute;
  right: -0.5rem;
  top: 38%;
  bottom: 40%;
}
.wiki__menu .menu__item button i {
  margin-right: 0.5rem;
}
.wiki__menu .menu__item button:hover {
  background: #eee;
  color: #000;
}
.wiki__items {
  width: 78%;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
}
.wiki__item {
  width: 260px;
  height: 160px;
  background: #000a4a;
  margin: 1rem;
  padding: 5px 1.3rem;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
}
.wiki__item:hover {
  transform: scale(1.1);
}
.wiki__item-title {
  color: #fff;
  padding: 1rem 0.5rem 0.5rem;
  font-size: 1.1rem;
}

.wiki__item ul {
  padding: 0 0.5rem;
  width: 80%;
  margin: auto;
}
.wiki__item ul li {
  text-align: left;
  font-size: 0.8rem;
  color: #fff;
  margin-top: 0.5rem;
}

.sub-menu {
  color: #fff;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: 0.3s;
  border-top: 1px solid #fff;
}
.sub-menu.show {
  border-top: 0px;
  padding: 0.5rem;
}
.sub-menu li {
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
}
.sub-menu li.active {
  color: #9c8fff;
}
.sub-menu li:hover {
  color: #566cff;
}
.sub-menu li:last-child {
  margin: 0;
  border-bottom: 0.1rem solid #fff;
}
.menu__item.submenu-wrapper button {
  border-bottom: none;
}
.use-case__panar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 2rem;
}
.use-case__panar .title {
  width: 12rem;
  padding: 0.7rem;
  text-transform: capitalize;
  text-align: center;
}
.use-case__panar .title:first-child {
  background: #000a4a;
  transform: translateX(-2rem);
}
.use-case__panar .title:nth-child(2) {
  background: #2c3eaf;
  margin: 0.6rem 0;
  transform: translateX(2rem);
}
.use-case__panar .title:nth-child(3) {
  background: #11207e;
  transform: translateX(6rem);
}
.use-case__into p {
  margin-bottom: 1rem;
}

/* Cards */
.useCase {
  width: 80%;
  margin: 1rem auto;
}
.form-btn {
  background: #40358e;
  padding: 0.2rem 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.2rem;
  text-transform: capitalize;
  border: 1px solid #40358e;
}
.sec__title {
  text-align: center;
  font-size: 1.2rem;
}
.form-btn:hover {
  background: #fff;
  color: #40358e;
}
.service-cards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-height: 33rem;
  overflow: auto;
}
.service-cards-wrapper::-webkit-scrollbar-thumb {
  color: #40358e;
  background: #40358e;
}

.service-cards-wrapper::-webkit-scrollbar-track {
  border: 1px solid black;
  background-color: #40358e;
}

.service-cards-wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: #40358e;
}

.service-cards-wrapper::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #ffffff;
}
.service-card {
  background: #40358e;
  padding: 0.5rem;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.service-card p {
  color: #fff;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.5rem;
  text-transform: capitalize;
}
.service-card p span {
  color: #ffffff;
}
@media screen and (max-width: 1025px) {
  .useCase {
    width: 70%;
  }
  .service-cards-wrapper {
    grid-template-columns: 1fr;
  }
}
@media screen and (max-width: 769px) {
  .wiki__content {
    flex-direction: column;
    height: auto;
  }
  .wiki__items {
    margin-top: 1rem;
    width: 90%;
  }
  .wiki__item {
    padding: 5px 1rem;
    margin: 0 1rem 1rem;
  }
  .wiki__menu-wrapper {
    width: 100%;
    height: 100%;
  }
  .wiki__menu {
    height: 0;
    transform: scale(0);
    transition: transform 0.4s;
  }
  .wiki__menu.show {
    transform: scale(1);
    width: 90%;
    margin: auto;
    height: 100%;
    border: none;
    background: none;
  }
  .wiki__menu .menu__item button {
    padding-bottom: 1rem;
  }
  .menu__icon {
    display: block;
    margin-left: 1rem;
  }
  .useCase {
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .service-card {
    grid-template-columns: 1fr;
  }
}
</style>
