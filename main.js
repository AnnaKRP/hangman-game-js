document.addEventListener("DOMContentLoaded", function () {
    // create elements
    const title = document.createElement('h1');
    const container = document.createElement('div');
    const gallowsContainer = document.createElement('div');
    const gameContainer = document.createElement('div');
    const wordDisplayed = document.createElement('ul');
    const hint = document.createElement('p');
    const guesses = document.createElement('p');
    const keyboard = document.createElement('div');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const result = document.createElement('h4');
    const resultGif = document.createElement('img')
    const resultWord = document.createElement('p');
    const resetBtn = document.createElement('button');

    let currentWord;
    let incorrectGuesses = 0;

    // add classes
    container.classList.add('container');
    gallowsContainer.classList.add('gallows-container');
    gameContainer.classList.add('game-container');
    wordDisplayed.classList.add('word');
    hint.classList.add('hint');
    guesses.classList.add('guesses');
    keyboard.classList.add('keyboard');
    modal.classList.add('modal-container');
    modalContent.classList.add('modal-content');
    result.classList.add('results');
    resetBtn.classList.add('reset-btn');

    // add content
    title.textContent = "Hangman";
    gallowsContainer.style.backgroundImage = "url('assets/gallow.png')";
    guesses.innerHTML = "<b>Incorrect guesses:</b> 0 / 6";
    resetBtn.innerText = "Play Again";

    // create the keyboard buttons
    const buttons = [];
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i).toUpperCase();
        keyboard.appendChild(button);
        buttons.push(button);
        button.addEventListener("click", () => handleGuess(button, String.fromCharCode(i)));
    }

    // randomly select a word and display the hint
    const getRandomWord = () => {
        const { word, hint: wordHint } = words[Math.floor(Math.random() * words.length)];
        currentWord = word;
        hint.innerHTML = "<b>Hint: </b>" + wordHint;

        // initialize the word display with underscores
        wordDisplayed.innerHTML = currentWord
            .split("")
            .map(() => `<li class="letter">_</li>`)
            .join("");

        //reset the game
        reset();
    };

    getRandomWord();

    // event listener for the physical keyboard
    document.addEventListener("keydown", (e) => {
        const letter = e.key.toLowerCase();
        if (letter >= 'a' && letter <= 'z') {
            const button = buttons.find(btn => btn.innerText.toLowerCase() === letter);
            if (button && !button.disabled) {
                handleGuess(button, letter);
            }
        }
    });

    function handleGuess(button, letter) {
        let correctGuess = false;

        // check if the letter is in the word
        if (currentWord.includes(letter)) {
            // loop through the word and reveal the correct letter(s)
            [...currentWord].forEach((wordLetter, index) => {
                if (wordLetter === letter) {
                    wordDisplayed.querySelectorAll("li")[index].innerText = wordLetter;
                    correctGuess = true;
                }
            });
        } else {
            incorrectGuesses++;
            guesses.innerHTML = `<b>Incorrect guesses:</b> ${incorrectGuesses} / 6`;
            gallowsContainer.style.backgroundImage = `url('assets/gallow${incorrectGuesses}.png')`;
        }

        button.disabled = true;

        // check if the game is over or if the player has won
        if (incorrectGuesses >= 6) {
            gameOver(false);
        }

        if ([...wordDisplayed.querySelectorAll("li")].every(li => li.innerText !== "_")) {
            gameOver(true);
        }
    }

    function gameOver(won) {
        modal.style.display = 'block';
        result.innerText = won ? 'Congratulations' : 'Game Over';
        resultGif.src = won ? 'assets/won.gif' : 'assets/lost.gif';
        currentWord = currentWord[0].toUpperCase() + currentWord.slice(1, currentWord.length);
        resultWord.innerHTML = won ? `You guessed: <b>${currentWord}</b>` : `Correct answer: <b>${currentWord}</b>`;
        buttons.forEach(button => button.disabled = true);
    }

    function reset() {
        incorrectGuesses = 0;
        guesses.innerHTML = "<b>Incorrect guesses:</b> 0 / 6"; 
        gallowsContainer.style.backgroundImage = "url('assets/gallow.png')"; 

        // update the word display to underscores
        wordDisplayed.innerHTML = currentWord
            .split("")
            .map(() => `<li class="letter">_</li>`)
            .join("");

        // enable keyboard buttons
        buttons.forEach(button => button.disabled = false);

        modal.style.display = 'none';
    }

    resetBtn.addEventListener("click", function () {
        getRandomWord();
    });

    // append elements to the body
    document.body.appendChild(title);
    document.body.appendChild(container);
    container.appendChild(gallowsContainer);
    container.appendChild(gameContainer);
    gameContainer.appendChild(wordDisplayed);
    gameContainer.appendChild(hint);
    gameContainer.appendChild(guesses);
    gameContainer.appendChild(keyboard);
    document.body.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(result);
    modalContent.appendChild(resultGif);
    modalContent.appendChild(resultWord);
    modalContent.appendChild(resetBtn);
});
