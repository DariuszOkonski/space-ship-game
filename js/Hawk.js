import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, shipsLivesCount } from './utilities.js';

export class Hawk extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.hawk, htmlClasses.hawk, enemiesSpeed.hawk)
        // this.htmlElement = null;
    }   

    moveAccross() {
        console.log('Move accross')
    }
}