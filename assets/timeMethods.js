export const getTime = (str) => {
  return str.split(" ")[1];
};

export const getDay = (str) => {
  return str.split(" ")[0];
};

export const showContent = (event) => {
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
}