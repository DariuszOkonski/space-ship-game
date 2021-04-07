export const imagesURLs = {
    bonusRocketReady: "img/bonus-missile.png",
    bonusTripleMissileReady: "img/bonus-three.png",
    rocketCannonsOverheated: "img/bonus-missile-overheated.png",
    tripleMissileCannonsOverheated: "img/bonus-three-overheated.png",
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
}

export const domElements = {
    body: document.querySelector('body'),
    container: document.getElementById('container'),
    newGameButton: document.querySelector('[data-new-game-button]'),
    modal: document.querySelector('[data-modal]'),
    endScore: document.querySelector('[data-end-score]'),
    rocket: document.querySelector('[data-rocket]'),
    rocketImg: document.querySelector('[data-rocket-img]'),
    tripleMissile: document.querySelector('[data-triple-missile]'),
    tripleMissileImg: document.querySelector('[data-triple-missile-img]'),
    hearts: document.querySelector('[data-heart]'),
    engine: document.querySelector('[data-engine]'),
    scores: document.querySelector('[data-scores]')
}

export const bonusSpeed = {
    hearts: 5,
    engines: 3,
    trippleMissile: 7,
    rocketMissile: 6
}

export const spaceShipSpeeds = {
    regular: 5, 
    fast: 20
};

export const enemiesSpeed = {
    falcon: 2,
    hawk: 6,
    destroyer: 1,
}

export const shipsLivesCount = {
    spaceship: 2,
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


export const hitBoxCorrections = {
    falcon: {x: 2, y: 20},
    hawk: {x: 6, y: 40},
    destroyer: {x: 13 , y: 50},
    missile: {x: 15, y: 10},
    missileRed: {x: 15, y: 10},
    missileRocket: {x: 30, y: 5},
    spaceship: {x:4, y: 96}
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
