const moviesList = $('.js-movies-list');
const moviesCardTemplate = $('#template-element').content;

const searchInput = $('.js-search-input');
const searchSelect = $('.js-search-select');
const searchSort = $('.js-sort-select');
const searchBtn = $('.js-search-btn');


let normalizedMovies = [];
movies = movies.slice(0, 5);

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
let normalizedMoviesClone = [];

let cloneNormalizedMovies = normalizedMovies.slice();
let cloneNormalizedMoviesOne = normalizedMovies.slice();
const cloneNormalizedMoviesTwo = normalizedMovies.slice();

let efefefefef = cloneNormalizedMovies.slice();

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
    movieElement.querySelector('.js-accordian-collapse').id = `flush-collapse${movie.id}`

    return movieElement;
}

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

let stringSort = 'All';
let numbSort = 'All';

// catergory select
let selectedCatergory = normalizedMovies;
let mainData = normalizedMovies;
let slectedSort = normalizedMovies;
let categories = [...new Set(normalizedMovies.map(item => item.movieCaterogy.split('|')).flat())].sort();
categories.forEach(item => {
    let option = document.createElement('option')
    option.textContent = item
    option.value = item
    searchSelect.append(option)
})
let cloneSelectdedCatergory = selectedCatergory.slice();
searchSelect.addEventListener('change', function () {
    let filt = normalizedMovies.filter(item => item.movieCaterogy.includes(searchSelect.value))
    if (searchSelect.value === 'All') {
        if (stringSort === 'A-Z') {
            slectedSort = cloneNormalizedMoviesOne.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
            selectedCatergory = slectedSort;
            cloneNormalizedMovies = normalizedMovies;
            mainData = slectedSort;
        } else if (stringSort === 'Z-A') {
            slectedSort = cloneNormalizedMoviesOne.sort((a, b) => b.movieTitle.localeCompare(a.movieTitle));
            selectedCatergory = slectedSort;
            cloneNormalizedMovies = normalizedMovies;
            mainData = slectedSort;
        } else if (stringSort === '0-10') {
            slectedSort = cloneNormalizedMoviesOne.sort((a, b) => a.movieRating - b.movieRating);
            selectedCatergory = slectedSort;
            cloneNormalizedMovies = normalizedMovies;
            mainData = slectedSort;
        } else if (stringSort === '10-0') {
            slectedSort = cloneNormalizedMoviesOne.sort((a, b) => b.movieRating - a.movieRating);
            selectedCatergory = slectedSort;
            cloneNormalizedMovies = normalizedMovies;
            mainData = slectedSort;
        } else if (stringSort === 'All') {
            slectedSort = cloneNormalizedMoviesOne;
            selectedCatergory = slectedSort;
            cloneNormalizedMovies = normalizedMovies;
            mainData = slectedSort;
        } else {
            renderMovies(normalizedMovies);
            cloneSelectdedCatergory = selectedCatergory;
        }
    } else if (stringSort === '10-0') {
        slectedSort = filt.sort((a, b) => b.movieRating - a.movieRating);
        selectedCatergory = slectedSort;
        cloneNormalizedMovies = normalizedMovies;
        mainData = slectedSort;
    } else {
        selectedCatergory = filt;
        cloneNormalizedMovies = filt;
        mainData = filt;
    }
    searchInput.value = null;
    renderMovies(selectedCatergory);
});
// catergory select end

// sort select
searchSort.addEventListener('change', function () {
    if (searchSort.value === 'All') {
        stringSort = 'All';
        if (searchSelect.value === 'All') {
            slectedSort = cloneNormalizedMoviesTwo;
            // selectedCatergory = slectedSort;
            mainData = slectedSort;
        } else {
            slectedSort = selectedCatergory;
            mainData = selectedCatergory;
        }
    } else {
        if (searchSort.value === 'A-Z') {
            let dddclone = selectedCatergory.slice();
            slectedSort = selectedCatergory.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
            stringSort = 'A-Z';
            selectedCatergory = dddclone;
            mainData = slectedSort;
        } else if (searchSort.value === 'Z-A') {
            let dddclonee = selectedCatergory.slice();
            slectedSort = selectedCatergory.sort((a, b) => b.movieTitle.localeCompare(a.movieTitle));
            stringSort = 'Z-A';
            selectedCatergory = dddclonee;
            mainData = slectedSort;
        } else if (searchSort.value === '0-10') {
            let dddcloneee = selectedCatergory.slice();
            slectedSort = selectedCatergory.sort((a, b) => a.movieRating - b.movieRating);
            stringSort = '0-10';
            selectedCatergory = dddcloneee;
            mainData = slectedSort;
        } else if (searchSort.value === '10-0') {
            let dddcloneeee = selectedCatergory.slice();
            slectedSort = selectedCatergory.sort((a, b) => b.movieRating - a.movieRating);
            stringSort = '10-0';
            selectedCatergory = dddcloneeee;
            mainData = slectedSort;
        }
    }
    searchInput.value = null;
    renderMovies(slectedSort);
});
// sort select end

// Search input
searchInput.oninput = function () {
    let value = searchInput.value;
    let regExp = new RegExp(value, 'gi');
    let filt = mainData.filter(item => regExp.test(item.movieTitle));
    renderMovies(filt);
}
// Search input end
