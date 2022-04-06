<template>
  <section class="wiki">
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
              <button @click="showMenu($event)">
                <i :class="item.class"></i>
                {{ item.section }}
                <i
                  class="fas fa-angle-down sub-menu-icon"
                  v-if="
                    item.section == 'Shift Handover' ||
                    item.section == 'Reports'
                  "
                ></i>
              </button>
              <ul
                class="sub-menu"
                v-if="
                  item.section == 'Shift Handover' || item.section == 'Reports'
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
          <div
            @click="changeWikiPage(wikiItem.section)"
            class="wiki__item"
            v-for="wikiItem in wikiSections"
            :key="wikiItem.section"
          >
            <h3 class="wiki__item-title">{{ wikiItem.section }}</h3>
            <ul>
              <li v-for="i in 3" :key="i">Lorem ipsum dolor sit amet.</li>
            </ul>
          </div>
        </div>

        <!-- Reports -->

        <div class="reports" v-if="wikiPage == 'Reports'">
          <div v-if="chosenCat == 'socReports'">
            <div class="pdfs__wrapper">
              <div class="pdfs__top">
                <h1 class="sec__title">
                  {{ wikiPage }}
                </h1>
                <h4>Upload File</h4>
                <input
                  type="text"
                  name="title"
                  v-model="title"
                  placeholder="Title"
                  required
                />
                <input type="file" id="file" ref="file" />
                <button
                  type="button"
                  class="upload-btn submit-btn"
                  @click="upload"
                >
                  Upload file
                </button>
              </div>
            </div>

            <div
              class="pdf-wrapper"
              v-for="report in getReports"
              :key="report.id"
            >
              <button
                class="delete-btn"
                @click="
                  deletePdf({ body: { id: report.id }, apiName: 'Reports' })
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

                <embed :src="report.url" type="" width="500px" height="500px" />
              </div>
            </div>
          </div>
          <div v-if="chosenCat == 'advisory'">
            <h1 class="sec__title">Advisory</h1>
            <button class="form-btn" @click="setChosenForm('advisory')">
              + add
            </button>
            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Advisory Source</h4>
                  </div>
                  <div class="col">
                    <h4>Date</h4>
                  </div>
                  <div class="col">
                    <h4>Reference ID</h4>
                  </div>
                  <div class="col">
                    <h4>Description</h4>
                  </div>
                </div>

                <div
                  class="table__row"
                  v-for="advisoryCard in getAdvisory"
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
                        <span>{{ advisoryCard.description }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row bottom-row">
                    <div>Applicable : {{ advisoryCard.applicable }}</div>
                    <div v-if="advisoryCard.applicable == 'No'">
                      Actions Taken : {{ advisoryCard.token }}
                    </div>
                    <div>Notes : {{ advisoryCard.notes }}</div>
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
                @click="setChosenForm('incidentMainForm')"
              >
                add
              </button>
            </div>
            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Incident Name</h4>
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
                </div>
                <div
                  class="table__row"
                  v-for="i in getMainIncident"
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
                  </div>
                  <div class="row bottom-row">
                    <div class="incident-sec__wrapper">
                      <h3>Incident Identification</h3>
                      <div>Location : {{ i.Location }}</div>
                      <div>
                        Contact Info :
                        {{ i.ContactInfo }}
                      </div>
                      <div>
                        Time Of Detection :
                        {{ i.TimeOfDetection }}
                      </div>
                      <div>
                        Repeated Incident :
                        {{ i.RepeatedIncident }}
                      </div>
                      <div>
                        Impact Duration :
                        {{ i.ImpactDuration }}
                      </div>
                      <div>
                        Affected System :
                        {{ i.AffectedSystem }}
                      </div>
                    </div>
                    <div class="incident-sec__wrapper">
                      <h3>Incident Triage</h3>
                      <div>
                        Incident Verification :
                        {{ i.IncidentVerification }}
                      </div>
                      <div>
                        Incident Classification:
                        {{ i.IncidentClassification }}
                      </div>
                      <div>Description : {{ i.Description }}</div>
                    </div>
                    <div class="incident-sec__wrapper">
                      <h3>Incident Containment</h3>
                      <div>
                        Evidence Acquiring :
                        {{ i.EvidenceAcquiring }}
                      </div>
                      <div>Data Health : {{ i.DataHealth }}</div>
                      <div>
                        Containment Measures :
                        {{ i.ContainmentMeasures }}
                      </div>
                      <div>
                        Eradication Measures :
                        {{ i.EradicationMeasures }}
                      </div>
                      <div>
                        Recovery Measures :
                        {{ i.RecoveryMeasures }}
                      </div>
                    </div>

                    <div class="incident-sec__wrapper">
                      <h3>Post Incident Activity</h3>
                      <div>Notification : {{ i.Notification }}</div>
                      <div>
                        Case Analysis :
                        {{ i.CaseAnalysis }}
                      </div>
                      <div>
                        Incident Availability :
                        {{ i.IncidentAvailability }}
                      </div>
                    </div>
                    <div class="incident-sec__wrapper">
                      <h3>Incident Closure</h3>
                      <div>Improvements : {{ i.Improvements }}</div>
                      <div>Time Of Closure : {{ i.TimeOfClosure }}</div>
                    </div>
                    <div class="incident-sec__wrapper">
                      <h3>Reviewed By</h3>
                      <div>Title : {{ i.Title }}</div>
                      <div>Signature : {{ i.Signature }}</div>
                      <div>Date : {{ i.Date }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="pdfs__wrapper"
          v-if="wikiPage == 'Procedures' || wikiPage == 'Policies'"
        >
          <div class="pdfs__top">
            <h1 class="sec__title">
              {{ wikiPage }}
            </h1>
            <h4>Upload File</h4>
            <input
              type="text"
              name="title"
              v-model="title"
              placeholder="Title"
              required
            />
            <input type="file" id="file" ref="file" />
            <button type="button" class="upload-btn submit-btn" @click="upload">
              Upload file
            </button>
          </div>

          <div class="pdfs__container" v-if="wikiPage == 'Policies'">
            <div
              class="pdf-wrapper"
              v-for="policy in getPolicies"
              :key="policy.name"
            >
              <button
                class="delete-btn"
                @click="
                  deletePdf({ body: { id: policy.id }, apiName: 'Policies' })
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

                <embed :src="policy.url" type="" width="500px" height="500px" />
              </div>
            </div>
          </div>
          <div class="pdfs__container" v-if="wikiPage == 'Procedures'">
            <div
              class="pdf-wrapper"
              v-for="procedure in getProcedures"
              :key="procedure.name"
            >
              <button
                class="delete-btn"
                @click="
                  deletePdf({
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

        <!-- Shift Hand -->

        <div class="shiftHand" v-if="wikiPage == 'Shift Handover'">
       <div class="shifts__wrapper">
         <Shifts />
        
       </div>
          <!-- Health Check -->

          <div v-if="chosenCat == 'healthCheck'">
            <h1 class="sec__title">Health Check</h1>
            <button class="form-btn" @click="setChosenForm('healthCheck')">
              + add
            </button>
            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Check Description</h4>
                  </div>
                  <div class="col">
                    <h4>Check Status</h4>
                  </div>
                </div>
                <div
                  class="table__row top-row"
                  v-for="h in getHealthCheck"
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

                    <div
                      class="col"
                      :class="h.Status == 'Not Ok' ? 'issue' : 'not-issue'"
                    >
                      <p>
                        {{ h.Status }}
                      </p>
                    </div>
                  </div>

                  <div v-if="h.Status == 'Not Ok'" class="row bottom-row">
                    <h3 style="padding-left: 0.6rem">Health Issue</h3>
                    <div>Issue Found : {{ h.IssuesFound }}</div>
                    <div>Component : {{ h.Component }}</div>
                    <div>IP : {{ h.Ip }}</div>
                    <div>Hostname : {{ h.Hostname }}</div>
                    <div>Start Time : {{ h.StartTime }}</div>
                    <div>Issue Description : {{ h.IssueDescription }}</div>
                    <div>Action Taken : {{ h.ActionTaken }}</div>
                    <div>Next Action : {{ h.NextAction }}</div>
                    <div>Who : {{ h.Who }}</div>
                    <div :class="statusClass(h.IssueStatus)">
                      Issue Status : {{ h.IssueStatus }}
                    </div>
                    <div>Close Time : {{ h.CloseTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Alerts -->

          <div v-if="chosenCat == 'alerts'">
            <h1 class="sec__title">Alerts</h1>
            <button class="form-btn" @click="setChosenForm('alerts')">
              + add
            </button>
            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Alert Name</h4>
                  </div>
                  <div class="col">
                    <h4>Alert Number</h4>
                  </div>
                  <div class="col">
                    <h4>Start Time</h4>
                  </div>
                  <div class="col">
                    <h4>Alert Description</h4>
                  </div>
                </div>
                <div
                  class="table__row"
                  v-for="alertsCard in getAlerts"
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
                      <p>
                        <span>{{ alertsCard.description }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row bottom-row">
                    <div>Action Taken : {{ alertsCard.ActionTaken }}</div>
                    <div>Next Action : {{ alertsCard.NextAction }}</div>
                    <div>Who : {{ alertsCard.who }}</div>
                    <div :class="statusClass(alertsCard.status)">
                      <p>
                        <span>{{ alertsCard.status }}</span>
                      </p>
                    </div>
                    <div>Close Time : {{ alertsCard.CloseTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Incidents -->

          <div v-if="chosenCat == 'incidents'">
            <h1 class="sec__title">Incidents</h1>
            <button class="form-btn" @click="setChosenForm('incidents')">
              + add
            </button>
            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Incident Date</h4>
                  </div>
                  <div class="col">
                    <h4>Incident Name</h4>
                  </div>
                  <div class="col">
                    <h4>Incident Number</h4>
                  </div>

                  <div class="col">
                    <h4>Incident Description</h4>
                  </div>
                </div>

                <div
                  class="table__row"
                  v-for="incidentsCard in getIncidents"
                  :key="incidentsCard.id"
                >
                  <div class="row top-row">
                    <i
                      class="fas fa-angle-down row-btn"
                      @click="(event) => showContent(event)"
                    ></i>
                    <div class="col">
                      <p>
                        <span>{{ incidentsCard.date }}</span>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        <span>{{ incidentsCard.name }}</span>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        <span>{{ incidentsCard.number }}</span>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        <span>{{ incidentsCard.description }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row bottom-row">
                    <div>Action Taken : {{ incidentsCard.ActionTaken }}</div>
                    <div>Next Action : {{ incidentsCard.NextAction }}</div>
                    <div>Who : {{ incidentsCard.who }}</div>

                    <div :class="statusClass(incidentsCard.status)">
                      <p>
                        <span>{{ incidentsCard.status }}</span>
                      </p>
                    </div>
                    <div>Close Time : {{ incidentsCard.CloseTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending Issues -->

          <div v-if="chosenCat == 'pendingIssues'">
            <h1 class="sec__title">Pending Issues</h1>
            <button class="form-btn" @click="setChosenForm('pendingIssues')">
              + add
            </button>
            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Issue Name</h4>
                  </div>
                  <div class="col">
                    <h4>Issue Description</h4>
                  </div>
                  <div class="col">
                    <h4>Start Time</h4>
                  </div>
                  <div class="col">
                    <h4>Action Taken</h4>
                  </div>
                </div>

                <div
                  class="table__row"
                  v-for="pendingIssuesCard in getPendingIssues"
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
                        <span>{{ pendingIssuesCard.description }}</span>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        <span>{{ pendingIssuesCard.StartTime }}</span>
                      </p>
                    </div>
                    <div class="col">
                      <p>
                        <span>{{ pendingIssuesCard.ActionTaken }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row bottom-row">
                    <div>Next Action : {{ pendingIssuesCard.NextAction }}</div>
                    <div>Who: {{ pendingIssuesCard.who }}</div>
                    <div :class="statusClass(pendingIssuesCard.status)">
                      <p>
                        <span>{{ pendingIssuesCard.status }}</span>
                      </p>
                    </div>
                    <div>Close Time : {{ pendingIssuesCard.CloseTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Use Case -->

        <div class="useCase" v-if="wikiPage == 'Use Case Framework'">
          <div class="use-case__into">
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
          </div>

          <!-- Use Case Intro Form -->

          <div>
            <h1 class="sec__title">Use Case Intro</h1>

            <button class="form-btn" @click="setChosenForm('useCase')">
              + add
            </button>

            <div class="table__wrapper">
              <div class="table">
                <div class="table__row header">
                  <div class="col">
                    <h4>Use Case Identifier</h4>
                  </div>
                  <div class="col">
                    <h4>Use Case Purpose</h4>
                  </div>
                  <div class="col">
                    <h4>Threat/Risk</h4>
                  </div>
                  <div class="col">
                    <h4>Use Case Type</h4>
                  </div>
                  <div class="col">
                    <h4>Stakeholders</h4>
                  </div>
                </div>

                <div
                  class="table__row"
                  v-for="useCaseCard in getUseCase"
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
                        <span>{{ useCaseCard.purpose }}</span>
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
                      <p>
                        <span>{{ useCaseCard.stakeholders }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="row bottom-row">
                    <div>Risk : {{ useCaseCard.risk }}</div>
                    <div>
                      Data Requirements : {{ useCaseCard.requirements }}
                    </div>
                    <div>Logic : {{ useCaseCard.logic }}</div>
                    <div>Output : {{ useCaseCard.output }}</div>

                    <div>Alert Volume : {{ useCaseCard.volume }}</div>
                    <div>Testing : {{ useCaseCard.testing }}</div>
                    <div>
                      Known False Positive : {{ useCaseCard.falsepositive }}
                    </div>
                    <div>Playbook : {{ useCaseCard.playbook }}</div>
                    <div>Production: {{ useCaseCard.production }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Communication -->

        <div class="communication" v-if="wikiPage == 'Communication'">
          <h1 class="sec__title">Commiunication</h1>
          <button class="form-btn" @click="setChosenForm('communicationForm')">
            + add
          </button>
          <div class="table__wrapper">
            <div class="table">
              <div class="table__row header">
                <div class="col">
                  <h4>Team</h4>
                </div>
                <div class="col">
                  <h4>Primary Name</h4>
                </div>
                <div class="col">
                  <h4>Secondary Name</h4>
                </div>
              </div>

              <div class="table__row" v-for="c in getCommunication" :key="c.id">
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
                      <span>{{ c.PrimaryName }}</span>
                    </p>
                  </div>
                  <div class="col">
                    <p>
                      <span>{{ c.SecondaryName }}</span>
                    </p>
                  </div>
                </div>
                <div class="row bottom-row">
                  <div>Action : {{ c.Action }}</div>
                  <div>Primary Email : {{ c.PrimaryEmail }}</div>

                  <div>Primary Phone : {{ c.PrimaryPhone }}</div>

                  <div>Secondary Email : {{ c.SecondaryEmail }}</div>
                  <div>Secondary Phone : {{ c.SecondaryPhone }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Playbooks -->

        <div class="playbooks" v-if="wikiPage == 'Playbooks'">
          <button class="form-btn" @click="setChosenForm('playBookForm')">
            + add
          </button>

          <div class="table__wrapper">
            <div class="table">
              <div class="table__row header">
                <div class="col">
                  <h4>Title</h4>
                </div>
              </div>

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
                </div>
                <div class="row bottom-row">
                  <div class="book__data">
                    <div>Category : {{ book.category }}</div>
                    <div>Description : {{ book.description }}</div>
                    <div class="book__table">
                      <div class="book_table">
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
                          class="row top-row"
                          v-for="(r, index) in parse(book.data)"
                          :key="index"
                        >
                          <div class="col">
                            <p>
                              <span>{{ r.activity }}</span>
                            </p>
                          </div>
                          <div class="col">
                            <p>
                              <span>{{ r.irStage }}</span>
                            </p>
                          </div>
                          <div class="col">
                            <p>
                              <span>{{ r.team }}</span>
                            </p>
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

      <modal
        class="secform"
        v-on:close="setChosenForm('')"
        v-if="getChosenForm"
      >
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
        <!-- <health-issues
          v-if="getChosenForm == 'healthIssue'"
          formTitle="Health Issue Form"
        /> -->
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
      </modal>
    </article>
  </section>
</template>

<script>
// Use Case Framework Shift Handover
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import incidentMainFormfrom from "@/components/incidentMainForm.vue";
import wikiPDF from "@/components/wikiPDF.vue";
import modal from "@/components/modal.vue";
import advisoryForm from "@/components/advisoryForm.vue";
import serviceCatalogeForm from "@/components/serviceCatalogeForm.vue";
import UseCaseForm from "../components/useCaseForm.vue";
import healthCheckForm from "../components/healthCheckForm.vue";
import healthIssues from "../components/healthIssues.vue";
import alertsForm from "@/components/alertsForm.vue";
import baseSpinner from "@/components/baseSpinner.vue";
import loader from "../components/loader.vue";
import incidentForm from "@/components/incidentForm.vue";
import pendingIssuesForm from "@/components/pendingIssuesForm.vue";
import IncidentMainForm from "../components/incidentMainForm.vue";
import communicationForm from "@/components/communicationForm.vue";
import playBookForm from "@/components/playBookForm.vue";
import Shifts from '../components/shifts.vue';
export default {
  name: "wikiPage",
  data() {
    return {
      loading: false,
      showSideMenu: "",
      wikiPage: "",
      chosenCat: "",
      title: "",
      newAddedObjects: [],
    };
  },
  components: {
    wikiPDF,
    modal,
    UseCaseForm,
    serviceCatalogeForm,
    advisoryForm,
    baseSpinner,
    loader,
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
  },

 computed: {
    ...mapState(["wikiSections", "chosenForm"]),
    ...mapGetters([
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

  methods: {
    displaySideMenu() {
      this.showSideMenu = !this.showSideMenu;
    },
    changeWikiPage(page) {
      console.log("change" + " " + page);
      this.wikiPage = page;
      if (
        ["Policies", "Procedures", "Communication", "Playbooks"].includes(page)
      ) {
        this.getPdf(page);
      }
      if (page == "Use Case Framework")
        this.$store.dispatch("getData", "useCase");
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
    setChosenForm(formName) {
      this.$store.commit("setChosenForm", formName);
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
      console.log(val);
      this.activateLink(event);
      this.chosenCat = val;
      if (val == "socReports") this.getPdf("Reports");
      else if (val.length && !this.$store.state[val].length) {
        let response = await this.$store.dispatch("getData", val);
      }
    },
    getPdf(pdfCat) {
      console.log(pdfCat);
      if (!this.$store.state[pdfCat].length) {
        this.$store.dispatch("getData", pdfCat);
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
    deletePdf(data) {
      this.$store.dispatch("deletePdf", data);
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
.issue {
  background: #cc0000;
}
.not-issue {
  background: #00c851;
}
/* Playbooks */
.playbooks {
  width: 80%;
  margin: 1rem auto;
}
.playbooks .bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.playbooks .book__data {
  display: flex;
  flex-direction: column;
}
.playbooks img {
  width: 100%;
}
.book__img {
  width: auto;
}

/* Incident Main */
.incident-sec__wrapper h3 {
  display: block;
}

/* PDF Styles */

.pdfs__wrapper {
  width: 80%;
  margin: 0rem auto;
}

.pdfs__top h4 {
  margin-bottom: 0.6rem;
  font-weight: 400;
}
.pdfs__top input:first-of-type {
  padding: 0.3rem 0.8rem;
  border: none;
  outline: none;
  border-radius: 1rem;
}
.pdfs__top input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
}
.pdfs__top input[type="file"] {
  color: #fff;
}

.pdfs__top input[type="file"]::before {
  content: "Choose File";
  display: inline-block;
  background: #000a4a;
  border: 1px solid #999;
  border-radius: 8px;
  padding: 7px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  font-size: 10pt;
}
.pdfs__container {
  margin: 2rem 0;
}

.upload-btn {
  display: block;
  width: auto;
  padding: 0.3rem 1rem;
  text-transform: capitalize;
  border-radius: 2rem;
}

.pdfs__top .sec__title {
  font-size: 2rem;
}
.pdf-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.pdf-wrapper .delete-btn {
  padding: 0.3rem 1rem;
  color: rgb(199, 32, 32);
  background: none;
  border-radius: 1rem;
  align-self: flex-start;
  font-size: 1.7rem;
}
.pdf {
  width: 90%;
  border-radius: 0.5rem;
}
.pdf {
  position: relative;
  padding: 1rem;
  border: 0.1px solid rgb(124, 124, 124);
  height: 3.5rem;
  transition: 0.3s;
  overflow: hidden;
}
.pdf .open-pdf {
  font-size: 1.2rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #fff;
  z-index: 100;
  cursor: pointer;
}
.pdf embed {
  width: 100%;
  margin: 2rem auto;
}
.pdf p {
  text-transform: capitalize;
  letter-spacing: 0.1rem;
}

/* Table */

.shiftHand {
  width: 80%;
  margin: 0 auto;
}
.table__wrapper {
  width: 100%;
  margin: 1rem auto;
  max-height: 68vh;
  padding-right: 0.5rem;
  overflow: auto;
}
.table {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.table__wrapper::-webkit-scrollbar-thumb {
  background: #40358e;
  border-radius: 2rem;
}

.table__wrapper::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 2rem;
}

.table__wrapper::-webkit-scrollbar {
  width: 10px;
  height: 0.5rem;
  background-color: #40358e;
}

.table {
  border-radius: 1rem;
  overflow: auto;
}

.table__row {
  width: auto;
  display: flex;
}
.col {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0.3rem;
  border: 1px solid #000;
}
.table__row:nth-child(odd) {
  background: rgb(134, 130, 130);
}
.table__row:nth-child(even) {
  background: rgb(70, 67, 67);
}
.row {
  display: flex;
  width: 100%;
}
.top-row {
  flex-direction: row;
  position: relative;
}
.top-row .col {
  width: 100%;
}

.bottom-row {
  display: flex;
  flex-wrap: wrap;
  height: 0;
  transition: 0.4s;
  overflow: hidden;
}
.bottom-row div {
  width: 100%;
  word-break: break-all;
  padding: 0.5rem 1rem;
}
.row-btn {
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  cursor: pointer;
  z-index: 100;
}
.table__row {
  width: 100%;
  flex-direction: column;
}
.health-check-row {
  flex-direction: row;
}
.table__row.header {
  width: 100%;
  flex-direction: row;
}
.col h4 {
  text-align: center;
  font-size: 1rem;
}
.table__row:not(.table__row:first-child) .col {
  position: relative;
  padding-right: 1rem;
}
.table__row:not(.table__row:first-child) .col p {
  transition: 0.3s;
  word-break: break-all;
  text-transform: capitalize;
  text-align: center;
  max-height: 1.8rem;
  max-width: 200px;
  margin: auto;
  overflow: hidden;
}

/* Wiki Page */

.reports .pdfs__wrapper {
  width: auto;
}

.menu__icon {
  color: #fff;
  letter-spacing: 0.06rem;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem 0;
  border-bottom: 1px solid #fff;
  width: 7.4rem;
  display: none;
}
button {
  color: #fff;
  background: inherit;
  text-transform: capitalize;
}
.wiki__content-wrapper {
  display: flex;
  flex-direction: column;
}
.wiki__content {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.wiki__menu {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 0;
  opacity: 0;
  transition: height 0.3s;
  overflow: hidden;
}
.wiki__menu.show {
  opacity: 1;
  height: 100%;
}
.wiki__menu-wrapper {
  width: auto;
}
.wiki__menu .menu__item {
  width: 100%;
}
.wiki__menu .menu__item button {
  padding: 0.8rem 0.4rem;
  text-align: left;
  background: none;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  transition: 0.3s;
  border-bottom: 1px solid #fff;
  position: relative;
}
.sub-menu-icon {
  position: absolute;
  right: 0.3rem;
  top: 38%;
  bottom: 40%;
  z-index: -1;
}
.wiki__menu .menu__item button i:first-child {
  margin-right: 0.25rem;
}
.wiki__menu .menu__item button:hover {
  background: #eee;
  color: #000;
}
.wiki__items {
  width: 78%;
  display: flex;
  flex-wrap: wrap;
  margin: 3rem auto;
  justify-content: center;
}
.wiki__item {
  width: 260px;
  height: 160px;
  background: #000a4a;
  margin: 1rem;
  padding: 5px 1.3rem;
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
}
.wiki__item:hover {
  transform: scale(1.1);
}
.wiki__item-title {
  color: #fff;
  padding: 1rem 0.5rem 0.5rem;
  font-size: 1.1rem;
}

.wiki__item ul {
  padding: 0 0.5rem;
  width: 80%;
  margin: auto;
}
.wiki__item ul li {
  text-align: left;
  font-size: 0.8rem;
  color: #fff;
  margin-top: 0.5rem;
}

.sub-menu {
  color: #fff;
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: 0.3s;
}
.menu__item.submenu-wrapper {
  border-bottom: 1px solid #fff;
}
.sub-menu.show {
  border-top: 0px;
  padding: 0 0.5rem;
}
.sub-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: left;
  transition: 0.3s;
}
.sub-menu li span {
  position: relative;
}

.sub-menu li span::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  height: 0.1rem;
  background: #fff;
  width: 0;
  transition: 0.3s;
}

.sub-menu li.active span::after {
  width: 100%;
}
.sub-menu li:hover {
  color: #566cff;
}
.sub-menu li:last-child {
  margin: 0;
}
.menu__item.submenu-wrapper button {
  border-bottom: none;
}
.use-case__panar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 2rem;
}
.use-case__panar .title {
  width: 12rem;
  padding: 0.7rem;
  text-transform: capitalize;
  text-align: center;
}
.use-case__panar .title:first-child {
  background: #000a4a;
  transform: translateX(-2rem);
}
.use-case__panar .title:nth-child(2) {
  background: #2c3eaf;
  margin: 0.6rem 0;
  transform: translateX(2rem);
}
.use-case__panar .title:nth-child(3) {
  background: #11207e;
  transform: translateX(6rem);
}
.use-case__into p {
  margin-bottom: 1rem;
}
.useCase {
  width: 80%;
  margin: 1rem auto;
}
.form-btn {
  background: #40358e;
  padding: 0.2rem 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.2rem;
  text-transform: capitalize;
  border: 1px solid #40358e;
}
.sec__title {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 0.8rem;
}
.form-btn:hover {
  background: #fff;
  color: #40358e;
}
/* Communication and Reports */
.communication,
.reports {
  width: 80%;
  margin: 1rem auto;
}

/* Media Queries */

@media screen and (max-width: 1380px) {
  .pdfs__container {
    grid-template-columns: 1fr;
  }
}
@media screen and (max-width: 1200px) {
  .useCase {
    width: 70%;
  }
  .menu__icon {
    display: block;
  }
  .wiki__menu-wrapper {
    width: 80%;
    margin: auto;
  }
  .wiki__menu {
    width: 60%;
    margin: auto;
  }
  .menu__icon {
    margin: auto;
  }
  .shiftHand {
    width: 90%;
  }
  .table__wrapper {
    overflow: auto;
  }
  .table {
    min-width: 65rem;
  }
  .sec__title {
    margin-top: 2rem;
  }
}
@media screen and (max-width: 769px) {
  .wiki__content {
    flex-direction: column;
    height: auto;
  }
  .wiki__items {
    margin-top: 1rem;
    width: 90%;
  }
  .wiki__item {
    padding: 5px 1rem;
    margin: 0 1rem 1rem;
  }
  .wiki__menu-wrapper {
    width: 100%;
    height: 100%;
  }
  .wiki__menu {
    height: 0;
    transform: scale(0);
    transition: transform 0.4s;
  }
  .wiki__menu.show {
    transform: scale(1);
    width: 90%;
    margin: auto;
    height: 100%;
    border: none;
    background: none;
  }
  .wiki__menu .menu__item button {
    padding-bottom: 1rem;
  }
  .menu__icon {
    display: block;
    margin-left: 1rem;
  }
  .useCase {
    width: 90%;
  }
}
</style>
