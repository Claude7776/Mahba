// Affichage des détails des packs
function showDetails(pack) {
  const details = {
    A: "Le Pack A Standard inclut un chauffeur professionnel et un véhicule confortable pour vos trajets urbains.",
    B: "Le Pack B Familial est idéal pour 4 personnes, avec un véhicule spacieux et toutes les commodités.",
    C: "Le Pack C Prestige vous offre un service VIP : confort, discrétion et luxe pour deux personnes."
  };
  document.getElementById("packDetails").classList.remove("hidden");
  document.getElementById("detailsText").textContent = details[pack];
}

// Menu responsive
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navList").classList.toggle("open");
  });

  // Animation fade-in au scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));
});