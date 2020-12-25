const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return false;
            }
    
            messageOne.textContent = `Current weather for ${data.location}:`;
            messageTwo.textContent = `${data.description}. It is ${data.temperature} degrees Celsius out.`;
        });
    });
});
