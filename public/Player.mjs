'use strict';

class Player {
  constructor({x, y, score, id, speed, radius}) {
    this.x = parseInt(arguments[0]['x']);
    this.y = parseInt(arguments[0]['y']);
    this.score = parseInt(arguments[0]['score']);
    this.id = arguments[0]['id'];
    this.speed = parseInt(arguments[0]['speed']) || 1;
    this.radius = parseInt(arguments[0]['radius']) || 12;
    this.level = 1;
  }

  movePlayer(dir, speed) {
    return this.move(dir, speed);
  }

  move(dir, speed = this.speed) {
    switch (dir) {
    case 'up':
      this.y -= parseInt(speed);
      break;
    case 'down':
      this.y += parseInt(speed);
      break;
    case 'left':
      this.x -= parseInt(speed);
      break;
    case 'right':
      this.x += parseInt(speed);
      break;
    default:
      break;
    }

    return {
      'x': this.x,
      'y': this.y
    };
  }

  collision(item) {
    const distance = Math.sqrt(Math.pow(this.x - item.x, 2)
                               + Math.pow(this.y - item.y, 2));

    if (distance <= (this.radius + item.radius)) {
      return true;
    } else {
      return false;
    }
  }

  calculateRank(arr) {
    const players = [...arr];
    players.sort((a, b) => {
      if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      } else {
        return 0;
      }
    });

    const rank = players.reduce((rank, player, ind) => {
      if (player.id === this.id) {
        rank = ind + 1;
      }
      return rank;
    }, 0);

    return `Rank: ${rank}/${players.length}`;
  }

  blank() {
    const canvas = document.getElementById('game-window');
    const context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.stroke();

    return;
  }

  draw(color = 'white', avatar = '@') {
    const canvas = document.getElementById('game-window');
    const context = canvas.getContext('2d');

    context.fillStyle = color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.fill();
    context.fillStyle = 'black';
    context.font = '24px Calibri';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(avatar,
                     this.x,
                     this.y);
    return;
  }
}

export {
  Player
};

export default Player;
