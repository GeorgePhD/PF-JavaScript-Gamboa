

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
    //console.log('Mode changed');

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
document.addEventListener('DOMContentLoaded', () => {
    
    const url = 'https://rickandmortyapi.com/api/character';

fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        data = responseData;
        //console.log(data);

        if (data.results) {
            data.results.forEach((result) => {
                const card = document.createElement('div');
                card.classList.add('card');

                // Create and populate elements for character information
                const name = document.createElement('h2');
                name.textContent = result.name;
                //console.log(result.name)
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
})

/* search section starts here */
const userSearch = document.querySelector('#search');
//console.log(userSearch);
const searchDisplay = document.querySelector('#search-display');
//console.log(searchDisplay);
const displayButton = document.querySelector('#displayBtn');
//console.log(displayButton);


    if (displayButton) {

    displayButton.addEventListener('click', (e) => {
        e.preventDefault();

        const searchName = userSearch.value.toLowerCase();
        const result = data.results.find((character) => character.name.toLowerCase() === searchName);
        
        if (result) {
    
            searchDisplay.innerHTML = `
            <div class='search-container'>
                <h3 class='search-subtitle'>character found:</h3>
                <p class='search-name'>${result.name}</p>
                <p class='search-status'>Status: ${result.status}</p>
                <p class='search-species'>Species: ${result.species}</p>
                <img class='search-img' src=${result.image}>
            </div>
            `;
            
            const addToFavoritesButton = document.querySelector('#add-to-favorites');
            
            addToFavoritesButton.addEventListener('click', () => {
                console.log(`Added to favorites, button clicked, ${result.name} added.`);
                localStorage.setItem('result', JSON.stringify(result));
                console.log(localStorage);
                if(result) {

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Character added to favorites",
                        showConfirmButton: false,
                        timer: 2000
                    });                    
                }                         
            });

        } else {
    
            searchDisplay.innerHTML = `<p class='search-error'>Character not found.</p>`;
            Swal.fire({
                width: '400px',
                icon: "error",
                iconColor: "#551A8B",
                title: "Oops...",
                text: "Character not found.",
                popup: 'swal2-show',
                backdrop: 'swal2-backdrop-show',
                timer: 2000
                //footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    });
};

/* search section ends here */

//form validation
document.addEventListener('DOMContentLoaded', function () {
    // Your form validation code here
    const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => { //showing error cannot read properties of null
    // Prevent the default form submission
    event.preventDefault();

    // Perform form validation here
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const cellphoneInput = document.getElementById('cellphone-number');

    // Check if any field is empty
    
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || cellphoneInput.value.trim() === '') {
        
        Swal.fire({
            width: '400px',
            icon: "error",
            iconColor: "#551A8B",
            title: "Oops...",
            text: "All information must be completed.",
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show',
            //timer: 2000
            
        });
        return; // Stop form submission
    };

    if (!isNaN(nameInput.value)) {
        Swal.fire({
            width: '400px',
            icon: "error",
            iconColor: "#551A8B",
            title: "Oops...",
            text: "Please enter a valid name.",
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show',
            //timer: 2000
            
        });
        return; // Stop form submission
    }


    // Example validation: Check if the email is a valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        Swal.fire({
            width: '400px',
            icon: "error",
            iconColor: "#551A8B",
            title: "Oops...",
            text: "please enter a valid email address.",
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show',
            //timer: 2000
            
        });
        return; // Stop form submission
    }

    // Example validation: Check if the cellphone number is a number
    const cellphonePattern = /^\d{9}$/;
    if (!cellphonePattern.test(cellphoneInput.value)) {
        Swal.fire({
            width: '400px',
            icon: "error",
            iconColor: "#551A8B",
            title: "Oops...",
            text: "please enter a valid cellphone number, it must have 9 digits.",
            popup: 'swal2-show',
            backdrop: 'swal2-backdrop-show',
            //timer: 2000
            
        });
        return; // Stop form submission
    }


    // If all validations pass, you can proceed with form submission or other actions.
    // For demonstration, we'll simply log a success message.
    Swal.fire({

        position: "center",
        icon: "success",
        title: "Form submitted successfully",
        showConfirmButton: false,
        timer: 2000
    });
});

});






