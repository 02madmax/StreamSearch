const fetchData = async () => {
  const url = 'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&services=netflix%2Cprime.buy%2Chulu.addon.hbo%2Cpeacock.free&output_language=en&show_type=movie&genre=18&show_original_language=en&keyword=zombie';
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

fetchData();
