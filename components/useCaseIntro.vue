<template>
  <div class="use__imgs">
    <div class="use__img">
      <img src="../assets/usecase.jpeg" />
    </div>
    <div class="use__text">
      <div>
        <p>Use Cases are <span class="f-bold">driven</span> from Business (Risks, Threats, Compliance).</p>
        <p>
          Use Cases <span class="f-bold">Top-down</span> traceability to determine the completeness of
          implementation and demonstrable risk reduction.
        </p>
        <p>
          Use Cases <span class="f-bold">Bottom-up</span> traceability for contextualizing use case output
          and business alignment.
        </p>
      </div>
      <p>
        The objective of building a
        <span class="f-bold">Use Case Framework</span> is to better protect the
        organization's valuable assets by designing and developing detection use
        cases using a holistic approach that connects (with always newly
        emerging) regulatory, compliance and threat requirements.
      </p>
      <h3 class="green">Use Cases Creation Standard:</h3>
      <div>
        <p>
          1-Start with understanding:
          <span class="d-block"
            >- the <span class="green">Objective</span> of the US: Why we need
            the Use Case?</span
          >

          <span class="d-block">
            - the <span class="green">Risk</span>: What do we defend
            against?</span
          >
          <span class="d-block"
            >- Use case Category/<span class="green">Type</span>.</span
          >
        </p>
        <p>
          2-Determine the <span class="green">Stakeholders</span> who can effect
          or will be affected by the US.
        </p>
        <p>
          3-Determine the required <span>Data Sources</span> that are required
          to be able to detect the Threat and their status.
        </p>
        <p>
          4- What is the <span class="green">Logic</span> to determine the
          Use-case.
        </p>
        <p>
          5-what is the expected <span class="green">Output</span> from the US
          (Alert, report, dashboard..etc.).
        </p>
      </div>
      <br />
      <p class="f-bold">
        ... Now, It's time to validate our hypnosis to test the logic and check
        if it will work as expected
      </p>
      <br />
      <div>
        <p>
          6- <span class="green">Test</span> and Validate the Logic as a proof
          of concept on the testing environment.
        </p>
        <p>
          7- check for the Alert Volume and
          <span class="green">False Positives</span> scenarios to fortunning.
        </p>
        <p>
          8-Set the <span class="green">Priority</span> and severity of the Use
          case output "triggered alert".
        </p>
        <p>
          9-Define the operational procedure "what to do" for the use case
          <span class="green">"Playbooks"</span>.
        </p>
        <p>10- Enable for <span class="green">Production</span>.</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "useCaseIntro",
};
/*
<div class="use__imgs">
    <div class="use__img">
      <img src="../assets/usecase.jpeg" />
    </div>
    <div class="use__img">
      <img src="../assets/usecase-1.jpeg" />
    </div>
    <div class="use__img">
      <img src="../assets/usecase-2.jpeg" />
    </div>
  </div>


*/
</script>
<style>
.f-bold {
  font-weight: 700;
}
.d-block {
  display: block;
}
.use__text p {
  margin: 0.5rem 0;
}
.green {
  color: rgb(31, 198, 31);
  font-weight: 600;
}
.use__text div:first-of-type{
  margin-bottom: 3rem;
}

.use__imgs {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  max-height: 40rem;
  overflow: auto;
  padding-right: 1rem;
}
@media screen and (min-width: 1560px) {
  .use__imgs {
    max-height: 80rem;
  }
}
</style>
