import { SpaceShip } from './SpaceShip.js';
import { bonusCount, domElements, htmlClasses, timeVariables, objectImgSizes } from './utilities.js';
import { Falcon } from './Falcon.js';
import { Hawk } from './Hawk.js';
import { Destroyer } from './Destroyer.js';
import { Bonus } from './Bonus.js';



class Controller {
    spaceship = null;
    enemies = [];
    bonuses = [];
    scores = null;
    intervalMissilesCleaner = null; 
    intervalEnemyHit = null;
    intervalEnemiesHitBottom = null; 
    intervalEnemiesGenerator = null;
    intervalBonusGenerator = null;
    intervalBonusCollision = null;

    constructor() {
        this.setGame();
    }
    
    initialization() {  
        this.checkEnemyHit();   
        this.missileCleaningLoop();
        this.bonusGenerator();
        this.enemyGenerator();
        this.enemiesCleaningLoop();
        this.checkBonusShipCollision();
    }    

    setGame() {
        clearInterval(this.intervalMissilesCleaner);
        clearInterval(this.intervalEnemiesGenerator);
        clearInterval(this.intervalEnemyHit);
        clearInterval(this.intervalEnemiesHitBottom);
        clearInterval(this.intervalBonusGenerator);
        clearInterval(this.intervalBonusCollision);
        
        this.scores = 0;
        const positionX = (window.innerWidth / 2) - (objectImgSizes.spaceship / 2);
        const positionY = 0;
        
        this.spaceship = new SpaceShip(positionX, positionY);
        this.setStatsCountsInHtmlDivs();
    }
    
    // Generators intervals setting
    enemyGenerator() {       
        this.intervalEnemiesGenerator = setInterval(() => {
            let randomTimeout = Math.floor(Math.random() * 3) * 1000;
            setTimeout(() => {
                let drawnNumber = Math.random();
                let enemyShip = null;
                let drawnShipX = Math.floor(Math.random() * window.innerWidth);
                let shipY = window.innerHeight - 100;

                if (drawnNumber < 0.45) {
                    enemyShip = new Falcon(drawnShipX - objectImgSizes.falcon /2, shipY);
                }
                else if (drawnNumber < 0.8){
                    enemyShip = new Hawk(drawnShipX - objectImgSizes.hawk / 2, shipY);
                }
                else {
                    enemyShip = new Destroyer(drawnShipX - objectImgSizes.destroyer / 2, shipY);
                }
                this.enemies.push(enemyShip)
            }, randomTimeout);
        }, timeVariables.enemiesGenerator);
    }

    bonusGenerator() {
        this.intervalBonusGenerator = setInterval(() => {
            const randomBonus = Math.random();

            let bonus = null;
            if(randomBonus < 0.25) {

                bonus = new Bonus(htmlClasses.bonusHeart, bonusCount.bonusHeart);
            } else if (randomBonus < 0.5) {
                
                bonus = new Bonus(htmlClasses.bonusEngine, bonusCount.bonusEngine);
            } else if (randomBonus < 0.75) {

                bonus = new Bonus(htmlClasses.bonusMissile, bonusCount.bonusMissile);
            } else {
                
                bonus = new Bonus(htmlClasses.bonusThree, bonusCount.bonusThree);
            }
            this.bonuses.push(bonus);
        }, timeVariables.bonusGenerator);
    }

    // Objects contacts checking and cleaning DOM intervals setting
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
        this.spaceship.processBeingHit(1);
        this.displayPlayersLiveLossAnimation();
    }


    checkBonusShipCollision() {
        this.intervalBonusCollision = setInterval(() => {
            this.bonuses.forEach((bonus, index, bonusArr) => {
                
                // remove bonus when below screen
                if(bonus.htmlElement == null) {
                    bonusArr.splice(index, 1);
                
                } else if(this.isObjectInHitBox(bonus.getHitBox(), this.spaceship.getHitBox(), true)) {                   

                    this.spaceship.collectBonus(bonus);
                    this.updateBonusCountsInHtml(bonus.className);              
                    bonusArr.splice(index, 1);         
                    bonus.remove();           
                }
            })
        }, 20);   
    }

    missileCleaningLoop() {
        this.intervalMissilesCleaner = setInterval(() => {
        try {
            this.checkSpaceshipsMissiles();
            this.checkEnemiesMissiles();
        } catch {
            console.log("Catched type error")
        }
        }, 100);
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
            if (enemy.shootingUnit && this.spaceship.livesCount != 0) {
                enemy.missiles.forEach((missile, index, arr) => {               
                    
                    if (this.isObjectInHitBox(missile.getHitBox(), this.spaceship.getHitBox(), true)) {
            
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

    checkEnemyHit() {
        this.intervalEnemyHit = setInterval(() => {
            this.spaceship.missiles.forEach((missile, missileIndex, missileArr) => {
                const missileHitBox = missile.getHitBox();

                this.enemies.forEach((enemy, enemyIndex, enemyArr) => {
                    const enemyHitBox = enemy.getHitBox();
                    
                    if (this.isObjectInHitBox(missileHitBox, enemyHitBox)) {
                        
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

    processHittingOpponentShip(missile, missileArr, missileIndex, enemy) {
        missile.explode();
        enemy.processBeingHit(missile.damage);
        missileArr.splice(missileIndex, 1);                       
    }

    // Additional help functions
    isObjectInHitBox(movingObjectHitBox, shipHitBox, movingObjectFromTop=false) {
        const movingOjbectBetweenLeftAndRightX = 
            (movingObjectHitBox.rightSide >= shipHitBox.leftSide) && 
            (movingObjectHitBox.leftSide <= shipHitBox.rightSide)
        let movingObjectPassedFrontSideY = null;

        if (!movingObjectFromTop) {
            movingObjectPassedFrontSideY = (movingObjectHitBox.top >= shipHitBox.frontSide)  
        } else {
            movingObjectPassedFrontSideY = (movingObjectHitBox.top <= shipHitBox.frontSide)          
        }
        return movingOjbectBetweenLeftAndRightX && movingObjectPassedFrontSideY
    }

    setStatsCountsInHtmlDivs() {
        domElements.hearts.innerText = `${this.spaceship.livesCount}`;
        domElements.rocket.innerText = `${this.spaceship.rocketCount}`;
        domElements.tripleMissile.innerText = `${this.spaceship.trippleMissleCount}`;
        domElements.engine.innerText = `${this.spaceship.speedUpCounter}`;
    }

    updateScores(damage) {
        this.scores += damage;
        domElements.scores.innerText = `Scores: ${this.scores}`;
    }

    updateBonusCountsInHtml(bonusClassName) {
        switch (bonusClassName) {
            case htmlClasses.bonusHeart:
                domElements.hearts.innerText = `${this.spaceship.livesCount}`;
                break;
        
            case htmlClasses.bonusThree:
                domElements.tripleMissile.innerText = `${this.spaceship.trippleMissleCount}`;                
                break;
        
            case htmlClasses.bonusMissile:
                domElements.rocket.innerText = `${this.spaceship.rocketCount}`;
                break;
        }
    }

    displayPlayersLiveLossAnimation() {
        domElements.hearts.innerText = this.spaceship.livesCount;
        domElements.container.classList.add('red');
        setTimeout(() => {
            domElements.container.classList.remove('red');
        }, 150);
    }

    processPlayersLoss() {
        clearInterval(this.intervalMissilesCleaner);
        clearInterval(this.intervalEnemyHit);
        clearInterval(this.intervalEnemiesGenerator)
        clearInterval(this.intervalEnemiesHitBottom);
        clearInterval(this.intervalBonusGenerator);
        clearInterval(this.intervalBonusCollision);
        this.enemies.forEach(enemy => {
            if (enemy.shootingUnit) {
                setTimeout(() => {
                    clearInterval(enemy.intervalShooting);
                }, 5000);
            }
        });
        this.showGameOverScreen();
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