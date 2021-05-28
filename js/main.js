/*----- constants -----*/
const deck = ["dA", "dK", "dQ", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hK", "hQ", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cK", "cQ", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sK", "sQ", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"];

/*----- app's state (variables) -----*/

const pile = {
    player = [],
    comp = []
};

const cardsLeft = {
    player = [],
    comp = []
};

const discardPile = {
    player = [],
    comp = []
};

/*----- cached element references -----*/


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