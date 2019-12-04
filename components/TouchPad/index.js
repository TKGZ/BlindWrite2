import * as helper from '../helper';
import * as teacher from '../teacher';

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, PanResponder, Vibration } from 'react-native';
import Square from './square';
import { getNextStep } from '../teacher';

//TOUCHPAD:
//manage logic, testing related to inputs!


//how much range should gestures be detected within center point
const RADIUS_SQUARE = 35;
const RADIUS_CIRCLE = 15;

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

//dimensions
const SQUARES_PER_ROW = 3;
const SQUARES_PER_COL = 3;

const HEIGHT_TOUCHPAD = Math.round(0.8*HEIGHT);
const WIDTH_TOUCHPAD = WIDTH;

export default function TouchPad(props)
{
    var lastArea = props.lastArea;
    var nextArea = props.nextArea;

    //relative to root
    // const [locX, setLocX] = useState(0);
    // const [locY, setLocY] = useState(0);

    var locX = props.locX;
    var setLocX = props.setLocX;
    var locY = props.locY;
    var setLocY = props.setLocY;

    //relative to element
    const [locA, setLocA] = useState(0);
    const [locB, setLocB] = useState(0);

    //main areas are squares (1-9)
    const [squares, setSquares] = useState([]);
    //areas between are circles (a-d)
    const [circles, setCircles] = useState([]);

    const [layoutX, setLayoutX] = useState(0);
    const [layoutY, setLayoutY] = useState(0);
    const [width, setWidth] = useState(WIDTH);
    const [height, setHeight] = useState(HEIGHT);

    //trigger area update by changing this state variable!
    const [updateArea, setUpdateArea] = useState(0);

    //are we currently touching square?
    //const [onArea, setOnArea] = useState(0);
    var onArea = props.onArea;
    var setOnArea = props.setOnArea;
    
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
          console.log('started');
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
        //   props.onTouchStop();
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
    });

    //TODO
    //gesture events (start of gesture, moving of gesture, end of gesture)
    function onStart(e, g)
    {
        updateLocations(e);

        setUpdateArea(updateArea+1);
        props.onTouchStart();
    }

    function onMove(e, g)
    {
        a = e.nativeEvent.locationX;
        b = e.nativeEvent.locationY;

        setLocA(a);
        setLocB(b);

        updateLocations(e);

        props.onTouchMove();
        //check if current touch on a vibration one, then feedback
    }

    function feedbackTouch(type = 1)
    {
        Vibration.vibrate(100);
    }

    //TODO
    function onEnd(e, g)
    {
        // updateLocations(e);

        setLocX(-1);
        setLocY(-1);
        props.onTouchStop();
    }

    function updateLocations(e)
    {
        x = e.nativeEvent.pageX;
        y = e.nativeEvent.pageY;

        setLocX(x);
        setLocY(y);
    }

    
    //update the state of the squares
    useEffect(() => {
        setSquares(getSquares());
        setCircles(getCircles());
        //check if current touch on what type, then vibrate
    })

    //generates enough squares to fill out everything!
    function getSquares(rows = SQUARES_PER_ROW, cols = SQUARES_PER_COL)
    {
        var squares = [];
        var count = 1;
        for (var i = 0; i < rows; i++)
        {
            for (var j = 0; j< cols; j++)
            {
                squares.push(<Square
                    key = {count}
                    id = {count}

                    positionX = {j}
                    positionY = {i}
                    radius = {RADIUS_SQUARE}
                    elementsPerRow = {rows}
                    elementsPerCol = {cols}
                    parentHeight = {HEIGHT_TOUCHPAD}
                    parentWidth = {WIDTH_TOUCHPAD}

                    // for determining which area we are currently on
                    area = {onArea}
                    setOnArea = {setOnArea}
                    locX = {locX}
                    locY = {locY}

                    lastArea = {lastArea}
                    nextArea = {nextArea}

                    type = "square"

                    updateArea = {updateArea}

                    endOfStroke = {props.endOfStroke}
                >
                </Square>);
                count++;
            }
        }
        return squares;
    }

    function getCircles(rows = 5, cols = 5)
    {
        var circles = [];
        var count = 1;
        var ids = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (var i = 1; i < rows; i+=2)
        {
            for (var j = 1; j < cols; j+=2)
            {
                circles.push(<Square
                    key = {ids[count-1]}
                    id = {ids[count-1]}
                     
                    positionX = {j}
                    positionY = {i}
                    radius = {RADIUS_CIRCLE}
                    elementsPerRow = {rows}
                    elementsPerCol = {cols}
                    parentHeight = {HEIGHT_TOUCHPAD}
                    parentWidth = {WIDTH_TOUCHPAD}

                    // for determining which area we are currently on
                    area = {onArea}
                    setOnArea = {setOnArea}
                    locX = {locX}
                    locY = {locY}

                    lastArea = {lastArea}
                    nextArea = {nextArea}

                    type = "circle"

                    updateArea = {updateArea}

                    endOfStroke = {props.endOfStroke}
                >
                </Square>);
                count++;
            }
        }
        return circles;
    }

    return(
        <View
        alignItems="center"
        flexDirection="column"
        justifyContent="center"

        {..._panResponder.panHandlers}
        style={styles.surface}
        >

            {squares}
            {circles}

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
       // flex: 1,
        height: '80%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})