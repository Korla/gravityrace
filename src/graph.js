export function createGraph(svg, data) {
  svg.appendChild(polyline(data.map(p => p.velocity)));
  return svg;
}

function polyline(data) {
  var polyline = h('polyline');
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', '#0074d9');
  polyline.setAttribute('stroke-width', 2);
  polyline.setAttribute('points', data.map((d, i) => `${i * 20},${d}`));
  return polyline;
}

function h(tag, children = []){
  var tagParts = tag.split('.');
  var element = document.createElementNS("http://www.w3.org/2000/svg", tagParts.shift());
  tagParts.forEach(c => element.classList.add(c));
  children.forEach(c => element.appendChild(c));
  return element;
}
