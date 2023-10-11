document.addEventListener("DOMContentLoaded", function() {
    loadCartDetails();
});

function loadCartDetails() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let finalPrice = 0;
    const cartBody = document.getElementById("cart-tbody");
    cartBody.innerHTML = '';

    Object.keys(cart).forEach((productTitle, i) => {
        const product = cart[productTitle];

        let newTr = document.createElement("tr");
        let newTd1 = document.createElement("td");
        let newTd2 = document.createElement("td");
        let newTd3 = document.createElement("td");
        let newTd4 = document.createElement("td");
        let newTd5 = document.createElement("td");

        newTd1.innerText = productTitle;
        newTd2.innerText = product.quantity;
        newTd3.innerText = product.price;
        newTd4.innerText = product.price * product.quantity;
        newTd5.innerHTML = `<button onclick="addQuantity('${productTitle}')">+</button>
                            <button onclick="lessQuantity('${productTitle}')">-</button>
                            <button onclick="deleteProduct('${productTitle}')">Delete</button>`;

        newTr.append(newTd1, newTd2, newTd3, newTd4, newTd5);

        if(i % 2 === 0){
            newTr.style.backgroundColor = "#ff7f27";
        } else {
            newTr.style.backgroundColor = "#cacaca";
        }

        cartBody.append(newTr);
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

function lessQuantity(productTitle) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart[productTitle].quantity > 1) {
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
