import { SpaceShip } from './SpaceShip.js';
import {htmlClasses} from './utilities.js';



class Controller {
    spaceship = null;

    constructor() {
        const halfScreen = window.innerWidth / 2;
        this.spaceship = new SpaceShip(0, halfScreen, 3, htmlClasses.spaceship);
    }
    
    initialization() {
        // console.log(this.spaceship)
    }
}

window.onload = () => {
    const controller = new Controller();
    controller.initialization()
       
}