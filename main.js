document.addEventListener("DOMContentLoaded", function() {
    // create elements
    const title = document.createElement('h1');
    const container = document.createElement('div');
    const gallowsContainer = document.createElement('div');
    const gameContainer = document.createElement('div');
    const hint = document.createElement('p');
    const guesses = document.createElement('p');
    const keyboard = document.createElement('div');
    const btn = document.createElement('button');

    // add classes
    container.classList.add('container');
    gallowsContainer.classList.add('gallows-container');
    gameContainer.classList.add('game-container');
    hint.classList.add('hint');
    guesses.classList.add('guesses');
    keyboard.classList.add('keyboard');
    btn.classList.add('btn');

    title.textContent = "Hangman Game";

    // body parts array with image file names
    const bodyParts = [
        { name: 'head', src: 'assets/one.png', position: { top: '28%', left: '72.5%' } },
        { name: 'body', src: 'assets/two.png', position: { top: '46%', left: '72.5%' }, width: '5px' },
        { name: 'left-arm', src: 'assets/three.png', position: { top: '42%', left: '65%' } },
        { name: 'right-arm', src: 'assets/four.png', position: { top: '42%', left: '80%' } },
        { name: 'left-leg', src: 'assets/three.png', position: { top: '65%', left: '65%' } },
        { name: 'right-leg', src: 'assets/four.png', position: { top: '65%', left: '80%' } }
    ];

    // loop through the bodyParts array and add the images to the gallows container
    bodyParts.forEach(part => {
        const img = document.createElement('img');
        img.src = part.src;
        img.alt = part.name;
        img.style.top = part.position.top;
        img.style.left = part.position.left;
        if (part.width) {
            img.style.width = part.width;
        }
        gallowsContainer.appendChild(img);
    });

    // create and display the hint text
    hint.textContent = "Hint: ";

    // randomly select a word and display the hint
    const getRandomWord = () => {
        const { word, hint: wordHint } = words[Math.floor(Math.random() * words.length)];
        currentWord = word;
        hint.innerText = "Hint: " + wordHint;
    };
    
    getRandomWord();

    // update the guesses display
    guesses.textContent = "Incorrect guesses: 0 / 6";

    // create the keyboard buttons
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i).toUpperCase();
        keyboard.appendChild(button);
        button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
    }

    // test button
    btn.textContent = "Click";
    let currentPart = 0;
    btn.addEventListener('click', function() {
        if (currentPart < bodyParts.length) {
            const nextPart = document.querySelectorAll('.gallows-container img')[currentPart];
            nextPart.classList.remove('hidden');
            nextPart.classList.add('show');
            currentPart++;
        } else {
            btn.textContent = "Game Over";
        }
    });

    // append elements to the body
    document.body.appendChild(title);
    document.body.appendChild(container);
    container.appendChild(gallowsContainer);
    container.appendChild(gameContainer);
    gameContainer.appendChild(hint);
    gameContainer.appendChild(guesses);
    gameContainer.appendChild(keyboard);
    gameContainer.appendChild(btn);
});
