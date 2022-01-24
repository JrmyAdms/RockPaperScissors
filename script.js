    
    let compSelection = computerPlay();
    let weapon = 0;
    let playerScore = 0;
    let compScore = 0;

    function computerPlay() {
        const options = ["0", "1", "2"];
        const choice = Math.floor(Math.random() * options.length);

        return options[choice];
    }

    //Converts selection to 0, 1, or 2
    function playerPick(weapon) {
        $('.rockOption, .paperOption, .scissorsOption').each(function() {
            if ($(this).hasClass('active')){
                $(this).removeClass('active');
                weapon = $(this).prop('class');
                const hChoice = document.getElementById("hChoice");
                hChoice.className = "";
                hChoice.className += weapon;
            }
        });
        let playerSelection = weapon.slice(0).toUpperCase();
        console.log(playerSelection);
            if (playerSelection == "ROCKOPTION" || playerSelection == 0){
                lockIn(0);
            } else if (playerSelection == "PAPEROPTION" || playerSelection == 1){
                lockIn(1);
            } else if (playerSelection == "SCISSORSOPTION" || playerSelection == 2){
                lockIn(2);
            }
    };

    //Decides winner of round and increases score, passing on to game()
    function playRound(playerSelection, compSelection, playerScore, compScore){
        console.log(playerSelection);
        console.log(compSelection);

        if(compSelection == playerSelection){
            return game(playerScore, compScore);
        } else if (
            (compSelection == 0 && playerSelection == 1) 
            || (compSelection == 1 && playerSelection == 0) 
            || (compSelection == 2 && playerSelection == 1)
        )
        {
            compScore++;
            return game(playerScore, compScore);
        } else {
            playerScore++;
            return game(playerScore, compScore);
        }

    }

    /*
    function draw(playerScore, compScore){
        playerSelection = playerPick(prompt("Twas a draw, Draw your weapon again!"));
        compSelection = computerPlay();

        playRound(playerSelection, compSelection, playerScore, compScore);
    }
    */

    /*
    function resetRound(playerScore, compScore) {
        playerSelection = playerPick(prompt("Choose your weapon! \n Human: " + playerScore + "\nComputer :" + compScore));
        compSelection = computerPlay();

        return playRound(playerSelection, compSelection, playerScore, compScore)
    }
    */

    //Keeps track of the score
    function game(playerScore, compScore){
        const cChoice = document.getElementById("cChoice");
        cChoice.className = "";
        if(compSelection == 0){
            cChoice.className += "rockOption";
        } else if(compSelection == 1){
            cChoice.className += "paperOption";
        } else{
            cChoice.className += "scissorsOption";
        }

        document.getElementById('hScore').innerHTML = playerScore;
        document.getElementById('cScore').innerHTML = compScore;

            if(playerScore == 3){
                alert("You have won the duels!")
                acceptRematch = confirm("Would you like to play again?");
                return rematch(acceptRematch);
            } else if(compScore == 3){
                alert("You have been vanquished")
                acceptRematch = confirm("Would you like to play again?");
                return rematch(acceptRematch);
            }
    }

    //Handles response to rematch request
    /*function rematch(acceptRematch){
        if(acceptRematch == true){
            return resetGame();
        } else{
            return alert("Damn yellowbelly!\n\nRefresh the page if you grow a pair!");
        }
    }
    */

    //Activates Chosen Weapon
    function toggleLockIn(choice) {
        $('#rockOption, #paperOption, #scissorsOption').each(function() {
            if ($(this).hasClass('active')){
                $(this).removeClass('active');
            }
        });
        choice.classList.toggle('active');
    }


    function resetGame(){
        playerScore = 0;
        compScore = 0;

        playerSelection = playerPick(prompt("Choose your weapon!\n" +  "Human: " + playerScore + "\nComputer :" + compScore));
        compSelection = computerPlay();

        return playRound(playerSelection, compSelection, playerScore, compScore);
    }