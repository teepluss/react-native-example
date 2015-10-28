'use strict';

var React = require('react-native');
var {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} = React;

var Dimensions = require('Dimensions');
var screen = Dimensions.get('window');
var _ = require('lodash');

var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

exports.title = "<Event Emitter>";
exports.component = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    this.eventEmitter = new EventEmitter();
  },
  _handlePress: function() {
    this.eventEmitter.emit('myBtnEvent', { someArg: 'Changed!' });
  },
  render: function() {
    return (
      <ScrollView
        contentContainerStyle={[styles.scene]}
        scrollsToTop={true}>
        <View style={styles.button}>
          <TouchableOpacity onPress={this._handlePress}>
            <Text style={styles.buttonText}>{'Something'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Test events={this.eventEmitter} />
        </View>
      </ScrollView>
    )
  }
});

var Test = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState: function() {
    return {
      variable: 'original string'
    };
  },
  componentDidMount: function() {
    this.addListenerOn(this.props.events, 'myBtnEvent', this.miscFunction);
  },
  miscFunction: function(args){
    this.setState({
      variable: args.someArg
    });
  },

  render: function() {
    return (
      <Text>{this.state.variable}</Text>
    );
  }
});

var styles = StyleSheet.create({
  scene: {
    flex: 1,
    //top: 45,
    alignItems: 'center'
  },
  button: {
    marginTop: 100,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    width: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});
