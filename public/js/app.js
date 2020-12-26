const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImageOne = document.querySelector('#weather-image-1');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    weatherImageOne.src = '';

    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return false;
            }
    
            messageOne.textContent = `Current weather for ${data.location}:`;
            messageTwo.textContent = `${data.description}. It is currently ${data.temperature} degrees Celsius and it feels like ${data.feelslike} degrees Celsius. The humidity is ${data.humidity}%.`;
            weatherImageOne.src = data.icon;
        });
    });
});
