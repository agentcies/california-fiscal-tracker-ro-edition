
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line 
} from 'recharts';
import { HISTORICAL_DATA } from '../constants';

const formatCurrency = (value: number) => {
  if (value === 0 || value === null) return 'N/A';
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value}`;
};

const formatNumber = (value: number) => {
  if (value === 0 || value === null) return 'N/A';
  return value.toLocaleString();
};

export const MigrationTrendsChart: React.FC = () => {
  return (
    <div className="h-80 w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider flex items-center gap-1.5">
        Net People Leaving CA (Domestic)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={HISTORICAL_DATA.filter(d => d.netMigration !== 0)}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="year" fontSize={10} angle={-15} textAnchor="end" height={50} />
          <YAxis fontSize={10} tickFormatter={(val) => `${val / 1000}k`} />
          <Tooltip 
            formatter={(value: number) => [formatNumber(value), "Net Change"]}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="netMigration" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FiscalImpactChart: React.FC = () => {
  const fiscalData = HISTORICAL_DATA.map(d => ({
    ...d,
    agiLoss: d.agiLoss === 0 ? null : d.agiLoss,
    revenueLoss: d.revenueLoss === 0 ? null : d.revenueLoss
  }));

  return (
    <div className="h-80 w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
        Tax Revenue vs. Income Base Lost
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={fiscalData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="year" fontSize={10} angle={-15} textAnchor="end" height={50} />
          <YAxis fontSize={10} tickFormatter={formatCurrency} />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value || 0), "Amount"]}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Line 
            type="monotone" 
            dataKey="agiLoss" 
            stroke="#ef4444" 
            name="Total Income Moved Out (AGI)" 
            strokeWidth={2} 
            connectNulls 
          />
          <Line 
            type="monotone" 
            dataKey="revenueLoss" 
            stroke="#10b981" 
            name="Estimated Lost Tax Dollars" 
            strokeWidth={2} 
            connectNulls 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
