function hide(element) {
  console.log("hide");
  element.remove();
}

const boxList = document.getElementsByClassName("box");

for (var i = 0; i < boxList.length; i++) {
  boxList[i].style.left = Math.floor(Math.random() * 650);
  boxList[i].style.top = Math.floor(Math.random() * 450);
  // 1. random color
}

// 2. box уудаа хүссэн тоогоор үүсгэдэг функц
function createBox(number) {
  // TODO
}
