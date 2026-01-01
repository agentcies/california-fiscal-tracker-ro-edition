import { MigrationData, BillionaireCase, CompanyRelocation, EconomicCritique } from './types';

export const HISTORICAL_DATA: MigrationData[] = [
  { year: '2020-2023', netMigration: -412000, agiLoss: 102000000000, revenueLoss: 4500000000 },
  { year: '2023-2024', netMigration: -140000, agiLoss: 16100000000, revenueLoss: 1700000000 },
  { year: '2024-2025', netMigration: -216000, agiLoss: 0, revenueLoss: 0 },
  { year: '2025-2026 (Proj.)', netMigration: -255000, agiLoss: 28000000000, revenueLoss: 3100000000, isLive: true },
];

export const BUDGET_FORECAST = [
  { year: '2024-25', status: '+$4.6B Upgrade', capGains: '$183B', risk: 'Tariffs/Stock dip' },
  { year: '2025-26', status: '-$7.7B Downgrade', capGains: '$156B', risk: 'Recession risk' },
  { year: '2026-27', status: '$18B Problem', capGains: '$155B', risk: 'Structural Deficit' },
];

export const FISCAL_HOLE = {
  medicaidGap: 45000000000, // $45B
  wealthTaxTarget: 100000000000, // $100B
  oneTimeRevenue: true,
};

export const MARKET_SENTIMENT = {
  passageProbability: 20,
  exitPeak: 'Dec 31, 2025',
  billionaireCountDrop: '255 to <200',
};

export const FORCED_SALE_MATH = {
  wealthTaxRate: 0.05,
  federalCapGains: 0.238,
  stateCapGains: 0.133,
  totalEffectiveLiquidation: 1.59, // For every $1 taxed, $1.59 must be sold
};

export const SOCIAL_CRITIQUES: EconomicCritique[] = [
  { 
    author: 'Chamath Palihapitiya', 
    handle: '@chamath', 
    text: "Wealth taxes break the seal. After the rich leave, the middle class absorbs the burden because they are the largest remaining source.",
    impact: 'Base Erosion',
    likes: '4.4k+',
    timestamp: 'Dec 2025',
    link: 'https://x.com/chamath'
  },
  { 
    author: 'Jonathan Turley', 
    handle: '@JonathanTurley', 
    text: "California's retroactive tax is a 'Hotel California' trap. You can check out any time you like, but you can never leave.",
    impact: 'Constitutional Risk',
    likes: '7.5k+',
    timestamp: 'Dec 2025',
    link: 'https://x.com/JonathanTurley'
  },
  { 
    author: 'S Tominaga', 
    handle: '@CsTominaga', 
    text: "Forced liquidations detonate balance sheets held by millions. Taxing wealth means collapsing valuations of worker pensions.",
    impact: 'Pension Risk',
    likes: '255',
    timestamp: 'Dec 2025',
    link: 'https://x.com/CsTominaga'
  },
  {
    author: '@amuse',
    handle: '@amuse',
    text: "HOTEL CALIFORNIA? California now wants a retroactive billionaire tax, leave the state and they’ll tax last year’s wealth anyway. The exodus is real. The desperation is worse.",
    impact: 'Exodus Reality',
    likes: 'Likes: 2.7k, Reposts: 1.2k',
    timestamp: 'Dec 02, 2025',
    link: 'https://x.com/amuse/status/1995869912196161753'
  },
  {
    author: 'Max Avery',
    handle: '@realMaxAvery',
    text: "REPORT: Crypto executives slam California's proposed 5% wealth tax on billionaires, warning it will trigger capital flight...",
    impact: 'Capital Flight',
    likes: 'Likes: 66, Views: 2.9k',
    timestamp: 'Dec 29, 2025',
    link: 'https://x.com/realMaxAvery/status/2005717811029532809'
  },
  {
    author: 'Markets & Mayhem',
    handle: '@Mayhem4Markets',
    text: "“I’m concerned that a small number of multi billionaires will be viewed as having created technology that puts millions out of work. This promises social and political division...”",
    impact: 'Social Division',
    likes: 'Likes: 647, Views: 112k',
    timestamp: 'Dec 09, 2025',
    link: 'https://x.com/Mayhem4Markets/status/1998453526692086218'
  },
  {
    author: 'The All-In Podcast',
    handle: '@theallinpod',
    text: "David Friedberg Explains The Slow Spiral of Socialism... “Government programs create an anchor. They are a shackle.”",
    impact: 'Socialism Spiral',
    likes: 'Likes: 3.1k, Views: 200k',
    timestamp: 'Dec 07, 2025',
    link: 'https://x.com/theallinpod/status/1997458623191273668'
  },
  {
    author: 'Evelio Silvera',
    handle: '@eveliosilvera',
    text: "Tech founders slam proposed California wealth tax... Critics say a one-time 5% levy on billionaires could force founders to sell stakes or leave altogether... It’s self-sabotage.",
    impact: 'Self-Sabotage',
    likes: 'Views: 81',
    timestamp: 'Dec 31, 2025',
    link: 'https://x.com/eveliosilvera/status/2006172117365035502'
  },
  {
    author: 'Cernovich',
    handle: '@Cernovich',
    text: "California is set to vote on a 5% wealth tax on billionaires. Mass exodus incoming.",
    impact: 'Exodus Risk',
    likes: 'Likes: 1.4k, Views: 515k',
    timestamp: 'Dec 15, 2025',
    link: 'https://x.com/Cernovich/status/2000620047774216237'
  },
  {
    author: 'Chris Langan',
    handle: '@RealChrisLangan',
    text: "Billionaire wealth creation is affected by government contracts, and these new taxes will fundamentally shift how innovation is funded.",
    impact: 'Innovation Hit',
    likes: 'Likes: 811, Views: 21k',
    timestamp: 'Dec 22, 2025',
    link: 'https://x.com/RealChrisLangan/status/2003014505161207873'
  },
  {
    author: 'Jonny Quest',
    handle: '@jonnyquesthero',
    text: "Complete & total clown sh$t. Mass exodus now... California's Ro Khanna faces Silicon Valley backlash after embracing wealth tax.",
    impact: 'Policy Backlash',
    likes: 'Views: 16',
    timestamp: 'Dec 30, 2025',
    link: 'https://x.com/jonnyquesthero/status/2005988643891020275'
  },
  {
    author: 'Cernovich',
    handle: '@Cernovich',
    text: "Yep. If they don’t leave before the year, and if the ballot passes, they owe the tax... Billionaires in California have two weeks to decide to stay or go.",
    impact: 'The Deadline',
    likes: 'Likes: 352, Views: 52k',
    timestamp: 'Dec 15, 2025',
    link: 'https://x.com/Cernovich/status/2000713510721085599'
  },
  {
    author: 'gil duran',
    handle: '@gilduran76',
    text: "Mealy-mouthed billionaire pushback on Silicon Valley's 'Counter Enlightenment'... But the backlash to tech extremism is coming, and it's going to be fierce.",
    impact: 'Tech Backlash',
    likes: 'Likes: 421, Views: 20k',
    timestamp: 'Dec 09, 2025',
    link: 'https://x.com/gilduran76/status/1998467929927533015'
  },
  {
    author: 'Ben Brown',
    handle: '@bdbrown473',
    text: ".@BillAckman warns “every successful founder, entrepreneur would leave” California if a wealth tax is implemented...",
    impact: 'Founder Flight',
    likes: 'Views: 42',
    timestamp: 'Dec 31, 2025',
    link: 'https://x.com/bdbrown473/status/2006427993598734802'
  },
  {
    author: 'Occupy Democrats',
    handle: '@OccupyDemocrats',
    text: "BREAKING: A Texas Republican just called for taxing billionaires “out of existence”... It’s time for a Billionaire Wealth Tax.",
    impact: 'Tax Support',
    likes: 'Likes: 1.3k, Reposts: 682',
    timestamp: 'Dec 09, 2025',
    link: 'https://x.com/OccupyDemocrats/status/1998405085139796364'
  },
  {
    author: 'Ole S Hansen',
    handle: '@Ole_S_Hansen',
    text: "Spot on from Howard Marks at Oaktree: “I’m concerned that multi billionaires will be viewed as putting millions out of work”...",
    impact: 'Economic Tension',
    likes: 'Likes: 231, Views: 27k',
    timestamp: 'Dec 15, 2025',
    link: 'https://x.com/Ole_S_Hansen/status/2000465562552418344'
  },
  {
    author: 'Don Alphonso',
    handle: '@_donalphonso',
    text: "Heute als Idee in Kalifornien, morgen vielleicht schon bei Realkanzlerin Bas: Die rückwirkende Reichenbesteuerung.",
    impact: 'Global Precedent',
    likes: 'Likes: 342, Views: 16k',
    timestamp: 'Dec 03, 2025',
    link: 'https://x.com/_donalphonso/status/1996341988141248663'
  },
  {
    author: 'Chris',
    handle: '@iufer',
    text: "what ive gleaned from commentary on the California Billionaires wealth tax: - the tech billionaires are freaked out but we know this is core value stuff...",
    impact: 'Tech Reaction',
    likes: 'Views: 17',
    timestamp: 'Dec 29, 2025',
    link: 'https://x.com/iufer/status/2005504037471289411'
  }
];

export const BILLIONAIRE_CASES: (BillionaireCase & { details?: string, netWorthVal?: string })[] = [
  { name: 'Peter Thiel', netWorth: 100000000000, netWorthVal: '$27B-$100B', potentialTaxBill: 5000000000, destination: 'Florida (Miami)', status: 'Miami Lease signed Dec 2025', details: 'Costing CA $200M/yr in PIT', isRecent: true },
  { name: 'Larry Page', netWorth: 258000000000, netWorthVal: '$258B', potentialTaxBill: 12900000000, destination: 'Florida', status: '3 LLCs in FL (mid-Dec)', details: 'Family office relocated', isRecent: true },
  { name: 'Elon Musk', netWorth: 300000000000, netWorthVal: '$300B+', potentialTaxBill: 15000000000, destination: 'Texas', status: 'Relocated 2021', details: 'Cost CA $1B+ annually' },
  { name: 'Larry Ellison', netWorth: 200000000000, netWorthVal: '$200B+', potentialTaxBill: 10000000000, destination: 'TX / HI', status: 'Relocated 2020', details: '$500M annual loss' },
  { name: 'David Sacks', netWorth: 2000000000, netWorthVal: '$2B', potentialTaxBill: 100000000, destination: 'FL / TX', status: 'License changed to FL', isRecent: true },
  { name: 'Palmer Luckey', netWorth: 2000000000, netWorthVal: '$2B+', potentialTaxBill: 100000000, destination: 'TX / FL', status: 'Warned of forced sales', isRecent: true },
  { name: 'Alex Karp (Palantir)', netWorth: 2000000000, netWorthVal: '$2B+', potentialTaxBill: 100000000, destination: 'Colorado', status: 'Defense tech shift', details: 'Palantir HQ exit' },
  { name: 'Joe Lonsdale', netWorth: 1000000000, netWorthVal: '$1B+', potentialTaxBill: 50000000, destination: 'Texas', status: 'Moved 2020', details: '8VC/Palantir founder' },
  { name: 'Jonathan Oringer', netWorth: 1000000000, netWorthVal: '$1B+', potentialTaxBill: 50000000, destination: 'Florida', status: 'Relocated 2021', details: 'Shutterstock founder' },
  { name: 'Anonymous Top-10', netWorth: 15000000000, netWorthVal: 'Top-10 Payer', potentialTaxBill: 750000000, destination: 'Florida', status: 'Confirmed Exit', details: 'Direct $80M/yr PIT loss' },
];

export const COMPANY_RELOCATIONS: CompanyRelocation[] = [
  { name: 'Tesla', destination: 'Austin, TX', year: 2021, details: 'HQ follow founder' },
  { name: 'Chevron', destination: 'Houston, TX', year: 2024, details: 'Regulatory escape' },
  { name: 'SpaceX', destination: 'Starbase, TX', year: 2024, details: 'Relocated 2024' },
  { name: 'Oracle', destination: 'Austin / Nashville', year: 2020, details: '$100B+ market cap exit' },
  { name: 'Playboy', destination: 'Miami, FL', year: 2025, details: 'HQ Move Aug 2025' },
  { name: 'Leprino Foods', destination: 'Lubbock, TX', year: 2025, details: '300+ jobs lost' },
  { name: 'Valero', destination: 'San Antonio, TX', year: 2025 },
];

export const KHANNA_TIMELINE = [
  { date: 'Dec 27, 2025', event: 'Khanna quotes FDR: "I will miss them very much" regarding Thiel/Page exit.' },
  { date: 'Dec 27, 2025', event: 'Defends ecosystem: "Success stems from public funding (NSF/DARPA), not tax avoidance."' },
  { date: 'Dec 28, 2025', event: 'Defends $18T CA economy against TX ranking: "We invest in people/immigrants."' },
  { date: 'Jan 1, 2026', event: 'Retroactive Tax Window Opens: Retroactive to this date if passed.' },
];

export const APP_CONFIG = {
  model: 'gemini-3-flash-preview',
  systemInstruction: `You are a specialized fiscal analyst. 
  Explain the 2026 Billionaire Wealth Tax Act:
  - 5% one-time levy on assets >$1B, retroactive to Jan 1, 2026.
  - Polymarket probability: 20%.
  - Forced sale math: $100M tax = $159M liquidation (Fed Cap Gains 23.8%).
  - Rep. Ro Khanna (CA-17) defends it to fund $45B Medicaid gap.
  - Mention 401(k) and pension fire-sale ripple effects.`
};
