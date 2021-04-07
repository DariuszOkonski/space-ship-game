import { SpaceShip } from './SpaceShip.js';
import {bonusSpeed, domElements, enemiesSpeed, htmlClasses} from './utilities.js';
import { Falcon } from './Falcon.js';
import { Hawk } from './Hawk.js';
import { Destroyer } from './Destroyer.js';
import { Bonus } from './Bonus.js';



class Controller {
    spaceship = null;
    enemies = [];
    bonuses = [];
    scores = null;
    intervalMissilesCleaner = null; // Remeber to clear interval
    intervalEnemyHit = null; //Remember to clear interval
    // intervalSpaceShipHit = null; // Remeber to clea interval
    intervalEnemiesHitBottom = null; //Remember to clear interval
    intervalEnemiesGenerator = null;
    intervalBonusGenerator = null;

    constructor() {
        this.setGame();
        // this.initialization();
    }
    
    initialization() {  
        console.log('init')   
        this.checkEnemyHit();   
        this.missileCleaningLoop();
        this.bonusGenerator();
        // this.enemyGenerator();
        // this.enemiesCleaningLoop();
        
    }    

    setGame() {
        // set spaceship
        clearInterval(this.intervalMissilesCleaner);
        clearInterval(this.intervalEnemyHit);
        clearInterval(this.intervalSpaceShipHit);
        clearInterval(this.intervalEnemiesHitBottom);
        clearInterval(this.intervalBonusGenerator);
        
        this.scores = 0;
        const positionX = window.innerWidth / 2;
        const positionY = 0;
        this.spaceship = new SpaceShip(positionX, positionY);
    }
    
    bonusGenerator() {
        this.intervalBonusGenerator = setInterval(() => {
            const randomBonus = Math.random();

            let bonus = null;
            if(randomBonus < 0.25) {
                bonus = new Bonus('bonus-heart', 1)
            } else if (randomBonus < 0.5) {
                bonus = new Bonus('bonus-engine', 5000)
            } else if (randomBonus < 0.75) {
                bonus = new Bonus('bonus-missile', 3)
            } else {
                bonus = new Bonus('bonus-three', 10)
            }

            this.bonuses.push(bonus);
            
            this.bonuses.forEach((bonus, index, bonusArr) => {             
                
                if(bonus.htmlElement == null) {
                    bonusArr.splice(index, 1);
                }
            })

        }, 2000);
    }

    checkEnemyHit() {
        this.intervalEnemyHit = setInterval(() => {
            this.spaceship.missiles.forEach((missile, missileIndex, missileArr) => {
                const missileHitBox = missile.getHitBox();

                this.enemies.forEach((enemy, enemyIndex, enemyArr) => {
                    const enemyHitBox = enemy.getHitBox();
                    
                    if (this.isMissileInHitBox(missileHitBox, enemyHitBox)) {
                        
                        this.processHittingOpponentShip(missile, missileArr, missileIndex, enemy);
                        this.updateScores(missile.damage);
                        
                        if(enemy.livesCount <= 0) {
                            enemyArr.splice(enemyIndex, 1);
                        }
                    }
                })
            })
        }, 5);
    }

    missileCleaningLoop() {
        this.intervalMissilesCleaner = setInterval(() => {
            this.checkSpaceshipsMissiles();
            this.checkEnemiesMissiles();
        }, 200);
    }

    checkSpaceshipsMissiles() {
        this.spaceship.missiles.forEach((missile, index, arr) => {
            if (missile.y >= window.innerHeight) {
                missile.remove();
                arr.splice(index, 1);
            }
        });
    }

    checkEnemiesMissiles() {
        this.enemies.forEach(enemy => {
            if (enemy.shootingUnit && this.spaceship) {
                enemy.missiles.forEach((missile, index, arr) => {               
                    const spaceShipHitBox = this.spaceship.getHitBox();
                    const enemyMissileHitBox = missile.getHitBox();
                    
                    if (this.isMissileInHitBox(enemyMissileHitBox, spaceShipHitBox, true)) {
                        this.processHittingOpponentShip(missile, arr, index, this.spaceship);
                        this.displayPlayersLiveLossAnimation();

                        if (this.spaceship.livesCount <= 0) {
                            this.processPlayersLoss();
                        }
                    }
                    
                    if (missile.y < 0) {
                        missile.remove();
                        arr.splice(index, 1);
                    }
                });
            }
        });
    }

    enemiesCleaningLoop() {
        this.intervalEnemiesHitBottom = setInterval(() => {
            this.enemies.forEach((enemy, index, arr) => {
                if(enemy.y <= (0 - enemy.htmlElement.clientHeight)) {                    
                    enemy.remove();
                    arr.splice(index, 1);
                    this.processEnemyHitBottom();

                    if (this.spaceship.livesCount <= 0) {
                        this.processPlayersLoss();
                    }
                }
            });            
        }, 1000);

    }


    processEnemyHitBottom() {
        this.spaceship.livesCount--;
        this.displayPlayersLiveLossAnimation();
    }

    processPlayersLoss() {
        clearInterval(this.intervalEnemiesHitBottom);
        clearInterval(this.intervalEnemyHit);
        clearInterval(this.intervalMissilesCleaner);
        this.spaceship.forbidShipActions();
        this.spaceship.explode();
        this.showGameOverScreen();
    }

    displayPlayersLiveLossAnimation() {
        domElements.hearts.innerText = this.spaceship.livesCount;
        domElements.container.classList.add('red');
        setTimeout(() => {
            domElements.container.classList.remove('red');
        }, 150);
    }

    processHittingOpponentShip(missile, missileArr, missileIndex, enemy) {
        missile.explode();
        enemy.processBeingHit(missile.damage)
        missileArr.splice(missileIndex, 1)                            
    }

    isMissileInHitBox(missileHitBox, shipHitBox, isEnemyShooting=false) {
        let missileInShipHitBox = null;
        if (!isEnemyShooting) {
            missileInShipHitBox = 
                    (missileHitBox.top >= shipHitBox.frontSide) && 
                    (missileHitBox.rightSide >= shipHitBox.leftSide) && 
                    (missileHitBox.leftSide <= shipHitBox.rightSide)
        } else {
            missileInShipHitBox = 
                    (missileHitBox.top <= shipHitBox.frontSide) && 
                    (missileHitBox.rightSide >= shipHitBox.leftSide) && 
                    (missileHitBox.leftSide <= shipHitBox.rightSide)
        }
        return missileInShipHitBox
    }
   
    updateScores(damage) {
        this.scores += damage;
        domElements.scores.innerText = `Scores: ${this.scores}`;
    }

    checkSpaceShipHit() {

    }
   

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