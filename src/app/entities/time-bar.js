export class TimeBar {

    GAMEOVER = 'GameOver';
    GAMEON = 'GameOn';
    INITIAL_WIDTH = 392;
    NORMAL_COLOR= 'white';
    WARNING_COLOR = 'yellow';
    CRITICAL_COLOR = 'red';
    INITIAL_TIME = 10000;

    constructor(game) {
        this.time = this.INITIAL_TIME;
        this.game = game;
        this.x = 10;
        this.y = 80;
        this.height = 10; 
        this.color = this.NORMAL_COLOR;
        this.width = this.INITIAL_WIDTH;
    }

    update() {
        if (this.width <= 0) {
            this.time = this.INITIAL_TIME;
            this.width = this.INITIAL_WIDTH;
            this.game.p5.finalScore = this.game.score;
            this.game.score = 0;
            this.color = this.NORMAL_COLOR;
            this.game.blocks = this.game.fillGame(this.game.TOTAL_COLUMNS, this.game.TOTAL_ROWS);
            return this.GAMEOVER;
        }
        this.time = this.time - Number.parseInt(this.game.p5.deltaTime * this.game.score / 1000);
        this.width = this.time / this.INITIAL_TIME * this.INITIAL_WIDTH;
        if (this.width > this.INITIAL_WIDTH / 2) {
            this.color = this.NORMAL_COLOR;
            return this.GAMEON;
        }
        if (this.width < this.INITIAL_WIDTH / 4) {
            this.color = this.CRITICAL_COLOR;
            return this.GAMEON;
        }
        this.color = this.WARNING_COLOR;

        return this.GAMEON;
    }

    draw() {
        this.game.p5.fill(this.color);
        this.game.p5.rect(this.x, this.y, this.width, this.height);
        this.game.p5.noFill();
        this.game.p5.strokeWeight(1);
        this.game.p5.stroke(255);
        this.game.p5.rect(this.x, this.y - 1, this.INITIAL_WIDTH, this.height + 2);
    }

}