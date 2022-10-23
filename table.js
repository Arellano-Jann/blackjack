const suits = ["♠", "♡", "♢", "♣"];
const ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Knave", "Queen", "King"];

const deck = [];

for (const suit of suits) {
    for (const rank of ranks) {
        deck.push({suit, rank,});
    }
}

function getDeck(){
    return deck;
}

function getRandomCard() {
    randomIndex = Math.floor(Math.random() * deck.length);
    return deck[randomIndex];
}

console.log(deck)
const hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", () => {
    const randomCard = getRandomCard();
    console.log(`Your card is ${randomCard.rank} of ${randomCard.suit}. Did you bust?`)
    console.log(randomCard);
});