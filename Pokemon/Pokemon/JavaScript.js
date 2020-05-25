

//method that updates the scoreboard.
function addToScoreBoard() {

    var pokeWin = JSON.parse(localStorage.getItem(gameData.winner.name));
    var pokeLose = JSON.parse(localStorage.getItem(gameData.loser.name));

    pokeWin.Wins += 1;
    pokeLose.Loses += 1;

    localStorage.setItem(gameData.winner.name, JSON.stringify(pokeWin));
    localStorage.setItem(gameData.loser.name, JSON.stringify(pokeLose));

}

//we invoke this method after the game finishes.
function ResetGame() {

   
    location.reload();
}

//method that announces who won and adds the gameover gif as a background Image.
function GameOver() {

    $('#battle').css('background-image', 'url(' + gameData.gameover + ')');
    alert("GameOver!, " + gameData.winner.name + " Has Won!");

}
//we call this method after a brief moment so it will change the pokemon image back to normal (Player2).
function FirstpicChange() {

    firstHero.src = gameData.hero1.backImg;
}
//we call this method after a brief moment so it will change the pokemon image back to normal (Player1).
function SecondpicChange() {

    secondHero.src = gameData.hero2.frontImg;
}


//we use this as a flag to determine who's turn is it.
PlayerTurn = 1;

//we use this to change the first player's image after attacking.
firstHero = "";

//we use this to change the second player's image after attacking.
secondHero = "";

//we store the calculated damage.
Damage = 0;

//we store the current attack info to calculate the damage.
currentAttack = {
    minRange: 0,
    maxRange: 0,
    accuracy: 0
}

//we keep the current info about the match.
gameData = {
    hero1: {},
    hero2: {},
    winner: {},
    loser: {},
    gameover: "Gifs/GameOver.gif",
    pokeBall: "Gifs/pokeBall.gif",
    clickCount: 0
}
//we keep info about all of out pokemons.
characters = [{
    name: "pikatchu",
    frontImg: "Gifs/PickatchuFront.gif",
    backImg: "Gifs/PickatchuBack.gif",
    attackGif: "attackGifs/Pikatchu.gif",
    pokemonID: 1,

    attacks: [{
        moveName: "Thunderbolt",
        minRange: 20,
        maxRange: 25,
        accuracy: 0.9

    },
    {
        moveName: "Discharge",
        minRange: 15,
        maxRange: 20,
        accuracy: 1
    },
    {
        moveName: "Spark",
        minRange: 20,
        maxRange: 23,
        accuracy: 0.8
    },
    {
        moveName: "Electro Ball",
        minRange: 30,
        maxRange: 40,
        accuracy: 0.7
    }]
},
{
    name: "ivysaur",
    frontImg: "Gifs/ivysaurFront.gif",
    backImg: "Gifs/ivysaurBack.gif",
    attackGif: "attackGifs/Ivysaur.gif",
    pokemonID: 2,
    attacks: [{
        moveName: "Razor Leaf",
        minRange: 25,
        maxRange: 27,
        accuracy: 1
    },
    {
        moveName: "Vine Whip",
        minRange: 18,
        maxRange: 30,
        accuracy: 0.9
    },
    {
        moveName: "Solar Beam",
        minRange: 30,
        maxRange: 32,
        accuracy: 0.8
    },
    {
        moveName: "Leech Seed",
        minRange: 25,
        maxRange: 33,
        accuracy: 0.7
    }]
},
{
    name: "charmander",
    frontImg: "Gifs/charmanderFront.gif",
    backImg: "Gifs/charmanderBack.gif",
    attackGif: "attackGifs/charmander.gif",
    pokemonID: 3,
    attacks: [{
        moveName: "Inferno",
        minRange: 25,
        maxRange: 29,
        accuracy: 0.9
    },
    {
        moveName: "Fire Spin",
        minRange: 20,
        maxRange: 21,
        accuracy: 1

    },
    {
        moveName: "Flamethrower",
        minRange: 25,
        maxRange: 30,
        accuracy: 0.7
    },
    {
        moveName: "Dragon Breath",
        minRange: 20,
        maxRange: 35,
        accuracy: 0.7
    }
    ]

}];




$(document).ready(function () {
    $("#ScoreBoard").click(function () {

        if (localStorage.length != 0) {
            pikatchu = JSON.parse(localStorage.getItem("pikatchu"));
            charmander = JSON.parse(localStorage.getItem("charmander"));
            ivysaur = JSON.parse(localStorage.getItem("ivysaur"));

            alert(pikatchu.name + ": Wins:" + pikatchu.Wins + ", Loses: " + pikatchu.Loses + "\n" +
                charmander.name + ": Wins:" + charmander.Wins + ", Loses: " + charmander.Loses + "\n" +
                ivysaur.name + ": Wins:" + ivysaur.Wins + ", Loses: " + ivysaur.Loses);
        }
        else {
            alert("There isnt any Games to show!");
        }

    });

    $("#about").click(function () {

        alert("We created an old school style POKEMON game!,\nmainly you have 3 main pokemons to choose from.\nSo choose wisely and enjoy!");
    });

    $("#Reset").click(function () {

        var answer = confirm("Are you sure you want to Reset the ScoreBoard ?");
        if (answer) {
            localStorage.clear();

            if (localStorage.length == 0) {

                alert("ScoreBoard has been Reset!!");
            }
            else {
                alert("There has been a problem reseting the Scoreboard\nPlease contact Ron!")
            }
        }

    });

    $("#menu").fadeIn('slow');

    $("button#StartGame").click(function () {
        $('#menu').slideUp('slow');
        $('#chooseHero').fadeIn('slow');
        $('#chooseHero').css('display', 'flex');

        if (localStorage.length == 0) {

            pikatchu = { name: "pikatchu", Wins: 0, Loses: 0 };
            charmander = { name: "charmander", Wins: 0, Loses: 0 };
            ivysaur = { name: "ivysaur", Wins: 0, Loses: 0 };

            localStorage.setItem("pikatchu", JSON.stringify(pikatchu));
            localStorage.setItem("charmander", JSON.stringify(charmander));
            localStorage.setItem("ivysaur", JSON.stringify(ivysaur));
        }
    });

    $('img.hero').click(function (event) {

        gameData.clickCount = gameData.clickCount + 1;
        alert("You Choose " + event.target.id);
        var pokeName = event.target.id;

        switch (gameData.clickCount) {

            case 1:
                for (var i in characters) {
                    if (characters[i].name == pokeName) {
                        gameData.hero1 = characters[i];
                    }
                }
                $(event.target).hide();
                pokeName = null;


            case 2:
                for (var i in characters) {

                    if (characters[i].name == pokeName) {
                        gameData.hero2 = characters[i];
                    }
                }
                $(event.target).hide();
                pokeName = null;
        }

        //after the second player chooses we can continue playing.
        if (gameData.clickCount == 2) {

            //we use JQUERY to give an animated feel to the game.
            $('#chooseHero').slideUp('slow');
            $('#battle').fadeIn('slow')
            $('#moves').fadeIn('slow')
            $('#battle').css('display', 'flex')

            //loads the names of the selected pokemon
            $("#player1").html(gameData.hero1.name);
            $("#player2").html(gameData.hero2.name);

            hero1img = document.createElement("IMG");
            hero1img.src = gameData.hero1.backImg;
            hero1img.id = "player1Pic";
            $('#low').append(hero1img);

            hero2img = document.createElement("IMG");
            hero2img.src = gameData.hero2.frontImg;
            hero2img.id = "player2Pic";
            $('#mid').append(hero2img);

            $("#Move1").html(gameData.hero1.attacks[0].moveName);
            $("#Move2").html(gameData.hero1.attacks[1].moveName);
            $("#Move3").html(gameData.hero1.attacks[2].moveName);
            $("#Move4").html(gameData.hero1.attacks[3].moveName);
        }
    });


    //after clicking on a certain move.
    //the method checks which player's turn is it and it makes changes on the selected player.
    $(".move").click(function (event) {

        $(".move").attr("disabled", "disabled");
        setTimeout(function () {
            $(".move").removeAttr("disabled");
        }, 1500);

        if (PlayerTurn == 1) {

            PlayerTurn = 2;
            firstHero = document.getElementById("player1Pic");
            firstHero.src = gameData.hero1.attackGif;
            setTimeout(FirstpicChange, 1500);

            //change the text of the 4 buttons to the attack names of player 2.
            $("#Move1").html(gameData.hero2.attacks[0].moveName);
            $("#Move2").html(gameData.hero2.attacks[1].moveName);
            $("#Move3").html(gameData.hero2.attacks[2].moveName);
            $("#Move4").html(gameData.hero2.attacks[3].moveName);

            //checks which move was made because each move have diffrenet accuracy and damage range.
            switch (event.target.id) {

                case 'Move1':
                    currentAttack.maxRange = gameData.hero1.attacks[0].maxRange;
                    currentAttack.minRange = gameData.hero1.attacks[0].minRange;
                    currentAttack.accuracy = gameData.hero1.attacks[0].accuracy;

                case 'Move2':
                    currentAttack.maxRange = gameData.hero1.attacks[1].maxRange;
                    currentAttack.minRange = gameData.hero1.attacks[1].minRange;
                    currentAttack.accuracy = gameData.hero1.attacks[1].accuracy;

                case 'Move3':
                    currentAttack.maxRange = gameData.hero1.attacks[2].maxRange;
                    currentAttack.minRange = gameData.hero1.attacks[2].minRange
                    currentAttack.accuracy = gameData.hero1.attacks[2].accuracy;

                case 'Move4':
                    currentAttack.maxRange = gameData.hero1.attacks[3].maxRange;
                    currentAttack.minRange = gameData.hero1.attacks[3].minRange;
                    currentAttack.accuracy = gameData.hero1.attacks[3].accuracy;
            }
            //calculate the damage using random.
            Damage = (Math.floor((Math.random() * currentAttack.maxRange) + currentAttack.minRange) * currentAttack.accuracy);

            //change health bar of player 1
            let health2 = document.getElementById("SecondHealth")
            health2.value -= Damage;
            Damage = 0;

            //checks to see of the player died.
            if (health2.value <= 0) {
                secondHero = document.getElementById("player2Pic");
                secondHero.src = gameData.pokeBall;

                gameData.winner = gameData.hero1;
                gameData.loser = gameData.hero2;

                addToScoreBoard();
                GameOver();
                setTimeout(ResetGame, 2700);


            }
        }
        else {

            PlayerTurn = 1;

            secondHero = document.getElementById("player2Pic");
            secondHero.src = gameData.hero2.attackGif;
            setTimeout(SecondpicChange, 1500);

            //change the text of the 4 buttons to the attack names of player 2.
            $("#Move1").html(gameData.hero1.attacks[0].moveName);
            $("#Move2").html(gameData.hero1.attacks[1].moveName);
            $("#Move3").html(gameData.hero1.attacks[2].moveName);
            $("#Move4").html(gameData.hero1.attacks[3].moveName);

            //checks which move was made because each move have diffrenet accuracy and damage range.
            switch (event.target.id) {

                case 'Move1':
                    currentAttack.maxRange = gameData.hero2.attacks[0].maxRange;
                    currentAttack.minRange = gameData.hero2.attacks[0].minRange;
                    currentAttack.accuracy = gameData.hero2.attacks[0].accuracy;


                case 'Move2':
                    currentAttack.maxRange = gameData.hero2.attacks[1].maxRange;
                    currentAttack.minRange = gameData.hero2.attacks[1].minRange;
                    currentAttack.accuracy = gameData.hero2.attacks[1].accuracy;


                case 'Move3':
                    currentAttack.maxRange = gameData.hero2.attacks[2].maxRange;
                    currentAttack.minRange = gameData.hero2.attacks[2].minRange;
                    currentAttack.accuracy = gameData.hero2.attacks[2].accuracy;


                case 'Move4':
                    currentAttack.maxRange = gameData.hero2.attacks[3].maxRange;
                    currentAttack.minRange = gameData.hero2.attacks[3].minRange;
                    currentAttack.accuracy = gameData.hero2.attacks[3].accuracy;
            }

            //calculate the damage using random.
            Damage = (Math.floor(Math.random() * currentAttack.maxRange) + currentAttack.minRange) * currentAttack.accuracy;
            //change health bar of player 2
            let health1 = document.getElementById("FirstHealth")
            health1.value -= Damage;
            Damage = 0;

            //checks to see of the player died.
            if (health1.value <= 0) {
                firstHero = document.getElementById("player1Pic");
                firstHero.src = gameData.pokeBall;

                gameData.winner = gameData.hero2;
                gameData.loser = gameData.hero1;
                addToScoreBoard();
                GameOver();
                setTimeout(ResetGame, 2700);

            }

        }
    });
});