
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import TouchPad from './components/TouchPad';
import * as helper from './components/helper';

import * as teacher from './components/teacher';

export default function App() {

  const [lock, setLock] = useState(0);

  const [onArea, setOnArea] = useState(0);
  //by default teacher is on
  const [teachingMode, setTeachingMode] = useState(true);

  //name of character we are writing
  const [charName, setCharName] = useState('a');
  //array description of how it is to be written

  //by default it is the empty pattern
  // const [charPattern, setCharPattern] = useState([[7,2,9],[4,6]]);
  const [charPattern, setCharPattern] = useState([[1,2,3,6,5,4,7,8,9],[2,5,7]]);

  const [endOfStroke, setEndOfStroke] = useState(false);
  const [endOfCharacter, setEndOfCharacter] = useState(false);
  
  const startPoint = helper.createPoint(0,0);
  const startNext = helper.createPoint(0, 0);

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
    setNextPoint(newPoint);
    setLastPoint(newLastPoint);

    updateAreasFromPoints();
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
        }
        else
        {
          //newPoint = helper.createPoint(nextPoint.stroke + 1, 0);
          //console.log("NEW POINT for next stroke " + newPoint.stroke + " " + newPoint.step)
          console.log("end of stroke but not of character");
        }
      }
      else
      {
        //increment the point by one!
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
      onStrokeFail();
    }
  }

  function onTouchStart()
  {
    setFailedStroke(false);

    if (onArea == nextArea)
    {
      onTouchMove();
    }
    else
    {
      if (onArea != 0)
        onStrokeFail();
    }
  }

  function onTouchStop()
  {
    console.log("on touch stop")
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
      onStrokeFail();
    }
    //we have not reached the end, so we fail!
  }

  //SUCESS when:
  //Hit the last point of a stroke
  //Finger Lifted
  //THEN switch to the next stroke!
  function onStrokeSuccess()
  {
    setEndOfStroke(false);
    setEndOfCharacter(false);

    //TODO fix this
    var newPoint = helper.createPoint(nextPoint.stroke + 1, 0);
    
    setLastPoint(newPoint);
    setNextPoint(newPoint);
    updateAreasFromPoints();

    console.log("Stroke Success, switch to next stroke");
  }

  //Called when FAIL:
  //2 conditions:
  //- hits the wrong node
  //- finger is lifted up 
  function onStrokeFail()
  {
    //stroke fail feedback
    //reset character
    console.log("Stroke Fail");
    setEndOfCharacter(false);
    setEndOfStroke(false);

    setFailedStroke(true);

    resetPoints();
  }

  //reset points and their areas to the first two elements of the character!
  function resetPoints()
  {
    setLastPoint(startPoint);
    setNextPoint(startNext);
    updateAreasFromPoints();    
  }

  function updateAreasFromPoints()
  {
    //check if on any of the last stages
    console.log("nextPoint udpating to area of " + nextPoint.stroke + " " + nextPoint.step);
    
    if (lastPoint.stroke === null || lastPoint.step === null)
    {
      console.log("invalid last point update")
      setLastArea(-1);
    }
    else
    {
      setLastArea(charPattern[lastPoint.stroke][lastPoint.step]);

    }
    if (nextPoint.stroke === null || nextPoint.step === null)
    {
      console.log("invalid next point update")
      setNextArea(-1);
    }
    else
    {
      setNextArea(charPattern[nextPoint.stroke][nextPoint.step]);
    }
  }

  //when hit last point of last stroke and lift the finger not on another character
  //THEN: switch to the next character
  function onCharSuccess()
  {
    //TODO update to the next character!
    console.log("Character SUCCESS");
  }

  return (
    <View style={styles.container}>
      <TempControlPad
        onArea = {onArea}
      >

      </TempControlPad>
      <TouchPad
        onArea = {onArea}
        setOnArea = {setOnArea}

        lastArea = {lastArea}
        nextArea = {nextArea}

        onTouchStart = {onTouchStart}
        onTouchMove = {onTouchMove}
        onTouchStop = {onTouchStop}
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

