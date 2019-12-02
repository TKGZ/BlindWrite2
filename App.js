
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
  const [charPattern, setCharPattern] = useState([[1,2,3,6,5,4,7,8,9]]);

  const [endOfStroke, setEndOfStroke] = useState(false);
  const [endOfCharacter, setEndOfCharacter] = useState(false);
  
  const startPoint = helper.createPoint(0,0);
  const startNext = helper.createPoint(0, 1);

  //POINTS
  const [lastPoint, setLastPoint] = useState(startPoint);
  const [nextPoint, setNextPoint] = useState(startNext);
  //AREAS (Correspondingly)
  const [lastArea, setLastArea] = useState(1);
  const [nextArea, setNextArea] = useState(2);

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

    setLastArea(charPattern[lastPoint.stroke][lastPoint.step]);
    setNextArea(charPattern[nextPoint.stroke][nextPoint.step])
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
          newPoint = helper.createPoint(nextStroke, 0);
        }
        //set the nextPoint to the last point!
        updatePoints(lastPoint);
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
    //are we on the last one?
    if (endOfCharacter)
    {
      onCharSuccess();
    }
    else if (endOfStroke)
    {
      onStrokeSuccess();
    }
    //we have not reached the end, so we fail!
    onStrokeFail();
  }

  //SUCESS when:
  //Hit the last point of a stroke
  //Finger Lifted
  //THEN switch to the next stroke!
  function onStrokeSuccess()
  {
    setEndOfStroke(false);
    setEndOfCharacter(false);

    var newPoint = helper.createPoint(teacher.getNextStroke(nextPoint, charPattern), 0);
    updatePoints(newPoint);

    //TODO update to the next stroke!
    console.log("Stroke Success");
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

    setNextPoint(startPoint);
    updatePoints(nextPoint);

    updateSteps([
      {stroke: 0, subStroke: 0},
      {stroke: 0, subStroke: 0}
    ])
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

