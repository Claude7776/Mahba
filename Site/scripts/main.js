// Affichage des détails des packs
function showDetails(pack) {
  const details = {
    A: "Le Pack A Standard comprend un chauffeur professionnel , ponctuel et courtois, ainsi qu'un véhicule confortable adapté aux déplacements urbains. Ce service est idéal pour les déplacements quotidiens, les rendez-vous d'affaires ou les transferts vers les gares et aéroports. Vous bénéficiez d'une conduite souple, d'un intérieur climatisé et d'une prise en charge rapide dans les zones urbaines.",
    B: "Le Pack B Familial est conçu pour les familles ou petits groupes jusqu'à 4 personnes . Il propose un véhicule spacieux avec sièges ergonomiques, coffre généreux et équipements adaptés aux enfants (siège bébé sur demande). Ce pack est parfait pour les sorties en famille, les excursions ou les voyages vers des lieux touristiques. Le confort et la sécurité sont au cœur de ce service.",
    C: "Le Pack C Prestige vous offre une expérience VIP exclusive pour deux personnes. Vous serez accueillis dans un véhicule haut de gamme , avec sellerie cuir, ambiance feutrée et boissons à bord. Le chauffeur discret et expérimenté vous garantit un trajet en toute confidentialité et élégance . Ce pack est idéal pour les événements spéciaux, les rendez-vous privés ou les transferts vers des lieux prestigieux."
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

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('expanded');
    const expanded = item.classList.contains('expanded');
    btn.setAttribute('aria-expanded', expanded);
  });
});
