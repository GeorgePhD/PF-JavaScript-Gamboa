

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
    //changeIcons(userMode);
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

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
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
            

            // Append the elements to the card
            card.appendChild(name);
            card.appendChild(status);
            card.appendChild(species);
            card.appendChild(image);

            // Append the card to a container element (e.g., a div with the id "character-container")
            const container = document.getElementById('character-container');
            container.appendChild(card);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

/* home cards end here */


/* search section starts here */
const searchDisplay = document.querySelector('#search-display').value;
console.log(searchDisplay);
/* search section ends here */









