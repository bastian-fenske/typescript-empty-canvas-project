import type {MyGame} from "./MyGame.ts";

export class Renderer {

    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public render(state: MyGame) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.drawBackground();
        this.drawScore(state.score);
    }

    private drawBackground() {
      this.ctx.fillStyle = "lightblue";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    private drawScore(score: number) {
      this.ctx.font = "24px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`My Score: ${score}`, 20, 50);
    }
}
