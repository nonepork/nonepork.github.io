(function () {
  const url = new URL(window.location.href);
  const hostCheck = url.hostname === "scratch.mit.edu";
  const pathCheck = url.pathname.startsWith("/users/");
  const username = url.pathname.split("/")[2] || null;

  if (!hostCheck || !pathCheck) {
    alert("⚠️ You must be on a profile page!");
    return;
  } else if (!username) {
    alert("⚠️ Username not found, are you logged in?");
    return;
  }

  const projectsAPI = "/site-api/projects/all/";
  const selectFeaturedAPI = `/site-api/users/all/${username}/`;

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  function getAllProjects() {
    return $.ajax({
      type: "GET",
      url: projectsAPI,
      headers: {
        "X-CSRFToken": getCookie("scratchcsrftoken"),
        "Content-Type": "application/json",
      },
      xhrFields: {
        withCredentials: true,
      },
    });
  }

  function putFeaturedProject(id) {
    return $.ajax({
      type: "PUT",
      url: selectFeaturedAPI,
      headers: {
        "X-CSRFToken": getCookie("scratchcsrftoken"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        featured_project: id,
        featured_project_label: "",
      }),
      xhrFields: {
        withCredentials: true,
      },
    });
  }

  function createProjectPopup(projects) {
    var chooseGUI = document.createElement("div");
    chooseGUI.id = "chooseGUI";
    document.body.appendChild(chooseGUI);

    var css = document.createElement("style");
    css.innerHTML = `
        #chooseGUI {
            visibility: hidden;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all 0.3s ease;
        }

        #chooseGUI.show {
            visibility: visible;
            opacity: 1;
        }

        .popup-content {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            max-height: 80vh;
            width: 90%;
            padding: 20px;
            position: relative;
            overflow-y: auto;
        }

        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }

        .popup-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 0;
        }

        .close-btn {
            background: #f44336;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            background: #d32f2f;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .project-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            background: white;
        }

        .project-card:hover {
            border-color: #4CAF50;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        .project-thumbnail {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 10px;
            background-color: #f0f0f0;
        }

        .project-title {
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .project-id {
            font-size: 12px;
            color: #666;
        }

        .no-projects {
            text-align: center;
            color: #666;
            font-size: 18px;
            padding: 40px;
        }
    `;
    document.head.appendChild(css);

    var popupContent = document.createElement("div");
    popupContent.className = "popup-content";

    var header = document.createElement("div");
    header.className = "popup-header";

    var title = document.createElement("h2");
    title.className = "popup-title";
    title.textContent = "Choose a Project";

    var closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "×";
    closeBtn.onclick = closePopup;

    header.appendChild(title);
    header.appendChild(closeBtn);

    var projectsContainer = document.createElement("div");

    if (projects && projects.length > 0) {
      projectsContainer.className = "projects-grid";

      projects.forEach(function (project) {
        var projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.onclick = function () {
          selectProject(project);
        };

        var thumbnail = document.createElement("img");
        thumbnail.className = "project-thumbnail";
        thumbnail.src =
          project.thumbnailUrl ||
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='0.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
        thumbnail.alt = project.title;
        thumbnail.onerror = function () {
          this.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='0.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
        };

        var projectTitle = document.createElement("div");
        projectTitle.className = "project-title";
        projectTitle.textContent = project.title || "Untitled Project";

        var projectId = document.createElement("div");
        projectId.className = "project-id";
        projectId.textContent = "ID: " + project.id;

        projectCard.appendChild(thumbnail);
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectId);
        projectsContainer.appendChild(projectCard);
      });
    } else {
      var noProjects = document.createElement("div");
      noProjects.className = "no-projects";
      noProjects.textContent =
        "No projects found, or something went wrong :/, check your console.";
      projectsContainer.appendChild(noProjects);
    }

    popupContent.appendChild(header);
    popupContent.appendChild(projectsContainer);
    chooseGUI.appendChild(popupContent);

    setTimeout(function () {
      chooseGUI.className = "show";
    }, 10);

    chooseGUI.onclick = function (event) {
      if (event.target === chooseGUI) {
        closePopup();
      }
    };
  }

  function closePopup() {
    var popup = document.getElementById("chooseGUI");
    if (popup) {
      popup.classList.remove("show");
      setTimeout(function () {
        popup.remove();
      }, 300);
    }
  }

  function selectProject(project) {
    console.log("Selected project:", project);
    putFeaturedProject(project.id);

    closePopup();

    setTimeout(function () {
      alert("All done, try to refresh the page.");
    }, 300);
  }

  async function main() {
    try {
      const response = await getAllProjects();

      const projects = response.map((item) => ({
        id: item.pk,
        title: item.fields.title,
        thumbnailUrl: item.fields.thumbnail_url,
      }));

      console.log(projects);

      createProjectPopup(projects);
    } catch (error) {
      alert("⚠️Request failed, are you logged in?");
      console.log("Error: ", error);
      return;
    }
  }

  const script = document.createElement("script");
  script.src =
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  script.type = "text/javascript";
  script.onload = main;
  document.head.appendChild(script);
})();
