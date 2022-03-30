<template>
  <div class="wiki-pdf__wrapper">
    <div class="wiki-pdf__top">
      <h1>{{ section }}</h1>
      <p>
        Group-IB’s synergy of cybersecurity services leverages our comprehensive
        stack of technologies with detective DNA, up-to-the-minute research, and
        best-of-breed human intelligence to provide dedicated APT monitoring,
        attacks prevention, incident response remediation services across the
        world.
      </p>
    </div>
    <div class="wiki__pdf">
      <div class="pdf__icon">
        <i class="fal fa-file-pdf"></i>
        <button class="pdf-btn">Download</button>
      </div>
      <div class="line"></div>
      <div class="pdf__items">
        <ul>
          <li><span class="dot"></span> Group-IB has a synergetic team of highly qualified</li>
          <li><span class="dot"></span> Group-IB has a synergetic team of highly qualified</li>
        </ul>
        <ul>
          <li>Group-IB has a synergetic team of highly qualified</li>
          <li>Group-IB has a synergetic team of highly qualified</li>
        </ul>
        <ul>
          <li>Group-IB has a synergetic team of highly qualified</li>
          <li>Group-IB has a synergetic team of highly qualified</li>
        </ul>
        <ul>
          <li>Group-IB has a synergetic team of highly qualified</li>
          <li>Group-IB has a synergetic team of highly qualified</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      default: "",
    },
  },
};
</script>
<style>
.wiki-pdf__wrapper {
  padding: 2rem;
  width: 77%;
  margin: auto;
}
.wiki-pdf__top h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.wiki-pdf__top p {
  width: 60%;
  font-size: 0.9rem;
}
.wiki__pdf {
  width: 90%;
  margin: 3rem auto;
  display: flex;
  justify-content: space-around;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.3)
  );
  padding: 1rem;
  border-radius: 0.6rem;
}
.pdf__icon {
  font-size: 12rem;
  color: #fff;
}

.line {
  width: 0.2rem;
  background: #fff;
}
.pdf__items {
  display: grid;
  grid-template-columns: 240px 240px;
  gap: 1rem;
  color: #fff;

}

.pdf__items ul li {

margin-bottom: 0.8rem;
  font-size: 1rem;
}

.pdf-btn {
  display: block;
  padding: 0.5rem 2rem;
  background: #05156b;
  color: #fff;
  border-radius: 0.5rem;
  transition: 0.3s;
}
.pdf-btn:hover {
  background: #fff;
  color: #05156b;
}

@media screen and (max-width: 1025px) {
  .wiki__pdf {
    flex-direction: column;
    justify-content: center;
  }
  .pdf__icon {
    text-align: center;
  }
  .pdf-btn {
    margin: auto;
  }
  .line {
    width: 100%;
    height: 0.2rem;
    margin: 1rem 0;
  }
  .pdf__items {
width: 90%;
margin: auto;
    align-items: center;
    justify-content: space-around;
  }
}
@media screen and (max-width: 900px) {
  .pdf__items {
    grid-template-columns: 1fr 1fr;
  }
  .pdf__items ul {
    margin: auto auto 1rem;
  }
  .pdf__items ul li {
    margin-bottom: 0.2rem;
  }
  .wiki__pdf {
    width: auto;
    padding: 0;
    background: none;
  }
  .wiki-pdf__top p {
    width: auto;
  }
  .wiki-pdf__wrapper {
    padding: 2rem;
  }
}
@media screen and (max-width: 450px) {
  .pdf__items {
    grid-template-columns: 1fr;
    justify-content: center;
    width: 75%;
  }
  .pdf__items ul {
    margin-left: -0.5rem;
  }
  .wiki-pdf__wrapper {
    padding: 1rem;
  }
}
</style>
