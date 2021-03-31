export const htmlClasses = {
    spaceship: "spaceship",
    destroyer: "destroyer",
    hawk: "hawk",
    missileRocket: "missile-rocket",
    missile: "missile",
    spaceshipExplosion: "spaceship-explosion",
    falconExplosion: "falcon-explosion",
    hawkExplosion: "hawk-explosion",
    destroyerExplosion: "destroyer-explosion",
    missileExplosion: "missile-explosion",
    missileRocketExplosion: "missile-rocket-explosion",
    bonusEngine: "bonus-engine",
    bonusHeart: "bonus-heart",
    bonusMissile: "bonus-missile",
}

export const domElements = {
    container: document.getElementById('container'),
    rocket: document.querySelector('[data-rocket]'),
    tripleMissile: document.querySelector('[data-triple-missile]'),
}


export const spaceShipSpeeds = {
    regular: 20, 
    fast: 5
};

export const missilesSpeeds = {
    missile: 5,
    tripleMissile: 3,
    missileRocket: 2
}