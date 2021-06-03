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
};
let war = [];
let warActive = false;

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

/*----- event listeners -----*/

// Draw button click
draw.addEventListener("click", drawCard);
// New game button click
newGameBtn.addEventListener("click", init);
 
/*----- functions -----*/

init();

function init() {
    draw.addEventListener("click", drawCard);
// clear respective player piles and war pile
    pile.comp = [];
    pile.player = [];
    discardPile.comp = [];
    discardPile.player = [];
    war = [];
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
    // if card piles run out bring over discard piles
    if(pile.comp.length === 0) {
        pile.comp = discardPile.comp;
        discardPile.comp = [];
    }
    if(pile.player.length === 0) {
        pile.player = discardPile.player;
        discardPile.player = [];
    } 
    // update cards left counts  
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
}
// drawCard function that takes 1 card from playerPile and 1 card from compPile
// and displays them. also compares and displays who won the hand 
function drawCard() {
    render();
    checkWin();
    if(warActive === false) {
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
        compareCard();
    } else {
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
        compareCard();
    }
}
// compare cards and place cards in appropriate discard piles
function compareCard() {
    // handling the end of game no more cards
    if(currCard.comp === undefined) {
        checkWin();
    } else if(currCard.player === undefined) {
        checkWin();
    } else {
        let compareComp = currCard.comp.substr(1);
        let comparePlayer = currCard.player.substr(1);
        if(warActive === false) {
            if(compareComp > comparePlayer) {
                discardPile.comp.push(pile.player[0]);
                discardPile.comp.push(pile.comp[0]);
                pile.player.splice(0, 1);
                pile.comp.splice(0, 1);
                display.innerText = "Computer wins hand!";
            } else if(compareComp < comparePlayer) {
                discardPile.player.push(pile.comp[0]);
                discardPile.player.push(pile.player[0]);
                pile.player.splice(0, 1);
                pile.comp.splice(0, 1);
                display.innerText = "Player wins hand!";
            } else {
                startWar();
            }
        } else {
            if(compareComp > comparePlayer) {
                war.push(pile.player[0]);
                war.push(pile.comp[0]);
                discardPile.comp = discardPile.comp.concat(war);
                pile.player.splice(0, 1);
                pile.comp.splice(0, 1);
                war = [];
                warActive = false;
                display.innerText = "Computer wins war!";
            } else if(compareComp < comparePlayer) {
                war.push(pile.player[0]);
                war.push(pile.comp[0]);
                discardPile.player = discardPile.player.concat(war);
                pile.player.splice(0, 1);
                pile.comp.splice(0, 1);
                war = [];
                warActive = false;
                display.innerText = "Player wins war!";
            } else {
                startWar();
            }
        }
    }
}
// war function for when there is a tie
function startWar() {
    if(warActive === false) {
        if(pile.player.length < 4) {
            pile.player = pile.player.concat(discardPile.player);
            discardPile.player = [];
        }if(pile.comp.length < 4) {
            pile.comp = pile.comp.concat(discardPile.comp);
            discardPile.comp = [];
        }
        warActive = true;
        war.push(pile.player[0], pile.player[1], pile.player[2], pile.player[3]);
        war.push(pile.comp[0], pile.comp[1], pile.comp[2], pile.comp[3]);
        pile.player.splice(0, 4);
        pile.comp.splice(0, 4);
        display.innerText = "I Declare War!";
    } else {
        if(pile.player.length < 4) {
            pile.player = pile.player.concat(discardPile.player);
            discardPile.player = [];
        }if(pile.comp.length < 4) {
            pile.comp = pile.comp.concat(discardPile.comp);
            discardPile.comp = [];
        }
        war.push(pile.player[0], pile.player[1], pile.player[2], pile.player[3]);
        war.push(pile.comp[0], pile.comp[1], pile.comp[2], pile.comp[3]);
        pile.player.splice(0, 4);
        pile.comp.splice(0, 4);
        display.innerText = "I Declare War Again!";
    }
}
function checkWin() {
    if(cardsLeft.comp === 0) {
        crdDisplay.comp.up.src = "";
        crdDisplay.comp.up.style.visibility = "hidden";
        crdOpacity.comp.up.style.background = "rgba(255,255,255,0.25)";
        crdDisplay.comp.down.src = "";
        crdDisplay.comp.down.style.visibility = "hidden";
        crdOpacity.comp.down.style.background = "rgba(255,255,255,0.25)";
        crd.countComp.innerText = 0;
        crd.countPlayer.innerText = 52;
        display.innerText = "Player has won DinoWar!";
        draw.removeEventListener("click", drawCard);
    } else if (cardsLeft.player === 0) {
        crdDisplay.player.up.src = "";
        crdDisplay.player.up.style.visibility = "hidden";
        crdOpacity.player.up.style.background = "rgba(255,255,255,0.25)";
        crdDisplay.player.down.src = "";
        crdDisplay.player.down.style.visibility = "hidden";
        crdOpacity.player.down.style.background = "rgba(255,255,255,0.25)";
        crd.countComp.innerText = 52;
        crd.countPlayer.innerText = 0;
        display.innerText = "Computer has won DinoWar!";
        draw.removeEventListener("click", drawCard);
    }  
}