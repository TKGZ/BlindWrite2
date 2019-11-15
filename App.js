
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


  //last inputed step [strokeID, char id]
  //[-1, -1] means nothing inputed yet
  // const [lastStep, setLastStep] = useState([-1, -1]);
  const [lastStep, setLastStep] = useState({stroke: 0, strokeStep: 0})
  //corresponding area
  const [lastArea, setLastArea] = useState(1);

  //EXPECTED
  //ID of the characterstep we expect char step [stroke, step of stroke]
  // const [nextStep, setNextStep] = useState([0, 0]);
  const [nextStep, setNextStep] = useState({stroke: 0, strokeStep: 0});

  //corresponding area
  const [nextArea, setNextArea] = useState(1);

  const [failedStroke, setFailedStroke] = useState(false);
  
  //run the pattern checker

  //get the height of the screen somehow
  var height = Dimensions.get('screen');

  //the new steps [old, new]
  var newSteps = [];

  // useEffect(() => {
  //   if (onArea == nextArea)
  //   {
  //     updateSteps();
  //   }
  //   else
  //   {
  //     if (onArea == 0 || onArea == lastArea)
  //     {
  //       //do nothing
  //     }
  //     //fail! wrong move!
  //   }   
  // }, [onArea, lastStep]);


  //update if:
  //not the first one
  //last one?
  //INPUT: [newLastStep, newNextStep]
  function updateSteps(newSteps)
  {   
      setLastStep(newSteps[0]);
      setNextStep(newSteps[1]);
      setLastArea(charPattern[newSteps[0].stroke][newSteps[0].strokeStep]);
      setNextArea(charPattern[newSteps[1].stroke][newSteps[1].strokeStep]);
      console.log("update steps");

      //check if complete?
  }

  function onTouchMove()
  {
    if (onArea == nextArea && failedStroke == false)
    {
      var newStep = teacher.getNextStep(lastStep, charPattern[lastStep.stroke].length, charPattern[0].length);
      if (newStep.type == 0)
      {
        // console.log("Mid-stroke step");
        updateSteps([nextStep, newStep.step]);
      }
      else if (newStep.type == 1)
      {
        onStrokeSuccess();
        //newSTROKE
        updateSteps([nextStep, newStep.step]);

      } else if (newStep.type == 2)
      {
        //character is done!!
        //check if still no final area!

        // updateSteps([nextStep, newStep.step])
        onCharSuccess();
      }
    }
    else
    {
      if (onArea == 0 || onArea == lastArea)
      {
        //do nothing
      }
      else
      {
        onStrokeFail();
      }
      //fail! wrong move!
    }   
  }

  //when touch starts
  //check if area = nextArea
  //if not then reset
  //should I start a stroke?
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

    //NO? => strok fail!
    onStrokeFail();
  }

  //SUCESS when:
  //Hit the last point of a stroke
  //Finger Lifted
  function onStrokeSuccess()
  {
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
    setFailedStroke(true);
    setLastStep({stroke: 0, strokeStep: 0});
    setNextStep({stroke: 0, strokeStep: 0});
    updateSteps([
      {stroke: 0, strokeStep: 0},
      {stroke: 0, strokeStep: 0}
    ])
  }

  function onCharSuccess()
  {
    //next character
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

