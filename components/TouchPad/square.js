//renders a shape of type square or circle

import * as helper from '../helper';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { blue } from 'ansi-colors';

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


    //for detecting which area we are on
    //i.e is my touch currently on this area?
    var area = props.area;
    var setOnArea = props.setOnArea;
    var locX = props.locX;
    var locY = props.locY;
    var id = props.id;

    //type of shape (either square or circle)
    var type = props.type;

    //calculate how much to push the object
    var left = helper.getSpaceInterval(positionX, elementsPerRow, radius, parentWidth);
    var top = helper.getSpaceInterval(positionY, elementsPerCol, radius, parentHeight);

    const [color, setColor] = useState({square: "blue", circle: "red"});

    // var squareStyle = {
    //     //flex: 1,
    //     backgroundColor: {color},
    //     position: "absolute",
    //     width: (radius*2),
    //     height: (radius*2),
    //     top: top,
    //     left: left,
    // }

    styles = StyleSheet.create({
        square: {
            backgroundColor: color.square,
            position: "absolute",
            width: (radius*2),
            height: (radius*2),
            top: top,
            left: left,
        },
        circle: {
            backgroundColor: color.circle,
            position: "absolute",
            width: (radius*2),
            height: (radius*2),
            borderRadius: radius,
            top: top,
            left: left,
        },
    })  
    
    if (type === "circle")
    {
        thisStyle = styles.circle;
    }
    else
    {
        thisStyle = styles.square;
    }

    useEffect(() => 
    {
        //TODO check type first before starting!!!
        // check if on area, update setArea accordingly
        // console.log("tryp update")
        if ((left < props.locX) && (props.locX < (left + (2*radius)))
        && ((top + (.2*HEIGHT)) < props.locY) && (props.locY < ((top + (.2*HEIGHT)) + (2*radius))))
        {
            setOnArea(props.id);
            // console.log("area updated");

            // setOnArea("left: " + left + "|locA: " + locX + "| top: " + top + "| locb: " + locY);
        }
        else if (area == props.id)
        {
            setOnArea(0);
            //setOnArea("0  left: " + left + "|locA: " + locX + "| top: " + top + "| locb: " + locY);

        }

    },[locX, locY, props.updateArea] );
//[locX, locY, props.updateArea]
    useEffect(() => {
        if (props.nextArea == props.id)
        {
            setColor({square: "yellow", circle: "yellow"});
        }
        else if (props.lastArea == props.id)
        {
            setColor({square: "#8e44ad", circle: "#8e44ad"});
        }
        else
        {
            setColor({square: "blue", circle: "red"});
        }
    }, [props.nextArea, props.lastArea]);

    
    //returns a view containing a single square
    return(
        <View style={thisStyle}>
        </View>
    );
}


