import { SpaceShip } from './SpaceShip.js';
import {htmlClasses} from './utilities.js';



class Controller {
    spaceship = null;
    enemies = []
    intervalMissilesCleaner = null;
    

    constructor() {
        this.setGame();
        this.initialization();
    }
    
    initialization() {
       
        this.missileCleaningLoop();
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

    
}

window.onload = () => {
    const controller = new Controller();
    controller.initialization()
       
}