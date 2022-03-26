import { GeneralPanel } from '../entities/general-panel.js';
import { Tag } from '../entities/tag.js';

export class GameOver {

    GAMEOVER = 'GameOver';
    MAINMENU = 'MainMenu';

    // Initialize game
    constructor(p5, game) {
        this.p5 = p5;
        this.game = game;
    }

    // update(deltaTime) {
    //     this.score.text = this.canvas.finalScore;
    //     this.clickedX = this.ctx.canvas.clickedX;
    //     this.clickedY = this.ctx.canvas.clickedY;
    //     if (this.clickedX != -1) {
    //         // It controls if you clicked inside a block and get it
    //         const tagClicked = this.tags.find ( tag => 
    //                 this.clickedX > tag.x - tag.width / 2 
    //             && this.clickedX < tag.x + tag.width / 2
    //             && this.clickedY < tag.y 
    //             && this.clickedY > tag.y - tag.height);
            
    //         if (!!tagClicked) {
    //             return this.MAINMENU;
    //         }
    //     }
    //     return this.GAMEOVER;
    // }

    // draw() {
    //     this.gameOverPanel.draw();
    //     this.gameOver.draw();
    //     this.yourScore.draw();
    //     this.score.draw();
    //     this.mainMenu.draw();
    // }

    // #createGameOverPanel() {
    //     return new GeneralPanel(this);
    // }

    // #createTagGameOver() {
    //     return new Tag(this, 'Game Over', 206, 300, 50, 'white', 'center');
    // }

    // #createTagYourScore() {
    //     return new Tag(this, 'Your score is', 206, 400, 30, 'white', 'center');
    // }

    // #createTagFinalScore(score) {
    //     return new Tag(this, `${score}`, 206, 460, 50, 'white', 'center');
    // }

    // #createTagGoToMainMenu() {
    //     return new Tag(this, 'Main Menu', 390, 750, 30, 'white', 'right');
    // }


    // #fillTagArray() {
    //     this.tags.push(this.gameOver, this.mainMenu);
    // }
}