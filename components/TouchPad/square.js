//renders a square 

import * as helper from '../helper';

import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function square(props)
{

    var radius = props.radius;

    var location = props.location;
    location = [Dimensions.get('window').width, 2];

    //temporary
    radius = 10;
    x = 50;

    
    var squareStyle = {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'blue',
        width: 50,
        aspectRatio: 1,
    }

    //returns a view containing a single square
    return(
        <View>
            
        </View>
    );
}
