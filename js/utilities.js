
// HTML RELATED OBJECTS
export const imagesURLs = {
    bonusRocketReady: "img/bonus-missile.png",
    bonusTripleMissileReady: "img/bonus-three.png",
    rocketCannonsOverheated: "img/bonus-missile-overheated.png",
    tripleMissileCannonsOverheated: "img/bonus-three-overheated.png",
}

export const objectImgSizes = {
    spaceship: 96,
    destroyer: 128,
    hawk: 96,
    falcon: 64,
    missile: 40,
    missileRocket: 80,
    bonus: 96
}

export const htmlClasses = {
    spaceship: "spaceship",
    destroyer: "destroyer",
    hawk: "hawk",
    falcon: "falcon",
    missileRocket: "missile-rocket",
    missile: "missile",
    missileRed: "missile-red",
    spaceshipExplosion: "spaceship-explosion",
    falconExplosion: "falcon-explosion",
    hawkExplosion: "hawk-explosion",
    destroyerExplosion: "destroyer-explosion",
    missileExplosion: "missile-explosion",
    missileRocketExplosion: "missile-rocket-explosion",
    bonusEngine: "bonus-engine",
    bonusHeart: "bonus-heart",
    bonusMissile: "bonus-missile",
    bonusThree: "bonus-three"
}

export const domElements = {
    body: document.querySelector('body'),
    container: document.getElementById('container'),
    newGameButton: document.querySelector('[data-new-game-button]'),
    modal: document.querySelector('[data-modal]'),
    endScore: document.querySelector('[data-end-score]'),
    
    rocket: document.querySelector('[data-rocket]'),
    tripleMissile: document.querySelector('[data-triple-missile]'),
    hearts: document.querySelector('[data-heart]'),
    engine: document.querySelector('[data-engine]'),
    scores: document.querySelector('[data-scores]'),
    
    rocketImg: document.querySelector('[data-rocket-img]'),
    tripleMissileImg: document.querySelector('[data-triple-missile-img]'),
}

// GENERATORS INTERVALS
export const timeVariables = {
    enemiesGenerator: 2000,
    bonusGenerator: 15000,
    destroyerShooting: 2000,
    spaceshipTripleMissileCooldown: 3000,
    spaceshipRocketCooldown: 1500,

}

// SHIPS
export const shipsLivesCount = {
    spaceship: 3,
    falcon: 1,
    hawk: 3,
    destroyer: 7
}

export const spaceShipSpeeds = {
    regular: 8, 
    fast: 20
};

export const enemiesSpeed = {
    falcon: 2,
    hawk: 4,
    destroyer: 1,
}

// MISSILES
export const missilesSpeeds = {
    missile: 5,
    tripleMissile: 3,
    missileRocket: 2
}

export const missileDamage = {
    missile: 1,
    rocket: 3 
}

// BONUSES
export const bonusSpeed = {
    bonusHeart: 5,
    bonusEngine: 3,
    bonusThree: 7,
    bonusMissile: 6
}

export const bonusCount = {
    bonusHeart: 2,
    bonusEngine: 12000,
    bonusThree: 5,
    bonusMissile: 10
}

// HITBOX CORRECTIONS
export const hitBoxCorrections = {
    falcon: {x: 2, y: 20},
    hawk: {x: 6, y: 40},
    destroyer: {x: 13 , y: 50},
    missile: {x: 15, y: 10},
    missileRed: {x: 15, y: 10},
    missileRocket: {x: 30, y: 5},
    spaceship: {x:4, y: 96},
    bonus: {x: 15, y: 15}
}



export function convertHtmlClassNameToPropertyName(htmlClassString) {
    let words = htmlClassString.split('-');
    words.forEach((word, index, arr) => {
        if (index != 0) {
            arr[index] = `${word[0].toUpperCase() + word.slice(1, word.length)}`
        }
    })
    return words.join("");
}
