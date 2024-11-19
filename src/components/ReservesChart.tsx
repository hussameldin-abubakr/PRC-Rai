import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { OilField } from '../types';

interface ReservesChartProps {
  fields: OilField[];
  selectedFields: string[];
}

export const ReservesChart: React.FC<ReservesChartProps> = ({ fields, selectedFields }) => {
  const data = fields
    .filter(field => selectedFields.includes(field.id))
    .map(field => ({
      name: field.name,
      Reserves: field.reserves,
      Production: field.cumulativeProduction,
      Remaining: field.reserves - field.cumulativeProduction,
    }));

  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Reserves vs Production</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Reserves" fill="#4f46e5" />
          <Bar dataKey="Production" fill="#10b981" />
          <Bar dataKey="Remaining" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};