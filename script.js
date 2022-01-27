    const gameStatus = {player:{weapon:0, score:0}, comp:{weapon:0, score:0}};

    //UI Items
    const pWon = $("#player");
    const cWon = $("#comp");
    const pScore = $('#hScore');
    const cScore = $('#cScore');
    const hChoice = $("#hChoice");
    const cChoice = $("#cChoice");
    const winnerDisplay = $('#winner');
    const lockIn = $("#lockIn");
    const weapon = $(".weapon");

    function computerPlay() {
        const options = ["0", "1", "2"];
        const choice = Math.floor(Math.random() * options.length);

        return options[choice];
    }

    //Converts selection to 0, 1, or 2
    function playerPick(choice) {
        gameStatus.player.weapon = choice;
        hChoice[0].className = "";
        switch(choice){
            case "0" :
                hChoice[0].classList.add("rock");
                break;
            case "1" :
                hChoice[0].classList.add("paper");
                break;
            case "2" :
                hChoice[0].classList.add("scissors");
        }
    };

    lockIn[0].addEventListener("click", game);

    for(i=0; i < weapon.length; i++){
        weapon[i].addEventListener("click", toggleLockIn);
    }
    
    //Keeps track of the score and rounds
    function game(){
        gameStatus.comp.weapon = computerPlay();
        //Display Comp Choice
        cChoice[0].className = "";
        switch(gameStatus.comp.weapon){
            case "0" :
                cChoice[0].classList.add("rock");
                break;
            case "1" :
                cChoice[0].classList.add("paper");
                break;
            case "2" :
                cChoice[0].classList.add("scissors");
        }

        //Establish Winner
        roundWinner = playRound();

        //Set Score on Screen
        pScore[0].innerHTML = gameStatus.player.score;
        cScore[0].innerHTML = gameStatus.comp.score;
        
        //End Game After BO3
        if(gameStatus.player.score === 3 || gameStatus.comp.score === 3){
            for(i=0; i<=2; i++){
                console.log(weapon[i]);
                weapon[i].classList.add('disabled');
            }
            lockIn[0].classList.add('disabled');
                if(gameStatus.player.score === 3){
                    endScreenOn(player);
                } else if(gameStatus.comp.score === 3){
                    endScreenOn(comp);
                }
        }
    }

    //Applies Game-Over Screen
    function endScreenOn(winner) {
        console.log(winner);
        if(winner.id === "player"){
            pWon[0].style.display = "flex";
        } else{
            cWon[0].style.display = "flex";
        }
    }
    //Disables
    function endScreenOff(element) {
        element.style.display = "none";
    }

    //Decides winner of round passing back to game()
    function playRound(){
        if(gameStatus.comp.weapon === gameStatus.player.weapon){
            winnerDisplay[0].innerHTML = "DRAW";
            return gameStatus;
        } else if (
               (gameStatus.comp.weapon === "0" && gameStatus.player.weapon === "2") 
            || (gameStatus.comp.weapon === "1" && gameStatus.player.weapon === "0") 
            || (gameStatus.comp.weapon === "2" && gameStatus.player.weapon === "1")
        ){
            winnerDisplay[0].innerHTML = "Machines have won this round";
            gameStatus.comp.score += 1;
            return gameStatus;
        } else {
            winnerDisplay[0].innerHTML = "You won this round";
            gameStatus.player.score += 1;
            return gameStatus;
        }
    }

    //Activates Chosen Weapon
    function toggleLockIn(choice) {
        cChoice.className = "";
        for(i=0; i < weapon.length; i++){
            if(weapon[i].classList.contains("active")){
                weapon[i].classList.remove("active");
            }
        }
        choice.target.classList.add("active");
        playerPick(choice.target.dataset.id);
        lockIn[0].classList.remove('disabled');
    }


    //Resets Game
    function resetGame(){
        gameStatus.player.score = 0;
        gameStatus.comp.score = 0;
        pScore[0].innerHTML = gameStatus.player.score;
        cScore[0].innerHTML = gameStatus.comp.score;

        weapon.removeClass('disabled');
        weapon.removeClass('active');
        lockIn[0].classList.add('disabled');
        hChoice[0].classList = "";
        cChoice[0].classList = "";;
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
    //     if(acceptRematch === true){
    //         return resetGame();
    //     } else{
    //         return alert("Damn yellowbelly!\n\nRefresh the page if you grow a pair!");
    //     }
    // }