<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 30px;
  height: 30px;
  float: right;

  border: 5px solid transparent;
  border-radius: 50%;
  border-top: 5px solid #aaa;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
