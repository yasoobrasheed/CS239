# Force Directed Graph Layout

In this lab we will be looking at a compulsively interesting looking visualization type: the force directed graph. In this type of graphic nodes and links are initially placed in a force simulation and then are iteratively adjusted by taking time steps within the force simulation. The inspiration for this type of graphic finds it's origins in physics, and in fact, the d3 library we will use (d3-force) makes use of a rudimentary force simulation system straight out of physics called verlet integration.

Through this work we will be exploring the world of languages, specifically we will be looking at 17 most common languages in the world and the countries that use them as their either official or unofficial language.


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


## The Data

The data we will be working with was curated form wikipedia (https://en.wikipedia.org/wiki/List_of_languages_by_the_number_of_countries_in_which_they_are_recognized_as_an_official_language), it is organized as an object, where the keys are languages and the values are lists of countries that speak that language official or unofficially. I did the data collection very rapidly, so if you see a problem in the data you should fix it.

Graphs, in the computer science sense of the word, are an object with two associated sets, a set of nodes and a set of edges or links. Perhaps unsurprisingly, our final graphic will model this as a collection of circles and lines. We will have two types of nodes, one for each of the languages and one for each of the countries. The links will show that a language is the official or unofficial language of country.

We have reformatted this data for you into a format that is a little easier to work with, namely, arrays of objects. Both the languages are the countries are represented in these lists for reasons that will become clear. The nodes look like:

```js
[
  {
    "name": "Antigua and Barbuda",
    "nodeType": "country"
  },
  {
    "name": "Bahamas",
    "nodeType": "country"
  },
  {
    "name": "Barbados",
    "nodeType": "country"
  },
  {
    "name": "Belize",
    "nodeType": "country"
  },
  ...
]
```
While the links look like

```js
[
  {
    "source": "Antigua and Barbuda",
    "target": "English"
  },
  {
    "source": "Bahamas",
    "target": "English"
  },
  {
    "source": "Barbados",
    "target": "English"
  },
  {
    "source": "Belize",
    "target": "English"
  },
  ...
]
```
Source and target are important key words for using d3-force, as they specify to the simulator the direction of the link being used. In this case the target is always the language and the source is always a country.

## Getting things going

Our first step, as is often the case, will be to create 3 scales. Two linear scales for the x and y directions (give em domain -1000 to 1000 and range of the plot width and height) (we use this artificial domain in order to have a zoom control for tweaking our viewing of the visualization), and one ordinalScale for color the language nodes and links, for which the domain should be languages in the graph and the range should be the provided list of colors.

Next grab the svg container and set it's width and height, save it as svg. Next build two data bound selections
- linkContainer: this will hold a collection of lines and will be data bound to our links data. The strokes of these lines should be determined using the color scale and the target of the link.
- nodesSelection: This container will hold a collection of gs that are data bound to our nodes. You don't need to set any properties on the g other then appending it here.

Within the nodesSelection append a circle. You should set the radius to be 50 if we are looking at a language and 25 if we are looking at a country. Similarly if you should set the fill to be #e1c47a if you are looking at country, and should use the color scale if you are looking at a language.

We need to add labels to these nodes. To do so we will select against the nodeSelection and make a databind with the split just like in the last lab. Here we provide you the code to do that:
```javascript
nodesSelection
  .selectAll('text')
    .data(d => d.name.split(/(?=[A-Z][^A-Z])/g).map(line => ({name: line, nodeType: d.nodeType})))
  .enter().append('text')
    .attr('class', 'node-label')
    .attr('text-anchor', 'middle')
    .attr('font-size', d => d.nodeType === 'country' ? 10 : 15)
    .attr('x', 0)
    .attr('y', (d, i) => i * 10)
    .text(d => d.name);
```


## Setting up the simulation

Now you should see exactly nothing on the page. Weird! This is because the force simulation will be setting the positions of everything and it's better to do all of our positioning in one place. Just like treemap, line, or pie, we will use a new layout function called forceSimulation. This is a special kind of function that builds up a list of forces and interacts with nodes and links. Here's the one to use:

```javascript
const simulation = forceSimulation()
  .force('link', forceLink().id(d => d.name))
  .force('charge', forceManyBody())
  .force('collision', forceCollide().radius(50))
  .force('center', forceCenter(0, 0));
```
What do each of these forces do?
- forceLink causes elements with links between them to be drawn together
- forceManyBody causes elements to push each other away from one another, like the opposite of gravity
- forceCollide allows you to specify the radial size of each of the nodes, therein preventing them from overlapping. You can given a function instead of the place where we have 50, which could enable you to specify a distance for languages vs countries.
- forceCenter gravitates all nodes towards a specified point, in this case 0,0. This works well for us becauase of the peculiar scales we made in the beginning.  

Next you need to start the simulation


```javascript
simulation.nodes(nodes).on('tick', ticked);
simulation.force('link').links(links);
```
This associates a link between the data of the nodes and links from above, and the nodes and links that will be in the force simulation.

One last step! Within the tick function place the following code:

```javascript
linkContainer
  .attr('x1', d => x(d.source.x))
  .attr('y1', d => y(d.source.y))
  .attr('x2', d => x(d.target.x))
  .attr('y2', d => y(d.target.y));

nodesSelection
  .attr('transform', d => `translate(${x(d.x)}, ${y(d.y)})`);
```

If everything is set up right, the graphic should spring to life!


## Playing around

The current sets of positions is very random, you should try out different ways to permute the initial starting positions to change the final layout. You can do this by modifying the data formatting step with x's and y's as appropriate. It's also interesting to alter the order of the nodes and links (try out strategic replaces of arrays reverse function (example usage const x = [1, 2, 3].reverse())!). How could use d3-annotate to point out interesting language clusters?
