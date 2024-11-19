import React from 'react';
import { MetricsCard } from '../components/MetricsCard';
import { ProductionChart } from '../components/ProductionChart';
import { ReservesChart } from '../components/ReservesChart';
import { BarChart3, Droplets, GaugeCircle, Wallet } from 'lucide-react';
import { oilFields, productionData } from '../data';

export function Overview() {
  const [selectedFields, setSelectedFields] = React.useState(oilFields.map(f => f.id));
  const [selectedConcession, setSelectedConcession] = React.useState<string>('all');

  const filteredFields = oilFields.filter(field => 
    selectedConcession === 'all' || field.concession === selectedConcession
  );

  const totalOOIP = filteredFields.reduce((sum, field) => sum + field.ooip, 0);
  const totalProduction = filteredFields.reduce((sum, field) => sum + field.cumulativeProduction, 0);
  const totalReserves = filteredFields.reduce((sum, field) => sum + field.reserves, 0);
  const avgRecoveryFactor = (totalProduction / totalOOIP) * 100;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <select
          className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedConcession}
          onChange={(e) => setSelectedConcession(e.target.value)}
        >
          <option value="all">All Concessions</option>
          <option value="NC115">NC115</option>
          <option value="NC186">NC186</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total OOIP"
          value={`${totalOOIP.toLocaleString()} MMbbl`}
          icon={<Droplets size={24} />}
        />
        <MetricsCard
          title="Cumulative Production"
          value={`${totalProduction.toLocaleString()} MMbbl`}
          icon={<BarChart3 size={24} />}
        />
        <MetricsCard
          title="Remaining Reserves"
          value={`${(totalReserves - totalProduction).toLocaleString()} MMbbl`}
          icon={<Wallet size={24} />}
        />
        <MetricsCard
          title="Recovery Factor"
          value={`${avgRecoveryFactor.toFixed(1)}%`}
          icon={<GaugeCircle size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionChart
          data={productionData}
          selectedFields={selectedFields}
        />
        <ReservesChart
          fields={filteredFields}
          selectedFields={selectedFields}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Field Selection</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredFields.map(field => (
            <label key={field.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFields.includes(field.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFields([...selectedFields, field.id]);
                  } else {
                    setSelectedFields(selectedFields.filter(id => id !== field.id));
                  }
                }}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{field.name} ({field.concession})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}