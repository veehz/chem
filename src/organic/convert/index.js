"use strict";

function renderEq(eq) {
  katex.render(eq, document.getElementById("equation"), {
    throwOnError: false,
  });
}

let prev = 0;
function changeEquation() {
  if (current_equations.length == 0) return;
  let index = (prev + 1) % current_equations.length;
  if (isRandom()) {
    index = Math.floor(Math.random() * current_equations.length);
    while (index == prev) {
      index = Math.floor(Math.random() * current_equations.length);
    }
  }
  prev = index;
  const eq = current_equations[index];
  if (eq.equation) renderEq("\\ce{" + eq.equation + "}");
  else if (eq.katex) renderEq(eq.katex);
  document.getElementById("from").innerHTML = eq.from;
  document.getElementById("to").innerHTML = eq.to;
  document.getElementById("msg").innerHTML = eq.msg ? eq.msg : "";
  console.log(eq);
}

function click() {
  if (document.getElementById("solution").style.display == "none") {
    document.getElementById("solution").style.display = "block";
  } else {
    document.getElementById("solution").style.display = "none";
    changeEquation();
  }
}

// hack to prevent double click copy (which is annoying)
this.addEventListener(
  "mousedown",
  function (event) {
    if (event.detail > 1) {
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
        return;
      event.preventDefault();
    }
  },
  false
);

function atSettingsMenu() {
  return document.getElementById("settings").style.display == "block";
}

function toggleSettings() {
  if (atSettingsMenu()) {
    document.getElementById("settings").style.display = "none";
    refreshCurrentEquations();
  } else {
    document.getElementById("settings").style.display = "block";
  }
}

document
  .getElementById("settings-button")
  .addEventListener("click", toggleSettings);
document
  .getElementById("close-settings")
  .addEventListener("click", toggleSettings);

this.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !atSettingsMenu()) click();
  else if (event.key === "s") toggleSettings();
});

this.addEventListener("click", (event) => {
  if (!atSettingsMenu()) click();
});

changeEquation();
refreshCurrentEquations();
