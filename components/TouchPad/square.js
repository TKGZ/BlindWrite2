//renders a square 

import * as helper from '../helper';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

//by default this is a square
export default function shape(props)
{

    var positionX = props.positionX;
    var positionY = props.positionY;
    var elementsPerRow = props.elementsPerRow;
    var elementsPerCol = props.elementsPerCol;
    var radius = props.radius;
    var parentWidth = props.parentWidth;
    var parentHeight = props.parentHeight;

    //calculate how much to push the object
    var left = helper.getSpaceInterval(positionX, elementsPerRow, radius, parentWidth);
    var top = helper.getSpaceInterval(positionY, elementsPerCol, radius, parentHeight);

    var squareStyle = {
        //flex: 1,
        backgroundColor: 'blue',
        position: "absolute",
        width: (radius*2),
        height: (radius*2),
        top: top,
        left: left,
    }

    //returns a view containing a single square
    return(
        <View style={squareStyle}>
        </View>
    );
}
