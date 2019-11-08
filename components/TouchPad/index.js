import * as helper from '../helper';

import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder } from 'react-native';


//how much range should gestures be detected within center point
const RADIUS = 30;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function TouchPad()
{

    //relative to root
    const [locX, setLocX] = useState(0);
    const [locY, setLocY] = useState(0);

    //relative to element
    const [locA, setLocA] = useState(0);
    const [locB, setLocB] = useState(0);

    //main areas are squares (1-9)
    const [squares, setSquares] = useState([]);
    //areas between are circles (a-d)
    const [circles, setCircles] = useState([]);


    
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
          onStart(evt,gestureState);
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          onMove(evt, gestureState);
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          onEnd(evt,gestureState);
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

    //gesture events (start of gesture, moving of gesture, end of gesture)
    function onStart(e, g)
    {

    }

    function onMove(e, g)
    {
        x =  e.nativeEvent.pageX;
          y = e.nativeEvent.pageY;
          a = e.nativeEvent.locationX;
          b = e.nativeEvent.locationY;
  
  
          //tryVibration(evt);
          setLocX(x);
          setLocY(y);
          setLocA(a);
          setLocB(b);
    }

    function onEnd(e, g)
    {

    }

    //returns array of squares to add to jsx element
    function renderSquares()
    {

    }

    return(
        
        <View
        alignItems="center"
        flexDirection="column"
        justifyContent="center"

        {..._panResponder.panHandlers}
        style={styles.surface}
        >
            <DisplayCoordinates
                x={locX}
                y={locY}
                a={locA}
                b={locB}
            ></DisplayCoordinates>
            <Text>Touchpad Here</Text>
        </View>
    )
}

function DisplayCoordinates(props)
{
    return(
        <View>
            <Text style={styles.coord}>Global: X {Math.round(props.x)} Y {Math.round(props.y)}</Text>
            <Text style={styles.coord}>Local: A {Math.round(props.a)} B {Math.round(props.b)}</Text>
            <Text style={styles.coord}>SCREEN: {Math.round(WIDTH)} * {Math.round(HEIGHT)}</Text>
        </View>
    )
}

//return id of "area" currently on (1-9, a-d, or -1 (outide)) based on point = {x, y}
function getArea(point)
{
    return (1);
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