import fetchFunc from './js/apiService';
import card from './templates/imageCard.hbs';
import './sass/main.scss';

let page = 1;
let query;

const key = '15871594-e6aabc3dbb9db4d877f262370';

const root = document.querySelector('.root');
const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

function moreBtnCreate() {
  if (!document.querySelector('.more')) {
    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more');
    root.append(moreBtn);
    moreBtn.textContent = 'Load more';
  }
}

function renderImages(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  query = input.value;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.innerHTML = markup;
    moreBtnCreate();
    document.querySelector('.more').addEventListener('click', renderMoreImages);
    form.reset();
  });
}

function renderMoreImages() {
  page += 1;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 1000);
  });
}

form.addEventListener('submit', renderImages);