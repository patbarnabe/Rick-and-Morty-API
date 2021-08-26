import { filterData, sortData, searchName } from "./data.js";

fetch("./data/rickandmorty/rickandmorty.json")
  .then(response => response.json())
  .then(data => {
    mainFunction(data)
  })

function mainFunction(data) {

  const cards = document.querySelector(".cards");
  let genericCards = "";
  const btnClear = document.getElementById("btn-clearFilters");
  const btnSort = document.getElementById("sort-btn");
  const searchInput = document.getElementById("search");

  const statusFilter = document.getElementById("status-filter");
  const genderFilter = document.getElementById("gender-filter");

  // const printTotalCharacters = document.getElementById("totalCharacters");
  // const printGenderAverage = document.getElementById("genderAverage");

  printCardsGeneric(data.results);

  function printCardsGeneric(filterChosen) {
    genericCards = filterChosen
      .map(
        ({ name, status, gender, image, episode, species, location }) =>
          `<div class="cards_container">
            <div class="inner-div">
              <div class="front-card">
                <div class="moldura">
                  <img src="https://i.ibb.co/svrkzbn/gosma-big-nova-semfundo-pho.png">
                </div>  
                <span id="character_name">
                  <h3>${name}</h3>
                </span>
               
                <div class="character_img">
                  <img src="${image}">
                </div>
                <div class="character_info">
                  <span class="character_status"><p class="info">${status}</p></span>
                  <span class="character_gender"><p class="info">${gender}</p></span>
                </div>
              </div>
              <div class="back-card">
                <span> <h3>Episódios:</h3> </span>
                  <p class="info">${episode.map((i) => i.replaceAll(/[^0-9]/g, " "))}</p>
                  <span><h3>Espécie</h3></span>
                  <p>${species}</p>
                  <span><h3>Localização</h3></span>
                  <p>${location.name}</p>
              </div>
            </div>
          </div>`
      )
      .join("")

    cards.innerHTML = "";
    cards.innerHTML += genericCards;
  }


  // const totalCharacters = computeStats.characters(data.results);

  // printTotalCharacters.innerHTML =
  //   `<p class="text">O total de personagens da série é:
  //   <span class="numberOfCharacters">${totalCharacters}</span>
  //  </p>`;

  // const maleAverage = computeStats.gender(data.results, "Male") + "%";
  // const femaleAverage = computeStats.gender(data.results, "Female") + "%";
  // const genderlessAverage = computeStats.gender(data.results, "Genderless") + "%";
  // const unknownAverage = computeStats.gender(data.results, "unknown") + "%";

  // printGenderAverage.innerHTML =
  //   `
  //     <p class="text">&ensp;<span>Médias:</span>&ensp;
  //     Masculinos: <span>${maleAverage}</span> &ensp;| &ensp;  
  //     Femininos: <span>${femaleAverage}</span> &ensp;| &ensp;
  //     Desconhecidos: <span>${unknownAverage}</span>&ensp; | &ensp;
  //     Sem gênero: <span>${genderlessAverage}</span> &ensp;
  //     </p>
  // `;

  function filter(e) {
    e.preventDefault();
    const statusOptions = statusFilter.options[statusFilter.selectedIndex].value;
    const genderOptions = genderFilter.options[genderFilter.selectedIndex].value;
    const filterValue = filterData(data.results, statusOptions, genderOptions);
    printCardsGeneric(filterValue);
  }
  statusFilter.addEventListener("change", filter);
  genderFilter.addEventListener("change", filter);

  function sort(e) {
    e.preventDefault();
    const sortCards = sortData(data.results);
    printCardsGeneric(sortCards);
  }
  btnSort.addEventListener("click", sort);

  function clearFilters(e) {
    e.preventDefault();
    printCardsGeneric(data.results);
    statusFilter.options[(statusFilter.selectedIndex = 0)];
    genderFilter.options[(genderFilter.selectedIndex = 0)];
  }
  btnClear.addEventListener("click", clearFilters);

  function searchByName(e) {
    const charactersByName = searchName(data.results, e.target.value);
    printCardsGeneric(charactersByName);
  }
  searchInput.addEventListener("keyup", searchByName);

  const cursor = document.querySelector('.cursor');
// cursor
  document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: "+(e.pageX - 15) + "px;"); 
  })
}
