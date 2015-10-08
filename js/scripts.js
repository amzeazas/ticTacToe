Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
  'use strict';
  var O = Object(this);
  var len = parseInt(O.length) || 0;
  if (len === 0) {
    return false;
  }
  var n = parseInt(arguments[1]) || 0;
  var k;
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;
    if (k < 0) {k = 0;}
  }
  var currentElement;
  while (k < len) {
    currentElement = O[k];
    if (searchElement === currentElement ||
       (searchElement !== searchElement && currentElement !== currentElement)) {
      return true;
    }
    k++;
  }
  return false;
};

function Player (mark) {
  this.mark = mark;
  this.spaces = [];
}

Player.prototype.move = function(move) {
  this.spaces.push(move);
};

Player.prototype.win = function() {
  var result = [];
  var winningCombos = [[1, 2, 3], [4, 5, 6,], [7, 8, 9], [1, 4, 7], [2, 5 ,8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  var win =  false;
  var spaces = this.spaces
  winningCombos.forEach(function(combo) {
    for (var i = 0; i <3; i++) {
      result[i] = (spaces).includes(combo[i]); //gets results for each winning combination
    }
    if ((result[0] === true) && (result[1] === true) && (result[2] === true)) {
       win = true;
    }
 });
 return win;
};


$(document).ready(function() {
  var player1 = new Player("X");
  var player2 = new Player("O");
  var playerTurn = player1
  var availableSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  changeCursor();
  var turns = 0;
  var computer;
  var player1Name;
  var player2Name;
  var currentPlayer;

  $("#PVP").on("click", function() {
    $(".play-options").hide();
    $(".pick-name").fadeIn(500);
    computer = false;
  });

  $("#PVC").on("click", function() {
    $(".play-options").hide();
    $(".tic-tac-toe-table").fadeIn(500);
    $('.turn').text("Your Turn");
    computer = true;
  });

  $("#player-names").on("click", function() {
    if (($("input#player1")).val() !== "" && ($("input#player2")).val() !== "") {
      $(".pick-name").hide();
      $(".tic-tac-toe-table").fadeIn(500);
      player1Name = $("input#player1").val();
      player2Name = $("input#player2").val();
      currentPlayer = player1Name
      $('.turn').text(player1Name + "'s Turn");
    } else {
      $('#noNameModal').modal('show');
    }
  });

  function changeCursor() {
    if (turns % 2 === 0 || turns === undefined) {
      $(".tic-tac-toe-table").removeClass("o-cursor").addClass("x-cursor");
    } else {
      $(".tic-tac-toe-table").removeClass("x-cursor").addClass("o-cursor");
    }
  }

  function endGame() {
    $(".result").show();
    $('.turn').hide();
    $('#msg-container').append("<button id='restart' class='btn btn-default'>Play again?</button>");
    $('#restart').on("click", function() {
      location.reload();
    });
    $(".tic-tac-toe-table").css("cursor", "pointer");
  }

  function renderCat() {
    $(".tic-tac-toe-table").empty();
    $(".tic-tac-toe-table").append(
      "<div id='cat-container'>" +
      "<img class='img-rounded' src='public/gladiator-cat.jpg'>" +
      "</div>"
    ).hide().fadeIn(2000);
  }

  function computerPick() {
    var spaceId = availableSpaces[Math.floor(Math.random()*availableSpaces.length)];
    $("#" + spaceId).text(playerTurn.mark);
    playerTurn.move(spaceId);
    var index = availableSpaces.indexOf(spaceId);
    availableSpaces.splice(index, 1);
    turns++;
    changeCursor();
    if (playerTurn.win() === true) {
      $('span#winner').text('Wow. You lost to a computer...');
      endGame();
      $(".cell-value").off();
    } else {
      playerTurn = playerTurn === player1 ? player2 : player1;
      $('.turn').text("Your Turn");
    };
  }


  $(".cell-value").click(function() {
    if ( $(this).text() === "" ) {
      if (computer === false) {
        if (playerTurn.mark === "X") {
          currentPlayer = player1Name;
          $('.turn').text(player2Name + "'s Turn");
        } else {
          currentPlayer = player2Name;
          $('.turn').text(player1Name + "'s Turn");
        }
      } else {
        $('.turn').text("You Turn");
      };
      var spaceId = parseInt( $(this).attr('id') );
      playerTurn.move(spaceId);
      var index = availableSpaces.indexOf(spaceId);
      availableSpaces.splice(index, 1);
      turns++;
      changeCursor();
      $(this).text(playerTurn.mark);
      if (playerTurn.win() === true) {
        if (computer === false) {
          $('span#winner').text('Congrats! ' + currentPlayer + ' wins!');
        } else {
          $('span#winner').text("Congrats! You beat the computer!!");
        }
        endGame();
        $(".cell-value").off();
      } else if (turns === 9) {
        if (computer === false) {
          $('span#winner').text('Game over. Fight to the DEATH (or play again)!')
        } else {
          $('span#winner').text("Game over. It's a tie!")
        }
        renderCat();
        endGame();
      } else {
        playerTurn = playerTurn === player1 ? player2 : player1;
        if (computer) computerPick();
      };
    } else {
      $('#cheaterModal').modal('show');
    }
  });

});
