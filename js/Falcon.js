import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, shipsLivesCount } from './utilities.js';

export class Falcon extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.falcon, htmlClasses.falcon, enemiesSpeed.falcon)
    }   

    moveSideways() {
        // TODO - future implementation
        console.log('Move sideways')
    }
}