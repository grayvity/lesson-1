let score = 0; // Task 2:
let gameState = "not_started"; //started, gameover, not_started
let interval;
let second = 5;

function hide(element) {
  if (gameState == "gameover") {
    //Task1: show game over dialog
    return;
  }

  if (gameState == "not_started") {
    gameState = "started";
    interval = setInterval(() => {
      console.log("second:", second);
      second--;
      document.getElementById("time").innerHTML = second;
      if (second == 0) {
        gameState = "gameover";
        clearInterval(interval);
      }
    }, 1000);
  }

  element.remove();
}

// 2. box уудаа хүссэн тоогоор үүсгэдэг функц
function createBox(number) {
  const container = document.getElementById("gamebox");
  for (var i = 0; i < number; i++)
    container.innerHTML += '<div class="box red" onclick="hide(this)"></div>';
  const boxList = document.getElementsByClassName("box");

  for (var i = 0; i < boxList.length; i++) {
    boxList[i].style.left = Math.floor(Math.random() * 650) + "px";
    boxList[i].style.top = Math.floor(Math.random() * 450) + "px";
    boxList[i].style.backgroundColor =
      "#" + Math.floor(Math.random() * 1000000);
  }
}

//

// createBox(5);

const box = document.getElementById("movebox");
let x = 0,
  y = 0;
// example movement
moveInterval = setInterval(() => {
  let direction = Math.floor(Math.random() * 4); // 0- baruun desh 1- baruun doosh 2- zuun deesh 3 - zuun doosh

  // x += 10;
  // y += 10;

  box.style.left = x + "px";
  box.style.top = y + "px";
}, 100);
