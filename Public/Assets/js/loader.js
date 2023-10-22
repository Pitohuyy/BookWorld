// Fonction pour masquer la page "home"
function hideHome() {
  const home = document.getElementById('home');
  home.style.display = 'none';
}

// Fonction pour afficher le loader
function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
}

// Masquez la page "home" au chargement du script
hideHome();

// Montrez le loader
showLoader();

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
