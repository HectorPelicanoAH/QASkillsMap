const SVG_NS = 'http://www.w3.org/2000/svg';

function polarToCart(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle)
  };
}

function makePolygonPoints(cx, cy, r, n, offsetAngle) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n + offsetAngle;
    const p = polarToCart(cx, cy, r, angle);
    return `${p.x},${p.y}`;
  }).join(' ');
}

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  return el;
}

export function renderRadarChart(container, areaScores) {
  const W = 380;
  const H = 380;
  const cx = W / 2;
  const cy = H / 2;
  const r = 110;
  const rings = 4;
  const n = areaScores.length;
  const startAngle = -Math.PI / 2;

  container.innerHTML = '';

  const svg = svgEl('svg', {
    viewBox: `0 0 ${W} ${H}`,
    'aria-label': 'Gráfica de telaraña de skills QA'
  });
  svg.classList.add('radar-chart');

  // Ring labels (percentages)
  for (let ring = 1; ring <= rings; ring++) {
    const rr = (r * ring) / rings;
    const poly = svgEl('polygon', {
      points: makePolygonPoints(cx, cy, rr, n, startAngle)
    });
    poly.classList.add('radar-ring');
    svg.append(poly);

    const label = svgEl('text', {
      x: cx + 3,
      y: cy - rr + 4,
      'text-anchor': 'start'
    });
    label.classList.add('radar-ring-label');
    label.textContent = `${(ring / rings) * 100}%`;
    svg.append(label);
  }

  // Axes
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n + startAngle;
    const end = polarToCart(cx, cy, r, angle);
    const line = svgEl('line', { x1: cx, y1: cy, x2: end.x, y2: end.y });
    line.classList.add('radar-axis');
    svg.append(line);
  }

  // Data polygon
  const dataPoints = areaScores.map((area, i) => {
    const angle = (2 * Math.PI * i) / n + startAngle;
    const pct = area.maxScore > 0 ? area.score / area.maxScore : 0;
    const p = polarToCart(cx, cy, r * pct, angle);
    return `${p.x},${p.y}`;
  });

  const dataPoly = svgEl('polygon', { points: dataPoints.join(' ') });
  dataPoly.classList.add('radar-data');
  svg.append(dataPoly);

  // Data dots
  for (const [i, area] of areaScores.entries()) {
    const angle = (2 * Math.PI * i) / n + startAngle;
    const pct = area.maxScore > 0 ? area.score / area.maxScore : 0;
    const p = polarToCart(cx, cy, r * pct, angle);
    const circle = svgEl('circle', { cx: p.x, cy: p.y, r: 4 });
    circle.classList.add('radar-dot');
    const title = svgEl('title');
    title.textContent = `${area.areaName}: ${Math.round(pct * 100)}%`;
    circle.append(title);
    svg.append(circle);
  }

  // Axis labels — use chartLabel for multi-line support
  const labelR = r + 26;
  for (const [i, area] of areaScores.entries()) {
    const angle = (2 * Math.PI * i) / n + startAngle;
    const p = polarToCart(cx, cy, labelR, angle);

    // text-anchor based on horizontal position
    const eps = 1e-6;
    const cosA = Math.cos(angle);
    const anchor = cosA > eps ? 'start' : cosA < -eps ? 'end' : 'middle';

    const text = svgEl('text', { x: p.x, y: p.y, 'text-anchor': anchor });
    text.classList.add('radar-label');

    const lines = (area.chartLabel ?? area.areaName).split('\n');
    const lineH = 13;
    const topOffset = -((lines.length - 1) * lineH) / 2;

    for (const [li, line] of lines.entries()) {
      const tspan = svgEl('tspan', {
        x: p.x,
        dy: li === 0 ? topOffset : lineH
      });
      tspan.textContent = line;
      text.append(tspan);
    }

    svg.append(text);
  }

  container.append(svg);
}
