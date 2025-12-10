// var menuButton = document.querySelector("menu-button");
// var menuButtonClicked = document.getElementById("clicked");
// var startMenu = document.querySelector("start-menu");
// var desktop = document.querySelector("desktop");
//
// class PopUp extends HTMLElement {
//   constructor() {
//     super();
//     const shadowRoot = this.attachShadow({ mode: "open" });
//     shadowRoot.innerHTML = `
//       <link rel="stylesheet" href="https://unpkg.com/7.css" />
//       <div class="background">
//         <div class="window glass active" style="max-width: 100%">
//           <div class="title-bar">
//             <div class="title-bar-text">Not Ready Yet</div>
//             <div class="title-bar-controls">
//               <button aria-label="Close"></button>
//             </div>
//           </div>
//           <div class="window-body has-space" style="padding: 0 30px">
//             <p>This website is still a WIP</p>
//           </div>
//         </div>
//       </div>
//     `;
//
//     const closeBtn = shadowRoot.querySelector("[aria-label='Close']");
//     closeBtn.addEventListener("click", () => {
//       this.close();
//     });
//   }
//
//   close() {
//     this.remove();
//   }
// }
//
// customElements.define("pop-up", PopUp);
// const wipPopUp = document.createElement("pop-up");
// const programs = document.querySelectorAll("program");
// let selectedProgram = null;
//
// programs.forEach((program) => {
//   program.addEventListener("click", (_) => {
//     if (selectedProgram) {
//       selectedProgram.classList.remove("selected");
//     }
//
//     program.classList.add("selected");
//     selectedProgram = program;
//   });
//
//   program.addEventListener("dblclick", (_) => {
//     if (selectedProgram) {
//       selectedProgram.classList.remove("selected");
//     }
//
//     const action = program.dataset.action;
//
//     switch (action) {
//       case "openComputer":
//         document.body.appendChild(wipPopUp);
//         break;
//       case "openRentFree":
//         document.body.appendChild(wipPopUp);
//         break;
//     }
//   });
// });
//
// desktop.addEventListener("click", (e) => {
//   // only deselect if clicking directly on desktop (not on a program)
//   if (e.target.tagName === "DESKTOP") {
//     if (selectedProgram) {
//       selectedProgram.classList.remove("selected");
//       selectedProgram = null;
//     }
//   }
// });
//
// menuButton.onclick = function () {
//   // is this good?
//   if (startMenu.style.display === "none") {
//     startMenu.style.display = "block";
//     menuButtonClicked.style.opacity = "1";
//   } else {
//     startMenu.style.display = "none";
//     menuButtonClicked.style.opacity = "0";
//   }
// };

if (window.location.hostname === "localhost") {
  console.log("live reload activated baby");
  import("https://kalabasa.github.io/simple-live-reload/script.js");
}
