//helper functions here

export function test()
{
    console.log('test');
}

//returns distance between two points
export function getDistance(a, b)
{
    return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow(a.y - b.y, 2));
}

//TODO
//are both points equal?
export function isEquals(a, b)
{
    if ((a.x == b.x)&&(a.y == b.y))
    {
        return (true);
    }
    return (false);
}

//how much to push from the left or top
//get starting coordinates
//i: 0-starting-i'th object to place
//n: number of objects to spread across dimension
//r: radius of each object
//l: total length accross the dimension
//returns "how much" to push the item in that direction to place it properly
//example for middle items across x access of size 100, 20 square
//getSpace(1, 3, 10, 100)
export function getSpaceInterval(index, numberOfElements, radius, length)
{
    return ((index) * (length -  2*radius)/(numberOfElements - 1));
}

export function createPoint(a, b)
{
    return (
        {
            stroke: a,
            step: b,
        }
    )
}

//TODO improve this function
export function isValidPoint(point)
{
    if (point === undefined || point.stroke == null || point.step == null)
    {
        return false;
    }
    if (Number.isInteger(point.stroke) && Number.isInteger(point.step))
    {
        return true;
    }
    return false;
}

export function printPoint(point, pre = "")
{
    if (!isValidPoint(point))
    {
        console.log(pre + ": invlalid point, not print")
    }
    else
    {
        console.log(pre + ": " + point.stroke + "," + point.step);
    }
    
}


//function prototype object constructor
//use newobject = new Point(123,2 3123); or something
export function Point(stroke, step)
{
    this.stroke = stroke;
    this.step = step;
}

//weak character checker
export function isValidCharacter(character)
{
    if (character === undefined)
    {
        console.log("invalid character");

        return false;
    }

    for (var i = 0; i < character.length; i++)
    {
        if (character[i] === undefined)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}