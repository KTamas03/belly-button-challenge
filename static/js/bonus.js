function updateGaugeChart(selectedName) {
  // Get the washing frequency value from the selected metadata
  const selectedMetadata = data.metadata.find(metadata => metadata.id === +selectedName);
  const washingFrequency = selectedMetadata.wfreq;

  // Define the gauge chart data
  const gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washingFrequency,
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 9] },
        bar: { color: "rgba(8,29,88,0.3)" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "rgb(248, 243, 236)" },
          { range: [1, 2], color: "rgb(244, 241, 229)" },
          { range: [2, 3], color: "rgb(233, 230, 202)" },
          { range: [3, 4], color: "rgb(229, 231, 179)" },
          { range: [4, 5], color: "rgb(213, 228, 157)" },
          { range: [5, 6], color: "rgb(183, 204, 146)" },
          { range: [6, 7], color: "rgb(140, 191, 136)" },
          { range: [7, 8], color: "rgb(138, 187, 143)" },
          { range: [8, 9], color: "rgb(133, 180, 138)" },
        ],
      },
    },
  ];

  // Define the gauge chart layout
  const gaugeLayout = {
    width: 400,
    height: 300,
    shapes: [
      {
        type: 'path',
        path: getPath(washingFrequency), // Call the function to generate the path for the needle
        fillcolor: 'brown',
        line: {
          color: 'brown',
          width: 3 //adjust width of needle to make thicker or thinner
        },
      },
    ],
    xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [0, 1] },
    yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [0, 1] },
    autosize: true,
  };

  // Plot the gauge chart
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
}


// Function to generate the path for the needle
function getPath(value) {
  const angle = 180 - (value / 9) * 180; // Calculate the angle based on the value and adjust for the correct orientation
  const radians = (angle * Math.PI) / 180;
  const length = 0.4; // Adjust the length of the needle
  const pointerWidth = 0.1; // Adjust the width of the pointer part

  // Calculate the coordinates of the endpoint relative to the center of rotation (center of the gauge)
  const xOffset = 0.5 + length * Math.cos(radians); // Calculate the x-coordinate
  const yOffset = 0.5 + length * Math.sin(radians); // Calculate the y-coordinate

  // Define the path for the pointer-like needle
  const path = `M 0.5 0.5 L ${xOffset - pointerWidth / 2} ${yOffset} L ${xOffset + pointerWidth / 2} ${yOffset} Z`;

  return path; // Define the path
}