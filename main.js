

class Game {
    

    
    //new cards in game
    activeCards = new Card();
    //give cards all elements with the class card
    cards = document.querySelectorAll('.card');


    

    //check what is currently happening with cards
    cardChecker() {
        this.activeCards.play(this.cards);
    }
    

}


class Card {
    //init first card flipped and second card flipped
    fCard;
    sCard;
    //flipped card set to false to start
    flipped = false;
    //click count to true if clicking during unflip
    clickCount = false;
    //give total matches 0, 12 total cards so once it reaches 6 matches, the game is over
    matches = 0;
    //cards will reset when called
    reset = new Reset();
  

    constructor(fCard, sCard, flipped, clickCount) {
        this.fCard = fCard;
        this.sCard = sCard;
        this.flipped = flipped;
        this.clickCount = clickCount;


    }
    
    flip(card) {
        //if card is already picked as first card don't flip
        if ( card === this.fCard) return;
        //if unflipping dont let a card flip
        if (this.clickedCount) return;
        //add class to show circle
        //add a set timeout just to sync up the animation
        //give the card a class of flipped to give it animation and show the circle
        setTimeout(() => {
            card.classList.toggle('flipped');
        }, 400);
        


        if (!this.flipped) {
            //set to first clicked 
            this.flipped = true;

            this.fCard = card;
            
            // console.log(card, this.flipped, this.fCard.dataset.color);
            
            return;
            
        }
        
        //set second card and check if its a match
        this.flipped = false;
        this.sCard = card;
        this.checkMatch();
     }

    play(cards) {
        //set a random order for the cards. This is essentially shuffling cards
        cards.forEach(card => {
            //style.order give the card a value, when items are flexed they are set according to that number (lowest to greatest)
            let orderSpot = Math.floor(Math.random() * 12);
            card.style.order = orderSpot;
        });
        //set an event listener to each card and run flip if clicked
        cards.forEach(currCard => currCard.addEventListener('click', () => this.flip(currCard)));
        // console.log(this.clickCount);
    }

    //check if cards are a match
    checkMatch() {
        //by setting a data attribute the color or circle in this case can be checked. 
        //so if both have the same data attribute "color" then we know it is a match
        if (this.fCard.dataset.color === this.sCard.dataset.color) {
            //increment matches to check for win
            this.matches++;
            if (this.matches === 6) {
                //if 6, then reset
                this.reset.win();
                
            }
            //freeze card movement to prevent from flipping back and clicking
            this.freezeCards();
        } else {
            //if not a match, automatically flip back to blank side
            this.unflip();
        }
    
    }

    //freeze cards
   freezeCards () {
        //if called then each card will have their event listener removed
        //for first and second card
        this.fCard.removeEventListener('click', () => this.flip(currCard));
        this.sCard.removeEventListener('click', () => this.flip(currCard));
        console.log("match")
   }

   //unflip cards or flip back
   unflip() {
    // clckcount true to prevent more than two clicks
    this.clickCount  = true;
    //set timeout to make it look nicer and more natural timing
    // removed flipped class
    setTimeout(() => {
        this.fCard.classList.remove('flipped');
        this.sCard.classList.remove('flipped');
    }, 1000);
    //can click more 
    this.clickCount = false;
    
   } 

}



class Reset {
//win method that sets the element of 'w' to say winner and to refresh to restart game
    win() {
        document.getElementById('w').innerHTML = "WINNER, please refresh to reset game!";
    }
    
    // print
}


let game = new Game()
game.cardChecker();