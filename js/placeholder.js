const moviesListPlaceholder = $('.js-movies-paceholder-list');
const moviesPlaceholderCard = $('.js-movie-placeholder-card');

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
}
setInterval(function () {
  if (mainStatus === false) {
      placeholderRemover();
  }
} , 1100);