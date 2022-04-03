<template>
  <div class="container loading-skeleton">
    <div class="row">
      <div class="col">
        <div class="card">
          <!-- <img src="//placekitten.com/300/200" class="card-img-top" alt="..." /> -->
          <div class="card-img-top"></div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-img-top"></div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-img-top"></div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-img-top"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loader",
};
</script>

<style scoped>
.container {
  padding: 2rem;
  width: 90%;
  margin: 0 auto;
  height: 30rem;
  overflow: hidden;
}

.loading-skeleton {
  color: transparent;
  appearance: none;
  -webkit-appearance: none;
  background-color: #40358e;
  border-color: #eee;
  background: none;
  display: grid;
  place-items: center;
  justify-content: center;
  align-items: center;
}
.loading-skeleton::placeholder {
  color: transparent;
}
.row {
  display: flex;
  align-items: center;
    flex-wrap: wrap;

  justify-content: center;
}
.loading-skeleton {
  pointer-events: none;
  animation: loading-skeleton 1s infinite alternate;
}
@keyframes loading-skeleton {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
.loading-skeleton .card-img-top {
  width: 30rem;
  height: 25rem;
  margin: 1rem;
  border-radius: 1rem;
  background: #49427c;
  /* filter: grayscale(50) contrast(0%) brightness(1.8); */
}

@media screen and (max-width: 600px) {
  .loading-skeleton .card-img-top {
    width: 15rem;
    height: 18rem;
  }
}
</style>
