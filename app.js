class UI {
    static jokesNum = document.querySelector('#number');
    static jokesContainer = document.querySelector('.jokes');
    static getJokesBtn = document.querySelector('.get-jokes');
    static showAlert(message) {
        const alertTemp = `
            <p class="alert alert-error">${message}</p>
        `;

        UI.jokesContainer.insertAdjacentHTML('beforeend', alertTemp);
    }
}

UI.getJokesBtn.addEventListener('click', getJokes)

function getJokes() {
    const jokesNum = UI.jokesNum.value;
    if(!jokesNum) return UI.showAlert(`Please Enter Jokes Number`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.icndb.com/jokes/random/${jokesNum}`, true);
    xhr.onload = function() {
        if(!this.status === 200) return;
        const data = JSON.parse(this.responseText);
        const operationStat = data.type;
        if(!operationStat === 'success') return;
        const jokes = JSON.parse(data).value;
        console.log(jokes);
    }
    xhr.onerror = function () {
        console.error(this.status)
    }
    xhr.send();
}