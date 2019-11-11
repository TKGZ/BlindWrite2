//helper functions here

export function test()
{
    console.log('test');
}

//TODO this
//instead of centerpoint/radius pass a square object?
export function isOnSquare(point, center, radius)
{
}

//TODO
export function isOnCircle(point, center, radius){

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
export function getSpaceInterval(i, n, r, l)
{
    return (i * (l -  2*r)/n);
}

