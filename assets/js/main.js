function animateHamburger(condition) {
  const hamburgerMiddleBar = document.getElementById("navbar-hamburger-icon-middle-bar");
  if (condition) {
    hamburgerMiddleBar.classList.add("hamburger-clicked");
  } else {
    hamburgerMiddleBar.classList.remove("hamburger-clicked");
  }
}
function showSideMenu(condition) {
  const sideMenu = document.getElementById("navbar-side-menu");
  const sideMenuBackdrop = document.getElementById("navbar-side-menu-backdrop");

  if (condition) {
    sideMenu.classList.add("side-menu-open");
    sideMenuBackdrop.classList.add("side-menu-backdrop-visible");
  } else {
    sideMenu.classList.remove("side-menu-open");
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
}

openSideMenu();

function toggleNavbarPosition() {
  const homeSec = document.getElementById("home");
  const navBar = document.getElementById("navbar");
  const options = {
    threshold: 0,
  };

  let navObserver = new IntersectionObserver((entries) => {
    console.log(entries);
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

  console.log(topPosition);
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
// active section monitoring
