export const state = (state) => ({
  role: "",
  name: "",
  permission: "",
  theme: "",
  message: "",
  chosenForm: "",
  chosenFormMethod: "",
  chosenFormId: "",
  baseUrl: "free",
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

    users: "https://beapis.herokuapp.com/api/users",
    mainIncident: "https://beapis.herokuapp.com/api/IncidentG",
    Communication: "https://beapis.herokuapp.com/api/Communication",
    staff: "https://beapis.herokuapp.com/api/Staff",
    Playbooks: "https://beapis.herokuapp.com/api/PlayBook",
    Shifts: "https://beapis.herokuapp.com/api/Shifts",
    home: "https://beapis.herokuapp.com/api/Home",
    skillMatrix: "https://beapis.herokuapp.com/api/SkillMatrix",
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
  mainIncident: [],
  useCase: [],
  advisory: [],
  serviceCatalog: [],
  healthCheck: [],
  healthIssue: [],
  changingData: false,
  alerts: [],
  incidents: [],
  pendingIssues: [],
  Reports: [],
  Policies: [],
  Procedures: [],
  users: [],
  mainIncident: [],
  Communication: [],
  staff: {},
  Playbooks: [],
  Shifts: {},
  Standards: [],
  skillMatrix: [],
  resourcesCalculation: ["de"],
  home: [
    {
      mission: " mission",
      vision: "Vision ",
      goal: '["aa","ss","s"]',
      subtitle: " Sub",
      title: " TITLE",
      email: "Example@gmai.com",
      phone: "12345",
      bg: "../assets/background.jpeg",
    },
  ],
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
      section: "Soc Governance",
      sectionName: "SOC Governance",
      class: "far fa-file-check",
      subPages: [
        { name: "Policies", callFunc: "Policies" },

        { name: "Process ", callFunc: "Procedures" },
        { name: "Playbooks", callFunc: "Playbooks" },
      ],
    },

    {
      section: "Communication",
      sectionName: "Communication Matrix",
      class: "fas fa-users",
    },
    {
      section: "Shift Handover",
      sectionName: "Shift Handover",
      class: "far fa-sync",

      subPages: [
        { name: "Health Check", callFunc: "healthCheck" },

        { name: "Alerts", callFunc: "alerts" },
        { name: "Incidents", callFunc: "incidents" },
        { name: "Pending Issues", callFunc: "pendingIssues" },
      ],
    },
    {
      section: "Shifts",
      sectionName: "Shifts Calender",
      class: "fal fa-table",
    },
    {
      section: "Use Case Library",
      sectionName: "Usecase Library",
      class: "fas fa-thumbs-up",
    },
    {
      section: "Reports",
      sectionName: "Reports",
      class: "fas fa-file-alt",
      subPages: [
        { name: "Advisory ", callFunc: "advisory" },
        { name: "Incident", callFunc: "mainIncident" },
        { name: "SOC Reports", callFunc: "socReports" },
      ],
    },
    {
      section: "skillMatrix",
      sectionName: "Skill Matrix",
      class: "fal fa-file-certificate",
    },
    {
      section: "resourcesCalculation",
      sectionName: "Resources Calculation",
      class: "fal fa-calculator",
    },
    {
      section: "onBoarding",
      sectionName: "Onboarding",
      class: "fal fa-book",
    },
    {
      section: "Administration",
      sectionName: "Administration",
      class: "fas fa-cog",
      subPages: [
        { name: "Users", callFunc: "users" },
        { name: "Home Settings", callFunc: "homeForm" },
        { name: "System", callFunc: "local10000" },
        { name: "Database", callFunc: "local8080" },
      ],
    },
  ],
});

export const getters = {
  getTheme: (state) => {
    return state.theme;
  },
  getRole: (state) => {
    return state.role;
  },
  getPermission: (state) => {
    return state.permission;
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
  getChangingData(state) {
    return state.changingData;
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
  getHomeData: (state) => {
    return state.home;
  },
  getSkillMatrix: (state) => {
    return state.skillMatrix;
  },
};

export const mutations = {
  saveTheme(state, t) {
    state.theme = t;
  },
  changeRole: (state) => {
    state.role = window.localStorage.getItem("role");
    state.name = window.localStorage.getItem("name");
    state.permission = window.localStorage.getItem("permission");
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
  setChosenFormId(state, status) {
    state.chosenFormId = status;
  },
  setChosenFormMethod(state, status) {
    state.chosenFormMethod = status;
  },
  showNewObjects(state, data) {
    state[showNewObjects].push(data);
  },
  setChangingData(state, data) {
    state.changingData = !state.changingData;
  },
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
  editData: (state, data) => {
    for (let i = 0; i < state[data.apiName].length; i++) {
      console.log(state[data.apiName][i].id);
      if (state[data.apiName][i].id == data.body.id) {
        state[data.apiName].splice(i, 1, data.body);
        console.log("edited");

        break;
      }
    }
  },
  deleteShift: (state, data) => {
    console.log(state.Shifts[data.month].length);
    for (let i = 0; i < state.Shifts[data.month].length; i++) {
      if (state.Shifts[data.month][i].name == data.name) {
        state.Shifts[data.month].splice(i, 1);
        console.log("del");
      }
    }
  },
};

export const actions = {
  changeTheme({ state, commit }) {
    let t = "light";
    if (localStorage.getItem("theme") == "light") {
      t = "dark";
    }
    commit("saveTheme", t);
    localStorage.setItem("theme", t);
  },
  changeHomeContent({ state, commit }, content) {
    const newHomeSections = state.homeSections.map((s) => {
      //   s.description = content[s.name];
      return { ...s, description: content[s.name] };
    });
    console.log(newHomeSections);
  },
  async getData({ state, commit }, apiName) {
    console.log("gettingData");
    try {
      console.log(state.url[apiName]);
      let res = await fetch(state.url[apiName])
        .then((response) => response.json())
        .then((data) => {
          if (apiName == "staff") {
            // const { left, right, top } = data;
            // let parents = [],
            //   childs = [],
            //   leftParent = {},
            //   rightParent = {},
            //   staff = {};
            // if (left) {
            //   leftParent = left.filter((p) => p.child == false)[0];
            //   childs.push(...left.filter((c) => c.child == true));
            //   if (leftParent) parents.push(leftParent);
            // }
            // if (right) {
            //   rightParent = right.filter((p) => p.child == false)[0];
            //   childs.push(...right.filter((c) => c.child == true));
            //   if (rightParent) parents.push(rightParent);
            // }
            // <option value="SOC Manager">SOC Manager</option>
            // <option value="L3 Analyst">L3 Analyst</option>
            // <option value="L2 Analyst">L2 Analyst</option>
            // <option value="L2 Analyst">L2 Analyst</option>

            const soc = data["SOC Manager"];
            const a__3 = data["L3 Analyst"];
            const a__2 = data["L2 Analyst"];
            const a__1 = data["L1 Analyst"];

            data = { soc, a__1, a__2, a__3 };
          }
          commit("setChangingData");
          console.log(data);

          if (
            apiName != "Shifts" &&
            apiName != "skillMatrix" &&
            apiName != "staff"
          ) {
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
          return true;
        });
      if (res == true) return true;
      else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async changeUserDate({ state, commit }, { email, type }) {
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
    fetch(`https://beapis.herokuapp.com/api/${type}/user`, requestOptions)
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
      let res = await fetch(state.url[dataObj.apiName], requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            this.dispatch("getData", dataObj.apiName);
            return true;
          } else return false;
        });
      if (res == true) {
        return true;
      } else {
        return false;
        console.log("return false");
      }
    } catch {
      console.log("return true");
      (error) => console.log("error", error);
      return false;
    }
  },

  async postData({ state, commit }, dataObj) {
    try {
      console.log(dataObj);
      console.log(state.url[dataObj.apiName]);
      let res = await fetch(state.url[dataObj.apiName], {
        method: "POST",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify(dataObj.body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.message && dataObj.apiName != "staff") {
            this.dispatch("getData", dataObj.apiName);
          } else {
            this.dispatch("getData", "staff");
          }
          return true;
        });
      if (res == true) {
        return true;
        console.log(res);
      } else {
        console.log(res);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async editData({ state, commit }, dataObj) {
    try {
      console.log(dataObj);
      console.log(state.url[dataObj.apiName]);
      let res = await fetch(state.url[dataObj.apiName], {
        method: "PUT",
        headers: { "Content-Type": " application/json" },
        body: JSON.stringify(dataObj.body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          commit("editData", dataObj);
          return true;
        });
      if (res == true) return true;
      else {
        console.log(res);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  async uploadPdf({ state, commit }, dataObj) {
    try {
      console.log(dataObj.apiName);
      let res = await fetch(state.url[dataObj.apiName], {
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
          return true;
        });
      if (res == true) return true;
      else {
        console.log(res);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  delete({ state, commit }, dataObj) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    if (dataObj.apiName == "Shifts") {
      urlencoded.append("name", dataObj.body.name);
      urlencoded.append("month", dataObj.body.month);
    } else urlencoded.append("id", dataObj.body.id);

    console.log(dataObj.body.id);
    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(state.url[dataObj.apiName], requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (dataObj.apiName != "Shifts" && dataObj.apiName != "skillMatrix") {
          console.log("tryDelete");
          commit("deleteData", {
            dataContainer: dataObj.apiName,
            id: dataObj.body.id,
          });
        } else if (dataObj.apiName == "Shifts") {
          commit("deleteShift", dataObj.body);
        } else {
          this.dispatch("getData", "skillMatrix");
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
            window.localStorage.setItem("permission", data.user.permission);
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
