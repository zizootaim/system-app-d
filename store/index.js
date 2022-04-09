export const state = () => ({
  role: "",
  name: "",
  message: "",
  chosenForm: "",
  url: {
    useCase: "https://beapis.herokuapp.com/api/usecases",
    advisory: "https://beapis.herokuapp.com/api/advisorysource",
    serviceCatalog: "https://beapis.herokuapp.com/api/servicecateloge",
    healthIssue: "https://beapis.herokuapp.com/api/healthissue",
    healthCheck: "https://beapis.herokuapp.com/api/HealthCheck",
    alerts: "https://beapis.herokuapp.com/api/ALerts",
    incidents: "https://beapis.herokuapp.com/api/Incidents",
    pendingIssues: "https://beapis.herokuapp.com/api/PendingIssues",
    Reports: "https://beapis.herokuapp.com/api/ReportsPDF",
    Policies: "https://beapis.herokuapp.com/api/PoliciesPDF",
    Procedures: "https://beapis.herokuapp.com/api/ProceduresPDF",
    mainIncident: "https://beapis.herokuapp.com/api/IncidentG",
    users: "https://beapis.herokuapp.com/api/users",
    mainIncident: "https://beapis.herokuapp.com/api/IncidentG",
    Communication: "https://beapis.herokuapp.com/api/Communication",
    staff: "https://beapis.herokuapp.com/api/Staff",
    Playbooks: "https://beapis.herokuapp.com/api/PlayBook",
    Shifts: "https://beapis.herokuapp.com/api/Shifts",
  },
  months: {
    January: "31",
    February: "28",
    March: "31",
    April: "30",
    May: "31",
    June: "30",
    July: "31",
    August: "31",
    September: "30",
    October: "31",
    November: "30",
    December: "30",
    jan: "30",
    feb: "30",
    march: "30",
  },
  useCase: [],
  mainIncident: [],
  advisory: [],
  serviceCatalog: [],
  healthCheck: [],
  healthIssue: [],
  newAddedObjects: [],
  alerts: [],
  incidents: [],
  pendingIssues: [],
  Reports: [],
  Policies: [],
  Procedures: [],
  users: [],
  mainIncident: [],
  Communication: [],
  staff: [],
  Playbooks: [],
  Shifts: {},
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
    {
      section: "Reports",
      class: "fas fa-file-alt",
      subPages: [
        { name: "Advisory ", callFunc: "advisory" },
        { name: "Incident", callFunc: "mainIncident" },
        { name: "Soc Reports", callFunc: "socReports" },
      ],
    },
    { section: "Policies", class: "far fa-file-check" },
    { section: "Procedures", class: "fas fa-user-cog" },
    {
      section: "Shift Handover",
      class: "far fa-sync",

      subPages: [
        { name: "Health Check", callFunc: "healthCheck" },

        { name: "Alerts", callFunc: "alerts" },
        { name: "Incidents", callFunc: "incidents" },
        { name: "Pending Issues", callFunc: "pendingIssues" },
      ],
    },
    { section: "Playbooks", class: "fad fa-chalkboard" },
    { section: "Communication", class: "fas fa-users" },
    { section: "Shifts", class: "fal fa-table" },
    {
      section: "Use Case Framework",
      class: "fas fa-thumbs-up",
    },
  ],
});

export const getters = {
  getRole: (state) => {
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
  getHealthIssue: (state) => {
    return state.healthIssue;
  },
  getHealthCheck: (state) => {
    return state.healthCheck;
  },
  getAlerts: (state) => {
    return state.alerts;
  },
  getIncidents: (state) => {
    return state.incidents;
  },
  getPendingIssues: (state) => {
    return state.pendingIssues;
  },
  getPolicies: (state) => {
    return state.Policies;
  },
  getReports: (state) => {
    return state.Reports;
  },
  getProcedures: (state) => {
    return state.Procedures;
  },
  getUsers: (state) => {
    return state.users;
  },
  getMainIncident: (state) => {
    return state.mainIncident;
  },
  getCommunication: (state) => {
    return state.Communication;
  },
  getStaff: (state) => {
    return state.staff;
  },
  getPlayBook: (state) => {
    return state.Playbooks;
  },
  getShifts: (state) => {
    return state.Shifts;
  },
  getMonths: (state) => {
    return state.months;
  },
};

export const mutations = {
  changeRole: (state) => {
    state.role = window.localStorage.getItem("role");
    state.name = window.localStorage.getItem("name");
  },
  logOut: (state) => {
    window.localStorage.setItem("role", "");
    window.localStorage.setItem("name", "");
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
  addShift: () => {},
  deleteData: (state, data) => {
    console.log(data.id);
    for (let i = 0; i < state[data.dataContainer].length; i++) {
      console.log(state[data.dataContainer][i].id);
      if (state[data.dataContainer][i].id == data.id) {
        state[data.dataContainer].splice(i, 1);
        console.log("dele");
        break;
      }
    }
  },
};

export const actions = {
  async getData({ state, commit }, apiName) {
    // console.log("email:" + dataObj.email + " password:" + dataObj.password);
    try {
      console.log(state.url[apiName]);
      await fetch(state.url[apiName])
        .then((response) => response.json())
        .then((data) => {
          if (apiName == "staff") {
            const { left, right, top } = data;
            
            const leftParent = left.filter((p) => p.child == false)[0],
              leftChilds = left.filter((c) => c.child == true),
              leftStaff = { parent: leftParent, childs: leftChilds };
            const rightParent = right.filter((p) => p.child == false)[0],
              rightChilds = right.filter((c) => c.child == true),
              rightStaff = { parent: rightParent, childs: rightChilds };
            data = [rightStaff, leftStaff, top];
          }
          console.log(data);
          if (apiName != "Shifts") {
            commit("saveData", {
              dataContainer: apiName,
              dataValue: data.reverse(),
            });
          } else {
            commit("saveData", {
              dataContainer: apiName,
              dataValue: data,
            });
          }
        });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  async approveUser({ state, commit }, email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    console.log(urlencoded);
    fetch("https://beapis.herokuapp.com/api/approve/user", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.dispatch("getData", "users");
      })
      .catch((error) => console.log("error", error));
  },
  async editStaff({ state, commit }, dataObj) {
    console.log(dataObj);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(state.url[dataObj.apiName]);
    var urlencoded = new URLSearchParams();
    urlencoded.append("id", dataObj.body.id);
    urlencoded.append("ParentName", dataObj.body.ParentName);
    urlencoded.append("Name", dataObj.body.Name);
    urlencoded.append("Title", dataObj.body.Title);
    urlencoded.append("Email", dataObj.body.Email);
    urlencoded.append("Mobile", dataObj.body.Mobile);
    urlencoded.append("Phone", dataObj.body.Phone);
    urlencoded.append("child", dataObj.body.child);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      fetch(state.url[dataObj.apiName], requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          this.dispatch("getData", dataObj.apiName);
        });
      return true;
    } catch {
      (error) => console.log("error", error);
    }
  },

  async postData({ state, commit }, dataObj) {
    try {
      console.log(dataObj);
      console.log(state.url[dataObj.apiName]);
      await fetch(state.url[dataObj.apiName], {
        method: "POST",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify(dataObj.body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.message && dataObj.apiName != "staff") {
            commit("addData", {
              dataContainer: dataObj.apiName,
              dataValue: dataObj.body,
            });
          } else {
            this.dispatch("getData", "staff");
          }
        });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  // updateActionValue({ commit }) {
  //   commit("updateValue", payload);
  // },

  uploadPdf({ state, commit }, dataObj) {
    try {
      console.log(dataObj.apiName);
      fetch(state.url[dataObj.apiName], {
        method: "POST",
        body: dataObj.body,
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.message) {
            commit("addData", {
              dataContainer: dataObj.apiName,
              dataValue: data,
            });
          }
        });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  deletePdf({ state, commit }, dataObj) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("id", dataObj.body.id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    console.log(dataObj.body.id);
    console.log(state.url[dataObj.apiName]);
    fetch(state.url[dataObj.apiName], requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result == "File Has Been Deleted") {
          commit("deleteData", {
            dataContainer: dataObj.apiName,
            id: dataObj.body.id,
          });
        }
      })
      .catch((error) => console.log("error", error));
  },

  // deletePdf1({ state, commit }, dataObj) {
  //   try {
  //     console.log(dataObj.body);
  //     fetch(state.url[dataObj.apiName], {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: dataObj.body,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (!data.message) {
  //           commit("deleteData", {
  //             dataContainer: dataObj.apiName,
  //             id: dataObj.body,
  //           });
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
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
          if (data.user.name) {
            window.localStorage.setItem("role", data.user.role);
            window.localStorage.setItem("name", data.user.name);
            commit("changeRole");
            this.$router.push("/wikiPage");
            document.querySelector(".close").click();
          }
          return true;
        });
    } catch (err) {
      commit("errMessage", "User Not Found");
      return false;
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
