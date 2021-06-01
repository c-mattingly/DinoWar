/*----- constants -----*/
const deck = ["d14", "d13", "d12", "d11", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", 
"h14", "h13", "h12", "h11", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", 
"c14", "c13", "c12", "c11", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", 
"s14", "s13", "s12", "s11", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"];

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
    player: null,
    comp: null
};
const currCard = {
    player: "",
    comp: ""
}
const message = "";

const winner = "";

/*----- cached element references -----*/

// Cards left counts
const crd = {
    countComp: document.getElementById("compcount"),
    countPlayer: document.getElementById("playercount")
};
// Card display elements
const crdDisplay = {
    comp: {up: document.getElementById("imgUpComp"), 
            down: document.getElementById("imgDownComp")},
    player: {up: document.getElementById("imgUpPlayer"),
            down: document.getElementById("imgDownPlayer")}
};
// Allows to adjust for the transparency when there are cards displayed or not
const crdOpacity = {
    comp: {up: document.getElementById("compFaceUp"),
            down: document.getElementById("compFaceDown")},
    player: {up: document.getElementById("playerFaceUp"),
            down: document.getElementById("playerFaceDown")}
};
// Display for messages to player
const display = document.getElementById("displayH1");
// Draw button
const draw = document.getElementById("draw");
// New game button
const newGameBtn = document.getElementById("new");


// list of code going to use for visibility of cards within functions.          
// crdDisplay.comp.up.src = "images/clubs/clubs-r02.svg";
// crdDisplay.comp.up.style.visibility = "visible";
// crdOpacity.comp.up.style.background = "rgba(255,255,255,1)";
/*----- event listeners -----*/

// Draw button click
draw.addEventListener("click", function() {
    drawCard();
});
// New game button click
newGameBtn.addEventListener("click", function() {
    init();
    console.log("this also works");
})


/*----- functions -----*/
init();

function init() {
    console.log("this works");
// clear respective player piles
    pile.comp = [];
    pile.player = [];
    discardPile.comp = [];
    discardPile.player = [];

// reset card displays
    // (computer up)
    crdDisplay.comp.up.src = "";
    crdDisplay.comp.up.style.visibility = "hidden";
    crdOpacity.comp.up.style.background = "rgba(255,255,255,0.25)";
    // (computer down)
    crdDisplay.comp.down.src = "images/backs/dinoback.png";
    crdDisplay.comp.down.style.visibility = "visible";
    crdOpacity.comp.down.style.background = "rgba(255,255,255,1)";
    // (player down)
    crdDisplay.player.down.src = "images/backs/dinoback.png";
    crdDisplay.player.down.style.visibility = "visible";
    crdOpacity.player.down.style.background = "rgba(255,255,255,1)";
    // (player up)
    crdDisplay.player.up.src = "";
    crdDisplay.player.up.style.visibility = "hidden";
    crdOpacity.player.up.style.background = "rgba(255,255,255,0.25)";
// reset message display
    display.innerText = "Draw!";
// shuffle deck and split into two piles for each player and computer
    shuffle(deck);
// reset card counts
    cardsLeft.comp = pile.comp.length + discardPile.comp.length;
    cardsLeft.player = pile.player.length + discardPile.player.length;
    crd.countComp.innerText = cardsLeft.comp;
    crd.countPlayer.innerText = cardsLeft.player;
}



// render function 
function render() {
    // check to see if card has been turned for computer for proper display of card
    if(crdDisplay.comp.up.src !== "") {
        crdDisplay.comp.up.style.visibility = "visible";
        crdOpacity.comp.up.style.background = "rgba(255,255,255,1)";
    } else {
        crdDisplay.comp.up.style.visibility = "hidden";
        crdOpacity.comp.up.style.background = "rgba(255,255,255,0.25)";
    }
    // check to see if card has been turned for player for proper display of card
    if(crdDisplay.player.up.src !== "") {
        crdDisplay.player.up.style.visibility = "visible";
        crdOpacity.player.up.style.background = "rgba(255,255,255,1)";
    } else {
        crdDisplay.player.up.style.visibility = "hidden";
        crdOpacity.player.up.style.background = "rgba(255,255,255,0.25)";
    }
    if(pile.comp.length === 0) {
        pile.comp = discardPile.comp;
        discardPile.comp = [];
    }
    if(pile.player.length === 0) {
        pile.player = discardPile.player;
        discardPile.player = [];
    }
    
    cardsLeft.comp = pile.comp.length + discardPile.comp.length;
    cardsLeft.player = pile.player.length + discardPile.player.length;
    crd.countComp.innerText = cardsLeft.comp;
    crd.countPlayer.innerText = cardsLeft.player;

}

// shuffle the deck and split into two piles
function shuffle(deck) {
    deck = deck.sort(() => Math.random() - 0.5)
    let i = 0
    while(i !== deck.length) {
        pile.player.push(deck[i]);
        pile.comp.push(deck[i+1]);
        i+=2;

    }
    console.log(pile.player);
    console.log(pile.comp);
}
// drawCard function that takes 1 card from playerPile and 1 card from compPile
// and displays them. also compares and displays who won the hand 
function drawCard() {
    render();
    console.log(crd.countPlayer);
    console.log(crd.countComp);
    console.log(crd.countPlayer.innerText);
    console.log(crd.countComp.innerText);
    console.log(crd.countPlayer.innerHTML);
    console.log(crd.countComp.innerHTML);
    console.log(crd.countPlayer.textContent);
    console.log(crd.countComp.textContent);
    currCard.player = pile.player[0];
    currCard.comp = pile.comp[0];
    // display computers card
    crdDisplay.comp.up.src = "./images/cards/" + currCard.comp + ".svg";
    crdDisplay.comp.up.style.visibility = "visible";
    crdOpacity.comp.up.style.background = "rgba(255,255,255,1)";
    // display players card
    crdDisplay.player.up.src = "./images/cards/" + currCard.player + ".svg";
    crdDisplay.player.up.style.visibility = "visible";
    crdOpacity.player.up.style.background = "rgba(255,255,255,1)";
    console.log(currCard.player);
    console.log(currCard.comp);
    compareCard();
    
}
// compare cards and place cards in appropriate discard piles
function compareCard() {
    let compareComp = currCard.comp.substr(1);
    let comparePlayer = currCard.player.substr(1);
    if(compareComp > comparePlayer) {
        discardPile.comp.push(pile.player[0]);
        discardPile.comp.push(pile.comp[0]);
        pile.player.splice(0, 1);
        pile.comp.splice(0, 1);
        display.innerText = "Computer wins hand!";
    } else if(compareComp < comparePlayer) {
        discardPile.player.push(pile.player[0]);
        discardPile.player.push(pile.comp[0]);
        pile.player.splice(0, 1);
        pile.comp.splice(0, 1);
        display.innerText = "Player wins hand!";
    }
}
// cardsLeft function to keep an updated display of playerCardsLeft and compCardsLeft

// function to update display with who won each hand (ex: "Computer takes 10 with Ace")

    // if there is a tie then go into warPhase "I Declare War". 3 cards down 1 card up. then diplay winner of warPhase.

    // function to place discarded cards in proper discardPiles(playerDiscard compDiscard)

    // clear all the cards

// function to determine winning condition (respective cardsLeft counter reaches 0)