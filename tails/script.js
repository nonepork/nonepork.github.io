let tails = document.getElementById("tails");
let boom_gif = document.getElementById("boom-gif");

// tails.addEventListener("click", () => {
//   tails.classList.add("fly-up");
// });

document.getElementById("boom-button").addEventListener("click", () => {
  console.log("tails demolished");
  tails.classList.add("explode");
  boom_gif.style.display = "block";
});
