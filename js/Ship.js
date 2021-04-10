import { Missile } from './Missile.js';
import { hitBoxCorrections } from './utilities.js';

export class Ship {
    constructor(x, y, livesCount, className) {
        this.x = x;
        this.y = y;
        this.livesCount = livesCount;
        this.className = className;
        this.intervalMovement = null;
        this.missiles = [];
    }

    processBeingHit(damage) {
        this.livesCount -= damage

        if(this.livesCount <= 0) {
            this.explode();
        }
    }

    
    createMissile(cssSizeVar, htmlClass, damage, isEnemies=false, isTriple=false) {
        const missileSize = parseInt(getComputedStyle(this.htmlElement).getPropertyValue(cssSizeVar));
        const xCoord = this.x + this.htmlElement.clientWidth/2 - missileSize/2
        const yCoord = this.y + this.htmlElement.clientHeight/2;
        const missile = new Missile(xCoord, yCoord, htmlClass, isEnemies, damage);
        this.missiles.push(missile);
        if (isTriple) {
            const leftMissile =  new Missile(xCoord - 42, yCoord-20, htmlClass, isEnemies, damage);
            const rightMissile =  new Missile(xCoord + 42, yCoord-20, htmlClass, isEnemies, damage);
            this.missiles.push(leftMissile);
            this.missiles.push(rightMissile);
        }
    }
    
    getHitBox() {
        return {
            leftSide: this.x + hitBoxCorrections[this.className].x, 
            rightSide: this.x + this.htmlElement.clientWidth - hitBoxCorrections[this.className].x,
            frontSide: this.y + hitBoxCorrections[this.className].y
        }
    }


    explode() {
        clearInterval(this.intervalMovement);
        this.htmlElement.classList.remove(this.className);
        this.className = `${this.className}-explosion`;
        this.htmlElement.classList.add(this.className);
       
        setTimeout(() => {
            this.htmlElement.remove();
        }, 1500);
    }
}