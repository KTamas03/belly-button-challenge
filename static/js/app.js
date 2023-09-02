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


            // Create a function to update the dropdown options
            function updateDropdownOptions() {
              dropdown.html(""); // Clear existing options
              data.names.forEach(name => {
                dropdown.append("option")
                  .attr("value", name)
                  .text(name);
              });
            }
      
            // Populate the dropdown initially
            updateDropdownOptions();

    // Create a function to update the bar chart based on selected individual
    function updateBarChart(selectedName) {
      const selectedSample = data.samples.find(sample => sample.id === selectedName);
      const otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
      const sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
      const otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();

      // print values for bar chart to console
      console.log("Bar Chart Data:", {
        otuIds,
        sampleValues,
        otuLabels,
      });

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

       // print values for bubble chart to console
      console.log("Bubble Chart Data:", {
        otuIds: selectedSample.otu_ids,
        sampleValues: selectedSample.sample_values,
        otuLabels: selectedSample.otu_labels,
      });

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

  // print values for metadata to console
  console.log("Sample Metadata:", selectedMetadata);

  // Clear existing metadata
  d3.select("#sample-metadata").html("");

  // Iterate through key-value pairs and display them
  Object.entries(selectedMetadata).forEach(([key, value]) => {
    d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
  });
}

// Define the optionChanged function
function optionChanged(selectedName) {
  // This function can be used to handle the onchange event of your dropdown select
  console.log("Selected Value:", selectedName);

  // Call the functions to update metadata and charts with the selected value
  updateSampleMetadata(selectedName);
  updateBarChart(selectedName);
  updateBubbleChart(selectedName);
  // Call the updateGaugeChart function from bonus.js
  updateGaugeChart(selectedName);  
}

// Set up an event listener to trigger the optionChanged function when the dropdown changes
dropdown.on("change", function () {
  const selectedName = d3.select(this).property("value");
  optionChanged(selectedName); // Call the optionChanged function with the selected value
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