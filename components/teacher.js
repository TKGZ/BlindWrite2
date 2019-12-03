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

export function getNextStep(currentPoint, character)
{
    // console.log(character);
    console.log("=> getNextStep")
    
    if (character === undefined)
    {
        console.log('character is undefined');
        return;
    }
    else if (currentPoint === undefined)
    {
        console.log('currentPont is undefined');
        return;
    }
    else if (currentPoint.stroke == null)
    {
        console.log("Final Stroke Reached");
        return;
    }
    else if (currentPoint.step == null)
    {
        console.log("Final Step reached");
        return;
    }
    // console.log('getting next step');
    console.log('point: stroke ' + currentPoint.stroke + " step " + currentPoint.step);
    if (character[currentPoint.stroke] === undefined)
    {
        console.log('stroke ' + currentPoint.stroke + " does not exist")
    }
    var strokeLength = character[currentPoint.stroke].length;
    if (currentPoint.step >= strokeLength - 1)
    {
        return (null);
    }
    else
    {
        var newStep = currentPoint.step + 1;
        // console.log('new step is ' + newStep)
        console.log("SUCCESS: newStep is " + newStep)
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