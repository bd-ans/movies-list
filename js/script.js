const moviesList = $('.js-movies-list');
const moviesCardTemplate = $('#template-element').content;

const searchInput = $('.js-search-input');
const searchSelect = $('.js-search-select');
const searchSort = $('.js-sort-select');
const searchBtn = $('.js-search-btn');
const elBookmarksBtn = $('.js-bookmarks-btn');
const elFailTxt = $('.js-fail-txt');
let elAddBookmarkBtn = document.querySelectorAll('.js-add-bookmark-btn');

let normalizedMovies = [];
let savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');

movies = movies.slice(0, 160);

// movie to normlaize
let films = movies.map((movie, i) => {
    let movieCaterogy = movie.Categories.split('|');
    movieCaterogy = movieCaterogy.join(', ');
    normalizedMovies.push({
    movieTitle: movie.Title,
    movieFullTitle: movie.fulltitle,
    movieYear: movie.movie_year,
    movieCaterogy: movieCaterogy,
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

let cloneNormalizedMovies = normalizedMovies.slice();
let cloneNormalizedMoviesOne = normalizedMovies.slice();
const cloneNormalizedMoviesTwo = normalizedMovies.slice();

// creating elemnts for movies list
let createMovieElement = function (movie) {
    let movieElement = moviesCardTemplate.cloneNode(true);
    movieElement.querySelector('.js-movie-img').src = movie.img;
    movieElement.querySelector('.js-movie-img').alt = movie.movieTitle;
    movieElement.querySelector('.js-modal-movie-img').src = movie.img;
    movieElement.querySelector('.js-modal-movie-img').alt = movie.movieTitle;
    movieElement.querySelector('.js-movie-title').textContent = movie.movieTitle;
    movieElement.querySelector('.js-modal-title').textContent = movie.movieFullTitle;
    movieElement.querySelector('.js-movie-summary').textContent = movie.movieSummary;
    movieElement.querySelector('.js-movie-release-year').textContent = movie.movieYear;
    movieElement.querySelector('.js-movie-caterogy').textContent = movie.movieCaterogy;
    movieElement.querySelector('.js-movie-rating').textContent = movie.movieRating;
    movieElement.querySelector('.js-movie-runtime').textContent = movie.movieRuntime;
    movieElement.querySelector('.js-movie-language').textContent = movie.movieLanguage;
    movieElement.querySelector('.js-yt-link').href = `https://www.youtube.com/watch?v=${movie.movieYtId}`;
    movieElement.querySelector('.js-modal').id = `exampleModal${movie.id}`;
    movieElement.querySelector('.js-modal-title').id = `exampleModal${movie.id}`;
    movieElement.querySelector('.js-modal-btn').setAttribute('data-bs-target', `#exampleModal${movie.id}`);
    movieElement.querySelector('.js-add-bookmark-btn').id = `addBookmarkBtn${movie.id}`;
    elAddBookmarkBtn = movieElement.querySelector(`#addBookmarkBtn${movie.id}`);
    elAddBookmarkBtn.classList.remove('text-danger');

    // add bookmark btn
    function myFunction() {
        if (savedMovies.length == 0) {
            elAddBookmarkBtn.classList.remove('text-danger');
        } else {
            savedMovies.forEach((savedMovie) => {
                if (savedMovie.movieId == movie.movieId) {
                    elAddBookmarkBtn.classList.add('active-bookmark');
                    elAddBookmarkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-dash" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>`;
                }
            })
        }
    }
    myFunction();

    return movieElement;
}


// main render function
let renderMovies = function (normalizedMovies) {
    moviesList.innerHTML = null;
    let fragment = document.createDocumentFragment();

    normalizedMovies.forEach(movie => {
        fragment.appendChild(createMovieElement(movie));

        //on  bookmark btn clicked
        elAddBookmarkBtn.addEventListener('click', function () {
            var bookmarkBtnStatus = true;
            if (savedMovies.length == 0) {
                savedMovies.push(movie);
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            } else {
                savedMovies.forEach(item => {
                    if (item.movieId == movie.movieId) {
                        bookmarkBtnStatus = false;
                        savedMovies.splice(savedMovies.indexOf(item), 1);
                        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                        // render saved movies
                        setTimeout(() => {
                            renderMovies(savedMovies);
                        }, 400);
                    }
                })
                if (bookmarkBtnStatus) {
                    savedMovies.push(movie);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                }
            }
            
            // on click change bookmark btn icon
            elAddBookmarkBtn = document.querySelector('#addBookmarkBtn' + movie.id);
            elAddBookmarkBtn.classList.toggle('active-bookmark');
            if (elAddBookmarkBtn.classList.contains('active-bookmark')) {
                elAddBookmarkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-dash" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5.5 6.5A.5.5 0 0 1 6 6h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                </svg>`;
            } else {
                elAddBookmarkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                </svg>`;
            }
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            selectedCatergory = savedMovies;
            mainData = savedMovies;
            slectedSort = savedMovies;
        })
    });
    
    moviesList.appendChild(fragment);
}

renderMovies(normalizedMovies);

let stringSort = 'All';
let numbSort = 'All';


elBookmarksBtn.addEventListener('click', function () {
    elFailTxt.classList.add('d-none');
    if (elBookmarksBtn.textContent == 'Bookmarks') {
        elBookmarksBtn.textContent = 'All Movies';
        renderMovies(savedMovies);
        mainData = savedMovies;
    } else {
        elBookmarksBtn.textContent = 'Bookmarks';
        renderMovies(normalizedMovies);
        mainData = normalizedMovies;
    }

    if (savedMovies.length == 0) {
        elBookmarksBtn.textContent = 'Bookmarks';
        renderMovies(normalizedMovies);
        mainData = normalizedMovies;
    }
})


// category select
let selectedCatergory = normalizedMovies;
let mainData = normalizedMovies;
let slectedSort = normalizedMovies;
let categories = [...new Set(movies.map(item => item.Categories.split('|')).flat())].sort();
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

    elFailTxt.classList.add('d-none');
});
// category select end

// sort select
searchSort.addEventListener('change', function () {
    if (searchSort.value === 'All') {
        stringSort = 'All';
        if (searchSelect.value === 'All') {
            slectedSort = cloneNormalizedMoviesTwo;
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

    elFailTxt.classList.add('d-none');
});
// sort select end

// Search input
searchInput.oninput = function () {
    let value = searchInput.value;
    let regExp = new RegExp(value, 'gi');
    let filt = mainData.filter(item => regExp.test(item.movieTitle));
    if (filt == '') {
        elFailTxt.classList.remove('d-none');
    } else {
        elFailTxt.classList.add('d-none');
    }
    renderMovies(filt);
}
// Search input end

// localStorage.removeItem('savedMovies');