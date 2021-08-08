# Moves 
- left move: "<-" left arrow
- right move: "->" right arrow
- single shoot: "space"
- triple shoot: "Q"
- missile: "W"

# RULES

GENERAL
- players spaceship loosing life when enemy touch bottom of the screen
- ship objects loosing life when hit by missile
- when no lives end game
- each hitting enemies ship increase point of missiles damage


Based on abstract class Ship {

    1. SPACESHIP
    - size 96x96
    - moving right left
    - small missle (1 dmg, fast), unlimited
    - special weapons - can gather them when catching bonuses 
        - tripple missile, each one (1 dmg, fast), limited 
        - rocket missile (5 dmg, slow), limited
    - special weapons cooldowns - spaceship overheat system
        - rocket cannot be launched often than one for 1.5sec
        - tripple missiles blocked while player have shooted over 20 missiles on screen 

    2.ENEMIES
    - enemies show up every randomely every 2-5 seconds
    - bonuses show up every 15 seconds
    - Types of enemies:
        1. Falcon - 1 live, size 64x64, speed - medium,
        2. Hawk - 3 lives, size 96x96, speed - fast,
        3. Destroyer - 7 lives, size 128x128, speed - slow, shooting small missiles in random periods,
}

Additional classes objects {
    3. MISSILES
    - one class responsible for missiles and its behaviour
    - varying based on className 
    - move correctly both for players spaceship and enemies shooting units

    4.BONUSES
    - each 96x96 size
    - moving from top to bottom
    - collecting increase corresponding spaceship statistics or temporarily increase speed
    - types:
        - bonus live
        - bonus rockets
        - bonus tripple missile
        - bonus speed up

    5. CONTROLLER
    - class responsible for controlling games progress - from start to losing and then starting  next game
    - containts numbers of intervals which check missiles collision, enemies passing bottom, cleaning unneccesary objects and updating elements 
}


6. EXTRA FEATURES {
    - utilities.js module which stores as objects all commonly used data, objects properties values:
        - all commonly used data such as HTML classes, references to DOM objects
        - statistics of objects: 
            - ships lives counts, 
            - speed values, 
            - bonus counts, 
            - missiles damages
            - etc.
        - default time variables:
            - base period for generating enemies
            - period for generating bonuses
            - periods for enemy shooting unit shooting
            - special weapons cooldowns
        - object with corrections of hit box of objects (values used to adjust hit area to the part of html div actually filled with image)
        - function translating HTML naming '-' conventions class names to javascript camel convention
    - Generation of correct hit boxes of each collision-able object - used to trigger collision in moment which results in exploding missile in part of div taken by image
    - Animated ships, missiles and their explosions  
}
