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
