export class MyGame {

    public score = 0;
    private elapsedTime = 0;

    public update(deltaTime: number) {

        // Update score
        this.elapsedTime += deltaTime;
        this.score = Math.floor(this.elapsedTime / 3000);
    }
}
