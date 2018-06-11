import {pieData} from './utils';
import {colorArray} from './utils';
import {select} from 'd3-selection';
import {scaleOrdinal} from 'd3-scale';
import {arc} from 'd3-shape';
import {pie} from 'd3-shape';

export function badVis(data) {
  // BUILD THE PIE CHART
  const width = 500;
  const height = 500;
  const radius = 250;

  const container = select('#thevis')
    .append('svg')
    .attr('width', width * 1.5)
    .attr('height', height * 1.5)
    .append('g')
    .attr('transform', `translate(${radius}, ${radius})`);

  const pData = pieData(data);
  const colorData = colorArray(pData);

  const colors = scaleOrdinal().range(colorData);

  const pArc = arc()
    .innerRadius(0)
    .outerRadius(radius)
    .cornerRadius(10);

  const pPie = pie()
    .value(d => d.count)
    .sort(null);

  container.selectAll('path')
    .data(pPie(pData))
    .enter().append('path')
    .attr('d', pArc)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', d => colors(d.data.label));

  const names = [];
  pData.forEach(d => names.push(d.label));

  // BUILD A LEGEND
  const legRectSize = 25;
  const legSpacing = 10;

  const legend = container.selectAll('.legend')
    .data(colors.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
      const legX = 300;
      const legY = -200 + (legRectSize + legSpacing) * i;
      return `translate(${legX}, ${legY})`;
    });

  legend.append('rect')
    .attr('width', legRectSize)
    .attr('height', legRectSize)
    .style('fill', colors)
    .style('stroke', 'black');

  legend.append('text')
    .attr('x', legRectSize + legSpacing)
    .attr('y', legRectSize - legSpacing)
    .text(d => d);

  // ADD A TITLE
  container.append('text')
    .attr('transform', 'translate(0, 0)')
    .attr('x', -(height / 5))
    .attr('y', 0)
    .attr('font-size', '20px')
    .text('Darker = More Recovery Days Needed')
    .attr('fill', 'white');
}
