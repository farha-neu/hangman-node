// https://farha-neu.github.io/Responsive-Portfolio/portfolio.html

var Word= require("./word.js");
var inquirer = require("inquirer");
var chalkPipe = require("chalk-pipe");


//names of fruits
var wordArray = ["Star Fruit","Kiwi Fruit","Pineapple","Custard Apple","Apple","Coconut","Jackfruit","Grape","Honeydew Melon"];

//randomly select word from array
wordArray = wordArray.sort(function() { return 0.5 - Math.random() });

var attempts = 7;
var constAttempt = attempts;
var index = 0;
var correctGuesses = [];
var winCount = 0;
var lossCount = 0;
var res = [];

function init(index){
    var word = wordArray[index].replace(/\s/g, ""); //remove all white spaces
    var wordObject = new Word(); //create new Word object

    //add each letters
    for(var j = 0; j < word.length; j++){
        wordObject.addNewLetter(word[j]);
    }
    //finds index position of spaces in a word
    res = findSpaceIndex();
    //processing words with spaces
    var displayWord = spaceSeparatedWords(wordObject);
    console.log(chalkPipe('greenBright')("~~~~~~ Can you guess the fruit? ~~~~~~~\n"));
    console.log(displayWord+"\n");
    startGame(wordObject,word);
}

init(index);

function startGame(wordObject,word){
    var questions = [
        {
          type: 'input',
          name: 'answer',
          message: "Guess a letter",
          validate: function(input){
            input = input.trim();
            if(!input || input.length>1){
                return "Please enter a letter";
            }
            else if(correctGuesses.indexOf(input.toLowerCase())===-1 
                   && wordObject.wrongLetter.indexOf(input.toLowerCase())===-1){
                return true;
            }
            return "Letter already guessed. Please choose another letter.";
         }
        }
      ];    
      inquirer.prompt(questions).then(answers => {
        wordObject.callGuess(answers["answer"].trim());
       
        var displayWord = spaceSeparatedWords(wordObject);
        console.log("\n"+displayWord+"\n");
        
        var wrongArray = wordObject.wrongLetter;
        var winFlag = 0;
        var lossFlag = 0;
        

        if(wordObject.countCorrect() === word.length){
            console.log(chalkPipe('greenBright')('YOU GOT IT RIGHT!!\n'));
            winFlag = 1;
            winCount++;
            console.log("Score: Wins "+winCount+" / Losses "+lossCount+"\n");
            whatNext();
        }
        //letter is not found in wrongArray. so it's a correct guess
        else if(wrongArray.indexOf(answers["answer"])===-1){
            correctGuesses.push(answers["answer"].toLowerCase());
            console.log(chalkPipe('greenBright')("Correct!!!\n"));
            console.log("-------------------------------");
            if(wrongArray.length>0){  
                console.log("Wrong Guesses: "+wrongArray);
            } 
    
            console.log("Attempts remaining: "+attempts+"/"+constAttempt);
            console.log("-------------------------------\n");
        }

        else if(wrongArray.indexOf(answers["answer"])>-1){
            attempts--;  
            if(attempts > 0){
                console.log(chalkPipe('redBright')("WRONG!!!\n"));
                console.log("-------------------------------");
                console.log("Wrong Guesses: "+wrongArray);
                console.log("Attempts remaining: "+attempts+"/"+constAttempt);
                console.log("-------------------------------\n");
            }
            else if(attempts <= 0){
                lossCount++;
                lossFlag = 1;
                console.log(chalkPipe('redBright')("SORRY :( YOU LOST!\n"));
                console.log("Correct answer is "+wordArray[index]+"\n");
                console.log("Score: Wins "+winCount+" / Losses "+lossCount+"\n");
                whatNext();
            }     
           
        }
        
        if(attempts > 0 && winFlag===0 && lossFlag===0){
            startGame(wordObject,word);
        }
       
       
          
      });
}

function whatNext(){
        //reinitialize
        attempts = 7;
        index++;
        res = [];
        correctGuesses = [];
        if(index<wordArray.length){
             inquirer
                 .prompt([
                     {
                     type: "confirm",
                     message: "Do you want to continue playing?",
                     name: "confirm",
                     default: true
                     }
                 ])
                 .then(function(inquirerResponse) {
                     if (inquirerResponse.confirm) {
                        init(index);
                     }
                      else {
                        return;
                      }
                 });  
        }
        else{
            console.log("Game Over!!!\n");
        }
}

function findSpaceIndex(){
    var ind = 0;
    while ((ind = wordArray[index].indexOf(' ', ind + 1)) > 0) {
        res.push(ind);
    }
    return res;
}

function spaceSeparatedWords(wordObject){ 
    var wordDisplayArr =wordObject.returnString().split('');
    for(var i = 0; i< res.length; i++){
        wordDisplayArr.splice(res[i], 0, '');
    }
    var modifiedWord = wordDisplayArr.join(' ');
    modifiedWord = modifiedWord.split('  ').join('    ');
    return modifiedWord;
}