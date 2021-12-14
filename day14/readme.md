# Day 14: Extended Polymerization

## Part 1
As usual, part 1 is simple. 

It can be solved by simply simulating the polymer reaction and then counting the occurances.

## Part 2
Just like the [Day 6](https://adventofcode.com/2021/day/6), if you use the same logic as in Part 1 - you will get memory issues.

So obviously, we have to think of an alternate way..

You'll observe that a pair is replaced by 2 pairs. For e.g. the paor `NN` is replaced by: `NC` and `CN`. 

So, my idea is to keep counting the pairs.. and then in the end, count elements based on pair count.

The approach that I took was : 
- First count the number of pairs. For e.g. there are 3 pairs: `{NN: 1, NC:1, CB: 1}`
- Loop over the pairs and replace each pair by its substitute and keeep incrementing the counts
- After 2nd loop the pair counts are: `{ CN: 1, NB: 2, BC: 2, CC: 1, BB: 2, CB: 2, BH: 1, HC: 1 }`
- Continue for 40 loops and then count the elements
- Note: When you count the individual elements, they will be double counted. So, for the final counts, divide it by 2.