(function() {
  const url = new URL(window.location.href);
  const hostCheck = url.hostname === "scratch.mit.edu";
  const pathCheck = url.pathname.startsWith("/projects/");

  if (!hostCheck || !pathCheck) {
    alert("⚠️ You must be on a Scratch project page!");
    return;
  }

  const projectID = url.pathname.split("/")[2];
  console.log("Project ID:", projectID);
})();
