'use strict';

var React = require('react-native');
var {
  View,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback
} = React;

var _ = require('lodash');
var BaseLightbox = require('react-native-lightbox');
var LightboxOverlay = require('react-native-lightbox/LightboxOverlay');

class Lightbox extends BaseLightbox {
  render() {
    return (
      <View
        ref={component => this._root = component}
        style={this.props.style}
        onLayout={() => {}}
      >
        <Animated.View style={{opacity: this.state.layoutOpacity}}>
          <TouchableWithoutFeedback
            underlayColor={this.props.underlayColor}
            onPress={this.open}
          >
            {this.props.children}
          </TouchableWithoutFeedback>
        </Animated.View>
        {this.props.navigator ? false : <LightboxOverlay {...this.getOverlayProps()} />}
      </View>
    )
  }
}

module.exports = Lightbox;
