<template>
  <div class="shifts__wrapper">
    <div class="table__wrapper">
      <div class="table">
        <div class="table__row header">
          <div class="col title">
            <p>Day / Shift / Analyst</p>
          </div>
          <div class="col">L1-1</div>
          <div class="col">L1-2</div>
          <div class="col">L1-3</div>
          <div class="col">L1-4</div>
          <div class="col">L1-5</div>
          <div class="col">L1-6</div>
          <div class="col">L2-1</div>
          <div class="col">L1-2</div>
          <div class="col">L1-3</div>
          <div class="col">L3</div>
        </div>
        <div class="table__row">
          <div class="left">
            <p>Week1-Day</p>
            <p>1</p>
            <p>SUN</p>
          </div>
          <div class="rows">
            <div class="row">
              <div class="col first shift-a">
                <p>Shift A</p>
              </div>
              <div class="col shift-a">X</div>
              <div class="col shift-a">X</div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">off</div>
              <div class="col">off</div>
              <div class="col shift-a">X</div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">X</div>
            </div>
            <div class="row">
              <div class="col first shift-b">
                <p>Shift B</p>
              </div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col shift-b">X</div>
              <div class="col shift-b">X</div>
              <div class="col"></div>
              <div class="col">off</div>
              <div class="col">off</div>
              <div class="col"></div>
              <div class="col shift-b">X</div>
              <div class="col"></div>
            </div>
            <div class="row">
              <div class="col first shift-a">
                <p>Shift C</p>
              </div>
              <div class="col"></div>
              <div class="col shift-c">X</div>
              <div class="col shift-c">X</div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">off</div>
              <div class="col shift-c">X</div>
              <div class="col"></div>
              <div class="col on-call">on call</div>
              <div class="col shift-c">X</div>
            </div>
          </div>
        </div>
        <div class="table__row">
          <div class="left">
            <p>Week1-Day</p>
            <p>1</p>
            <p>SUN</p>
          </div>
          <div class="rows">
            <div class="row">
              <div class="col first shift-a">
                <p>Shift A</p>
              </div>
              <div class="col shift-a">X</div>
              <div class="col shift-a">X</div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">off</div>
              <div class="col">off</div>
              <div class="col shift-a">X</div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">X</div>
            </div>
            <div class="row">
              <div class="col first shift-b">
                <p>Shift B</p>
              </div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col shift-b">X</div>
              <div class="col shift-b">X</div>
              <div class="col"></div>
              <div class="col">off</div>
              <div class="col">off</div>
              <div class="col"></div>
              <div class="col shift-b">X</div>
              <div class="col"></div>
            </div>
            <div class="row">
              <div class="col first shift-a">
                <p>Shift C</p>
              </div>
              <div class="col"></div>
              <div class="col shift-c">X</div>
              <div class="col shift-c">X</div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">off</div>
              <div class="col shift-c">X</div>
              <div class="col"></div>
              <div class="col on-call">on call</div>
              <div class="col shift-c">X</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shifts",
};
</script>
<style>
.shifts__wrapper .table__row {
  border-bottom: 3px solid red;
}
.shifts__wrapper .header .col:first-child {
  min-width: 15rem;
  text-align: center;
}
.shifts__wrapper .table__row {
  flex-direction: row;
}
.table__row .left {
  min-width: 10rem;
  display: grid;
  place-items: center;
}

.table__row .row .first {
  max-width: 5rem;
}
.rows {
  width: 100%;
}
.shifts__wrapper .table__row .col {
  text-align: center;
}
.shift-a {
  background: rgb(188, 188, 95);
}
.shift-b {
  background: rgb(164, 204, 164);
}
.shift-c {
  background: rgb(30, 149, 89);
}
.on-call {
  background: rgb(120, 183, 207);
}
</style>
