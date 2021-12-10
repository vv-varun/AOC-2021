const fs = require('fs');

const fileData = fs.readFileSync('./inputFiles/day9.txt', 'utf8');
const inputArray = fileData.split("\n");
//console.log(inputArray);

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
//test()
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);

function part1(){

    console.log("====== Part 1 =======");

    let lowPoints = _getLowPoints();

    //console.log("Low points", lowPoints);
    let sum = lowPoints.reduce((p,c)=>{
        return p+c.num+1;
    },0);

    console.log("Part 1", sum);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    let lowPoints = _getLowPoints();
    
    //console.log("Low points", lowPoints);
    //let basin = _getBasinForPoint(lowPoints[3]);
    //console.log(`Basin for points (${lowPoints[3].point.index},${lowPoints[3].point.pos}) is: `, basin);

    let basinArray = lowPoints.map(point=> {
        return {point: point, basin: _getBasinForPoint(point)};
    });

    basinArray.sort((b1,b2)=>{
        return b2.basin.length - b1.basin.length;
    });

    //console.log("B1 basin:", basinArray[0]);
    //console.log("B2 basin:", basinArray[1]);
    //console.log("B3 basin:", basinArray[2]);

    let b1 = basinArray[0].basin.length;
    let b2 = basinArray[1].basin.length;
    let b3 = basinArray[2].basin.length;

    console.log(`Top 3 Basin sizes: ${b1}, ${b2}, ${b3}`);
    console.log(`Part 2 answer: ${b1 * b2* b3}`);
    
    console.log("________ End of Part 2 ________");
}

function test(){
}

function _getLowPoints(){

    let lowPoints = [];

    for (let index = 0; index < inputArray.length; index++) {
        
        const line = inputArray[index];
        for (let pos = 0; pos < line.length; pos++) {

            let currentPoint = {index:index,pos:pos};
            let currentValue = _getValueAtPoint(currentPoint);

            let adjPoints = _getAdjacentPoints(currentPoint);
            let adjNumbers = adjPoints.map(p=>{
                return _getValueAtPoint(p);
            });

            adjNumbers.sort();
            
            if(currentValue < adjNumbers[0]){
                lowPoints.push({
                    point: currentPoint,
                    num: currentValue
                });
            }
        }
        
    }

    return lowPoints;
}

function _getBasinForPoint(lowPoint){

    let scanPoints = [];
    let basinPoints = [];
    
    // Low point is also in basin
    basinPoints.push(lowPoint.point);

    let adjacentPoints = _getAdjacentPoints(lowPoint.point);

    adjacentPoints.forEach(p => {

        let valAtP = _getValueAtPoint(p);
        if(lowPoint.num < valAtP && valAtP < 9){
            _addIfNotExists(scanPoints, p);
            _addIfNotExists(basinPoints, p);
        }
        
    });

    for (let index = 0; index < scanPoints.length; index++) {
        
        const point = scanPoints[index];
        let currValue = _getValueAtPoint(point);

        adjacentPoints = _getAdjacentPoints(point);

        adjacentPoints.forEach(adjPoint => {
            
            let valAtP = _getValueAtPoint(adjPoint);
            if(currValue < valAtP && valAtP < 9){
                _addIfNotExists(scanPoints, adjPoint);
                _addIfNotExists(basinPoints, adjPoint);
            }

        });
        
    }

    return basinPoints;


}

function _getAdjacentPoints(point){

    let adjPoints = [];
    let len = inputArray.length;    // 100 - Length and Width are same.

    // Pos on right
    if(point.pos < len - 1){
        adjPoints.push({index: point.index, pos: point.pos + 1});
    }

    // Get number on left.
    if(point.pos > 0){
        adjPoints.push({index: point.index, pos: point.pos - 1});
    }

    // Get number in bottom.
    if(point.index < len - 1){
        adjPoints.push({index: point.index + 1, pos: point.pos});
    }

    // Get number on top.
    if(point.index > 0){
        adjPoints.push({index: point.index - 1, pos: point.pos});
    }

    return adjPoints;
}

function _getValueAtPoint(point){
    //console.log("Get value at point:", point);
    return Number(inputArray[point.index][point.pos]);
}

function _addIfNotExists(array, point){

    let check = array.filter(p=>{
        return (p.index === point.index && p.pos === point.pos);
    });

    if(check.length == 0){
        array.push(point);
    }


}