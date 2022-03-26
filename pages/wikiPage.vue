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
              class="menu__item"
              v-for="item in wikiSections"
              :key="item.section"
              @click="$emit('pageSelection',item.section)"
            >
              <button>
                <i :class="item.class"></i>
                {{ item.section }}
              </button>
            </div>
          </div>
        </div>

        <div class="wiki__items">
          <div
            class="wiki__item"
            v-for="wikiItem in wikiSections"
            :key="wikiItem.section"
            @click="$emit('pageSelection',wikiItem.section)"
          >
            <h3 class="wiki__item-title">{{ wikiItem.section }}</h3>
            <ul>
              <li v-for="i in 3" :key="i">Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showSideMenuStatus: false,

      showSideMenu: "",
    };
  },
  computed: {
    ...mapState(["wikiSections"]),
  },

  name: "wikiPage",

  methods: {
    displaySideMenu() {
      this.showSideMenu = !this.showSideMenu;
    },
  },
  watch: {
    showSideMenuStatus(newValue, oldValue) {
      this.showSideMenu = newValue;
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
  height: calc(100vh - --navHeight);
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
}
.wiki__menu .menu__item button i {
  margin-right: 0.5rem;
}
.wiki__menu .menu__item button:hover {
  background: #eee;
  color: #000;
}
.wiki__items {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
}
.wiki__item {
  width: 260px;
  height: 150px;
  background: #000a4a;
  margin: 1rem;
  padding: 15px 1.3rem;
  border-radius: 12px;
  transition: .3s;
  cursor: pointer;
}
.wiki__item:hover{
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

@media screen and (max-width: 769px) {
  .wiki__content {
    flex-direction: column;
    height: auto;
  }
  .wiki__items {
    padding: 1rem;
    width: 90%;
  }
  .wiki__item {
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
}
</style>
