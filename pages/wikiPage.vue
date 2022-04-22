<template>
  <section
    class="wiki"
    v-if="getRole == 'Employee' || getRole == 'admin' || getRole == 'visitor'"
  >
    <article class="wiki__content-wrapper">
      <div class="wiki__content">
        <div class="wiki__menu-wrapper">
          <div class="menu__icon" v-on:click="displaySideMenu()">
            <i class="fas fa-arrow-right"></i>
            <span>Wiki Menu</span>
          </div>
          <div :class="showSideMenu ? 'wiki__menu' : 'wiki__menu show'">
            <div
              @click="changeWikiPage(item.section)"
              :class="
                item.subPages ? 'menu__item submenu-wrapper' : 'menu__item'
              "
              v-for="item in wikiSections"
              :key="item.section"
            >
              <button
                @click="showMenu($event)"
                v-if="item.section != 'Administration' || getRole == 'admin'"
              >
                <i :class="item.class"></i>
                {{ item.sectionName }}
                <i
                  class="fas fa-angle-down sub-menu-icon"
                  v-if="
                    item.section == 'Shift Handover' ||
                    item.section == 'Reports' ||
                    item.section == 'Soc Governance'
                  "
                ></i>
              </button>
              <ul
                class="sub-menu"
                v-if="
                  item.section == 'Shift Handover' ||
                  item.section == 'Reports' ||
                  item.section == 'Soc Governance'
                "
              >
                <li
                  v-for="s in item.subPages"
                  :key="s.name"
                  @click="(event) => changeCat(s.callFunc, event)"
                >
                  <span>{{ s.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="wiki__items" v-if="wikiPage == ''">
          <div v-for="wikiItem in wikiSections" :key="wikiItem.section">
            <div
              @click="changeWikiPage(wikiItem.section)"
              class="wiki__item"
              v-if="wikiItem.section != 'Administration' || getRole == 'admin'"
            >
              <h3
                class="wiki__item-title"
                :class="
                  wikiItem.section == 'Shift Handover' ||
                  wikiItem.section == 'Reports' ||
                  wikiItem.section == 'Soc Governance'
                    ? 'top'
                    : ''
                "
              >
                {{ wikiItem.sectionName }}
              </h3>
              <ul
                v-if="
                  wikiItem.section == 'Shift Handover' ||
                  wikiItem.section == 'Reports' ||
                  wikiItem.section == 'Soc Governance'
                "
                class="wiki__item-menu"
              >
                <li
                  v-for="i in wikiItem.subPages"
                  :key="i"
                  @click="(event) => changeCat(i.callFunc, event)"
                >
                  {{ i.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="wiki__container">
          <!-- Use Case Intro -->
        <BaseSpinner v-if="loading && wikiPage != ''" class="mainSpinner" />

          <div class="use__img" v-if="wikiPage == 'Use Case Library'">
            <img src="../assets/usecase.jpeg" />
          </div>

          <!-- Filteration -->
          <!-- 
          <div
            v-if="
              chosenCat &&
              wikiPage != 'Shifts' &&
              wikiPage != 'Administration' &&
              allData.length > 1
            "
            class="filteration__wrapper"
          >
            <h2>Filter By :</h2>
            <div class="filter__form">
              <div class="form__control" v-if="filterObj.inputName">
                <input
                  type="text"
                  v-model="filterObj.filterInputValue"
                  required
                  v-on:change="filterData"
                />
                <span class="form__control-label">{{
                  this.filterObj.inputName
                }}</span>
              </div>
              <div class="filter__selects" v-if="filterObj.select">
                <div
                  class="form__control select"
                  v-for="(s, index) in filterObj.select"
                  :key="index"
                >
                  <select
                    required
                    v-model="filterObj.selectValues[index]"
                    v-on:change="() => filterData(s.name)"
                  >
                    <option v-for="(v, i) in s.values" :key="i" :value="v">
                      {{ v }}
                    </option>
                  </select>
                  <span class="form__control-label">{{ s.name }}</span>
                </div>
                <div v-if="nothingToSee" class="nothing">Nothing Existed</div>
              </div>
            </div>
          </div> -->

          <!-- Reports -->

          <div class="reports" v-if="wikiPage == 'Reports'">
            <div v-if="chosenCat == 'socReports'">
              <h1 class="sec__title">Soc Reports</h1>
              <button
                class="form-btn"
                @click="setChosenForm('addPdf', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="filteredArray.length > 0">
                <div
                  class="pdf-wrapper"
                  v-for="report in filteredArray"
                  :key="report.id"
                >
                  <button
                    v-if="getRole == 'Employee' || getRole == 'admin'"
                    class="delete-btn"
                    @click="
                      deleteData({
                        body: { id: report.id },
                        apiName: 'Reports',
                      })
                    "
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>

                  <div class="pdf">
                    <i
                      class="fas fa-angle-down open-pdf"
                      @click="(event) => showPDF(event)"
                    ></i>
                    <p>{{ report.title }}</p>

                    <embed
                      :src="report.url"
                      type=""
                      width="500px"
                      height="500px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="chosenCat == 'advisory'">
              <h1 class="sec__title">Advisory</h1>
              <button
                class="form-btn"
                @click="setChosenForm('advisory', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="filteredArray.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div class="table__row header">
                      <div class="col">
                        <h4>Source</h4>
                      </div>
                      <div class="col">
                        <h4>Date</h4>
                      </div>
                      <div class="col">
                        <h4>Reference ID</h4>
                      </div>
                      <div class="col">
                        <h4>Applicable</h4>
                      </div>
                      <div class="col"></div>
                    </div>

                    <div
                      class="table__row"
                      v-for="advisoryCard in filteredArray"
                      :key="advisoryCard.id"
                    >
                      <div class="row top-row">
                        <i
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>
                        <div class="col">
                          <p>
                            <span>{{ advisoryCard.source }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ advisoryCard.date }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ advisoryCard.referenceid }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ advisoryCard.applicable }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="
                                setChosenForm(
                                  'advisory',
                                  'PUT',
                                  advisoryCard.id
                                )
                              "
                            >
                              <i class="fal fa-pen"></i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: advisoryCard.id },
                                  apiName: 'advisory',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row bottom-row">
                        <div>
                          <span>Description</span> :
                          {{ advisoryCard.description }}
                        </div>
                        <div v-if="advisoryCard.applicable == 'No'">
                          <span> Actions Taken</span> : {{ advisoryCard.token }}
                        </div>
                        <div><span>Notes</span> : {{ advisoryCard.notes }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="chosenCat == 'mainIncident'"
              class="incident__main__wrapper"
            >
              <div>
                <h1 class="sec__title">Incidents</h1>
                <button
                  class="form-btn"
                  @click="setChosenForm('incidentMainForm', 'POST')"
                  v-if="getRole == 'Employee' || getRole == 'admin'"
                >
                  <i class="fas fa-plus"></i> add
                </button>
              </div>
              <div v-if="filteredArray.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div class="table__row header">
                      <div class="col">
                        <h4>Name</h4>
                      </div>
                      <div class="col">
                        <h4>Detector</h4>
                      </div>
                      <div class="col">
                        <h4>Ref Number</h4>
                      </div>
                      <div class="col">
                        <h4>Priority</h4>
                      </div>
                      <div class="col"></div>
                    </div>
                    <div
                      class="table__row"
                      v-for="i in filteredArray"
                      :key="i.id"
                    >
                      <div class="row top-row">
                        <i
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>
                        <div class="col">
                          <p>
                            <span>{{ i.IncidentName }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ i.DetectorName }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ i.IncidentReferenceNo }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ i.Priority }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="
                                setChosenForm('incidentMainForm', 'PUT', i.id)
                              "
                            >
                              <i class="fal fa-pen"></i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: i.id },
                                  apiName: 'mainIncident',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row bottom-row">
                        <div class="incident-sec__wrapper">
                          <h3>Incident Identification</h3>
                          <div class="com-row">
                            <div class="primary">
                              <div>
                                <span>Location</span> : {{ i.Location }}
                              </div>
                              <div>
                                <span>Contact Info</span> :
                                {{ i.ContactInfo }}
                              </div>

                              <div>
                                <span>Affected System </span> :
                                {{ i.AffectedSystem }}
                              </div>
                            </div>
                            <div class="secondary">
                              <div>
                                <span>Time Of Detection</span> :
                                {{ i.TimeOfDetection }}
                              </div>
                              <div>
                                <span>Repeated Incident</span> :
                                {{ i.RepeatedIncident }}
                              </div>
                              <div>
                                <span>Impact Duration</span> :
                                {{ i.ImpactDuration }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="incident-sec__wrapper">
                          <h3>Incident Triage</h3>

                          <div class="com-row">
                            <div class="primary">
                              <div>
                                <span>Incident Verification</span> :
                                {{ i.IncidentVerification }}
                              </div>
                              <div>
                                <span>Incident Classification</span> :
                                {{ i.IncidentClassification }}
                              </div>
                            </div>
                            <div class="secondary">
                              <div>
                                <span>Description</span> : {{ i.Description }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="incident-sec__wrapper">
                          <h3>Incident Containment</h3>
                          <div class="com-row">
                            <div class="primary">
                              <div>
                                <span>Recovery Measures</span> :
                                {{ i.RecoveryMeasures }}
                              </div>
                              <div>
                                <span>Evidence Acquiring</span> :
                                {{ i.EvidenceAcquiring }}
                              </div>
                            </div>
                            <div class="secondary">
                              <div>
                                <span>Containment Measures</span> :
                                {{ i.ContainmentMeasures }}
                              </div>
                              <div>
                                <span>Eradication Measures</span> :
                                {{ i.EradicationMeasures }}
                              </div>
                            </div>
                          </div>

                          <div class="desc">
                            <span>Data Health</span> : {{ i.DataHealth }}
                          </div>
                        </div>

                        <div class="incident-sec__wrapper">
                          <h3>Post Incident Activity</h3>
                          <div class="com-row">
                            <div class="primary">
                              <div>
                                <span>Notification</span> : {{ i.Notification }}
                              </div>
                              <div>
                                <span>Incident Availability</span> :
                                {{ i.IncidentAvailability }}
                              </div>
                            </div>
                            <div class="secondary">
                              <div>
                                <span>Case Analysis</span> :
                                {{ i.CaseAnalysis }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="incident-sec__wrapper">
                          <h3>Incident Closure</h3>
                          <div class="com-row">
                            <div class="primary">
                              <div>
                                <span>Improvements</span> : {{ i.Improvements }}
                              </div>
                            </div>
                            <div class="secondary">
                              <div>
                                <span>Time Of Closure</span> :
                                {{ i.TimeOfClosure }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="incident-sec__wrapper">
                          <h3>Reviewed By</h3>
                          <div class="com-row">
                            <div class="primary">
                              <div><span>Title</span> : {{ i.Title }}</div>
                              <div>
                                <span>Signature</span> : {{ i.Signature }}
                              </div>
                            </div>
                            <div class="secondary">
                              <div><span>Date</span> : {{ i.Date }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Soc Governance -->

          <div v-if="wikiPage == 'Soc Governance'">
            <div
              class="pdfs__wrapper"
              v-if="chosenCat == 'Procedures' || chosenCat == 'Policies'"
            >
              <h1 class="sec__title">
                {{ chosenCat == "Procedures" ? "Process" : "Policies" }}
              </h1>
              <button
                class="form-btn"
                @click="setChosenForm('addPdf', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>

              <div class="pdfs__container" v-if="chosenCat == 'Policies'">
                <div v-if="filteredArray.length > 0">
                  <div
                    class="pdf-wrapper"
                    v-for="policy in filteredArray"
                    :key="policy.name"
                  >
                    <button
                      class="delete-btn"
                      @click="
                        deleteData({
                          body: { id: policy.id },
                          apiName: 'Policies',
                        })
                      "
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <div class="pdf">
                      <i
                        class="fas fa-angle-down open-pdf"
                        @click="(event) => showPDF(event)"
                      ></i>

                      <p>{{ policy.title }}</p>

                      <embed
                        :src="policy.url"
                        type=""
                        width="500px"
                        height="500px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pdfs__container" v-if="chosenCat == 'Procedures'">
                <div v-if="filteredArray.length > 0">
                  <div
                    class="pdf-wrapper"
                    v-for="procedure in filteredArray"
                    :key="procedure.name"
                  >
                    <button
                      class="delete-btn"
                      @click="
                        deleteData({
                          body: { id: procedure.id },
                          apiName: 'Procedures',
                        })
                      "
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <div class="pdf">
                      <i
                        class="fas fa-angle-down open-pdf"
                        @click="(event) => showPDF(event)"
                      ></i>

                      <p>{{ procedure.title }}</p>

                      <embed
                        :src="procedure.url"
                        type=""
                        width="500px"
                        height="500px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Playbooks -->

            <div class="playbooks" v-if="chosenCat == 'Playbooks'">
              <h1 class="sec__title">Playbooks</h1>
              <button
                class="form-btn"
                @click="setChosenForm('playBookForm', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="getPlayBook.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div
                      class="table__row"
                      v-for="book in getPlayBook"
                      :key="book.id"
                    >
                      <div class="row top-row">
                        <i
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>

                        <div class="col">
                          <p>
                            <span>{{ book.title }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="
                                setChosenForm('playBookForm', 'PUT', book.id)
                              "
                            >
                              <i class="fal fa-pen"></i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: book.id },
                                  apiName: 'Playbooks',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row bottom-row">
                        <div class="book__data">
                          <div>Description : {{ book.description }}</div>
                          <div class="book__table">
                            <div>
                              <div class="table__row header">
                                <div class="col">
                                  <h4>Activity</h4>
                                </div>
                                <div class="col">
                                  <h4>IR Stage</h4>
                                </div>
                                <div class="col">
                                  <h4>Team</h4>
                                </div>
                              </div>

                              <div
                                class="table__row"
                                v-for="(r, index) in parse(book.data)"
                                :key="index"
                              >
                                <div class="row">
                                  <div class="col">
                                  <p>
                                   {{ r.activity }}
                                  </p>
                                </div>
                                <div class="col">
                                 <p>
                                  {{ r.irStage }}
                                 </p>
                                </div>
                                <div class="col">
                                  <p><span>{{ r.team }}</span></p>
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="book__img">
                          <img :src="book.url" :alt="book.name" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Shift Hand -->

          <div v-if="wikiPage == 'Shifts'" class="shifts-container">
            <h1 class="sec__title">Shifts</h1>
            <div class="shifts__wrapper">
              <Shifts />
            </div>
          </div>
          <div class="shiftHand" v-if="wikiPage == 'Shift Handover'">
            <!-- Health Check -->

            <div v-if="chosenCat == 'healthCheck'">
              <h1 class="sec__title">Health Check</h1>
              <button
                class="form-btn"
                @click="setChosenForm('healthCheck', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="filteredArray.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div class="table__row header">
                      <div class="col">
                        <h4>Check Description</h4>
                      </div>
                      <div class="col">
                        <h4>Check Status</h4>
                      </div>
                      <div class="col"></div>
                    </div>
                    <div
                      class="table__row top-row"
                      v-for="h in filteredArray"
                      :key="h.id"
                    >
                      <div class="row top-row">
                        <i
                          v-if="h.Status == 'Not Ok'"
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>
                        <div class="col">
                          <p>
                            <span>
                              {{ h.Description }}
                            </span>
                          </p>
                        </div>

                        <div class="col">
                          <p
                            :class="`status ${
                              h.Status == 'Not Ok' ? 'issue' : 'not-issue'
                            }`"
                          >
                            {{ h.Status }}
                          </p>
                        </div>
                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="setChosenForm('healthCheck', 'PUT', h.id)"
                            >
                              <i class="fal fa-pen"></i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: h.id },
                                  apiName: 'healthCheck',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div v-if="h.Status == 'Not Ok'" class="row bottom-row">
                        <h3 style="padding-left: 0.6rem; text-align: center">
                          Health Issue
                        </h3>
                        <div class="com-row">
                          <div class="primary">
                            <div>
                              <span>Issue Found</span> : {{ h.IssuesFound }}
                            </div>
                            <div>
                              <span>Component</span> : {{ h.Component }}
                            </div>
                            <div><span>IP</span> : {{ h.Ip }}</div>
                            <div><span>Hostname</span> : {{ h.Hostname }}</div>
                            <div>
                              <span>Start Time </span>: {{ h.StartTime }}
                            </div>
                          </div>
                          <div class="secondary">
                            <div>
                              <span>Action Taken</span> : {{ h.ActionTaken }}
                            </div>
                            <div>
                              <span>Next Action</span> : {{ h.NextAction }}
                            </div>
                            <div><span>Who</span> : {{ h.Who }}</div>
                            <div>
                              <span>Issue Status</span> :
                              <span
                                :class="'status ' + statusClass(h.IssueStatus)"
                              >
                                {{ h.IssueStatus }}
                              </span>
                            </div>
                            <div>
                              <span>Close Time</span> : {{ h.CloseTime }}
                            </div>
                          </div>
                        </div>
                        <div class="desc">
                          <span>Issue Description</span> :
                          {{ h.IssueDescription }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alerts -->

            <div v-if="chosenCat == 'alerts'">
              <h1 class="sec__title">Alerts</h1>
              <button
                class="form-btn"
                @click="setChosenForm('alerts', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="filteredArray.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div class="table__row header">
                      <div class="col">
                        <h4>Name</h4>
                      </div>
                      <div class="col">
                        <h4>Number</h4>
                      </div>
                      <div class="col">
                        <h4>Start Time</h4>
                      </div>
                      <div class="col">
                        <h4>Status</h4>
                      </div>
                      <div class="col"></div>
                    </div>
                    <div
                      class="table__row"
                      v-for="alertsCard in filteredArray"
                      :key="alertsCard.id"
                    >
                      <div class="row top-row">
                        <i
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>
                        <div class="col">
                          <p>
                            <span>{{ alertsCard.name }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ alertsCard.number }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ alertsCard.StartTime }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p
                            :class="`status ${statusClass(alertsCard.status)}`"
                          >
                            <span>{{ alertsCard.status }}</span>
                          </p>
                        </div>

                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="
                                setChosenForm('alerts', 'PUT', alertsCard.id)
                              "
                            >
                              <i class="fal fa-pen"></i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: alertsCard.id },
                                  apiName: 'alerts',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row bottom-row">
                        <div class="com-row">
                          <div class="primary">
                            <div><span>Who</span> : {{ alertsCard.who }}</div>
                            <div>
                              <span>Action Taken</span> :
                              {{ alertsCard.ActionTaken }}
                            </div>
                          </div>
                          <div class="secondary">
                            <div>
                              <span>Next Action</span> :
                              {{ alertsCard.NextAction }}
                            </div>

                            <div>
                              <span>Close Time</span> :
                              {{ alertsCard.CloseTime }}
                            </div>
                          </div>
                        </div>
                        <div class="desc">
                          <span>Description</span> :
                          {{ alertsCard.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Incidents -->

            <div v-if="chosenCat == 'incidents'">
              <h1 class="sec__title">Incidents</h1>
              <button
                class="form-btn"
                @click="setChosenForm('incidents', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="filteredArray.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div class="table__row header">
                      <div class="col">
                        <h4>Name</h4>
                      </div>
                      <div class="col">
                        <h4>Date</h4>
                      </div>
                      <div class="col">
                        <h4>Number</h4>
                      </div>

                      <div class="col">
                        <h4>Status</h4>
                      </div>
                      <div class="col"></div>
                    </div>

                    <div
                      class="table__row"
                      v-for="incidentsCard in filteredArray"
                      :key="incidentsCard.id"
                    >
                      <div class="row top-row">
                        <i
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>
                        <div class="col">
                          <p>
                            <span>{{ incidentsCard.name }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ incidentsCard.date }}</span>
                          </p>
                        </div>

                        <div class="col">
                          <p>
                            <span>{{ incidentsCard.number }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p
                            :class="`status ${statusClass(
                              incidentsCard.status
                            )}`"
                          >
                            <span>{{ incidentsCard.status }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="
                                setChosenForm(
                                  'incidents',
                                  'PUT',
                                  incidentsCard.id
                                )
                              "
                            >
                              <i class="fal fa-pen"></i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: incidentsCard.id },
                                  apiName: 'incidents',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row bottom-row">
                        <div class="com-row">
                          <div class="primary">
                            <div>
                              <span>Who</span> : {{ incidentsCard.who }}
                            </div>

                            <div>
                              <span>Close Time</span> :
                              {{ incidentsCard.CloseTime }}
                            </div>
                          </div>
                          <div class="secondary">
                            <div>
                              <span>Action Taken</span> :
                              {{ incidentsCard.ActionTaken }}
                            </div>
                            <div>
                              <span>Next Action</span> :
                              {{ incidentsCard.NextAction }}
                            </div>
                          </div>
                        </div>
                        <div class="desc">
                          <span>Description</span> :
                          {{ incidentsCard.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending Issues -->

          <div v-if="chosenCat == 'pendingIssues'">
            <h1 class="sec__title">Pending Issues</h1>
            <button
              class="form-btn"
              @click="setChosenForm('pendingIssues', 'POST')"
              v-if="getRole == 'Employee' || getRole == 'admin'"
            >
              <i class="fas fa-plus"></i> add
            </button>
            <div v-if="filteredArray.length > 0">
              <div class="table__wrapper">
                <div class="table">
                  <div class="table__row header">
                    <div class="col">
                      <h4>Name</h4>
                    </div>
                    <div class="col">
                      <h4>Who</h4>
                    </div>
                    <div class="col">
                      <h4>Start Time</h4>
                    </div>
                    <div class="col">
                      <h4>Status</h4>
                    </div>
                    <div class="col"></div>
                  </div>

                  <div
                    class="table__row"
                    v-for="pendingIssuesCard in filteredArray"
                    :key="pendingIssuesCard.id"
                  >
                    <div class="row top-row">
                      <i
                        class="fas fa-angle-down row-btn"
                        @click="(event) => showContent(event)"
                      ></i>

                      <div class="col">
                        <p>
                          <span>{{ pendingIssuesCard.issue }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          <span>{{ pendingIssuesCard.who }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          <span>{{ pendingIssuesCard.StartTime }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <p
                          :class="`status ${statusClass(
                            pendingIssuesCard.status
                          )}`"
                        >
                          <span>{{ pendingIssuesCard.status }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <div class="btns__wrapper">
                          <button
                            class="table-btn"
                            @click="
                              setChosenForm(
                                'pendingIssues',
                                'PUT',
                                pendingIssuesCard.id
                              )
                            "
                          >
                            <i class="fal fa-pen"></i>
                          </button>
                          <button
                            class="table-btn"
                            @click="
                              deleteData({
                                body: { id: pendingIssuesCard.id },
                                apiName: 'pendingIssues',
                              })
                            "
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row bottom-row">
                      <div class="com-row">
                        <div class="primary">
                          <div>
                            <span> Action Taken : </span>
                            {{ pendingIssuesCard.ActionTaken }}
                          </div>
                          <div>
                            <span> Next Action :</span>
                            {{ pendingIssuesCard.NextAction }}
                          </div>
                        </div>
                        <div class="secondary">
                          <div>
                            <span> Close Time : </span>
                            {{ pendingIssuesCard.CloseTime }}
                          </div>
                        </div>
                      </div>
                      <div class="desc">
                        <span> Description : </span>
                        {{ pendingIssuesCard.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Use Case -->

          <div class="useCase" v-if="wikiPage == 'Use Case Library'">
            <!-- <div class="use-case__into">
            <div class="use-case__panar">
              <h1 class="title">business risks</h1>
              <h1 class="title">use cases</h1>
              <h1 class="title">detection rules</h1>
            </div>
            <p>Use Cases are driven from Business(Risk,Threates,Compliance).</p>
            <p>
              Use Cases Top-down tracebility to determine the completeness of
              implementation and demonstrable risk reduction.
            </p>
            <p>
              Use Cases Bottom-up tracebility for contextualizing use case
              output and business alignment.
            </p>
          </div> -->

            <!-- Use Case Intro Form -->

            <div>
              <h1 class="sec__title">Use Case Intro</h1>

              <button
                class="form-btn"
                @click="setChosenForm('useCase', 'POST')"
                v-if="getRole == 'Employee' || getRole == 'admin'"
              >
                <i class="fas fa-plus"></i> add
              </button>
              <div v-if="filteredArray.length > 0">
                <div class="table__wrapper">
                  <div class="table">
                    <div class="table__row header">
                      <div class="col">
                        <h4>Identifier</h4>
                      </div>
                      <div class="col">
                        <h4>Alert Volume</h4>
                      </div>
                      <div class="col">
                        <h4>Threat/Risk</h4>
                      </div>
                      <div class="col">
                        <h4>Use Case Type</h4>
                      </div>

                      <div class="col"></div>
                    </div>

                    <div
                      class="table__row"
                      v-for="useCaseCard in filteredArray"
                      :key="useCaseCard.id"
                    >
                      <div class="row top-row">
                        <i
                          class="fas fa-angle-down row-btn"
                          @click="(event) => showContent(event)"
                        ></i>
                        <div class="col">
                          <p>
                            <span>{{ useCaseCard.identifier }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ useCaseCard.volume }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ useCaseCard.risk }}</span>
                          </p>
                        </div>
                        <div class="col">
                          <p>
                            <span>{{ useCaseCard.type }}</span>
                          </p>
                        </div>

                        <div class="col">
                          <div class="btns__wrapper">
                            <button
                              class="table-btn"
                              @click="
                                setChosenForm('useCase', 'PUT', useCaseCard.id)
                              "
                            >
                              <i class="fas fa-pen"> </i>
                            </button>
                            <button
                              class="table-btn"
                              @click="
                                deleteData({
                                  body: { id: useCaseCard.id },
                                  apiName: 'useCase',
                                })
                              "
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="row bottom-row">
                        <div class="com-row">
                          <div class="primary">
                            <div>
                              <span>Stakeholders</span> :
                              {{ useCaseCard.stakeholders }}
                            </div>
                            <div>
                              <span>Logic</span> : {{ useCaseCard.logic }}
                            </div>
                            <div>
                              <span>Testing</span> : {{ useCaseCard.testing }}
                            </div>
                            <div>
                              <span>Purpose</span> :
                              {{ useCaseCard.purpose }}
                            </div>
                          </div>
                          <div class="secondary">
                            <div>
                              <span>Playbook</span> : {{ useCaseCard.playbook }}
                            </div>
                            <div>
                              <span>Data Requirements </span>:
                              {{ useCaseCard.requirements }}
                            </div>
                            <div>
                              <span>Production</span> :
                              {{ useCaseCard.production }}
                            </div>
                            <div>
                              <span>Known False Positive</span> :
                              {{ useCaseCard.falsepositive }}
                            </div>
                          </div>
                        </div>
                        <div class="desc">
                          <div>
                            <span>Output</span> : {{ useCaseCard.output }}
                          </div>
                          <div>
                            <span>Tactics</span> : {{ useCaseCard.tactics }}
                          </div>
                          <div>
                            <span>Techniques</span> :
                            {{ useCaseCard.techniques }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Communication -->

          <div class="communication" v-if="wikiPage == 'Communication'">
            <h1 class="sec__title">Commiunication Matrix</h1>
            <button
              class="form-btn"
              @click="setChosenForm('communicationForm', 'POST')"
              v-if="getRole == 'Employee' || getRole == 'admin'"
            >
              <i class="fas fa-plus"></i> add
            </button>
            <div v-if="filteredArray.length > 0">
              <div class="table__wrapper">
                <div class="table">
                  <div class="table__row header">
                    <div class="col">
                      <h4>Team</h4>
                    </div>
                    <div class="col">
                      <h4>Group Manager</h4>
                    </div>
                    <div class="col">
                      <h4>Group Email</h4>
                    </div>
                    <div class="col"><h4>When To Connect</h4></div>
                    <div class="col"></div>
                  </div>

                  <div
                    class="table__row"
                    v-for="c in filteredArray"
                    :key="c.id"
                  >
                    <div class="row top-row">
                      <i
                        class="fas fa-angle-down row-btn"
                        @click="(event) => showContent(event)"
                      ></i>
                      <div class="col">
                        <p>
                          <span>{{ c.Team }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          <span> {{ c.GroupManager }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          <span>{{ c.GroupEmail }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <p>
                          <span>{{ c.Action }}</span>
                        </p>
                      </div>
                      <div class="col">
                        <div class="btns__wrapper">
                          <button
                            class="table-btn"
                            @click="
                              setChosenForm('communicationForm', 'PUT', c.id)
                            "
                          >
                            <i class="fal fa-pen"></i>
                          </button>
                          <button
                            class="table-btn"
                            @click="
                              deleteData({
                                body: { id: c.id },
                                apiName: 'Communication',
                              })
                            "
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row bottom-row">
                      <div class="com-row">
                        <div class="primary">
                          <div>
                            <span>Primary Name</span> : {{ c.PrimaryName }}
                          </div>
                          <div>
                            <span>Primary Email</span> : {{ c.PrimaryEmail }}
                          </div>

                          <div>
                            <span>Primary Phone</span> : {{ c.PrimaryPhone }}
                          </div>
                        </div>

                        <div class="secondary">
                          <div>
                            <span>Secondary Email</span> :
                            {{ c.SecondaryEmail }}
                          </div>
                          <div>
                            <span>Secondary Phone</span> :
                            {{ c.SecondaryPhone }}
                          </div>
                          <div>
                            <span>Secondary Name</span> : {{ c.SecondaryName }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Administration -->
          <div
            v-if="wikiPage == 'Administration' && getRole == 'admin'"
            class="users"
          >
            <users />
          </div>
          <!-- Skill Matrix -->
          <div v-if="wikiPage == 'skillMatrix'">
            <skill-matrix />
          </div>
          <div
            class="no-data"
            v-if="
              !loading &&
              filteredArray.length == 0 &&
              wikiPage != 'Administration' &&
              wikiPage != ''
            "
          >
            <h3>no data to show.</h3>
          </div>
        </div>
      </div>

      <modal
        class="secform"
        v-on:close="setChosenForm('', '')"
        v-if="getChosenForm"
      >
        <add-shift-form v-if="getChosenForm == 'addShift'" />
        <edit-shift-form v-if="getChosenForm == 'editShift'" />
        <use-case-form
          formTitle="Use Case Form"
          v-if="getChosenForm == 'useCase'"
        />
        <serviceCatalogeForm
          formTitle="Service Catalog Form"
          v-if="getChosenForm == 'serviceCatalog'"
        />
        <advisoryForm
          formTitle="Advisory Form"
          v-if="getChosenForm == 'advisory'"
        />
        <health-check-form
          v-if="getChosenForm == 'healthCheck'"
          formTitle="Health Check Form"
        />

        <alerts-form v-if="getChosenForm == 'alerts'" formTitle="Alerts" />
        <incident-form
          v-if="getChosenForm == 'incidents'"
          formTitle="Incidents"
        />
        <pending-issues-form
          v-if="getChosenForm == 'pendingIssues'"
          formTitle="Pending Issues"
        />
        <incident-main-form
          v-if="getChosenForm == 'incidentMainForm'"
          formTitle="Incident"
        />
        <communication-form
          v-if="getChosenForm == 'communicationForm'"
          formTitle="Communication"
        />
        <play-book-form
          v-if="getChosenForm == 'playBookForm'"
          formTitle="Play Book"
        />
        <addPdf
          :apiName="chosenCat == 'socReports' ? 'Reports' : chosenCat"
          v-if="getChosenForm == 'addPdf'"
          formTitle="Add pdf"
        />
      </modal>
    </article>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import incidentMainFormfrom from "@/components/incidentMainForm.vue";
import modal from "@/components/modal.vue";
import advisoryForm from "@/components/advisoryForm.vue";
import serviceCatalogeForm from "@/components/serviceCatalogeForm.vue";
import UseCaseForm from "../components/useCaseForm.vue";
import healthCheckForm from "../components/healthCheckForm.vue";
import healthIssues from "../components/healthIssues.vue";
import alertsForm from "@/components/alertsForm.vue";
import baseSpinner from "@/components/baseSpinner.vue";
import incidentForm from "@/components/incidentForm.vue";
import pendingIssuesForm from "@/components/pendingIssuesForm.vue";
import IncidentMainForm from "../components/incidentMainForm.vue";
import communicationForm from "@/components/communicationForm.vue";
import playBookForm from "@/components/playBookForm.vue";
import Shifts from "../components/shifts.vue";
import addPdf from "@/components/addPdf.vue";
import addShiftForm from "@/components//shifts/addShiftForm.vue";
import editShiftForm from "@/components//shifts/editShiftForm.vue";
import * as selectCategories from "../assets/data";
import users from "../components/users.vue";
import skillMatrix from "@/components/skill/skillMatrix.vue";
export default {
  name: "wikiPage",
  data() {
    return {
      selectCategories,
      loading: false,
      showSideMenu: "",
      wikiPage: "",
      chosenCat: "",
      title: "",
      currentWikiPage: "",
      newAddedObjects: [],
      filteredArray: [],
      allData: [],
      nothingToSee: false,
      filterObj: {
        inputName: "",
        select: [],
        filteringCategory: "",
        filterInputValue: "",
        filterTextName: "",
        selectValues: [],
      },
    };
  },
  components: {
    addShiftForm,
    editShiftForm,
    modal,
    UseCaseForm,
    serviceCatalogeForm,
    advisoryForm,
    baseSpinner,
    healthCheckForm,
    healthIssues,
    alertsForm,
    incidentForm,
    pendingIssuesForm,
    incidentMainFormfrom,
    IncidentMainForm,
    communicationForm,
    playBookForm,
    Shifts,
    addPdf,
    users,
    skillMatrix,
  },
  computed: {
    ...mapState(["wikiSections", "chosenForm"]),
    ...mapGetters([
      "getRole",
      "getUseCase",
      "getAdvisory",
      "getServiceCatalog",
      "getChosenForm",
      "getNewAddedObjects",
      "getHealthCheck",
      "getHealthIssue",
      "getAlerts",
      "getIncidents",
      "getPendingIssues",
      "getReports",
      "getPolicies",
      "getProcedures",
      "getMainIncident",
      "getCommunication",
      "getPlayBook",
    ]),
  },
  mounted() {
    this.$store.dispatch("getData", "Communication");
    this.$store.dispatch("getData", "useCase");
  },
  watch: {
    chosenCat: {
      handler() {
        this.getFilterObj(this.chosenCat);
      },
      immediate: true,
    },
  },
  methods: {
    displaySideMenu() {
      this.showSideMenu = !this.showSideMenu;
    },
    getFilterObj(value) {
      this.filteringCategory = value;
      console.log(value);
      switch (value) {
        case "Use Case Library":
          {
            this.filteredArray = this.getUseCase;
            this.allData = this.getUseCase;
            this.filterObj.filterTextName = "identifier";
            this.filterObj.inputName = "Identifier";
            this.filterObj.select = [
              {
                name: "volume",
                values: [...selectCategories.alertVolumes],
              },
            ];
          }
          break;
        case "pendingIssues":
          {
            this.filteredArray = this.getPendingIssues;
            this.allData = this.getPendingIssues;
            this.filterObj.filterTextName = "issue";
            this.filterObj.inputName = "Name";
            this.filterObj.select = [
              {
                name: "status",
                values: [...selectCategories.shiftStatus],
              },
            ];
          }
          break;
        case "incidents":
          {
            this.filteredArray = this.getIncidents;
            this.allData = this.getIncidents;
            this.filterObj.filterTextName = "name";
            this.filterObj.inputName = "Name";
            this.filterObj.select = [
              {
                name: "status",
                values: [...selectCategories.shiftStatus],
              },
            ];
          }
          break;
        case "alerts":
          {
            this.filteredArray = this.getAlerts;
            this.allData = this.getAlerts;
            this.filterObj.filterTextName = "name";
            this.filterObj.inputName = "Name";
            this.filterObj.select = {};
          }
          break;
        case "healthCheck":
          {
            this.filteredArray = this.getHealthCheck;
            this.allData = this.getHealthCheck;
            this.filterObj.filterTextName = "Who";
            this.filterObj.inputName = "Who";
            this.filterObj.select = [
              {
                name: "Issue Status",
                values: [...selectCategories.shiftStatus],
              },
            ];
          }
          break;
        case "Communication":
          {
            this.filteredArray = this.getCommunication;
            this.allData = this.getCommunication;
            this.filterObj.filterTextName = "Team";
            this.filterObj.inputName = "Team";
            this.filterObj.select = {};
          }
          break;
        case "Policies":
          {
            this.filteredArray = this.getPolicies;
            this.allData = this.getPolicies;
            this.filterObj.filterTextName = "title";
            this.filterObj.inputName = "Policy Title";
            this.filterObj.select = {};
          }
          break;
        case "Procedures":
          {
            this.filteredArray = this.getProcedures;
            this.allData = this.getProcedures;
            this.filterObj.filterTextName = "title";
            this.filterObj.inputName = "Process Title";
            this.filterObj.select = {};
          }
          break;
        case "Playbooks":
          {
            this.filteredArray = this.getPlayBook;
            this.allData = this.getPlayBook;
            this.filterObj.filterTextName = "title";
            this.filterObj.inputName = "PlayBook Title";
            this.filterObj.select = {};
          }
          break;
        case "advisory":
          {
            this.filteredArray = this.getAdvisory;
            this.allData = this.getAdvisory;
            this.filterObj.inputName = "Advisory Source";
            this.filterObj.filterTextName = "source";
            this.filterObj.select = {};
          }
          break;
        case "socReports":
          {
            this.filteredArray = this.getReports;
            this.allData = this.getReports;
            this.filterObj.filterTextName = "title";
            this.filterObj.inputName = "Soc Title";
            this.filterObj.select = {};
          }
          break;
        case "mainIncident":
          {
            this.filteredArray = this.getMainIncident;
            this.allData = this.getMainIncident;
            this.filterObj.inputName = "Incident Name";
            this.filterObj.filterTextName = "IncidentName";
            this.filterObj.select = [
              {
                name: "Priority",
                values: [...selectCategories.incidentPriority],
              },
            ];
          }
          break;
      }
      console.log(this.filteredArray);
    },
    editString(str) {
      return str.replace(/\s/g, "");
    },
    filterData(selectCat) {
      let newArr = this.filteredArray;
      let val = "";
      if (this.filterObj.filterInputValue) {
        val = this.filterObj.filterInputValue.trim().toLowerCase();
      }
      switch (this.filteringCategory) {
        case "advisory":
        case "socReports":
        case "Policies":
        case "Procedures":
        case "Playbooks":
        case "Communication":
        case "alerts":
          {
            console.log(this.filteringCategory);
            console.log(val);
            newArr = this.filteredArray.filter(
              (el) =>
                el[this.filterObj.filterTextName]
                  .trim()
                  .toLowerCase()
                  .startsWith(val) == true
            );
            console.log(newArr);
          }
          break;
        case "mainIncident":
        case "healthCheck":
        case "incidents":
        case "pendingIssues":
        case "Use Case Library":
          {
            if (selectCat != undefined && selectCat.length >= 1) {
              selectCat = this.editString(selectCat);
              const selectValue = this.filterObj.selectValues[0];
              console.log(selectValue);
              // console.log(selectCat);
              // newArr.forEach(el => {
              //   console.log(el[selectCat]);
              // })
              newArr = newArr.filter((el) => {
                if (
                  el[selectCat] &&
                  el[selectCat].toLowerCase() == selectValue.toLowerCase()
                )
                  return el;
              });
            }
            console.log(val);
            if (val) {
              newArr = newArr.filter((el) => {
                if (
                  el[this.filterObj.filterTextName] &&
                  el[this.filterObj.filterTextName]
                    .trim()
                    .toLowerCase()
                    .startsWith(val) == true
                )
                  return el;
              });
            }
          }
          break;
      }
      if (newArr.length >= 1) this.filteredArray = newArr;
      else {
        this.nothingToSee = true;
        this.filteredArray = this.allData;
        for (let i = 0; i < this.filterObj.selectValues.length; i++) {
          this.filterObj.selectValues[i] = "";
        }
        this.filterObj.filterInputValue = "";
      }
      if (!val) this.filteredArray = this.allData;
      if (this.nothingToSee) {
        setTimeout(() => {
          this.nothingToSee = false;
        }, 1000);
      }
    },
    changeWikiPage(page) {
      console.log("change" + " " + page);
      this.currentWikiPage = page;

      if (
        page == "Communication" ||
        page == "Use Case Library" ||
        page == "Shifts" ||
        page == "skillMatrix" ||
        page == "Administration"
      ) {
        this.chosenCat = "";
        this.wikiPage = page;
        if (page == "Use Case Library") this.getWikiData("useCase");
        else this.getWikiData(page);
        document.querySelectorAll(".menu__item .sub-menu").forEach((ul) => {
          ul.style.height = "0";
        });
        Array.from(document.querySelectorAll(".sub-menu-icon")).forEach((i) => {
          i.className = "fas fa-angle-down sub-menu-icon";
        });
      }
      if (
        page == "Communication" ||
        page == "Use Case Library" ||
        page == "skillMatrix"
      )
        this.chosenCat = page;
    },
    showMenu(event) {
      console.log(event.target);
      let icon = event.target.querySelector(".sub-menu-icon");
      const parent = event.target.parentElement;
      const list = parent.querySelector(".sub-menu");
      if (list) {
        let height = list.getBoundingClientRect().height;
        if (height > 17) {
          list.style.height = "0px";
          list.classList.remove("show");
          icon.className = "fas fa-angle-down sub-menu-icon";
          return;
        }
        height = 10;
        Array.from(parent.querySelector(".sub-menu").children).forEach((li) => {
          height += li.getBoundingClientRect().height;
        });
        document.querySelectorAll(".menu__item .sub-menu").forEach((ul) => {
          ul.style.height = "0";
        });
        Array.from(document.querySelectorAll(".sub-menu-icon")).forEach((i) => {
          i.className = "fas fa-angle-down sub-menu-icon";
        });
        icon.className = "fas fa-angle-up sub-menu-icon";
        list.classList.add("show");
        list.style.height = `${height}px`;
      } else return;
    },
    setChosenForm(formName, method, id = "") {
      this.$store.commit("setChosenForm", formName);
      this.$store.commit("setChosenFormMethod", method);
      this.$store.commit("setChosenFormId", id);
    },
    showContent(event) {
      Array.from(document.querySelectorAll(".row-btn")).forEach((i) => {
        i.className = "fas fa-angle-down row-btn";
      });
      event.target.className = "fas fa-angle-up row-btn";
      const topRowElements =
        event.target.parentElement.querySelectorAll(".col p");
      const bottomRow =
        event.target.parentElement.parentElement.querySelector(".bottom-row");
      let open =
        event.target.parentElement.getBoundingClientRect().height > 47
          ? true
          : false;
      if (bottomRow) {
        open = bottomRow.getBoundingClientRect().height > 0 ? true : false;
        Array.from(document.querySelectorAll(".bottom-row")).forEach((row) => {
          row.style.height = 0;
        });
        let height = 0;
        Array.from(bottomRow.children).forEach((el) => {
          height += el.getBoundingClientRect().height;
        });
        if (open) {
          event.target.className = "fas fa-angle-down row-btn";
          height = 0;
        }
        bottomRow.style.height = height + "px";
        // bottomRow.style.height = 'auto';
      }
      Array.from(document.querySelectorAll(".col p")).forEach((p) => {
        p.style.maxHeight = "1.8rem";
      });
      Array.from(topRowElements).forEach((p) => {
        if (!open) p.style.maxHeight = "unset";
        else p.style.maxHeight = "1.8rem";
      });
    },
    activateLink(event) {
      console.log(event);
      const lists = document.querySelectorAll(".sub-menu");
      lists.forEach((list) => {
        Array.from(list.children).forEach((li) => {
          li.classList.remove("active");
        });
      });
      if (event.srcElement.localName == "span") {
        event.target.parentElement.classList.add("active");
      } else {
        event.target.classList.add("active");
      }
    },
    showPDF(event) {
      event.target.className = "fas fa-angle-up open-pdf";
      const container = event.target.parentElement;
      let height = container.getBoundingClientRect().height;
      const open = height > 64 ? true : false;
      Array.from(container.children).forEach((c) => {
        height += c.getBoundingClientRect().height;
      });
      if (open) {
        event.target.className = "fas fa-angle-down open-pdf";
        height = 56;
      }
      container.style.height = height + "px";
    },
    async changeCat(val, event) {
      console.log("changecat");

      this.activateLink(event);
      this.wikiPage = this.currentWikiPage;
      console.log(this.currentWikiPage);
      if (val == "socReports") {
        this.loading = true;
        let response = await this.$store.dispatch("getData", "Reports");
        if (response) this.loading = false;
      } else if (val.length && !this.$store.state[val].length) {
        this.loading = true;
        let response = await this.$store.dispatch("getData", val);
        if (response) {
          this.getFilterObj(val);
        }
        this.loading = false;
      }
      this.chosenCat = val;
    },
    async getWikiData(target) {
      console.log(target);
      if (this.$store.state[target].length == 0) {
        console.log(this.$store.state[target].length);
        this.loading = true;
        let response = await this.$store.dispatch("getData", target);
        if (response) this.loading = false;
      }
      if (Object.entries(this.$store.state[target]).length == 0) {
        //console.log("ttt");
        this.loading = true;
        let response = await this.$store.dispatch("getData", target);
        if (response) this.loading = false;
      }
    },
    upload() {
      let formData = new FormData();
      let file = document.querySelector("input[type=file]");
      formData.append("file", file.files[0]);
      formData.append("title", this.title);
      this.$store.dispatch("uploadPdf", {
        apiName: this.wikiPage,
        body: formData,
      });
    },
    deleteData(data) {
      this.$store.dispatch("delete", data);
    },
    parse(data) {
      return JSON.parse(data);
    },
    statusClass(status) {
      return status.includes(" ")
        ? status.substring(0, status.indexOf(" ")).toLowerCase()
        : status.toLowerCase();
    },
  },
};
</script>
<style>
.no-data {
  width: 100%;
  text-align: center;
  margin-top: 3rem;
  text-transform: capitalize;
}
.light-mode .no-data h3 {
  color: #000;
}
.com-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.btns__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.btns__wrapper .table-btn:nth-child(2) {
  color: rgb(202, 42, 42);
}
.btns__wrapper .table-btn:nth-child(1) {
  color: rgb(86, 143, 86);
}
.book__table > div {
  padding: 0.5rem 0;
  width: 18rem;
}
.book__table .col {
  padding: 0;
}
.book__img img {
  height: 15rem;
}
.mainSpinner {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
}
.use__img img {
  width: 100%;
  height: 100%;
}
.book__table .header .col h4 {
  color: #fff;
}
.nothing {
  color: red;
  width: 100%;
  font-size: 1.1rem;
}
.wiki__container {
  width: 80%;
  margin: 1rem auto;
}
.filteration__wrapper {
  align-self: flex-start;
  justify-self: flex-start;
  height: auto;
  width: 80%;
  margin: auto;
}
.filter__form {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 2rem;
}
.filter__selects {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  margin-left: 1rem;
}
.filter__form .form__control .form__control-label {
  z-index: 1;
  text-transform: capitalize;
}
.filter__selects .select {
  margin-left: 1rem;
}
.filter__selects .select:first-of-type {
  margin-left: 0;
}
.filteration__wrapper .form__control span {
  color: #fff;
}
.filteration__wrapper .form__control input:focus ~ .form__control-label,
.filteration__wrapper .form__control select:valid ~ .form__control-label {
  color: #fff;
}
@media screen and (max-width: 1200px) {
  .wiki__container {
    width: 90%;
  }
}
.users {
  width: 80%;
}
.playbooks .table__row .col p {
  text-align: center;
}
</style>
