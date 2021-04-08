import { domElements, bonusSpeed, convertHtmlClassNameToPropertyName, hitBoxCorrections } from "./utilities.js";

export class Bonus {
    constructor(className, bonusCount, speedY) {
        this.x = this.randomTopPosition();
        this.y = window.innerHeight;
        this.className = className;
        this.bonusCount = bonusCount;
        this.intervalMovement = null;
        this.speedY = bonusSpeed[convertHtmlClassNameToPropertyName(className)];
        this.htmlElement = null;
        this.initialization();
    
    }
    
    initialization() {
        this.buildBonus();
        this.moveDown();
    }

    randomTopPosition() {
        let randomX = Math.floor(Math.random() * window.innerWidth)

        if (randomX > window.innerWidth/2)
            randomX -= 96;
        
        return randomX
    }

    buildBonus() {
        this.htmlElement = document.createElement('div');
        this.htmlElement.classList.add(this.className);
        this.htmlElement.style.bottom = `${this.y}px`;
        this.htmlElement.style.left = `${this.x}px`;
        domElements.container.appendChild(this.htmlElement)
    }

    moveDown() {
        this.intervalMovement = setInterval(() => {
            this.y -= this.speedY;
            this.htmlElement.style.bottom = `${this.y}px`;

            if(this.y < 0) {
                this.remove()
            }

        }, 50);
    }

    remove() {
        clearInterval(this.intervalMovement);
        this.htmlElement.remove()
        this.htmlElement = null;
    }

    getHitBox() {
        // let hitboxToleranceCorrection = this.x * 0.02;
        return {
            leftSide: this.x + hitBoxCorrections['bonus'].x, 
            rightSide: this.x + this.htmlElement.clientWidth - hitBoxCorrections['bonus'].x,
            top: this.y + hitBoxCorrections['bonus'].y
        }
    }
}