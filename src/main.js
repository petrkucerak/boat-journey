const GameScene = {
  GAME: "game",
  OVER: "over",
  MENU: "menu",
  STORY: "story",
};

class GameObject {
  constructor(x, y, width, height, imageSrc = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (imageSrc) {
      this.image = new Image();
      this.image.src = imageSrc;
    }
  }
  draw(ctx) {
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  move(dy, speed) {
    this.y += dy * speed;
  }
}

class Game {
  constructor(canvasId) {
    // Canvas properties
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.score = {
      localMax: 0, // TODO: load score from browser memory
      current: 0,
    };

    this.gameScene = GameScene.MENU;

    this.setupEventListeners();
    this.run();
  }

  setupEventListeners() {
    window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.font = "24px Arial";
    this.ctx.fillText(`Id: ${this.score.current}`, 10, 30);
    this.score.current += 1;
    console.log(this.score);

    requestAnimationFrame(() => this.run());
  }
}

window.onload = () => new Game("gameCanvas");
