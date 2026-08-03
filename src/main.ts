
// OOP

class Player {

  private readonly DEFAULT_SPEED = 10;
  private readonly WEAK_SPEED = 5;
  private readonly SPEED_DECREAING_THREASHOLD = 20;

  private hitPoints = 100
  private _hasHat = true;

  public hit(hitPoints: number): void {
    if (hitPoints < 0)
      throw new Error('Blanker Unsinn!')
    this.hitPoints -= hitPoints;
    this.calculateState();
  }

  public heal(hitPoints: number): void {
    if (hitPoints < 0)
      throw new Error('Blanker Unsinn!')
    this.hitPoints += hitPoints;
    this.calculateState();
  }

  public get speed(): number {
    return this.hitPoints >= this.SPEED_DECREAING_THREASHOLD
      ? this.DEFAULT_SPEED
      : this.WEAK_SPEED;
  }

  public get hasHat(): boolean {
    return this._hasHat;
  }

  private calculateState(): void {
  
    if (this.hitPoints < 10) {
      this._hasHat = false;
    }
  }
}




const player1 = new Player();

player1.hit(50);
player1.speed = 42;
player1.hasHat;



