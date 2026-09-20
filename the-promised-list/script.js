var KEY = "promised-list";
var items = [];
var listEl = document.getElementById("mine");
var input = document.getElementById("new");
var copyBtn = document.getElementById("copyBtn");
var statusEl = document.getElementById("status");
var storyContainer = document.getElementsByTagName("story-container")[0];

function load() {
  try {
    var raw = localStorage.getItem(KEY);
    var parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed))
      items = parsed.filter(function (x) {
        return x && typeof x.t === "string";
      });
  } catch (e) {
    items = [];
  }
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {}
}

function render() {
  listEl.innerHTML = "";
  items.forEach(function (it, i) {
    var li = document.createElement("li");

    var dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("aria-hidden", "true");

    var txt = document.createElement("span");
    txt.className = "txt";
    txt.textContent = it.t;

    var rm = document.createElement("button");
    rm.type = "button";
    rm.className = "remove";
    rm.textContent = "Remove";
    rm.setAttribute("aria-label", "Remove " + it.t);
    rm.addEventListener("click", function () {
      items.splice(i, 1);
      save();
      render();
    });

    li.appendChild(dot);
    li.appendChild(txt);
    li.appendChild(rm);
    listEl.appendChild(li);
  });
  copyBtn.hidden = items.length === 0;
}

function add() {
  var v = input.value.trim();
  if (!v) return;
  items.push({ t: v });
  input.value = "";
  save();
  render();
  input.focus();
}

function say(msg) {
  statusEl.textContent = msg;
  setTimeout(function () {
    statusEl.textContent = "";
  }, 2500);
}

function listText() {
  return (
    "Things I have promised myself I will stay around for\n\n" +
    items
      .map(function (it) {
        return "- " + it.t;
      })
      .join("\n")
  );
}

function copy() {
  var text = listText();
  function fallback() {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
    say(
      ok
        ? "Copied"
        : "Sorry, something went wrong, might have to copy it by hand.",
    );
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      say("Copied");
    }, fallback);
  } else {
    fallback();
  }
}

document.getElementById("addBtn").addEventListener("click", add);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") add();
});
copyBtn.addEventListener("click", copy);

function hideStory() {
  storyContainer.hidden = !storyContainer.hidden;
}

load();
render();
