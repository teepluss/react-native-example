'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Navigator
} = React;

class NavBar extends Navigator.NavigationBar {
  constructor() {
    super();
  }
}

module.exports = NavBar;
