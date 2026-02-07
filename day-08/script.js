const cursor = document.querySelector(".cursor");

let x = 0;
let y = 0;
addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  x = clientX;
  y = clientY;
});

function far() {
  cursor.style.transform = `translate(${x}px , ${y}px)`;

  requestAnimationFrame(far);
}
far();
