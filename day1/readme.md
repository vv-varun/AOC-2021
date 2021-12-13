# Day 1: Sonar Sweep

## Part 1
Part 1 is simple.. Just reduce the array and count only the instances where the current element is greater than the last one.

## Part 2
Part 2 is also simple.. 

One can calculate the moving sum first and then apply the same logic as in step 1.. 

However, there is a simplified way.. The expresession : `num[i] + num[i-1] + num[i-2] > num[i-1] + num[i-2] + num[i-3]` can be simplified to `num[i] > num[i-3]`.