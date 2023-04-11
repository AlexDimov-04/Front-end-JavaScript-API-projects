let movieNameInput = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');

//function to fetch data from api call

let getMovie = () => {
    let movieName = movieNameInput.value;
    let url = `http://omdbapi.com/?t=${movieName}&apikey=${key}`;
    //if input field is empty

    if (movieName.length === 0) {
        result.innerHTML = `
        <h3 class="msg">Please enter a movie name!</h3>`;
    } else {
        fetch(url).then((res) => res.json()).then((data) => {
            //if movie exist in database

            if (data.Response == 'True') {
                result.innerHTML = '';
                const divWrapper = createElement('div', null, result, null, ['info']);
                createElement('img', null, divWrapper, null, ['poster'], { src: data.Poster });

                const divTitle = createElement('div', null, divWrapper);
                createElement('h2', `${data.Title}`, divTitle, null, ['rating']);

                const divRating = createElement('div', null, divTitle, null, ['rating']);
                createElement('img', null, divRating, null, null, { src: './star_icon.svg' });
                createElement('h4', `${data.imdbRating}`, divRating);

                const divDetails = createElement('div', null, divTitle, null, ['details']);
                createElement('span', `${data.Rated}`, divDetails);
                createElement('span', `${data.Released}`, divDetails);
                createElement('span', `${data.Website}`, divDetails);

                const divGenre = createElement('div', null, divTitle, null, ['genre']);
                divGenre.innerHTML = `
                <div>${data.Genre.split(',').join('</div><div>')}</div>
                `;

                const divFooter = createElement('div', null, divWrapper, null, ['foot']);

                const divPlot = createElement('div', null, divFooter, null, ['plot-container']);
                createElement('h3', `Plot:`, divPlot);
                createElement('p', `${data.Plot}`, divPlot);

                const divCast = createElement('div', null, divFooter, null, ['cast-container']);
                createElement('h3', `Cast:`, divCast);
                createElement('p', `${data.Actors}`, divCast);
            } else {
                //If movie doesn't exist in database
                result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
            }
        })

            //if an error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`
            });
    }
}

searchBtn.addEventListener('click', getMovie);

function createElement(type, content, parentNode, id, classes, attrs) {
    const htmlElement = document.createElement(type);

    if (content && type !== 'input') {
        htmlElement.textContent = content;
    }

    if (content && type === 'input') {
        htmlElement.value = content;
    }

    if (id) {
        htmlElement.id = id;
    }

    if (classes) {
        htmlElement.classList.add(...classes);
    }

    if (parentNode) {
        parentNode.appendChild(htmlElement);
    }

    if (attrs) {
        for (const key in attrs) {
            htmlElement.setAttribute(key, attrs[key]);
        };
    };

    return htmlElement;
};