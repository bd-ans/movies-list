const moviesList = $('.js-movies-list');
const moviesCardTemplate = $('#template-element').content;

const searchInput = $('.js-search-input');
const searchSelect = $('.js-search-select');
const searchBtn = $('.js-search-btn');

let normalizedMovies = [];
movies = movies.slice(0,200)

// movie to normlaize
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
// movie to normlaize end

// creating elemnts for movies list
let createMovieElement = function (movie) {
    let movieElement = moviesCardTemplate.cloneNode(true);
    movieElement.querySelector('.js-movie-img').src = movie.img;
    movieElement.querySelector('.js-movie-img').alt = movie.movieTitle;
    movieElement.querySelector('.js-movie-title').textContent = movie.movieTitle;
    movieElement.querySelector('.js-movie-summary').textContent = movie.movieSummary;
    movieElement.querySelector('.js-movie-full-tittle').textContent = movie.movieFullTitle;
    movieElement.querySelector('.js-movie-release-year').textContent = movie.movieYear;
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
// end creating elemnts for movies list

// main render function
let renderMovies = function (normalizedMovies) {
    moviesList.innerHTML = null;
    
    let fragment = document.createDocumentFragment();

    normalizedMovies.forEach(movie => {
        fragment.appendChild(createMovieElement(movie));
    });
    
    moviesList.appendChild(fragment);
}

renderMovies(normalizedMovies);
// main render function end

// search select default value
let defaultOption = document.createElement('option');
defaultOption.textContent = 'All';
searchSelect.append(defaultOption);
defaultOption.setAttribute('value', 'All');
defaultOption.setAttribute('selected', 'selected');
defaultOption.classList.add('text-primary', 'fw-bold');
// search select default value end

// catergory select
let selectedCatergory = normalizedMovies;
let categories = [...new Set(normalizedMovies.map(item => item.movieCaterogy.split('|')).flat())]
categories.forEach(item => {
    let option = document.createElement('option')
    option.textContent = item
    option.value = item
    searchSelect.append(option)
})

searchSelect.addEventListener('change', function () {
    // selectedCatergory = normalizedMovies;
    let filt = normalizedMovies.filter(item => item.movieCaterogy.includes(searchSelect.value))
    if (searchSelect.value === 'All') {
        selectedCatergory = normalizedMovies;
    } else {
        selectedCatergory = filt;
    }
    searchInput.value = null;
    renderMovies(selectedCatergory);
});
// catergory select end

// Search input
searchInput.oninput = function () {
    let value = searchInput.value;
    let regExp = new RegExp(value, 'gi');
    let filt = selectedCatergory.filter(item => regExp.test(item.movieTitle));
    renderMovies(filt);
}
// Search input end
