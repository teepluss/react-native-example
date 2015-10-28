/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  AlertIOS,
  PixelRatio,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var Login = require('./Login');
var ExampleList = require('./ExampleList');
var NavBar = require('./components/NavBar');

var _navigator;

/**
 * Navigator
 */
var BaseNavigationBarRouteMapper = require('./components/BaseNavigationBarRouteMapper');
var NavigationBarRouteMapper = Object.assign(BaseNavigationBarRouteMapper, {
  RightButton(route, navigator, index, navState) {
    if (index !== 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => navigator.props.onRightPressed()}>
        <View style={{marginTop:7, right: 5}}>
          <Icon name="cog" size={25} color="#FFF" />
        </View>
      </TouchableOpacity>
    );
  }
});

var Example = React.createClass({
  getInitialState: function() {
    return {
      routeMapper: NavigationBarRouteMapper,
      currentRoute: {
        id: 'example',
        title: '<Example>'
      },
      isLoggedIn: true
    }
  },

  setLogin: function(state, previous) {
    this.setState({isLoggedIn: true});
    _navigator.popToTop();
    _navigator.replace(previous);
  },

  setRouteMapper: function(routeMapper) {
    this.setState({
      routeMapper: Object.assign(this.state.routeMapper, routeMapper)
    })
  },

  renderScene: function(route, nav) {
    _navigator = nav;
    switch (route.id) {
      case 'login':
        return (
          <Login navigator={nav} setLogin={this.setLogin} previous={route.previous} />
        )
      case 'example':
        return (
          <ExampleList
            text="Go"
            message={route.message}
            isLoggedIn={this.state.isLoggedIn}
            navigator={nav}>
          </ExampleList>
        )
      default:
        if (route.component) {
          var Component = route.component;
          return <Component navigator={nav} {...route.props} />
        }
    }
  },

  onRightPressHandle: function() {
    AlertIOS.alert(
      'Foo Title',
      'My Alert Msg',
      [
        {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
        {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
      ]
    )
  },

  render: function() {
    return (
      <Navigator
        ref="navigator"
        style={[styles.container]}
        sceneStyle={styles.scene}
        initialRoute={this.state.currentRoute}
        renderScene={this.renderScene}
        onRightPressed={() => this.onRightPressHandle()}
        setRouteMapper={this.setRouteMapper}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={
          <NavBar
            routeMapper={this.state.routeMapper}
            style={[styles.navBar]}
          />
        }
      >
      </Navigator>
    );
  }
});

AppRegistry.registerComponent('NavigatorExample', () => NavigatorExample);

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    //paddingTop: 20,
    top: 64,
    backgroundColor: '#EAEAEA',
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    // height: 0,
    // overflow: 'hidden',
    backgroundColor: '#19CAB6'
  },
});

AppRegistry.registerComponent('Example', () => Example);
