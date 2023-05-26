// Movie of the night streaming services api data
const urlServices = 'https://streaming-availability.p.rapidapi.com/v2/services';
const optionsServices = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'efdf7f95b7msh5dfdbf4a9e49d24p1607ccjsn8e83b0591745',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

try {
	const response = await fetch(urlServices, optionsServices);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

//Movie of the night genres api
const urlGenres = 'https://streaming-availability.p.rapidapi.com/v2/genres';
const optionsGenres = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'efdf7f95b7msh5dfdbf4a9e49d24p1607ccjsn8e83b0591745',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

try {
	const response = await fetch(urlGenres, optionsGenres);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// IMDB api data

const IMDBurl = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=back%20to%20the%20future';
const IMDBoptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c124cecf0emshdb2c0b87705b346p17c3d6jsn1f514186fbf9',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(IMDBurl, IMDBoptions);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}