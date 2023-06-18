//add to localStorage
let products = [];

const render = (cart) => {
    const dropdownContent =
        document.getElementsByClassName('dropdown-content')[0];

    const cartCounter = document.getElementsByClassName('cart-counter')[0];
    cartCounter.textContent = countProductsQTY();

    for (item of cart) {
        const elementDiv = document.createElement('div');

        const elementImg = document.createElement('img');
        elementImg.setAttribute('src', item.image);
        elementImg.setAttribute('alt', item.product);

        const elementSpan = document.createElement('span');
        elementSpan.textContent = `${item.qty} x ${item.product}`;

        const deleteIcon = document.createElement('i');
        deleteIcon.setAttribute('class', 'fa-solid fa-trash-can');
        deleteIcon.setAttribute('data-name', `${item.product}`);
        deleteIcon.setAttribute('onclick', 'deleteItemCart(this)');

        elementDiv.append(elementImg, elementSpan, deleteIcon);
        dropdownContent.appendChild(elementDiv);
    }

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

    aPay.appendChild(payButton);
    aCart.appendChild(myCartButton);
    cartDiv.append(aPay, aCart);

    dropdownContent.appendChild(cartDiv);
};

//functions

const cartShow = () => {
    const dropdownContent =
        document.getElementsByClassName('dropdown-content')[0];
    dropdownContent.style.display = 'block';

    dropdownContent.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    });
};

const addItemToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    location.reload();
};

const getItemLocalStorage = (item) => {
    const output = JSON.parse(localStorage.getItem(item)) ?? [];
    products = [...output];

    return products;
};

const deleteItemCart = (item) => {
    const outputItemLocalStorage = getItemLocalStorage('cart');

    const result = outputItemLocalStorage.filter(
        (x) => x.product === item.dataset.name
    );
    const resultOther = outputItemLocalStorage.filter(
        (x) => x.product !== item.dataset.name
    );

    if (result.length > 0) {
        products = [...resultOther];
        addItemToLocalStorage(products);
    } else {
        location.reload();
    }
};

const countProductsQTY = () => {
    const getDB = getItemLocalStorage('cart');
    let countQTYs = 0;

    for (let item of getDB) {
        countQTYs += item.qty;
    }

    return countQTYs;
};

const addToCart = (item) => {
    cartItem = {
        product: item.dataset.name,
        image: item.dataset.src,
        qty: 1,
    };

    const outputItemLocalStorage = getItemLocalStorage('cart');

    const result = outputItemLocalStorage.filter(
        (x) => x.product === item.dataset.name
    );
    const resultOther = outputItemLocalStorage.filter(
        (x) => x.product !== item.dataset.name
    );

    if (result.length > 0) {
        result[0].qty++;

        products = [...resultOther].concat(result);
    } else {
        products.push(cartItem);
    }

    addItemToLocalStorage(products);
};

render(getItemLocalStorage('cart'));
