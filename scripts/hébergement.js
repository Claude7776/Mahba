// Menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");
  toggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  // Fade-in animation
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });
  fadeElements.forEach((el) => observer.observe(el));

  // WhatsApp form logic
  const form = document.getElementById("whatsappForm");
  const modal = document.getElementById("confirmationModal");
  const messagePreview = document.getElementById("messagePreview");
  const confirmSend = document.getElementById("confirmSend");
  const cancelSend = document.getElementById("cancelSend");

  let whatsappURL = "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const retour = document.getElementById("date-retour").value;
    const hebergement = document.getElementById("hebergement").value;

    if (!nom || !email || !date || !retour || !hebergement) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const message = `Bonjour, je souhaite réserver avec les informations suivantes :
Nom : ${nom}
Email : ${email}
Date d’arrivée : ${date}
Date de retour : ${retour}
Type d’hébergement : ${hebergement}`;

    const phone = "212690565512";
    whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    messagePreview.textContent = message;
    modal.style.display = "flex";
  });

  confirmSend.addEventListener("click", function () {
    window.open(whatsappURL, "_blank");
    modal.style.display = "none";
  });

  cancelSend.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Header background
  const header = document.querySelector('.header-hero');
  if (header) {
    header.style.backgroundImage = "url('/styles/images/hero-bg.jpg')";
  }
});

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.hebergement-card');
    card.classList.toggle('expanded');
    const expanded = card.classList.contains('expanded');
    btn.textContent = expanded ? 'Voir moins' : 'Voir plus';
    btn.setAttribute('aria-expanded', expanded);
  });
});
