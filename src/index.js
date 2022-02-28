import { Game } from './app/scenes/game.js';
import { MainMenu } from './app/scenes/main-menu.js';
import { GameOver } from './app/scenes/game-over.js';

new p5( p5 => {

    p5.GAME_OVER_SCENE = 'GAME_OVER_SCENE';
    p5.GAME_SCENE = 'GAME_SCENE';
    p5.MAIN_MENU_SCENE = 'MAIN_MENU_SCENE';

    p5.currentScene = p5.MAIN_MENU_SCENE;
    
    p5.BASE_WIDTH = 412;
    p5.BASE_HEIGHT = 780;

    const sceneExchange = new Map();
    sceneExchange.set(p5.MAIN_MENU_SCENE, new MainMenu(p5));
    sceneExchange.set(p5.GAME_SCENE, new Game(p5));
    sceneExchange.set(p5.GAME_OVER_SCENE, new GameOver(p5));

    p5.preload = () => {
        sceneExchange.get(p5.MAIN_MENU_SCENE).preload();
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(p5.BASE_WIDTH, p5.BASE_HEIGHT);
        canvas.parent('main');
        p5.background(255);
    }

    p5.mouseClicked = () => {
        sceneExchange.get(p5.currentScene).clicked();
    }

    p5.mousePressed = () => {
        sceneExchange.get(p5.currentScene).clicked();
    }

    p5.mouseDragged = () => {
        sceneExchange.get(p5.currentScene).clicked();
    }

    p5.mouseReleased = () => {
        sceneExchange.get(p5.currentScene).clicked();
    }
    
    p5.draw = () => {
        sceneExchange.get(p5.currentScene).draw();
    }


});




