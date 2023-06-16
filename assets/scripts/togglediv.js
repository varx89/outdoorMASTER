/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
const myFunction = () => {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
};

//add to localStorage
let products = [];
const addToCart = (item) => {
    cartItem = {
        product: item.dataset.name,
        image: item.dataset.src,
    };

    const outputItemLocalStorage = JSON.parse(getItemLocalStorage('cart'));
    // console.log(outputItemLocalStorage);
    const result = outputItemLocalStorage.filter(
        (x) => x.product === item.dataset.name || []
    );
    console.log(result);
    if (result.length > 0) {
        products = outputItemLocalStorage;
        products.push(cartItem);
    } else {
        products.push(cartItem);
    }
    console.log(products);
    addItemToLocalStorage(products);
};

const addItemToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    // products = [];
};

const getItemLocalStorage = (item) => {
    return localStorage.getItem(item);
};

const cartCounter = document.getElementsByClassName('cart-counter')[0];
cartCounter.textContent = 6;

const dropdownContent = document.getElementsByClassName('dropdown-content')[0];

const elementDiv = document.createElement('div');

const elementImg = document.createElement('img');
elementImg.setAttribute('src', './assets/images/items-cart/rh17n_side.jpg');
elementImg.setAttribute('alt', 'Casca schi Relax Wild RH17N');

const elementSpan = document.createElement('span');
elementSpan.textContent = '1 x Casca schi Relax Wild RH17N';

//div cartpay buttons
const cartDiv = document.createElement('div');
cartDiv.setAttribute('class', 'pay-buttons-maxcontent');

// a link with button mycart
const aCart = document.createElement('a');
aCart.setAttribute('href', '#cosul-meu');

const myCartButton = document.createElement('button');
myCartButton.textContent = 'Cosul meu';

// a link with button pay
const aPay = document.createElement('a');
aPay.setAttribute('href', '#plateste');

const payButton = document.createElement('button');
payButton.textContent = 'Plateste';

elementDiv.append(elementImg, elementSpan);

aPay.appendChild(payButton);
aCart.appendChild(myCartButton);
cartDiv.append(aPay, aCart);

dropdownContent.append(elementDiv, cartDiv);
