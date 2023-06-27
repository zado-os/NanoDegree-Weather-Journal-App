const findButton = document.querySelector('#find');
findButton.addEventListener('click', handleFindButton);

async function handleFindButton() {
  const zipcode = document.getElementById('zipcode').value;
  const contentpoint = document.getElementById('point').value;
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=6121eb113c6bf907a0ebe4cb6c91a08d`;

  if (zipcode.length === 0 || contentpoint.length === 0) {
    alert("Please fill in all empty inputs!");
    return;
  }

  try {
    const weatherData = await fetchWeatherData(url);
    
    if (!weatherData) {
      alert("Failed to fetch weather data. Please try again later.");
      return;
    }
    
    const { main } = weatherData;
    
    if (!main) {
      alert("Weather data is incomplete. Please try again later.");
      return;
    }

    const { temp } = main;
    const date = getCurrentDate();
    const data = {
      date,
      temp,
      content: contentpoint,
    };
    
    await postData('http://localhost:8000/projectData', data);
    updateUI();
  } catch (error) {
    console.log(error);
    alert("An error occurred. Please try again later.");
  }
}

async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  return `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
}

async function updateUI() {
  const datetime = document.getElementById('datetime');
  const temperature = document.getElementById('temperature');
  const point = document.getElementById('point');

  try {
    const data = await getData('http://localhost:8000/projectData');

    datetime.innerText = data.date; // Update property name to 'date'
    temperature.innerText = data.temp; // Update property name to 'temp'
    point.innerText = data.content;
  } catch (error) {
    console.log(error);
    alert("An error occurred while updating the UI. Please try again later.");
  }
}


async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
