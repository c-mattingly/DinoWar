/*----- constants -----*/
const deck = ["dA", "dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"];

/*----- app's state (variables) -----*/

// respective decks for player and computer
const pile = {
    player: [],
    comp: []
};
const discardPile = {
    player: [],
    comp: []
};
// total number of cards in pile(deck) and discard pile for player 
const cardsLeft = {
    player: pile.player + discardPile.player,
    comp: pile.comp + discardPile.comp
};
const currCard = "";

const message = "";

/*----- cached element references -----*/

// Cards Left elements
const crd = {
    countComp: document.getElementById("compcount").innerText,
    countPlayer: document.getElementById("playercount").innerText
};
// Card display elements
const crdDisplay = {
    comp: {up: document.getElementById("imgUpComp"), 
            down: document.getElementById("imgDownComp")},
    player: {up: document.getElementById("imgUpPlayer"),
            down: document.getElementById("imgDownPlayer")}
};
// Div element to allow to adjust for the transparency the playing cards have
const crdOpacity = {
    comp: {up: document.getElementById("compFaceUp"),
            down: document.getElementById("compFaceDown")},
    player: {up: document.getElementById("playerFaceUp"),
            down: document.getElementById("playerFaceDown")}
}

// list of code going to use for visibility of cards within functions.          
crdDisplay.comp.up.src = "images/clubs/clubs-r02.svg";
crdDisplay.comp.up.style.visibility = "visible";
console.log(crdOpacity);
crdOpacity.comp.up.style.background = "rgba(255,255,255,1)";
console.log(crdDisplay.comp.up);
console.log(crdDisplay.comp.down);
/*----- event listeners -----*/

// Going to need Event Listener for Draw Button

// and New Game Button

/*----- functions -----*/

// Place Init function to get page ready for start of game. 

// Place the Render function 

    // Have a shuffle function(Randomization)

    // Then split up the deck into player and computer piles of 26 cards each. 

// draw function that takes 1 card from playerPile and 1 card from compPile. 

// cardsLeft function to keep an updated display of playerCardsLeft and compCardsLeft

// function to update display with who won each hand (ex: "Computer takes 10 with Ace")

    // if there is a tie then go into warPhase "I Declare War". 3 cards down 1 card up. then diplay winner of warPhase.

    // function to place discarded cards in proper discardPiles(playerDiscard compDiscard)

    // clear all the cards

// function to determine winning condition (respective cardsLeft counter reaches 0)