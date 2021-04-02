import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses } from './utilities.js';

export class Hawk extends Enemy {
    constructor(x, y) {
        let livesCount = 3;
        super(x, y, livesCount, htmlClasses.hawk, enemiesSpeed.hawk)
        this.htmlElement = null;
    }   

    moveAccross() {
        console.log('Move accross')
    }
}