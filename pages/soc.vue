<template>
  <div></div>
</template>

<script>
/* 
changeWikiPage({ event, sideMenu }, page) {
      if (sideMenu) {
        const firstClick =
          event.srcElement.localName == "span" ||
          event.srcElement.localName == "li" ||
          event.srcElement.localName == "i"
            ? false
            : true;
        console.log(firstClick);
        //event.srcElement.localName == "span" ||
        //   event.srcElement.localName == "li
        if (firstClick) {
          let parent = event.target.parentElement;
          // parent.querySelector('.sub-menu').children[0].click()
          if (!parent.className.includes("submenu-wrapper")) {
            parent = parent.parentElement;
          }
          this.showMenu(event);
          parent.querySelector(".sub-menu").children[0].click();
        }
      }

      console.log("change" + " " + page);
      this.wikiPage = page;
      if (
        [
          "Policies",
          "Procedures",
          "Communication",
          "Playbooks",
          "Shafts",
        ].includes(page)
      ) {
        this.getWikiData(page);
      }
      if (page == "Use Case Library")
        this.$store.dispatch("getData", "useCase");
    },


*/


export default {};
</script>

<style lang="scss" scoped></style>
  
  
  