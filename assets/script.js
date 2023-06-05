// Event listener for selecting dropdown genre
var dropdownSelection = document.querySelectorAll(".dropdown-item");
var dropdownButton = document.querySelector('#dropdown-button');
var servicesButton = document.querySelector('#services');

dropdownSelection.forEach(function (dropItem) {
  dropItem.addEventListener('click', function () {
    var selectedOption = dropItem.textContent;
    dropdownButton.textContent = selectedOption;
  });
});

// Fetch movie data from API, genre type and services using movie database api
const fetchData = async (genreId, servicesIds) => {
  const servicesQuery = servicesIds.join(',');
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=${servicesQuery}&output_language=en&show_type=movie&genre=${genreId}&show_original_language=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '47680950bfmsh526b1d3b26cf4e1p1f501bjsn740c45a2443b', /* 'efdf7f95b7msh5dfdbf4a9e49d24p1607ccjsn8e83b0591745' */
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    // Check if there are any movies in the result
    if (result.result.length > 0) {
      const movies = result.result;

      // clear existing movies
      document.querySelector('.movies').innerHTML = '';

      // Iterate over each movie
      for (const movie of movies) {
        const poster = movie.posterURLs[185];
        const title = movie.title;
        const year = movie.year;

        // Fetch movie description using imdb api
        const descriptionUrl = `https://online-movie-database.p.rapidapi.com/auto-complete?q=${encodeURIComponent(title)}`;
        const descriptionOptions = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'efdf7f95b7msh5dfdbf4a9e49d24p1607ccjsn8e83b0591745',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
          }
        };

        try {
          const descriptionResponse = await fetch(descriptionUrl, descriptionOptions);
          const descriptionResult = await descriptionResponse.json();
          const movieDescription = descriptionResult.d[0]?.s ?? 'No description available';

          // Create the HTML for each movie result with description and overview, description displays 2 actors and overview is a summary
          const movieHTML = `
            <div class="col-md-4 col-lg-3">
              <div class="card g-3"> 
                <img class="card-img-top" alt="${title} movie poster" src="${poster}">
                <div class="card-body">
                  <h2 class="card-title">${title} ${year}</h2>
                  <p class="card-text">${movieDescription}</p>
                  <p class="card-text">${movie.overview}</p>
                </div>
              </div>
            </div>`;

          console.log(movieHTML);
          document.querySelector('.movies').innerHTML += movieHTML;
        } catch (descriptionError) {
          console.error('Error fetching movie description:', descriptionError);
        }
      }
    } else {
      console.log('No movies found.');
    }
  } catch (error) {
    console.error(error);
  }
};

// Event listener for service button click
var serviceButtons = document.querySelectorAll(".service-button");

serviceButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    button.classList.toggle('active');
  });
});

// Event listener for search button
var searchButton = document.querySelector('#search');

searchButton.addEventListener('click', function () {
  var selectedGenre = dropdownButton.textContent;
  var selectedServices = [];

  // Get the selected services
  serviceButtons.forEach(function (button) {
    if (button.classList.contains('active')) {
      var service = button.getAttribute('data-service');
      selectedServices.push(service);
    }
  });

  // Key for API query
  var genreKey = {
    "Action": "28",
    "Adventure": "12",
    "Animation": "16",
    "Comedy": "35",
    "Crime": "80",
    "Drama": "18",
    "Family": "10751",
    "Fantasy": "14",
    "History": "36",
    "Horror": "27",
    "Music": "10402",
    "Mystery": "9648",
    "Romance": "10749",
    "Science Fiction": "878",
    "Thriller": "53",
    "War": "10752",
    "Western": "37"
  };

  var servicesKey = { 
    "netflix": "netflix",
    "hbo": "hbo",
    "hulu": "hulu",
    "prime": "prime"
  };

  var selectedGenreId = genreKey[selectedGenre];
  var selectedServicesIds = selectedServices.map(service => servicesKey[service]);

  fetchData(selectedGenreId, selectedServicesIds);
});
