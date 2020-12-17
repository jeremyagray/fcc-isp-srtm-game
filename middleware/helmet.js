'use strict';

const helmet = require('helmet');

exports.config = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        '\'self\''
      ],
      fontSrc: [
        '\'self\'',
        '*.gstatic.com'
      ],
      scriptSrc: [
        '\'self\'',
        'localhost',
        '\'unsafe-inline\''
      ],
      scriptSrcElem: [
        '\'self\'',
        'localhost',
        '\'unsafe-inline\''
      ],
      styleSrc: [
        '\'self\'',
        'localhost',
        '*.googleapis.com',
        '\'unsafe-inline\''
      ],
      styleSrcElem: [
        '\'self\'',
        'localhost',
        '*.googleapis.com',
        '\'unsafe-inline\''
      ]
    }},
  referrerPolicy: {
    policy: 'same-origin'
  },
  frameguard: {
    action: 'sameorigin'
  }});
