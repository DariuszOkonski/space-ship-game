export const htmlClasses = {
    spaceship: "spaceship",
    destroyer: "destroyer",
    hawk: "hawk",
    falcon: "falcon",
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
    body: document.querySelector('body'),
    container: document.getElementById('container'),
    modal: document.querySelector('[data-modal]'),
    endScore: document.querySelector('[data-end-score]'),
    rocket: document.querySelector('[data-rocket]'),
    tripleMissile: document.querySelector('[data-triple-missile]'),
    hearts: document.querySelector('[data-heart]'),
    engine: document.querySelector('[data-engine]'),
    scores: document.querySelector('[data-scores]')
}



export const spaceShipSpeeds = {
    regular: 5, 
    fast: 20
};

export const enemiesSpeed = {
    falcon: 2,
    hawk: 10,
    destroyer: 1,
}

export const shipsLivesCount = {
    spaceship: 3,
    falcon: 1,
    hawk: 3,
    destroyer: 7
}

export const missilesSpeeds = {
    missile: 5,
    tripleMissile: 3,
    missileRocket: 2
}

export const missileDamage = {
    missile: 1,
    rocket: 3 
}