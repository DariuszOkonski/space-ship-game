import { SpaceShip } from './SpaceShip.js';
import {domElements, enemiesSpeed, htmlClasses} from './utilities.js';
import { Falcon } from './Falcon.js';
import { Hawk } from './Hawk.js';
import { Destroyer } from './Destroyer.js';



class Controller {
    spaceship = null;
    enemies = [];
    scores = null;
    intervalMissilesCleaner = null; // Remeber to clear interval
    intervalEnemyHit = null; //Remember to clear interval
    intervalSpaceShipHit = null; // Remeber to clea interval
    intervalEnemiesHitBottom = null //Remember to clear interval

    constructor() {
        this.setGame();
        // this.initialization();
    }
    
    initialization() {     
        this.checkEnemyHit();   
        this.missileCleaningLoop();
        this.enemyGenerator();
        this.enemiesCleaningLoop();
    }

    setGame() {
        // set spaceship
        clearInterval(this.intervalMissilesCleaner);
        clearInterval(this.intervalEnemyHit);
        clearInterval(this.intervalSpaceShipHit);
        clearInterval(this.intervalEnemiesHitBottom);
        const halfScreen = window.innerWidth / 2;
        this.spaceship = new SpaceShip(0, halfScreen);
        this.scores = 0;
        //...
    }

    missileCleaningLoop() {
        this.intervalMissilesCleaner = setInterval(() => {
            this.spaceship.missiles.forEach((missile, index, arr) => {               
                if(missile.y >= window.innerHeight) {
                    missile.remove();
                    arr.splice(index, 1);
                }                
            })
        }, 100);
    }

    enemiesCleaningLoop() {
        this.intervalEnemiesHitBottom = setInterval(() => {
            this.enemies.forEach((enemy, index, arr) => {
                if(enemy.y <= (0 - enemy.htmlElement.clientHeight)) {
                    // processEnemiesPassing(enemy, index, arr);
                    
                    enemy.remove();
                    arr.splice(index, 1);
                    if (this.spaceship.livesCount > 0) {
                        this.spaceship.livesCount--;
                    }
                    domElements.hearts.innerText = this.spaceship.livesCount;
                    domElements.container.classList.add('red');
                    setTimeout(() => {
                        domElements.container.classList.remove('red');
                    }, 150);

                    if (this.spaceship.livesCount <= 0) {
                        this.spaceship.removeListeners();

                        this.spaceship.explode();
                        setTimeout(() => {
                            domElements.endScore.innerText = this.scores;
                            domElements.modal.classList.remove('hide');
                        }, 1000);
                    }
                }
            });            
        }, 100);

    }

    // processEnemiesPassing(enemy, index, arr) {
    //     enemy.remove();
    //     arr.splice(index, 1);
    //     this.spaceship.livesCount--;
    //     domElements.hearts.innerText = this.spaceship.livesCount;
    //     domElements.container.classList.add('red');
    //     setTimeout(() => {
    //         domElements.container.classList.remove('red');
    //     }, 150);
    // }

    checkEnemyHit() {
        this.intervalEnemyHit = setInterval(() => {
            this.spaceship.missiles.forEach((missile, missileIndex, missileArr) => {
                const flyingMissile = {
                    alt: missile.y,
                    peek: missile.x + (missile.htmlElement.clientWidth / 2)
                }

                this.enemies.forEach((enemy, enemyIndex, enemyArr) => {
                    let hitboxToleranceCorrection = enemy.x * 0.02;

                    const flyingEnemy = {
                        leftSide: enemy.x + hitboxToleranceCorrection, 
                        rightSide: enemy.x + enemy.htmlElement.clientWidth - hitboxToleranceCorrection,
                        frontSide: enemy.y
                    }

                    // console.log(flyingEnemy)

                    if((flyingMissile.alt >= flyingEnemy.frontSide) 
                        && (flyingMissile.peek > flyingEnemy.leftSide) && (flyingMissile.peek < flyingEnemy.rightSide)) {
                            
                            
                            missile.explode();
                            missileArr.splice(missileIndex, 1)
                            
                            // console.log(enemy.livesCount)
                            enemy.processBeingHit(missile.damage)

                            if(enemy.livesCount <= 0) {
                                enemyArr.splice(enemyIndex, 1);
                            }
                            this.scores += missile.damage;
                            domElements.scores.innerText = `Scores: ${this.scores}`;
                    }

                })
            })
        }, 5);
    }



    checkSpaceShipHit() {

    }

    enemyGenerator() {
        // random y
        const falcon = new Falcon(200, (window.innerHeight -100));
        this.enemies.push(falcon)
        
        const hawk = new Hawk(300, (window.innerHeight - 150));
        this.enemies.push(hawk)
        
        const hawk1 = new Hawk(500, (window.innerHeight - 250));
        this.enemies.push(hawk1)
        
        const hawk2 = new Hawk(700, (window.innerHeight - 350));
        this.enemies.push(hawk2)

        const destroyer = new Destroyer(500, (window.innerHeight - 200));
        this.enemies.push(destroyer)

        // console.log(this.enemies)
    }

    
}

window.onload = () => {
    const controller = new Controller();
    controller.initialization()
       
}