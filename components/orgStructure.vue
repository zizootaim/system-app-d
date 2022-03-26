<template>
  <div class="container">
    <div class="level-1 rectangle">
      <manSvg />
      <div class="person__info">
        <h4>Mohamed</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          asperiores!
        </p>
        <div class="person__data">
          <p>mohamed@gmail.com</p>
          <p>01015397895</p>
        </div>
      </div>
    </div>
    <ol class="level-2-wrapper">
      <li>
        <div class="level-2 rectangle">
          <manSvg />
          <div class="person__info">
            <h4>Mohamed</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              asperiores!
            </p>
            <div class="person__data">
              <p>mohamed@gmail.com</p>
              <p>01015397895</p>
            </div>
          </div>
        </div>
        <ol class="level-3-wrapper">
          <li>
            <div class="level-3 rectangle">
              <manSvg />
              <div class="person__info">
                <h4>Mohamed</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, asperiores!
                </p>
                <div class="person__data">
                  <p>mohamed@gmail.com</p>
                  <p>01015397895</p>
                </div>
              </div>
            </div>
            <ol class="level-4-wrapper">
              <li>
                <div class="level-4 rectangle">
                  <manSvg />
                  <div class="person__info">
                    <h4>Mohamed</h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum, asperiores!
                    </p>
                    <div class="person__data">
                      <p>mohamed@gmail.com</p>
                      <p>01015397895</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="level-4 rectangle">
                  <manSvg />
                  <div class="person__info">
                    <h4>Mohamed</h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum, asperiores!
                    </p>
                    <div class="person__data">
                      <p>mohamed@gmail.com</p>
                      <p>01015397895</p>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        <div class="level-2 rectangle">
          <manSvg />
          <div class="person__info">
            <h4>Mohamed</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              asperiores!
            </p>
            <div class="person__data">
              <p>mohamed@gmail.com</p>
              <p>01015397895</p>
            </div>
          </div>
        </div>
        <ol class="level-3-wrapper">
          <li>
            <div class="level-3 rectangle">
              <manSvg />
              <div class="person__info">
                <h4>Mohamed</h4>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, asperiores!
                </p>
                <div class="person__data">
                  <p>mohamed@gmail.com</p>
                  <p>01015397895</p>
                </div>
              </div>
            </div>
            <ol class="level-4-wrapper">
              <li>
                <div class="level-4 rectangle">
                  <manSvg />
                  <div class="person__info">
                    <h4>Mohamed</h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum, asperiores!
                    </p>
                    <div class="person__data">
                      <p>mohamed@gmail.com</p>
                      <p>01015397895</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="level-4 rectangle">
                  <manSvg />
                  <div class="person__info">
                    <h4>Mohamed</h4>
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum, asperiores!
                    </p>
                    <div class="person__data">
                      <p>mohamed@gmail.com</p>
                      <p>01015397895</p>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script>
import manSvg from "./manSvg.vue";

export default {
  components: {
    manSvg,
  },
};
</script>

<style scoped>
:root {
  --black: rgb(255, 255, 255);
  --main-color: #0d2235;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ol {
  list-style: none;
}

body {
  text-align: center;
  font-family: "Inter", sans-serif;
}

.container {
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
}

.rectangle {
  position: relative;
  padding: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
}

.person__info {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.person__info p {
  margin: 0.5rem auto;
  width: 80%;
  font-size: 0.8rem;
}
.person__info h4 {
  font-size: 1rem;
  margin-top: 0.5rem;
}
.person__data {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* LEVEL-1 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-1 {
  width: 25%;
  margin: 0 auto 40px;
  background: var(--main-color);
}

.level-1::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

/* LEVEL-2 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-2-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.level-2-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 25%;
  width: 50%;
  height: 2px;
  background: rgb(255, 255, 255);
}

.level-2-wrapper::after {
  display: none;
  content: "";
  position: absolute;
  left: -20px;
  bottom: -20px;
  width: calc(100% + 20px);
  height: 2px;
  background: rgb(255, 255, 255);
}

.level-2-wrapper li {
  position: relative;
}

.level-2-wrapper > li::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

.level-2 {
  width: 70%;
  margin: 0 auto 40px;
  background: var(--main-color);
}

.level-2::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

.level-2::after {
  display: none;
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-100%, -50%);
  width: 20px;
  height: 2px;
  background: rgb(255, 255, 255);
}

/* LEVEL-3 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-3-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  width: 90%;
  margin: 0 auto;
}

.level-3-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: calc(25% - 5px);
  width: calc(50% + 10px);
  height: 2px;
  background: rgb(255, 255, 255);
}

.level-3-wrapper > li::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 2px;
  height: 20px;
  background: rgb(255, 255, 255);
}

.level-3 {
  margin-bottom: 20px;
  background: var(--main-color);
}

/* LEVEL-4 STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.level-4-wrapper {
  position: relative;
  width: 80%;
  margin-left: auto;
}

.level-4-wrapper::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  width: 2px;
  height: calc(100% + 20px);
  background: rgb(255, 255, 255);
}

.level-4-wrapper li + li {
  margin-top: 20px;
}

.level-4 {
  font-weight: normal;
  background: var(--main-color);
}

.level-4::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-100%, -50%);
  width: 20px;
  height: 2px;
  background: rgb(255, 255, 255);
}

/* MQ STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
@media screen and (max-width: 700px) {
  .rectangle {
    padding: 20px 10px;
  }

  .level-1,
  .level-2 {
    width: 100%;
  }

  .level-1 {
    margin-bottom: 20px;
  }

  .level-1::before,
  .level-2-wrapper > li::before {
    display: none;
  }

  .level-2-wrapper,
  .level-2-wrapper::after,
  .level-2::after {
    display: block;
  }

  .level-2-wrapper {
    width: 90%;
    margin-left: 10%;
  }

  .level-2-wrapper::before {
    left: -20px;
    width: 2px;
    height: calc(100% + 40px);
  }

  .level-2-wrapper > li:not(:first-child) {
    margin-top: 50px;
  }
}

/* FOOTER
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.page-footer {
  position: fixed;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  padding: 5px;
}

.page-footer a {
  margin-left: 4px;
}

.level-1 {
  width: 35%;
}

.level-4-wrapper {
  width: 90%;
}
.level-3-wrapper {
  width: 70%;
  grid-template-columns: 1fr;
}
.level-2 {
  width: 70%;
}
.level-3-wrapper::before {
  display: none;
}
.rectangle {
  width: 300px;
  height: 180px;
  background: #0d2235;
}

@media screen and (max-width: 769px) {
  .level-1 {
    width: 75%;
  }
  .level-2 {
    width: 95%;
  }
  .level-3-wrapper {
    width: 90%;
  }
  .level-4-wrapper {
    width: 90%;
  }

}
@media screen and (max-width: 426px) {
  .level-4-wrapper {
    width: 100%;
  }
  .level-3-wrapper {
    width: 96%;
    grid-template-columns: 1fr;
  }
  .level-1 {
    width: 90%;
  }
  .level-2 {
    width: 100%;
  }
  .level-4-wrapper::before {
    display: none;
  }
  .level-2-wrapper::after {
    display: block;
  }
  .level-2-wrapper {
    margin-left: 8%;
    width: 92%;
  }
  .rectangle {
    width: 100%;
  }
}
</style>
