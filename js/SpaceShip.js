import { Ship } from './Ship.js';
import {domElements, htmlClasses, spaceShipSpeeds, shipsLivesCount, missileDamage} from './utilities.js';
import {Missile} from './Missile.js';

export class SpaceShip extends Ship {
    missiles = [];
    speedX = spaceShipSpeeds.regular;
    rocketCount = 25;
    trippleMissleCount = 30;
    speedUpCounter = 0;
    htmlElement = null;
    movingLeft = false;
    movingRight = false;

    constructor(x, y) {
        super(x, y, shipsLivesCount.spaceship, htmlClasses.spaceship)

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

    // allowShipActions() {
    //     addEventListener('keydown', (event) => {
    //         switch (event.keyCode) {
    //             case 37:
    //                 this.movingLeft = true;
    //                 break;

    //             case 39:
    //                 this.movingRight = true;
    //                 break;

    //         }
    //     })

    allowShipActions() {
        addEventListener('keydown', (event) => this.keyDownFunction(event));

        addEventListener('keyup', (event) => this.keyUpFunction(event));
    }
////////////
    forbidShipActions() {
        this.movingLeft = false;
        this.movingRight = false;
        clearInterval(this.intervalMovement);
        // FOOKING EVENT LISTENERS TO CORRECT - STILL CAN SHOOT AFTER EXPLOSION
        removeEventListener('keyup', (event) => this.keyUpFunction(event));
        removeEventListener('keydown', (event) => this.keyDownFunction(event));
///////////
    }

    keyDownFunction(event) {
        switch (event.keyCode) {
                case 37:
                    this.movingLeft = true;
                    break;

                case 39:
                    this.movingRight = true;
                    break;
            }
    }

    keyUpFunction(event) {
        switch (event.keyCode) {
            case 37:
                // LEFT ARROW key - move left
                this.movingLeft = false;
                break;

            case 39:
                // RIGHT ARROW key - move right
                this.movingRight = false;
                break;

            case 32:
                // SPACE key - single shot
                this.shootSingleMissile();
                console.log(this.missiles);
                break;

            case 81:
                // Q key - rocket shot
                if (this.rocketCount > 0) {
                    this.shootRocketMissile();
                    console.log('missile rocket (^ arrow up)')
                }
                break;

            case 87:
                // W key - tripple missile shot
                if (this.trippleMissleCount > 0) {
                    this.shootTrippleMissile();
                    console.log('triple shot');
                }
                break;

            case 40:
                // ARROW DOWN key - temporary testing key
                this.collectSpeedUp(5000);
                break;
        }
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
        this.createMissile('--missile-size', htmlClasses.missile, missileDamage.missile);
    }

    shootRocketMissile() {
        this.updateRocketsCount();
        this.createMissile('--rocket-size', htmlClasses.missileRocket, missileDamage.rocket);

    }

    
    shootTrippleMissile() {
        this.updateTripleMissilesCount();
        this.createMissile('--missile-size', htmlClasses.missile, missileDamage.missile, true);
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

    explode() {
        this.forbidShipActions();
        super.explode();
    }
}