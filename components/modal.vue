<template>
  <!-- Trigger/Open The Modal -->
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <div class="modal__wrapper">
      <div class="modal__top">
        <span @click="close" class="close">&times;</span>
        <Logo />
      </div>
      <!-- Modal content -->
      <div class="modal-content">
        <slot :formTitle="formTitle"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
export default {
  components: {
    Logo,
  },
  props: {
    formTitle: "",
  },
  methods: {
    close() {
      this.showModal = false;
      this.$store.commit("errMessage", "");
      this.$emit("close");
    },
  },
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
  transition: 0.3s;
  animation: opacity 0.5s 0.1s forwards;
}
.secform {
  opacity: 1;
  transform: scale(0);
  animation: scale 0.4s 0.1s forwards;
}
.logo {
  margin-top: 0.7rem;
}
.modal__top {
  height: 3rem;
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
.secform {
  top: 5%;
  left: 25%;
  right: 25%;
  width: auto;
  height: auto;
  padding-bottom: 1rem;
  background: #fff;
  border-radius: 2rem;
}
.secform .modal__wrapper {
  width: 100%;
  margin: auto;
}
.secform .modal-content {
  position: relative;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.secform .logo {
  filter: invert(1);
}
.secform .modal-content {
  max-width: none;
  padding: 0;

}
.secform .modal__top {
  width: 90%;
  margin: 0.6rem auto;
}
.secform .close {
  background: none;
  color: #010f60;
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
  font-size: 40px;
  cursor: pointer;
  transition: 0.3s;
  background: #010f60;
  color: #fff;
  margin: 0 1.5rem 0.5rem;
}

@media screen and (max-width: 1025px) {
  .modal {
    width: 45%;
  }
  .modal.secform {
    width: 80%;
    margin: auto;
    top: 3%;
    left: 2%;
    right: 2%;
  }
}
@media screen and (max-width: 1000px) {
  .modal {
    width: 60%;
  }
  .modal.secform {
    width: 90%;
    height: auto;
  }
}
@media screen and (max-width: 680px) {
  .modal {
    width: 100%;
  }
  .modal.secform {
    top: 0;
    left: 0%;
    right: 0%;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .secform .modal__wrapper {
    width: 100%;
  }
  .secform .modal__top {
    width: 100%;
  }
  .secform .modal-content {
    width: 100%;
    margin: 0;
  }
  .modal__top {
    padding: 0 0.6rem;
  }
  .close {
    margin-bottom: 0.7rem;
    margin-right: 0.5rem;
  }
  .modal-content {
    padding: 10px;
  }
}
</style>
