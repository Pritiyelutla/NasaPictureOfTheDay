const apiKey = 'LqSfjgSue4CAcX6SuFVhNQnyCwEM5JD5Ak1RYzU5'; // Replace with your NASA API key
const currentImageContainer = document.getElementById('current-image-container');
const currentImage = document.getElementById('current-image');
const currentDescription = document.getElementById('current-description');
const searchHistory = document.getElementById('search-history');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
        .then(response => response.json())
        .then(data => {
            currentImage.src = data.url;
            currentDescription.textContent = data.explanation;
            currentImage.alt = data.title;
        })
        .catch(error => console.error('Error fetching current image:', error));
}

function getImageOfTheDay(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            currentImage.src = data.url;
            currentDescription.textContent = data.explanation;
            currentImage.alt = data.title;
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => console.error('Error fetching image:', error));
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    searchHistory.innerHTML = ''; // Clear the current history
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => getImageOfTheDay(date));
        searchHistory.appendChild(listItem);
    });
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});
