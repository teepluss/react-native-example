'use strict';

var React = require('react-native');
var {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} = React;

var Reflux = require('reflux');
var actions = require('../../stores/status/actions');
var statusStore = require('../../stores/status/store');

exports.title = "<Reflux Detail>";
exports.component = React.createClass({
  _add: function() {
    actions.added({status: 'add'});
    this.props.navigator.pop();
  },
  render: function() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._add}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{'Add!'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', padding: 10, margin: 5}}>
          <Text style={{textAlign: 'center'}}>{JSON.stringify(this.props.lists)}</Text>
        </View>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  scrollView: {
    //
  },
  buttonContainer: {
    marginBottom: 5,
    borderWidth: 1,
    alignSelf: 'center',
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10
  },
  button: {
    padding: 10,
  },
  buttonText: {
    textAlign: 'center'
  }
});
