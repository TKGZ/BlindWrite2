
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import TouchPad from './components/TouchPad';
import * as helper from './components/helper';
import * as feedback from './components/feedback'
import * as teacher from './components/teacher';


export default function App() {

  const [lock, setLock] = useState(0);

  const [onArea, setOnArea] = useState(0);
  //by default teacher is on
  const [teachingMode, setTeachingMode] = useState(true);

  //name of character we are writing
  const [charName, setCharName] = useState('B');
  //array description of how it is to be written

  const [locX, setLocX] = useState(0);
  const [locY, setLocY] = useState(0);

  //by default it is the empty pattern
  // const [charPattern, setCharPattern] = useState([[7,2,9],[4,6]]);
  const [charPattern, setCharPattern] = useState([[1,2,"b",5,4,5,"d",8,7],[1,4,7]]);

  const [endOfStroke, setEndOfStroke] = useState(false);
  const [endOfCharacter, setEndOfCharacter] = useState(false);
  
  const startPoint = helper.createPoint(0,0);
  const startNext = helper.createPoint(0,0);

  //POINTS
  const [lastPoint, setLastPoint] = useState(startPoint);
  const [nextPoint, setNextPoint] = useState(startNext);
  //AREAS (Correspondingly)
  const [lastArea, setLastArea] = useState(1);
  const [nextArea, setNextArea] = useState(1);

  const [failedStroke, setFailedStroke] = useState(false);
  
  //run the pattern checker

  //get the height of the screen somehow
  var height = Dimensions.get('screen');

  //the new steps [old, new]
  var newSteps = [];

  function updatePoints(newPoint)
  {
    var newLastPoint = nextPoint;
    setLastPoint(newLastPoint);
    setNextPoint(newPoint);

    updateAreasFromPoints(newLastPoint, newPoint);
  }

  function onTouchMove(values)
  {
    var newPoint;
    if (onArea == nextArea && failedStroke == false)
    {
      var nextStep = teacher.getNextStep(nextPoint, charPattern)
      if (nextStep == null)
      {
        setEndOfStroke(true);
        var nextStroke = teacher.getNextStroke(nextPoint, charPattern);
        if (nextStroke == null)
        {
          setEndOfCharacter(true);
          console.log("MOVE: end of character AND stroke)")
        }
        else
        {
          console.log("MOVE: end of stroke but not of character");
        }
         
      }
      else
      {        
        feedback.correctArea();
        newPoint = helper.createPoint(nextPoint.stroke, nextStep);
      }
      updatePoints(newPoint);
    }
    else if (onArea == 0 || onArea == lastArea)
    {
      //original area or empty area => do nothing
    }
    else
    {
      onStrokeFail("wrong area on " + onArea + " | lastArea: "  + lastArea + " | nextArea: " + nextArea);
    }
  }

  function onTouchStart()
  {
    setFailedStroke(false);

    //TODO fix this temporary error
    console.log("on touch start")
    
    if (onArea == nextArea || onArea == lastArea)
    {
      // console.log("on area")
      onTouchMove();
    }
    else
    {
      // console.log("not on area")
      if (onArea != 0)
        onStrokeFail("wrong start on " + onArea + " | lastArea: "  + lastArea + " | nextArea: " + nextArea);
    }
  }

  function onTouchStop()
  {
    //console.log("on touch stop")
    setOnArea(0);

    setLocX(-1);
    setLocY(-1);

    setOnArea(0);


    setTimeout(() => {
      setOnArea(0);
      clearTimeout(this);
    }, 100);
    // clearInterval(interval);

    if (endOfCharacter)
    {
      onCharSuccess();
    }
    else if (endOfStroke)
    {
      onStrokeSuccess();
    }
    else
    {
      onStrokeFail("touch stop on neither end of stroke/char");
    }
    //we have not reached the end, so we fail!
  }

  //end of stroke but not end of character!
  //SUCESS when:
  //Hit the last point of a stroke
  //Finger Lifted
  //THEN switch to the next stroke!
  function onStrokeSuccess()
  {
    
    //TODO fix this
    var newPoint = helper.createPoint(lastPoint.stroke + 1, 0);
    
    setLastPoint(newPoint);
    setNextPoint(newPoint);
    updateAreasFromPoints(newPoint, newPoint);

    setEndOfStroke(false);
    setEndOfCharacter(false);

    setOnArea(0);
    console.log("Stroke Success, switch to next stroke");
  }

    //when hit last point of last stroke and lift the finger not on another character
  //THEN: switch to the next character
  
  function onCharSuccess()
  {
    //TODO update to the next character!

    resetPoints();
    console.log("Character SUCCESS");
  }

  //Called when FAIL:
  //2 conditions:
  //- hits the wrong node
  //- finger is lifted up 
  function onStrokeFail(reason = "")
  {
    //stroke fail feedback
    //reset character
    if (failedStroke == false)
    {
      //play audio
      console.log("Stroke Fail because " + reason);
      setEndOfCharacter(false);
      setEndOfStroke(false);

      feedback.fail();
      resetPoints();

      setFailedStroke(true);
    }
  }

  //reset points and their areas to the first two elements of the character!
  function resetPoints()
  {
    setLastPoint(startPoint);
    setNextPoint(startNext);
    console.log("reseting points: ");
    helper.printPoint(startPoint);
    helper.printPoint(startNext);
    updateAreasFromPoints(startPoint, startNext);
  }

  //explicitally input the points to ensure that they update after!
  //a for last point
  //b for next point
  function updateAreasFromPoints(a, b)
  {
    // console.log("updating from points" );
    // helper.printPoint(a, "a");
    // helper.printPoint(b, "b");

    if (helper.isValidPoint(a))
    {
      setLastArea(charPattern[a.stroke][a.step]);
    }
    else
    {
      setLastArea(-1);
    }
    
    if (helper.isValidPoint(b))
    {
      setNextArea(charPattern[b.stroke][b.step]);
    }
    else
    {
      setNextArea(-1);
    }
  }



  return (
    <View style={styles.container}>
      <TempControlPad
        onArea = {onArea}

        locX = {locX}
        locY = {locY}

        charName = {charName}
      >

      </TempControlPad>
      <TouchPad
        onArea = {onArea}
        setOnArea = {setOnArea}

        locX = {locX}
        setLocX = {setLocX}
        locY = {locY}
        setLocY = {setLocY}

        lastArea = {lastArea}
        nextArea = {nextArea}

        onTouchStart = {onTouchStart}
        onTouchMove = {onTouchMove}
        onTouchStop = {onTouchStop}

        endOfStroke = {endOfStroke}
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
      <Text style={styles.bigText}>{props.charName} {props.onArea} {Math.round(props.locX)} {Math.round(props.locY)} </Text>
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
    fontSize: 50,
    color: 'blue',
  }
});

