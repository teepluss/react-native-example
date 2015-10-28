'use strict';

var React = require('react-native');
var {
  View,
  Text,
  ScrollView,
  StyleSheet
} = React;

var MK = require('react-native-material-kit');
var {
  MKIconToggle,
  MKSwitch,
  MKRadioButton,
  MKButton,
  MKTextField,
  MKColor,
  getTheme,
  setTheme,
} = MK;

exports.title = "<Material Design>";
exports.component = React.createClass({
  render: function() {
    return (
      <ScrollView contentContainerStyle={{flex:1, flexDirection: 'column', justifyContent: 'center' }}>
        <MKButton
          backgroundColor={MKColor.Teal}
          shadowRadius={2}
          shadowOffset={{width:0, height:2}}
          shadowOpacity={.7}
          shadowColor="black"
          onPress={() => {
            console.log('hi, raised button!');
          }}
          style={{padding: 10, alignSelf: 'center', margin: 5}}
          >
          <Text pointerEvents="none" style={{color: 'white', fontWeight: 'bold'}}>
            {'RAISED BUTTON'}
          </Text>
        </MKButton>
      </ScrollView>
    )
  }
});

var styles = StyleSheet.create({
  textfield: {
    backgroundColor: '#FFF'
  }
});
