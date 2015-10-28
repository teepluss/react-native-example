'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} = React;

var cssVar = require('cssVar');
var Icon = require('react-native-vector-icons/FontAwesome');

var BaseNavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}>
        <View style={{marginTop:3, left: 5, width: 28}}>
          <Icon name="arrow-left" size={25} color="#FFF" />
        </View>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    //console.log(index);
    return (
      <Text style={[styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
}

module.exports = BaseNavigationBarRouteMapper;

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#19CAB6'
  },
  navBarLeftButton: {
    left: 10,
  },
  navBarRightButton: {
    right: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontFamily: 'BangnaNew',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 9,
  },
});
