import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses } from './utilities.js';

export class Destroyer extends Enemy {
    constructor(x, y) {
        let livesCount = 7;
        super(x, y, livesCount, htmlClasses.destroyer, enemiesSpeed.destroyer)
        this.htmlElement = null;
    }   

    shootSingleMissle() {
        console.log('shoot single missile')
    }
}