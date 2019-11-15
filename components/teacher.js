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
export function getNextStep(lastStep, strokeLength, numberOfStrokes)
{
    if (lastStep.stroke >= strokeLength)
    {
        if (lastStep.strokeStep >= numberOfStrokes)
        {
            return null;
        }
        return ({
            stroke: (lastStep.stroke + 1),
            strokeStep: 0,
        })
    }
    return({
        stroke: lastStep.stroke,
        strokeStep: (lastStep.strokeStep + 1),
    })
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