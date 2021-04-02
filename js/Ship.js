export class Ship {
    constructor(x, y, livesCount, className) {
        this.x = x;
        this.y = y;
        this.livesCount = livesCount;
        this.className = className;
        this.intervalMovement = null;
    }

    processBeingHit(damage) {
        this.livesCount -= damage

        if(this.livesCount <= 0) {
            this.explode();
        }
    }

    explode() {
        this.htmlElement.classList.remove(this.className);
        this.className = `${this.className}-explosion`;
        this.htmlElement.classList.add(this.className);
        setTimeout(() => {
            this.htmlElement.remove();
            clearInterval(this.intervalMovement);
        }, 1000);
    }
}