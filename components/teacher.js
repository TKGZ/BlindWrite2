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
export function getNextStep(lastStep, strokeLength, numberOfStrokes)
{
    console.log("NEXT STEP");
    console.log("last stroke: ")
    var result = {
        type: 0,
        step: {
            stroke: lastStep.stroke,
            strokeStep: (lastStep.strokeStep + 1),
        },
    }

    if (lastStep.strokeStep >= strokeLength)
    {
        //at the end of the stroke
        if (lastStep.stroke >= numberOfStrokes)
        {
            // console.log("DONE STROKE")
            //no more new strokes
            //CHARACTER SUCCESS
            result.type = 2;
            result.step.stroke = lastStep.stroke;
            result.step.strokeStep = lastStep.strokeStep;
        }
        //NEW STROKE
        else 
        {
            result.type = 1;
            result.step.stroke = lastStep.stroke + 1;
            result.step.strokeStep = 0;
        }
    }
    return result;
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