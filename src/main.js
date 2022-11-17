"use strict";
const pageOptions = {
  backButton: true,
  backToTop: true,
};

//@if PRODUCTION
// google analytics
if (
  !(
    window.doNotTrack === "1" ||
    navigator.doNotTrack === "1" ||
    navigator.doNotTrack === "yes" ||
    navigator.msDoNotTrack === "1"
  )
) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-ESQYE2ECNB", { site_speed_sample_rate: 100 });
}
//@endif

window.addEventListener("DOMContentLoaded", function () {
  if (pageOptions.backButton) {
    const backButton = document.createElement("a");
    backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>`;
    backButton.id = "backbutton";
    backButton.href = "../";
    document.body.appendChild(backButton);
  }

  if (pageOptions.backToTop) {
    const backToTop = document.createElement("div");
    backToTop.id = "back-to-top";
    backToTop.innerHTML =
      '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>';
    backToTop.classList.add("hidden");
    document.body.appendChild(backToTop);
    var scrollTrigger = 100;
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > scrollTrigger) {
        backToTop.classList.remove("hidden");
      } else {
        backToTop.classList.add("hidden");
      }
    });
    backToTop.addEventListener("click", function () {
      // fast scroll to top if browser supports, else instant
      if ("scrollBehavior" in document.documentElement.style) {
        document.documentElement.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        document.documentElement.scrollTop = 0;
      }
    });
  }
});
