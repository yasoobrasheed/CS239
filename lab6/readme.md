# Lab 6 Face Based Luminance matching

In this lab we will start getting familiar with using the popular web framework React. React offers a simple programming model that allows for expressive coding in functional-ish enviroment. In the course of this lab we will add several small features a reasonably complete application that allows users to explore the phenomena of facial recognition in binary color arrangements.

## Setup

As always we begin by installing the required dependencies

```sh
npm install

npm run start

# or if yarning

yarn

yarn start
```

The default configuration opens a port on http://localhost:3001/, so simply point a browser to that address and you'll be up and running.


## Take a look around

Once you get the app running you'll find that you can control the color in the picture across a couple of common color palettes. You should play around and try to find the point where the left side of the image and right side of the image both look like faces.

We've already heard in class roughly how react works, so it will be good to explore the layout of the application. You first task will be draw a diagram like the ones we saw in class about the relative arrangement of the components. Once you've done this, show the TA!

## Show the user what color they are displaying

Our first task will be to add functionality so that the user can see the hex value (like #ff0109) that is associated the current color configuration. We would like you to create a new component called HexValue that takes in the currentColor as a prop and displays the hex value of that prop. Feel free to start by copying and pasting a component from a different file and then removing the stuff you dont' nee. You will find the rgbToHex function in utils to be quite useful.

(This will be a very simple component)

## Add a new color palette

Next, it will be cool to explore a third familiar palette, in this case HCL. All of the configuration for the color spaces is stored in the constants file. Can you figure out how to import the hcl space from d3-color and set it's values as appropriate? What are the appropriate ranges for hue chroma and lightness?

## Stepper

Our final little exercise will be to add step buttons to the sliders, so that user can do fine grain adjustments to the various sliders. This should happen in the slider.js file, and should involve adding two buttons (one left and one right) to the slider component. When clicked on, these sliders should change trigger the onChange callback (just the two inputs) with the value of the slider incremented or decremented by one (depending on if it is the left or right arrow).

Bonus: Make it look good! This will probably involve modifying the css to some degree. What web elements can you use to make the buttons look like an arrow?

