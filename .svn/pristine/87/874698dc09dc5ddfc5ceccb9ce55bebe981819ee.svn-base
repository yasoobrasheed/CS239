# HW2 coding component - Varying SVG with d3

## TLDR:
modify index.js so that viewing index.html produces something like what is seen in expected-output.png (the synthetic data is randomized with each reload).  svn commit changes to index.js.  No other files need modifying, and no other files should be svn add'ed or svn commit'ed.

## Setup

In this homework we will engage in a basic d3 task of creating a number of variations on a svg object. Through this work you will get to experience with elementary manipulations of svn through svg. Just as in lab1, make sure you either have node >= v4 and npm installed, or also have yarn installed.

```sh
# first run
npm install

# then
npm run start

# or, if you have yarn installed:

yarn

# then

yarn start

```

When you first open the page you should see the name of the assignment, and when you open the console you should see some errors.

## The task

You will explore various way to encode information using d3. Specifically you must provide each of the following

- scatterplot like circles whose y position is selected by val and whose x pos is selected by cat
- bar chart like lines, whose origin should be at 0 and the appropriate cat value, and whose end point should be at val and the appropriate cat point.
- ellipses that are centered on (<cat val>, 0) and have vertical radius equal to the associated val. They should have a horizontal radius that keeps them inside of their bandwidth
- rounded rects, make 6 rectanges whose "roundedness" (rx/ry) varying based on the val of the data. These rects should be placed horizontally according to their cat value. It would be helpeful to define another scale for this task.
- Stroke varying circles, make 6 circles whose thickness (stroke-width) varys between 0 and 0.4 * the bandwidth according to val of the data. These circles should be placed horizontally according to their cat value. It would be helpeful to define another scale for this task.
- Hue varying circles, make 6 circles of varying hue that are colored by hcl(SCALED_VAL, 40, 50). SCALED_VAL should be somewhere between 0 and 300 corresponding to the val of the data. It would be useful to make another scale here. These circles should be placed horizontally according to their cat value.
- Saturation varying circles, make 6 circles of varying saturation that are colored by hcl(0, SCALED_VAL, 50). SCALED_VAL should be somewhere between 0 and 80 corresponding to the val of the data. It would be useful to make another scale here. These circles should be placed horizontally according to their cat value.
- Luminance varying circles, make 6 circles of varying saturation that are colored by hcl(0, 10, SCALED_VAL). SCALED_VAL should be somewhere between 20 and 80 corresponding to the val of the data. It would be useful to make another scale here. These circles should be placed horizontally according to their cat value.

To complete this assignment you will only modify the index.js file where indicated, and NO WHERE ELSE. When you are done, viewing your index.html in a browser should look something like expected-output.png (remember, though, data generation is random and will change on each refresh).  svn commit your changes to index.js.  No other files need modifying, and no other files should be svn add'ed or svn commit'ed.

Tips:
- you can dry out the final three tasks by combining summarizing their modifications as a list of objects, like
```js
[{name: 'Hue' ....}]
```
And then iterating across that data.
- Data generation is random, so don't be surprised from one reload to the next if the data changes a little.
- In our implementation we made 8 scales, 7 scaleLinear's and 1 scaleBand ( https://github.com/d3/d3-scale#band-scales)

## Grading

The grade will be 80%/20% correctness and style.
*Correctness* (80%): Correctness will be verified visually and through inspection of code. Correct code will only involve modifying the javascript file where indicated.
*Style* (20%): Style will be measured first with lint, and then by eye. Code that does not pass lint will get a zero for style.
