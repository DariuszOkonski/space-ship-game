import { Ship } from './Ship.js';

export class Enemy extends Ship {
    constructor(x, y, livesCount, className) {
        super(x, y, livesCount, className);
        this.speedY = 0;
    }
}