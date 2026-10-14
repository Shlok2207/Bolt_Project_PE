import { useEffect, useState } from 'react';
import { Crown, Trophy, Flag, ChevronDown } from 'lucide-react';
import type { SeasonSummary } from '@/types/f1';
import { getSeasonSummary } from '@/lib/api';
import { SkeletonTable, SkeletonCard, ErrorState } from '@/components/ui/Skeletons';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 2016 + 1 },
  (_, i) => (CURRENT_YEAR - i).toString()
);

export function TheArchive() {
  const [year, setYear] = useState(CURRENT_YEAR.toString());
  const [summary, setSummary] = useState<SeasonSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getSeasonSummary(year);
        if (!active) return;
        setSummary(data);
      } catch {
        if (!active) return;
        setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [year]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
          Select Season
        </label>
        <div className="relative">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="appearance-none bg-zinc-900 border border-zinc-800 text-white px-5 py-3 pr-12 rounded-lg font-mono text-lg cursor-pointer focus:outline-none focus:border-[#E10600] transition-colors"
          >
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-zinc-900">
                {y}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonTable rows={10} />
        </>
      ) : error || !summary ? (
        <ErrorState />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-xl border border-zinc-800 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-yellow-500 text-xs font-mono uppercase tracking-widest mb-3">
                  <Crown className="w-4 h-4" />
                  Driver Champion
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {summary.driverChampion}
                </h3>
                <p className="text-zinc-500 text-sm mt-1 font-mono">
                  {summary.year} World Champion
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-xl border border-zinc-800 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E10600]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[#E10600] text-xs font-mono uppercase tracking-widest mb-3">
                  <Trophy className="w-4 h-4" />
                  Constructor Champion
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {summary.constructorChampion}
                </h3>
                <p className="text-zinc-500 text-sm mt-1 font-mono">
                  {summary.year} Constructors' Champion
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800">
              <Flag className="w-4 h-4 text-[#E10600]" />
              <h3 className="text-white font-semibold">
                {summary.year} Race Winners
              </h3>
              <span className="ml-auto text-zinc-500 text-sm font-mono">
                {summary.raceWinners.length} races
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
                    <th className="text-left py-3 px-5 font-medium">Rd</th>
                    <th className="text-left py-3 px-5 font-medium">Grand Prix</th>
                    <th className="text-left py-3 px-5 font-medium">Winner</th>
                    <th className="text-left py-3 px-5 font-medium hidden sm:table-cell">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.raceWinners.map((race) => (
                    <tr
                      key={race.round}
                      className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30"
                    >
                      <td className="py-3 px-5 text-zinc-500 font-mono">
                        {race.round}
                      </td>
                      <td className="py-3 px-5">
                        <p className="text-white font-medium">{race.raceName}</p>
                        <p className="text-xs text-zinc-500 sm:hidden">
                          {race.circuitName}
                        </p>
                      </td>
                      <td className="py-3 px-5 text-white">{race.driverName}</td>
                      <td className="py-3 px-5 text-zinc-400 hidden sm:table-cell">
                        {race.constructorName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
