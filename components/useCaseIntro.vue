<template>
  <div class="use__imgs">
    <div class="use__img">
      <img src="../assets/usecase.jpeg" />
    </div>
    <div class="use__img">
      <img src="../assets/usecase-1.jpeg" />
    </div>
    <div class="use__img">
      <img src="../assets/usecase-2.jpeg" />
    </div>
  </div>
</template>
<script>
export default {
  name: "useCaseIntro",
};
</script>
<style>
.use__imgs {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow: auto;
}
@media screen and (min-width: 1560px) {
  .use__imgs {
    max-height: 80rem;
  }
}
</style>
