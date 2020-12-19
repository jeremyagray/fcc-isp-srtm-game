'use strict';

import {Player} from './Player.mjs';
import {Coin, Collectible} from './Collectible.mjs';
import {Wall} from './Wall.mjs';

const socket = io();
let gameId;
let playerId;
let me;

const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

// Connection event.
socket.on('connect', () => {
  console.log(`playerId:  ${socket.id}`);
  playerId = socket.id;
});

// Get the game ids.
socket.on('gameIds', function(data) {
  gameId = data['gameId'];
  console.log('client: ', data);
});

socket.on('gameInfo', function(data) {
  // console.log('client: ', data);

  // Draw the background.
  context.fillStyle = 'black';
  context.fillRect(data.top, data.left, data.right, data.bottom);

  // Draw the coins.
  // {x, y, value, id, radius}
  data.coins.map((coin) => {
    // console.log(coin);
    let newCoin = new Coin(coin.type, {
      'x': coin.x,
      'y': coin.y,
      'id': coin.id,
    });
    newCoin.draw();
  });

  // Draw the players.
  // {x, y, score, id, speed, radius}
  data.players.map((player) => {
    // console.log(player);
    let newPlayer = new Player({
      'x': player.x,
      'y': player.y,
      'score': player.score,
      'id': player.id,
      'speed': player.speed,
      'radius': player.radius
    });
    if (newPlayer.id === playerId) {
      newPlayer.draw();
      me = newPlayer;
      console.log(me.score);
    } else {
      newPlayer.draw('red', '&');
    }
  });
});

socket.on('spells', (data) => {
  console.log(`Someone cast a ${data.spell} spell!`);
});

// socket.emit('getGameIds', {'socketId': socket.id});

// const width = 640;
// const height = 480;
// const bannerWidth = width;
// const bannerHeight = 60;

// let entities = {
//   'players': [],
//   'coins': [],
//   'walls': [
//     new Wall(0, bannerHeight),
//     new Wall(width, 0),
//     new Wall(0, height),
//     new Wall(0, 0)
//   ]
// };

// // Draw the background.
// context.fillStyle = 'black';
// context.fillRect(0, 0, 640, 480);

// context.strokeStyle = 'green';
// context.strokeRect(0, 0, 640, 60);

// let me = new Player({x: 20, y: 80, score: 0, id: Date.now()});
// me.draw();
// let him = new Player({x: 620, y: 460, score: 0, id: Date.now()});
// him.draw('red', '&');

// // Draw some coins.
// let gc = new Coin('gold');
// gc.move(100, 80);
// gc.draw();

// let sc = new Coin('silver');
// sc.move(120, 80);
// sc.draw();

// let bc = new Coin();
// bc.move(140, 80);
// // bc.place();
// bc.draw();

// Draw some text.
// context.fillStyle = 'green';
// context.font = '48px Calibri';
// context.fillText('coinhack',
//                  320,
//                  30);

// Player controls.
document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  console.log(keyName);

  switch (keyName) {
  case 'Q':
  case 'q':
    // me.blank();
    me.move('up');
    me.move('left');
    // me.draw();
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'W':
  case 'w':
  case 'ArrowUp':
    console.log('up');
    me.move('up');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'E':
  case 'e':
    me.move('up');
    me.move('right');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'D':
  case 'd':
  case 'ArrowRight':
    me.move('right');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'C':
  case 'c':
    me.move('down');
    me.move('right');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'S':
  case 's':
  case 'X':
  case 'x':
  case 'ArrowDown':
    me.move('down');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'Z':
  case 'z':
    me.move('down');
    me.move('left');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'A':
  case 'a':
  case 'ArrowLeft':
    me.move('left');
    socket.emit('playerMove', {
      'x': me.x,
      'y': me.y,
      'score': me.score,
      'id': me.id,
      'speed': me.speed,
      'radius': me.radius
    });
    break;

  case 'f':
    socket.emit('spells', {'spell': 'freeze'});
    break;

  default:
    break;
  }
}, false);
