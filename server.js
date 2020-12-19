'use strict';

// Load the environment variables.
require('dotenv').config();

const bodyParser = require('body-parser');
// const cors = require('cors');
const express = require('express');
// const mongoose = require('mongoose');
const nocache = require('nocache');
const game = require('./controllers/coinhack.js');

// Middleware.
const helmet = require('./middleware/helmet.js');

// Routing.
// const replyRoutes = require('./routes/replies.js');

// FCC testing.
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

// Express app.
const app = express();

async function start() {
  // Configure mongoose.
  // const MONGOOSE_OPTIONS = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false
  // };

  try {
//     await mongoose.connect(process.env.MONGO_URI, MONGOOSE_OPTIONS);

    // Helmet middleware.
    app.use(helmet.config);
    app.use(nocache());
    // https://github.com/expressjs/express/issues/2477#issuecomment-67775940
    app.use(function(request, response, next) {
      response.setHeader('X-Powered-By', 'PHP 7.4.3');
      next();
    });
    
    // FCC testing.
    // app.use(cors({origin: '*'}));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // app.set('trust proxy', true);

    // Set static directory.
    app.use('/public', express.static(process.cwd() + '/public'));

    // Set view directory and view engine.
    app.set('views', './views');
    app.set('view engine', 'pug');

    app.route('/views/:page')
      .get(function(request, response) {
        return response.render(request.params.page);
      });

    // Serve static index.
    app.route('/')
      .get(function(request, response) {
        return response.sendFile(process.cwd() + '/views/index.html');
      });

    // FCC testing.
    fccTestingRoutes(app);

    // Application routes.
    // app.use('/api/replies', replyRoutes);
    
    // 404 middleware.
    app.use((request, response) => {
      return response
        .status(404)
        .render('404');
    });

    // Run server and/or tests.
    const port = process.env.PORT || 3000;
    const name = 'fcc-isp-srtm-game';
    const version = '0.0.1';

    const server = app.listen(port, await function () {
      console.log(`${name}@${version} listening on port ${port}...`);
      if (process.env.NODE_ENV ==='test') {
        console.log(`${name}@${version} running unit and functional tests...`);
        setTimeout(function () {
          try {
            runner.run();
          } catch (error) {
            console.log(`${name}@${version}:  some tests failed:`);
            console.error(error);
          }
        }, 1500);
      }
    });

    // Initialize socket.io and game server.
    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
      game.initialize(io, socket);
    });

    // Export app for testing.
    module.exports = app;
  } catch (error) {
    console.error(error);
  }
}

(async function() { await start(); })();
