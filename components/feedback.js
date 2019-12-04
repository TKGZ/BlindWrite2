//this contains all the feedback related components
import {Vibration} from 'react-native';
import {Audio} from 'expo-av';
// import {Audio} from 'expo';

export function onAreaChange(area)
{
    if (0 < area && area < 10)
    {
        squareArea();
    }
    else if ('a' <= area && area < 'z')
    {
        circleArea();
    }
}

export function squareArea()
{
    Vibration.vibrate(100);
}

export function circleArea()
{
    Vibration.vibrate(50);
}

//latest is correctly inputed
export async function correctArea()
{
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('../assets/audio/feedback/correct.mp3'));
        await soundObject.playAsync().then(console.log("correct sound"))
        // console.log("correct sound")

    } catch (error) {
        // console.log("ERROR sound correct area");
        reportSoundError();

        console.log(error.message);
        throw error;
    }
}

//latest is incorrectly inputed (i.e hit the wrong button)
export function incorrectArea()
{

}

//Entire letter is succesfully inputed
export function letterSuccess()
{

}

export function startCharacter(name)
{

}

export function startStroke(stroke) 
{
    
}

export async function fail()
{
    //play a simple failiure sound heheh
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('../assets/audio/feedback/error.mp3'));
        await soundObject.playAsync().then(console.log("fail sound"))
        // console.log("correct sound")

    } catch (error) {

        reportSoundError();
        console.log(error.message);
        throw error;
    }
    
}

//inform user what next area to touch is
export function nextArea(name)
{

}

//playback the sound of an area (usually next area!)
export function areaSound(a = 0)
{
    if (a == 0)
    {
        return;
    }
    
}

//playback the sound of the character to be drawn!
export function charSound(c = "a")
{

}
//Entire letter fails somehow?
//START OVER!
// export function failiure()
// {

// }

function reportSoundError()
{
    console.log("=>>> SOUND ERROR")
}