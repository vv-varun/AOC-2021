# Day 6: Lanternfish
[Lantern Fish population explosion](https://adventofcode.com/2021/day/6)

## Part 1
Part 1 is obviously easy... 

You could just simulate population explosion by 80 days.. 

## Part 2 
Part 2 is tricky... 
Because if we use the same trick as part1 - then we will eventually get memory heap errors... because the Javascript array will outgrow..

To resolve this, I divided the problem into smaller bits.. 

- Count the number if fish per age..
- Simulate birth explosion for 1 fish and multiply by the number of fishes of that age..
- Even if you take 1 fish - simuluation of 256 days will overflow the array..
- So divide it into 2 parts : 128 each.
- For the 1st 128 parth -- simulate... Count and then repeat for the next 128
- Multiply and add.