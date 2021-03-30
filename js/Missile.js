import {domElements} from './utilities.js' 

export class Missile {
    x = null;
    y = null;
    damage = 0;
    className = null;
    htmlElement = null;
    isEnemyMissile = null;


    constructor(x, y, className, isEnemyMissile, damage) {
        this.isEnemyMissile = isEnemyMissile;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.className = className;
        this.initialization();

    }

    initialization(){
        this.createMissile();
    }

    createMissile() {
        this.htmlElement = document.createElement('div');
        this.htmlElement.classList.add(this.className);
        
        
        
        if (!this.isEnemyMissile) {
            this.htmlElement.style.left = `${this.x}px`;
            this.htmlElement.style.bottom = `${this.y}px`;
            // this.htmlElement.style.bottom = '0px';
        }
        else {
            this.htmlElement.style.left = `${this.x}px`;
            this.htmlElement.style.top = `${this.y}px`;
        }
        
        domElements.container.appendChild(this.htmlElement);
    }

    moveUp() {

    }

    moveDown() {

    }

    remove() {

    }

    explode() {

    }
}