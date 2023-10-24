// Fonction pour masquer la page "home"
function hasVisitedBefore() {
  return document.cookie.indexOf("visited=true") >= 0;
}

function hideHome() {
  const home = document.getElementById('home');
  home.style.display = 'none';
}

// Fonction pour afficher le loader
function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

// Fonction pour masquer le loader
function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

// Masquez la page "home" au chargement du script
hideHome();


if (hasVisitedBefore()) {
  // Si l'utilisateur a déjà visité la page, masquez le loader immédiatement
  hideLoader();
  // Réaffichez la page "home"
  const home = document.getElementById('home');
  home.style.display = 'block';
} else {
  // Si c'est la première visite, affichez le loader et définissez un cookie pour indiquer que l'utilisateur a déjà visité la page
  showLoader();
  document.cookie = "visited=true; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/";
}

// Attendez que la page soit complètement chargée
window.addEventListener('load', function() {
  // Masquez le loader après un certain délai (par exemple, 2 secondes)
  setTimeout(function() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
    // Réaffichez la page "home" après avoir masqué le loader
    const home = document.getElementById('home');
    home.style.display = 'block';
  }, 3000);
});
