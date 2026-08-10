import {MyGame} from "./MyGame.ts";
import {Renderer} from "./Renderer.ts";

const canvas = document.querySelector("canvas")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;

const state = new MyGame();
const renderer = new Renderer(ctx);

let lastTime = 0;

function gameLoop(timestamp: number) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  state.update(deltaTime);
  renderer.render(state);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);