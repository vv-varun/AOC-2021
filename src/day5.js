const fs = require('fs');
const { isAbsolute } = require('path');

const fileData = fs.readFileSync('./inputFiles/day5.txt', 'utf8');
const inputArray = fileData.split("\n");
//console.log(inputArray);
let lines = _preareLines(inputArray);
//console.log(lines);

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

    straightLines = lines.filter(l => {
        if(l.P1.x == l.P2.x || l.P1.y == l.P2.y){
            return l;
        }
    });
    //console.log("Straight Lines:", straightLines);

    
    let grid = _markIntersectionPointsOnGrid(straightLines)
    //_printGrid(grid, 221, 846);_printGrid(grid, 222, 846);


    let intersectionPoints = _countIntersectionPoints(grid);
    console.log("Intersection Points", intersectionPoints);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    straightDiagonalLines = lines.filter(l => {
        if(l.P1.x == l.P2.x || l.P1.y == l.P2.y){
            return l;
        }
        let xDiff = Number(l.P1.x) - Number(l.P2.x);
        let yDiff = Number(l.P1.y) - Number(l.P2.y);
        if(Math.abs(xDiff) == Math.abs(yDiff)){
            //console.log("Diagonal line points", l); console.log(xDiff, yDiff);
            return l;
        }
    });

    //console.log("Straight and Diagonal Lines", straightDiagonalLines.length);
    // let line1 = straightDiagonalLines[3]; console.log(line1);
    // let grid = _markIntersectionPointsOnGrid([line1])
    // _printGrid(grid,965,595);_printGrid(grid,949,611);
    
    let grid = _markIntersectionPointsOnGrid(straightDiagonalLines)

    let intersectionPoints = _countIntersectionPoints(grid);
    console.log("Intersection Points", intersectionPoints);
    
    console.log("________ End of Part 2 ________");
}

function _preareLines(array){

    let lines = array.map(l => {

        points = l.split(" -> ");
        p1 = points[0].split(",");
        p2 = points[1].split(",");
        return {
            P1: {x: p1[0], y: p1[1]},
            P2: {x: p2[0], y: p2[1]}
        }

    });
    return lines;
}

function _markIntersectionPointsOnGrid(lines){

    let grid = [[]];
    for (let x = 0; x < 1000; x++) {
        let row = [];
        for(let y=0; y < 1000; y++){
            row[y] = 0;
        }
        grid[x] = row;
    }
    //console.log("Initial Grid",  grid);

    lines.forEach(line => {

        let x1 = Number(line.P1.x); let x2 = Number(line.P2.x);
        let y1 = Number(line.P1.y); let y2 = Number(line.P2.y);

        if(x1 == x2 || y1 == y2){
            // Straight Line
            let X1 = x1 > x2? x2: x1; let Y1 = y1 > y2? y2: y1;
            let X2 = x1 < x2? x2: x1; let Y2 = y1 < y2? y2: y1;

            for (let x = X1; x <= X2; x++) {
                for(let y= Y1; y <= Y2; y++){
                    grid[x][y] = grid[x][y] + 1;
                }
            }
        }

        let xDiff = x2 - x1; let yDiff = y2 - y1;
        if(Math.abs(xDiff) == Math.abs(yDiff)){
            // Diagonale Line
            let steps = Math.abs(xDiff);
            let xF = xDiff < 0? -1: 1;
            let yF = yDiff < 0? -1 :1;
            //console.log(`Marking diagonal line from (${x1},${y1}) to (${x2},${y2})`);
            //console.log(`XFactor: ${xF}, YFactor: ${yF}`);
            for (let x = 0; x <= steps; x++) {
                grid[x1+x*xF][y1+x*yF] = grid[x1+x*xF][y1+x*yF] + 1;
            }
        }

    });

    return grid;

}

function _countIntersectionPoints(grid){

    let rowSum = grid.map(row => {

        rs = row.reduce((p,r) => {
            if(Number(r) > 1){
                return p + 1;
            }
            else{
                return p;
            }
        },0);
        return rs;
    });

    gridSum = rowSum.reduce((p,c) => {
        return p + Number(c);
    },0);

    return gridSum;

}

function _printGrid(grid, x, y){

    console.log("*********************");
    console.log(`Grid value at ${x}, ${y} is: ${grid[x][y]}`);

    console.log(`X+1 Grid value at ${x+1}, ${y} is: ${grid[x+1][y]}`);
    console.log(`X-1 Grid value at ${x-1}, ${y} is: ${grid[x-1][y]}`);

    console.log(`Y+1 Grid value at ${x}, ${y+1} is: ${grid[x][y+1]}`);
    console.log(`Y-1 Grid value at ${x}, ${y-1} is: ${grid[x][y-1]}`);

    console.log(`XY+1 Grid value at ${x+1}, ${y+1} is: ${grid[x+1][y+1]}`);
    console.log(`XY-1 Grid value at ${x-1}, ${y-1} is: ${grid[x-1][y-1]}`);
    console.log(`X+1|Y-1 Grid value at ${x+1}, ${y-1} is: ${grid[x+1][y-1]}`);
    console.log(`X-1|Y+1 Grid value at ${x-1}, ${y+1} is: ${grid[x-1][y+1]}`);
}