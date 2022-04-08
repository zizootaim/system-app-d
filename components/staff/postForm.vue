<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Add Staff Member</h1>
    <form class="long__form add-form" v-on:submit.prevent="submitData">
      <div class="form__control select">
        <select name="parentLevel" v-model="level">
          <option value="" selected disabled hidden>Parent Level</option>
          <option value="1">1</option>
          <option value="2-1">2-Left</option>
          <option value="2-2">2-Right</option>
        </select>
      </div>
      <div class="form__control">
        <input
          type="text"
          name="name"
          required
          v-model="name"
          autocomplete="off"
        />
        <span class="form__control-label">Name</span>
      </div>
      <div class="form__control">
        <input type="text" name="title" required v-model="title" />
        <span class="form__control-label">Title</span>
      </div>
      <div class="form__control">
        <input type="text" name="email" required v-model="email" />
        <span class="form__control-label">Email</span>
      </div>
      <div class="form__control">
        <input type="text" name="mobile" required v-model="mobile" />
        <span class="form__control-label">Mobile</span>
      </div>
      <div class="form__control">
        <input type="text" name="phone" required v-model="phone" />
        <span class="form__control-label">Phone</span>
      </div>
      <div
        v-if="level == '2-1' || level == '2-2'"
        class="childrens full long__form"
      >
        <h3 class="full">children</h3>
        <div class="form__control">
          <input
            type="text"
            name="childName"
            required
            v-model="childName"
            autocomplete="off"
          />
          <span class="form__control-label">Name</span>
        </div>

        <div class="form__control">
          <input type="text" name="childTitle" required v-model="childTitle" />
          <span class="form__control-label">Title</span>
        </div>
        <div class="form__control">
          <input type="text" name="childEmail" required v-model="childEmail" />
          <span class="form__control-label">Email</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="childMobile"
            required
            v-model="childMobile"
          />
          <span class="form__control-label">Mobile</span>
        </div>
        <div class="form__control">
          <input type="text" name="childPhone" required v-model="childPhone" />
          <span class="form__control-label">Phone</span>
        </div>
        <div class="form__control btn-wrapper">
          <button class="form-btn" @click="addChild">add child</button>
        </div>
      </div>
    </form>

    <div class="submit__btn-wrapper">
      <button class="submit-btn" @click="() => submitData(false)">
        Submit
        <svg
          v-if="submitIcon"
          class="svgIcon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z"
            fill="#43A047"
          />
        </svg>
        <BaseSpinner v-if="spinnerLoading" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      level: "",
      name: "",
      title: "",
      email: "",
      mobile: "",
      phone: "",
      childName: "",
      childTitle: "",
      childEmail: "",
      childMobile: "",
      childPhone: "",
      childs: [],
      spinnerLoading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      let ParentName = "",
        child = 0;
      let obj = {};
      if (this.level == "1") ParentName = "top";
      if (this.level == "2-1") {
        ParentName = "right";
      }
      if (this.level == "2-2") {
        ParentName = "left";
      }
      obj = {
        ParentName,
        Name: this.name,
        Title: this.title,
        Email: this.email,
        Mobile: this.mobile,
        Phone: this.phone,
        child,
      };

      return obj;
    },
    childObj() {
      let ParentName = "",
        child = 0;
      let obj = {};
      if (this.level == "1") ParentName = "top";
      if (this.level == "2-1") {
        child = 1;
        ParentName = "right";
      }
      if (this.level == "2-2") {
        child = 1;
        ParentName = "left";
      }
      obj = {
        ParentName,
        Name: this.childName,
        Title: this.childTitle,
        Email: this.childEmail,
        Mobile: this.childMobile,
        Phone: this.childPhone,
        child,
      };

      // if (this.childs.length >= 1) {
      //   obj.childs = [...this.childs];
      // }
      return obj;
    },
  },
  methods: {
    addChild() {
      // console.log(this.childObj);
      this.submitData(true);
      Array.from(document.querySelectorAll(".childrens input")).forEach((i) => {
        this.childName = "";
        this.childTitle = "";
        this.childPhone = "";
        this.childMobile = "";
        this.childEmail = "";
      });
    },
    async submitData(child) {
      let obj = this.dataObj;
      if (child) obj = this.childObj;
      console.log(obj);

      this.spinnerLoading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "staff",
        body: obj,
      });
      console.log(response);
      if (response) {
        this.spinnerLoading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          // document.querySelector('.close').click();
        }, 1000);
      }
    },
  },
};
</script>
<style>
.form__title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}
.childrens h3 {
  color: #000;
  text-transform: capitalize;
}
.add-form {
  max-height: 30rem;
  overflow: auto;
  padding-right: 1rem;
  padding-top: 1rem;
}
.add-form .form__control:last-of-type {
  grid-column: auto;
}
.btn-wrapper {
  border: none;
  padding: 0;
}
.btn-wrapper .form-btn {
  color: #fff;
  margin: 0;
}
.add-form .submit__btn-wrapper {
  padding-top: 1rem;
}
</style>
