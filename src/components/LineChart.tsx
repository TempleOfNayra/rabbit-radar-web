'use client';

import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
}: RechartsLineChartProps) {
  if (data.length === 0) {
    return <div className="text-gray-500 text-center py-8">No data available</div>;
  }

  // Transform data to Recharts format
  const chartData = data.map((value, index) => ({
    name: labels[index] || `${index}`,
    value: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" />}

        <XAxis
          dataKey="name"
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#9CA3AF' }}
        />

        <YAxis
          stroke="#9CA3AF"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#9CA3AF' }}
          label={yAxisLabel ? {
            value: yAxisLabel,
            angle: -90,
            position: 'insideLeft',
            fill: '#9CA3AF',
            style: { fontSize: '12px' }
          } : undefined}
          reversed={inverse}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F3F4F6',
          }}
          labelStyle={{ color: '#9CA3AF' }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLine>
    </ResponsiveContainer>
  );
}
