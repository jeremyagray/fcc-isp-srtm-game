'use strict';

class Collectible {
  constructor({x, y, value, id}, radius = 8) {
    this.x = parseInt(arguments[0]['x']);
    this.y = parseInt(arguments[0]['y']);
    this.value = parseInt(arguments[0]['value']);
    this.id = arguments[0]['id'];
    this.radius = parseInt(radius);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const canvas = document.getElementById('game-window');
    const context = canvas.getContext('2d');

    context.fillStyle = this.color || 'white';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
  }
}

try {
  module.exports = Collectible;
} catch(error) {}

export default Collectible;
