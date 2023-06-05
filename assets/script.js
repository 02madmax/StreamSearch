// Event listener for to select dropdown genre 
var dropdownSelection = document.querySelectorAll(".dropdown-item");
var dropdownButton = document.querySelector('#dropdown-button');

dropdownSelection.forEach(function(dropItem) {
    dropItem.addEventListener('click',function(){
        var selectedOption = dropItem.textContent;
        dropdownButton.textContent = selectedOption;
    });
});

const fetchData = async (genreId) => {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=${genreId}&show_original_language=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'efdf7f95b7msh5dfdbf4a9e49d24p1607ccjsn8e83b0591745',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

//Event listener for search button
var searchButton = document.querySelector('#search');

searchButton.addEventListener('click', function() {
    var selectedGenre = dropdownButton.textContent;
    //Key for API query
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
  
    var selectedGenreId = genreKey[selectedGenre];
    
    fetchData(selectedGenreId);
  });