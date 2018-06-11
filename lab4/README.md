# Treemaps
In this lab we will be investigating treemaps. Treemaps are a splendid way to represent data that has a nested aspect to it. They allow for the easy display of complicated relative information, such as nested-part-to-whole relationships in a easy to grok fashion. Checkout the wikipedia page (https://en.wikipedia.org/wiki/Treemapping) or Ben Shneiderman's excellent History of treemaps (http://www.cs.umd.edu/hcil/treemap-history/index.shtml) for more context.

## Setup

As always, have npm/node/yarn installed.

```sh
npm install
# then
npm run start

# or if yarn-ing
yarn
# then
yarn start
```

Just as in the previous assignments we will be using the gulp build pipeline. This means that you will still need to be explicit about your imports, eg
```js
import {functionFromModule} from 'target-module';
```
Just like the previous lab, we have installed all the packages you should need to complete the lab.


## The work

We will be examining a dataset that describes diversity in silicon valley. It contains data describing the counts for a variety of permutations of position, gender, race, and job_category from 22 Silicon Valley companies. If you've taken CS121 this data should sound familiar because, well, it's the same as the final assignment in that course. (The write up about the data is quite compelling, take a look, https://classes.cs.uchicago.edu/archive/2017/fall/12100-1/pa/pa7/index.html) Unlike that assignment, we will provide the data manipulation structures for you (via d3-hierarchy and a nested group by function) and leave the rendering of the data to you. We will also take a look a brief look at interactivity by adding tooltips to our treemap.

Your first move will be to create a function that takes in tree structured data and prepares it for rendering. Just like the arc function you used to create the chromachron or the line function from the previous lab, we will use another d3 layout function to achieve this goal. Specifically we will set up a treemap. This function is imported at the top of the file, you should set a variety of properties on it

  - tile: this specifies which layout strategy to use when building the treemap. We import treemapResquarify at the top of the file, but you should feel free to pick whichever of the 6 or so treemaps modes offered by d3-heirachy you like.
  - size: This is the bounds of the tree map, it'd be good to select plotheight and plotwidth
  - round: a boolean on whether to round, foor around with it
  - paddingInner: like the name suggests this is the interior padding of the cells. You should give it a small number like 0 or 1, but once your treemap is running you should feel free to play around.

Next you should make an ordinal scale with a domain specified by the keys found by running groupBy(data, COLOR_BY). You should feel free to permute COLOR_BY. The range for this scale will be a discrete color range, the reference solution uses schemePaired, but https://github.com/d3/d3-scale-chromatic has many additional options.

Once all of this is in place we've provided a data manipulation step that will reformat the input data using the treemap function you make (which we assumed is called treemapEval). After this runs, you should grab the svg element as usual (while setting the height and width).

To begin, you will create a data join between 'g' and the data generated from data.leaves(). Position the g's using the transform attribute by setting the translate as appropriate. Big tip: the data that will be provided to you has x0 and y0 values, but no x and y!! Save this as a variable called cell. This setup allows you to insert arbitrary additional elements into the data bound gs. This will be useful as we will want to insert rects into them.


Next you will call append on cell. Specifically you should append a rect, that has attributes id, width, height, and fill. All of these will be data driven attributes. You should try console.log-ing on one of the attributes to see where everything is. You should use your ordinal color function to set the fill based on the name of the row, you should use the id property. Width and height can be inferred from the x0/x1/y0/y1: but how?! Do work!

We're getting close now. Text can be a little fiddly, so it should get it's own data bind in side of cell. Specifically you should do a selectAll on text inside of cell, and give it a data property `d => d.data.name.split(/(?=[A-Z][^A-Z])/g)`. What does this do? what is the data we are working with in this case? Try console logging it out if you are confused. Enter and append text. Set the x attr to be 4, and the y attr to be (d, i) => 13 + i * 10, and the text to be....?

You should now have a label tree map! Big success! Try varying the COLOR_BY and GROUP_BY variables to see what types of results you get.

Bonus: You might notice some of the text overflows from it's container. This isn't the most visually attractive thing in the world, but there is a solution: clip-paths. Clip-paths are slightly out of scope of this lab, but roughly: they allow the specification of a visible area within a given svg element. We aren't getting into them because there construction is quite fiddly. If you are curious you should read about them. (Also, check out the link to bl.ock at the bottom for how to add them to our tree).


## The new parts

So far what we've been doing in this lab should be pretty familiar, but we're now we're gonna spice things up. We will be adding a tooltip, which is a way for users to hover over a given cell and show extra information that might be hard to view otherwise. TIP: If you find yourself replicating this work later, make sure you install d3-transition. It's easy to forget to do!! We've already done it for you in this lab, but just bare that in mind.

Now then. Start by adding selecting against the body and appending a single div with a class 'tooltip' and opacity 0. No need to data bind! Save this as a variable called div. Using that exact class is important, as we'll see later on.

We're going to add a new property to the rect you appended to cell called listener. Listeners are functions that get triggered when an event happens. You've seen at least one listener before on the clocks assignments: when the clock would finish it's transition it would call the update function again. In d3 we specify listener on elements like so:

```js
MY_SELECTION_AND_PROPERTY_CONFIGURATION
  .attr('EXAMPLE_PROPERTY', 'EXAMPLE_VALUE')
  .on('EVENT', CALLBACK_FUNCTION)
```
Where event tends to be one of mouseover, mouseout, click, mousedown, mouseup, etc (for the complete list check out the MDN: https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events). This is the method that the browser exposes to let the programmer make interactive applications that are driven by javascript.

Here we want to use a 'mouseover'. Add an 'on' call at the end of the of the place where you append the rect to the cell. The second argument will be a function, that has as it's first argument the properties of the cell, which we'll call node. This will look something like:

```js
.on('mouseover', node => {
  YOUR CODE
})
```
We want our tooltip to move to whatever treemap cell we are hovering over. To do this we will call `div.transition().duration(40)`, and then specify some properties specifically left and top. Because the element we are modifying, a div, is an html element and not an svg element we can not specify x and y. Instead we will specify the number of pixels from the top of the screen and from the left of the screen like:
```js
CODE
.style('left', `${event.pageX - 50}px`)
.style('top', `${event.pageY - 70}px`);
```
Here we are using d3's event function which allows us to get the relevant info about he most recent event that has been called, in this case where on the screen we out mouse is hovering.

Finally we will put content into our tooltip but setting the inner html of the element, like so:
```javascript
div.html(
  `<div>${node.data.name.split('_').join(' ')}: ${node.data.size}</div>`
);
```

And that's it! You should have a working tooltip! It should fly around like magic! In a kinda cheesy way!

You might ask yourself, how is this styled? Where did this sweet tooltip come from? For that, I point your attention to the scss file. In it we specify that the div with class tooltip will have a variety of style features that will make it look like a tooltip, as well as, most importantly, specify that it will use position absolute. This property pulls the element in question out of the positioning the browser would do automatically, and positions it in a relation to the most recently called position: relative (which by default is the root body element). Also worth noting is the pointer-events: none; property. This makes it so that all mouse events that interact with the tool tip are ignored: it is opaque to the mouse. This is useful for tool tips as the interaction we care about occurs behind the tooltip.


### Credit Where Credit Is Due

This lab was strongly influenced/copied by/from Bostock's block on treemaps https://bl.ocks.org/mbostock/4063582. As mentioned above the data is from the final cs121 assignment, though it is presented in a very different fashion.

