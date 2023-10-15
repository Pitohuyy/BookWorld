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
      <a href="productdetail.html?bookId=${book.id}">
          <img src="${book.imageSrc}" alt="Book Cover">
      </a>
  `;
  return bookDiv;
}

function searchBooks() {
  var input, filter, bookCards, bookTitles, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  bookCards = document.querySelectorAll(".book");

  for (i = 0; i < bookCards.length; i++) {
      bookTitles = bookCards[i].querySelectorAll("h2")[0];
      txtValue = bookTitles.textContent || bookTitles.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          bookCards[i].style.display = "";
      } else {
          bookCards[i].style.display = "none";
      }
  }
}
