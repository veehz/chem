let current_equations = equations;

if (getCookie("ordering")) {
  document.getElementById("ordering").innerText = getCookie("ordering");
}
document.getElementById("ordering").addEventListener("click", () => {
  const btn = document.getElementById("ordering");
  if (btn.innerText == "Ordered") btn.innerText = "Random";
  else btn.innerText = "Ordered";
  setCookie("ordering", btn.innerText);
});

if (getCookie("inclusion")) {
  document.getElementById("inclusion").innerText = getCookie("inclusion");
}
document.getElementById("inclusion").addEventListener("click", () => {
  const btn = document.getElementById("inclusion");
  if (btn.innerText == "And") btn.innerText = "Or";
  else btn.innerText = "And";
  setCookie("inclusion", btn.innerText);
});

function isRandom() {
  return document.getElementById("ordering").innerText == "Random";
}

const familyTypes = [];
for (const eq of equations) {
  if (!familyTypes.includes(eq.from)) familyTypes.push(eq.from);
  if (!familyTypes.includes(eq.to)) familyTypes.push(eq.to);
}

function refreshCurrentEquations() {
  current_equations = [];
  const inclusion = document.getElementById("inclusion").innerText;
  for (const eq of equations) {
    if (
      (inclusion == "And" &&
        document.getElementById(`toggle-${eq.from}`).checked &&
        document.getElementById(`toggle-${eq.to}`).checked) ||
      (inclusion == "Or" &&
        (document.getElementById(`toggle-${eq.from}`).checked ||
          document.getElementById(`toggle-${eq.to}`).checked))
    )
      current_equations.push(eq);
  }
  changeEquation();
}

for (const type of familyTypes) {
  document.getElementById("family-fieldset").innerHTML += `
    <div>
        <input type="checkbox" id="toggle-${type}" name="toggle-${type}" value="${type}" checked>
        <label for="toggle-${type}">${type}</label>
    </div>
    `;
}

for (const type of familyTypes) {
  if (getCookie(`toggle-${type}`) === "false") {
    document.getElementById(`toggle-${type}`).checked = false;
  }
  document
    .getElementById(`toggle-${type}`)
    .addEventListener("change", (event) => {
      setCookie(`toggle-${type}`, event.target.checked ? "true" : "false");
    });
}
