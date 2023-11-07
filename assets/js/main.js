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
        console.log("visible");
        navBar.classList.add("navbar-absolute");
        navBar.classList.remove("navbar-fixed");
        navBar.classList.remove("navbar-purple");
      } else {
        console.log("not visible");
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
          console.log(true);
          goal.classList.add("show-goal");
          goalObserver.unobserve(goal);
        } else {
          console.log(false);
        }
      });
    }, options);
    goalObserver.observe(goal);
  });
}
lazyLoadGoals();
