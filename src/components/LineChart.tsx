'use client';

interface LineChartProps {
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  yAxisLabel?: string;
  inverse?: boolean; // For rank charts (lower is better)
}

export default function LineChart({
  data,
  labels = [],
  color = '#3b82f6',
  height = 200,
  showGrid = true,
  yAxisLabel = '',
  inverse = false,
}: LineChartProps) {
  if (data.length === 0) {
    return <div className="text-gray-500 text-center py-8">No data available</div>;
  }

  const width = 800;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const valueRange = maxValue - minValue || 1;

  // Generate points for the line
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = inverse
      ? padding + ((value - minValue) / valueRange) * chartHeight
      : padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    return { x, y, value };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Create area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`;

  // Grid lines
  const gridLines = showGrid ? [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = padding + chartHeight * ratio;
    const value = inverse
      ? minValue + valueRange * ratio
      : maxValue - valueRange * ratio;
    return { y, value };
  }) : [];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding}
              y1={line.y}
              x2={width - padding}
              y2={line.y}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x={padding - 5} y={line.y + 4} textAnchor="end" fill="#9ca3af" fontSize="12">
              {line.value.toFixed(inverse ? 0 : 2)}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaD} fill={color} fillOpacity="0.1" />

        {/* Line */}
        <path
          d={pathD}
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={color}
            className="hover:r-5 transition-all cursor-pointer"
          >
            <title>{`${labels[i] || i}: ${point.value}`}</title>
          </circle>
        ))}

        {/* Y-axis label */}
        {yAxisLabel && (
          <text
            x={padding / 2}
            y={padding + chartHeight / 2}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize="12"
            transform={`rotate(-90, ${padding / 2}, ${padding + chartHeight / 2})`}
          >
            {yAxisLabel}
          </text>
        )}
      </svg>

      {/* Legend */}
      {labels.length > 0 && (
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-10">
          <span>{labels[0]}</span>
          <span>{labels[Math.floor(labels.length / 2)]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}
