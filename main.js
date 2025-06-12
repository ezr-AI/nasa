let containers = document.querySelectorAll(".container");
let navButtons = document.querySelectorAll(".nav-button");
let focusable = document.querySelectorAll(".focusable, li");
let contentLeft = document.querySelector(".content-left");
let contentRight = document.querySelector(".content-right");
let previous = null;
let menuState = null;

function visible() {
  if (window.innerWidth > 800) {
    contentLeft.style.display = "block";
    contentRight.style.display = "block";
  } else {
    if (contentLeft.style.display === "block") {
      contentRight.style.display = "none";
    } else {
      contentRight.style.display = "block";
    }
  }
}

containers.forEach((container, index) => {
  let content = container.querySelector(".content-container");
  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  container.addEventListener("click", (e) => {
    e.stopPropagation();
    if (index === previous) {
      if (previous === 0) {
        navToggle();
      }
      content.style.display = "none";
      previous = null;
    } else {
      if (previous !== null) {
        previousContent = containers[previous].querySelector("div");
        previousContent.style.display = "none";
      }
      content.style.display = "block";
      previous = index;
    }
    if (previous === 0) {
      navToggle();
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 800) {
        contentLeft.style.transform = "none";
        contentRight.style.transform = "none";
      }
    } else {
      document.body.style.overflow = "auto";
    }
    console.log(previous);
  });
});

document.body.addEventListener("click", () => {
  if (previous !== null && window.innerWidth === 800) {
    containers[previous].querySelector(".content-container").style.display =
      "none";
    previous = null;
  }
});

let navprevious = "missions";
let missions = document.getElementById("missions");
let missionsLeft = missions.querySelector(".missions-left");
let back = document.querySelector(".back-btn");
let previousbut = 1;

navButtons.forEach((navButton, index) => {
  navButton.addEventListener("click", () => {
    let id = navButton.dataset.menu;
    let menu = document.getElementById(id);
    if (window.innerWidth > 800) {
      if (navprevious !== null) {
        let previousnav = document.getElementById(navprevious);
        previousnav.style.display = "none";
      }
      menu.style.display = "block";
      navprevious = id;
    } else {
      if (navprevious !== null) {
        let previousnav = document.getElementById(navprevious);
        previousnav.style.display = "none";
      }
      menu.style.display = "block";

      // contentRight.style.display = "block";
      // contentLeft.style.display = "none";
      navprevious = id;

      contentLeft.style.transform = "translateX(-100%)";
      contentRight.style.transform = "translateX(0%)";
      menuState = "leftoff";
    }
    if (previousbut !== null) {
      let previousnavbut = navButtons[previousbut].querySelector(".spass");
      previousnavbut.style.borderBottom = "none";
    }
    navButton.querySelector(".spass").style.borderBottom = "1px dashed white";
    previousbut = index;
  });
});

back.addEventListener("click", () => {
  // contentLeft.style.display = "block";
  // contentRight.style.display = "none";
  contentLeft.style.transform = "translateX(0%)";
  contentRight.style.transform = "translateX(100%)";
  menuState = "lefton";
});

focusable.forEach((el) => {
  el.setAttribute("tabindex", "0");
  el.style.cursor = "pointer";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800 && previous === 0) {
    contentRight.style.transform = "none";
    contentLeft.style.transform = "none";
  } else if (menuState === "leftoff") {
    contentRight.style.transform = "translateX(0%)";
    contentLeft.style.transform = "translateX(-100%)";
  } else if (menuState === "lefton") {
    contentRight.style.transform = "translateX(100%)";
    contentLeft.style.transform = "translateX(0%)";
  } else {
    contentRight.style.transform = "translateX(100%)";
    contentLeft.style.transform = "translateX(0%)";
  }

  // else if (menuState === null) {
  //   contentLeft.style.display = "block";
  //   contentRight.style.display = "none";
  // } else {
  //   contentLeft.style.display = "none";
  //   contentRight.style.display = "block";
  // }
});

const btn = document.getElementById("menu-btn");

function navToggle() {
  btn.classList.toggle("open");
}

// btn.addEventListener("click", navToggle);

let buttons = document.querySelectorAll(".openclose");
let search = document.querySelector(".search");

search.addEventListener("animationend", () => {
  if (search.classList.contains("search-close")) {
    search.style.visibility = "hidden";
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (search.classList.contains("search-open")) {
      search.classList.add("search-close");
      search.classList.remove("search-open");
    } else {
      search.classList.remove("search-close");
      search.style.visibility = "visible";
      search.classList.add("search-open");
    }
  });
});

// search.style.animation = "panelSlideOutLeft 1s ease";
// search.addEventListener("animationed", () => {
//   search.classList.toggle("search-open");
// });
// openstate = "close";
