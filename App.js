import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import TouchPad from './components/TouchPad';

export default function App() {

  const [onArea, setOnArea] = useState(0);

  //by default teacher is on
  const [teacher, setTeacher] = useState(true);
  //name of character we are writing
  const [charName, setCharName] = useState();
  //array description of how it is to be written
  const [charPattern, setCharPattern] = useState();

  //get the height of the screen somehow
  var height = Dimensions.get('screen');
  return (
    <View style={styles.container}>
      <TempControlPad
        onArea = {onArea}
      >

      </TempControlPad>
      <TouchPad
        onArea = {onArea}
        setOnArea = {setOnArea}
      >
      </TouchPad>
      
    </View>
  );
}

function TempControlPad(props)
{
  return(
    <View style={styles.tempControl}>
      <Text> Temporary Control Panel </Text>
      <Text>Current Area Is...</Text>
      <Text style={styles.bigText}>{props.onArea}</Text>
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
  },
  bigText: {
    fontSize: 100,
    color: 'blue',
  }
});

