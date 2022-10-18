//create cards

class Game {
    

    
    //new cards in game
    activeCards = new Card();
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
    matches = 0;
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
        cards.forEach(card => {
            let orderSpot = Math.floor(Math.random() * 12);
            card.style.order = orderSpot;
        });
        cards.forEach(currCard => currCard.addEventListener('click', () => this.flip(currCard)));
        // console.log(this.clickCount);
    }

    checkMatch() {
        if (this.fCard.dataset.color === this.sCard.dataset.color) {
            this.matches++;
            if (this.matches === 6) {
                this.reset.win();
                
            }
            this.freezeCards();
        } else {
            this.unflip();
        }
    
    }

   freezeCards () {
        this.fCard.removeEventListener('click', () => this.flip(currCard));
        this.sCard.removeEventListener('click', () => this.flip(currCard));
        console.log("match")
   }

   unflip() {
    this.clickCount  = true;
    setTimeout(() => {
        this.fCard.classList.remove('flipped');
        this.sCard.classList.remove('flipped');
    }, 1000);
    this.clickCount = false;
    
   }
   
   shuffle() { 
        cards.forEach(card => {
        let orderSpot = Math.floor(Math.random() * 12);
        card.style.order = orderSpot;
    });
   }

    

}



class Reset {

    win() {
        document.getElementById('w').innerHTML = "WINNER, please refresh to reset game!";
    }
    
    // print
}


let game = new Game()
game.cardChecker();