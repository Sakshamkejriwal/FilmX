const container = document.getElementById("shows-container");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre");
const sortSelect = document.getElementById("sort");
const themeToggle = document.getElementById("theme-toggle");

let allShows = [];

/* FETCH DATA */
async function fetchShows() {
  try {
    loader.style.display = "block";

    const res = await fetch("https://api.tvmaze.com/shows");
    const data = await res.json();

    loader.style.display = "none";

    allShows = data;
    updateUI();
  } catch (err) {
    loader.innerText = "Error loading data 😢";
  }
}

/* DISPLAY */
function displayShows(shows) {
  container.innerHTML = "";

  shows.forEach(show => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = show.image
      ? show.image.medium
      : "https://via.placeholder.com/210x295";

    card.innerHTML = `
      <img src="${image}">
      <div class="card-content">
        <h3>${show.name}</h3>
        <p class="rating">⭐ ${show.rating.average || "N/A"}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

/* MAIN LOGIC */
function updateUI() {
  let result = [...allShows];

  /* SEARCH */
  const searchValue = searchInput.value.toLowerCase();
  result = result.filter(show =>
    show.name.toLowerCase().includes(searchValue)
  );

  /* FILTER */
  const genre = genreSelect.value;
  if (genre !== "all") {
    result = result.filter(show =>
      show.genres.includes(genre)
    );
  }

  /* SORT */
  const sortType = sortSelect.value;
  
  if (sortType === "rating") {
    result.sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
  } else if (sortType === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  displayShows(result.slice(0, 24));
}

searchInput.addEventListener("input", updateUI);
genreSelect.addEventListener("change", updateUI);
sortSelect.addEventListener("change", updateUI);

/* THEME TOGGLE */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

fetchShows();