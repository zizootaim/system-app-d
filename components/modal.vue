<template>
  <!-- Trigger/Open The Modal -->
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <div class="modal__wrapper">
      <div class="modal__top">
        <span @click="close" class="close">&times;</span>
       
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
  z-index: 500;
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
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
}

/* Modal Content */
.modal-content {
  margin: auto;
  padding: 0px;
  max-width: 25rem;
  transform: scale(0.94);
  animation: scale 0.5s 0.2s forwards;
  padding-bottom: 0;
}
.secform {
  top: 0;
  bottom: 0;
  left: 25%;
  right: 25%;
  width: auto;
  height: 100%;
  background: none;
  display: flex;
}
.secform .modal__wrapper {
  border-radius: 2rem;
  background: #fff;
  margin: auto;
  width: auto;

  align-self: center;
  width: 700px;
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
  width: 91%;
  margin: 0 auto 1.5rem;
}
.secform .close {
  background: none;
  color: #010f60;
}

/* User Modal */
.modal.usersmodal {
  width: 100%;
  right: 0;
}

.modal.modal.usersmodal .modal-content {
  max-width: unset;
  display: flex;
  justify-content: center;
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
  .secform {
    left: 0;
    right: 0;
    width: 100%;
  }
  .secform .modal__wrapper {
    border-radius: 0;
  }
}
@media screen and (max-width: 680px) {
  .modal {
    width: 100%;
  }
  .secform .modal__wrapper {
    border-radius: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .secform .modal__top {
    width: 100%;
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
