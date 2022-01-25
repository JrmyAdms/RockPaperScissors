    
    let compSelection = computerPlay();
    let playerSelection = "";
    let weapon = 0;
    let lockIn = document.querySelector('#lockIn');
    const pScore = document.querySelector('#hScore');
    const cScore = document.querySelector('#cScore');
    const winnerDisplay = document.querySelector('#winner');
    const counts = {};
    counts.player = 0;
    counts.comp = 0;
    let playerScore = counts.player;
    let compScore = counts.comp;

    function computerPlay() {
        const options = ["0", "1", "2"];
        const choice = Math.floor(Math.random() * options.length);

        return options[choice];
    }

    //Converts selection to 0, 1, or 2
    function playerPick(weapon) {
        playerSelection = weapon.slice(0).toUpperCase();
        console.log(playerSelection);
            if (playerSelection == "ROCKOPTION" || playerSelection == 0){
                document.querySelector("#hChoice").className = "rockOption";
                document.querySelector("#lockIn").className = "rock";
                playerSelection = 0;
            } else if (playerSelection == "PAPEROPTION" || playerSelection == 1){
                document.querySelector("#hChoice").className = "paperOption";
                document.querySelector("#lockIn").className = "paper";
                playerSelection = 1;
            } else if (playerSelection == "SCISSORSOPTION" || playerSelection == 2){
                document.querySelector("#hChoice").className = "scissorsOption";
                document.querySelector("#lockIn").className = "scissors";
                playerSelection = 2;
            }
    };

    lockIn.addEventListener("click", function() {game(playerSelection, compSelection, playerScore, compScore)});
    
    //Keeps track of the score and rounds
    function game(playerSelection, compSelection, playerScore, compScore){
        compSelection = computerPlay();
        //Display Comp Choice
        const cChoice = document.querySelector("#cChoice");
        cChoice.className = "";
        if(compSelection == 0){
            cChoice.className += "rockOption";
        } else if(compSelection == 1){
            cChoice.className += "paperOption";
        } else{
            cChoice.className += "scissorsOption";
        }

        //Establish Winner
        roundWinner = playRound(playerSelection, compSelection);

        //Set Score on Screen
        pScore.innerHTML = counts.player;
        cScore.innerHTML = counts.comp;
        let winner;
        
        //End Game After BO3
        if(counts.player == 3){
            $('.weapon').addClass('disabled');
            $('#lockIn').addClass('disabled');
            endScreenOn("player");
        } else if(counts.comp == 3){
            $('.weapon').addClass('disabled');
            $('#lockIn').addClass('disabled');
            endScreenOn("comp");
        }
    }

    //Applies Game-Over Screen
    function endScreenOn(winner) {
        if(winner == "player"){
            document.getElementById("pWon").style.display = "flex";
        } else{
            document.getElementById("cWon").style.display = "flex";
        }
    }
    //Disables
    function endScreenOff() {
        document.getElementById("cWon").style.display = "none";
        document.getElementById("pWon").style.display = "none";
    }

    //Decides winner of round passing back to game()
    function playRound(playerSelection, compSelection){

        if(compSelection == playerSelection){
            winnerDisplay.innerHTML = "DRAW";
            return counts;
        } else if (
            (compSelection == 0 && playerSelection == 2) 
            || (compSelection == 1 && playerSelection == 0) 
            || (compSelection == 2 && playerSelection == 1)
        ){
            winnerDisplay.innerHTML = "Machines have won this round";
            counts.comp += 1;
            return counts;
        } else {
            winnerDisplay.innerHTML = "You won this round";
            counts.player += 1;
            return counts;
        }
    }

    //Activates Chosen Weapon
    function toggleLockIn(choice) {
        document.querySelector("#cChoice").className = "";
        $('#rockOption, #paperOption, #scissorsOption').each(function() {
            if ($(this).hasClass('active')){
                $(this).removeClass('active');
            }
        });
        choice.classList.toggle('active');
        playerPick(choice.id);
    }


    //Resets Game
    function resetGame(){
        counts.player = 0;
        counts.comp = 0;
        $('.weapon').removeClass('disabled');
        $('.weapon').removeClass('active');
        $('#lockIn').re('disabled');
    }

    // // Handled Draws
    // function draw(playerScore, compScore){
    //     playerSelection = playerPick(prompt("Twas a draw, Draw your weapon again!"));
    //     compSelection = computerPlay();

    //     playRound(playerSelection, compSelection, playerScore, compScore);
    // }
    //
    // // Handled Reset
    // function resetRound(playerScore, compScore) {
    //     playerSelection = playerPick(prompt("Choose your weapon! \n Human: " + playerScore + "\nComputer :" + compScore));
    //     compSelection = computerPlay();

    //     return playRound(playerSelection, compSelection, playerScore, compScore)
    // }

    // // Handled response to rematch request
    // function rematch(acceptRematch){
    //     if(acceptRematch == true){
    //         return resetGame();
    //     } else{
    //         return alert("Damn yellowbelly!\n\nRefresh the page if you grow a pair!");
    //     }
    // }