import { Ship } from './Ship.js';
import { domElements } from './utilities.js';

export class Enemy extends Ship {
    constructor(x, y, livesCount, className, speedY) {
        super(x, y, livesCount, className);
        this.speedY = speedY;
        this.shootingUnit = false;

        this.buildEnemy();
    }

    buildEnemy() {
        this.htmlElement = document.createElement('div')
        
        this.htmlElement.classList.add(this.className)
        // this.htmlElement.style.top = 0;
        // this.htmlElement.style.bottom = `${window.innerHeight}px`;
        this.htmlElement.style.bottom = `${this.y}px`;
        // const halfScreen = (window.innerWidth / 2) - (this.htmlElement.clientWidth / 2);
        
        // this.htmlElement.style.left = this.x;
        this.htmlElement.style.left = `${this.x}px`;
        domElements.container.appendChild(this.htmlElement);
    }   

    moveDown() {
        this.y -= this.speedY /////
    }

    remove() {
        this.htmlElement.classList.remove(this.className);
        this.htmlElement.remove()   
        clearInterval(this.intervalMovement)
    }

}