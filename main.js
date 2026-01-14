const originalTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "i'm lost";
});
window.addEventListener("focus", () => {
  document.title = originalTitle;
});
