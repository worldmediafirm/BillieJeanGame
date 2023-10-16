const canvas = document.getElementById("health-bar");
const canvas2 = document.getElementById("death-bar");
const fader1 = document.querySelector('.fader1');
const context = canvas.getContext("2d");
const context2 = canvas2.getContext("2d");
const width = canvas.width = 320;
const height = canvas.height = 480;
const deathWidth = canvas2.width = 320;
const deathHeight = canvas2.height =480;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";
canvas2.style.marginTop = window.innerHeight / 2 - deathHeight / 2 + "px";

let health = 0; // Start at 0
const maxHealth = 100; // Maximum health value
const healthBarWidth = 200;
const healthBarHeight = 30;
const x = width / 2 - healthBarWidth / 2;
const y = height / 2 - healthBarHeight / 2;

const healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, maxHealth, "#65CFF6");
healthBar.updateHealth(health); // Set the initial health

const deathBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, maxHealth, "#D30708");
deathBar.updateHealth(health);

const frame = function() {
  context.clearRect(0, 0, width, height);
  healthBar.show(context);
  requestAnimationFrame(frame);
}

const frame2 = function() {
  context2.clearRect(0, 0, deathWidth, deathHeight);
  deathBar.show(context2);
  requestAnimationFrame(frame2);
}



/*fader1.onclick = function() {
  health +=3.33; // Increment health by 10
  if (health > maxHealth) {
    health = maxHealth; // Ensure health doesn't exceed the maximum value
  }
  healthBar.updateHealth(health);
};*/




frame();
frame2();