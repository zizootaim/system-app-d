<template>
  <div class="Home">
    <section class="panar">
      <h1>
        Hi-TECH CRIME <span style="color: #0024ec">TRENDS 2021/2022</span>
      </h1>
      <p class="para">A Look At The Clobal Cyber Threat LandScape</p>
    </section>

    <div class="info">
      <div v-for="section in homeSections" :key="section.name">
        <h3>{{ section.name }}</h3>
        <p>{{ section.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["homeSections"]),
  },

  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  },
  methods: {
    sendMessage() {},
  },

  name: "IndexPage",
};
</script>
<style>
.para {
  font-weight: bold;
}
.panar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  height: calc(85vh / 2);
  text-align: center;
}
.info {
  padding: 0 1rem;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  gap: 1.5rem;
}
.info div {
  text-align: left;
  padding: 5px;
}
.main {
  font-size: 18px;
}
h1 {
  margin-bottom: 0;
}

@media screen and (max-width: 769px) {
  .panar {
    padding: 15px;
  }
  .info {
    padding: 0;
    width: 90%;
    flex-wrap: wrap;
    padding-bottom: 2rem;
  }
  .info div {
    border-radius: 10px;
  }
}

a {
  color: #fff;
}
</style>
