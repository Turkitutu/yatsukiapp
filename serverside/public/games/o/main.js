var text = "Playing with x";
var score = 0;
var gameEND = {
  ended: false,
  winId: -1,
  effectsTimer: 0,
  effectsNumber: 5,
};

var squareAlpha = {
  color: "#ffffffa6",
  id: 1,
  show: false,
};
var player = "X";
var canPut = true;
var SP = {
  ls: [],
  lsx: [],
  lso: [],
};

//os.time()-500 > data[n].timePut

var square = {
  1: [42, 183, 42, 183, ""],
  2: [188, 329, 42, 183, ""],
  3: [338, 475, 42, 183, ""],

  4: [42, 183, 188, 329, ""],
  5: [188, 329, 188, 329, ""],
  6: [338, 475, 188, 329, ""],

  7: [42, 183, 338, 475, ""],
  8: [188, 329, 338, 475, ""],
  9: [338, 475, 338, 475, ""],
};

var idsWin = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getNumberSquare(Nx, Ny) {
  for (let i = 1; i <= Object.keys(square).length; i++) {
    if (
      Nx >= square[i][0] &&
      Nx <= square[i][1] &&
      Ny >= square[i][2] &&
      Ny <= square[i][3]
    ) {
      return i;
      break;
    }
  }
  return false;
}

window.onload = function () {
  area = document.getElementById("area");
  game = area.getContext("2d");
  setInterval(update, 1000 / 60);
  area.addEventListener("mousemove", mouseMove);
  area.addEventListener("mouseup", mouseUp);
};

function clear() {
  game.fillStyle = "#ecf4dc";
  game.fillRect(0, 0, area.width, area.height);
}

function GameDraw() {
  if (squareAlpha.show) {
    var p = square[squareAlpha.id];
    game.fillStyle = squareAlpha.color;
    game.fillRect(p[0] - 7, p[2] - 7, 142, 142);
  }
  var x = 325;
  var y = 432;
  game.fillStyle = "#60b8f7";
  game.fillRect(x, (area.height - y) / 2, 5, y);
  game.fillRect(area.width - x, (area.height - y) / 2, 5, y);
  game.fillRect((area.width - y) / 2, x, y, 5);
  game.fillRect((area.width - y) / 2, area.height - x, y, 5);

  for (let i = 1; i <= Object.keys(square).length; i++) {
    game.fillStyle = square[i][4] == "X" ? "#f44242" : "#c6f75d";
    game.font = "100px Verdana";
    if (gameEND["ended"]) {
      if (gameEND["winId"] != -1 && idsWin[gameEND["winId"]].indexOf(i) > -1) {
        if (gameEND["effectsNumber"] > 0) {
          let time = new Date().getTime();
          if (time - 500 > gameEND["effectsTimer"]) {
            game.fillText(square[i][4], square[i][0] + 30, square[i][2] + 100);
          }
          if (time - 1000 > gameEND["effectsTimer"]) {
            gameEND["effectsTimer"] = time;
            gameEND["effectsNumber"]--;
          }
        } else {
          gameEND["ended"] = false;
          gameEND["effectsTimer"] = 0;
          gameEND["effectsNumber"] = 5;
          gameEND["winId"] = -1;
          for (let i = 1; i <= Object.keys(square).length; i++) {
            square[i][4] = "";
          }
          canPut = true;
        }
      } else {
        game.fillText(square[i][4], square[i][0] + 30, square[i][2] + 100);
      }
    } else {
      game.fillText(square[i][4], square[i][0] + 30, square[i][2] + 100);
    }
  }
}

function update() {
  clear();
  GameDraw();

  game.fillStyle = "#f44242";
  game.font = "15px Verdana";
  game.fillText(text, 5, 15);
  game.fillStyle = "#60b8f7";
  game.font = "15px Verdana";
  game.fillText("score : " + score, area.width - 100, 15);
}

function mouseMove(e) {
  var id = getNumberSquare(e.clientX, e.clientY);

  if (canPut) {
    if (id) {
      if (square[id][4] == "") {
        squareAlpha.show = true;
        squareAlpha.id = id;
        area.style.cursor = "pointer";
      } else {
        squareAlpha.show = false;
        area.style.cursor = "auto";
      }
    } else {
      squareAlpha.show = false;
      area.style.cursor = "auto";
    }
  }
}

function mouseUp(e) {
  var id = getNumberSquare(e.clientX, e.clientY);

  if (canPut) {
    if (id) {
      if (square[id][4] == "") {
        square[id][4] = player;
        squareAlpha.show = false;
        area.style.cursor = "auto";
        canPut = false;
        updateSP();
        let win = cheakIfWin(SP.lsx);
        if (!win) {
          bot();
        } else {
          gameEND["ended"] = true;
          gameEND["winId"] = win;
          gameEND["effectTimer"] = new Date().getTime();
          score++;
        }
      }
    }
  }
}

function placesInMethod(method, tab) {
  let mp = [];
  for (let i in tab) {
    let place = tab[i];
    if (method.indexOf(place) > -1) {
      mp.push(place);
    }
  }
  return mp;
}

function updateSP() {
  SP.ls = [];
  SP.lsx = [];
  SP.lso = [];
  for (let i = 1; i <= Object.keys(square).length; i++) {
    if (square[i][4] == "") {
      SP.ls.push(i);
    } else if (square[i][4] == "X") {
      SP.lsx.push(i);
    } else if (square[i][4] == "O") {
      SP.lso.push(i);
    }
  }
}

function cheakIfWin(tab) {
  for (let i in idsWin) {
    let method = idsWin[i];
    let mp = [];
    mp = placesInMethod(method, tab);
    if (mp.length == 3) {
      console.log(method);
      return i;
    }
  }
  return false;
}

function bot_select_potions_from(tab) {
  let mm = [];
  for (let i in idsWin) {
    let method = idsWin[i];
    mm = placesInMethod(method, tab);
    if (mm.length == 2) {
      let index = 3 - method.indexOf(mm[0]) - method.indexOf(mm[1]);
      if (SP.ls.indexOf(method[index]) > -1) {
        return method[index];
      }
    }
  }
  return false;
}

function bot() {
  if (SP.ls.length > 0) {
    let postion1 = bot_select_potions_from(SP.lso);
    let postion2 = bot_select_potions_from(SP.lsx);
    if (postion1) {
      square[postion1][4] = "O";
    } else if (postion2) {
      square[postion2][4] = "O";
    } else {
      square[choose(SP.ls)][4] = "O";
    }
    updateSP();
    let win = cheakIfWin(SP.lso);
    if (!win) {
      canPut = true;
    } else {
      gameEND["ended"] = true;
      gameEND["winId"] = win;
      gameEND["effectTimer"] = new Date().getTime();
      score--;
    }
  } else {
    gameEND["ended"] = false;
    gameEND["effectsTimer"] = 0;
    gameEND["effectsNumber"] = 5;
    gameEND["winId"] = -1;
    for (let i = 1; i <= Object.keys(square).length; i++) {
      square[i][4] = "";
    }
    canPut = true;
  }
}
