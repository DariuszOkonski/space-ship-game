import { Ship } from './Ship.js';
import {domElements} from './utilities.js';

export class SpaceShip extends Ship {
    missiles = [];
    speedX = 0;
    rocketCount = 0;
    trippleMissleCounter = 0;
    speedUpCounter = 0;

    constructor(x, y, livesCount, className) {
        super(x, y, livesCount, className)
        this.htmlElement.style.bottom = `${this.x}px`;
        this.htmlElement.style.left = `${this.y - this.htmlElement.style.width}px`;
        console.log(this.htmlElement.offsetHeight)
        console.log(this.htmlElement.offsetWidth)
        domElements.container.appendChild(this.htmlElement)
    }
}