'use strict';

var React = require('react-native');

var {
  View,
  Image,
  Animated,
  ScrollView,
  StyleSheet
} = React;

var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions');
var screen = Dimensions.get('window');

exports.title = "<Animate Image>"
exports.component = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    return {
      bounceValue: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
      zoomIn: new Animated.Value(screen.width),
    }
  },
  componentDidMount: function() {
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration:10000
      },
    ).start();

    this.setTimeout(
      () => {
        Animated.timing(
          this.state.zoomIn,
          {
            toValue: screen.width + 100,
            duration:10000
          },
        ).start();
      },
    3000);
  },
  render: function() {
    return (
      <ScrollView
        style={[styles.scene]}
        scrollsToTop={true}
      >
        <View style={{width:screen.width, height:240}}>
          <Animated.Image source={{uri: 'Assets/images/sample_01.jpg'}} style={{height:240,resizeMode:'cover',width:this.state.zoomIn}}  />
        </View>
        <View style={{width:screen.width, height:240}}>
          <Animated.Image source={{uri: 'Assets/images/sample_02.jpg'}} style={{height:240,width:screen.width,resizeMode:'cover',position:'absolute'}}  />
          <Animated.Image source={{uri: 'Assets/images/sample_03.jpg'}} style={{height:240,resizeMode:'cover',opacity:this.state.fadeAnim}}  />
        </View>
        <View style={{width:screen.width, height:240}}>
          <Animated.Image source={{uri: 'Assets/images/sample_01.jpg'}} style={[styles.image, {
            transform: [                        // `transform` is an ordered array
              {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
            ]
          }]} />
        </View>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  scene: {
    flex: 1,
    //top: 45,
    backgroundColor: '#EAEAEA',
  },
  image: {
    height: 240,
    resizeMode: Image.resizeMode.cover,
  },
});
