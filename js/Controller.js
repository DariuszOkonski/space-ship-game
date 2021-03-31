import { SpaceShip } from './SpaceShip.js';
import {htmlClasses} from './utilities.js';



class Controller {
    spaceship = null;
    enemies = []
    intervalMissilesCleaner = null;
    

    constructor() {
        this.initialization()
    }
    
    initialization() {
        const halfScreen = window.innerWidth / 2;
        this.spaceship = new SpaceShip(0, halfScreen, 3, htmlClasses.spaceship);

        this.missileCleaningLoop();
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