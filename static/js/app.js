let data; // Declare the data variable at a broader scope

// Function to fetch data from the provided URL
function fetchData() {
  return fetch("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(response => response.json())
    .then(responseData => {
      data = responseData; // Store the data in the variable

      // Get references to the necessary elements
      const dropdown = d3.select("#selDataset");
      const barChart = d3.select("#bar");
      const bubbleChart = d3.select("#bubble");

      // Populate the dropdown with options
      data.names.forEach(name => {
        dropdown.append("option")
          .attr("value", name)
          .text(name);
      });

    // Create a function to update the bar chart based on selected individual
    function updateBarChart(selectedName) {
      const selectedSample = data.samples.find(sample => sample.id === selectedName);
      const otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
      const sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
      const otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();

      const trace = {
        type: "bar",
        orientation: "h",
        x: sampleValues,
        y: otuIds.map(id => `OTU ${id}`),
        text: otuLabels,
        hoverinfo: "text",
      };

      const layout = {
        title: "<b>Top 10 OTU's Present in Test Subject</b>",
        xaxis: { title: "<i>Sample Values</i>" },
      };

      Plotly.newPlot(barChart.node(), [trace], layout);
    }

    // Create a function to update the bubble chart based on selected individual
    function updateBubbleChart(selectedName) {
      console.log("Updating bubble chart with:", selectedName);
      const selectedSample = data.samples.find(sample => sample.id === selectedName);

      const trace = {
        type: "bubble",
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: "markers",
        marker: {
          size: selectedSample.sample_values,
          color: selectedSample.otu_ids,
          colorscale: "Viridis",
        },
      };

      const layout = {
        title: "<b>Bubble Chart of Each Sample</b><br>where size of bubble represents sample value",
        xaxis: { title: "<i>OTU IDs</i>" },
        yaxis: { title: "<i>Sample Values</i>" },
        showlegend: false,
      };

      Plotly.newPlot(bubbleChart.node(), [trace], layout);
    }

// Set up a function to update the sample metadata based on selected individual
function updateSampleMetadata(selectedName) {
  const selectedMetadata = data.metadata.find(metadata => metadata.id === +selectedName);

  // Clear existing metadata
  d3.select("#sample-metadata").html("");

  // Iterate through key-value pairs and display them
  Object.entries(selectedMetadata).forEach(([key, value]) => {
    d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
  });
}

      // Set up an event listener to update metadata and charts when dropdown changes
      dropdown.on("change", function () {
        const selectedName = d3.select(this).property("value");
        updateSampleMetadata(selectedName);
        updateBarChart(selectedName);
        updateBubbleChart(selectedName);
        // Call the updateGaugeChart function from bonus.js
        updateGaugeChart(selectedName);
      });

      // Initialize the metadata and charts with the first individual's data
      // So all charts appear when webpage is opened
      const initialName = data.names[0];
      updateSampleMetadata(initialName);
      updateBarChart(initialName);
      updateBubbleChart(initialName);
      updateGaugeChart(initialName);
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
}

// Call the fetchData function to fetch data when the page loads
fetchData();