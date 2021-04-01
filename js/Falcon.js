import { Enemy } from './Enemy.js';

export class Falcon extends Enemy {
    constructor(x, y, livesCount, className, speedY) {
        super(x, y, livesCount, className, speedY)
        this.htmlElement = null;
    }   

    moveSideways() {
        console.log('Move sideways')
    }
}