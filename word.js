var Letter = require("./letter.js");

var Word = function(){
     this.letters = [];
     this.count = 0;
     this.wrongLetter = [];
    

     this.addNewLetter = function(letter) {
            this.letters.push(new Letter(letter));
         
          
      };

     this.returnString = function(){
        var word = "";
        for(var i = 0; i < this.letters.length; i++){
            var l = this.letters[i].character();
            word+=l;
        }
        return word;
     }

     this.callGuess = function(char){
        var wrongGuess = [];
       
        for(var i = 0; i < this.letters.length; i++){
            if(this.letters[i].guess===false){
              this.letters[i].guessFunc(char);
              wrongGuess.push(this.letters[i].guess);
            }
        }

        if(wrongGuess.indexOf(true)===-1){
            this.wrongLetter.push(char);   
        }
     }

   

     this.countCorrect = function(){
         var word = this.returnString();
         this.count=0;
         for(var i =0; i<word.length;i++){
             if(word[i]!="_"){
                this.count++;
             }
         }
         return this.count;
     }

     

}

module.exports = Word;


// Contains a constructor, Word that depends on the Letter constructor.
// This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

// An array of new Letter objects representing the letters of the underlying word

// A function that returns a string representing the word. This should call 
//the function on each letter object (the first function defined in Letter.js) that displays the 
//character or an underscore and concatenate those together.

// A function that takes a character as an argument and calls the guess function on each letter 
//object (the second function defined in Letter.js)