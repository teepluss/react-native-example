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

exports.title = "<Reflux>";
exports.component = React.createClass({
  //mixins: [Reflux.connect(statusStore, 'lists')],
  mixins: [Reflux.ListenerMixin],
  getInitialState: function() {
    return {
      lists: [],
      nextBtn: 'Next!'
    }
  },
  onStatusChanged: function(status) {
    this.setState({lists: status})
  },
  componentDidMount: function() {
    //statusStore.listen(this.onStatusChanged);
    this.listenTo(statusStore, this.onStatusChanged);
    actions.fetch();
  },
  _add: function() {
    actions.added({status: 'add'});
  },
  _update: function() {
    actions.updated({status: 'edit'});
  },
  _clear: function() {
    actions.clear();
    actions.fetch();
    this.setState({nextBtn: "Next!"});
  },
  _handleNext: function() {
    this.setState({nextBtn: "Nexted!"});

    this.props.navigator.push({
      title: require('./RefluxDetail').title,
      component: require('./RefluxDetail').component,
      props: {
        lists: this.state.lists
      }
    })
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._update}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{'Update!'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._clear}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{'Clear!'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._handleNext}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.nextBtn}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', padding: 10, margin: 5}}>
          <Text style={{textAlign: 'center'}}>{JSON.stringify(this.state.lists)}</Text>
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
