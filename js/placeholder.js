const moviesListPlaceholder = $('.js-movies-paceholder-list');
const moviesPlaceholderCard = $('.js-movie-placeholder-card');

const searchPlaceholderSelect = document.querySelector('.js-search-select');
const searchPlaceholderSearchInput = document.querySelector('.js-search-input');
const searchPlaceholderSortSelect = document.querySelector('.js-sort-select');
const elBookmarksBtnBox = document.querySelector('.bookmarks-btn-box');
const main = document.querySelector('.main');

var mainStatus = true;

window.onload = function(){
  mainStatus = false;
};

// placeholder card
let qw = [1,2,3,4,5,6,7,8,9,10,11,12];
for (let i = 0; i < qw.length; i++) {
    let createdLI = document.createElement('li');
    createdLI.classList.add('mb-4');
    createdLI.innerHTML = moviesPlaceholderCard.innerHTML;
    moviesListPlaceholder.appendChild(createdLI);
}
//placeholder card end

function placeholderRemover () {
  moviesListPlaceholder.classList.add('d-none')
  elBookmarksBtnBox.classList.remove('placeholder')
  searchPlaceholderSelect.classList.remove('placeholder')
  searchPlaceholderSearchInput.classList.remove('placeholder')
  searchPlaceholderSortSelect.classList.remove('placeholder')
  main.style.pointerEvents = 'auto';
}
setInterval(function () {
  if (mainStatus === false) {
      placeholderRemover();
  }
} , 1100);