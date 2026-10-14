import { useEffect, useState } from 'react';
import { Trophy, MapPin, Calendar, Clock, ChevronUp, Flame } from 'lucide-react';
import type {
  DriverStanding,
  ConstructorStanding,
  RaceEvent,
} from '@/types/f1';
import {
  getDriverStandings,
  getConstructorStandings,
  getNextRace,
} from '@/lib/api';
import {
  SkeletonTable,
  SkeletonCard,
  ErrorState,
} from '@/components/ui/Skeletons';

function PodiumBadge({ position }: { position: number }) {
  const styles = [
    'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-950',
    'bg-gradient-to-br from-zinc-300 to-zinc-500 text-zinc-950',
    'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50',
  ];
  if (position > 3) return null;
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${styles[position - 1]}`}
    >
      {position}
    </span>
  );
}

function DriverStandingsTable({
  standings,
}: {
  standings: DriverStanding[];
}) {
  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
            <th className="text-left py-3 px-4 font-medium">Pos</th>
            <th className="text-left py-3 px-4 font-medium">Driver</th>
            <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Team</th>
            <th className="text-right py-3 px-4 font-medium">Wins</th>
            <th className="text-right py-3 px-4 font-medium">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((d) => {
            const pos = parseInt(d.position, 10);
            const isTop3 = pos <= 3;
            return (
              <tr
                key={d.driverId}
                className={`border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30 ${
                  isTop3 ? 'bg-zinc-800/20' : ''
                }`}
              >
                <td className="py-3 px-4">
                  {isTop3 ? (
                    <PodiumBadge position={pos} />
                  ) : (
                    <span className="text-zinc-500 font-mono">{pos}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-500 w-8">
                      {d.driverCode}
                    </span>
                    <div>
                      <p className="font-medium text-white">{d.driverName}</p>
                      <p className="text-xs text-zinc-500 sm:hidden">
                        {d.constructorName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-zinc-400 hidden sm:table-cell">
                  {d.constructorName}
                </td>
                <td className="py-3 px-4 text-right">
                  {parseInt(d.wins) > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[#E10600] font-mono">
                      <Flame className="w-3 h-3" />
                      {d.wins}
                    </span>
                  ) : (
                    <span className="text-zinc-600 font-mono">0</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="font-mono font-bold text-white">{d.points}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ConstructorStandingsTable({
  standings,
}: {
  standings: ConstructorStanding[];
}) {
  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
            <th className="text-left py-3 px-4 font-medium">Pos</th>
            <th className="text-left py-3 px-4 font-medium">Constructor</th>
            <th className="text-right py-3 px-4 font-medium">Wins</th>
            <th className="text-right py-3 px-4 font-medium">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((c) => {
            const pos = parseInt(c.position, 10);
            return (
              <tr
                key={c.constructorId}
                className={`border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30 ${
                  pos <= 3 ? 'bg-zinc-800/20' : ''
                }`}
              >
                <td className="py-3 px-4">
                  {pos <= 3 ? (
                    <PodiumBadge position={pos} />
                  ) : (
                    <span className="text-zinc-500 font-mono">{pos}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium text-white">{c.constructorName}</p>
                  <p className="text-xs text-zinc-500">{c.nationality}</p>
                </td>
                <td className="py-3 px-4 text-right">
                  {parseInt(c.wins) > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[#E10600] font-mono">
                      <Flame className="w-3 h-3" />
                      {c.wins}
                    </span>
                  ) : (
                    <span className="text-zinc-600 font-mono">0</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="font-mono font-bold text-white">{c.points}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function NextRaceCard({ race }: { race: RaceEvent }) {
  const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
  const now = new Date();
  const diff = raceDate.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-xl border border-zinc-800 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E10600]/10 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-[#E10600] text-xs font-mono uppercase tracking-widest mb-4">
          <Calendar className="w-4 h-4" />
          Next Race
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{race.raceName}</h3>
        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          {race.circuitName}, {race.locality}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Days</span>
            <span className="text-3xl font-mono font-bold text-white">{days}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Hours</span>
            <span className="text-3xl font-mono font-bold text-white">{hours}</span>
          </div>
          <div className="ml-auto flex items-center gap-1 text-zinc-400 text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-mono">
              {raceDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TheGrid() {
  const [drivers, setDrivers] = useState<DriverStanding[]>([]);
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([]);
  const [nextRace, setNextRace] = useState<RaceEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [view, setView] = useState<'drivers' | 'constructors'>('drivers');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const [d, c, r] = await Promise.all([
          getDriverStandings(),
          getConstructorStandings(),
          getNextRace(),
        ]);
        if (!active) return;
        setDrivers(d);
        setConstructors(c);
        setNextRace(r);
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
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonTable rows={10} />
        </>
      ) : error && drivers.length === 0 ? (
        <ErrorState />
      ) : (
        <>
          {nextRace && <NextRaceCard race={nextRace} />}

          <div className="flex items-center gap-2 bg-zinc-900 rounded-lg border border-zinc-800 p-1 w-fit">
            <button
              onClick={() => setView('drivers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'drivers'
                  ? 'bg-[#E10600] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Drivers
            </button>
            <button
              onClick={() => setView('constructors')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'constructors'
                  ? 'bg-[#E10600] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ChevronUp className="w-4 h-4" />
              Constructors
            </button>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            {view === 'drivers' ? (
              <DriverStandingsTable standings={drivers} />
            ) : (
              <ConstructorStandingsTable standings={constructors} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
