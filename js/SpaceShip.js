import { Ship } from './Ship.js';
import {domElements} from './utilities.js';

export class SpaceShip extends Ship {
    missiles = [];
    speedX = 0;
    rocketCount = 0;
    trippleMissleCounter = 0;
    speedUpCounter = 0;
    htmlElement = null;

    constructor(x, y, livesCount, className) {
        super(x, y, livesCount, className)

        this.htmlElement = document.createElement('div')
        domElements.container.appendChild(this.htmlElement)
        
        this.htmlElement.classList.add(this.className)
        this.htmlElement.style.bottom = 0;
        const halfScreen = (window.innerWidth / 2) - (this.htmlElement.clientWidth / 2);

        this.htmlElement.style.left = `${halfScreen}px`
        
        // console.log(halfScreen)
        
        console.log('print')
        console.log(window.innerWidth / 2)
        
        
        
        console.log(this.htmlElement.clientWidth)
    }
}