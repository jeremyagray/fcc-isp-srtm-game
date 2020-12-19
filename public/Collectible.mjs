'use strict';

class Collectible {
  constructor({x, y, value, id, radius}) {
    this.x = parseInt(arguments[0]['x']);
    this.y = parseInt(arguments[0]['y']);
    this.value = parseInt(arguments[0]['value']) || 1;
    this.id = arguments[0]['id'];
    this.radius = parseInt(radius) || 8;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const canvas = document.getElementById('game-window');
    const context = canvas.getContext('2d');

    // console.log('drawing coin');
    context.fillStyle = this.color || 'white';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
  }
}

class Coin extends Collectible {
  constructor(type, {x, y, value, id, radius}) {
    super({
      x: parseInt(arguments[1]['x']),
      y: parseInt(arguments[1]['y']),
      value: 0,
      id: arguments[1]['id'],
    });

    // Create the correct type coin.
    switch (type) {
    case 'gold':
      this.name = 'gold';
      this.color = 'gold';
      this.value = 10;
      break;
    case 'silver':
      this.name = 'silver';
      this.color = 'silver';
      this.value = 2;
      break;
    default:
      this.name = 'bronze';
      this.color = '#b08d57';
      this.value = 1;
      break;
    }
  }

  // Randomly place coin.
  // place() {
  //   let bounds = {};
  //   socket.emit('getGameBounds', 'boo');
  //   socket.on('gameBounds', function(data) {
  //     bounds = data;
  //   });
    
  //   this.x = Math.floor(Math.random() * ((bounds.right - this.radius) - (bounds.left + this.radius) + 1));
  //   this.y = Math.floor(Math.random() * ((bounds.bottom - this.radius) - (bounds.top + this.radius) + 1));
  // }
}

try {
  module.exports = Collectible;
} catch(error) {}

export {
  Coin,
  Collectible
};

export default Collectible;
