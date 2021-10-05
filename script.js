const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=93865d61510109b514c261206c2b0edb&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=93865d61510109b514c261206c2b0edb&query="';

const API_PAGE = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=93865d61510109b514c261206c2b0edb&page='
const API_RATE = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=93865d61510109b514c261206c2b0edb&page=';

// API_PATH + API_SORT + API_KEY + actualNumber

const sortPopular = 'sort_by=popularity.desc&';
const sortRATE = 'sort_by=vote_average.desc&';
const API_PATH = 'https://api.themoviedb.org/3/discover/movie?';
const API_KEY = 'api_key=93865d61510109b514c261206c2b0edb&page=';

// DOM manipulation variables

const home = document.getElementById('logo');
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Page Selector variables

const pages = document.querySelector('.arrows');
const buttonNext = document.getElementById('btnNext');
const buttonPrev = document.getElementById('btnPrev');
const actualNumber = document.getElementById('count');

const filter = document.getElementById('filter');



// Get inital movies
getMovies(API_PATH + sortPopular + API_KEY + actualNumber)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClass(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`

        main.appendChild(movieEl);
    })
}

function getClass(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'oragne'
    } else {
        return 'red'
    }
}

// home screen

home.addEventListener('click', () => {
    pages.classList.remove('active');
    actualNumber.value = 1;
    actualNumber.innerHTML = actualNumber.value;
    getMovies(API_PATH + sortPopular + API_KEY + actualNumber)
})

// search 

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    actualNumber.value = 1;
    actualNumber.innerHTML = actualNumber.value;

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        pages.classList.add('active');
        search.value = '';
        
    } else {
        pages.classList.remove('active');
        window.location.reload()
    }
})

// filer 

filter.addEventListener('change', () => {
    pages.classList.remove('active');
    actualNumber.value = 1;
    actualNumber.innerHTML = actualNumber.value;
    if (filter.value === 'popularity') {
        getMovies(API_PATH + sortPopular + API_KEY + actualNumber)
    } else if (filter.value === 'releaseDate') {
        getMovies(API_PATH + sortRATE + API_KEY + actualNumber)
    }
    
})

// page select

buttonNext.addEventListener('click', () => {
    actualNumber.value++;
    actualNumber.innerHTML = actualNumber.value;
    if (filter.value === 'popularity') {
        getMovies(API_PATH + sortPopular + API_KEY + actualNumber.value)
    } else getMovies(API_PATH + sortRATE + API_KEY + actualNumber.value)
})

buttonPrev.addEventListener('click', () => {
    if (actualNumber.value > 1) {
        actualNumber.value--;
        if (filter.value === 'popularity') {
            getMovies(API_PATH + sortPopular + API_KEY + actualNumber.value)
        } else getMovies(API_PATH + sortRATE + API_KEY + actualNumber.value)
    actualNumber.innerHTML = actualNumber.value;
    }
})

