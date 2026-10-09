
(function () {
  "use strict";
  const projects = {
    legal: {
      title: "Legal Case Precedent Matcher",
      overview: "A Python project that takes a legal case as input and helps find relevant previous cases.",
      steps: ["Provide the legal case details.", "The program compares the input with available case records.", "Relevant previous cases are displayed for review."],
      features: ["Find potentially relevant earlier cases", "Organize results for easier review"],
      tech: "Python"
    },
    lost: {
      title: "Lost & Found Portal",
      overview: "A desktop portal built with Tkinter and MySQL for reporting, searching and managing lost and found items.",
      steps: ["A user logs in and reports a lost or found item.", "Users search reports and view item details.", "An administrator reviews reports and can edit or delete them.", "The administrator can mark an item as Received; received items are removed from normal search results."],
      features: ["User/Admin roles", "Keyword-based search", "Item descriptions, location, contact and image support", "Admin report management and received status"],
      tech: "Python · Tkinter · MySQL"
    },
    payroll: {
      title: "Employee Payroll System with Mailing Service",
      overview: "A Spring Boot application with employee and attendance modules, JPA/Hibernate persistence and mailing service.",
      steps: ["Entity classes represent the data.", "Repositories handle database access.", "Service classes implement application logic.", "Controllers connect requests to services; the mailing service supports email communication."],
      features: ["Employee module", "Attendance module", "Layered Entity → Repository → Service → Controller structure", "Mailing service"],
      tech: "Java · Spring Boot · JPA/Hibernate"
    },
    complaint: {
      title: "Complaint Priority System",
      overview: "A complaint-management concept focused on priority-based handling.",
      steps: ["A complaint is recorded.", "It is assigned or assessed by priority.", "Higher-priority complaints are surfaced before lower-priority complaints."],
      features: ["Priority-based organization", "Highlights urgent issues for review"],
      tech: "Technologies depend on the implemented project version."
    }
  };
  function addItems(id, values) {
    const list = document.getElementById(id);
    list.replaceChildren();
    values.forEach(value => {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);
    });
  }
  function openProject(key) {
    const p = projects[key];
    const modal = document.getElementById("projectDetailsModal");
    if (!p || !modal) return;
    document.getElementById("projectDetailsTitle").textContent = p.title;
    document.getElementById("projectDetailsOverview").textContent = p.overview;
    addItems("projectDetailsSteps", p.steps);
    addItems("projectDetailsFeatures", p.features);
    document.getElementById("projectDetailsTech").textContent = p.tech;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open-custom");
  }
  function closeProject() {
    const modal = document.getElementById("projectDetailsModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open-custom");
  }
  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-project-key]");
    if (button) {
      event.preventDefault();
      openProject(button.getAttribute("data-project-key"));
      return;
    }
    if (event.target.id === "projectModalClose" || event.target.id === "projectDetailsModal") closeProject();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeProject();
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-project-key]")) {
      event.preventDefault();
      openProject(event.target.getAttribute("data-project-key"));
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a.certificate-card[href$=".pdf"]').forEach(link => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  });
})();


// Project Compass: filter project cards by the visitor's interest.
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".compass-filter");
  const projectCards = document.querySelectorAll(".projects-grid .project[data-tags]");
  const result = document.getElementById("compassResult");
  if (!filterButtons.length || !projectCards.length || !result) return;

  const labels = {
    all: "Showing all four projects.",
    python: "Python projects are highlighted — explore the Legal Case Precedent Matcher and Lost & Found Portal.",
    web: "The Employee Payroll System is your closest match for web and backend development.",
    data: "Database-related projects are highlighted — explore Lost & Found and Employee Payroll.",
    logic: "Problem-solving projects are highlighted — explore the Legal Case Precedent Matcher, Lost & Found Portal, and Complaint Priority System."
  };

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      filterButtons.forEach(function (other) {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", active ? "true" : "false");
      });
      projectCards.forEach(function (card) {
        const tags = (card.dataset.tags || "").split(/\s+/);
        const match = filter === "all" || tags.includes(filter);
        card.classList.toggle("is-filtered-out", !match);
        card.classList.toggle("compass-match", filter !== "all" && match);
      });
      result.textContent = labels[filter] || labels.all;
    });
  });
});
