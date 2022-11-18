"use strict";function renderEq(e){katex.render(e,document.getElementById("equation"),{throwOnError:!1})}let prev=0;function changeEquation(){if(0==current_equations.length)return;let e=(prev+1)%current_equations.length;if(isRandom())for(e=Math.floor(Math.random()*current_equations.length);e==prev;)e=Math.floor(Math.random()*current_equations.length);prev=e;const t=current_equations[e];t.equation?renderEq("\\ce{"+t.equation+"}"):t.katex&&renderEq(t.katex),document.getElementById("from").innerHTML=t.from,document.getElementById("to").innerHTML=t.to,document.getElementById("msg").innerHTML=t.msg?t.msg:"",console.log(t)}function click(){"none"==document.getElementById("solution").style.display?document.getElementById("solution").style.display="block":(document.getElementById("solution").style.display="none",changeEquation())}function atSettingsMenu(){return"block"==document.getElementById("settings").style.display}function toggleSettings(){atSettingsMenu()?(document.getElementById("settings").style.display="none",refreshCurrentEquations()):document.getElementById("settings").style.display="block"}this.addEventListener("mousedown",(function(e){if(e.detail>1){if(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey)return;e.preventDefault()}}),!1),document.getElementById("settings-button").addEventListener("click",toggleSettings),document.getElementById("close-settings").addEventListener("click",toggleSettings),this.addEventListener("keydown",(e=>{"Enter"!==e.key||atSettingsMenu()?"s"===e.key&&toggleSettings():click()})),this.addEventListener("click",(e=>{atSettingsMenu()||click()})),changeEquation(),refreshCurrentEquations();