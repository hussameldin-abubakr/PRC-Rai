import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ProductionData } from '../types';
import { oilFields } from '../data';

interface ProductionChartProps {
  data: ProductionData[];
  selectedFields: string[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-4 shadow-lg rounded-lg">
        <p className="text-sm font-semibold mb-2">{new Date(label).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        })}</p>
        {payload.map((entry: any, index: number) => {
          const field = oilFields.find(f => f.id === entry.dataKey);
          return (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{field?.name}:</span>
              <span className="text-sm font-medium">
                {entry.value.toLocaleString()} MMbbl
              </span>
            </div>
          );
        })}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-sm font-bold">
              {payload.reduce((sum: number, entry: any) => sum + entry.value, 0).toLocaleString()} MMbbl
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-2">
      {payload.map((entry: any, index: number) => {
        const field = oilFields.find(f => f.id === entry.dataKey);
        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">{field?.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export const ProductionChart: React.FC<ProductionChartProps> = ({ data, selectedFields }) => {
  const filteredData = data.filter(d => selectedFields.includes(d.fieldId));
  
  // Group data by date
  const groupedData = filteredData.reduce((acc: any[], curr) => {
    const existingDate = acc.find(d => d.date === curr.date);
    if (existingDate) {
      existingDate[curr.fieldId] = curr.production;
      existingDate.total = (existingDate.total || 0) + curr.production;
    } else {
      const newEntry = { 
        date: curr.date,
        [curr.fieldId]: curr.production,
        total: curr.production
      };
      acc.push(newEntry);
    }
    return acc;
  }, []);

  // Sort data chronologically
  groupedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getColor = (index: number) => {
    const colors = [
      '#4f46e5', // indigo
      '#10b981', // emerald
      '#f59e0b', // amber
      '#ef4444', // red
      '#8b5cf6', // purple
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-2">Production Timeline</h3>
        <p className="text-sm text-gray-500 mb-4">Monthly production rates by field (MMbbl)</p>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={groupedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {selectedFields.map((fieldId, index) => (
                  <linearGradient key={fieldId} id={`gradient-${fieldId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getColor(index)} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={getColor(index)} stopOpacity={0.2}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: 'short'
                })}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              {selectedFields.map((fieldId, index) => (
                <Area
                  key={fieldId}
                  type="monotone"
                  dataKey={fieldId}
                  stackId="1"
                  stroke={getColor(index)}
                  fill={`url(#gradient-${fieldId})`}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};