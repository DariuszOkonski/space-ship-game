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
    intervalEnemiesHitBottom = null; //Remember to clear interval
    intervalEnemiesGenerator = null;
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
                    enemy.remove();
                    arr.splice(index, 1);
                    this.processEnemyHitBottom();

                    if (this.spaceship.livesCount <= 0) {
                        clearInterval(this.intervalEnemiesHitBottom);
                        clearInterval(this.intervalEnemyHit);
                        // clearInterval(this.intervalMissilesCleaner);
                        this.spaceship.forbidShipActions();
                        this.spaceship.explode();
                        this.showGameOverScreen();
                    }
                }
            });            
        }, 100);

    }

    processEnemyHitBottom() {
        this.spaceship.livesCount--;
        domElements.hearts.innerText = this.spaceship.livesCount;
        domElements.container.classList.add('red');
        setTimeout(() => {
            domElements.container.classList.remove('red');
        }, 150);
    }

    checkEnemyHit() {
        this.intervalEnemyHit = setInterval(() => {
            this.spaceship.missiles.forEach((missile, missileIndex, missileArr) => {
                const flyingMissile = missile.getHitBox();

                this.enemies.forEach((enemy, enemyIndex, enemyArr) => {
                    const flyingEnemy = enemy.getHitBox();
                    
                    if((flyingMissile.alt >= flyingEnemy.frontSide) 
                        && (flyingMissile.peek > flyingEnemy.leftSide) 
                        && (flyingMissile.peek < flyingEnemy.rightSide)) {
                             
                            missile.explode();
                            missileArr.splice(missileIndex, 1)                            
                            enemy.processBeingHit(missile.damage)
                            this.updateScores(missile.damage);

                            
                            if(enemy.livesCount <= 0) {
                                enemyArr.splice(enemyIndex, 1);
                            }
                    }
                })
            })
        }, 5);
    }

    checkSpaceShipHit() {

    }
    updateScores(damage) {
        this.scores += damage;
        domElements.scores.innerText = `Scores: ${this.scores}`;
    }
    // enemyGenerator() {
    //     // random y
    //     const falcon = new Falcon(200, (window.innerHeight -100));
    //     this.enemies.push(falcon)
        
    //     const hawk = new Hawk(300, (window.innerHeight - 150));
    //     this.enemies.push(hawk)
        
    //     const hawk1 = new Hawk(500, (window.innerHeight - 250));
    //     this.enemies.push(hawk1)
        
    //     const hawk2 = new Hawk(700, (window.innerHeight - 350));
    //     this.enemies.push(hawk2)

    //     const destroyer = new Destroyer(500, (window.innerHeight - 200));
    //     this.enemies.push(destroyer)

    //     // console.log(this.enemies)
    // }

    enemyGenerator() {
        // random y
       
        this.intervalEnemiesGenerator = setInterval(() => {
            let drawnNumber = Math.random();
         
            if (drawnNumber < 0.35) {
                let drawnShipX = Math.floor(Math.random() * window.innerWidth) - 32; 
                const falcon = new Falcon(drawnShipX, (window.innerHeight - 100));
                    this.enemies.push(falcon)
            }
            else if (drawnNumber < 0.7){
                let drawnShipX = Math.floor(Math.random() * window.innerWidth) - 48; 
                const hawk = new Hawk(drawnShipX, (window.innerHeight - 100));
                    this.enemies.push(hawk)
            }
            else {
                let drawnShipX = Math.floor(Math.random() * window.innerWidth) - 64; 
                const destroyer = new Destroyer(drawnShipX, (window.innerHeight - 100));
                    this.enemies.push(destroyer)
            }
           
        }, 2000);
        // console.log(this.enemies)
    }


    
    showGameOverScreen() {
        setTimeout(() => {
            domElements.endScore.innerText = this.scores;
            domElements.modal.classList.remove('hide');
            this.setNewGameButtonListener();
        }, 1000);
    }
    
    setNewGameButtonListener() {
        domElements.newGameButton.addEventListener('click', () => {
            window.location.reload(true);
        })
    }

}

function main() {
    let controller = null;
    controller = new Controller();
    controller.initialization();
}


window.onload = () => {
    main();
}