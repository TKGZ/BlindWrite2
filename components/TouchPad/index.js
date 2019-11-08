import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder } from 'react-native';


//how much range should gestures be detected within center point
const RADIUS = 30;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TouchPad()
{

    const [locX, setLocX] = useState(0);
    const [locY, setLocY] = useState(0);

    function onStartShouldSetResponder(evt)
    {
        return true;
    }

    function onMoveShouldSetResponder(evt)
    {
        return true;
    }

    function onResponderMove(evt)
    {
        x =  evt.nativeEvent.pageX;
        y = evt.nativeEvent.pageY;

        //tryVibration(evt);
        setLocX(x);
        setLocY(y);
    }

    _panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  
        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          x =  evt.nativeEvent.pageX;
          y = evt.nativeEvent.pageY;
  
          //tryVibration(evt);
          setLocX(x);
          setLocY(y);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });

    return(
        
        <View
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        // onMoveShouldSetResponder={onMoveShouldSetResponder}
        // onStartShouldSetResponder={onStartShouldSetResponder}
        // onResponderMove={onResponderMove}
        {..._panResponder.panHandlers}
        style={styles.surface}
        >
            <DisplayCoordinates
                x={locX}
                y={locY}
            ></DisplayCoordinates>
            <Text>Touchpad Here</Text>
        </View>
    )
}

function DisplayCoordinates(props)
{
    return(
        <View>
            <Text style={styles.coord}>X {Math.round(props.x)} Y {Math.round(props.y)}</Text>
            <Text style={styles.coord}>SCREEN: {Math.round(WIDTH)} * {Math.round(HEIGHT)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    coord: {
        fontSize: 10,
        color: 'blue',
    },
    surface: {
        backgroundColor: 'orange',
        flex: 1,
        height: '80%',
    }
})