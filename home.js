var left = 0;
const box = document.getElementById("box1");

function move() {
  left += 10;
  box.style.left = left + "px";
}

function changeColor() {
  box.style.backgroundColor = "green";
}
