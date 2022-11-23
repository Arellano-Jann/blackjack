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

let deckId;
let wager;

const suits = ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"];
const ranks = ["ACE", 2, 3, 4, 5, 6, 7, 8, 9, 10, "JACK", "QUEEN", "KING"];

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

// function dealRandomCard() {
//     dealToDisplay(getRandomCard());
//   }

function hitPlayer() {
    drawOneCard(dealCard).then(() => {
        if (getPlayerTotal() > 21) bustPlayer();
    });
}

function bustPlayer(){
    console.log("player busted");
    takeStakes(false);
}

function hitDealer() {
    drawOneCard((card) => dealCard(card, false));
  }


const playerCards = document.querySelector("#playersCards ol"); // selects the appropriate section
const dealersCards = document.querySelector("#dealersCards ol") // dealersCardsList in the videos
function dealToDisplay(card){
    const newCard = document.createElement("li"); // creates a new list item
    newCard.setAttribute("data-blackjack-value", rankToValue(card.rank)); // sets the data-blackjack-value attribute to second argument
    newCard.innerText = `${rankToWord(card.rank)} of ${suitToWord(card.suit)}`; // sets the text of the newCard
    playerCards.appendChild(newCard); // adds playerCards
}

function rankToWord(rank){
    const mapRanksToWords = { 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", 
    JACK: "Jack", QUEEN: "Queen", KING: "King", ACE: "Ace"};
    return mapRanksToWords[rank];
}

function suitToWord(suit) {
    const mapSuitsToWords = {SPADES: "Spades", HEARTS: "Hearts", DIAMONDS: "Diamonds", CLUBS: "Clubs", "": "Mystery",};
    return mapSuitsToWords[suit];
}

function rankToValue(rank){
    const mapRanksToValues = { ACE: "11/1", JACK: "10", QUEEN: "10", KING: "10", "Face Down" : "?",}
    return (rank in mapRanksToValues) ? mapRanksToValues[rank] : rank.toString() ;
}

const hitButton = document.querySelector("#hit-button");
hitButton.addEventListener("click", hitPlayer);
const standButton = document.querySelector("#stand-button");
standButton.addEventListener("click", dealersTurn);


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

function makeWager(event){
    event.preventDefault();
    console.log(betting_form[0].value); // betting_form[0] is the wagerInput
    wager = parseInt(betting_form[0].value)
    timeToPlay();
}

function timeToBet() { 
    clearCards();
    players_actions_section.classList.add("hidden");
    betting_section.classList.remove("hidden");
    document.getElementById("player-bankroll").innerHTML = `$${getBankroll()}`;
}


function timeToPlay() {
    clearCards();
    players_actions_section.classList.remove("hidden");
    betting_section.classList.add("hidden");
    drawFourCards(dealFourCards);
}


function getShoe(callback){
    fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle?deck_count=6`)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        });
}

getShoe((data) => (deckId = data.deck_id));

function drawFourCards(callback){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw?count=4`)
    .then((res) => res.json())
    .then((data) => {
        callback(data.cards);
    });
}

function drawOneCard(callback) {
    return fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw?count=1`)
    .then((res) => res.json())
    .then((data) => {
        callback(data.cards[0]); // we don't want a list of lists so we access the first element
    });
}

function dealFourCards(fourCards) {
    const [first, second, third, fourth] = fourCards;
    dealCard(first);
    dealCard(second, false, false);
    dealCard(third);
    dealCard(fourth, false);
}


const backOfCardImageSrc = "https://previews.123rf.com/images/rlmf/rlmf1512/rlmf151200171/49319432-playing-cards-back.jpg";
let dealersDownCard;
function dealCard(card, isToPlayer = true, isFaceUp = true) {
    if (!isFaceUp) dealersDownCard = card; // saves the down card so we can use it later
    const newCard = document.createElement("li");
    const image = document.createElement("img");
    image.setAttribute("src", isFaceUp ? card.image : backOfCardImageSrc);
    image.style.height = "210px";
    image.style.width = "150px";
    image.setAttribute(
        "alt", 
        isFaceUp ? 
            `${rankToWord(card.value)} of ${suitToWord(card.suit)}` : 
            "Face Down");
    newCard.setAttribute(
        "data-blackjack-value", 
        rankToValue(isFaceUp ? card.value : "Face Down"));
    newCard.appendChild(image);
    (isToPlayer ? playerCards : dealersCards).appendChild(newCard);
}

function flipDownCard(){
    const downCard = dealersCards.children[0].children[0];
    downCard.setAttribute("srs", dealersDownCard.image);
    downCard.setAttribute("alt", `${rankToWord(dealersDownCard.value)} of ${suitToWord(dealersDownCard.suit)}`);
    downCard.setAttribute("data-blackjack-value", rankToValue(dealersDownCard.value));
}

function removeChildren(domNode){
    while(domNode.firstChild){
        domNode.removeChild(domNode.firstChild);
    }
}

function clearCards(){
    removeChildren(dealersCards);
    removeChildren(playerCards);
}

function getPlayerTotal(getDealerTotal = false) {
    const playersCards = getDealerTotal ? dealersCards.children : playerCards.children;
    let total = 0;
    let aceCount = 0;
    for (const card of playersCards) {
      console.log(card);
  
      if (card.dataset.blackjackValue == "?") {
        total += parseInt(rankToValue(dealersDownCard.value));
      } else if (card.dataset.blackjackValue == "11/1") {
        total += 11;
        aceCount++;
      } else {
        total += parseInt(card.dataset["blackjackValue"]);
      }
    }
    if (total > 21) {
      while (aceCount > 0) {
        total -= 10;
        aceCount--;
      }
    }
    return total;
  }

function getDealerTotal(){
    return getPlayerTotal(true);
}

function dealersTurn(){
    flipDownCard();
    while (getDealerTotal() < 17){ // wrong?
        hitDealer();
    }
    if (getDealerTotal() > 21){
        console.log("dealer busted");
        takeStakes(true);
    }
    else{
        evaluateWinner();
    }
}

function evaluateWinner(){
    if (getPlayerTotal() > getDealerTotal()){
        console.log("player won");
        takeStakes(true);
    } else if (getPlayerTotal() == getDealerTotal()){
        console.log("push");
        takeStakes(false, wasPush = true);
    }else{
        console.log("dealer won");
        takeStakes(false);
    }
}

function takeStakes(playerWon = false, wasPush = false, natural = false){
    if (!wasPush){
        setBankroll(getBankroll() + (playerWon ? (natural ? wager * 1.5 : wager) : -wager));
    }
    setTimeout(timeToBet, 3000);
}