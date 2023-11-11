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
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active-nav-link");
      });
      sideMenuStatus = !sideMenuStatus;
      animateHamburger(sideMenuStatus);
      showSideMenu(sideMenuStatus);
      blockScroll(sideMenuStatus);
      this.classList.add("active-nav-link");
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

function monitorActiveSection(sectionId) {
  let element = document.querySelector(sectionId);
  let activeLink = document.querySelector(`[href='${sectionId}']`);
  function handle() {
    placeActiveNav(sectionId, activeLink);
  }
  let activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", handle, true);
      } else {
        window.removeEventListener("scroll", handle, true);
        activeLink.classList.remove("active-nav-link");
      }
    });
  });

  activeSectionObserver.observe(element);
}
monitorActiveSection("#home");

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

function spinner() {
  document.onreadystatechange = async () => {
    if (document.readyState === "complete") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      document.getElementById("spinner").style.display = "none";
    }
  };
}

function loadNews() {
  const newsNavBtnElems = document.querySelectorAll("[data-news-navigator]");
  const newsNavBtns = [...newsNavBtnElems];
  const newsImg = document.getElementById("news-img");
  const newsTitle = document.getElementById("news-title");
  const newsDescription = document.getElementById("news-description");
  let xhttp = new XMLHttpRequest();

  // Define a callback function to handle the response
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Parse the XML response
      spinner();
      let xmlDoc = this.responseXML;
      let posts = xmlDoc.querySelectorAll("post");

      // Now you can work with the XML data
      console.log(posts[0].querySelector("image").getAttribute("src"));
      newsNavBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
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

  // Open a GET request to the XML file
  xhttp.open("GET", "../../data/news.xml", true);

  // Send the request
  xhttp.send();
}
loadNews();
