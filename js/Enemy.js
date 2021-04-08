import { Ship } from './Ship.js';
import { domElements } from './utilities.js';

export class Enemy extends Ship {
    constructor(x, y, livesCount, className, speedY) {
        super(x, y, livesCount, className);
        this.speedY = speedY;
        this.shootingUnit = false;

        this.initialization();
    }
    
    initialization() {
        this.buildEnemy();
        this.moveDown();
    }

    buildEnemy() {
        this.htmlElement = document.createElement('div')
        
        this.htmlElement.classList.add(this.className)
        this.htmlElement.style.bottom = `${this.y}px`;
        this.htmlElement.style.left = `${this.x}px`;
        domElements.container.appendChild(this.htmlElement);
    }   

    moveDown() {
        this.intervalMovement = setInterval(() => {
            this.y -= this.speedY   
            this.htmlElement.style.bottom = `${this.y}px`;
        }, 50);
    }

    remove() {
        clearInterval(this.intervalMovement);
        this.htmlElement.classList.remove(this.className);
        this.htmlElement.remove();
    }

}