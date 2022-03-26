<template>
  <!-- Trigger/Open The Modal -->
  <!-- The Modal -->
  <div id="myModal" class="modal" v-show="show">
    <div class="modal__top">
    <span @click="$emit('close')" class="close">&times;</span>
      <Logo />
    </div>
    <!-- Modal content -->
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
export default {
  data() {
    return { status: "" };
  },
  props: {
    formType: String,
    show: {
      type: Boolean,
      default: true,
    },
  },
  conponents:{
    Logo
  }
};
</script>

<style scoped>
.modal {
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  /* Location of the box */
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: #010f60;
  opacity: 0;
  animation: opacity 0.5s 0.1s forwards;
}

.modal__top {
  height: 72.8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
}


/* Modal Content */
.modal-content {
  margin: auto;
  padding: 20px;
  max-width: 25rem;
  transform: scale(0.94);
  animation: scale 0.5s 0.2s forwards;
  padding-bottom: 0;
}
@keyframes scale {
  100% {
    transform: scale(1);
  }
}
@keyframes opacity {
  100% {
    opacity: 1;
  }
}

/* The Close Button */
.close {
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s;
  background: #010f60;
  color: #fff;
  margin: 0 .2rem .5rem;
}



@media screen and (max-width: 1025px) {
  .modal {
    width: 45%;
  }
}
@media screen and (max-width: 1000px) {
  .modal {
    width: 60%;
  }
}
@media screen and (max-width: 680px) {
  .modal {
    width: 100%;
  }
  .modal__top {
    padding: 0 .6rem;
  }
  .close{
    margin-bottom: .7rem;
  }
  .modal-content{
    padding: 10px;
  }

}
</style>
