const buyBtn = document.querySelectorAll('.buy-section > div');
const arrayBuyBtn = Array.from(buyBtn);
const cart = document.querySelector('.cart');
const subTotalPrice = document.querySelector('.subtotal-price');
const aside = document.querySelector('aside');

let subTotal = 0;

function criarCart(item) {
  const elSpan = item.parentElement.querySelector('span');
  const burguerElement = elSpan.parentElement.parentElement;
  const burguerImg = burguerElement.querySelector('.burguer-img img').getAttribute('src');
  const price = +elSpan.innerText.slice(3).replace(',', '.');
  console.log(burguerImg)
  subTotal += price;


  if (cart.childElementCount === 1 - 1) {
    aside.style.width = '235px'
  }

  const div = document.createElement('div');
  div.classList.add('burguer-cart');
  div.style.display = 'flex';

  const trash = document.createElement('div');
  trash.style.cursor = 'pointer';
  trash.innerHTML = `<i class="fa-solid fa-trash" style="color: red; margin:0"></i>`;
  trash.classList.add('trash');
  div.appendChild(trash);

  const img = document.createElement('img');
  img.src = burguerImg;
  img.style.height = '35px';
  img.style.width = '45px';
  div.appendChild(img)

  const burguerName = document.createElement('h2');
  burguerName.innerHTML = burguerElement.querySelector('h2').innerHTML;
  burguerName.style.fontSize = '1rem';
  div.appendChild(burguerName)

  const burguerPrice = document.createElement('span');
  burguerPrice.innerHTML = price;
  burguerPrice.style.display = 'none';
  div.appendChild(burguerPrice);

  cart.appendChild(div);


  subTotalPrice.innerHTML = `R$ ${subTotal.toFixed(2).replace('.', ',')}`;
}

arrayBuyBtn.forEach((item) => {
  item.addEventListener('click', (e) => {

    if (cart.childElementCount <= 11 && window.innerHeight > 750) {
      criarCart(item);
    }
    if (window.innerHeight <= 750 && cart.childElementCount <= 7) {
      criarCart(item);
    }
  })
})

window.addEventListener('click', (e) => {
  e.preventDefault();
  const el = e.target;
  if (el.classList.contains('fa-trash')) {
    console.log(el.parentElement.parentElement);
    const elPrincipal = el.parentElement.parentElement;
    const price = +elPrincipal.querySelector('span').innerHTML;
    subTotal = subTotal - price;
    subTotalPrice.innerHTML = `R$ ${subTotal.toFixed(2).replace('.', ',')}`
    elPrincipal.remove();

    if (cart.childElementCount === 0) {
      aside.style.width = '0px';
    }
  }
})

