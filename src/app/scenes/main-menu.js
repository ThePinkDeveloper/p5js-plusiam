export class MainMenu {

    constructor(p5) {
        this.p5 = p5;
        this.mainMenuPanel;
        this.width = p5.BASE_WIDTH;
        this.height = p5.BASE_HEIGHT;
    }

    preload() {
        this.mainMenuPanel = this.p5.loadImage('./src/app/assets/general-panel.png');
    }

    clicked() {
        // New Game
        if (this.p5.mouseX > 70 && this.p5.mouseX < 345 && this.p5.mouseY > 280 && this.p5.mouseY < 325) {
            this.p5.currentScene = this.p5.GAME_SCENE;
        }
        // Tutorial
        // TO BE DONE!
        // Exit
        if ((this.p5.mouseX > 330 && this.p5.mouseX < 395 && this.p5.mouseY > 724 && this.p5.mouseY < 755)) {
            window.location.href = 'http://google.com';
        }
        
    }

    pressed() {}       
    
    dragged() {}

    released() {}

    draw() {
        this.p5.image(this.mainMenuPanel, 0, 0, this.width, this.height);
        this.p5.fill(255);
        this.p5.textAlign(this.p5.CENTER);
        this.p5.textSize(70);
        this.p5.text('PLUSIAM', 206, 100);
        this.p5.textSize(50);
        this.p5.text('New Game', 206, 320);
        this.p5.text('Tutorial', 206, 500);
        this.p5.textAlign(this.p5.RIGHT);
        this.p5.textSize(30);
        this.p5.text('Exit', 390, 750);
    }

}