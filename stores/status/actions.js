'use strict';

var Reflux = require('reflux');

var actions = Reflux.createActions([
  "added",
  "updated",
  "fetch",
  "clear"
]);

module.exports = actions;
