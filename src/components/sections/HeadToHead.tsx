import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { Swords, ChevronDown, User, User2, CheckCircle2 } from 'lucide-react';
import type { DriverComparison } from '@/types/f1';
import { getCurrentDrivers, getDriverComparison } from '@/lib/api';
import { SpinningTire, ErrorState } from '@/components/ui/Skeletons';

const CURRENT_YEAR = new Date().getFullYear();

export function HeadToHead() {
  const [drivers, setDrivers] = useState<{ id: string; name: string; code: string }[]>([]);
  const [driverAId, setDriverAId] = useState('');
  const [driverBId, setDriverBId] = useState('');
  const [driverA, setDriverA] = useState<DriverComparison | null>(null);
  const [driverB, setDriverB] = useState<DriverComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const list = await getCurrentDrivers();
        if (!active) return;
        setDrivers(list);
        if (list.length >= 2) {
          setDriverAId(list[0].id);
          setDriverBId(list[1].id);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!driverAId || !driverBId) return;
    let active = true;
    (async () => {
      setComparing(true);
      try {
        const [a, b] = await Promise.all([
          getDriverComparison(driverAId),
          getDriverComparison(driverBId),
        ]);
        if (!active) return;
        setDriverA(a);
        setDriverB(b);
      } finally {
        if (active) setComparing(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [driverAId, driverBId]);

  if (loading) return <SpinningTire label="Loading drivers" />;

  const chartData =
    driverA && driverB
      ? [
          { stat: 'Points', [driverA.driverCode]: driverA.points, [driverB.driverCode]: driverB.points },
          { stat: 'Wins', [driverA.driverCode]: driverA.wins, [driverB.driverCode]: driverB.wins },
          { stat: 'Podiums', [driverA.driverCode]: driverA.podiums, [driverB.driverCode]: driverB.podiums },
          { stat: 'Position', [driverA.driverCode]: 25 - driverA.position, [driverB.driverCode]: 25 - driverB.position },
        ]
      : [];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/30 rounded-xl border border-zinc-800 p-6">
        <div className="flex items-center gap-2 text-[#E10600] text-xs font-mono uppercase tracking-widest mb-2">
          <Swords className="w-4 h-4" />
          Telemetry Comparison
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Head-to-Head</h2>
        <p className="text-zinc-400 text-sm">
          Compare two {CURRENT_YEAR} season drivers side-by-side
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DriverSelector
          label="Driver A"
          drivers={drivers}
          value={driverAId}
          onChange={setDriverAId}
          accent="border-cyan-500/40"
        />
        <DriverSelector
          label="Driver B"
          drivers={drivers}
          value={driverBId}
          onChange={setDriverBId}
          accent="border-[#E10600]/40"
        />
      </div>

      {comparing ? (
        <SpinningTire label="Crunching numbers" />
      ) : !driverA || !driverB ? (
        <ErrorState message="Unable to load comparison data for selected drivers." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DriverStatCard driver={driverA} color="cyan" />
            <DriverStatCard driver={driverB} color="red" />
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Performance Comparison</h3>
              <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    chartType === 'bar' ? 'bg-[#E10600] text-white' : 'text-zinc-400'
                  }`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType('radar')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    chartType === 'radar' ? 'bg-[#E10600] text-white' : 'text-zinc-400'
                  }`}
                >
                  Radar
                </button>
              </div>
            </div>

            {chartType === 'bar' ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    dataKey="stat"
                    stroke="#71717a"
                    tick={{ fontSize: 12, fontFamily: 'monospace' }}
                  />
                  <YAxis stroke="#71717a" tick={{ fontSize: 12, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #3f3f46',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                    }}
                    labelStyle={{ color: '#fafafa' }}
                  />
                  <Bar
                    dataKey={driverA.driverCode}
                    fill="#06b6d4"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey={driverB.driverCode}
                    fill="#E10600"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis
                    dataKey="stat"
                    stroke="#71717a"
                    tick={{ fontSize: 12, fontFamily: 'monospace' }}
                  />
                  <PolarRadiusAxis stroke="#3f3f46" tick={{ fontSize: 10 }} />
                  <Radar
                    name={driverA.driverCode}
                    dataKey={driverA.driverCode}
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name={driverB.driverCode}
                    dataKey={driverB.driverCode}
                    stroke="#E10600"
                    fill="#E10600"
                    fillOpacity={0.3}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #3f3f46',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                    }}
                    labelStyle={{ color: '#fafafa' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>

          <ComparisonSummary driverA={driverA} driverB={driverB} />
        </>
      )}
    </div>
  );
}

function DriverSelector({
  label,
  drivers,
  value,
  onChange,
  accent,
}: {
  label: string;
  drivers: { id: string; name: string; code: string }[];
  value: string;
  onChange: (id: string) => void;
  accent: string;
}) {
  return (
    <div className={`bg-zinc-900 rounded-xl border ${accent} p-4`}>
      <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2 block">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 pr-10 rounded-lg font-medium cursor-pointer focus:outline-none focus:border-zinc-500 transition-colors"
        >
          {drivers.map((d) => (
            <option key={d.id} value={d.id} className="bg-zinc-900">
              {d.name} ({d.code})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}

function DriverStatCard({
  driver,
  color,
}: {
  driver: DriverComparison;
  color: 'cyan' | 'red';
}) {
  const Icon = color === 'cyan' ? User : User2;
  const colorClass = color === 'cyan' ? 'text-cyan-400' : 'text-[#E10600]';
  const bgClass = color === 'cyan' ? 'bg-cyan-500/10' : 'bg-[#E10600]/10';
  const borderClass = color === 'cyan' ? 'border-cyan-500/30' : 'border-[#E10600]/30';

  return (
    <div className={`bg-zinc-900 rounded-xl border ${borderClass} p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg ${bgClass} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
        <div>
          <p className="text-white font-bold text-lg">{driver.driverName}</p>
          <p className="text-zinc-500 text-xs">
            P{driver.position} · {driver.constructorName}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Points" value={driver.points} color={colorClass} />
        <Stat label="Wins" value={driver.wins} color={colorClass} />
        <Stat label="Podiums" value={driver.podiums} color={colorClass} />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="text-center bg-zinc-800/50 rounded-lg py-3">
      <p className={`font-mono text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-zinc-500 text-xs uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

function ComparisonSummary({
  driverA,
  driverB,
}: {
  driverA: DriverComparison;
  driverB: DriverComparison;
}) {
  const aWins = [
    { stat: 'Points', a: driverA.points, b: driverB.points },
    { stat: 'Wins', a: driverA.wins, b: driverB.wins },
    { stat: 'Podiums', a: driverA.podiums, b: driverB.podiums },
    { stat: 'Championship Position', a: -driverA.position, b: -driverB.position },
  ];

  let aScore = 0;
  let bScore = 0;
  aWins.forEach((s) => {
    if (s.a > s.b) aScore++;
    else if (s.b > s.a) bScore++;
  });

  const winner = aScore > bScore ? driverA : bScore > aScore ? driverB : null;

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-[#E10600]" />
        <h3 className="text-white font-semibold">Verdict</h3>
      </div>
      {winner ? (
        <p className="text-lg text-white">
          <span className="font-bold text-[#E10600]">{winner.driverName}</span> leads{' '}
          {aScore > bScore ? driverB.driverName : driverA.driverName} in{' '}
          {Math.max(aScore, bScore)} of {aWins.length} categories.
        </p>
      ) : (
        <p className="text-lg text-white">
          It's a dead heat — <span className="font-bold">{driverA.driverName}</span> and{' '}
          <span className="font-bold">{driverB.driverName}</span> are evenly matched.
        </p>
      )}
    </div>
  );
}
