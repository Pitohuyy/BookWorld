document.addEventListener("DOMContentLoaded", function() {
  loadBookDetails();

  const addToCartButton = document.getElementById('add-to-cart');
  addToCartButton.addEventListener('click', addToCart);    
});

function loadBookDetails() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('bookId');    

  fetch('./db/book.json')
      .then(response => response.json())
      .then(books => {
          const book = books.find(b => b.id.toString() === bookId);
          if (book) {
              displayBookDetails(book);
              if(book.comments) {
                  displayComments(book.comments);
              }
          }
      })
      .catch(error => console.error('Error fetching books:', error));
}

function displayBookDetails(book) {
  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-image").src = book.imageSrc;
  document.getElementById("star-ratings").textContent = `Ratings: ${book.stars}`;
  document.getElementById("book-description").textContent = book.description;
  document.getElementById("book-price").textContent = "Price: " + book.price;

  const productDetails = document.getElementById("product-details");
  productDetails.innerHTML = `<h2>Product Details</h2>
  <ul>
      <li class="listee"><strong>Reading Age:</strong> ${book.productDetails.age}</li>
      <li class="listee"><strong>Binding:</strong> ${book.productDetails.binding}</li>
      <li class="listee"><strong>Language:</strong> ${book.productDetails.language}</li>
      <li class="listee"><strong>Publisher:</strong> ${book.productDetails.publisher}</li>
  </ul>`;
}

function displayComments(comments) {
  const commentsSection = document.getElementById("comments");
  commentsSection.innerHTML = "";

  comments.forEach((comment, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const userRating = document.createElement("p");
      userRating.classList.add("user-rating");
      userRating.textContent = `${comment.user} - ${comment.rating}`;
      commentDiv.appendChild(userRating);

      const commentText = document.createElement("p");
      commentText.textContent = comment.text;
      commentDiv.appendChild(commentText);

      commentsSection.appendChild(commentDiv);
  });
}

function addToCart() {
  console.log('Add to Cart button clicked');
  const bookTitle = document.getElementById('book-title').textContent;
  const bookPriceText = document.getElementById('book-price').textContent;
  const bookPrice = parseFloat(bookPriceText.replace('Price: ', ''));

  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};

  if(cart[bookTitle]) {
      cart[bookTitle]['quantity'] += 1;
  } else {
      cart[bookTitle] = {
          price: bookPrice,
          quantity: 1
      };
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${bookTitle} has been added to your cart.`);
}


  