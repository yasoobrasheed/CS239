# hw6 - PCA

This homework gives you an opportunity to implement a basic data analysis
method: principal component analysis (PCA).  This was described in class in
detail on May 8; see slides:
http://people.cs.uchicago.edu/~glk/class/datavis/slides/05-0810-PCAalgvis.pdf
Also, for a less mathematical but more intuitive/interactive display, we
looked at this: http://setosa.io/ev/principal-component-analysis
The data that you will be working with is about the 50 US states (plus
District of Columbia); see below for data sources.

## Getting Started

As always we begin by installing the required dependencies

```sh
npm install

npm run start

# or if yarning

yarn

yarn start
```

The default configuration opens a port on http://localhost:3001/, so simply
point a browser to that address and you'll be up and running.

## PCA

The first thing you will implement is the PCA algorithm itself. We've broken
this into two functions (there is actually very little code to write), and
written some tests for you to develop against. To execute these, simply run

```sh
npm run test
# or if yarning
yarn test
```

Which will execute the tests found in tests/pca-tests.js.

In src/pca.js you will complete two functions:

1. normalizeArray, for normalizing a 1D array of data.
2. doPCA, for computing the PCA of normalized data.

The detailed instructions for what these functions need to compute and return
are in comment blocks above the functions in src/pca.js.

## Visualizations

The results of PCA analysis are visualized with a scatterplot, drawn over a 2D
colormap, and with a map of the states, colored according to the colormap.  As
always with react it can be helpful to start by exploring the code base, and
perhaps making a small diagram of the relationship between the components to
learn what is where.  This code is being provided for you completely, to let
you focus on the PCA code, and to provide another react example to learn from.

## Data sources:

"Obesity" = Rates of adult obesity (Body Mass Index of 30+) in 2016
https://stateofobesity.org/adult-obesity/

"InfantMortality" = Deaths per 1,000 live births, 2013-2015
https://www.cnn.com/2018/01/04/health/infant-mortality-by-state-study/index.html

"Unemployment" : Annual unemployment rate in 2017
https://data.bls.gov/map/MapToolServlet

"SNAP" = percent population benefiting from Supplemental Nutrition Assistance
Program. Copied number of state residents from these:
https://www.cbpp.org/research/a-closer-look-at-who-benefits-from-snap-state-by-state-fact-sheets
and divided by, state population (July 1 2017), from:
https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population

"Poverty" = Percentage of People in Poverty, 2-year average 2015-2016
https://www.census.gov/data/tables/2017/demo/income-poverty/p60-259.html

"HigherEducation" = Percentage of population 25 years and over with
more than a high school education.  Derived from tables from here:
https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_16_1YR_S1501&prodType=table
Summed:
  Total; Estimate; Population 25 years and over - Some college, no degree
  Total; Estimate; Population 25 years and over - Associate's degree
  Total; Estimate; Population 25 years and over - Bachelor's degree
  Total; Estimate; Population 25 years and over - Graduate or professional degree
and divided by:
  Total; Estimate; Population 25 years and over

"MoreDemocrat16", "MoreDemocrat12", "MoreDemocrat08". Let
  D = Number of votes for Democratic presidential candidate
  R = Number of votes for Republican presidential candidate
then this quantity is D/(D+R).
Data from
https://en.wikipedia.org/wiki/United_States_presidential_election,_2008
https://en.wikipedia.org/wiki/United_States_presidential_election,_2012
https://en.wikipedia.org/wiki/United_States_presidential_election,_2016

"MoreDemocrat" = summed D and R votes over '08, '12, and '16 elections.
