class Collectible {
  constructor({x, y, value, id}) {
    this.x = parseInt(arguments[0]['x']);
    this.y = parseInt(arguments[0]['y']);
    this.value = parseInt(arguments[0]['value']);
    this.id = arguments[0]['id'];
  }
}

try {
  module.exports = Collectible;
} catch(error) {}

export default Collectible;
