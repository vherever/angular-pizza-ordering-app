'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.status(200).json({ success: true, message: 'Api is running.' });
});

require('./api')(app);

app.use(express.static('./'));

const PORT = process.env.PORT || 8001;
app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
  console.log('Press Ctrl+C to quit.');
});
