function hide(element) {
  console.log("hide");
  element.remove();
}

// 2. box уудаа хүссэн тоогоор үүсгэдэг функц
function createBox(number) {
  const container = document.getElementById("container");
  container.innerHTML = '<div class="box red" onclick="hide(this)"></div>';
}

createBox(5);

const boxList = document.getElementsByClassName("box");

for (var i = 0; i < boxList.length; i++) {
  boxList[i].style.left = Math.floor(Math.random() * 650) + "px";
  boxList[i].style.top = `${Math.floor(Math.random() * 450)}px`;
  // 1. random color
}
