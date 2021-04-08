import { Ship } from './Ship.js';
import {domElements, htmlClasses, spaceShipSpeeds, shipsLivesCount, missileDamage, imagesURLs} from './utilities.js';


export class SpaceShip extends Ship {
    missiles = [];
    speedX = spaceShipSpeeds.regular;
    rocketCount = 5;
    trippleMissleCount = 10;
    speedUpCounter = 0;
    htmlElement = null;
    movingLeft = false;
    movingRight = false;
    rocketCannonOverheated = false;
    tripleMissilesCannonsOverheated = false;

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

    removeListeners() {
        removeEventListener('keydown', this.keyDownFunction);
        removeEventListener('keyup', this.keyUpFunction);
        
    }

    allowShipActions() {
        addEventListener('keydown', this.keyDownFunction);

        addEventListener('keyup', this.keyUpFunction);
    }

    forbidShipActions() {
        this.movingLeft = false;
        this.movingRight = false;
        clearInterval(this.intervalMovement);
        this.removeListeners();
    }

    keyDownFunction = (event) => {
        switch (event.keyCode) {
                case 37:
                    this.movingLeft = true;
                    break;

                case 39:
                    this.movingRight = true;
                    break;
            }
    }

    keyUpFunction = (event) => {
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
        this.createMissile('--missile-size',
                            htmlClasses.missile,
                            missileDamage.missile);
    }

    shootRocketMissile() {
        if (!this.rocketCannonOverheated) {
            this.updateRocketsCount();
            this.createMissile(
                '--rocket-size',
                htmlClasses.missileRocket,
                missileDamage.rocket);
            this.cooldownRocketCannon();
        }
        

    }

    updateRocketsCount() {
        this.rocketCount--;
        domElements.rocket.innerText = `${this.rocketCount}`;
    }

    cooldownRocketCannon() {
        this.rocketCannonOverheated = true;
        domElements.rocketImg.src = imagesURLs.rocketCannonsOverheated;
        setTimeout(() => {
            domElements.rocketImg.src = imagesURLs.bonusRocketReady;
            this.rocketCannonOverheated = false;
        }, 1500);
    }


    shootTrippleMissile() {
        if (!this.tripleMissilesCannonsOverheated) {
            this.updateTripleMissilesCount();
            this.createMissile('--missile-size',
                                htmlClasses.missile,
                                missileDamage.missile,
                                false,
                                true);
                
            if (this.missiles.length > 21) {
                this.coolDownTripleMissilesCannons();
            }
        }
    }

    updateTripleMissilesCount() {
        this.trippleMissleCount--;
        domElements.tripleMissile.innerText = `${this.trippleMissleCount}`;
    }

    coolDownTripleMissilesCannons() {
        this.tripleMissilesCannonsOverheated = true;
        domElements.tripleMissileImg.src = imagesURLs.tripleMissileCannonsOverheated;
        setTimeout(() => {
            domElements.tripleMissileImg.src = imagesURLs.bonusTripleMissileReady;
            this.tripleMissilesCannonsOverheated = false;
        }, 3000);
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

    collectHeart(livesCount) {
        this.livesCount += livesCount;
        domElements.hearts.innerText = `${this.livesCount}`;
    }

    collectTrippleMissile(shootsCount) {
        this.trippleMissleCount += shootsCount;
        domElements.tripleMissile.innerText = `${this.trippleMissleCount}`;
    }
    
    collectRocket(shootsCount) {
        this.rocketCount += shootsCount;
        domElements.rocket.innerText = `${this.rocketCount}`;
    }

    collectBonus(bonus) {

        switch (bonus.className) {
            case htmlClasses.bonusEngine:
                this.collectSpeedUp(bonus.bonusCount);
                break;
            case htmlClasses.bonusHeart:
                this.collectHeart(bonus.bonusCount);                
                break;
            case htmlClasses.bonusMissile:
                this.collectRocket(bonus.bonusCount);
                break;
            case htmlClasses.bonusThree:
                this.collectTrippleMissile(bonus.bonusCount);
                break;          
        }
    }

    explode() {
        this.forbidShipActions();
        super.explode();
    }
}