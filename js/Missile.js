import {domElements, hitBoxCorrections, htmlClasses, missilesSpeeds, convertHtmlClassNameToPropertyName} from './utilities.js' 

export class Missile {
    x = null;
    y = null;
    damage = 0;
    className = null;
    htmlElement = null;
    isEnemyMissile = null;
    intrevalIndex = null;

    constructor(x, y, className, isEnemyMissile, damage) {
        this.isEnemyMissile = isEnemyMissile;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.className = className;
        this.targetHit = false;
        this.initialization();
    }

    initialization(){
        this.createMissile();
    }

    createMissile() {
        this.htmlElement = document.createElement('div');
        this.htmlElement.classList.add(this.className);
        
        
        this.htmlElement.style.left = `${this.x}px`;
        this.htmlElement.style.bottom = `${this.y}px`;
        
        if (!this.isEnemyMissile) {
            this.moveUp();
        }
        else {
           this.moveDown();
        }
        
        domElements.container.appendChild(this.htmlElement);
    }


    moveUp() {
        let speed = 0;
        if (this.className == htmlClasses.missile) {
            speed = missilesSpeeds.missile;
        } else if (this.className == htmlClasses.missileRocket) {
            speed = missilesSpeeds.missileRocket;
        } else {
            speed = missilesSpeeds.tripleMissile;
        }
        
        this.intrevalIndex = setInterval(() => {
            this.y += speed;
            this.htmlElement.style.bottom = `${this.y}px`;
        }, 10);
    }

    moveDown() {
        let speed = 0;
        if (this.className == htmlClasses.missile) {
            speed = missilesSpeeds.missile;
        } else if (this.className == htmlClasses.missileRocket) {
            speed = missilesSpeeds.missileRocket;
        } else {
            speed = missilesSpeeds.tripleMissile;
        }
        
        this.intrevalIndex = setInterval(() => {
            this.y -= speed;
            this.htmlElement.style.bottom = `${this.y}px`;
        }, 10);
    }

    remove() {
        clearInterval(this.intrevalIndex);
        this.htmlElement.remove()
        // this.htmlElement = null;
    }

    explode() {
            clearInterval(this.intrevalIndex);
            this.targetHit = true;
            this.htmlElement.classList.remove(this.className);
            this.className = `${this.className}-explosion`;
            this.htmlElement.classList.add(this.className);
            setTimeout(() => {
                this.htmlElement.remove();
            }, 1000);
    }

    getHitBox() {
        let topPointCorrection;
        let hitBoxCorrectionY;
        let convertedClassName = convertHtmlClassNameToPropertyName(this.className);
        if (!this.isEnemyMissile) {
            topPointCorrection = this.htmlElement.clientHeight;
            hitBoxCorrectionY = -hitBoxCorrections[convertedClassName].y
        } else {
            topPointCorrection = 0;
            hitBoxCorrectionY = hitBoxCorrections[convertedClassName].y;
        }
        
        return {
            top: this.y + topPointCorrection + hitBoxCorrectionY,
            leftSide: this.x + hitBoxCorrections[convertedClassName].x,
            rightSide: this.x + this.htmlElement.clientWidth - hitBoxCorrections[convertedClassName].x
        } 
    }
}