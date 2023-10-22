const stripe = Stripe('pk_test_51O1zzrHS1eWSG2Pl82hTx1pID3uC6vJNgSUYoiCGuEJ7IJ4FouffWl1NdmyhyqjLibgmk6fNi7lSIpTJnxyZ7W7600DjLYXCoI'); 

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

document.getElementById("checkoutButton").addEventListener("click", async function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    const items = Object.keys(cart).map(productTitle => {
        return {
            name: productTitle,
            amount: cart[productTitle].price * 100,
            currency: 'eur',
            quantity: cart[productTitle].quantity
        };
    });

    if (items.length === 0) {
        alert("Votre panier est vide!");
        return;
    }

    try {
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items })
        });

        if (response.ok) {
            const { sessionId } = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result.error) {
                alert(result.error.message);
            }
        } else {
            const { error } = await response.json();
            alert(`Erreur: ${error}`);
        }
    } catch (err) {
        alert("Une erreur s'est produite lors de la création de la session de paiement.");
    }
});


