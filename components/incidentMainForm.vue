<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Incidents</h1>
    <form class="incident-main__form" v-on:submit.prevent="submitData">
      <div class="long__form">
        <div>
          <p>Incident Identification</p>
          <div class="form__control time-control">
            <input type="date" v-model="detectionDate" required />

            <input type="time" v-model="detectionTime" required />
          </div>
          <div class="form__control">
            <input
              type="text"
              name="incidentName"
              required
              v-model="incidentName"
              autocomplete="off"
            />
            <span class="form__control-label">Incident Name</span>
          </div>
          <div class="form__control">
            <input
              type="text"
              name="incidenDetectortName"
              required
              v-model="incidentDetectorName"
              autocomplete="off"
            />
            <span class="form__control-label">Incident Detector's Name</span>
          </div>
          <div class="form__control">
            <input
              type="text"
              name="incidentReferenceNumber"
              required
              v-model="incidentReferenceNumber"
              autocomplete="off"
            />
            <span class="form__control-label">Incident Reference Number</span>
          </div>
          <div class="form__control">
            <input
              type="text"
              name="contactInfo"
              required
              v-model="contactInfo"
              autocomplete="off"
            />
            <span class="form__control-label">Contact Info</span>
          </div>
          <div class="form__control">
            <input
              type="text"
              name="location"
              required
              v-model="location"
              autocomplete="off"
            />
            <span class="form__control-label">Location</span>
          </div>
          <div class="form__control">
            <select name="repeatedIncident" required v-model="repeatedIncident">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <span class="form__control-label">Repeated Incident</span>
          </div>
          <div class="form__control">
            <select name="priority" required v-model="priority">
              <option
                v-for="(p, index) in incidentPriority"
                :key="index"
                :value="p"
              >
                {{ p }}
              </option>
            </select>
            <span class="form__control-label">Priority</span>
          </div>
          <div class="form__control">
            <input
              type="text"
              name="impactDuration"
              required
              v-model="impactDuration"
              autocomplete="off"
            />
            <span class="form__control-label">Impact Duration</span>
          </div>
          <div class="form__control full textarea">
            <textarea
              name="affectedSystem"
              required
              v-model="affectedSystem"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Affected System /Host</span>
          </div>

          <p>INCIDENTS TRIAGE</p>

          <div class="form__control">
            <select
              name="incidentVerification"
              required
              v-model="incidentVerification"
            >
              <option value="True Positive">True Positive</option>
              <option value="False Positive">False Positive</option>
            </select>
            <span class="form__control-label">Incident Verification</span>
          </div>
          <div class="classification">
            <div>
              <p>Incident Classification</p>

              <div
                class="classificationItem"
                v-for="(c, index) in incidentClassifications"
                :key="index"
                :value="c"
              >
                <input
                  type="checkbox"
                  :value="c"
                  v-model="incidentClassification"
                />
                <label :for="c">{{ c }}</label>
              </div>
            </div>
          </div>
          <div class="form__control" v-if="incidentClassification == 'Other'">
            <input
              type="text"
              v-model="otherIncidentClassification"
              autocomplete="off"
              required
            />
            <span class="form__control-label"
              >Other Incident Classification</span
            >
          </div>
          <p>Brief Description :</p>
          <div class="form__control full textarea" style="margin-top: 1.1rem">
            <textarea
              name="incidentDescription"
              v-model="incidentDescription"
              required
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Incident Description</span>
          </div>

          <p>INCIDENT CONTAINMENT, ERADICATION, AND RECOVERY</p>

          <div class="form__control">
            <input
              type="text"
              name="dataSourcesHealth"
              required
              v-model="dataSourcesHealth"
            />
            <span class="form__control-label">Data Sources Health</span>
          </div>
          <div class="form__control full textarea">
            <textarea
              name="evidenceAcquiring"
              required
              v-model="evidenceAcquiring"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Evidence Acquiring</span>
          </div>

          <div class="form__control full textarea">
            <textarea
              name="containmentMeasures"
              required
              v-model="containmentMeasures"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Containment Measures</span>
          </div>
          <div class="form__control full textarea">
            <textarea
              name="eradicationMeasures"
              required
              v-model="eradicationMeasures"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Eradication Measures</span>
          </div>

          <div class="form__control full textarea">
            <textarea
              name="recoveryMeasures"
              required
              v-model="recoveryMeasures"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Recovery Measures</span>
          </div>

          <p>POST INCIDENT ACTIVITY</p>

          <div class="form__control" style="margin-top: 1rem">
            <select name="notification" required v-model="notification">
              <option
                v-for="(n, index) in incidentNotifications"
                :key="index"
                :value="n"
              >
                {{ n }}
              </option>
            </select>

            <span class="form__control-label">Notification</span>
          </div>
          <div class="form__control" v-if="notification == 'Other'">
            <input
              type="text"
              v-model="otherNotification"
              autocomplete="off"
              required
            />
            <span class="form__control-label">Other Notification</span>
          </div>

          <div class="form__control full textarea">
            <textarea
              name="RootCase Analysis"
              required
              v-model="rootCaseAnalysis"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label">Root Case Analysis</span>
          </div>

          <div class="form__control" style="margin-top: 1rem">
            <select
              name="incidentAvoidability"
              required
              v-model="incidentAvoidability"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <span class="form__control-label">Incident Avoidability</span>
          </div>
          <div class="form__control" v-if="incidentAvoidability == 'true'">
            <input
              type="text"
              name="otherIncidentAvoidability"
              required
              v-model="otherIncidentAvoidability"
            />
            <span class="form__control-label">Other Incident Avoidability</span>
          </div>

          <p>INCIDENT CLOSURE</p>

          <div class="form__control full textarea">
            <textarea
              name="recommendations"
              required
              v-model="recommendations"
              cols="20"
              rows="2"
            ></textarea>
            <span class="form__control-label"
              >Recommendations for improvements</span
            >
          </div>

          <div class="form__control time-control">
            <input type="date" v-model="closureDate" required />

            <input type="time" v-model="closureTime" required />
          </div>
          <p>Reviewed By</p>
          <div class="form__control">
            <select name="title" v-model="title" required>
              <option value="" selected disabled hidden></option>
              s
              <option value="SOC Manager ">SOC Manager</option>
              <option value="Security Head">Security Head</option>
            </select>

            <span class="form__control-label">Reviewer</span>
          </div>
          <div class="form__control">
            <input type="text" name="signature" required v-model="signature" />
            <span class="form__control-label">Signature</span>
          </div>
          <div class="form__control time-control">
            <input type="date" v-model="signatureDate" required />

            <input type="time" v-model="signatureTime" required />
          </div>
        </div>
      </div>
      <div class="submit-btn__wrapper">
        <button class="submit-btn" type="submit">
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
          <BaseSpinner v-if="loading" />
        </button>
      </div>
    </form>
    <p class="errMessage" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import baseSpinner from "@/components/baseSpinner.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

import {
  incidentPriority,
  incidentNotifications,
  incidentClassifications,
} from "../assets/data";
export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
      incidentPriority,
      incidentNotifications,
      incidentClassifications,
      detectionDate: "",
      detectionTime: "",
      incidentName: "",
      incidentDetectorName: "",
      incidentReferenceNumber: "",
      contactInfo: "",
      location: "",
      repeatedIncident: "",
      priority: "",
      impactDuration: "",
      affectedSystem: "",
      incidentVerification: "",
      notification: "",
      incidentDescription: "",
      evidenceAcquiring: "",
      dataSourcesHealth: "",
      containmentMeasures: "",
      recoveryMeasures: "",
      incidentClassification: [],
      otherIncidentClassification: "",
      rootCaseAnalysis: "",
      incidentAvoidability: "",
      otherIncidentAvoidability: "",
      eradicationMeasures: "",
      recommendations: "",
      closureDate: "",
      otherNotification: "",
      closureTime: "",
      title: "",
      signature: "",
      signatureDate: "",
      signatureTime: "",
      message: "",
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
        id: this.chosenFormId,
        TimeOfDetection: this.detectionDate + " " + this.detectionTime,
        IncidentName: this.incidentName,
        DetectorName: this.incidentDetectorName,
        ContactInfo: this.contactInfo,
        Location: this.location,
        IncidentReferenceNo: this.incidentReferenceNumber,
        RepeatedIncident: this.repeatedIncident,
        Priority: this.priority,
        ImpactDuration: this.impactDuration,
        AffectedSystem: this.affectedSystem,
        IncidentVerification: this.incidentVerification,
        IncidentClassification: this.currentIncidentClassification,
        Description: this.incidentDescription,
        EvidenceAcquiring: this.evidenceAcquiring,
        DataHealth: this.dataSourcesHealth,
        ContainmentMeasures: this.containmentMeasures,
        EradicationMeasures: this.eradicationMeasures,
        RecoveryMeasures: this.recoveryMeasures,
        Notification: this.currentNotification,
        CaseAnalysis: this.rootCaseAnalysis,
        IncidentAvailability: this.currentIncidentClassificatioAvoidability,
        Improvements: this.recommendations,
        TimeOfClosure: this.closureDate + " " + this.closureTime,
        Title: this.title,
        Signature: this.signature,
        Date: this.signatureDate + " " + this.signatureTime,
      };
    },
    currentNotification: function () {
      return this.notification == "Other"
        ? this.otherNotification
        : this.notification;
    },
    currentIncidentClassification: function () {
      return this.incidentClassification == "Other"
        ? this.otherIncidentClassification
        : this.incidentClassification.join("  ,  ");
    },
    currentIncidentClassificatioAvoidability: function () {
      return this.incidentAvoidability == "true"
        ? this.otherIncidentAvoidability
        : this.incidentAvoidability;
    },
    ...mapState(["chosenFormMethod", "chosenFormId"]),
    ...mapGetters(["getMainIncident"]),
  },
  mounted() {
    if (this.chosenFormMethod == "PUT") {
      let res = this.getMainIncident.filter(
        (incident) => incident.id == this.chosenFormId
      );
      console.log(res);
      this.incidentName = res[0].IncidentName;
      this.incidentDetectorName = res[0].DetectorName;
      this.contactInfo = res[0].ContactInfo;
      this.location = res[0].Location;
      this.incidentReferenceNumber = res[0].IncidentReferenceNo;
      this.repeatedIncident = res[0].RepeatedIncident;
      this.priority = res[0].Priority;
      this.impactDuration = res[0].ImpactDuration;
      this.affectedSystem = res[0].AffectedSystem;
      this.incidentVerification = res[0].IncidentVerification;

      this.incidentDescription = res[0].Description;
      this.evidenceAcquiring = res[0].EvidenceAcquiring;
      this.dataSourcesHealth = res[0].DataHealth;
      this.containmentMeasures = res[0].ContainmentMeasures;
      this.eradicationMeasures = res[0].EradicationMeasures;
      this.recoveryMeasures = res[0].RecoveryMeasures;
      this.notification = res[0].Notification;
      this.rootCaseAnalysis = res[0].CaseAnalysis;
      this.incidentAvoidability = res[0].IncidentAvailability;
      this.recommendations = res[0].Improvements;
      this.title = res[0].Title;
      this.signature = res[0].Signature;
    }
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.loading = true;
      let response;
      if (this.chosenFormMethod == "POST") {
        response = await this.$store.dispatch("postData", {
          apiName: "mainIncident",
          body: this.dataObj,
        });
      }
      if (this.chosenFormMethod == "PUT") {
        response = await this.$store.dispatch("editData", {
          apiName: "mainIncident",
          body: this.dataObj,
        });
      }
      console.log(response);
      this.loading = false;
      if (response) {
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      } else {
        this.loading = false;
        this.message = "Something Went Wrong";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      }
    },
  },
};
</script>
<style scoped>
.long__form p {
  text-transform: capitalize;
  color: #fff;
  background: #40358e;
  border-radius: 0.7rem;
  margin-bottom: 1.3rem;
  text-align: center;
  padding: 0.4rem 0;
  text-transform: uppercase;
}
.long__form p:nth-of-type(3) {
  font-weight: 400;
  margin-bottom: 0.2rem;
}
.submit-btn__wrapper {
  margin-top: 1.4rem;
}
.classification {
  display: inline-block;
  color: #010f60;
}
.classification label {
  padding: 10px;
  color: #010f60;
}
.classification p {
  background: inherit;
  color: #010f60;
}
.classificationItem {
  padding: 0 10px 10px 10px;
}
</style>
