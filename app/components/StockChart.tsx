import { useState } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

interface ChartDataPoint {
  date: string;
  price: number;
}

interface StockChartProps {
  ticker: string;
  data: ChartDataPoint[];
}
const StockChart = ({ ticker, data }: StockChartProps) => {
    const [shares, setShares] = useState<number>(1);
  const latestPrice = data[data.length - 1]?.price || 0;
  return (
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-5 shadow-md my-2 border-l-4 border-l-emerald-500">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Market Asset</span>
        <h3 className="text-xl font-black text-slate-800 mt-1">{ticker} Performance</h3>
      </div>
      <TrendingUp className="text-emerald-500 w-6 h-6" />
    </div>

    {/* Simple Visual Graph using Tailwind heights */}
    <div className="h-28 flex items-end justify-between gap-3 px-2 border-b border-slate-100 pb-2">
      {data.map((point, index) => (
        <div key={index} className="flex-1 flex flex-col items-center group">
          <div 
            style={{ height: `${(point.price / 300) * 100}%` }} 
            className="w-full bg-emerald-400 hover:bg-emerald-500 transition-all rounded-t-sm relative"
          >
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">
              ${point.price.toFixed(0)}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1">{point.date}</span>
        </div>
      ))}
    </div>

    {/* Interactive Micro-UI state */}
    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
      <div className="flex items-center space-x-1 text-slate-600 text-sm">
        <DollarSign className="w-4 h-4 text-slate-400" />
        <span>Simulate Purchase:</span>
        <input 
          type="number" 
          value={shares} 
          onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-12 border border-slate-200 rounded px-1 font-bold text-center text-slate-800"
        />
      </div>
      <div className="text-right">
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Est.</p>
        <p className="text-lg font-extrabold text-slate-900">${(latestPrice * shares).toFixed(2)}</p>
      </div>
    </div>
  </div>
  )
}

export default StockChart
