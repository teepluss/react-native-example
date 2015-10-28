'use strict';

var React = require('react-native');
var {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
} = React;

var TimerMixin = require('react-timer-mixin');
var tweenState = require('react-tween-state');

var Dimensions = require('Dimensions');
var screen = Dimensions.get('window');
var _ = require('lodash');

let MINIMUM_DELAY = 100;

var IMAGES = [
  {
    image: {uri: 'Assets/images/sample_01.jpg'}
  },
  {
    image: {uri: 'Assets/images/sample_02.jpg'}
  },
  {
    image: {uri: 'Assets/images/sample_03.jpg'}
  }
]

exports.title = "<Fade Images>";
exports.component = React.createClass({
  mixins: [TimerMixin, tweenState.Mixin],
  getInitialState: function () {
    return {
      opacityx: 0,
      currentIndex: 0,
    };
  },
  componentDidMount: function () {
    this._fadeOpacity();
  },
  _fadeOpacity: function () {
    this.tweenState('opacityx', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 1200,
      beginValue: this.state.opacityx === 0 ? 0 : 1,
      onEnd: this._getNextSlide,
      endValue: this.state.opacityx === 0 ? 1 : 0
    });
  },
  _getNextSlide: function () {
    if (this.state.opacityx === 0) {
      var index = this.state.currentIndex + 1;
      index = index < IMAGES.length ? index: 0;
      this.setState({ currentIndex: index });
      this.setTimeout(() => { this._fadeOpacity(); }, MINIMUM_DELAY);
    } else {
      this.setTimeout(() => { this._fadeOpacity(); },
      1200 || MINIMUM_DELAY);
    }
  },
  render: function() {
    var slide = IMAGES[this.state.currentIndex];
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>

        <View style={[styles.slide, { height: 240, width: screen.width, opacity: this.getTweeningValue('opacityx') }]}>
          <Image
            style={{ width: screen.width, height: 240 }}
            source={slide.image}
          />
        </View>

      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    flex:1,
    //top: 45,
    backgroundColor: '#EAEAEA',
  },
  scrollView: {
    //backgroundColor: '#EAEAEA',
  },
  slide: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
});
