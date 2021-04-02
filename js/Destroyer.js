import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, shipsLivesCount } from './utilities.js';

export class Destroyer extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.destroyer, htmlClasses.destroyer, enemiesSpeed.destroyer)
        // this.htmlElement = null;
        this.shootingUnit = true;
        this.missiles = [];
    }   

    shootSingleMissle() {
        console.log('shoot single missile')
    }
}