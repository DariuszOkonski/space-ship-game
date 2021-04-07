import { Enemy } from './Enemy.js';
import { enemiesSpeed, htmlClasses, missileDamage, shipsLivesCount } from './utilities.js';

export class Destroyer extends Enemy {
    constructor(x, y) {
        super(x, y, shipsLivesCount.destroyer, htmlClasses.destroyer, enemiesSpeed.destroyer)
        // this.htmlElement = null;
        this.shootingUnit = true;
        this.missiles = [];
        this.intervalShooting = null;
        this.shootingLoop();
    }   

    shootSingleMissile() {
        this.createMissile(
            '--missile-size',
            htmlClasses.missileRed,
            true,
            missileDamage.missile,
        );
    }

    shootingLoop() {
        this.intervalShooting = setInterval(() => {
            setTimeout(() => {
                this.shootSingleMissile();    
            }, Math.random() * 1200);
            
        }, 2000);
    }

    remove() {
        clearInterval(this.intervalShooting);
        super.remove();
    }

    explode() {
        clearInterval(this.intervalShooting);
        super.explode();
    }
}