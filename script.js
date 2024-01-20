document.addEventListener('DOMContentLoaded', () => {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Duplicate values for pairs
    const cards = cardValues.concat(cardValues); // Create pairs

    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-button');
    const timerDisplay = document.getElementById('timer');

    let flippedCards = [];
    let matchedCards = [];
    let timer;
    let secondsLeft = 60;

    startButton.addEventListener('click', startGame);

    function startGame() {
        startButton.disabled = true; // Disable the button once the game starts
        timer = setInterval(updateTimer, 1000);
        renderCards();
    }

    function updateTimer() {
        secondsLeft--;

        if (secondsLeft >= 0) {
            const minutes = Math.floor(secondsLeft / 60);
            const seconds = secondsLeft % 60;
            timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(timer);
            alert('Time\'s up! Game over.');
            resetGame();
        }
    }

    function renderCards() {
        // Shuffle the cards
        cards.sort(() => Math.random() - 0.5);

        // Create and render the cards with text content
        cards.forEach((value, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;
            card.dataset.index = index;
            card.addEventListener('click', flipCard);

            // Add text content to the card
            const cardText = document.createElement('span');
            cardText.textContent = value;
            card.appendChild(cardText);

            gameContainer.appendChild(card);
        });
    }

    function flipCard() {
        const card = this;

        if (!card.classList.contains('flipped') && flippedCards.length < 2) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);

            if (matchedCards.length === cards.length) {
                alert('Congratulations! You matched all the cards.');
                resetGame();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
    }

    function resetGame() {
        clearInterval(timer);
        secondsLeft = 60;
        timerDisplay.textContent = 'Time: 1:00';
        startButton.disabled = false;
        gameContainer.innerHTML = ''; // Clear the game container
    }
});
