export const state = () => ({
  role: " ",
  name: " ",
  message: "",
  chosenForm: "",
  url: {
    useCase: "https://beapis.herokuapp.com/api/usecases",
    advisory: "https://beapis.herokuapp.com/api/advisorysource",
    serviceCatalog: "https://beapis.herokuapp.com/api/servicecateloge",
  },
  useCase: [],
  advisory: [],
  serviceCatalog: [],
  newAddedObjects: [],

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
    {
      section: "Shift Handover",
      class: "far fa-sync",

      subPages: [
        { name: "Shift Intro", callFunc: "shiftIntro" },
        { name: "Shift 2", callFunc: "shift2" },
        { name: "Shift 3", callFunc: "shift3" },
      ],
    },
    { section: "Playbooks", class: "fad fa-chalkboard" },
    { section: "Communication", class: "fas fa-users" },
    {
      section: "Use Case Framework",
      class: "fas fa-thumbs-up",
      subPages: [
        { name: "Use Case Intro", callFunc: "useCase" },
        { name: "Service Catalog", callFunc: "serviceCatalog" },
        { name: "Advisory", callFunc: "advisory" },
      ],
    },
  ],
});

export const getters = {
  getterRole: (state) => {
    return state.role;
  },
  getMessage: (state) => {
    return state.message;
  },
  getChosenForm: (state) => {
    return state.chosenForm;
  },
  getUseCase: (state) => {
    return state.useCase;
  },
  getAdvisory: (state) => {
    return state.advisory;
  },
  getServiceCatalog: (state) => {
    return state.serviceCatalog;
  },
  getNewAddedObjects: (state) => {
    return state.showNewObjects;
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
  errMessage: (state, message) => {
    state.message = message;
  },
  saveData(state, data) {
    state[data.dataContainer] = data.dataValue;
  },
  addData(state, data) {
    state[data.dataContainer].unshift(data.dataValue);
  },
  setChosenForm(state, status) {
    state.chosenForm = status;
  },
  showNewObjects(state, data) {
    state[showNewObjects].push(data);
  },
};

export const actions = {
  async getData({ state, commit }, apiName) {
    // console.log("email:" + dataObj.email + " password:" + dataObj.password);
    try {
      await fetch(state.url[apiName])
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          commit("saveData", {
            dataContainer: apiName,
            dataValue: data.reverse(),
          });
        });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  async postData({ state, commit }, dataObj) {
    try {
      console.log(dataObj);
      console.log(state.url[dataObj.apiName]);
      await fetch(state.url[dataObj.apiName], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj.body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.message) {
            commit("addData", {
              dataContainer: dataObj.apiName,
              dataValue: dataObj.body,
            });
          }
        });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
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
          document
            .querySelector(".baseSpinnerClass")
            .classList.remove("loader");

          if (data.user.name) {
            window.localStorage.setItem("role", data.user.role);
            window.localStorage.setItem("name", data.user.name);
            commit("changeRole");
            this.$router.push("/wikiPage");
            document.querySelector(".close").click();
          }
        });
      return true;
    } catch (err) {
      commit("errMessage", "User Not Found");
    }
  },
  async register({ state, commit }, dataObj) {
    // console.log("email:" + dataObj.email + " password:" + dataObj.password);
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
          document
            .querySelector(".baseSpinnerClass")
            .classList.remove("loader");
          console.log(data);
          if (data.user) {
            window.localStorage.setItem("role", data.user.role);
            window.localStorage.setItem("name", data.user.name);
            commit("changeRole");
            this.$router.push("/wikiPage");
            document.querySelector(".close").click();
          } else {
            console.log(data.email[0]);
            commit("errMessage", data.email[0]);
          }
        });
    } catch (err) {
      console.log("here");
      commit("errMessage", err);
    }
  },
  pushObject({ state, commit }, data) {
    commit("showNewObjects", { dataContainer: apiName, dataValue: data });
  },
};
