const canvas = document.getElementById("health-bar");
const canvas2 = document.getElementById("death-bar");
const context = canvas.getContext("2d");
const context2 = canvas2.getContext("2d");

const maxHealth = 100;
let health = 0;

const healthBar = new HealthBar(maxHealth, "#65CFF6");
const deathBar = new HealthBar(maxHealth, "#D30708");

function resizeCanvasAndBars() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const canvasWidth = vw;
  const canvasHeight = vh;
  const barWidth = canvasWidth * 0.6;
  const barHeight = canvasHeight * 0.05;
  const x = canvasWidth / 2 - barWidth / 2;
  const y = canvasHeight * 0.1;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas2.width = canvasWidth;
  canvas2.height = canvasHeight;

  healthBar.updateDimensions(x, y, barWidth, barHeight);
  deathBar.updateDimensions(x, y, barWidth, barHeight);
}

function frame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  healthBar.show(context);
  requestAnimationFrame(frame);
}

function frame2() {
  context2.clearRect(0, 0, canvas2.width, canvas2.height);
  deathBar.show(context2);
  requestAnimationFrame(frame2);
}

window.addEventListener("resize", () => {
  resizeCanvasAndBars();
});

resizeCanvasAndBars();
healthBar.updateHealth(health);
deathBar.updateHealth(health);

frame();
frame2();
