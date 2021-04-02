import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses } from './utilities.js';

export class Falcon extends Enemy {
    constructor(x, y) {
        let livesCount = 1;
        super(x, y, livesCount, htmlClasses.falcon, enemiesSpeed.falcon)
        this.htmlElement = null;
    }   

    moveSideways() {
        console.log('Move sideways')
    }
}