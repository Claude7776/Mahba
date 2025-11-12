// JavaScript
const text = `☀️ Imaginez… Le soleil se lève sur la ville, l’air est doux, et votre chauffeur privé vous attend déjà devant votre hébergement.
🚗 À bord : Wi-Fi, rafraîchissements, et un sourire chaleureux. Direction le circuit de karting 🏎️ pour une matinée pleine d’adrénaline, suivie d’un déjeuner dans un riad caché 🍽️, réservé rien que pour vous.

🕌 L’après-midi, vous partez à la découverte des ruelles historiques avec un guide passionné, entre médina, artisanat et panoramas inoubliables.
🌇 Le soir venu, vous retrouvez le confort de votre villa : dîner prêt, ambiance feutrée, et billets pour le match du lendemain 🎟️⚽.

✨ Avec Mahba, chaque journée pendant la Coupe d’Afrique devient un voyage dans le voyage — fluide, organisé, et taillé sur mesure.
🎉 Vous vivez l’événement, nous nous occupons du reste.`;

let i = 0;
const speed = 140;
const target = document.getElementById("typewriter");

function typeWriter() {
  if (i < text.length) {
    target.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function restartTypewriter() {
  i = 0;
  target.textContent = "";
  typeWriter();
}

document.addEventListener("DOMContentLoaded", typeWriter);
