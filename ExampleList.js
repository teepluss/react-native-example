'use strict';

var React = require('react-native');

var {
  View,
  Text,
  ListView,
  PixelRatio,
  ScrollView,
  StyleSheet,
  TextInput,
  Animated,
  Navigator,
  TouchableHighlight
} = React;

var _ = require('lodash');
var cssVar = require('cssVar');
var Swipeout = require('react-native-swipeout')
var Icon = require('react-native-vector-icons/FontAwesome');

var BaseNavigationBarRouteMapper = require('./components/BaseNavigationBarRouteMapper');
var NavigationBarRouteMapper = Object.assign(BaseNavigationBarRouteMapper, {
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.props.onRightPressed()}
        style={{right: 10}}>
        <Icon name="user" size={25} color="#FFF" />
      </TouchableOpacity>
    );
  }
});

var ExampleList = React.createClass({
  getInitialState: function() {
    return {
      ds: [
        require('./examples/CustomView'),
        require('./examples/AnimateImage'),
        require('./examples/FadeImages'),
        require('./examples/Emitter'),
        require('./examples/MaterialDesign'),
        require('./examples/Reflux/RefluxDemo'),
      ],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
  },

  componentWillMount: function() {
    //
  },

  componentDidMount: function() {
    if (! this.props.isLoggedIn) {
      this.props.navigator.push({
        id: 'login',
        previous: {
          id: 'example',
          title: 'Just logged in'
        },
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom
      });
    } else {
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(this.state.ds),
      })
    }

    // this.props.navigator.props.setRouteMapper({
    //   Title: function(route, navigator, index, navState) {
    //     return (
    //       <Text style={[styles.navBarText, styles.navBarTitleText]}>
    //         Example {index}
    //       </Text>
    //     );
    //   },
    // });
  },

  onPressRow: function(row) {
    this.props.navigator.push(row);
  },

  onPressDelete: function(rowID: number) {
    var newDs = this.state.ds.slice();

    delete newDs[rowID];

    this.setState({
      ds: newDs,
      dataSource: this.state.dataSource.cloneWithRows(newDs)
    })
  },

  onPressUpdate: function(rowID: number) {
    var newDs = this.state.ds.slice();

    newDs[rowID] = _.merge(_.clone(newDs[rowID]), {
      title: "updated!"
    });

    this.setState({
      ds: newDs,
      dataSource: this.state.dataSource.cloneWithRows(newDs)
    })
  },

  renderRow: function(row: any, sectionID: number, rowID: number) {
    var that = this;

    // Buttons
    var swipeoutBtns = [
      {
        text: 'Remove',
        backgroundColor: 'red',
        onPress: function() {
          that.onPressDelete(rowID);
        },
      },
      {
        text: 'Update',
        onPress: function() {
          that.onPressUpdate(rowID);
        },
      }
    ]

    return (
      <View>
          <Swipeout right={swipeoutBtns} autoClose={true}>
            <TouchableHighlight underlayColor={'#99d9f4'} activeOpacity={0.9} onPress={() => this.onPressRow(row)}>
              <View style={[styles.row]}>
                <Text>{row.title}</Text>
                <Icon name="arrow-right" size={20} style={{color: '#ccc'}} />
              </View>
            </TouchableHighlight>
          </Swipeout>
      </View>
    )

  },

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    return (
      <View key={"SEP_" + sectionID + "_" + rowID} style={styles.separator}></View>
    )
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        style={styles.scene}
      >
      </ListView>
    );
  }
});

module.exports = ExampleList;

var styles = StyleSheet.create({
  scene: {
    flex: 1,
    //top: 65,
    backgroundColor: '#EAEAEA',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: "#FFF"
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
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
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
});

