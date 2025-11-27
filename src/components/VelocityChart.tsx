'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VelocityChartProps {
  coinId: string;
  window: 1 | 3 | 7 | 14 | 30;
}

interface VelocityDataPoint {
  timestamp: string;
  base_velocity: number;
  rr_score: number;
}

export default function VelocityChart({ coinId, window }: VelocityChartProps) {
  const [data, setData] = useState<VelocityDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVelocityData() {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://rabbit-radar-api.vercel.app';
        const response = await fetch(`${apiUrl}/api/coins/velocity?coinId=${coinId}&window=${window}`);

        if (!response.ok) {
          throw new Error('Failed to fetch velocity data');
        }

        const result = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        }
      } catch (err) {
        console.error('Error fetching velocity data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchVelocityData();
  }, [coinId, window]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading velocity data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">No velocity data available yet</div>
        </div>
      </div>
    );
  }

  // Format data for chart
  const chartData = data.map((point) => ({
    date: new Date(point.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    velocity: parseFloat(point.base_velocity.toString()),
    score: parseFloat(point.rr_score.toString()),
  }));

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">
        {window}-Day Velocity History
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#10B981"
            style={{ fontSize: '12px' }}
            label={{ value: 'Velocity (ranks/day)', angle: -90, position: 'insideLeft', fill: '#10B981' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#3B82F6"
            style={{ fontSize: '12px' }}
            label={{ value: 'RR Score', angle: 90, position: 'insideRight', fill: '#3B82F6' }}
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
          <Legend wrapperStyle={{ color: '#9CA3AF' }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="velocity"
            name="Velocity"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="score"
            name="RR Score"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-gray-400">
        <p>
          <span className="text-green-400">●</span> Positive velocity = climbing ranks (good) |{' '}
          <span className="text-red-400">●</span> Negative velocity = falling ranks (bad)
        </p>
      </div>
    </div>
  );
}
