# HW4 - The Good, The Bad, & The Javascript

In this homework you will produce two visualizations for a single dataset: one that effectively shows
the data (the Good), and one that purposely makes it hard to see and understand the data (the Bad).
See the initial Piazza hw4 post for the specification of the project work. This README.md covers
technical aspects of the code setup.

## Setup

As always, have npm/node/yarn installed.

```sh
npm install
# then
npm run start

# or if yarn
yarn
# then
yarn start
```
>>> THIS OPENS A CONNECTION on http://localhost:9966/
>>> THIS IS DIFFERENT THEN THE PREVIOUS ASSIGNMENT, BE AWARE

In this assignment, just as in the associated lab3, we have increased the complexity of the build
pipeline in order to enable a few cool features.

- You are now able to use a special language called SCSS, which is a strict superset of CSS syntax,
  which allows nesting of selectors, variables, math, and many other great wonders. (The docs are
  quite good: https://sass-lang.com/guide, but if you don't care about learning it, no big
  deal. SCSS being a superset means that any CSS you would write will also work as valid SCSS.)
- You can now use es6 modules. This syntax is quite powerful and enables the logical breaking up of
  files. imports look like
```js
// importing external packages
import {functionFromModule} from 'target-module';
// importing from files you've written
import {myFunction} from './my-module';
// if you want import a whole module
// (which is frowned upon), you can:
import * from 'd3'
```

Finally, the default configuration of this project no longer comes with an entire build of d3. In
modern js we break things into atomic packages in order to only install what we need. d3 is no
exception to this rule, and provides smaller packages that contain relevant functionality (look here
for the complete list https://github.com/d3/d3/blob/master/API.md). If you wish to install
additional d3 libraries from the small set we have provided initially, you are free to. Say you were
trying to install d3-array, this could be done via

```sh
npm install --save d3-array
# or
yarn add d3-array
```

This principle of only bringing in what you need goes back to an fun programmers' acronym: YAGNI. YA
AINT GONNA NEED IT. Only install stuff as required.

Unlike lab3, we have not included much in the way of sub-components of d3. We have only d3-fetch (for
getting data and converting it) and d3-selection (for selecting against data). This homework can
certainly be completed using only d3 packages, but if you feel the need to get an outside package,
run it by course staff for approval.

## The Files

You should start this assignment by exploring the new file structure.
- In the app folder you'll find the stuff that will actually be served to the browser.
You shouldn't need to edit anything inside of this folder.
- There is a new file called gulpfile.js. This includes all of the mechanisms for building your project.
It is interesting to read, but YOU SHOULD NOT EDIT IT.
- There is a folder called src/, this is where you will do your work in this configuration.
Specifically you will be doing your main work inside of good-vis.js and bad-vis.js.

The data that we are asking you to visualize (app/data/asics.csv) is a small comma-separated-value
(CSV) file. The provided scaffold code grabs the data and converts it into a more
javascript-friendly JSON blob. It also provides a very simple router for navigating the three pages
that will be rendered when you run yarn start. The root page, the good vis, and the bad vis. (If
anything ever gets out of sync just reload the page).

## The good and the bad

As mentioned above you will be building two visualizations, one good and one bad. You will be doing
your work in three files src/good-vis.js, src/bad-vis.js and src/utils.js. As the names suggest you
will be building your good vis in src/good-vis.js, your bad vis in src/bad-vis.js. If you feel the
need to create methods that will be useful between both visualizations (such as code to place axes)
you can abstract that into a new function and place that in the utils folder.

Let's spend a little more time looking at how import and exports work. In the src/utils.js file there is
an example of how to export a function. Simply prefix the function declaration with the word export
and it will be available for consumption by other files. To wit:

```js
export function myExampleUtil(x) {
  return x * 2;
}
```
Now if I wanted to make use of this function in a different file I would write an import statement at the top of the page:

```js
import {myExampleUtil} from './utils';
```
Note how the name of the function is inside of the curly braces. This means that i don't need to add any package prefix to be able to use the function. For instance I could use the above function like so:

```js
console.log(myExampleUtil(2))
```
Which would output 4 to the console.

A few gotchas:

- Functions that are imported are scoped to the file that they imported inside of. That is, if I
  import a function in good-vis it's only available in that file, unless I import it somewhere else.
- Import paths can be relative or absolute. Relative paths (like the one shown above) refer to the
  path from the file calling for the function. Absolute paths (like import {select} from
  'd3-selection') are scoped to the global context, which in this case is the root of your project
  folder.

You should now be ready to do the work of the assignment. See the initial Piazza hw4 post
for the conceptual content of what is required, and what to include in write-up.md.

## Extra: The how and why of static resources

In the course of building your visualizations you may wish to include outside assets, extra glyphs,
 weird backgrounds, pre-rendered svg legends, etc. To do this, you should place whatever assets you
 want in the app/static directory. As an example we have included a bullseye rendered as an svg and a png.
 You should be able to see them on the first load of the page wrapping the "return to root" link.
 In addition to importing them via html, you could easily import these extra resources via javascript.
 One mechanism for this is inserting img tags and setting their src attribute as appropriate.

Importing extra resources IS NOT REQUIRED!!!! It is just an additional paint in your paint box.
If you do not feel the need to bring in extra resources, don't!
