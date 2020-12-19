'use strict';

let io;
let socket;

function getCoin(player, coin) {
  const distance = Math.sqrt(Math.pow(player.x - coin.x, 2)
                             + Math.pow(player.y - coin.y, 2));

  if (distance <= (player.radius + coin.radius)) {
    return true;
  } else {
    return false;
  }
}

// {x, y, value, id, radius}
function generateCoins(n) {
  let coins = [];

  for (let i = 0; i < n; i++) {
    let choice = Math.random();
    let now = new Date();

    if (choice >= 0.90) {
      coins.push({
        'type': 'gold',
        'x': Math.floor(Math.random() * (632 - 8 + 1) + 8),
        'y': Math.floor(Math.random() * (472 - 8 + 1) + 8),
        'value': 10,
        'id': now.getTime() + i,
        'radius': 8
      });
    } else if (choice >= 0.70) {
      coins.push({
        'type': 'silver',
        'x': Math.floor(Math.random() * (632 - 8 + 1) + 8),
        'y': Math.floor(Math.random() * (472 - 8 + 1) + 8),
        'value': 2,
        'id': now.getTime() + i,
        'radius': 8
      });
    } else {
      coins.push({
        'type': 'bronze',
        'x': Math.floor(Math.random() * (632 - 8 + 1) + 8),
        'y': Math.floor(Math.random() * (472 - 8 + 1) + 8),
        'value': 1,
        'id': now.getTime() + i,
        'radius': 8
      });
    }

  }

  return coins;
}

// {x, y, score, id, speed, radius}
function spawnPlayer(id) {
  return {
    'x': Math.floor(Math.random() * (632 - 8 + 1) + 8),
    'y': Math.floor(Math.random() * (472 - 8 + 1) + 8),
    'score': 0,
    'id': id,
    'speed': 1,
    'radius': 12
  };
}

const gameId = Math.floor(Math.random() * 100000000);
const gameInfo = {
  'top': 0,
  'right': 640,
  'bottom': 480,
  'left': 0,
  'coins': generateCoins(5),
  'players': []
};

exports.initialize = function(i, s) {
  io = i;
  socket = s;
  console.log('server: A player connected.');
  console.log('server: ', {'gameId': gameId, 'socketId': socket.id});
  socket.emit('gameIds', {'gameId': gameId, 'socketId': socket.id});
  gameInfo.players.push(spawnPlayer(socket.id));
  socket.emit('gameInfo', gameInfo);

  // Events.
  socket.on('getGameIds', getGameIds);

  socket.on('spells', (data) => {
    console.log(`A player cast a ${data.spell} spell!`);
  });

  socket.on('playerMove', (data) => {
    let player;

    // Update coordinates.
    for (let i = 0; i < gameInfo.players.length; i++) {
      if (gameInfo.players[i].id === data.id) {
        player = i;
        if (data.x >= 12 && data.x <= 628) {
          gameInfo.players[i].x = data.x;
        } else if (data.x < 12) {
          gameInfo.players[i].x = 12;
        } else if (data.x > 628) {
          gameInfo.players[i].x = 628;
        }
        if (data.y >= 12 && data.y <= 468) {
          gameInfo.players[i].y = data.y;
        } else if (data.y < 12) {
          gameInfo.players[i].y = 12;
        } else if (data.y > 468) {
          gameInfo.players[i].y = 468;
        }
        break;
      }
    }

    // Check for collisions.
    gameInfo.coins = gameInfo.coins.filter((coin) => {
      if (getCoin(gameInfo.players[player], coin)) {
        gameInfo.players[player].score += coin.value;
        return false;
      } else {
        return true;
      }
    });

    // Generate new coins if necessary.
    if (gameInfo.coins.length < 5) {
      let num = Math.floor(Math.random() * (10 - 5 + 1) + 5);
      gameInfo.coins = gameInfo.coins.concat(generateCoins(num));
    }

    // Level up!
    gameInfo.players[player].speed = 1 + Math.floor(gameInfo.players[player].score / 10);

    // Update clients.
    socket.emit('gameInfo', gameInfo);
  });

  // socket.on('getGameBounds', getGameBounds);
  // socket.on('gotCoin', (data) => {
  //   gotCoin(data);
  // })

  return;
}

// function getGameBounds() {
//   this.emit('gameBounds', {
//     'top': 0,
//     'right': 640,
//     'bottom': 480,
//     'left': 0
//   });
// }

function getGameIds() {
  this.emit('gameIds', {'gameId': gameId, 'socketId': this.id});
}

function dropCoin() {
  this.broadcast.emit('coins', {'type': 'gold', 'id': Date.now()});
}

// function gotCoin() {
//   // Verify the coin.
//   // Remove the coin.
//   // Award the coin.

//   // Maybe drop some more.
//   if (numCoins < 5) {
//     dropMoreCoins();
//   }
// }

// function numCoins() {
//   // Count coins in entities.
//   return entities.reduce((coins, item) => {
//     if (typeof item === 'Coin') {
//       coins++;
//     }
//   }, 0);
// }
