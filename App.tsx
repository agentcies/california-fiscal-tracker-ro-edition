import React, { useState } from 'react';
import { 
  TrendingDown, 
  Users, 
  DollarSign, 
  MapPin, 
  ArrowRight,
  ShieldAlert,
  Info,
  ExternalLink,
  RefreshCw,
  Clock,
  Building2,
  AlertTriangle,
  HeartPulse,
  HelpCircle,
  BarChart3,
  TrendingUp,
  ChevronRight,
  Calculator,
  Flame,
  MessageSquare,
  Gavel,
  History,
  Scale,
  Zap,
  BookOpen,
  PieChart,
  ArrowDownCircle,
  Stethoscope,
  Eye
} from 'lucide-react';
import { MigrationTrendsChart, FiscalImpactChart } from './components/Visualizations';
import { SearchPanel } from './components/SearchPanel';
import { syncFiscalData } from './services/gemini';
import { 
  BILLIONAIRE_CASES, 
  HISTORICAL_DATA, 
  COMPANY_RELOCATIONS, 
  BUDGET_FORECAST, 
  SOCIAL_CRITIQUES, 
  MARKET_SENTIMENT, 
  KHANNA_TIMELINE, 
  FORCED_SALE_MATH,
  FISCAL_HOLE
} from './constants';
import { MigrationData, BillionaireCase, GroundingSource, CompanyRelocation, EconomicCritique } from './types';

const TooltipLabel = ({ label, explanation }: { label: string, explanation: string }) => (
  <span className="flex items-center gap-1 group relative cursor-help">
    <span className="border-b border-dotted border-slate-300 group-hover:border-indigo-400 transition-colors">
      {label}
    </span>
    <HelpCircle className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] font-normal leading-relaxed pointer-events-none">
      {explanation}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 -translate-y-1"></div>
    </div>
  </span>
);

const StatCard = ({ title, value, subValue, icon: Icon, color, isLive, explanation }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between relative group hover:border-indigo-200 transition-all z-10 hover:z-20">
    <div className="z-10">
      <div className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
        <TooltipLabel label={title} explanation={explanation} />
        {isLive && <span className="text-[10px] font-bold text-emerald-600 uppercase ml-2">Live</span>}
      </div>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className={`text-xs mt-1 font-medium ${color}`}>{subValue}</p>
    </div>
    <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100 z-10 group-hover:bg-indigo-50 transition-colors`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  </div>
);

const ImpactEstimator = () => {
  const [wealth, setWealth] = useState(10); // $10B Default
  const taxBill = wealth * FORCED_SALE_MATH.wealthTaxRate;
  const totalLiquidation = taxBill * FORCED_SALE_MATH.totalEffectiveLiquidation;
  const secondaryTax = totalLiquidation - taxBill;

  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-700 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold">Wealth Tax Impact Estimator</h3>
      </div>
      
      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-bold text-slate-400 uppercase">Estimated Net Worth (Billions)</span>
          <input 
            type="range" 
            min="1" 
            max="300" 
            value={wealth} 
            onChange={(e) => setWealth(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-2 accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>$1B</span>
            <span>$300B</span>
          </div>
        </label>
        
        <div className="text-center py-4 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-[10px] uppercase font-bold text-indigo-300">Net Worth Selected</p>
          <p className="text-4xl font-black text-white">${wealth}B</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
          <p className="text-[10px] uppercase font-bold text-indigo-300 mb-1">5% Tax Bill</p>
          <p className="text-2xl font-bold">${taxBill.toFixed(2)}B</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
          <p className="text-[10px] uppercase font-bold text-red-300 mb-1">Liquidation Need</p>
          <p className="text-2xl font-bold">${totalLiquidation.toFixed(2)}B</p>
        </div>
      </div>

      <div className="p-4 bg-slate-800 rounded-2xl text-[11px] text-slate-400 leading-relaxed border border-slate-700">
        <strong className="text-red-400 flex items-center gap-1 mb-1">
          <ArrowDownCircle className="w-3 h-3" /> The "Invisible" Bill:
        </strong>
        To pay ${taxBill.toFixed(2)}B in cash, the taxpayer must sell ${totalLiquidation.toFixed(2)}B in shares. The extra <strong>${secondaryTax.toFixed(2)}B</strong> is consumed by federal & state capital gains taxes triggered by the sale itself.
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [migrationData] = useState<MigrationData[]>(HISTORICAL_DATA);
  const [billionaires] = useState(BILLIONAIRE_CASES);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLiveSync = async () => {
    setIsSyncing(true);
    try {
      await syncFiscalData();
    } catch (err) {
      console.error("Sync failed", err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              CA Fiscal Tracker <span className="text-indigo-600 font-normal">| 2026 Resilience</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Passage Probability</span>
              <span className="text-sm font-bold text-red-600">{MARKET_SENTIMENT.passageProbability}%</span>
            </div>
            <button 
              onClick={handleLiveSync}
              disabled={isSyncing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Live Data'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Context Hub: Why are we talking about this? */}
        <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Building2 className="w-64 h-64 text-indigo-600" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <BookOpen className="w-3 h-3" /> Core Context
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">
                The Battle for <span className="text-indigo-600 underline decoration-indigo-200 decoration-8">California's Future</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                California is at a fiscal crossroads. A looming <strong>$45B Medicaid funding gap</strong> has triggered a high-stakes proposal: a <strong>5% retroactive Wealth Tax</strong> on billionaires. This move is intended to save healthcare services but has sparked a record "Checking Out" event among the state's top taxpayers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <Stethoscope className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Medicaid funding Crisis</h4>
                    <p className="text-xs text-slate-500 mt-1">$45B in federal cuts threaten services for millions of working families.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Tax Base Concentration</h4>
                    <p className="text-xs text-slate-500 mt-1">The top 1% of earners pay 50% of all CA income taxes. Flight is a systemic risk.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-600" /> Fiscal Gap Visual
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Funding Gap</span>
                    <span>$45B</span>
                  </div>
                  <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[45%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Wealth Tax Target</span>
                    <span className="text-emerald-600">$100B+</span>
                  </div>
                  <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[100%]"></div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * The proposed tax seeks to raise double the Medicaid shortfall to create a one-time "Safety Fund."
              </p>
            </div>
          </div>
        </section>

        {/* Forced Sale Math & Estimator */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ImpactEstimator />
          
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold">The 2026 Policy Timeline</h3>
            </div>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {KHANNA_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-indigo-500 group-hover:scale-110 transition-transform shadow-sm z-10"></div>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1 tracking-widest">{item.date}</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{item.event}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center text-white font-black text-xs shadow-lg">RK</div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Ro Khanna (CA-17)</p>
                  <p className="text-[10px] text-slate-400 italic">"Wealth tax is essential to fund our $45B Medicaid gap amid federal cuts."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Income Outflow (AGI)" 
            explanation="The cumulative taxable income that left CA with residents since 2020."
            value="$102B" 
            subValue="Since 2020 Exodus" 
            icon={Building2} 
            color="text-red-600"
          />
          <StatCard 
            title="Lost Tax Dollars" 
            explanation="Estimated annual tax revenue missing from the state budget due to out-migration."
            value="$4.5B" 
            subValue="Yearly Budget Drain" 
            icon={TrendingDown} 
            color="text-amber-600"
          />
          <StatCard 
            title="Structural Deficit" 
            explanation="The projected annual gap between revenue and spending starting in 2027."
            value="-$35B" 
            subValue="Yearly 2027+ Proj." 
            icon={ShieldAlert} 
            color="text-red-700"
          />
          <StatCard 
            title="Wealth Tax Pool" 
            explanation="Total combined assets of CA's ~250 billionaires targeted by the 5% levy."
            value="$2.2T" 
            subValue="Target Asset Base" 
            icon={DollarSign} 
            color="text-emerald-600"
          />
        </div>

        {/* The Exodus Registry */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-2xl">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">The Exodus Registry</h3>
                <p className="text-sm text-slate-500">Tracking billionaires who moved residency pre-2026 tax deadline.</p>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Status Summary</p>
              <div className="flex gap-2">
                <span className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-1 rounded-full border border-red-100">CONFIRMED EXIT</span>
                <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-2 py-1 rounded-full border border-amber-100">EXPLORING</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-10 py-6">Billionaire</th>
                  <th className="px-10 py-6">Net Worth</th>
                  <th className="px-10 py-6">Relocation Status</th>
                  <th className="px-10 py-6">Destination</th>
                  <th className="px-10 py-6 text-right">Potential Tax Bill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {billionaires.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-10 py-6 font-bold text-slate-900 flex items-center gap-3">
                      {b.name}
                      {b.isRecent && <span className="text-[8px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-black tracking-tighter animate-pulse">ACTIVE EXIT</span>}
                    </td>
                    <td className="px-10 py-6 text-slate-600 font-medium">{b.netWorthVal}</td>
                    <td className="px-10 py-6 text-slate-500 text-xs italic">{b.status}</td>
                    <td className="px-10 py-6 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-indigo-400" /> {b.destination}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right font-mono font-bold text-red-600">
                      -${(b.potentialTaxBill / 1e9).toFixed(1)}B
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analytics & Search */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MigrationTrendsChart />
              <FiscalImpactChart />
            </div>
            <SearchPanel />
          </div>

          <div className="space-y-8">
            {/* Social Sentiment Critiques */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900">Expert Perspectives (X Live)</h3>
              </div>
              <div className="divide-y divide-slate-100 max-h-[1200px] overflow-y-auto">
                {SOCIAL_CRITIQUES.map((critique, i) => (
                  <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                          {critique.author.charAt(0)}
                        </div>
                        <div>
                          <a 
                            href={`https://x.com/${critique.handle.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors block"
                          >
                            {critique.author}
                          </a>
                          <p className="text-[10px] text-indigo-500 font-mono">{critique.handle}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full uppercase">
                        {critique.impact}
                      </span>
                    </div>
                    <a 
                      href={critique.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm text-slate-600 italic leading-relaxed hover:text-slate-900 transition-colors"
                    >
                      "{critique.text}"
                    </a>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1">
                          <HeartPulse className="w-3 h-3 text-red-400" /> {critique.likes}
                        </span>
                        {critique.timestamp && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {critique.timestamp}
                          </span>
                        )}
                      </div>
                      <a 
                        href={critique.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View Post <ExternalLink className="w-2 h-2" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate HQ Exit Hub */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-red-600" />
                HQ Exodus registry
              </h3>
              <div className="space-y-3">
                {COMPANY_RELOCATIONS.map((co, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors px-2 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-800">{co.name}</p>
                      <p className="text-[10px] text-slate-400">{co.year} • To {co.destination}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center italic">
                Companies worth <strong>$1.6T</strong> have moved since 2020.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-bold text-slate-900 uppercase tracking-tighter">CA Fiscal Tracker v3.1</span>
          </div>
          <p className="text-sm text-slate-400 text-center max-w-md">
            Visualizing the intersection of healthcare funding needs and billionaire migration. All data grounded in public filings and legislative reports.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;