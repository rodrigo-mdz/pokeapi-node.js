const express = require('express');
const app = express();

app.use(require('./users'));
app.use(require('./login'));
app.use(require('./collection'));
app.use(require('./team'));
app.use(require('./encounters'));

module.exports = app;