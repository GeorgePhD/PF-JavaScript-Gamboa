

const changeMode = document.querySelector('#change-mode');
const body = document.body;
const icon = document.querySelectorAll('.icon');

const setUserModePreference = (mode) => {
    localStorage.setItem('userMode', mode);
};


const getUserModePreference = () => {
    return localStorage.getItem('userMode');
};


const updateUIForUserModePreference = () => {
    const userMode = getUserModePreference();
    if (userMode === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }

};

const changeModes = () => {
    console.log('Mode changed');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        setUserModePreference('light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        setUserModePreference('dark');
    }
};

changeMode.addEventListener('click', changeModes);

// Initialize the UI based on the user's mode preference when the page loads
updateUIForUserModePreference();


/* home cards start here */
const url = 'https://rickandmortyapi.com/api/character';

let data;
fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        data = responseData;
        console.log(data);

        if (data.results) {
            data.results.forEach((result) => {
                const card = document.createElement('div');
                card.classList.add('card');

                // Create and populate elements for character information
                const name = document.createElement('h2');
                name.textContent = result.name;

                const status = document.createElement('p');
                status.textContent = `Status: ${result.status}`;

                const species = document.createElement('p');
                species.textContent = `Species: ${result.species}`;

                const image = document.createElement('img');
                image.src = result.image;

                const container = document.getElementById('character-container');

                if (container) {
                    // Append the elements to the card
                    card.append(name);
                    card.append(status);
                    card.append(species);
                    card.append(image);

                    // Append the card to a container element
                    container.append(card);
                }
            });
        } else {
            console.error('No results found in the data.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

/* home cards end here */


/* search section starts here */
const userSearch = document.querySelector('#search');
console.log(userSearch);
const displayButton = document.querySelector('#displayBtn');
console.log(displayButton);
const searchDisplay = document.querySelector('#search-display');
console.log(searchDisplay);
const addToFavoritesButton = document.querySelector('#add-to-favorites');

displayButton.addEventListener('click', () => {

    const searchName = userSearch.value.toLowerCase();
    const result = data.results.find((character) => character.name.toLowerCase() === searchName);

    if (result) {

        searchDisplay.innerHTML = `
        <div class='search-container'>
        <h3 class='search-subtitle'>character found:</h3>
        <p class='search-name'>${result.name}</p>
        <p class='search-status'>Status: ${result.status}</p>
        <p class='search-species'>Species: ${result.species}</p>
        <button class='add-to-favorites' id='add-to-favorites' title='add to favorites, it will be shown in the favorites section'><i class="fa-solid fa-heart"></i></button>
        <img class='search-img' src=${result.image}>
        </div>
        `;

    } else {

        searchDisplay.innerHTML = `<p class='search-error'>Character not found.</p>`;
    }

})

/* search section ends here */









