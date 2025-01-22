document.addEventListener("DOMContentLoaded", function() {
    // create elements
    const title = document.createElement('h1');
    const container = document.createElement('div');
    const gallowsContainer = document.createElement('div');
    const gameContainer = document.createElement('div');
    const wordDisplayed = document.createElement('ul');
    const hint = document.createElement('p');
    const guesses = document.createElement('p');
    const keyboard = document.createElement('div');

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

    // add content
    title.textContent = "Hangman";
    gallowsContainer.style.backgroundImage = "url('assets/gallow.png')";
    guesses.innerHTML = "<b>Incorrect guesses:</b> 0 / 6";

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
    };

    getRandomWord();

    // create the keyboard buttons
    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i).toUpperCase();
        keyboard.appendChild(button);
        button.addEventListener("click", (e) => handleGuess(e.target, String.fromCharCode(i)));
    }

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

        // check if the game is over or if the play has won
        if (incorrectGuesses >= 6) {
            alert("Game Over!");
        }

        if ([...wordDisplayed.querySelectorAll("li")].every(li => li.innerText !== "_")) {
            alert("You Win!");
        }
    }

    // append elements to the body
    document.body.appendChild(title);
    document.body.appendChild(container);
    container.appendChild(gallowsContainer);
    container.appendChild(gameContainer);
    gameContainer.appendChild(wordDisplayed);
    gameContainer.appendChild(hint);
    gameContainer.appendChild(guesses);
    gameContainer.appendChild(keyboard);
});
