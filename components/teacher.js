import * as feedback from './feedback';

const characters = ({
    a:[[7,2,9],[4,6]],
    b:[[1,2,"b",5,4,5,"d",8,7],[1,7]], 
    c:[[3,2,4,8,9]],
    d:[[1,2,6,8,7],[1,7]],
    e:[[1,3],[4,6],[7,9],[1,7]],
});

const keys = Object.keys(characters);
const numberOfCharacters = keys.length;

//logic behind teacher functions

//check if area is correct

//TESTING RELATED

//returns next step
//0.0 if done!
//types:
//0 means mid-stroke
//1 means new stroke
//2 means entire character is done!
// export function getNextStep(lastStep, strokeLength, numberOfStrokes)
// {
//     console.log("NEXT STEP");
//     console.log("last stroke: " + lastStep.stroke + "| subStroke " + lastStep.subStroke);
//     console.log("Stroke length " + strokeLength + "| num STrokes " + numberOfStrokes);
//     console.log("")
//     var result = {
//         type: 0,
//         step: {
//             stroke: lastStep.stroke,
//             subStroke: (lastStep.strokeStep + 1),
//         },
//     }

//     if (lastStep.strokeStep >= strokeLength)
//     {
//         //at the end of the stroke
//         if (lastStep.stroke >= numberOfStrokes)
//         {
//             // console.log("DONE STROKE")
//             //no more new strokes
//             //CHARACTER SUCCESS
//             result.type = 2;
//             result.step.stroke = lastStep.stroke;
//             result.step.subStroke = lastStep.strokeStep;
//         }
//         //NEW STROKE
//         else 
//         {
//             result.type = 1;
//             result.step.stroke = lastStep.stroke + 1;
//             result.step.subStroke = 0;
//         }
//     }
//     return result;
// }

//call this when you want to get the ext step in a stroke (i.e the next point to reach during the same stroke)
//returns null when there are no other steps left (i.e we were already on the last point of the stroke!)!
export function getNextStep(currentPoint, character)
{
    // console.log('getting next step');
    console.log('point: STEP ' + currentPoint.step + " stroke " + currentPoint.step)
    var strokeLength = character[currentPoint.stroke].length;
    if (currentPoint.step >= strokeLength)
    {
        //last point on current stroke
        return (null);
    }
    else
    {
        var newStep = currentPoint.step + 1;
        console.log('new step is ' + newStep)

        return (newStep);
    }
}

//call this when you are done with a stroke, and want to get the first point of the next stroke!
//returns null when there are no strokes left
export function getNextStroke(currentPoint, character)
{
    console.log("getting next stroke")
    var numberOfStrokes = character.length;
    if (currentPoint.stroke >= numberOfStrokes)
    {
        //no more strokes left!
        return (null);
    }
    else
    {
        return (currentPoint.stroke + 1);
    }
}

//returns random character stroke
export function getNextCharacter()
{
    return getCharacter(Math.random() * size);
}

//returns character strokes
//RETURNS ARRAY: [name, pattern]
export function getCharacter(id)
{
    //just in case
    id = id % size;

    return ([keys[id], characters[keys[id]]]);
}