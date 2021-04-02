import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, shipsLivesCount } from './utilities.js';

export class Falcon extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.falcon, htmlClasses.falcon, enemiesSpeed.falcon)
        this.htmlElement = null;
    }   

    moveSideways() {
        console.log('Move sideways')
    }
}