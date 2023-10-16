const booksContainer = document.querySelector(".books-container");

let currentIndex = 0;
const booksPerPage = 5; // Nombre de livres à afficher à la fois
const maxBookLenght = 15;


function displayBooks(startIndex) {
  booksContainer.innerHTML = "";

  for (
    let i = startIndex;
    i < Math.min(startIndex + booksPerPage, books.length - 3);
    i++
  ) {
    const book = books[i];
    const bookHTML = `
           
            <div class="testC">
            <a href="productdetail.html?bookId=${book.id}">
                <div class="book">
                    <img src="${book.imageSrc}" alt="${book.title}"loading="lazy">
                    <h2>${book.title}</h2>
                </div>  
            </a>
            </div>
            
            `;
    booksContainer.insertAdjacentHTML("beforeend", bookHTML);
  }
}

// Chargement des livres depuis book.json et affichage des premiers livres
let books = [];

// Fonction pour charger la base de données depuis book.json
async function loadBooks() {
  try {
    const response = await fetch("./db/book.json");
    if (!response.ok) {
      throw new Error("Failed to load the database");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

loadBooks()
  .then((data) => {
    books = data;
    displayBooks(currentIndex);
    displayTopSellers();
  })
  .catch((error) => {
    console.error(error);
  });

function prevBooks() {
  currentIndex -= booksPerPage;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  displayBooks(currentIndex);
}

function nextBooks() {
  currentIndex += booksPerPage;
  if (currentIndex >= maxBookLenght) {
    currentIndex = maxBookLenght - booksPerPage;
  }
  displayBooks(currentIndex);
}


// Fonction pour afficher un podium des 3 livres les plus vendus
function displayTopSellers() {
    // Trier les livres par nombre de ventes (à implémenter lorsque vous ajouterez le paramètre "nombre de ventes" à votre fichier book.json)
    books.sort((a, b) => b.sales - a.sales);

    // Sélectionner l'élément où afficher le podium (ajustez le sélecteur selon votre structure HTML)
    const podiumContainer = document.querySelector('.podium-container');

    // Effacer le contenu précédent du podium
    podiumContainer.innerHTML = '';

    // Créez un conteneur pour les livres du podium
    const podiumBooksContainer = document.createElement('div');
    podiumBooksContainer.classList.add('podium-books-container');

    // Sélectionnez les 3 premiers livres (les plus vendus)
    const topSellers = books.slice(0, 3);

    // Affichez chaque livre du podium dans le conteneur
    topSellers.forEach((book, index) => {
        const bookHTML = `
        <div class="wrappPodium">
            <div class="podium-book">
                <p>#${index + 1}</p> <!-- Ajoutez le numéro du podium -->
                <a class="podium-book" href="productdetail.html?bookId=${book.id}">
                <img src="${book.imageSrc}" alt="${book.title}">
                <h2>${book.title}</h2>
                </a>
                <p class="sellNumber">Nombre de ventes : ${book.sales}</p>
            </div>
        </div>
        `;
        podiumBooksContainer.insertAdjacentHTML('beforeend', bookHTML);
    });

    // Ajoutez le conteneur du podium au conteneur principal
    podiumContainer.appendChild(podiumBooksContainer);
}