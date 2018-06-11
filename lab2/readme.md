# Lab 2: Clocks part 1

In this lab we will begin a two part examination of clocks using d3 that will span this lab and the next homework. We begin our studies of watch faces with the examination of a particular form of watch/clock that has risen to prominence lately: 24 hour clocks. One purveyor of this type of time, slow-watches, asserts that this is a natural or more human method of keeping time (you can read more about their, uh, philosophy here https://www.slow-watches.com/the-brand/). Whether or not having a lower accuracy reading of the current time truly promotes mental well being is a matter for a different time, we are here to make some clocks in SVG using d3.

## Setup

As always this lab starts with installing and running the dependencies.

```sh
npm install

# then

npm run start

# or if you have yarn installed

yarn

# then

yarn start

```

And away we go.

## The Clock

As far as we are concerned the slow clockface has three elements, a hand, a number of ticks (in the slow-watch case 24 * 4), and hour labels (24 of em). In order to simplify the work being done in this lab we have provided you code that with a little input from you will make and move the the ticking hour hand. (This will not be the case on the homework tomorrow).

1. **The ticks**

A good first step will be be to layout the ticks. We ask that you do this using d3 and svg lines. lines have several important properties: x1,y1,x2,y2, and stroke. A data driven approach would see you defining a data set to plug into d3:

```javascript
const tickData = [...new Array(24 * 4)].map((d, i) => i);
```

It will help to use a domain of the unit square (x and y go from minus 1 to 1) mapped into svg values via linear scales. Many a watch face changes the weight of the tick when a tick is exactly on the hour, and our slow clock face should be no exception. You should figure out how to make change the thickness of ticks as appropriate in a data driven manner.

2. **The labels**

Next up you will place hour labels around the border of your clock. To do this you should make use of the text svg element. text has important properties x and y. This should be quite similar to placing your ticks (in fact in the reference solution we used the same data set as from the ticks), albeit with a caveat about the technique for setting the value of the text. Instead of using .attr you should .text, which takes either a string or a single function as arguments.

Observe that the slow-watch has the 12 at the top of the face, just as a traditional watch does, what modification to your layout will you need to add to make that happen? It will probably be adding some fraction of pi somewhere. In order to set the position of the value correctly you should make use of the text-anchor svg property on the text element. Go read up on it!

3. **The hand**
We've provided code to animate a single hour hand (as is the case in the original slow watch). It is commented out at the bottom of the index.js file. Once you are ready, uncomment it and watch you clock come to life!

## Wrapping up

Once you've finished the clock "functionality" you should feel free to get creative and style your clockface however you like! Add borders using circles? Consider ways to make it look more realistic, or cartoony, or weird!? The world/clock is your oyster. Feel free to show off to us.
