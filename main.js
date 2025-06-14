let containers = document.querySelectorAll(".container");
let navButtons = document.querySelectorAll(".nav-button");
let focusable = document.querySelectorAll(".focusable, li, .search-wrapper");
let contentLeft = document.querySelector(".content-left");
let contentRight = document.querySelector(".content-right");
let previous = null;
let menuState = null;
let currentButton = 1;
let nasaLive = document.getElementById("nasalive");
let nasaButton = document.getElementById("nasalivebutton");
let maintext = document.querySelector(".maintext");
let searchBig = document.getElementById("searchbar");
let nocontent = document.querySelector(".nocontent");
let logo = document.querySelector(".nasa-logo");
let back = document.querySelector(".back-btn");
let leftright = null;

logo.addEventListener("keydown", (event) => {
  if (
    event.key === "Tab" &&
    event.shiftKey &&
    window.innerWidth < 800 &&
    previous === 0
  ) {
    event.preventDefault();
    nasaButton.focus();
  }
});

nasaButton.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && !event.shiftKey) {
    event.preventDefault();
    logo.focus();
  }
});

// let content = document.querySelectorAll(".startend");

nasaLive.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && !event.shiftKey) {
    event.preventDefault();
    maintext.focus();
    containers[0].querySelector(".content-container").style.display = "none";
    if (previous === 0) {
      navToggle();
    }
    previous = null;
  }
});

focusable.forEach((focusItem) => {
  focusItem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      focusItem.click();
    }
  });
});

searchBig.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key === "Tab") {
    event.preventDefault();
    navButtons[navButtons.length - 3].focus();
  }
});

navButtons.forEach((button, index) => {
  let id = button.dataset.menu;
  let menu = document.getElementById(id);
  let content = menu.querySelectorAll(".startend");
  let lastLi = menu.querySelector("ul li:last-child");
  button.addEventListener("keydown", (event) => {
    if (window.innerWidth > 800) {
      if (event.key === "Enter") {
        currentButton = index;
      } else if (event.key === "Tab" && !event.shiftKey) {
        if (
          index === navButtons.length - 3 &&
          currentButton !== navButtons.length - 3
        ) {
          event.preventDefault();
          searchBig.focus();
        } else if (document.activeElement === navButtons[currentButton]) {
          event.preventDefault();
          content[0].focus();
        }
      }
    } else {
      currentButton = null;
      if (event.key === "Enter") {
        currentButton = index;
      }
    }
  });
  content.forEach((startend, index) => {
    startend.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (window.innerWidth > 800) {
          if (event.shiftKey && index === 0) {
            event.preventDefault();
            navButtons[currentButton].focus();
          } else if (
            index === 1 &&
            currentButton < navButtons.length - 3 &&
            !event.shiftKey
          ) {
            event.preventDefault();
            navButtons[currentButton + 1].focus();
            console.log("triggered");
          }
        } else {
          if (!event.shiftKey && index === 1) {
            event.preventDefault();
            back.focus();
          }
        }
      }
    });
  });
  if (lastLi && window.innerWidth < 800) {
    lastLi.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        back.focus();
      }
    });
  }
  back.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && event.shiftKey && lastLi) {
      event.preventDefault();
      lastLi.focus();
    }
  });
});

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
      document.documentElement.style.overflowY = "hidden";
      if (window.innerWidth > 800) {
        contentLeft.style.transform = "none";
        contentRight.style.transform = "none";
      }
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  });
});

document.body.addEventListener("click", () => {
  if (previous !== null && window.innerWidth > 800) {
    containers[previous].querySelector(".content-container").style.display =
      "none";
    previous = null;
  }
});

let navprevious = "missions";
let missions = document.getElementById("missions");
let missionsLeft = missions.querySelector(".missions-left");

let previousbut = 1;

navButtons.forEach((navButton, index) => {
  navButton.addEventListener("click", () => {
    currentButton = index;
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

nocontent.setAttribute("tabindex", "-1");

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
let searchBar = document.getElementById("search-input");
let closeButton = document.getElementById("close-button");

search.addEventListener("animationend", () => {
  if (search.classList.contains("search-close")) {
    search.style.visibility = "hidden";
    closeButton.focus();
  } else {
    searchBar.focus();
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

closeButton.addEventListener("keydown", (event) => {
  if (event.key === "Tab" && !event.shiftKey) {
    event.preventDefault();
    maintext.focus();
    containers[0].querySelector(".content-container").style.display = "none";

    if (previous === 0) {
      navToggle();
    }
    previous = null;
  }
});

contentRight.addEventListener("transitionend", (event) => {
  if (event.propertyName === "transform" && menuState === "leftoff") {
    console.log("right masuk");
    back.focus();
  }
});

contentLeft.addEventListener("transitionend", (event) => {
  if (event.propertyName === "transform" && menuState === "lefton") {
    console.log("left masuk");
    navButtons[currentButton].focus();
  }
});
