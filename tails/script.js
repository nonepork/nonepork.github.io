const tails = document.getElementById("tails");
const boomGif = document.getElementById("boom-gif");
const boomButton = document.getElementById("boom-button");

// tails.addEventListener("click", () => {
//   tails.classList.add("fly-up");
// });

document.getElementById("boom-button").addEventListener("click", () => {
  tails.classList.add("explode");
  boomGif.classList.add("play");
  boomButton.disabled = true;
});
