class HealthBar {
  constructor(maxHealth, color) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.maxWidth = 0;
    this.color = color;
  }

  updateDimensions(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.maxWidth = w;
    this.h = h;
    this.w = (this.health / this.maxHealth) * this.maxWidth;
  }

  updateHealth(val) {
    this.health = Math.min(val, this.maxHealth);
    this.w = (this.health / this.maxHealth) * this.maxWidth;
  }

  show(context) {
    context.lineWidth = 4;
    context.strokeStyle = "#FF9A00";
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.strokeRect(this.x, this.y, this.maxWidth, this.h);
  }
}
