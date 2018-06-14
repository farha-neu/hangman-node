var Letter = function(letter){
    this.letter = letter;
    this.guess = false;
 
    this.character = function(){
        if(this.guess){
            return this.letter;
        }
        else{
            return "_";
        }
    }

    this.guessFunc = function(guessedLetter){
        if(this.letter.toLowerCase() === guessedLetter.toLowerCase()){
            this.guess = true;
        }
        else{
            this.guess = false;
        }
    }
}

Letter.prototype.toString = function() {
    var letterInfo = 'Letter:' + this.letter+"\nGuess:"+this.guess;
    return letterInfo;
}
  
module.exports = Letter;

