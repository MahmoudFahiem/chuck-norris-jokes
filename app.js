class UI {
    static jokesNum = document.querySelector('#number');
    static jokesContainer = document.querySelector('.jokes');
    static getJokesBtn = document.querySelector('.get-jokes');
    static jokesForm = document.querySelector('.jokes-form');
    static showAlert(message) {
        const alert = document.querySelector('.alert');
        if(alert) return;
        const alertTemp = `
            <p class="alert alert-error">${message}</p>
        `;

        UI.jokesForm.insertAdjacentHTML('beforebegin', alertTemp);
    }
    static removeAlert() {
        const alert = document.querySelector('.alert');
        if(alert) return setTimeout(function() {
            alert.remove();
        }, 3000);

    }
    static displayJokes(jokes) {
        let jokeTemp = ``;
        jokes.forEach(function(joke) {
            jokeTemp += `<p class="joke">${joke.joke}</p>`;
        });
        UI.jokesContainer.insertAdjacentHTML('beforeend', jokeTemp);
    }
}

UI.getJokesBtn.addEventListener('click', getJokes)

function getJokes() {
    const jokesNum = UI.jokesNum.value;
    if(!jokesNum) return UI.showAlert(`Please Enter Jokes Number`), UI.removeAlert();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.icndb.com/jokes/random/${jokesNum}`, true);
    xhr.onload = loadJokes;
    xhr.onerror = function () {
        console.error(this.status)
    }
    xhr.send();
}

function loadJokes() {
    if(!this.status === 200) return;
    const data = JSON.parse(this.responseText);
    const operationStat = data.type;
    if(!operationStat === 'success') return;
    const jokes = data.value;
    UI.displayJokes(jokes);
}