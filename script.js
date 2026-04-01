const container = document.getElementById("shows-container");
const loader = document.getElementById("loader");

async function fetchShows() {
  try {
    loader.style.display = "block";

    const response = await fetch("https://api.tvmaze.com/shows");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    loader.style.display = "none";

    displayShows(data.slice(0, 24));
  } catch (error) {
    loader.innerText = "Error loading data 😢";
    console.error(error);
  }
}

function displayShows(shows) {
  container.innerHTML = "";

  shows.forEach(show => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = show.image
      ? show.image.medium
      : "https://via.placeholder.com/210x295";

    card.innerHTML = `
      <img src="${image}" alt="${show.name}">
      <h3>${show.name}</h3>
    `;

    container.appendChild(card);
  });
}

fetchShows();