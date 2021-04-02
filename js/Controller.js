import { SpaceShip } from './SpaceShip.js';
import {enemiesSpeed, htmlClasses} from './utilities.js';
import { Falcon } from './Falcon.js';
import { Hawk } from './Hawk.js';
import { Destroyer } from './Destroyer.js';



class Controller {
    spaceship = null;
    enemies = []
    intervalMissilesCleaner = null;
    

    constructor() {
        this.setGame();
        // this.initialization();
    }
    
    initialization() {        
        this.missileCleaningLoop();
        this.enemyGenerator();
    }

    setGame() {
        // set spaceship
        clearInterval(this.intervalMissilesCleaner);
        const halfScreen = window.innerWidth / 2;
        this.spaceship = new SpaceShip(0, halfScreen, 3, htmlClasses.spaceship);

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

    enemyGenerator() {
        // random y
        const falcon = new Falcon(200, 0);
        this.enemies.push(falcon)
        
        const hawk = new Hawk(300, 0);
        this.enemies.push(hawk)

        const destroyer = new Destroyer(500, 0);
        this.enemies.push(destroyer)

        console.log(this.enemies)
    }

    
}

window.onload = () => {
    const controller = new Controller();
    controller.initialization()
       
}