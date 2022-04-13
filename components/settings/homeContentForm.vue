<template>
  <div class="home__form-wrapper">
    <h1 class="form__title">Home Content</h1>
    <form @submit.prevent="submitData">
      <div class="form__control">
        <input type="text" name="title" v-model="title" required />
        <span class="form__control-label">Title</span>
      </div>
      <div class="form__control">
        <input type="text" name="mission" v-model="mission" required />
        <span class="form__control-label">Mission</span>
      </div>
      <div class="form__control">
        <input type="text" name="vision" v-model="vision" required />
        <span class="form__control-label">Vision</span>
      </div>
      <div class="form__control">
        <input type="text" name="goals" v-model="goals" required />
        <span class="form__control-label">Goals</span>
      </div>
      <div class="submit-btn__wrapper full">
        <button class="submit-btn">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "homeContentForm",
  data() {
    return {
      title: "",
      mission: "",
      vision: "",
      goals: "",
    };
  },
  dataObj() {
    return {};
  },
  methods: {
    submitData() {
      const obj = {
        Title: this.title,
        Mission: this.mission,
        Vision: this.vision,
        Goals: this.goals,
      };

    },
  },
};
</script>
<style>
.home__form-wrapper {
  width: 80%;
  margin: auto;
}
</style>
