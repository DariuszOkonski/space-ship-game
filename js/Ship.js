export class Ship {
    constructor(x, y, livesCount, className) {
        this.x = x;
        this.y = y;
        this.livesCount = livesCount;
        this.className = className;
        this.htmlElement = null;
        this.initialization()
    }

    initialization() {
        this.createSpaceship()
    }

    createSpaceship() {
        const div = document.createElement('div')
        div.classList.add(this.className)        
        this.htmlElement = div;
    }
}