const KEY = 'https://v2.jokeapi.dev/joke/Any';
const getJokeBtn = document.getElementById('gen-joke-btn');
getJokeBtn.addEventListener('click', jokeGenHandler);
const category = document.getElementById('category');
const setup = document.getElementById('setup');
const delivery = document.getElementById('delivery');

function jokeGenHandler() {
    fetch(KEY).then((res) => res.json()).then(data => {
        let joke, punchline;
        console.log(data);
        if (data.joke) {
            joke = data.joke;
            punchline = '';
        } else {
            joke = data.setup;
            punchline = data.delivery;
        }

        category.textContent = data.category;
        setup.textContent = joke;
        delivery.textContent = punchline;
    });
}

jokeGenHandler();
