const favSection = document.getElementById("favorites-section");
let result = localStorage.getItem("result");
result = JSON.parse(result);
console.log(result);
console.log(favSection);

let currentContent = favSection.innerHTML;

if (!favSection.innerHTML.includes(result.name)) {

        let currentContent = favSection.innerHTML;

        currentContent += `

        <div class='search-container'>
        <p class='search-name'>${result.name}</p>
        <p class='search-status'>Status: ${result.status}</p>
        <p class='search-species'>Species: ${result.species}</p>
        <img class='search-img' src=${result.image}>
        </div>

        `;

        favSection.innerHTML = currentContent;
        
}

const clearFavorites = document.querySelector(".clear-favorites");
clearFavorites.addEventListener("click", () => {
        console.log('clear favorites');
        localStorage.removeItem("result");
        favSection.innerHTML = '';
        if(favSection.innerHTML == '') {
                favSection.innerHTML = '<p class="title">No favorites yet</p>'
                clearFavorites.style.visibility = "hidden";
        }
})

