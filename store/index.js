export const state = () => ({
  role: window.localStorage.getItem("role"),
  name: window.localStorage.getItem("name"),
  message: "",
  homeSections: [
    {
      name: "Mission",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      name: "Vision",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      name: "Goals",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
  ],
  wikiSections: [
    { section: "Reports", class: "fas fa-file-alt" },
    { section: "Polices", class: "far fa-file-check" },
    { section: "Procedures", class: "fas fa-user-cog" },
    { section: "Shift Handover", class: "far fa-sync" },
    { section: "Playbooks", class: "fad fa-chalkboard" },
    { section: "Communication", class: "fas fa-users" },
    { section: "Use Case Framework", class: "fas fa-thumbs-up" },
  ],
});

export const getters = {
  getterRole: (state) => {
    return state.role;
  },
};

export const mutations = {
  changeRole: (state) => {
    state.role = window.localStorage.getItem("role");
    state.name = window.localStorage.getItem("name");
  },
  logOut: (state) => {
    window.localStorage.setItem("role", " ");
    window.localStorage.setItem("name", " ");
  },
};

export const actions = {
  // updateActionValue({ commit }) {
  //   commit("updateValue", payload);
  // },
  async login({ state, commit }, dataObj) {
    console.log(dataObj.email);
    try {
      await fetch("https://beapis.herokuapp.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        body: JSON.stringify({
          email: dataObj.email,
          password: dataObj.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.localStorage.setItem("role", data.user.role);
          window.localStorage.setItem("name", data.user.name);
          commit("changeRole");
          //  this.$router.push({ path: this.localPath("/") });
          window.location.href = "/";
        });
    } catch (err) {
      console.log("err" + err);
    }
  },
  async register({ state, commit }, dataObj) {
    //console.log("email:" + dataObj.email + " password:" + dataObj.password);
    try {
      await fetch("https://beapis.herokuapp.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        body: JSON.stringify({
          name: dataObj.name,
          email: dataObj.email,
          password: dataObj.password,
          phone: dataObj.phone,
          password_confirmation: dataObj.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          commit("changeRole", { role: data.user.role, name: data.user.name });
        });
    } catch (err) {
      console.log(err);
    }
  },
};
