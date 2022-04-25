let score = 0; // Task 2:
let interval;
const timerLimit = 10;
let second = timerLimit;
let level = 1;
let totalBox = 3;

let padX = 0;
let padWidth = 150;

document.getElementById("time").innerHTML = second;

function hide(element) {
  element.remove();

  if (document.getElementsByClassName("box").length == 0) {
    gameOver();
  }
}

function gameOver() {
  // document.getElementById("gamebox").style.backgroundColor = "#6b0a2a";
  document.getElementById("startBtn").removeAttribute("disabled");
  document.getElementById("firework").style.display = "block";
  level = 1;
  score = 0;
  clearAllInterval();
}

function startGame(levelVal) {
  level = levelVal || 1;

  document.getElementById("startBtn").setAttribute("disabled", "");
  document.getElementById("gamebox").style.backgroundColor = "#FFF";
  document.getElementById("level").innerHTML = level;

  createBox(level == 1 ? totalBox : 1);

  interval = setInterval(() => {
    second--;
    document.getElementById("time").innerHTML = second;
    if (second == 0) {
      // clearAllInterval();
      if (interval) clearInterval(interval);
      second = timerLimit;
      startGame(++levelVal);
    }
  }, 1000);
}

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

// 2. box уудаа хүссэн тоогоор үүсгэдэг функц
function createBox(number) {
  const container = document.getElementById("gamebox");

  // calculate score
  score += document.getElementsByClassName("box").length;
  document.getElementById("score").innerHTML = score;

  for (var i = 0; i < number; i++) {
    const node = htmlToElement(`<div class="box red"></div>'`);
    container.appendChild(node);
  }

  const boxList = document.getElementsByClassName("box");

  for (var i = 0; i < boxList.length; i++) {
    boxList[i].style.left = Math.floor(Math.random() * 650) + "px";
    boxList[i].style.top = Math.floor(Math.random() * 450) + "px";
    boxList[i].style.backgroundColor =
      "#" + Math.floor(Math.random() * 1000000);

    const direction = Math.floor(Math.random() * 4);
    boxList[i].direction = direction;
    setInterval(moveBox, Math.floor(Math.random() * 10), boxList[i]);
  }
}

function clearAllInterval() {
  // Get a reference to the last interval + 1
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);

  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
}

function getNumberFromString(value) {
  return parseInt(value.replace(/^-\d+$/g, ""));
}

function moveBox(box) {
  let x = getNumberFromString(box.style.left);
  let y = getNumberFromString(box.style.top);
  direction = box.direction;

  // зүүн талын хананд тулав
  if (x <= 0) {
    // console.warn("Зүүн хананд тулав", "Чиглэл: ", getDirectionName(direction));
    direction = direction == 2 ? 0 : 1;
    // console.warn("Чиглэл өөрчлөв: ", getDirectionName(direction));
  }
  // дээд талын хананд тулав
  if (y <= 0) {
    // console.warn("Дээд хананд тулав", "Чиглэл: ", getDirectionName(direction));
    direction = direction == 0 ? 1 : 3;
    // console.warn("Чиглэл өөрчлөв: ", getDirectionName(direction));
  }
  // баруун талын хананд тулав
  if (x >= 700) {
    // console.warn(
    //   "Баруун хананд тулав",
    //   "Чиглэл: ",
    //   getDirectionName(direction)
    // );
    direction = direction == 1 ? 3 : 2;
    // console.warn("Чиглэл өөрчлөв: ", getDirectionName(direction));
  }
  // доод талын хананд тулав
  if (y >= 500) {
    checkCatchBall(box, x);
    // console.warn("Доод хананд тулав", "Чиглэл: ", getDirectionName(direction));
    direction = direction == 1 ? 0 : 2;
    // console.warn("Чиглэл өөрчлөв: ", getDirectionName(direction));
  }

  const speed = Math.floor(Math.random() * level + 1);
  switch (direction) {
    case 0: // Баруун дээш
      x += speed;
      y -= speed;
      break;

    case 1: // Баруун доош
      x += speed;
      y += speed;
      break;

    case 2: // Зүүн дээш
      x -= speed;
      y -= speed;
      break;

    case 3: // Зүүн доош
      x -= speed;
      y += speed;
      break;
  }

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.direction = direction;
}

function checkCatchBall(box, x) {
  const pad = document.getElementById("pad");
  padX = getNumberFromString(pad.style.left);
  if (padX > x + 50 || x + 50 > padX + 200) {
    console.log("Missed!", "ballX:", x, "padX: ", padX);
    hide(box);
  }
}

function getDirectionName(direction) {
  switch (direction) {
    case 0:
      return "Баруун дээш";
    case 1:
      return "Баруун доош";
    case 2:
      return "Зүүн дээш";
    case 3:
      return "Зүүн доош";
  }
}

document.addEventListener("mousemove", (event) => {
  const pad = document.getElementById("pad");

  diff = (window.innerWidth - 800) / 2;
  x = event.clientX - diff - 100;
  x = x < 0 ? 0 : x;
  x = x > 600 ? 600 : x;
  pad.style.left = x + "px";
  // console.log(pad.style.left, diff, window.screen.width, event.clientX);
});
