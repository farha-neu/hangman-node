var Word= require("./word.js");
var inquirer = require("inquirer");

var wordArray = ["jurassic park zoo","pineapple"];

wordArray = wordArray.sort(function() { return 0.5 - Math.random() });

var attempts = 5;
var index = 0;
var res = [];
var correctGuesses = [];
var winCount = 0;
var lossCount = 0;

function init(index){
    var word = wordArray[index].replace(/\s/g, "");;
  
    var ind = 0;
    while ((ind = wordArray[index].indexOf(' ', ind + 1)) > 0) {
        res.push(ind);
    }
   
    var wordObject = new Word();
    for(var j = 0; j < word.length; j++){
        wordObject.addNewLetter(word[j]);
    }
    
    var wordDisplayArr =wordObject.returnString().split('');
    for(var i = 0; i< res.length; i++){
        wordDisplayArr.splice(res[i], 0, '');
    }
    var newW = wordDisplayArr.join(' ');
    newW = newW.split('  ').join('    ');
    console.log(newW);
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
            if(!input){
                return "Please enter a letter";
            }
            else if(correctGuesses.indexOf(input)===-1 && wordObject.wrongLetter.indexOf(input)===-1){
                return true;
            }
            return "Letter already guessed. Please choose another letter";
         }
        }
      ];    
      inquirer.prompt(questions).then(answers => {
        //already correct? 
        wordObject.callGuess(answers["answer"]);
       
        var wordDisplayArr =wordObject.returnString().split('');
        for(var i = 0; i< res.length; i++){
            wordDisplayArr.splice(res[i], 0, '');
        }
        var newW = wordDisplayArr.join(' ');
        newW = newW.split('  ').join('    ');
        console.log(newW);
        
        var wrongArray = wordObject.wrongLetter;
        var win = 0;
        //all correct
        if(wordObject.countCorrect() === word.length){
            console.log('You got it right!!');
            win = 1;
            winCount++;
            console.log("Wins:"+winCount+", Losses:"+lossCount);
            whatNext();
            // return;
        }
        else if(wrongArray.indexOf(answers["answer"])===-1){
            correctGuesses.push(answers["answer"]);
            console.log("Correct!");
        }
        else if(wrongArray.indexOf(answers["answer"])>-1){
            attempts--;  
            console.log("Wrong Guess:"+wrongArray);
            console.log(attempts+" attempts remaining");
        }
        
        if(attempts>0 && win!=1){
            startGame(wordObject,word);
        }
       
        else if(attempts <= 0){
            console.log("Sorry :( you lost");
            console.log("Correct answer is "+word);
            lossCount++;
            console.log("Wins:"+winCount+", Losses:"+lossCount);
            whatNext();
        }       
      });
}

function whatNext(){
    attempts = 5;
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
    console.log("Game Over!");
}
}
