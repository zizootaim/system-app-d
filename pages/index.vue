<template>
  <div>
    <div class="Home" v-for="data in getHomeData" :key="data.id">
      <section class="panar">
        <h1>{{ data.title }}</h1>
        <p class="para">{{ data.subtitle }}</p>
        <p class="para">{{ data.email }}</p>
        <p class="para">{{ data.phone }}</p>
      </section>

      <div class="info">
        <div>
          <h3>Mission</h3>
          <p>{{ data.mission }}</p>
        </div>
        <div>
          <h3>Vision</h3>
          <p>{{ data.vision }}</p>
        </div>
        <div>
          <h3>Goals</h3>
          <li v-for="goal in JSON.parse(data.goal)" :key="goal" class="goal">
            {{ goal }}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getHomeData"]),

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
.goal {
  color: #fff;
}

a {
  color: #fff;
}
</style>
