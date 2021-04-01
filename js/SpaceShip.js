import { Ship } from './Ship.js';
import {domElements, htmlClasses, spaceShipSpeeds} from './utilities.js';
import {Missile} from './Missile.js';

export class SpaceShip extends Ship {
    missiles = [];
    speedX = spaceShipSpeeds.regular;
    rocketCount = 3;
    trippleMissleCount = 10;
    speedUpCounter = 0;
    htmlElement = null;
    movingLeft = false;
    movingRight = false;
    // intervalMovement = null;

    constructor(x, y, livesCount, className) {
        super(x, y, livesCount, className)

        this.initialization()
    }

    initialization() {
        this.buildShip();
        this.allowShipActions();
        this.movementLoop();
    }

    buildShip() {
        this.htmlElement = document.createElement('div')
        
        this.htmlElement.classList.add(this.className)
        this.htmlElement.style.bottom = 0;
        const halfScreen = (window.innerWidth / 2) - (this.htmlElement.clientWidth / 2);
        
        this.htmlElement.style.left = `${halfScreen}px`
        this.x = halfScreen;
        domElements.rocket.innerText = `${this.rocketCount}`;
        domElements.hearts.innerText = `${this.livesCount}`;
        domElements.tripleMissile.innerText = `${this.trippleMissleCount}`;
        domElements.container.appendChild(this.htmlElement);
        
    }

    allowShipActions() {
        addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                    this.movingLeft = true;
                    break;

                case 39:
                    this.movingRight = true;
                    break;

            }
        })

        addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 37:
                    this.movingLeft = false;
                    break;

                case 39:
                    this.movingRight = false;
                    break;

                case 32:
                    this.shootSingleMissile();
                    console.log(this.missiles);
                    break;

                case 38:
                    if (this.rocketCount > 0) {
                        this.shootRocketMissile();
                        console.log('missile rocket (^ arrow up)')
                    }
                    break;

                case 40:
                    if (this.trippleMissleCount > 0) {
                        this.shootTrippleMissile();
                        console.log('triple shot');
                    }
                    break;
            }
        })
    }

    movementLoop() {
        this.intervalMovement = setInterval(() => {
            if(this.movingLeft) {
                this.moveLeft()
            } else if(this.movingRight) {
                this.moveRight()
            }
        }, 20);
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
        this.createMissile('--missile-size', htmlClasses.missile, 1);
    }

    shootRocketMissile() {
        this.updateRocketsCount();
        this.createMissile('--rocket-size', htmlClasses.missileRocket, 3);

    }

    
    shootTrippleMissile() {
        this.updateTripleMissilesCount();
        this.createMissile('--missile-size', htmlClasses.missile, 1, true);
    }

    createMissile(cssSizeVar, htmlClass, damage, isTriple=false) {
        const missileSize = parseInt(getComputedStyle(this.htmlElement).getPropertyValue(cssSizeVar));
        const xCoord = this.x + this.htmlElement.clientWidth/2 - missileSize/2
        const yCoord = 0 + this.htmlElement.clientHeight/2;
        const missile = new Missile(xCoord, yCoord, htmlClass, false, damage);
        this.missiles.push(missile);
        
        if (isTriple){
            const leftMissile =  new Missile(xCoord - 42, yCoord-20, htmlClass, false, damage);
            const rightMissile =  new Missile(xCoord + 42, yCoord-20, htmlClass, false, damage);
            this.missiles.push(leftMissile);
            this.missiles.push(rightMissile);
        }
    }

    updateRocketsCount() {
        this.rocketCount--;
        domElements.rocket.innerText = `${this.rocketCount}`;
    }

    updateTripleMissilesCount() {
        this.trippleMissleCount--;
        domElements.tripleMissile.innerText = `${this.trippleMissleCount}`;
    }

    collectSpeedUp(timeout) {

        this.speedX = spaceShipSpeeds.fast;
        let counter = parseFloat(timeout/1000);
        
        let counterInverval = setInterval(() => {
            counter -= 0.1
            domElements.engine.innerText = counter.toFixed(1);
        }, 100);

        setTimeout(() => {
            this.speedX = spaceShipSpeeds.regular;
            clearInterval(counterInverval);
            domElements.engine.innerText = '0.0';
        }, timeout);
    }


    // explode() {
    //     // this.className.remove('spaceship');
    //     // this.className.add('spaceship-explosion');
    //     this.className = htmlClasses.spaceshipExplosion;
    //     this.htmlElement.classList.remove(htmlClasses.spaceship);
    //     this.htmlElement.classList.add(htmlClasses.spaceshipExplosion);
    //     setTimeout(() => {
    //         this.htmlElement.remove();
    //         clearInterval(this.intervalMovement);
    //     }, 1000);
    // }

}