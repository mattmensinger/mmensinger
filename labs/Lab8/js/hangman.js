//Variables
var guessedWords = [];
var selectedWord = "";
var selectedHint = "";
var board = [];  //array
var remainingGuesses = 6;
var words = [{ word: "snake", hint: "It's a reptile"},
             { word: "monkey", hint: "It's a mammal"},
             { word: "beetle", hint: "It's an insect"},
             { word: "dog", hint: "It's a common pet"},
             { word: "turtle", hint: "It has a hard shell"}];
             
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//Listeners
window.onload = startGame();
  

//Functions          
      
$(".letter").click( function() {
                
    checkLetter($(this).attr("id"));
    disableButton($(this));
})

$("#hint").click( function() {
    
    displayHint();
})

$(".replayBtn").on("click", function() {
    
    location.reload();
});

function startGame() {
                
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}
            
function initBoard() {
                
    for(var letter in selectedWord) {
                    
        board.push("_");
    }
    
    updateWordsGuessed();
}
  
function pickWord() {
                
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}
            

//Creates the letters inside the letters div
function createLetters() {
                
    for(var letter of alphabet) {
                    
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter +"</button>");
    }
}

//Checks to see if the selected letter exists in the selectWord
function checkLetter(letter) {
                
    var positions = new Array();
                
    //Put all the positions the letter exists in an array
    for(var i = 0; i < selectedWord.length; i++) {
        
        if(letter == selectedWord[i]) {
                        
            positions.push(i);
        }
    }
                
    if(positions.length > 0) {
                    
        updateWord(positions, letter);
        
        //Check to see if this is a winning guess
        if(!board.includes('_')) {
            
            endGame(true);
        }
    }
                
    else {
                    
        remainingGuesses -= 1;
        updateMan();
    }
    
    if(remainingGuesses <= 0) {
        
        endGame(false);
    }
}
            
function updateWord(positions, letter) {
                
    for(var pos of positions) {
                    
        board[pos] = letter;
    }
                
    updateBoard();
}

//Calculates and updates the image for our stick man
function updateMan() {
    
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function updateBoard() {
                
    $("#word").empty();
      
    for(var i = 0; i < board.length; i++) {
        
        $("#word").append(board[i] + " ");
    }
    
    
}

function updateWordsGuessed() {
    
    for(var i = 0; i < guessedWords.length; i++) {
        
        if(guessedWords.length == 1) {
            
            $("#guessedWords").append(guessedWords[i])
        }
        
        else {
            
             $("#guessedWords").append(guessedWords[i] + ", ")
        }
       
    }
    
}
//Ends the game by hiding game divs and displaying the win or loss divs
function endGame(win) {
    
    $("#letters").hide();
    
    if(win) {
        
        $('#won').show();
        guessedWords.push(selectedWord);
        updateWordsGuessed();
    }
    
    else {
        
        $('#lost').show();
    }
}

function displayHint() {
    
    $("#word").append("<br />");
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
    remainingGuesses--;
    updateMan();
}

//Disables the button and changes the style to tell the user it's disabled
function disableButton(btn) {
    
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger")
}