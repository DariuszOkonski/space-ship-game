import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, shipsLivesCount } from './utilities.js';

export class Destroyer extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.destroyer, htmlClasses.destroyer, enemiesSpeed.destroyer)
        this.htmlElement = null;
    }   

    shootSingleMissle() {
        console.log('shoot single missile')
    }
}