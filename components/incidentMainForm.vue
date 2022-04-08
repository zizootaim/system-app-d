<template>
  <div class="shift__form-wrapper">
    <h1 class="form__title">Incidents</h1>
    <form
      class="long__form incident-main__form"
      v-on:submit.prevent="submitData"
    >
      <div>
        <p>Incident Identification</p>
        <div class="form__control time-control">
          <input type="date" v-model="detectionDate" />

          <input type="time" v-model="detectionTime" />
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
          <input
            type="text"
            name="repeatedIncident"
            required
            v-model="repeatedIncident"
            autocomplete="off"
          />
          <span class="form__control-label">Repeated Incident</span>
        </div>
        <div class="form__control">
          <select name="priority" v-model="priority">
            <option value="" selected disabled hidden>Priority</option>
            <option value="Critical">Critical</option>
            <option value="high">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
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
        <div class="form__control">
          <input
            type="text"
            name="affectedSystem"
            required
            v-model="affectedSystem"
            autocomplete="off"
          />
          <span class="form__control-label">Affected System /Host</span>
        </div>

        <p>INCIDENTS TRIAGE</p>

        <div class="form__control">
          <select name="incidentVerification" v-model="incidentVerification">
            <option value="" selected disabled hidden>
              Incident Verification
            </option>
            <option value="True Positive">True Positive</option>
            <option value="False Positive">False Positive</option>
          </select>
        </div>
        <div class="form__control">
          <select
            name="incidentClassification"
            v-model="incidentClassification"
          >
            <option value="" selected disabled hidden>
              Incident Classification
            </option>
            <option value="Denial of Service ">Denial of Service</option>
            <option value="Malware">Malware</option>
            <option value="Security Compromise">Security Compromise</option>

            <option value="Network security ">Network security</option>
            <option value="Unauthorized Access/Use">
              Unauthorized Access/Use
            </option>
            <option value="Unplanned Downtime ">Unplanned Downtime</option>
            <option value="Physical Security">Physical Security</option>
            <option value="Social Engineering ">Social Engineering</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <p>Brief Description :</p>
        <textarea
          style="margin-top: 0.6rem"
          name="incidentDescription"
          placeholder="Incident Description"
          v-model="incidentDescription"
          cols="20"
          rows="3"
        ></textarea>

        <p>INCIDENT CONTAINMENT, ERADICATION, AND RECOVERY</p>

        <div class="form__control" style="margin-top: 1rem">
          <input
            type="text"
            name="evidenceAcquiring"
            required
            v-model="evidenceAcquiring"
          />
          <span class="form__control-label">Evidence Acquiring</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="dataSourcesHealth"
            required
            v-model="dataSourcesHealth"
          />
          <span class="form__control-label">Data Sources Health</span>
        </div>

        <div class="form__control">
          <input
            type="text"
            name="containmentMeasures"
            required
            v-model="containmentMeasures"
          />
          <span class="form__control-label">Containment Measures</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="eradicationMeasures"
            required
            v-model="eradicationMeasures"
          />
          <span class="form__control-label">Eradication Measures</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="recoveryMeasures"
            required
            v-model="recoveryMeasures"
          />
          <span class="form__control-label">Recovery Measures</span>
        </div>
        <p>POST INCIDENT ACTIVITY</p>

        <div class="form__control">
          <select name="notification" v-model="notification">
            <option value="" selected disabled hidden>Notification</option>
            <option value="Network Team  ">Network Team</option>
            <option value="Tech Team ">Tech Team</option>
            <option value="InfoSec Team">InfoSec Team</option>
            <option value="Helpdesk ">Helpdesk</option>
            <option value="Business Team ">Business Team</option>
            <option value="Compliance Team ">Compliance Team</option>
            <option value="Other">Other</option>
          </select>
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
        <div class="form__control">
          <input
            type="text"
            name="RootCase Analysis"
            required
            v-model="rootCaseAnalysis"
          />
          <span class="form__control-label">Root Case Analysis</span>
        </div>
        <div class="form__control">
          <input
            type="text"
            name="incidentAvoidability"
            required
            v-model="incidentAvoidability"
          />
          <span class="form__control-label">Incident Avoidability</span>
        </div>
        <p>INCIDENT CLOSURE</p>
        <div class="form__control" style="margin-top: 1rem">
          <input
            type="text"
            name="RootCase Analysis"
            required
            v-model="recommendations"
          />
          <span class="form__control-label"
            >Recommendations for improvements</span
          >
        </div>
        <div class="form__control time-control">
          <input type="date" v-model="closureDate" />

          <input type="time" v-model="closureTime" />
        </div>
        <p>Reviewed By</p>
        <div class="form__control">
          <select name="title" v-model="title">
            <option value="" selected disabled hidden>Reviewer</option>
            s
            <option value="SOC Manager ">SOC Manager</option>
            <option value="Security Head">Security Head</option>
          </select>
        </div>
        <div class="form__control">
          <input type="text" name="signature" required v-model="signature" />
          <span class="form__control-label">Signature</span>
        </div>
        <div class="form__control time-control">
          <input type="date" v-model="signatureDate" />

          <input type="time" v-model="signatureTime" />
        </div>
      </div>
    </form>
    <div class="submit-btn__wrapper">
      <button class="submit-btn" type="submit" @click="submitData">
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
  </div>
</template>
<script>
import baseSpinner from "@/components/baseSpinner.vue";

export default {
  components: {
    baseSpinner,
  },

  data() {
    return {
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
      incidentClassification: "",
      rootCaseAnalysis: "",
      incidentAvoidability: "",
      eradicationMeasures: "",
      recommendations: "",
      closureDate: "",
      otherNotification: "",
      closureTime: "",
      title: "",
      signature: "",
      signatureDate: "",
      signatureTime: "",
      loading: false,
      submitIcon: false,
    };
  },
  computed: {
    dataObj() {
      return {
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
        IncidentClassification: this.incidentDescription,
        Description: this.incidentDescription,
        EvidenceAcquiring: this.evidenceAcquiring,
        DataHealth: this.dataSourcesHealth,
        ContainmentMeasures: this.containmentMeasures,
        EradicationMeasures: this.eradicationMeasures,
        RecoveryMeasures: this.recoveryMeasures,
        Notification: this.currentNotification,
        CaseAnalysis: this.rootCaseAnalysis,
        IncidentAvailability: this.incidentAvoidability,
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
  },
  methods: {
    async submitData() {
      console.log(this.dataObj);
      this.loading = true;
      let response = await this.$store.dispatch("postData", {
        apiName: "mainIncident",
        body: this.dataObj,
      });
      console.log(response);
      if (response) {
        this.loading = false;
        this.submitIcon = true;
        setTimeout(() => {
          this.submitIcon = false;
          document.querySelector(".close").click();
        }, 1000);
      }
    },
  },
};
</script>
<style scoped>
.incident-main__form {
  max-height: 28rem;
  overflow: auto;
  padding-right: 0.6rem;
}

.long__form p {
  text-transform: capitalize;
  color: #fff;
  background: #40358e;
  border-radius: 0.7rem;
  margin-bottom: 0.7rem;
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
</style>
