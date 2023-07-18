const pieces = [
  // O
  [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  ],
  // I
  [
    [
      { x: 0, y: -2 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: -2 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  ],
  // S
  [
    [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
    ],
  ],
  // Z
  [
    [
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: -1, y: 1 },
    ],
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    [
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: -1, y: 1 },
    ],
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  ],
  // L
  [
    [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 1 },
    ],
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
    ],
  ],
  // J
  [
    [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
    ],
    [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
  ],

  // T
  [
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
    ],
    [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ],
    [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ],
  ],
];

const colors = ["#ff303a", "#63c3ff", "#ffda56", "#90f95c"]; // pieces colors
const gp = { x1: 20, y1: 20, x2: 300, y2: 520 }; // position
const ps = 20; // piece size
const next_pos = {
  0: { x: 0, y: 0 },
  1: { x: 10, y: 20 },
  2: { x: 20, y: 10 },
  3: { x: 20, y: 10 },
  4: { x: 0, y: 10 },
  5: { x: 20, y: 10 },
  6: { x: 10, y: 20 },
};

var pc = { id: -1 }; // player piece
var pc_next = { id: -1 }; // next piece
var isMoving = false;
var isMovingRight = false;
var isKeyup = { 39: true, 37: true, 32: true, 40: true };
var pieceData = [];
var speed = 1;
var score = 0;
var bt = {};
var play = false;
var pause = false;
var gameover = false;

window.onload = function () {
  init();
};

function init() {
  ctx = document.getElementById("ctx");
  game = ctx.getContext("2d");
  setInterval(loop, 1000 / 60);
  window.addEventListener("keydown", onkeydown, false);
  window.addEventListener("keyup", onkeyup, false);
  window.addEventListener("mousemove", onMouseMove);
  ctx.addEventListener("mousedown", onMouseDown);
  ctx.addEventListener("mouseup", onMouseUp);
  pc_next = getRandomPiece();
  createTetrisButtons();
}

function clear() {
  game.fillStyle = "#272727";
  game.fillRect(0, 0, ctx.width, ctx.height);
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getRandomPiece() {
  let color = colors[Math.floor(Math.random() * colors.length)];
  let id = Math.floor(Math.random() * 7);
  return { x: 160, y: -20, id: id, n: 0, color: color };
}

function selectRandomPiece() {
  pc = copy(pc_next);
  pc_next = getRandomPiece();
}

function drawGame() {
  game.beginPath();
  game.lineWidth = "1";
  game.strokeStyle = "#565656";
  game.rect(gp.x1, gp.y1, gp.x2, gp.y2);
  game.rect(gp.x2 + 40, 40, 90, 90);
  game.stroke();
  drawAllPieces();
  game.fillStyle = "#888888";
  game.font = "11pt arial";
  game.fillText("Next :", gp.x2 + 40, 30);
  game.fillText("Score : " + score, gp.x2 + 40, 150);
  game.font = "20pt arial";
  game.fillText("Tetris !", gp.x2 + 45, 220);
  game.font = "11pt arial";
  if (detectmob()) {
    game.fillText("Can't play on", gp.x2 + 41, 430);
    game.fillText("mobile", gp.x2 + 60, 450);
  }

  if (pause) {
    game.font = "30pt arial";
    if (gameover) {
      game.fillText("GAME OVER !", gp.x1 + 18, 285);
    } else {
      game.fillText("Paused !", gp.x1 + 70, 285);
    }
  }
  game.font = "7pt arial";
  game.fillText("developed by Yatsuki#4775", gp.x2 + 29, 538);
  drawButtons();
  drawPlayerPiece({
    x: gp.x2 + 65 + next_pos[pc_next.id].x,
    y: 65 + next_pos[pc_next.id].y,
    id: pc_next.id,
    n: 0,
    color: pc_next.color,
  });
}

function drawPlayerPiece(pp) {
  let piece = pieces[pp.id][pp.n];
  for (let i in piece) {
    let p = piece[i];
    game.fillStyle = pp.color;
    game.fillRect(pp.x + p.x * ps, pp.y + p.y * ps, ps - 1, ps - 1);
  }
}

function drawAllPieces() {
  for (let i in pieceData) {
    let p = pieceData[i];
    game.fillStyle = p.color;
    game.fillRect(p.x, p.y, ps - 1, ps - 1);
  }
}

function drawButtons(button) {
  for (var key in bt) {
    let button = bt[key];
    if (!button.hide) {
      game.fillStyle = button.underMouse ? button.colorMouseMove : button.color;
      game.fillRect(
        button.x,
        button.mouseClick ? button.y + 2 : button.y,
        button.width,
        button.height
      );
      game.beginPath();
      game.lineWidth = "1";
      game.strokeStyle = button.border;
      game.rect(
        button.x,
        button.mouseClick ? button.y + 2 : button.y,
        button.width,
        button.height
      );
      game.stroke();
      game.fillStyle = "#a5a5a5";
      game.font = "12pt arial";
      game.fillText(
        button.text,
        button.x + button.tx,
        (button.mouseClick ? button.y + 2 : button.y) + 20
      );
    }
  }
}

function rectInPostion(rect, x, y) {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
}

function movePc() {
  if (play) {
    drawPlayerPiece(pc);
    if (!pause) {
      let move = true;
      let piece = pieces[pc.id][pc.n];
      for (let i in piece) {
        let p = piece[i];
        for (k in pieceData) {
          let d = pieceData[k];
          if (d.y < gp.y1) {
            gameover = true;
            pause = true;
            bt.play.hide = false;
            bt.home.hide = true;
            bt.pause.hide = true;
            bt.continue.hide = true;
            break;
          }
          if (pc.y + p.y * ps == d.y - ps && pc.x + p.x * ps == d.x) {
            move = false;
            break;
          }
        }
        if (pc.y + p.y * ps >= gp.y2) {
          move = false;
        }
      }
      if (move) {
        pc.y += speed;
      } else {
        SFPiece();
        if (!(speed == 1)) {
          speed = 1;
        }
      }
    }
  }
}

function SFPiece() {
  let piece = pieces[pc.id][pc.n];
  for (let i in piece) {
    pieceData.push({
      x: pc.x + piece[i].x * ps,
      y: pc.y + piece[i].y * ps,
      color: pc.color,
    });
  }
  let xes = [];
  for (let i = gp.y2; i > gp.y1; i -= ps) {
    xes = [];
    for (k in pieceData) {
      let d = pieceData[k];
      if (d.y == i) {
        xes.push(k);
      }
    }
    if (xes.length == (gp.x2 - gp.x1) / ps + 1) {
      for (let i = xes.length - 1; i >= 0; i -= 1) {
        pieceData.splice(xes[i], 1);
      }
      for (k in pieceData) {
        let d = pieceData[k];
        if (d.y <= i - ps) {
          d.y += ps;
        }
      }
      score += 10;
    }
  }
  selectRandomPiece();
}

function loop() {
  clear();
  movePc();
  drawGame();
}

function mfps(n) {
  return Math.floor(n / ps) * ps;
}

function onkeydown(e) {
  if (
    ((e.keyCode == 37 && isKeyup[37]) || (e.keyCode == 39 && isKeyup[39])) &&
    play &&
    !pause
  ) {
    let mR = true;
    let mL = true;

    let piece = pieces[pc.id][pc.n];
    for (let i in piece) {
      let p = piece[i];
      for (k in pieceData) {
        let d = pieceData[k];
        if (mfps(pc.y + p.y * ps) == d.y - ps) {
          if (mfps(pc.x + p.x * ps) == d.x - ps) {
            mR = false;
          }
          if (mfps(pc.x + p.x * ps) == d.x + ps) {
            mL = false;
          }
        }
      }
      mR = mR ? pc.x + p.x * ps <= gp.x2 - ps : mR;
      mL = mL ? pc.x + p.x * ps >= gp.x1 + ps : mL;
    }
    if (e.keyCode == 39 && mR) {
      // ==>>
      pc.x += ps;
    } else if (e.keyCode == 37 && mL) {
      // ==<<
      pc.x -= ps;
    }
    isKeyup[e.keyCode] = false;
  }
  if (e.keyCode == 32 && isKeyup[32] && play && !pause) {
    let n = (pc.n + 1) % 4;
    let c = true;
    let piece = pieces[pc.id][n];
    for (let i in piece) {
      let p = piece[i];
      if (
        pc.x + p.x * ps > gp.x2 ||
        pc.x + p.x * ps < gp.x1 ||
        pc.y + p.y * ps >= gp.y2
      ) {
        c = false;
        break;
      }
      for (k in pieceData) {
        let d = pieceData[k];
        if (mfps(pc.y + p.y * ps) == d.y - ps && mfps(pc.x + p.x * ps) == d.x) {
          c = false;
          break;
        }
      }
    }
    if (c) {
      pc.n = n;
    }
    isKeyup[e.keyCode] = false;
  }
  if (e.keyCode == 40 && isKeyup[e.keyCode] && play && !pause) {
    pc.y = mfps(pc.y);
    speed = 20;
  }
}

function onkeyup(e) {
  if (
    e.keyCode == 39 ||
    e.keyCode == 37 ||
    e.keyCode == 32 ||
    e.keyCode == 40
  ) {
    isKeyup[e.keyCode] = true;
  }
}

function onMouseMove(e) {
  let c = false;
  let rect = ctx.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  for (var key in bt) {
    if (bt.hasOwnProperty(key)) {
      var b = bt[key];
      if (!b.hide) {
        if (rectInPostion(b, x, y)) {
          b.underMouse = true;
          c = true;
        } else {
          b.underMouse = false;
        }
      }
    }
  }
  if (c) {
    ctx.style.cursor = "pointer";
  } else {
    ctx.style.cursor = "auto";
  }
}

function onMouseDown(e) {
  let rect = ctx.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  for (var key in bt) {
    if (bt.hasOwnProperty(key)) {
      var b = bt[key];
      if (!b.hide) {
        if (rectInPostion(b, x, y)) {
          b.mouseClick = true;
        }
      }
    }
  }
}

function onMouseUp(e) {
  for (var key in bt) {
    if (bt.hasOwnProperty(key)) {
      var b = bt[key];
      if (!b.hide) {
        if (b.mouseClick) {
          b.mouseClick = false;
          b.OnClick();
        }
      }
    }
  }
}

function createTetrisButtons() {
  bt.play = {
    x: gp.x2 + 40,
    y: 250,
    width: 90,
    height: 30,
    color: "#212121",
    border: "#111111",
    colorMouseMove: "#353535",
    underMouse: false,
    mouseClick: false,
    text: "Play",
    tx: 29,
    OnClick: function () {
      selectRandomPiece();
      play = true;
      pieceData = [];
      gameover = false;
      pause = false;
      score = 0;
      bt.play.hide = true;
      bt.home.hide = false;
      bt.pause.hide = false;
    },
    hide: false,
  };

  bt.home = {
    x: gp.x2 + 40,
    y: 250,
    width: 90,
    height: 30,
    color: "#212121",
    border: "#111111",
    colorMouseMove: "#353535",
    underMouse: false,
    mouseClick: false,
    text: "Home",
    tx: 24,
    OnClick: function () {
      pieceData = [];
      play = false;
      pause = false;
      pc = {};
      score = 0;
      bt.play.hide = false;
      bt.home.hide = true;
      bt.pause.hide = true;
      bt.continue.hide = true;
    },
    hide: true,
  };

  bt.pause = {
    x: gp.x2 + 40,
    y: 300,
    width: 90,
    height: 30,
    color: "#212121",
    border: "#111111",
    colorMouseMove: "#353535",
    underMouse: false,
    mouseClick: false,
    text: "Pause",
    tx: 24,
    OnClick: function () {
      pause = true;
      bt.pause.hide = true;
      bt.continue.hide = false;
    },
    hide: true,
  };

  bt.continue = {
    x: gp.x2 + 40,
    y: 300,
    width: 90,
    height: 30,
    color: "#212121",
    border: "#111111",
    colorMouseMove: "#353535",
    underMouse: false,
    mouseClick: false,
    text: "Continue",
    tx: 13,
    OnClick: function () {
      pause = false;
      bt.pause.hide = false;
      bt.continue.hide = true;
    },
    hide: true,
  };
}

function detectmob() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}
