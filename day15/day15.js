const fs = require('fs');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n").map(l=>{return l.split('').map(n=>{return Number(n)})});
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

    const graph = _loadGraph(inputArray);

    let maxX = inputArray.length;
    let maxY = inputArray[0].length;
    
    let endPoint = `${maxX-1},${maxY-1}`;
    let shortestPath = _getShortestDistance(graph, '0,0', endPoint);    

    console.log("Path to take: ", shortestPath.path.join(" -> "));
    console.log("Risk to reach end point", shortestPath.risk);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    const newMatrix1 = inputArray.slice();
    // Expand in X Direction
    for (let x = 1; x < 5; x++) {
        inputArray.forEach(line => {
            let newLine = line.map(p=>{
                return p+x>9? p+x-9: p+x;
            });
            newMatrix1.push(newLine);
        });
    }

    const newMatrix2 = newMatrix1.slice();
    // Expand in Y Direction
    for (let y = 1; y < 5; y++) {
        newMatrix1.forEach((line,index) => {
            let newLine = line.map(p=>{
                return p+y>9? p+y-9: p+y;
            });
            newMatrix2[index] = newMatrix2[index].concat(newLine);
        });
    }

    const graph = _loadGraph(newMatrix2);
    //console.log("New graph", graph);
    
    let endPoint = `${newMatrix2.length-1},${newMatrix2.length-1}`;
    let shortestPath = _getShortestDistance(graph, '0,0', endPoint);    

    //console.log("Path to take: ", shortestPath.path.join(" -> "));
    console.log("Risk to reach end point", shortestPath.risk);   

    console.log("________ End of Part 2 ________");
}

function _loadGraph(matrix){

    let maxX = matrix.length;
    let maxY = matrix[0].length;
    //console.log(`Matrix size: ${maxX} x ${maxY}`);

    let graph = {};
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            
            let adjPoints = _getNextPoints({x:x,y:y}, maxX, maxY);
            graph[`${x},${y}`] = {};
            adjPoints.forEach(point => {
                graph[`${x},${y}`][`${point.x},${point.y}`] = matrix[point.x][point.y];
            });
        }        
    }

    return graph;
}

function _getNextPoints(point, maxX, maxY){

    let nextPoints = [];

    if(point.x < maxX-1)  {nextPoints.push({x:point.x+1, y:point.y})};      // Right
    if(point.x > 0)         {nextPoints.push({x:point.x-1, y:point.y})};    // Left
    if(point.y < maxY-1)  {nextPoints.push({x:point.x, y:point.y+1})};      // Down
    if(point.y > 0)         {nextPoints.push({x:point.x, y:point.y-1})};    // Up

    return nextPoints;

}

function _getShortestDistance(graph, start, end){

    let visitQueue = [];
    let visitedNodes = {};
    let totalRiks = {};
    let path = {};

    visitQueue.push(start);
    totalRiks[start] = 0;

    while (visitQueue.length > 0) {
        
        let cp = visitQueue.shift();  // Get next in queue

        if(visitedNodes[cp]){
            continue;   // Already visited... so continue
        }

        //console.log(`Visting ${cp} now..`);
        visitedNodes[cp] = true;        // Add to visited node list

        let nextNodes = graph[cp];      // Get next nodes to visit

        let obKeys = Object.keys(nextNodes);
        obKeys.forEach(nextNode => {
            
            if(nextNode === start){ return; }   // Dont add start again into the queue.

            let newWeight = nextNodes[nextNode] + totalRiks[cp];
            visitQueue.push(nextNode);  // Add to visit queue
            if(totalRiks[nextNode]){
                if(totalRiks[nextNode] > newWeight){
                    totalRiks[nextNode] = newWeight;
                    visitedNodes[nextNode] = false;     // We found new low risk, so visit again
                    path[nextNode] = cp;
                }
            }
            else{
                totalRiks[nextNode] = newWeight;
                path[nextNode] = cp;
            }

        });        
    }

    let cn = end;
    let pathArray = [end];
    do {
        cn = path[cn];
        pathArray.push(cn);
    } while (cn !== start);

    pathArray.reverse();

    //console.log("All risks:", totalRiks);
    return {
        path: pathArray,
        risk: totalRiks[end]
    }
}

function _printMatrix(matrix){
    matrix.forEach(line => {
        console.log(line.join(''));
    });
}