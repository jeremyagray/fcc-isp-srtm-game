'use strict';

import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const width = 640;
const height = 480;
const bannerWidth = width;
const bannerHeight = 60;

let entities = {
  'players': [],
  'coins': [],
  'walls': [
    new Wall(0, bannerHeight),
    new Wall(width, 0),
    new Wall(0, height),
    new Wall(0, 0)
  ]
};

class Wall {
  constructor(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.radius = 0;
  }
}

class GoldCoin extends Collectible {
  constructor() {
    super({
      x: 100,
      y: 200,
      value: 10,
      id: Date.now()
    });

    this.name = 'gold';
    this.color = 'gold';
  }
}

class SilverCoin extends Collectible {
  constructor() {
    super({
      x: 100,
      y: 200,
      value: 10,
      id: Date.now()
    });

    this.name = 'silver';
    this.color = 'silver';
  }
}

class BronzeCoin extends Collectible {
  constructor() {
    super({
      x: 100,
      y: 200,
      value: 10,
      id: Date.now()
    });

    this.name = 'bronze';
    this.color = '#b08d57';
  }
}

// Draw the background.
context.fillStyle = 'black';
context.fillRect(0, 0, 640, 480);

context.strokeStyle = 'green';
context.strokeRect(0, 0, 640, 60);

let me = new Player({x: 20, y: 80, score: 0, id: Date.now()});
me.draw();
let him = new Player({x: 620, y: 460, score: 0, id: Date.now()});
him.draw('red', '&');

// Draw some coins.
let gc = new GoldCoin();
gc.move(100, 80);
gc.draw();

let sc = new SilverCoin();
sc.move(120, 80);
sc.draw();

let bc = new BronzeCoin();
bc.move(140, 80);
bc.draw();

// Draw some text.
context.fillStyle = 'green';
context.font = '48px Calibri';
context.fillText('coinhack',
                 320,
                 30);

// Player movement function.
document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  console.log(keyName);

  switch (keyName) {
  case 'Q':
  case 'q':
    me.blank();
    me.move('up');
    me.move('left');
    me.draw();
    break;

  case 'W':
  case 'w':
    me.blank();
    console.log('up');
    me.move('up');
    me.draw();
    break;

  case 'E':
  case 'e':
    me.blank();
    me.move('up');
    me.move('right');
    me.draw();
    break;

  case 'D':
  case 'd':
    me.blank();
    me.move('right');
    me.draw();
    break;

  case 'C':
  case 'c':
    me.blank();
    me.move('down');
    me.move('right');
    me.draw();
    break;

  case 'S':
  case 's':
  case 'X':
  case 'x':
    me.blank();
    me.move('down');
    me.draw();
    break;

  case 'Z':
  case 'z':
    me.blank();
    me.move('down');
    me.move('left');
    me.draw();
    break;

  case 'A':
  case 'a':
    me.blank();
    me.move('left');
    me.draw();
    break;

  default:
    break;
  }
}, false);
