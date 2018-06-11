# Lab 1: Using Javascript to Make Basic Images

## Introduction

In this lab you will rebuild a color composition by color theorist Josef Albers. Albers' work examines the interaction of color, and provides a stellar introduction to the manner in which color can be used and misused. Here we will be reproducing one of his simpler compositions. (If you are interested his work is quite beautiful, work giving the plates a look http://www.g-e-s-t-a-l-t.org/MEDIA/PDF/Interaction-of-Color.pdf). We have provided you a skeleton to start from: it consists of a html document, a javascript file, and a css file. Using these elements you will modify the rudimentary markup found in the html file and add code to the javascript file so that the output (vaguely) matches that found in the easy-albers.png file.

**TLDR**: your goal is modify the index.js file, so that the when index.html is viewed in the browser it looks like target-solution.png . You finish the lab by svn commit'ing your changes to index.js main.css and index.html. Do not svn add any additional files or directories.


## Presetup

You are currently looking at a markdown file! If you have never seen one before, they offer an easy way and standardized way to make quick & ledgible documents. There are lots of ways to view them, you should pick one that makes sense based on your workflow.

- If you are using atom, the markdown-preview package allows you to view stylized markdown, simiarlly there appear to be a bunch of markdown packages for sublime.
- There are a variety of chrome extensions that can be installed so you can read them in the browser. (Poking around briefly, https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk?hl=en seems fine)
- Many IDEs offer a markdown viewer.

Because of the way they are designed, markdown files are meant to be ledgible without styling (ie in a code editor), so if none of the above solutions work for you, don't worry too much about it.

## Setup

To get things running (assuming you've have node/npm etc installed), run

```sh
npm install

# which will take a while, then

npm run start

# or if you have yarn installed (which is preferrable as it is often an order of magnitude or so faster)

yarn

# then

yarn start

```

This will open a development server on port 8080, which can be accessed by pointing a browser window to `http://127.0.0.1:8080/`. The dev server should reload the page anytime you change a file. You should see the target albers color composition that you will be trying to replicate. Explore the index.html file and javascript files using your favorite editor.


## Manipulating Objects

The first part of this exercise will see you grabbing the elements via selectors in javascript (specifically by using the document.querySelector api) and setting attributes using setAttribute. If you are having trouble with selectors we recommend that you work through this tutorial, https://flukeout.github.io/. It gives a fun introduction on how selectors and tags inter-relate. The positions you will you need to set will likely include width, height, fill, x, y, transform, and opacity. Are there enough rects in the basic skeleton to recreate the desired image?

It may be tempting to modify the properties of the svg elements in the html file (which normally would be valid!), however we would like you to modify them via the javascript file.

Some hints:

- the rectangles are the same size, specifically 350 x 490.
- The angles we used were ~ -15 and ~ 7.3.
- While live-reload is really fast, it is WAY faster to use the chrome dev tools, try modifying the attributes of your rects that way (remember the changes you make go away with every reload)
- If you are having some trouble with the rotate property modifying the position of one of your rects, try out the translate svg property. (How does it work? Check our w3 and or MDN).
- If your not sure how to interact with something you've selected, try it out in the dev console. For instance, try out

```javascript
let x = document.querySelector('img');
console.log(x)
```


Getting the colors exactly right is pretty hard. When painters are learning color theory this is the type of exercise they are given to really flex their minds. Our aim is try to make you think about color a little while learning about web stuff, so just try your best.

If you are interested, this exercise can be carried out using only divs however the work will be quite different. It will likely involve using position absolute, top, and left. It's pretty fun.


## Inserting Objects

We have now seen how to manipulate objects that are already present in the DOM is one thing, so we will now consider the natural mirror to this: creating new objects in the DOM. In this next part we will add dots to each corner of our rects. While it is definately possible to spend a bunch of time calculating where exactly in svg space the corners of the rectangles are, it will be much much easier if we make use of the <g> tag.

Start by wrapping each of your rects in a g tag, like `<g class="descriptive-class-name"><rect ...properties /></g>` and moving all of the positioning code off the rects and onto the gs. Keep in mind gs don't accept coordinates, only transforms, so you'll have to use translate in addition to your rotate.

The meat of this task will see you using another dom api you will insert several nodes into the dom. We suggest that you use the appendChild api (through the much more confusing insertBefore is also available), which is available on dom nodes. Here's a small example. Given an svg fragment:

```svg
<svg height="100" width="100" class="my-cool-svg" >
  <circle ... />
</svg>

```

```javascript
const container = document.querySelector('.my-cool-svg');
const newCirc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
container.appendChild(newCirc);
```

Now that we know how to use appendChild, we're ready to put it all together. For each of the rectangles write out a list of objects describing the position of the corners, it will look something like

```javascript
const corners = [
  {x: 0, y: 0},
  {x: 0, y: rectHeight},
  {x: rectWidth, y: rectHeight},
  {x: rectWidth, y: 0}
];
```
Where rectHeight and rectWidth are variables you have defined. Next loop over that list using .forEach and appendChild. Can you reduce the repetitions in the code using loops?

Hints:

- Make sure you use create your circles using document.createElementNS
- The order of rotation and translate matters a lot!!


## Saving it

A powerful component of svgs is that they can be used outside of the browser. In the final act of this lab we will add functionality to your browser to enable easy saving of svg image. To do so we will install a bookmarklet which is a bookmark that takes advantage of the fact that javascript, like http, is a protocol executable from the browser url bar, for a dated cultural reference check this out https://www.piliapp.com/bookmarklet/harlem-shake/?ui=desktop. Be careful about which bookmarklets you install, they're powerful but can enable easy attacks if you install the wrong thing.

Back to business. First go to https://nytimes.github.io/svg-crowbar/ and follow the instructions for installing their bookmarklet. Next refresh 8080. Click the crowbar bookmarklet. Click download, easy peasy!

## Make the TA happy

Javascript syntax is wacky. The javascript community knows this, and have tried to take steps to regularize the way code is written through the use of linters. In this course we recomend (and on the homework will enforce) making use of eslint-config-uber-es2015, which should be already installed if you followed the above directions. Despite the name, it is still a pretty modern way to write javascript.

The least annoying way to use linters is to have them running constantly as part of your editor, I use atom and have found the development process to be pretty pleasurable. If you also use atom you can just copy by the relevant parts of my atom config https://github.com/mcnuttandrew/dotfiles. If static code analysis is not your bag, you can run lint from the command line (assuming you have node version >= 4) via

```sh
npm run lint
```

A common idiom says that lint will make you cry. That is true. It will also make you a better programmer faster.
