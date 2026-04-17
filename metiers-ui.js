document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quest-accordion").forEach((accordion) => {
    const detailsList = accordion.querySelectorAll("details");

    if (detailsList.length <= 1) return;

    const wrap = document.createElement("div");
    wrap.className = "toggle-all-details-wrap";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "toggle-all-details";
    button.textContent = "Tout ouvrir";
    button.dataset.state = "closed";

    button.addEventListener("click", () => {
      const shouldOpen = button.dataset.state !== "open";

      detailsList.forEach((detail) => {
        detail.open = shouldOpen;
      });

      button.dataset.state = shouldOpen ? "open" : "closed";
      button.textContent = shouldOpen ? "Tout fermer" : "Tout ouvrir";
    });

    wrap.appendChild(button);
    accordion.prepend(wrap);
  });
});
