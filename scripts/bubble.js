document.addEventListener("DOMContentLoaded", function () {
  const qrBubble = document.getElementById("qrBubble");

  // Affiche la bulle uniquement sur certaines pages
 const pagesAutorisees = ["contact", "activité"];

if (pagesAutorisees.some(page => window.location.pathname.includes(page))) {
  qrBubble?.classList.add("visible");
}

  if (pagesAutorisees.some(page => currentPath.includes(page))) {
    setTimeout(() => {
      qrBubble?.classList.add("visible");
    }, 800);
  }

  // Optionnel : bouton de fermeture
  const closeBtn = document.getElementById("closeQrBubble");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      qrBubble.style.display = "none";
    });
  }
});
