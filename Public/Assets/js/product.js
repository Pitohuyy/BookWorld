function ouvrirPageProduit(numLivre) {
    window.location.href = `product.html?book=${numLivre}`;
}

function searchBooks() {
    var input, filter, livreCards, livreTitles, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    livreCards = document.querySelectorAll(".livre-card");

    for (i = 0; i < livreCards.length; i++) {
        livreTitles = livreCards[i].querySelectorAll(".livre-title");
        txtValue = "";
        for (var j = 0; j < livreTitles.length; j++) {
            txtValue += livreTitles[j].textContent || livreTitles[j].innerText;
        }
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            livreCards[i].style.display = "";
        } else {
            livreCards[i].style.display = "none";
        }
    }
}
