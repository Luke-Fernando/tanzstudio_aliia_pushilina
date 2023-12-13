function spinner() {
  document.onreadystatechange = async () => {
    if (document.readyState === "complete") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      document.getElementById("spinner").style.display = "none";
    }
  };
}
spinner();

function animateHamburger(condition) {
  const hamburgerMiddleBar = document.getElementById("navbar-hamburger-icon-middle-bar");
  if (condition) {
    hamburgerMiddleBar.classList.add("hamburger-clicked");
  } else {
    hamburgerMiddleBar.classList.remove("hamburger-clicked");
  }
}
async function showSideMenu(condition) {
  const sideMenu = document.getElementById("navbar-side-menu");
  const sideMenuBackdrop = document.getElementById("navbar-side-menu-backdrop");

  if (condition) {
    sideMenu.classList.add("side-menu-show");
    await new Promise((resolve) => setTimeout(resolve, 0));
    sideMenu.classList.add("side-menu-anim");
    sideMenuBackdrop.classList.add("side-menu-backdrop-visible");
  } else {
    sideMenu.classList.remove("side-menu-anim");
    await new Promise((resolve) => setTimeout(resolve, 150));
    sideMenu.classList.remove("side-menu-show");
    sideMenuBackdrop.classList.remove("side-menu-backdrop-visible");
  }
}
function blockScroll(condition) {
  let rootEle = document.documentElement;
  if (condition) {
    rootEle.classList.add("scroll-block");
  } else {
    rootEle.classList.remove("scroll-block");
  }
}
function openSideMenu() {
  const body = document.getElementById("body");
  const hamburgerBtn = document.getElementById("navbar-hamburger-btn");
  const sideMenuBackdrop = document.getElementById("navbar-side-menu-backdrop");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  let sideMenuStatus = false;

  hamburgerBtn.addEventListener("click", function () {
    sideMenuStatus = !sideMenuStatus;
    animateHamburger(sideMenuStatus);
    showSideMenu(sideMenuStatus);
    blockScroll(sideMenuStatus);
  });
  sideMenuBackdrop.addEventListener("click", function () {
    sideMenuStatus = !sideMenuStatus;
    animateHamburger(sideMenuStatus);
    showSideMenu(sideMenuStatus);
    blockScroll(sideMenuStatus);
  });
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sideMenuStatus = !sideMenuStatus;
      animateHamburger(sideMenuStatus);
      showSideMenu(sideMenuStatus);
      blockScroll(sideMenuStatus);
    });
  });
}

openSideMenu();

function toggleNavbarPosition() {
  const homeSec = document.getElementById("home");
  const navBar = document.getElementById("navbar");
  const options = {
    threshold: 0.05,
  };

  let navObserver = new IntersectionObserver((entries) => {
    // console.log(entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // console.log("visible");
        navBar.classList.add("navbar-absolute");
        navBar.classList.remove("navbar-fixed");
        navBar.classList.remove("navbar-purple");
      } else {
        // console.log("not visible");
        navBar.classList.remove("navbar-absolute");
        navBar.classList.add("navbar-fixed");
        navBar.classList.add("navbar-purple");
      }
    });
  }, options);

  navObserver.observe(homeSec);
}
toggleNavbarPosition();
// active section monitoring
function placeActiveNav(selector, activeLink) {
  let element = document.querySelector(selector);
  const elementRect = element.getBoundingClientRect();
  let topPosition = elementRect.top;
  let navLinks = document.querySelectorAll("[data-nav-link]");

  // console.log(topPosition);
  if (topPosition == 0) {
    navLinks.forEach((link) => {
      link.classList.remove("active-nav-link");
    });
    activeLink.classList.add("active-nav-link");
  }
}

// function monitorActiveSection(sectionId) {
//   let element = document.querySelector(sectionId);
//   let activeLink = document.querySelector(`[href='${sectionId}']`);
//   function handle() {
//     placeActiveNav(sectionId, activeLink);
//   }
//   let activeSectionObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         window.addEventListener("scroll", handle, true);
//       } else {
//         window.removeEventListener("scroll", handle, true);
//         activeLink.classList.remove("active-nav-link");
//       }
//     });
//   });

//   activeSectionObserver.observe(element);
// }
// monitorActiveSection("#home");

function lazyLoadGoals() {
  const goals = document.querySelectorAll("[data-goal]");
  const options = {
    threshold: 0.2,
  };
  goals.forEach((goal) => {
    let goalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log(true);
          goal.classList.add("show-goal");
          goalObserver.unobserve(goal);
        } else {
          // console.log(false);
        }
      });
    }, options);
    goalObserver.observe(goal);
  });
}
lazyLoadGoals();

function customSelector() {
  let customSelectors = document.querySelectorAll("[data-selector]");
  customSelectors = [...customSelectors];
  customSelectors.forEach((selector) => {
    let selectorAttVal = selector.getAttribute("data-selector");
    let optionsContainer = document.querySelector(`[data-options="${selectorAttVal}"]`);
    let options = optionsContainer.querySelectorAll("[data-option]");
    let arrowIcon = document.querySelector(`[data-selector-arrow="${selectorAttVal}"]`);
    let flag = false;
    selector.addEventListener("click", async () => {
      async function openOptions() {
        optionsContainer.classList.add("option-display");
        await new Promise((resolve) => setTimeout(resolve, 0));
        optionsContainer.classList.add("options-anim");
        arrowIcon.classList.add("arrow-up");
        flag = true;
        console.log(`flag ${flag}`);
      }
      async function closeOptions() {
        optionsContainer.classList.remove("option-display");
        flag = false;
        console.log(`flag ${flag}`);
        arrowIcon.classList.remove("arrow-up");
        optionsContainer.removeEventListener("transitionend", closeOptions);
      }
      if (!flag) {
        openOptions();
      } else {
        optionsContainer.classList.remove("options-anim");
        await new Promise((resolve) => setTimeout(resolve, 0));
        optionsContainer.addEventListener("transitionend", closeOptions);
      }
    });
    options.forEach((option) => {
      option.addEventListener("click", () => {
        let optionVal = option
          .querySelector("[data-option-value]")
          .getAttribute("data-option-value");
        selector
          .querySelector("[data-selected-value]")
          .setAttribute("data-selected-value", optionVal);
        selector.querySelector("[data-selected-value]").textContent =
          option.querySelector("[data-option-value]").textContent;
      });
    });
  });
}
customSelector();

function loadNews() {
  const newsNavBtnElems = document.querySelectorAll("[data-news-navigator]");
  const newsNavBtns = [...newsNavBtnElems];
  const newsImg = document.getElementById("news-img");
  const newsTitle = document.getElementById("news-title");
  const newsDescription = document.getElementById("news-description");
  let xhttp = new XMLHttpRequest();
  let url =
    "https://raw.githubusercontent.com/Luke-Fernando/tanzstudio_aliia_pushilina/main/data/news.xml";
  // let url = "../../data/news.xml";

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let xmlDoc = new DOMParser().parseFromString(this.responseText, "application/xml");
      let posts = xmlDoc.querySelectorAll("post");

      newsNavBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          console.log("load news function working");
          newsNavBtns.forEach((ele) => {
            console.log("load news button working");
            ele.classList.remove("active-news");
            btn.classList.add("active-news");
          });
          let btnAttVal = Number(btn.getAttribute("data-news-navigator"));
          newsImg.setAttribute(
            "src",
            `./assets/images/news/${posts[btnAttVal].querySelector("image").getAttribute("src")}`
          );
          newsTitle.innerText = posts[btnAttVal].querySelector("title").textContent;
          newsDescription.innerText = posts[btnAttVal].querySelector("description").textContent;
        });
      });
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
}
loadNews();

function changeNavWithURL() {
  const navLinksElems = document.querySelectorAll("[data-nav-link]");
  const navLinks = [...navLinksElems];
  let hash = window.location.hash;
  navLinks.forEach((link) => {
    if (link.getAttribute("data-nav-link") == hash) {
      link.classList.add("active-nav-link");
    } else {
      link.classList.remove("active-nav-link");
    }
  });
  window.addEventListener("hashchange", (e) => {
    hash = window.location.hash;
    navLinks.forEach((link) => {
      if (link.getAttribute("data-nav-link") == hash) {
        link.classList.add("active-nav-link");
      } else {
        link.classList.remove("active-nav-link");
      }
    });
  });
}
changeNavWithURL();

function changeNavWithScroll() {
  const mainSectionElems = document.querySelectorAll("[data-main-section]");
  const mainSections = [...mainSectionElems];
  const navLinksElems = document.querySelectorAll("[data-nav-link]");
  const navLinks = [...navLinksElems];
  mainSections.forEach((section) => {
    let activeIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let activeSecAtt = section.getAttribute("data-main-section");
            navLinks.forEach((link) => {
              if (link.getAttribute("data-nav-link") == `#${activeSecAtt}`) {
                link.classList.add("active-nav-link");
              } else {
                link.classList.remove("active-nav-link");
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );
    activeIntersectionObserver.observe(section);
  });
}
changeNavWithScroll();

function contact() {
  const name = document.getElementById("name");
  const topic = document.getElementById("topic-value");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const sendBtn = document.getElementById("send");
  sendBtn.addEventListener("click", () => {
    let request = new XMLHttpRequest();
    let form = new FormData();

    form.append("name", name.value);
    form.append("topic", topic.getAttribute("data-selected-value"));
    form.append("subject", subject.value);
    form.append("message", message.value);

    request.onreadystatechange = () => {
      if (request.status == 200 && request.readyState == 4) {
        let response = request.responseText;
        console.log(response);
      }
    };

    request.open("POST", "https://tanzstudio-backend.vercel.app/api/idance_studio.php", true);
    request.send(form);
  });
}

contact();
