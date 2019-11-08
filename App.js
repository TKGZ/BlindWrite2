import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import TouchPad from './components/TouchPad';

export default function App() {



  //get the height of the screen somehow
  var height = Dimensions.get('screen');
  return (
    <View style={styles.container}>
      <TempControlPad>

      </TempControlPad>
      <Text>Open up App.js to start working on your app!
      </Text>
      <TouchPad>

      </TouchPad>
      
    </View>
  );
}


function TempControlPad()
{
  return(
    <View style={styles.tempControl}>
      <Text> Temporary Control Panel </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  tempControl: {
    height: '20%',
  }
});

