const { triggerAsyncId } = require('async_hooks');
const fs = require('fs');
const path = require('path');

const fileData = fs.readFileSync(__dirname + '/input.txt', 'utf8');
const inputArray = fileData.split("\n");
const pathSegments = _preparePathSegments(inputArray);
//console.log(pathSegments);

let maxTraversalCount = 0;
let maxCavesFor2Visits = 0;

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

    let pathTree = {paths:[['start']], openPaths:1};

    do {
        
        pathTree = _addPossiblePathSegments(pathTree.paths);

    } while (pathTree.openPaths > 0);
    
    console.log("Total possible paths", pathTree.paths.length);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");

    // Change config... rest logic is same as part 1.
    maxCavesFor2Visits = 1;

    let pathTree = {paths:[['start']], openPaths:1};

    do {
        
        pathTree = _addPossiblePathSegments(pathTree.paths);

    } while (pathTree.openPaths > 0);
    
    console.log("Total possible paths", pathTree.paths.length);


    console.log("________ End of Part 2 ________");
}

function _addPossiblePathSegments(paths){

    let newPaths = [];

    paths.forEach(path => {
        let endNode = path[path.length - 1];
        if(endNode === 'end'){
            // Found end... so just keep it in options
            newPaths.push(path);
        }
        else{
            // Open segment.. so continue to explore this.
            let possibleSegments = pathSegments[endNode];
            possibleSegments.forEach(seg => {

                let traversed = _checkPathHasSegment(path, endNode, seg);
                if(!traversed){
                    // If this path was traversed.. dont traverse again.. else will enter infinite loop.
                    let newPath = [].concat(path);
                    newPath.push(seg);
                    newPaths.push(newPath);
                }
            });
        }
    });

    // Remove paths based on small cave count.
    newPaths = newPaths.filter(path=>{
        let smallCaveCounts = _getCountOfSmallCaves(path);
        let twoTimesVisitedCaves = [];
        let threeTimesVisitedCaves = [];
        for (const [key, value] of Object.entries(smallCaveCounts)) {
            if(value > 1 && value <= 2){twoTimesVisitedCaves.push(key);}
            if(value > 2 ){threeTimesVisitedCaves.push(key);}
        }
        return (twoTimesVisitedCaves.length > maxCavesFor2Visits || threeTimesVisitedCaves.length > 0)? false: true;
    });

    // Count open paths
    openPaths = newPaths.filter(path=>{
        return path[path.length - 1] === 'end'? false: true;
    });

    //console.log("New simulated paths --", newPaths);

    return {
        paths: newPaths,
        openPaths: openPaths.length
    };
}

function _checkPathHasSegment(path, node1, node2){
    // Checks if a current path already has segment from node1 -> node2
    let traversed = -1;
    for (let index = 1; index < path.length; index++) {
        if(node1 === path[index-1] && node2 === path[index]){
            traversed++;
        }
    }
    return traversed > maxTraversalCount? true: false;
}

function _getCountOfSmallCaves(path){

    let smallCaveCounts = {};

    path.forEach(node => {
        if(node === 'start' || node === 'end'){
            // Do nothing
        }
        if(node.toLowerCase() === node){
            smallCaveCounts[node] = smallCaveCounts[node]? smallCaveCounts[node]+1 : 1;
        }
    });

    return smallCaveCounts;
}

function _preparePathSegments(array){

    let pathSegments = {};
    array.forEach(path => {
        let nodes = path.split('-');
        _addNodesToPath(pathSegments, nodes[0], nodes[1]);
    });

    return pathSegments;
}

function _addNodesToPath(path, node1, node2){
    // Add node1 -> node2   as valid traversal path
    // Add node2 -> node1   as valid traversal path

    if(!path[node1]){
        path[node1] = [];
    }

    if(!path[node2]){
        path[node2] = [];
    }

    path[node1].push(node2);    //  node1 -> node2
    path[node2].push(node1);    //  node2 -> node1


    if(node1 === 'start'){
        path[node2].pop();      // Remove node2 -> node1 because we dont go to start again.
    }
    if(node2 === 'start'){
        path[node1].pop();      // Remove node1 -> node2 because we dont go to start again.
    }

    if(node1 === 'end'){
        path[node1].pop();      // Remove node1 -> node2 because we dont go away from end.
    }
    if(node2 === 'end'){
        path[node2].pop();      // Remove node2 -> node1 because we dont go away from end.
    }

}

function _printPaths(paths){

    paths.forEach(path => {
        console.log(path.join(','));
    });
}