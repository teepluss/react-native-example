'use strict';

var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} = React;

var Login = React.createClass({
  handlePress: function() {
    this.props.setLogin(true, this.props.previous);
  },
  render: function() {
    return (
      <View style={styles.scene}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={this.handlePress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Log Me In</Text>
              </View>
            </TouchableHighlight>
          </View>
      </View>
    )
  }
});

module.exports = Login;

var styles = StyleSheet.create({
  scene: {

  },
  buttonContainer: {
    marginTop: 20,
    width: 100,
    //padding: 10,
    borderWidth: 1,
    alignSelf: 'center'
  },
  button: {
    //width: 100,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center'
  }
})
