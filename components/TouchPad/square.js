//renders a square 

import * as helper from '../helper';

import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function square(props)
{

    var radius = props.radius;

    
    var location = props.location;


    var parentWidth = 393;
    var parentHeight = 500;


    //temporary
    radius = 25;
    x = 50;
    location = [0, Math.round(Dimensions.get('window').width/2)];
    

    
    var squareStyle = {
        //flex: 1,
        backgroundColor: 'blue',
        width: 50,
        height: 50,
        top: 10,
        left: (parentWidth - radius*2),

    }

    //returns a view containing a single square
    return(
        <View style={squareStyle}>
            
        </View>
    );
}
