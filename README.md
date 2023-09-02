## belly-button-challenge
Module 14 Challenge - Interactive Visualizations

In this scenario, I built an interactive dashboard to summarise findings from a Belly Button Biodiversity dataset. This was achieved by using Javascript and HTML coding.
![Dashboard Screenshot](https://github.com/KTamas03/belly-button-challenge/assets/132874272/bf225084-b773-40d9-ae11-ae09ff303a6c)

More information on the study is found in this link: http://robdunnlab.com/projects/belly-button-biodiversity/ 

**Repository Folders and Contents:**
- static:
  - js:
    - app.js
    - bonus.js
- index.html
- samples.json


## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## About
### Part 1: Create Bar Chart, Bubble Chart and Metadata Display

These are the steps I took to completing this section:
- In the app.js file:
  - I created a function to fetch data from the url (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json). The data was was json format (samples.json file contained the data, was provided as a reference only).
  - I then made reference to the html file (index.html) by selecting the bar, bubble and selDataset elements and assigning them to a variable each. I also created a function to update the dropdown options.
  - I created functions to update the bar and bubble charts, update the metadata and handle the dropdown menu changes. This is so when a user interacts with the dropdown menu, all the various components on the webpage update according to the selected Test Subject ID.
  - I created an event listener that listens for changes in the dropdown element and triggers the 'optionChanged' function when a change occurs.
  - Lastly, code is created so that when the webpage initally loads, the initial data and charts populate the webpage.

**Resource File I Referenced:**
  - samples.json

**My Working Files:**
  - index.html
  - app.js

### Part 2: Create the Gauge Chart

These are the steps I took to completing this section:
- In the bonus.js file:
  - I created a function to to update the gauge chart based on the selected Test Subject ID.
  - I extracted the washing frequency value from the selected metadata and stored it in a variable.
  - I defined a gauge object to configure the gauge chart, including the chart type, layout, colours etc.
  - I defined the gauge layout, that is, the height, width, appearance etc. Inparticular, i created a function to generate the path of the needle on the gauge chart based on the washing frequency value.

- In the app.js file:
  - I added code so that when the charts and metadata created in part 1 above update, the gauge chart also updates. 

**Resource File I Referenced:**
  - samples.json

**My Working Files:**
  - index.html
  - app.js
  - bonus.js

### Part 3: Deployed Website

Lastly to deploy my website containing the interactive dashboard, I following the steps outlined in the following link:
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

**My Website:**
https://ktamas03.github.io/belly-button-challenge/

## Getting Started

**Programs/software I used:**
 - Visual Studio: used for coding javascript and html
 - Google Chrome: used for displaying, interacting and troubleshooting the webpage

## Contributing

- Plotly charts (https://plotly.com/javascript/basic-charts/)https://plotly.com/javascript/basic-charts/)
