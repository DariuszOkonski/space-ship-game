import { Ship } from './Ship.js';
import {domElements, spaceShipSpeeds} from './utilities.js';

export class SpaceShip extends Ship {
    missiles = [];
    speedX = spaceShipSpeeds.regular;
    rocketCount = 0;
    trippleMissleCounter = 0;
    speedUpCounter = 0;
    htmlElement = null;

    constructor(x, y, livesCount, className) {
        super(x, y, livesCount, className)

        this.initialization()
    }

    initialization() {
        this.buildShip()
        this.allowShipMovement()
    }

    buildShip() {
        this.htmlElement = document.createElement('div')
        domElements.container.appendChild(this.htmlElement)
        
        this.htmlElement.classList.add(this.className)
        this.htmlElement.style.bottom = 0;
        const halfScreen = (window.innerWidth / 2) - (this.htmlElement.clientWidth / 2);

        this.htmlElement.style.left = `${halfScreen}px`
        this.x = halfScreen;
    }

    allowShipMovement() {
        addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                    console.log('<- move left')
                    console.log(this.x)
                    this.moveLeft();

                    break;
                case 39:
                    console.log('move right ->')
                    this.moveRight()
                    break;

                case 32:
                    console.log('single shoot (space)')
                    break;

                case 38:
                    console.log('missile rocket (^ arrow up)')
                    break;

                case 40:
                    console.log(this.className);
                    this.explode();
                    break;
            }
        })
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speedX;
            this.htmlElement.style.left = `${this.x}px`;
        }
        

    }

    moveRight() {
        if (this.x < window.innerWidth - this.htmlElement.clientWidth) {
            this.x += this.speedX;
            this.htmlElement.style.left = `${this.x}px`;
        }
    }


    shootSingleMissile() {

    }

    shootRocketMissile() {

    }

    shootTrippleMissile() {

    }

    explode() {
        // this.className.remove('spaceship');
        // this.className.add('spaceship-explosion');
        this.className = 'spaceship-explosion';
        this.htmlElement.classList.remove('spaceship');
        this.htmlElement.classList.add('spaceship-explosion');
        setTimeout(() => {
            this.htmlElement.remove();
        }, 1000);
    }

}