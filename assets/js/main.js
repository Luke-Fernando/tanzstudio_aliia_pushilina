import lang from "./lang.js";
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
  if (homeSec != null) {
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

class LazyLoadEle {
  constructor(selectors) {
    this.selectors = [...selectors];
  }
  lazyLoad() {
    if (this.selectors != null) {
      const options = {
        threshold: 0.2,
      };
      this.selectors.forEach((selector) => {
        let selectorObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              selector.classList.add("show-element");
              selectorObserver.unobserve(selector);
            } else {
            }
          });
        }, options);
        selectorObserver.observe(selector);
      });
    }
  }
}

function lazyLoadElements() {
  const elements = document.querySelectorAll("[data-lazy-load]");
  const lazyLoadElements = new LazyLoadEle(elements);
  lazyLoadElements.lazyLoad();
}
lazyLoadElements();

function customSelector() {
  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-selector]")) {
      let selector = event.target.closest("[data-selector]");

      let selectorAttVal = selector.getAttribute("data-selector");
      let optionsContainer = document.querySelector(`[data-options="${selectorAttVal}"]`);
      let options = optionsContainer.querySelectorAll("[data-option]");
      let arrowIcon = document.querySelector(`[data-selector-arrow="${selectorAttVal}"]`);
      function openOptions() {
        optionsContainer.classList.add("option-display");
        arrowIcon.classList.add("arrow-up");
        selector.setAttribute("data-selector-show", "true");
      }
      function closeOptions() {
        optionsContainer.classList.remove("option-display");
        arrowIcon.classList.remove("arrow-up");
        selector.setAttribute("data-selector-show", "false");
      }
      function toggleOptions() {
        let selectorState = selector.getAttribute("data-selector-show");

        if (selectorState == "false") {
          openOptions();
        } else if (selectorState == "true") {
          closeOptions();
        }
      }
      toggleOptions();
      options.forEach((option) => {
        option.addEventListener("click", (event) => {
          event.stopPropagation();
          let optionVal = option.querySelector("[data-option-value]").getAttribute("data-option-value");
          selector.querySelector("[data-selected-value]").setAttribute("data-selected-value", optionVal);
          selector.querySelector("[data-selected-value]").textContent = option.querySelector("[data-option-value]").textContent;
          closeOptions();
        });
      });
      document.addEventListener("click", (event) => {
        if (!selector.contains(event.target) && !optionsContainer.contains(event.target)) {
          closeOptions();
        }
      });
    }
  });
}
customSelector();


function loadNews(newsNavBtns, newsImg, news) {
  if (localStorage.getItem("news") == null) {
    localStorage.setItem("news", 1);
  }
  newsNavBtns.forEach((navBtn) => {
    if (localStorage.getItem("news") == navBtn.getAttribute("data-news-navigator")) {
      let newsNavImg = navBtn.querySelector("[data-news-navigator-img]");
      let newsNavBtnAttVal = navBtn.getAttribute("data-news-navigator");
      let currentNews = document.querySelector(`[data-news="${newsNavBtnAttVal}"]`);
      navBtn.classList.add("active-news");
      newsImg.setAttribute("src", newsNavImg.getAttribute("src"));
      news.forEach((item) => {
        if (item != currentNews) {
          item.classList.add("news-hide");
        } else if (item == currentNews) {
          item.classList.remove("news-hide");
        }
      })
    } else {
      navBtn.classList.remove("active-news");
    }
  })
}

function displayNews() {
  const newsNavBtnElems = document.querySelectorAll("[data-news-navigator]");
  const newsNavBtns = [...newsNavBtnElems];
  const newsElems = document.querySelectorAll("[data-news]");
  const news = [...newsElems];
  const newsImg = document.getElementById("news-img");
  newsNavBtns.forEach((newsNavBtn) => {
    newsNavBtn.addEventListener("click", () => {
      let newsNavBtnAttVal = newsNavBtn.getAttribute("data-news-navigator");
      let currentNews = document.querySelector(`[data-news="${newsNavBtnAttVal}"]`);
      let newsNavImg = newsNavBtn.querySelector("[data-news-navigator-img]");
      newsImg.setAttribute("src", newsNavImg.getAttribute("src"));
      newsNavBtn.classList.add("active-news");
      localStorage.setItem("news", Number(newsNavBtnAttVal));
      newsNavBtns.forEach((otherNewsNavBtn) => {
        if (otherNewsNavBtn != newsNavBtn) {
          otherNewsNavBtn.classList.remove("active-news");
        }
      });
      news.forEach((item) => {
        if (item != currentNews) {
          item.classList.add("news-hide");
        } else if (item == currentNews) {
          item.classList.remove("news-hide");
        }
      })
    });
  });
  loadNews(newsNavBtns, newsImg, news);
}

displayNews();

function changeNavWithURL() {
  const navLinksElems = document.querySelectorAll("[data-nav-link]");
  const navLinks = [...navLinksElems];
  let location = window.location.href;
  let origin = window.location.origin;
  let base = location.replace(origin, "");
  let hash = base.replace(/\//g, "");
  if (hash.length > 0) {
    navLinks.forEach((link) => {
      if (link.getAttribute("data-nav-link") == hash) {
        link.classList.add("active-nav-link");
      } else {
        link.classList.remove("active-nav-link");
      }
    });
  }
  window.addEventListener("hashchange", (e) => {
    let location = window.location.href;
    let origin = window.location.origin;
    let base = location.replace(origin, "");
    let hash = base.replace(/\//g, "");
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
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const sendBtn = document.getElementById("send");
  const alert = document.getElementById("alert");
  const successAlert = document.querySelector("#alert-success");
  const errorAlert = document.querySelector("#alert-error");
  const alertClose = document.getElementById("alert-close-btn");
  const clickOrTouch = "ontouchstart" in window ? "touchstart" : "click";
  if (name != null) {
    sendBtn.addEventListener(clickOrTouch, async (event) => {
      event.preventDefault();
      // let request = new XMLHttpRequest();
      let form = new FormData();

      form.append("execution", "contact");
      form.append("name", name.value);
      form.append("topic", topic.getAttribute("data-selected-value"));
      form.append("email", email.value);
      form.append("subject", subject.value);
      form.append("message", message.value);

      let request = await fetch("https://tanzstudio-backend.vercel.app/api/idance_studio.php", {
        method: "POST",
        body: form,
      });

      let response = request.text();
      const responseText = await response.then((value) => value);
      if (responseText == "success") {
        alert.classList.add("show-alert");
        await new Promise((resolve) => setTimeout(resolve, 0));
        alert.classList.add("pop-alert");
        errorAlert.classList.remove("alert-error");
        successAlert.classList.add("alert-success");
        document.querySelector('[data-alert-text="success"]').innerText = "Thank you for contacting us!";
      } else {
        alert.classList.add("show-alert");
        await new Promise((resolve) => setTimeout(resolve, 0));
        alert.classList.add("pop-alert");
        successAlert.classList.remove("alert-success");
        errorAlert.classList.add("alert-error");
        document.querySelector('[data-alert-text="error"]').innerText = responseText;
      }
    });
    alertClose.addEventListener(clickOrTouch, async (event) => {
      event.preventDefault();
      alert.classList.remove("pop-alert");
      await new Promise((resolve) => setTimeout(resolve, 0));
      alert.classList.add("pop-alert-reverse");
      alert.addEventListener(
        "animationend",
        () => {
          alert.classList.remove("show-alert");
          alert.classList.remove("pop-alert-reverse");
        },
        {
          once: true,
        }
      );
    });
  }
}

contact();

function register() {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const mobileNumber = document.getElementById("mobile-number");
  const classCategory = document.getElementById("class-category-value");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const sendBtn = document.getElementById("send");
  const alert = document.getElementById("alert");
  const successAlert = document.querySelector("#alert-success");
  const errorAlert = document.querySelector("#alert-error");
  const alertClose = document.getElementById("alert-close-btn");
  const clickOrTouch = "ontouchstart" in window ? "touchstart" : "click";

  if (firstName != null && lastName != null) {
    sendBtn.addEventListener(clickOrTouch, async (event) => {
      event.preventDefault();
      // let request = new XMLHttpRequest();
      let form = new FormData();

      form.append("execution", "register");
      form.append("first_name", firstName.value);
      form.append("last_name", lastName.value);
      form.append("class_category", classCategory.getAttribute("data-selected-value"));
      form.append("mobile_number", mobileNumber.value);
      form.append("email", email.value);
      form.append("message", message.value);

      let request = await fetch("https://tanzstudio-backend.vercel.app/api/idance_studio.php", {
        method: "POST",
        body: form,
      });

      let response = request.text();
      const responseText = await response.then((value) => value);
      if (responseText == "success") {
        alert.classList.add("show-alert");
        await new Promise((resolve) => setTimeout(resolve, 0));
        alert.classList.add("pop-alert");
        errorAlert.classList.remove("alert-error");
        successAlert.classList.add("alert-success");
        document.querySelector('[data-alert-text="success"]').innerText = "We'll get back to you soon!";
      } else {
        alert.classList.add("show-alert");
        await new Promise((resolve) => setTimeout(resolve, 0));
        alert.classList.add("pop-alert");
        successAlert.classList.remove("alert-success");
        errorAlert.classList.add("alert-error");
        document.querySelector('[data-alert-text="error"]').innerText = responseText;
      }
    });
    alertClose.addEventListener(clickOrTouch, async (event) => {
      event.preventDefault();
      alert.classList.remove("pop-alert");
      await new Promise((resolve) => setTimeout(resolve, 0));
      alert.classList.add("pop-alert-reverse");
      alert.addEventListener(
        "animationend",
        () => {
          alert.classList.remove("show-alert");
          alert.classList.remove("pop-alert-reverse");
        },
        {
          once: true,
        }
      );
    });
  }
}

register();

function language() {
  const defaultLang = "de";
  const langEle = document.querySelector("html[lang]");
  const langTogglers = document.querySelectorAll("[data-lang-toggler]");
  if (langEle != null) {
    function changeLang() {
      langTogglers.forEach(toggler => {
        toggler.addEventListener("click", async () => {
          let togglerLang = toggler.getAttribute("data-lang-toggler");
          langEle.setAttribute("lang", togglerLang);
          localStorage.setItem("lang", togglerLang);
          await new Promise((resolve) => setTimeout(resolve, 10));
          location.reload();
        });
      });
    }
    changeLang();
    function setLang() {
      return new Promise((resolve) => {
        document.addEventListener("DOMContentLoaded", () => {
          const setLang = localStorage.getItem("lang");
          if (setLang == null) {
            localStorage.setItem("lang", defaultLang);
            langEle.setAttribute("lang", defaultLang);
          } else {
            langEle.setAttribute("lang", setLang);
            langTogglers.forEach(toggler => {
              let togglerLang = toggler.getAttribute("data-lang-toggler");
              if (togglerLang == setLang) {
                toggler.classList.add("lang-toggler-active");
              } else {
                toggler.classList.remove("lang-toggler-active");
              }
            });
          }
          resolve();
        });
      });
    }
    async function loadLanguage() {
      await setLang();
      let currentLang = langEle.getAttribute("lang");
      let content = lang[currentLang];
      let textElems = document.querySelectorAll("[data-key-text]");
      let inputElems = document.querySelectorAll("[data-key-input]");
      let optionElems = document.querySelectorAll("[data-key-option]");
      textElems.forEach(ele => {
        let keyString = ele.getAttribute("data-key-text");
        let keys = keyString.split(".");
        let result = content;
        for (let key of keys) {
          result = result[key];
        }
        ele.innerHTML = result;
      });
      inputElems.forEach(ele => {
        let keyString = ele.getAttribute("data-key-input");
        let keys = keyString.split(".");
        let result = content;
        for (let key of keys) {
          result = result[key];
        }
        ele.setAttribute("placeholder", result);
      });
      optionElems.forEach(ele => {
        let keyString = ele.getAttribute("data-key-option");
        let keys = keyString.split(".");
        let result = content;
        for (let key of keys) {
          result = result[key];
        }
        ele.innerHTML = result;
        ele.setAttribute("data-option-value", keys[keys.length - 1]);
      });
    }
    loadLanguage();
  }
}

language();

// fetch('../../editable/About/About-en.xlsx')
//   .then(response => response.arrayBuffer())
//   .then(data => {
//     const workbook = XLSX.read(data, { type: 'array' });


//     const worksheet = workbook.Sheets["1"];

//     // Convert to JSON
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);
//     console.log(jsonData);
//   })
//   .catch(error => {
//     console.error("Error fetching the Excel file:", error);
//     1415
//   });
