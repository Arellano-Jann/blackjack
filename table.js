const MDCTextField = mdc.textField.MDCTextField;
const textFields = [].map.call(
    document.querySelectorAll(".mdc-text-field"),
    function (el) {
        return new MDCTextField(el);
    }
);

const MDCCheckbox = mdc.checkbox.MDCCheckbox;
const checkboxes = [].map.call(
    document.querySelectorAll(".mdc-checkbox"),
    function (el) {
        return new MDCCheckbox(el);
    }
);


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

function dealRandomCard() {
    dealToDisplay(getRandomCard());
  }

function dealToDisplay(card){
    const newCard = document.createElement("li"); // creates a new list item
    newCard.setAttribute("data-blackjack-value", rankToValue(card.rank)); // sets the data-blackjack-value attribute to second argument
    newCard.innerText = `${rankToWord(card.rank)} of ${suitToWord(card.suit)}`; // sets the text of the newCard
    const playerCards = document.querySelector("#playersCards ol"); // selects the appropriate section
    playerCards.appendChild(newCard); // adds playerCards
}

function rankToWord(rank){
    const mapRanksToWords = { 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", };
    return (typeof(rank) === "number") ? mapRanksToWords[rank] : rank;
}

function suitToWord(suit) {
    const mapSuitsToWords = {"♠": "Spades", "♡": "Hearts", "♢": "Diamonds", "♣": "Clubs", "": "Mystery",};
    return mapSuitsToWords[suit];
}

function rankToValue(rank){
    const mapRanksToValues = { "Ace": "11/1", "Knave": "10", "Queen": "10", "King": "10", "Face Down" : "?",}
    return (rank in mapRanksToValues) ? mapRanksToValues[rank] : rank.toString() ;
}

// console.log(deck)
const hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", dealRandomCard

// () => { console.log(dealRandomCard());
    // const randomCard = getRandomCard();
    // console.log(`Your card is ${randomCard.rank} of ${randomCard.suit}. Did you bust?`)
    // console.log(randomCard);
// }
);


var bankroll = parseInt(localStorage.getItem("bankroll")) || 2022;
const players_actions_section = document.querySelector("#playersActions");
const betting_section = document.querySelector("#betting");
const betting_form = document.forms[0];
const bet_button = betting_form[1];
bet_button.addEventListener("click", makeWager);


function addBankroll() {
    // document.getElementById("bankroll").innerHTML = `$${bankroll}`;
}

function getBankroll(){ return bankroll }
function setBankroll(newBalance){ 
    bankroll = newBalance
    localStorage.setItem("bankroll", bankroll); 
}


function timeToBet() { 
    players_actions_section.classList.add("hidden");
    betting_section.classList.remove("hidden");
    document.getElementById("bankroll").innerHTML = `$${getBankroll()}`;
}

function makeWager(event){
    event.preventDefault();
    console.log(betting_form[0].value);
    timeToPlay()
}

function timeToPlay() {
    players_actions_section.classList.remove("hidden");
    betting_section.classList.add("hidden");
}