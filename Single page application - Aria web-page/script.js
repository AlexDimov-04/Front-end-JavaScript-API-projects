const allBtns = Array.from(document.getElementsByClassName('button'));
const boxContainer = document.getElementById('box-container');
const cities = {
    'всички': ['./images/aria and me.jpg', './images/ARIA_-_SITE_-_AUGUST_2022.jpg',
        './images/black-white.jpg', './images/bushido.jpg',
        './images/car.jpg', './images/drums.jpg', './images/eleven.jpg', './images/kitchen.jpg',
        './images/klasa.jpg', './images/koncert-na-aria.jpg', './images/portrait_aria_and_me.jpg',
        './images/singing.jpg', './images/sofia.jpg', './images/trio bik and aria.jpg',
        './images/varna.jpg', './images/plovdiv.jpg'],

    'софия': ['./images/sofia.jpg', './images/singing.jpg', './images/drums.jpg', './images/eleven.jpg'],
    'пловдив': ['./images/plovdiv.jpg', './images/black-white.jpg', './images/bushido.jpg', './images/klasa.jpg'],
    'варна': ['./images/varna.jpg', './images/car.jpg', './images/300.jpg', './images/eleven.jpg'],
    'стара загора': ['./images/portrait_aria_and_me.jpg', './images/trio bik and aria.jpg', './images/aria and me.jpg', './images/stara zagora.jpg']
}

cities.всички.forEach(path => {
    const img = document.createElement('img');
    img.src = path;

    boxContainer.appendChild(img);
});

for (const btn of allBtns) {
    btn.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            let currentActiveBtn = allBtns.filter((button) => button.classList.contains('active'));

            e.target.classList.add('active');
            currentActiveBtn[0].classList.remove('active');

            boxContainer.innerHTML = '';
            cities[btn.textContent].forEach(path => {
                const img = document.createElement('img');
                img.src = path;

                boxContainer.appendChild(img);
            });
        }
    })
}




