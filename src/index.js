import { Game } from './app/scenes/game.js';
import { MainMenu } from './app/scenes/main-menu.js';
import { GameOver } from './app/scenes/game-over.js';

const GAME_OVER_SCENE = 'GAME_OVER_SCENE';
const GAME_SCENE = 'GAME_SCENE';
const MAIN_MENU_SCENE = 'MAIN_MENU_SCENE';

const BASE_WIDTH = 412;
const BASE_HEIGHT = 780;

new p5( p5 => {

    const sceneExchange = new Map();
    sceneExchange.set(MAIN_MENU_SCENE, new MainMenu(p5));
    sceneExchange.set(GAME_SCENE, new Game(p5));
    sceneExchange.set(GAME_OVER_SCENE, new GameOver(p5));

    p5.setup = function() {
        const canvas = p5.createCanvas(BASE_WIDTH, BASE_HEIGHT);
        canvas.parent('main');
        p5.background(255, 0, 200);   
    }
    
    p5.draw = function() {

    }

});




