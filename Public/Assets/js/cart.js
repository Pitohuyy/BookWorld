document.addEventListener("DOMContentLoaded", function() {
    loadCartDetails();
});

function loadCartDetails() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let finalPrice = 0;
    const cartBody = document.getElementById("cart-tbody");
    cartBody.innerHTML = '';

    Object.keys(cart).forEach((productTitle) => {
        const product = cart[productTitle];

        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="product-title">${productTitle}</td>
            <td class="product-price">${product.price}€</td>
            <td class="product-quantity">
                <button class="remove-quantity-button" onclick="removeQuantity('${productTitle}')">-</button>
                <span>${product.quantity}</span>
                <button class="add-quantity-button" onclick="addQuantity('${productTitle}')">+</button>
            </td>
            <td class="product-actions">
                <button class="delete-button" onclick="deleteProduct('${productTitle}')">Delete</button>
            </td>
        `;

        cartBody.appendChild(newRow);

        finalPrice += product.price * product.quantity;
    });

    document.getElementById("finalPrice").innerText = finalPrice + "€";
}

function addQuantity(productTitle) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[productTitle].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartDetails();
}

function removeQuantity(productTitle) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[productTitle].quantity > 1) {
        cart[productTitle].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartDetails();
    }
}

function deleteProduct(productTitle) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[productTitle];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartDetails();
}

document.getElementById("checkoutButton").addEventListener("click", function() {
    // Ajoutez ici le code pour le passage de commande
});
