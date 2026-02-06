

async function fetchData(){
        let data = await d3.csv("penglings.csv")
        return data        
};

fetchData().then(dataset => {


var margin = {top: 20, right: 20, bottom: 60, left:60},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


var svg = d3.select("#chart-section")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom) // height witout margin
        .attr("width", width + margin.left + margin.right) // height witout margin
        .attr("transform", "translate(100,0)");


 var chart = svg.append('g')
        .attr('width', width)
        .attr("height", height)
        .attr('transform', 'translate('+ margin.left + ',' + margin.top +')');

console.log((Number(dataset[0].body_mass_g)))
var xscale = d3.scaleLinear()
        .domain(d3.extent(dataset, d=>Number(d.flipper_length_mm)))
        .range([0,width]);

   // drawing y scale
var yscale = d3.scaleLinear()
        .domain(d3.extent(dataset, d=>Number(d.body_mass_g)))
        .range([height,0])

 var billscale = d3.scaleLinear()
        .domain(d3.extent(dataset, d=>Number(d.bill_length_mm)))
        .range([1,12]);

var colorScale = d3.scaleOrdinal()
        .domain(["Adelie", "Gentoo","Chinstrap"])
        .range(["#FFA500","#008000", "#8F3DD1", ])
    //drawing x-axis
    chart.append('g')
        .call(d3.axisBottom(xscale))
        .attr("transform", 'translate(0,' + height + ')')  
    //drawing y-axis
    chart.append('g')
    .call(d3.axisLeft(yscale))
    
    //drawing x-label
    svg.append("text")
        .text("Flipper Length (mm)")
        .attr("transform", 'translate('+ (width + 50) / 2 + ',' + (height + 50)  +')')
    //drawing y-label
    svg.append("text")
         .text("Body Mass (g)")
         .attr("transform", 'translate(20'+ ',' + (height + 50) /2 + ') rotate(-90)');

 //Circles for Chart
 console.log(dataset)
    chart.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xscale((d.flipper_length_mm)))
        .attr("cy", d=> yscale((d.body_mass_g)))
        .attr("r", d => billscale(d.bill_length_mm))
        .attr("fill", d => colorScale(d.species))
        .attr("opacity", 0.8)
//["Adelie", "Gentoo","Chinstrap"]

 d3.selectAll("circle")
  .on("mouseover", function(d) {
    d3.select("#tooltip")
      .style("left", event.pageX + "px")
      .style("top", event.pageY + "px")
      .style("opacity", 1)
      .style("visibility", "visible")
      .select("#flipper")
      .text(d.value = event.srcElement.__data__.flipper_length_mm);
    d3.select("#tooltip")
      .select("#mass")
      .text(d.value = event.srcElement.__data__.body_mass_g);
  })
  .on("mouseout", function(d) {
    d3.select("#tooltip")
      .style("visibility", "hidden");
  });
})
