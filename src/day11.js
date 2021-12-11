const fs = require('fs');

const fileData = fs.readFileSync('./inputFiles/day11.txt', 'utf8');
const inputArray = fileData.split("\n").map(l=>{
    let la = [];
    for (let index = 0; index < l.length; index++) {
        la.push(Number(l.charAt(index)));
    }
    return la;
});
//console.log(inputArray);

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);

function part1(){

    console.log("====== Part 1 =======");

    let flashResult = {
        octopusArray: inputArray,
        flashCounter: 0,
        flashedPoints: []
    };
    
    let totalFlashCount = 0;
    let steps = 0;

    do {
        
        //console.log(`-------- Current step: ${steps + 1} -----------`);
        flashResult.octopusArray = _addOneStep(flashResult.octopusArray);

        // Reset for this step.
        flashResult.flashCounter = 0;
        flashResult.flashedPoints = [];

        do {
            
            flashResult = _flashOctopus(flashResult);
            totalFlashCount += flashResult.flashCounter;

        } while (flashResult.flashCounter > 0);

        flashResult = _flashOctopus(flashResult);
        steps++;
        //console.log(`After flash calculation:`);_printOctopusArray(flashResult.octopusArray);
        
    } while (steps < 100);

    console.log(`After 100 steps, flash Counter:`, totalFlashCount);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let flashResult = {
        octopusArray: inputArray,
        flashCounter: 0,
        flashedPoints: []
    };
    
    let allFlashed = false;
    let steps = 0;

    do {
        
        flashResult.octopusArray = _addOneStep(flashResult.octopusArray);

        // Reset for this step.
        flashResult.flashCounter = 0;
        flashResult.flashedPoints = [];

        do {
            
            flashResult = _flashOctopus(flashResult);

        } while (flashResult.flashCounter > 0);

        flashResult = _flashOctopus(flashResult);
        steps++;

        allFlashed = _checkAllFlashed(flashResult.octopusArray);
        //console.log(`After flash calculation:`);_printOctopusArray(flashResult.octopusArray);
        
    } while (!allFlashed);

    console.log(`All flashed after`, steps);
 
    console.log("________ End of Part 2 ________");
}

function _addOneStep(array){

    return array.map(line=>{
        return line.map(o=>{
            return o + 1;
        });
    });
}

function _flashOctopus(flashInput){

    let flashCounter = 0;
    let array = flashInput.octopusArray;
    let flashedPoints = flashInput.flashedPoints;

    for (let x = 0; x < 10; x++) {
        
        for (let y = 0; y < 10; y++) {
            
            let point = {x:x, y:y};
            if(array[x][y] > 9){

                let adjPoints = _getAdjacentPoints(point);

                // Remove points that already flashed in this step.
                adjPoints = adjPoints.filter(p=>{
                    return !_checkPointExistsInArray(flashedPoints,p);
                });

                adjPoints.forEach(p => {
                    array[p.x][p.y] = array[p.x][p.y] + 1;
                });
                array[x][y] = 0;
                flashedPoints.push(point);
                flashCounter++;
            }
        }
    }

    return {
        octopusArray: array,
        flashCounter: flashCounter,
        flashedPoints: flashedPoints
    };
}

function _getAdjacentPoints(point){

    let adjPoints = [];

    // First add all adjacent points and then filter out invalid points

    adjPoints.push({x: point.x, y: point.y + 1});
    adjPoints.push({x: point.x, y: point.y - 1});
    adjPoints.push({x: point.x + 1, y: point.y});
    adjPoints.push({x: point.x - 1, y: point.y});
    adjPoints.push({x: point.x + 1, y: point.y + 1});
    adjPoints.push({x: point.x + 1, y: point.y - 1});
    adjPoints.push({x: point.x - 1, y: point.y + 1});
    adjPoints.push({x: point.x - 1, y: point.y - 1});

    adjPoints = adjPoints.filter(p=>{
        if(p.x >= 10 || p.x < 0 || p.y >= 10 || p.y < 0){
            return false;
        }
        else{
            return true;
        }
    });

    return adjPoints;
}

function _checkPointExistsInArray(array, point){

    let check = array.filter(p=>{
        return (p.x === point.x && p.y === point.y);
    });

    if(check.length == 0){
        return false;
    }
    else{
        return true;
    }
}

function _checkAllFlashed(array){

    let sums = array.map(l=>{
       return l.reduce((p,c)=>{return p+c},0); 
    });

    let sum = sums.reduce((p,c)=>{return p+c},0);

    return sum === 0? true: false;

}

function _printOctopusArray(array){
    array.forEach(line => {
        console.log(line.join(''));
    });
}