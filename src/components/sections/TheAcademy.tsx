import { Wind, Gauge, CircleDot, Wrench, Zap, Layers, Timer } from 'lucide-react';

interface Concept {
  icon: typeof Wind;
  title: string;
  shortName: string;
  description: string;
  details: string[];
  accent: string;
}

const CONCEPTS: Concept[] = [
  {
    icon: Zap,
    title: 'DRS — Drag Reduction System',
    shortName: 'DRS',
    description:
      'A driver-activated flap on the rear wing that opens to reduce aerodynamic drag, boosting top speed for overtaking.',
    details: [
      'Can only be used in designated DRS zones on the straights',
      'Activates when within 1 second of the car ahead',
      'Disabled during rain or yellow flag conditions',
      'Closes automatically under braking',
    ],
    accent: 'text-blue-400',
  },
  {
    icon: Wind,
    title: 'Aerodynamics & Downforce',
    shortName: 'Aero',
    description:
      'Wings and bodywork shape airflow to push the car into the track, generating grip through corners without adding weight.',
    details: [
      'Downforce can exceed the car\'s weight at high speeds',
      'Front and rear wings produce most of the grip',
      'The floor and diffuser generate ground-effect downforce',
      'More downforce = faster corners but slower straights',
    ],
    accent: 'text-cyan-400',
  },
  {
    icon: CircleDot,
    title: 'Tire Compounds',
    shortName: 'Tires',
    description:
      'Pirelli provides Soft (red), Medium (yellow), and Hard (white) tires. Softer = faster but shorter lasting.',
    details: [
      'Soft (C3–C5): Maximum grip, degrades quickly',
      'Medium: Balanced pace and durability',
      'Hard: Longest lasting, slower lap times',
      'Drivers must use at least 2 compounds in a dry race',
    ],
    accent: 'text-amber-400',
  },
  {
    icon: Wrench,
    title: 'Pit Stop Strategy',
    shortName: 'Pit Stops',
    description:
      'Teams plan tire changes to minimize time lost. A perfect stop takes under 2.5 seconds with 4 tire changers.',
    details: [
      'Under 2.5 seconds for a 4-tire change is elite',
      'Each stop costs roughly 20-25 seconds of track position',
      'Strategy depends on tire wear, track position, and weather',
      'An undercut pits early to gain time on fresh tires',
    ],
    accent: 'text-green-400',
  },
  {
    icon: Gauge,
    title: 'Qualifying Format',
    shortName: 'Qualifying',
    description:
      'A three-session knockout system sets the grid. The slowest cars are eliminated in each round.',
    details: [
      'Q1: 18 minutes — 5 slowest cars eliminated',
      'Q2: 15 minutes — next 5 slowest eliminated',
      'Q3: 12 minutes — top 10 fight for pole position',
      'Pole position = fastest lap time, starts at the front',
    ],
    accent: 'text-purple-400',
  },
  {
    icon: Layers,
    title: 'Points System',
    shortName: 'Points',
    description:
      'Points are awarded to the top 10 finishers, with 1 point for fastest lap (if in the top 10).',
    details: [
      '1st: 25 pts, 2nd: 18 pts, 3rd: 15 pts',
      '4th: 12, 5th: 10, 6th: 8, 7th: 6, 8th: 4, 9th: 2, 10th: 1',
      'Fastest lap: +1 point (must finish in top 10)',
      'Sprint races award points to the top 8 finishers',
    ],
    accent: 'text-rose-400',
  },
];

function ConceptCard({ concept }: { concept: Concept }) {
  const Icon = concept.icon;
  return (
    <div className="group bg-zinc-900 rounded-xl border border-zinc-800 p-6 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/30">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-800/50 transition-colors">
          <Icon className={`w-6 h-6 ${concept.accent}`} />
        </div>
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">
            {concept.shortName}
          </span>
          <h3 className="text-lg font-bold text-white leading-tight">
            {concept.title}
          </h3>
        </div>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
        {concept.description}
      </p>
      <ul className="space-y-2">
        {concept.details.map((detail, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-zinc-500"
          >
            <span className={`mt-1.5 w-1 h-1 rounded-full ${concept.accent.replace('text-', 'bg-')} flex-shrink-0`} />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TheAcademy() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/30 rounded-xl border border-zinc-800 p-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#E10600]/10 text-[#E10600] px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-4">
          <Timer className="w-4 h-4" />
          For Students & New Fans
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          The F1 Academy
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Formula 1 is the pinnacle of motorsport — a blend of cutting-edge
          engineering, split-second strategy, and elite human performance.
          Explore the core concepts that make the sport what it is.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONCEPTS.map((concept) => (
          <ConceptCard key={concept.shortName} concept={concept} />
        ))}
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Race Weekend at a Glance</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {[
            { day: 'Friday', events: 'Free Practice 1 & 2' },
            { day: 'Saturday', events: 'Free Practice 3 & Qualifying' },
            { day: 'Sunday', events: 'The Grand Prix' },
          ].map((item) => (
            <div
              key={item.day}
              className="flex-1 bg-zinc-800/50 rounded-lg p-4 border border-zinc-800"
            >
              <p className="text-[#E10600] text-xs font-mono uppercase tracking-widest mb-1">
                {item.day}
              </p>
              <p className="text-white text-sm font-medium">{item.events}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
