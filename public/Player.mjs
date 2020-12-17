class Player {
  constructor({x, y, score, id}) {
    this.x = parseInt(arguments[0]['x']);
    this.y = parseInt(arguments[0]['y']);
    this.score = parseInt(arguments[0]['score']);
    this.id = arguments[0]['id'];
  }

  movePlayer(dir, speed) {
    switch (dir) {
    case 'up':
      this.y += parseInt(speed);
      break;
    case 'down':
      this.y -= parseInt(speed);
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

  }

  calculateRank(arr) {

  }
}

export default Player;
