let body = document.querySelector('body');
let OpenShopping = document.querySelector('.Shopping');
let CloseShopping = document.querySelector('.CloseShopping');
let ProductList = document.querySelector('.ProductList');
let cartTotal = document.querySelector('.total');
let total = 0;
function searchProducts() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.querySelector('h1').innerText.toLowerCase();
        if (title.includes(searchQuery)) {
            card.classList.add('show'); 
            card.style.visibility = 'visible'; 
        } else {
            card.classList.remove('show');
            card.style.visibility = 'hidden'; 
        }
    });
}
OpenShopping.addEventListener('mouseenter', () => {
    body.classList.add('active');
});

CloseShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let cartItems = {};
let products = [
    {
        id: 1,
        name: 'Healing Potion',
        price: 20
    },
    {
        id: 2,
        name: 'Mana Potion',
        price: 20
    },
    {
        id: 3,
        name: 'Hi-Potion',
        price: 40
    },
    {
        id: 4,
        name: 'Speed Potion',
        price: 40
    },
    {
        id: 5,
        name: 'Hill Giant Strength',
        price: 60
    },
];

function addToCart(productName) {
    let product = products.find(item => item.name === productName);
    if (cartItems[productName]) {
        cartItems[productName].quantity++;
    } else {
        cartItems[productName] = { ...product, quantity: 1 };
    }
    updateCart();
}

function removeFromCart(productName) {
    if (cartItems[productName]) {
        if (cartItems[productName].quantity > 1) {
            cartItems[productName].quantity--;
        } else {
            delete cartItems[productName];
        }
        updateCart();
    }
}

function updateCart() {
    ProductList.innerHTML = '';
    total = 0;
    let totalItems = 0; // Counter for total items in the cart

    for (let item in cartItems) {
        totalItems += cartItems[item].quantity; // Increment the total items counter
        total += cartItems[item].price * cartItems[item].quantity;
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${cartItems[item].name}</span>
            <button onclick="removeFromCart('${cartItems[item].name}')">-</button>
            <span>${cartItems[item].quantity}</span>
            <button onclick="addToCart('${cartItems[item].name}')">+</button>
            <span>${cartItems[item].price * cartItems[item].quantity}</span>
        `;
        ProductList.appendChild(listItem);
    }

    // Update the cart counter text
    let cartCounter = document.querySelector('.cart-counter');
    if (!cartCounter) {
        cartCounter = document.createElement('span');
        cartCounter.classList.add('cart-counter');
        OpenShopping.appendChild(cartCounter);
    }
    cartCounter.textContent = totalItems;

    cartTotal.textContent = total;
}

document.querySelector('.Confirm').addEventListener('click', () => {
    if (Object.keys(cartItems).length === 0) {
        alert('Your cart is empty. Please add items to your cart before confirming your order.');
    } else {
        if (confirm(`Are you sure you want to place this order? Total: ${total} gol`)) {
            alert('Thank you for your order!');
            cartItems = {};
            updateCart();
        }
    }
});








