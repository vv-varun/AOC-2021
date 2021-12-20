# Day 20: Trench Map

For day20, this puzzle was simple as compared to previous days puzzles.

The only tricky part was : **Infinite image**

So, if the image is infinite, the pixels outside the image boundry will all be the same. 

For e.g. in the initial (original) image, if you take a section of 9x9 pixels far far away from the given part, it will be : 
```
. . . 
. . .
. . .
```
The decimal equivalent of this will always be 0 and at 0 index of image enhancement algorithm, we have `#`

So, after 1st iteration, all infinite pixels outside the image boundary will become `#` .. 

And in the next step, the 9x9 pixels will be : 
```
# # #
# # #
# # #
```
The decimal equivalent of this will always be 511 and at that index of image enhancement algorithm, we have `.` 

So after every even steps, all the `#` pixels will become `.`. 

Once this is clear, then its simple loop / replace logic.