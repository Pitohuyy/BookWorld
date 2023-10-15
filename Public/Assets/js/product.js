//PRODUCT DISPLAY

document.addEventListener("DOMContentLoaded", function() {
    loadBooks();
  });
  
  function loadBooks() {
    fetchBooks()
      .then(books => {
        displayBooks(books);
      })
      .catch(error => console.error('Error fetching books:', error));
  }
  
  function fetchBooks() {
    // Remplacez l'URL ci-dessous par le chemin vers votre fichier JSON de base de données.
    return fetch('./db/book.json')
      .then(response => response.json());
  }
  
  function displayBooks(books) {
    const booksContainer = document.getElementById("books-container");
  
    books.forEach(book => {
      const bookElement = createBookElement(book);
      booksContainer.appendChild(bookElement);
    });
  }
  
  function createBookElement(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
  
    bookDiv.innerHTML = `
      <h2>${book.title}</h2>
      <img src="${book.imageSrc}" alt="Book Cover">
    `;
  
    return bookDiv;
  }
  


//SEARCH BAR

  function ouvrirPageProduit(numLivre) {
    window.location.href = `product.html?book=${numLivre}`;
  }
  
  function searchBooks() {
    var input, filter, livreCards, livreTitles, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    livreCards = document.querySelectorAll(".book"); // Change to "book" class.
  
    for (i = 0; i < livreCards.length; i++) {
      livreTitles = livreCards[i].querySelectorAll("h2"); // Select h2 elements for titles.
      txtValue = "";
      for (var j = 0; j < livreTitles.length; j++) {
        txtValue += livreTitles[j].textContent || livreTitles[j].innerText;
      }
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        livreCards[i].style.display = "block"; // Use "block" to show the book.
      } else {
        livreCards[i].style.display = "none";
      }
    }
  }
  
